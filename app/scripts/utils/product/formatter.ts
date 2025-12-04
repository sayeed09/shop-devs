import { UserLoginValue } from '../../interface/product';
import { getDomain, getEnvironmentValue } from '../helper';
import Cookies from 'js-cookie';

export const getUrlVariantId = () => {
  let variantID = null;
  const UrlParams = new URLSearchParams(window.location.search);
  variantID = UrlParams.get('variant');
  return parseInt(variantID);
};
export const getVariantIds = (productVaraint: any) => {
  let ids = '';
  productVaraint.variants.forEach((item: any, index: number) => {
    ids = ids + item.id.toString();
    if (index < productVaraint.variants.length - 1) {
      ids = ids + ',';
    }
  });
  return ids;
};
export const isValidUrl = (string: string) => {
  let url_string;
  try {
    url_string = new URL(string);
  } catch (_) {
    return false;
  }
  return url_string.protocol === 'http:' || url_string.protocol === 'https:';
};
export const hideScroll = () => {
  const template = document.getElementsByClassName(
    'template-product',
  ) as HTMLCollectionOf<HTMLElement>;
  if (template != null) {
    for (let i = 0; i < template.length; i++) {
      template[i].style.overflow = 'hidden';
    }
  }
};
export const initialScroll = () => {
  window.history.replaceState(null, '', ' ');
  const template = document.getElementsByClassName(
    'template-product',
  ) as HTMLCollectionOf<HTMLElement>;
  if (template != null) {
    for (let i = 0; i < template.length; i++) {
      template[i].style.overflow = 'initial';
    }
  }
};
export const getImageExt = (url: string) => {
  return (url = url?.substr(1 + url.lastIndexOf('/')).split('?')[0])
    ?.split('#')[0]
    ?.substr(url.lastIndexOf('.'));
};
export const convertImageSize = (
  url: string,
  width: number,
  height: number,
) => {
  const imageExt = getImageExt(url);
  const imageName = url?.split(imageExt)[0];
  const newImageURL = `${imageName}_${width}X${height}${imageExt}`;
  return newImageURL;
};
export const maxMobileWidth = 767;
export const hideThambnailSilder = 992;
declare global {
  interface Window {
    usePreloadImagesData?: Record<string, unknown[]>;
    ENVIRONMENT: string;
    testAb1: number;
    testUDS521: number;
    videoTestimonialExp?: number;
    gtag?: (...args: any[]) => void;
  }
}
export const usePreloadImages = (imageSrcs: any, documentWidth: number) => {
  for (const imageArr of imageSrcs) {
    const img = new Image();
    img.src =
      documentWidth < maxMobileWidth
        ? convertImageSize(imageArr.src, 400, 400)
        : convertImageSize(imageArr.src, 800, 800);
  }
};

export const getAccessToken = (): UserLoginValue | null => {
  const authData: string | null = Cookies.get(`AUTH_DATA${getEnvironmentValue()}`)
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
}

export const formatToPrice = (price: number | string) => {
  return Math.trunc(Number(price));
};

export const getFromCookie = (key: string) => {
  return Cookies.get(key);
};

export const setCookie = (name: string, value: string, expiry?: string) => {
  const setExpiry = expiry ? `expires=${expiry};` : ''
  document.cookie = name + '=' + value + ';' + setExpiry + 'path=/; domain=' + getDomain() + ';';
};

{/* UDS-645 Experiment Start */ }
export const getFlavourImage = (itemName: string) => {
  switch (itemName) {
    case "Guava Glow":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_658.png?v=1747371700";
    case "Classic":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_660.png?v=1747370197";
    case "Berry Orange":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/grapes_1.png?v=1747371700";
    case "Watermelon":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_659.png?v=1747370196"
    case "Strawberry Swirl":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/strawberry_1.png?v=1747994460";
    case "Orange Zing":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/orange_1.png?v=1747994461";
    default:
      return "";
  }
}
{/* UDS-645 Experiment End */ }
