import Cookies from 'js-cookie';
import { OtpVerifyData } from '../interface/product';
import { getFromCookie } from './product/formatter';

const isBrowser = typeof window !== "undefined";

// ---------------------- LOCAL STORAGE ----------------------

export const setToLocalStorage = (key: string, value: any) => {
  if (!isBrowser) return null;
  try {
    localStorage.setItem(key, value);
  } catch {
    return null;
  }
};

export const getFromLocalStorage = (key: string) => {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (!isBrowser) return null;
  try {
    localStorage.removeItem(key);
  } catch {
    return null;
  }
};

// ---------------------- HOST DOMAIN ----------------------

export const hostDomainUrl = isBrowser
  ? window.location.hostname.split(".").splice(-2).join(".")
  : "";

// ---------------------- ENVIRONMENT ----------------------

export const getEnvironmentValue = (): string | undefined => {
  if (!isBrowser) return undefined;
  const win: any = window;

  if (win.ENVIRONMENT === "dev") return "_DEV";
  if (win.ENVIRONMENT === "prod" && win.Shopify?.theme?.id !== 120350801979) {
    return "";
  }
  if (win.Shopify?.theme?.id === 120350801979) return "_PREPROD";
};

// ---------------------- AUTH TOKEN ----------------------

export const setAuthTokenWRTEnv = (authData: OtpVerifyData) => {
  if (!isBrowser) return;

  const authObject = {
    accessToken: authData?.tokens?.accessToken,
    phone: authData?.phone
  };

  document.cookie = `AUTH_DATA${getEnvironmentValue()}=${JSON.stringify(authObject)};path=/;domain=${getDomain()}`;
  document.cookie = `refreshToken${getEnvironmentValue()}=${authData.tokens.refreshToken};path=/;domain=${getDomain()}`;
};

// ---------------------- CLIPBOARD ----------------------

export const copyToClipboard = (string) => {
  if (!isBrowser) return false;

  let textarea;
  let result;

  try {
    textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', true);
    textarea.style.position = 'fixed';
    textarea.value = string;

    document.body.appendChild(textarea);
    textarea.select();

    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    if (textarea) document.body.removeChild(textarea);
  }

  if (!result) {
    const copyHotkey = navigator.platform.toUpperCase().includes('MAC') ? '⌘C' : 'CTRL+C';
    result = prompt(`Press ${copyHotkey}`, string);
    if (!result) return false;
  }
  return true;
};

// ---------------------- UUID ----------------------

