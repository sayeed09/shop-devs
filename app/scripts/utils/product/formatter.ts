import { UserLoginValue } from '../../interface/product';
import { getDomain, getEnvironmentValue } from '../helper';
import Cookies from 'js-cookie';

export const getUrlVariantId = (): number | null => {
  if (typeof window === 'undefined') return null;

  const UrlParams = new URLSearchParams(window.location.search);
  const variantID = UrlParams.get('variant');
  return variantID ? parseInt(variantID) : null;
};

export const getVariantIds = (productVariant: any) => {
  return productVariant.variants.map((v: any) => v.id.toString()).join(',');
};

export const isValidUrl = (string: string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

export const hideScroll = () => {
  if (typeof document === 'undefined') return;

  const templates = document.getElementsByClassName('template-product') as HTMLCollectionOf<HTMLElement>;
  Array.from(templates).forEach(t => (t.style.overflow = 'hidden'));
};

export const initialScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  window.history.replaceState(null, '', ' ');
  const templates = document.getElementsByClassName('template-product') as HTMLCollectionOf<HTMLElement>;
  Array.from(templates).forEach(t => (t.style.overflow = 'initial'));
};

export const getImageExt = (url: string) => {
  if (!url) return '';
  const path = url.split('/').pop()?.split('?')[0]?.split('#')[0] || '';
  return path.substring(path.lastIndexOf('.'));
};

export const convertImageSize = (url: string, width: number, height: number) => {
  const ext = getImageExt(url);
  const name = url.split(ext)[0];
  return `${name}_${width}X${height}${ext}`;
};

export const maxMobileWidth = 767;
export const hideThumbnailSlider = 992;

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

export const usePreloadImages = (imageSrcs: any[], documentWidth: number) => {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach(imgObj => {
    const img = new Image();
    img.src =
      documentWidth < maxMobileWidth
        ? convertImageSize(imgObj.src, 400, 400)
        : convertImageSize(imgObj.src, 800, 800);
  });
};

export const getAccessToken = (): UserLoginValue | null => {
  if (typeof window === 'undefined') return null;

  const authData = Cookies.get(`AUTH_DATA${getEnvironmentValue()}`);
  return authData ? JSON.parse(authData) : null;
};

export const formatToPrice = (price: number | string) => {
  return Math.trunc(Number(price));
};

export const getFromCookie = (key: string) => {
  if (typeof window === 'undefined') return null;
  return Cookies.get(key);
};

export const setCookie = (name: string, value: string, expiry?: string) => {
  if (typeof document === 'undefined') return;

  const setExpiry = expiry ? `expires=${expiry};` : '';
  document.cookie = `${name}=${value};${setExpiry}path=/; domain=${getDomain()};`;
};

/* UDS-645 Experiment Start */
export const getFlavourImage = (itemName: string) => {
  switch (itemName) {
    case "Guava Glow":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_658.png?v=1747371700";
    case "Classic":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_660.png?v=1747370197";
    case "Berry Orange":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/grapes_1.png?v=1747371700";
    case "Watermelon":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/image_659.png?v=1747370196";
    case "Strawberry Swirl":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/strawberry_1.png?v=1747994460";
    case "Orange Zing":
      return "https://cdn.shopify.com/s/files/1/2393/2199/files/orange_1.png?v=1747994461";
    default:
      return "";
  }
};
/* UDS-645 Experiment End */