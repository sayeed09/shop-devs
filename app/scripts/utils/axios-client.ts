import Axios, { AxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  getFromCookie,
} from './product/formatter';
import { UserLoginValue } from '../interface/product';
import { IExpiredAccessToken } from '../interface/authentication';
import { getEnvironmentValue, getFromLocalStorage, handleLogout, hostDomainUrl, setToLocalStorage } from './helper';
import { loginService } from '../services/login';
import Cookies from 'js-cookie';
let refreshTokenPromise;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const isAxiosNetworkError = (err: any) => {
  return (
    err &&
    err.isAxiosError &&
    (
      err.message === 'Network Error' ||
      err.code === 'ERR_NETWORK' ||
      err.code === 'ECONNABORTED' ||
      !err.response // likely connectivity issue
    )
  );
};
const axiosClient = Axios.create({
  timeout: 20000, // Setting this for now a little max value, gradually we need to handle those timeouts globally
  headers: {
    'content-type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  async (request) => {
    let authHeader = '';
    const authorizationToken: UserLoginValue | null =
      getAccessToken()
    if (authorizationToken && authorizationToken.accessToken) {
      authHeader = `Bearer ${authorizationToken.accessToken}`;
    }
    request.headers.Authorization = authHeader;
    return request;

  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status ?? null;
    const config = error?.config as AxiosRequestConfig & Record<string, any>;

    // MARK connectivity/no-response so Sentry can drop it
    if (!navigator.onLine || isAxiosNetworkError(error)) {
      error.__ignoreForSentry = true;
    }

    // Backend-down tagging (5xx)
    if (error.response && error.response.status >= 500) {
      error.__backendDown = true;
      error.__ignoreForSentry = false;
    }


    // Retry logic for 500/503 with exponential backoff + jitter
    if (status === 500 || status === 503) {
      config.__retryCount = config.__retryCount || 0;
      const retryCount = config.__retryCount + 1;
      config.__retryCount = retryCount;

      if (retryCount <= 3) {
        // exponential backoff: 1s, 2s, 4s capped + jitter
        const backoff = Math.min(1000 * 2 ** (retryCount - 1), 5000);
        const jitter = Math.random() * 300;
        await sleep(backoff + jitter);
        return axiosClient(config);
      }

      // give up after retries
      return Promise.reject(error);
    }
    else if (status === 401) {
      if (!refreshTokenPromise) {
        // check for an existing in-progress request
        // if nothing is in-progress, start a new refresh token request
        refreshTokenPromise = getRefreshToken().then((token) => {
          refreshTokenPromise = null; // clear state
          return token; // resolve with the new token
        });
      }
      return refreshTokenPromise.then((token) => {
        error.config.headers['Authorization'] = `Bearer ${token}`;
        return Axios(error.config);
      });
    } else if (status === 400) {
      error.__ignoreForSentry = true;
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);
const getRefreshToken = () => {
  return new Promise((resolve, reject) => {
    const expiredAccessTokenObj: IExpiredAccessToken = {
      expired: getAccessToken()?.accessToken,
    };
    if (getFromCookie(`refreshToken${getEnvironmentValue()}`)) {
      loginService
        .getRenewableAccessToken(expiredAccessTokenObj)
        .then((response) => {
          const authorizationToken: UserLoginValue | null = getAccessToken();
          if (authorizationToken && authorizationToken.accessToken) {
            authorizationToken.accessToken = response.accesToken;
            document.cookie = `AUTH_DATA${getEnvironmentValue()}=${JSON.stringify(authorizationToken)};path=/;domain= ${hostDomainUrl}`;
          }
          resolve(response.accesToken);
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleLogout();
            if (typeof window != "undefined")
              window.location.reload();
          }
          reject(error);
        });
    }
  });
};
//Subscription instance - Facing issue with x-channel header in subscription lambda APIs. Getting CORS error when we trying to pass x-channel in the header. Will remove this instance.
const axiosSubscriptionClient = Axios.create({
  timeout: 20000,
});
axiosSubscriptionClient.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosSubscriptionClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 503 || status === 500) {
      const retryCount = (config.retryCount || 0) + 1;
      config.retryCount = retryCount;
      if (retryCount <= 3) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(Axios(error.config));
          }, 500);
        });
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);


export { axiosClient, axiosSubscriptionClient };