export const uuidv4 = (): string | undefined => {
  try {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

// ---------------------- LOGOUT ----------------------

export const handleLogout = () => {
  if (!isBrowser) return;

  try {
    Cookies.set(`AUTH_DATA${getEnvironmentValue()}`, '', {
      expires: Date.parse('Thu, 01 Jan 1970 00:00:00 GMT'),
      path: '/',
      domain: hostDomainUrl
    });

    Cookies.set(`refreshToken${getEnvironmentValue()}`, '', {
      expires: Date.parse('Thu, 01 Jan 1970 00:00:00 GMT'),
      path: '/',
      domain: hostDomainUrl
    });

    (window as any).$chatwoot?.reset?.();
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

// ---------------------- CHATWOOT ENTRY POINT ----------------------

export const getChatwootEntryPoint = () => {
  if (!isBrowser) return undefined;

  const map = {
    '/pages/oziva-prime': 'prime',
    '/pages/chat': 'chat_landing_page',
    '/pages/contact-us': 'contact_us',
  };

  return map[window.location.pathname] || 'ham_menu';
};

// ---------------------- DEVICE CHECK ----------------------

export const isMobile = () => {
  if (!isBrowser) return true;
  return document.body.clientWidth < 768;
};

// ---------------------- URL ----------------------

export const isValidUrl = (str) => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return pattern.test(str);
};

// ---------------------- SUBSCRIPTION STORAGE ----------------------

export const getSubscriptionDataFromStorage = () => {
  if (!isBrowser) return null;

  const cookieData = getFromCookie('subscriptionData');
  const sessionData = sessionStorage.getItem('subscriptionData');

  if (cookieData) {
    if (document.referrer.includes('shop.dev.oziva')) {
      return JSON.parse(cookieData);
    } else if (sessionData) {
      return JSON.parse(sessionData);
    }
    return JSON.parse(cookieData);
  }

  if (sessionData) return JSON.parse(sessionData);

  return null;
};

export const checkIfSubscriptionCart = () => {
  if (!isBrowser) return false;

  const subscriptionProductData =
    sessionStorage.getItem('subscriptionData') || getFromCookie('subscriptionData');

  const queryParameters = new URLSearchParams(window.location.search);

  return subscriptionProductData && queryParameters.get('view') === 'subscription';
};

// ---------------------- QUERY PARAMS ----------------------

export const setQueryParams = (queryParams: string) => {
  if (!isBrowser) return;

  const currentUrl = new URL(window.location.href);
  const params = new URLSearchParams(currentUrl.search);

  params.set('concern', queryParams);

  currentUrl.search = params.toString();
  window.history.pushState({}, '', currentUrl.toString());
};

export const removeQueryParams = () => {
  if (!isBrowser) return;

  const currentUrl = new URL(window.location.href);
  const params = new URLSearchParams(currentUrl.search);

  params.delete('concern');

  currentUrl.search = params.toString();
  window.history.replaceState(null, '', currentUrl.toString());
};

// ---------------------- UTILITIES ----------------------

export const getCouponCode = (couponCode: string) => {
  return couponCode?.includes('_freebies')
    ? couponCode?.split('|')[0] || ''
    : couponCode;
};

export const getDomain = () => {
  if (!isBrowser) return "";
  return window.location.href.includes("localhost") ? "localhost" : hostDomainUrl;
};

// ---------------------- OBSERVERS (SSR-SAFE BY EARLY RETURN) ----------------------

export const handleStickyButton = () => {
  if (!isBrowser) return () => { };

  const timeout = setTimeout(() => {
    const allBanners = document.querySelectorAll('.banner-img-sec');
    if (!allBanners) return;

    const microInteractionV1 = document.querySelector('.micro-interaction-v1');
    const microInteractionV2 = document.querySelector('.micro-interaction-v2');
    const valueCommunication = document.querySelector('.value-communication');
    const offerSection = document.querySelector('.product-offers-section-main');

    const bannerClasses: string[] = [];
    allBanners.forEach((_, index) => bannerClasses.push(`banner-image-${index + 2}`));

    const targets: Element[] = [
      ...bannerClasses.map(cls => document.querySelector(`.${cls}`)).filter(Boolean) as Element[],
      ...(valueCommunication ? [valueCommunication] : []),
      ...(offerSection ? [offerSection] : []),
    ];

    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const classList = entry.target.classList;

        if (classList.contains('value-communication')) {
          entry.isIntersecting
            ? visibleSections.add('value-communication')
            : visibleSections.delete('value-communication');
        }

        if (classList.contains('product-offers-section-main')) {
          entry.isIntersecting
            ? visibleSections.add('product-offers-section-main')
            : visibleSections.delete('product-offers-section-main');
        }

        bannerClasses.forEach((bannerCls) => {
          if (classList.contains(bannerCls)) {
            entry.isIntersecting
              ? visibleSections.add(bannerCls)
              : visibleSections.delete(bannerCls);
          }
        });
      });

      const bannerVisible = bannerClasses.some((cls) => visibleSections.has(cls));

      if (microInteractionV1) {
        if (visibleSections.has('value-communication') && !visibleSections.has('product-offers-section-main')) {
          microInteractionV1.style.position = 'fixed';
          microInteractionV1.style.bottom = '80px';
          microInteractionV1.style.display = 'block';
        } else {
          microInteractionV1.style.position = 'unset';
          microInteractionV1.style.display = 'none';
        }
      }

      if (microInteractionV2) {
        if (bannerVisible) {
          microInteractionV2.style.position = 'fixed';
          microInteractionV2.style.bottom = '80px';
          microInteractionV2.style.display = 'block';
        } else {
          microInteractionV2.style.position = 'unset';
          microInteractionV2.style.display = 'none';
        }
      }
    });

    targets.forEach((el) => observer.observe(el));
  }, 2000);

  return () => clearTimeout(timeout);
};

export const mutationObserver = () => {
  if (!isBrowser) return;

  const observer = new MutationObserver((mutations, obs) => {
    const target = document.querySelector('.goolge-review-sec');
    if (target) {
      handleStickyButton();
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

// ---------------------- DATE CHECK ----------------------

export const hasDaysPassed = (dateStr, days) => {
  if (!dateStr || typeof dateStr !== 'string') return false;

  const normalizedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');

  const startDate = new Date(normalizedDateStr);
  if (isNaN(startDate.getTime())) return false;

  startDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + days);

  return today >= targetDate;
};

// ---------------------- EVENT ID ----------------------

export const generateEventId = () => {
  if (!isBrowser) return "server-generated-id";

  if (window.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};