import { baseEndpoints } from '../utils/endpoints';
import {
  AddressList,
  ProductResponseModal,
  UserData,
  IProductReviewsPayload,
  GetDeliveryDetailResponseModel,
} from '../interface/product';
import { AddCartItemResponse } from '../models/cart/get-response';
import { axiosClient, axiosSubscriptionClient } from '../utils/axios-client';
import { ICollectionQuery } from '../interface/cart';
import axios from 'axios';
import { IConcernCategoryResponse } from '../interface/concern-categories';
import { FetchByPincodeDetailModel } from '../models/cart/checkout';

export const getProductDetails = async (
  productId: string,
  source: string,
  getInStock: boolean,
  topOfFunnel: boolean,
) => {
  const { data } = await axiosClient
    .get<ProductResponseModal>(
      `${baseEndpoints.product}catalog/product/details/${productId}?topOfFunnel=${topOfFunnel}&inStock=${getInStock}&pageSource=${source}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};
const getProductDetailsV2 = async (
  productId: string,
  expand: string,
  getInStock: boolean,
  topOfFunnel: boolean,
) => {
  const { data } = await axiosClient
    .get<ProductResponseModal>(
      `${baseEndpoints.product}catalog/product/details/v2/${productId}?topOfFunnel=${topOfFunnel}&inStock=${getInStock}&expand=${expand}&pageSource=pdp`,
    )
    .then((response) => {
      return response;
    });
  return data;
};
export const getStarReviewDetails = async (payload: IProductReviewsPayload) => {
  const { data } = await axiosClient
    .post(`${baseEndpoints.review}`, payload)
    .then((response) => {
      return response;
    });
  return data;
};

export const getGoogleReviewsJsonData = async () => {
  const { data } = await axiosClient
    .get(`https://cdn.shopify.com/s/files/1/2393/2199/files/brand-review.json?v=1730878344`)
    .then((response) => {
      return response;
    });
  return data;
}
export const getStarAllReviewDetails = async (productID: string) => {
  const { data } = await axiosClient
    .get(
      `${baseEndpoints.allReview}?api_token=${baseEndpoints.judgeMeApiToken}&shop_domain=${baseEndpoints.judgeMeDomain}&external_id=${productID}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};
export const getSubscription = async (variantId: any) => {
  const { data } = await axiosClient
    .get(`${baseEndpoints.product}subscription/variant/${variantId}`)
    .then((response) => {
      return response;
    });
  return data;
};
export const getVaraintDetails = async (variantId: any) => {
  const { data } = await axiosClient
    .get(`${baseEndpoints.product}catalog/product/variant/${variantId}`)
    .then((response) => {
      return response;
    });
  return data;
};
export const getProductConfigDetails = async (productId: string) => {
  const { data } = await axiosClient
    .get(`${baseEndpoints.config}/app/product/${productId}`)
    .then((response) => {
      return response;
    });
  return data;
};
const addItem = async (id: string, quantity: number) => {
  const { data } = await axios
    .post<AddCartItemResponse>(`/cart/add.js`, {
      quantity,
      id,
    })
    .then((response) => {
      return response;
    });
  return data;
};
const addItems = async (items: any) => {
  const { data } = await axios
    .post<AddCartItemResponse>(`/cart/add.js`, items)
    .then((response) => {
      return response;
    });
  return data;
};
export const subscriptionCustomer = async (customerData: any) => {
  const apiHeader = {
    Accept: 'API-Version/1',
  };
  const { data } = await axiosClient
    .post(
      `${baseEndpoints.product}subscription/v2/subscription-customer`,
      customerData,
      {
        headers: apiHeader,
      },
    )
    .then((response) => {
      return response;
    });
  return data;
};
export const paymentProcess = async (paymentData: any) => {
  const { data } = await axiosSubscriptionClient
    .post(
      `${baseEndpoints.subscriptionPaymentAPi}/v2/subscription`,
      paymentData,
    )
    .then((response) => {
      return response;
    });
  return data;
};
export const paymentCallback = async (callbackData: any) => {
  const { data } = await axiosSubscriptionClient
    .post(`${baseEndpoints.subscriptionPaymentAPi}/cod/callback`, callbackData)
    .then((response) => {
      return response;
    });
  return data;
};
export const paymentUpi = async (callbackData: any) => {
  const { data } = await axiosClient
    .post(`${baseEndpoints.checkout}/updatePayment`, callbackData)
    .then((response) => {
      return response;
    });
  return data;
};
export const getStateNamebyZip = async (zip: string): Promise<FetchByPincodeDetailModel> => {
  const { data } = await axiosClient
    .get(`${baseEndpoints.checkout}/shipping/${zip}`)
    .then((response) => {
      return response;
    }).catch((err) => err);
  return data;
};
export const getDeliverySpeed = async (zip: string): Promise<GetDeliveryDetailResponseModel> => {
  const { data } = await axiosClient
    .get(`${baseEndpoints.deliverySpeed}/${zip}`)
    .then((response) => {
      return response;
    });
  return data;
};

const addNewAddress = async (userData: UserData) => {
  const { data } = await axiosClient
    .post(baseEndpoints.address, userData, {
      headers: {
        'x-channel': 'web',
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};

const editUserAddress = async (userData: UserData) => {
  const { data } = await axiosClient
    .put(baseEndpoints.address, userData, {
      headers: {
        'x-channel': 'web',
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};

const deleteUserAddress = async (id: number) => {
  const { data } = await axiosClient
    .delete(`${baseEndpoints.address}/${id}`, {
      headers: {
        'x-channel': 'web',
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};

const getCollectionData = async (
  collectionHandle: string,
  collectionHandleQuries: ICollectionQuery,
) => {
  const { page, sortBy, sortOrder, limit } = collectionHandleQuries;
  const { data } = await axiosClient
    .get<any>(
      `${baseEndpoints.collectionByHandle}/${collectionHandle}?${getQuery(
        page,
        limit,
        sortBy as string,
        sortOrder as string,
      )}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};

const getQuery = (
  pageNo: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
) => {
  let query = '';
  if (pageNo) {
    query += `page=${pageNo}`;
  }
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (sortBy) {
    query += `&sortBy=${sortBy}`;
  }
  if (sortOrder) {
    query += `&sortOrder=${sortOrder}`;
  }
  return query;
};

function createCountdown() {
  const maxTime = 2 * 60 + 33; // Maximum time in seconds (2 hours and 33 minutes)
  const minTime = 47 * 60; // Minimum time in seconds (47 minutes)
  const storageKey = 'countdownTime';
  let currentTime = Number(localStorage.getItem(storageKey)) || minTime;

  function countDown() {
    if (currentTime === 0) {
      currentTime = maxTime; // Reset timer to the maximum value after reaching 0
    } else {
      currentTime -= 1;
    }
    localStorage.setItem(storageKey, currentTime.toString());
  }

  const interval = setInterval(countDown, 1000); // Update the countdown every second

  // Stop the countdown at 8 pm
  const endHour = 20;
  const checkTime = () => {
    const now = new Date();
    if (now.getHours() >= endHour) {
      clearInterval(interval);
    }
  };

  // Check the current time every minute
  setInterval(checkTime, 60000);

  // Expose a method to get the current time value
  function getCurrentTimeValue() {
    const currentHour = new Date().getHours();
    if (currentHour < 20 && currentHour > 8) {
      const hours = Math.floor(currentTime / 3600);
      const minutes = Math.floor((currentTime % 3600) / 60);
      const seconds = currentTime % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return '';
  }
  // Return an object with the exposed method
  return {
    getCurrentTimeValue,
  };
}

export const getConcernCategoryData = async (groupName: string) => {
  const { data } = await axiosClient
    .get<IConcernCategoryResponse>(`${baseEndpoints.collectionByHandle}/group/${groupName}`)
    .then((response) => {
      return response;
    });
  return data;
};

export const getHVData = async () => {
  const { data } = await axiosClient.get(
    'https://cdn.shopify.com/s/files/1/2393/2199/files/har-vitamin-data.json?v=1731310563'
  );
  return data;
};

export const getFertilityData = async () => {
  const { data } = await axiosClient.get(
    'https://cdn.shopify.com/s/files/1/2393/2199/files/fertility.json?v=1732217201'
  );
  return data;
};

export const downloadPDF = async (reportUrl) => {
  try {
    const response = await fetch(reportUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = reportUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
      console.error("Error downloading file:", error);
  }
};

export const fetchReportsData = async (productId: string, pageNumber: number, limit: number) => {
  try {
    const response = await axiosClient.get(`${baseEndpoints.product}catalog/product/details/v2/${productId}/lab-reports?page=${pageNumber}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports data:", error);
    throw error;
  }
}

const orderDeliveryTimes = createCountdown();


export const productService = {
  getProductDetails,
  getStarReviewDetails,
  getStarAllReviewDetails,
  getSubscription,
  getVaraintDetails,
  getProductConfigDetails,
  addItems,
  addItem,
  subscriptionCustomer,
  paymentProcess,
  paymentCallback,
  paymentUpi,
  getStateNamebyZip,
  getDeliverySpeed,
  addNewAddress,
  editUserAddress,
  deleteUserAddress,
  getCollectionData,
  orderDeliveryTimes,
  getConcernCategoryData,
  getProductDetailsV2,
  getHVData,
  getFertilityData,
  getGoogleReviewsJsonData,
  downloadPDF,
  fetchReportsData
};
