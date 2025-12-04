import { sha256 } from 'js-sha256';
import { ICartState } from '../../interface/cart';
import { IUserState } from '../../interface/user';
import {
  AddressModel,
  FormValues,
  ProceedToCheckoutPayload,
  UpdateCheckoutRequestModel,
} from '../../models/cart/checkout';
import {
  CartItem,
  GetCartListResponse,
  GetCashResponse,
  LineItem,
} from '../../models/cart/get-response';
import { getAccessToken } from '../../utils/product/formatter';
import {
  CouponRequestModel,
  FreebiesResponseModel,
  VariantRequestModel,
} from '../../models/cart/freebies';
import { AddressList, UserLoginValue } from '../../interface/product';
import {
  BuildYourBoxDetailProvider,
  getVariantsFromStorage,
} from '../../utils/build-you-box/helper';
import { hostDomainUrl } from '../helper';

export const formatRequestPayload = (cart: ICartState) => {
  const response: VariantRequestModel[] = [];
  cart?.cart?.line_items?.map((item) => {
    const request = {
      id: item.variant_id,
      quantity: item.quantity,
    };
    response.push(request);
  });
  return response;
};

export const getVariantIds = (cart: ICartState) => {
  let ids = '';
  cart?.cart?.line_items?.forEach((item, index) => {
    ids = ids + item.variant_id.toString();
    if (index < cart?.cart?.line_items?.length - 1) {
      ids = ids + ',';
    }
  });
  return ids;
};

export const getVariantIdsName = (cart_data: any) => {
  const ids = [];
  const names = [];
  const price = [];
  const quantity = [];
  const product_id = [];
  const benefits_chips = [];
  for (let t = 0; t < cart_data.length; t++) {
    ids.push(cart_data[t]['variant_id'].toString());
    names.push(cart_data[t]['title']);
    price.push(cart_data[t]['line_price'] / 100);
    quantity.push(cart_data[t]['quantity']);
    product_id.push(cart_data[t]['product_id'].toString());
    benefits_chips.push(cart_data[t]['benefits']);
  }
  return {
    ids: ids,
    names: names,
    price: price,
    quantity: quantity,
    product_id: product_id,
    benefits_chips: benefits_chips,
  };
};

export const getCartItemsCount = (cartItems) => {
  //Below condition put for the build your box experiement. Will remove once experiment over
  const quantity =
    cartItems
      ?.map((item) => item?.quantity)
      .reduce((sum, val) => sum + val, 0) || 0;
  if (
    getVariantsFromStorage() &&
    getVariantsFromStorage().length > 0 &&
    cartItems?.length > 0
  ) {
    const uniqueHandles: string[] = Array.from(
      new Set(getVariantsFromStorage().map((item) => item.collectionHandle)),
    );
    let totalQty = 0;
    uniqueHandles.forEach(
      (item) => (totalQty += BuildYourBoxDetailProvider[item]?.quantity),
    );
    return quantity - (totalQty - uniqueHandles.length);
  }
  return quantity;
};

export const getOfferIdsInArray = (items: LineItem[], keyName: string) => {
  const productIds: string[] = [];
  items.forEach((item) => {
    productIds.push(item[keyName].toString());
  });
  return productIds;
};

export const getCheckoutRequestData = (cart: ICartState) => {
  const checkoutPayload: ProceedToCheckoutPayload = {
    discount_code: cart.discountCode,
    discount_value: (cart?.discountAndCashResponse?.total_discount || 0) / 100,
    order_total: cart.discountAndCashResponse.order_subtotal,
    order_subtotal: cart.discountAndCashResponse.order_total,
    payment_hash: getCheckoutPaymentHash(cart),
    line_items: getCartItems(cart),
    channel: 'shopify_web',
    page_url: window.location.href,
    localstorage_coupon_code: sessionStorage.getItem('coupon_code')
      ? sessionStorage.getItem('coupon_code')
      : '',
    cart_js_response: {
      data: cart.cart,
      status: 200,
      statusText: '',
    },
    cash_apply:
      sessionStorage.getItem('ozivacash_apply_check') === 'applied'
        ? true
        : false,
  };
  return checkoutPayload;
};
export const getCartItems = (cart: ICartState) => {
  const currentLineItems: CartItem[] = [...cart.cart.line_items];
  cart.selectedFreebies.map((freebiesItem: any) => {
    if (currentLineItems.map(lineItem => lineItem.variant_id).includes(freebiesItem.variant_id)) {
      const indexToRemove = currentLineItems.findIndex(obj => obj.variant_id === freebiesItem.variant_id);
      if (indexToRemove !== -1) {
        currentLineItems.splice(indexToRemove, 1);
      }
      freebiesItem['type'] = 'FREEBIE';
      currentLineItems.push(freebiesItem);
    }
  })
  return currentLineItems;
};
export const getCheckoutURL = () => {
  let redirect_base_url = `https://checkout.${hostDomainUrl}/`;
  if ((window as any).ENVIRONMENT === 'dev') {
    redirect_base_url = `https://checkout.dev.${hostDomainUrl}/`;
  }
  if (
    (window as any).ENVIRONMENT === 'prod' &&
    (window as any).Shopify?.theme?.id == '120350801979'
  ) {
    //preprod theme id)
    redirect_base_url = `https://checkout-preprod.dev.${hostDomainUrl}/`;
  }
  const hostName = window.location.hostname;
  if (hostName == "expertsdev.oziva.in") {
    redirect_base_url = `https://checkout-experts.dev.oziva.in`;
  }
  if (hostName == "experts.oziva.in") {
    redirect_base_url = `https://checkout.experts.oziva.in`;
  }
  if (hostName == "wellness.oziva.in") {
    redirect_base_url = `https://checkout.wellness.oziva.in`;
  }
  return redirect_base_url;
};

