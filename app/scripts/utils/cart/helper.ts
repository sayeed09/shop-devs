import { ICartState } from '../../interface/cart';
import { CartItem, PriceModel } from '../../models/cart/get-response';
import { getFromCookie } from '../product/formatter';
import {
  qbOfferEndDate,
  qbShowOfferDays,
} from './constants';
import { checkIfSubscriptionCart, getSubscriptionDataFromStorage } from '../../utils/helper';
import { SubscriptionProductDetails } from '../../interface/product';

// Store quick buy checkouts safely
export const storeQuickBuyCheckouts = (checkoutId: string, productId: string, variantId: string) => {
  if (typeof window === 'undefined') return;
  const data = { checkoutId, productId, variantId };
  sessionStorage.setItem('quickBuyCheckouts', JSON.stringify(data));
};

// Get quick buy items safely
export const getQuickBuyItems = () => {
  if (typeof window === 'undefined' || !localStorage.getItem) return;

  const quickBuyItems = localStorage.getItem('QuickBuyItems');
  if (!quickBuyItems) return;

  let itemList = JSON.parse(quickBuyItems) || [];
  if (itemList.length === 0) return;

  // Sort by order date (latest first)
  let sortedQuickBuyItems = itemList.sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  // Filter based on offer expiry
  sortedQuickBuyItems = sortedQuickBuyItems.filter(item => {
    const todayDate = new Date();
    let offerStartDate = new Date(item.orderDate);
    let offerEndDate = new Date(item.orderDate);

    offerStartDate.setDate(offerStartDate.getDate() + qbShowOfferDays);
    offerEndDate.setDate(offerEndDate.getDate() + qbOfferEndDate);

    return offerStartDate < todayDate && todayDate < offerEndDate;
  });

  if (sortedQuickBuyItems.length > 0) return sortedQuickBuyItems[0];
};

// Show Quick Buy offer
export const showQuickBuyOffer = (cartState: ICartState) => {
  if (typeof window === 'undefined') return false;

  const quickBuyItem = getQuickBuyItems();
  if (!quickBuyItem) return false;

  const url = new URLSearchParams(window.location.search);
  const itemPresentInCart = cartState.cart.line_items.filter(
    item => item.variant_id === quickBuyItem.variantId
  );

  return Boolean(url.get('qb')) && cartState.cart.line_items.length === 1 && itemPresentInCart.length > 0;
};

// Facebook Pixel headers
export const getFBPixelHeader = () => {
  const fbp = getFromCookie('_fbp');
  const fbc = getFromCookie('_fbc');

  if (fbp || fbc) {
    return { _fbp: fbp || '', _fbc: fbc || '' };
  }
};

// Filter product variants based on cart item
export const filterVariants = (cartItem, productDetail) => {
  if (!productDetail) return [];

  const getFlavourOption = productDetail?.options?.filter(option =>
    ['flavour', 'flavor'].includes(option.name.toLowerCase())
  );

  let filterVariantList = [];
  if (getFlavourOption.length > 0) {
    filterVariantList = productDetail?.variants.filter(variant => {
      if (getFlavourOption[0].position === 1) {
        return cartItem.option_1 === variant.option1 && cartItem.variant_id !== variant.id && variant.price >= cartItem.price / 100;
      } else if (getFlavourOption[0].position === 2) {
        return cartItem.option_2 === variant.option2 && cartItem.variant_id !== variant.id && variant.price >= cartItem.price / 100;
      }
    });
  } else {
    filterVariantList = productDetail?.variants.filter(variant => variant.id !== cartItem.variant_id && variant.price > cartItem.price / 100);
  }

  if (!filterVariantList || filterVariantList.length === 0) return [];

  const variantsList = filterVariantList
    .filter(v => !v.option3 || v.option3.toLowerCase() !== 'routine')
    .map(v => {
      const matchingImage = productDetail?.images.find(img => img.id === v.imageId);
      return matchingImage ? { ...v, src: matchingImage.src } : null;
    })
    .filter(v => v !== null);

  const recommendedVariant = variantsList.reduce((lowest, variant) =>
    variant.price < lowest.price ? { ...variant, isRecommended: true } : { ...lowest, isRecommended: true },
    variantsList[0]
  );

  const leftVariant = variantsList.reduce((highest, variant) =>
    variant.price > highest.price ? variant : highest,
    variantsList[0]
  );

  if (variantsList.length === 3) {
    const rightVariant = variantsList.reduce((current, variant) =>
      variant.price > recommendedVariant.price && variant.price < leftVariant.price ? variant : current,
      variantsList[0]
    );
    return getUniqueVariants([leftVariant, recommendedVariant, rightVariant]);
  } else if (variantsList.length === 2) {
    return getUniqueVariants([recommendedVariant, leftVariant]);
  } else if (variantsList.length === 1) {
    return [recommendedVariant];
  } else {
    return [];
  }
};

const getUniqueVariants = (listOfVariants) => {
  const uniqueByPrice = listOfVariants.reduce((acc, current) => {
    if (!acc.has(current.price)) acc.set(current.price, current);
    return acc;
  }, new Map());
  return Array.from(uniqueByPrice.values());
};

// Ensure minimum delay for promise
export const ensureMinDelay = async (promise: Promise<any>, delay = 400) => {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  const remaining = delay - elapsed;
  if (remaining > 0) await new Promise(res => setTimeout(res, remaining));
  return result;
};

// Total savings calculation
export const totalSavingsPrice = (priceModel: PriceModel) => {
  const subscriptionData: SubscriptionProductDetails | null = getSubscriptionDataFromStorage();
  return checkIfSubscriptionCart() && subscriptionData
    ? subscriptionData.compareAtPrice - subscriptionData.price
    : priceModel.discount + priceModel.freebiesDiscount + (priceModel.orderTotal - priceModel.subtotal);
};