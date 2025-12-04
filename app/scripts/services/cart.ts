import {
  IAnalyticsModel,
  ICartState,
  ICodeVisibility,
  ISubscriptionObject,
} from '../interface/cart';
import {
  AddressFetchProgressResponse,
  ProceedToCheckoutPayload,
  UpdateCheckoutResponseModel,
} from '../models/cart/checkout';
import {
  FreebieRequestModel,
  FreebiesResponseModel,
} from '../models/cart/freebies';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetUpsellResponse,
  GetOfferResponse,
  GetCashResponse,
} from '../models/cart/get-response';
import { ProductDetailResponse } from '../models/cart/product';
import { baseEndpoints } from '../utils/endpoints';
import { getAccessToken, getFromCookie } from '../utils/product/formatter';
import { axiosClient } from '../utils/axios-client';
import { UserLoginValue } from '../interface/product';
import axios from 'axios';
import { getFBPixelHeader } from '../utils/cart/helper';

const getCartItems = async () => {
  const { data } = await axios
    .get<GetCartListResponse>(`/cart.js`)
    .then((response) => {
      return response;
    });
  return data;
};
const addItem = async (id: number, quantity: number) => {
  const { data } = await axios
    .post<AddCartItemResponse>(`/cart/add.js`, {
      quantity,
      id,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return data;
};
const getUpsellList = async (ids: string) => {
  const { data } = await axiosClient
    .get<GetUpsellResponse[]>(
      `${baseEndpoints.upsell}/variants/upsell?ids=${ids}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};
const getCashRadium = async (requestModel: FreebieRequestModel) => {
  const { data } = await axiosClient
    .post<GetCashResponse[]>(`${baseEndpoints.cash}/cart/user`, requestModel)
    .then((response) => {
      return response;
    });
  return data;
};
const getCashDetails = async (cart: ICartState) => {

  const freebiePrice = cart.selectedFreebies.reduce((currentPrice, freebieProduct) => freebieProduct.price + currentPrice, 0);
  const cart_total = (cart?.cart?.order_subtotal - freebiePrice) / 100;
  const userPhone = getAccessToken() && getAccessToken()?.phone;
  const { data } = await axiosClient
    .get<GetCashResponse[]>(
      `${baseEndpoints.redeem}` + userPhone + `/cash?cart_value=` + cart_total,
    )
    .then((response) => {
      return response;
    });
  return data;
};
const getFreebies = async (requestModel: FreebieRequestModel) => {
  const { data } = await axiosClient
    .post<FreebiesResponseModel[]>(`${baseEndpoints.freebie}`, requestModel)
    .then((response) => {
      return response;
    });
  return data;
};
const getCartList = async (requestModel: FreebieRequestModel) => {
  const authorizationToken: UserLoginValue | null = getAccessToken();
  if (authorizationToken && authorizationToken.accessToken) {
    const { data } = await axiosClient
      .post<GetCashResponse>(`${baseEndpoints.cash}/cart/user`, requestModel, {
        headers: {
          'x-channel': 'web',
        },
      })
      .then((response) => {
        return response;
      });
    return data;
  }
  const { data } = await axiosClient
    .post<GetCashResponse>(`${baseEndpoints.cash}/cart`, requestModel)
    .then((response) => {
      return response;
    });
  return data;
};

const proceedCheckout = async (payload: ProceedToCheckoutPayload, mixpanelSessionId?: string) => {
  const authorizationToken: UserLoginValue | null = getAccessToken();
  let url = '';
  const cookieUtm = getFromCookie('utmValues');
  let urlQueryParams = '?v=v2';
  if(cookieUtm) {
    urlQueryParams += cookieUtm;
  }

  if (authorizationToken && authorizationToken.accessToken) {
    url = `${baseEndpoints.checkout}/checkout/user${urlQueryParams}`;
  } else {
    url = `${baseEndpoints.checkout}${urlQueryParams}`;
  }
  const { data } = await axiosClient
    .post<GetOfferResponse>(url, payload, {
      headers: {
        'x-channel': 'web',
        ...getFBPixelHeader(),
        'Mixpanel-Session-Id': String(mixpanelSessionId)
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};
const proceedToPayment = async (
  id: string,
  address: Object,
): Promise<UpdateCheckoutResponseModel> => {
  let apiURL = `${baseEndpoints.checkout}/${id}`;
  let apiHeader: any = {
    Accept: 'API-Version/1', // this is done for additional validation of pincode servicable
  };
  const raw = JSON.stringify(address);
  try {
    const response = await axiosClient.post(apiURL, raw, {
      headers: apiHeader,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOfferList = async (jsonVar: ICodeVisibility) => {
  const jsonData = JSON.stringify(jsonVar);
  const { data } = await axiosClient
    .post<GetOfferResponse>(`${baseEndpoints.offer}`, jsonData)
    .then((response) => {
      return response;
    });
  return data;
};
const getProductDetails = async (productHandle: string) => {
  const { data } = await axios
    .get<ProductDetailResponse>(`./products/${productHandle}.js`)
    .then((response) => {
      return response;
    });
  return data;
};

const updateItems = async (updateProduct: any) => {
  const { data } = await axios
    .post<GetCartListResponse>(`/cart/update.js`, updateProduct)
    .then((response) => {
      getCartItems();
      return response;
    });
  return data;
};

const storeAnalyticsData = (analyticsPayload: IAnalyticsModel) => {
  const data = axiosClient
    .post<any>(`${baseEndpoints.experimentalAnalytics}`, analyticsPayload)
    .then((response) => {
      return response;
    });
  return data;
};

const proceedToCheckoutWithSubsriptionItem = (
  subscriptionObject: ISubscriptionObject,
  mixpanelSessionId: string
) => {
  try {
    const data = axiosClient
      .post<any>(`${baseEndpoints.subscription}`, subscriptionObject, {
        headers: {
          ...getFBPixelHeader(),
          'Mixpanel-Session-Id': String(mixpanelSessionId)
        }
      })
      .then((response) => {
        return response;
      });
    return data;
  } catch (error) {
    console.log('Error : ', error);
  }
};
const fetchAddressSaveProgress = async (token: string): Promise<AddressFetchProgressResponse> => {
  const { data } = await axiosClient
    .get<AddressFetchProgressResponse>(`${baseEndpoints.addressFetchProgress}/?addressImportToken=${token}`)
    .then((response) => {
      return response;
    });
  return data;
};
export const cartService = {
  getCartItems,
  getUpsellList,
  proceedCheckout,
  getFreebies,
  addItem,
  getOfferList,
  getCashRadium,
  getCashDetails,
  getProductDetails,
  getCartList,
  updateItems,
  storeAnalyticsData,
  proceedToCheckoutWithSubsriptionItem,
  proceedToPayment,
  fetchAddressSaveProgress
};