export const getPrimeVariantId = () => {
  let primeVariantId: number;
  if ((window as any).ENVIRONMENT === 'dev') {
    primeVariantId = 39372077072428;
  } else {
    primeVariantId = 39348247101499;
  }
  return primeVariantId;
};

export const foundPrimeItemInCart = (cart_item_ids: number[]) => {
  const primeVariantId = getPrimeVariantId();
  if (cart_item_ids.includes(primeVariantId)) {
    return true;
  }
  return false;
};

export const showPrimeItemInCart = (userState: IUserState) => {
  const authorizationToken: UserLoginValue | null = getAccessToken();
  if (authorizationToken && authorizationToken.accessToken) {
    return userState?.userProfile.prime?.current_status === 'prime'
      ? false
      : true;
  } else {
    return true;
  }
};

export const getCheckoutPaymentHash = (cart: ICartState) => {
  let messageHash = '';
  const hmac_sha256 = 'vgCdx0hznu0PxZnGPemRNljU';
  messageHash =
    messageHash + cart.cart.order_total + '|' + cart.cart.order_subtotal;
  cart.cart.line_items.forEach((item) => {
    messageHash = messageHash + '|' + item.variant_id + '|' + item.quantity;
  });
  return sha256.hmac(hmac_sha256, messageHash);
};

export const getRandomUserNumber = (variantId: any) => {
  let flag = true;
  let randomNumb = Number(String(variantId.slice(-3)));
  if (randomNumb < 200) {
    randomNumb = randomNumb + 200;
  }
  while (flag) {
    randomNumb = randomNumb + 20;
    const module = randomNumb % 50;
    if (module < 20 && module > 0) {
      randomNumb = randomNumb - module;
    }
    if (randomNumb % 50 === 0) {
      flag = false;
    }
  }
  return randomNumb;
};

export const formatCartAPIVariant = (data: GetCartListResponse) => {
  let response: VariantRequestModel[] = [];
  data?.items?.forEach((item) => {
    response.push({ id: item?.id, quantity: item?.quantity });
  });
  return response;
};

export const formatCartRadiumAPIVariant = (data: any, discountCode: string, isCash: boolean): CouponRequestModel => {

  const currentLineItems: CartItem[] = data.line_items ? [...data.line_items] : [...data.items];
  let response: VariantRequestModel[] = [];

  const appliedDiscountCode = discountCode || undefined;

  currentLineItems.map(lineItem => {
    return response.push({ id: lineItem?.variant_id, quantity: lineItem?.quantity });

  })
  return {
    variants: response,
    discountCode: appliedDiscountCode,
    cashApply: isCash,
  };
};

export const getCartAPIPayload = (
  data: GetCartListResponse,
  discountCode,
  isCash?,
) => {
  let requestPayload: CouponRequestModel;
  const appliedDiscountCode = discountCode ? discountCode.split('|').length > 0 ? discountCode.split('|')[0] : discountCode : null;
  return (requestPayload = {
    variants: formatCartAPIVariant(data),
    discountCode: appliedDiscountCode,
    cashApply: isCash,
  });
};

export const formatPriceWithCurrency = (price: number | undefined) => {
  try {
    return Number(price) >= 0 && `₹${Math.round(Number(price)).toLocaleString()}`;
  } catch (error) {
    console.log(`Error while formatting price : ${error}`);
  }
};

export const priceFormat = (price: number) => {
  try {
    return `${Math.round(price).toLocaleString()}`;
  } catch (error) {
    console.log(`Error while formatting price : ${error}`);
  }
};

export const getUpdateRequestModel = (values: AddressList) => {
  const shippingAddress: AddressModel = {
    first_name: values.firstName,
    last_name: values.lastName,
    address1: values.address1,
    address2: values.address2,
    zip: values.zip,
    city: values.city,
    country: values.country,
    country_name: values.country,
    province: values.province,
    phone: values.phone,
    accepts_marketing: values.acceptsMarketing,
    save_address: true,
  };
  let requestModel: UpdateCheckoutRequestModel = {
    shipping_address: shippingAddress,
  };

  return requestModel;
};


