import { ICartState } from '../../interface/cart';
import { CartItem, PriceModel } from '../../models/cart/get-response';
import { getFromCookie } from '../product/formatter';
import {
  qbOfferEndDate,
  qbShowOfferDays,
} from './constants';
import { checkIfSubscriptionCart, getSubscriptionDataFromStorage, isMobile } from '../../utils/helper';
import { SubscriptionProductDetails } from '../../interface/product';

export const storeQuickBuyCheckouts = (
  checkoutId: string,
  productId: string,
  variantId: string,
) => {
  let data = {
    checkoutId,
    productId,
    variantId,
  };
  sessionStorage.setItem('quickBuyCheckouts', JSON.stringify(data));
};

export const getQuickBuyItems = () => {
  let quickBuyItems = localStorage.getItem('QuickBuyItems');
  let itemList = quickBuyItems ? JSON.parse(quickBuyItems) : [];
  if (itemList && itemList?.length > 0) {
    // sorting based on order dates
    let sortedQuickBuyItems = itemList.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    );

    // filter out items based on offer expiry days
    sortedQuickBuyItems = sortedQuickBuyItems.filter((item) => {
      const todayDate = new Date();
      let offerStartDate = new Date(item.orderDate);
      let offerEndDate = new Date(item.orderDate);

      offerStartDate.setDate(offerStartDate.getDate() + qbShowOfferDays);
      offerEndDate.setDate(offerEndDate.getDate() + qbOfferEndDate);

      // //Todo: This is done for testing
      // offerStartDate.setMinutes(offerStartDate.getMinutes() + 5);
      // offerEndDate.setMinutes(offerStartDate.getMinutes() + 60);

      if (offerStartDate < todayDate && todayDate < offerEndDate) {
        return item;
      }
    });
    sortedQuickBuyItems = sortedQuickBuyItems.filter((item) => item);
    if (sortedQuickBuyItems.length > 0) {
      return sortedQuickBuyItems[0];
    }
  }
};

export const showQuickBuyOffer = (cartState: ICartState) => {
  const quickBuyItem = getQuickBuyItems();
  const url = new URLSearchParams(window.location.search);
  const itemPresentInCart = quickBuyItem
    ? cartState.cart.line_items.filter(
      (item) => item.variant_id == quickBuyItem.variantId,
    )
    : [];
  if (
    Boolean(url.get('qb')) &&
    cartState.cart.line_items.length == 1 &&
    itemPresentInCart.length > 0
  ) {
    return true;
  }
  return false;
};


export const getFBPixelHeader = () => {
  if (getFromCookie('_fbc') || getFromCookie('_fbp')) {
    return {
      '_fbp': getFromCookie('_fbp') || "",
      '_fbc': getFromCookie('_fbc') || ""
    }
  }
}

//UDS-563 
export const filterVariants = (cartItem, productDetail) => {
  if (productDetail) {
    //Get a filtered variants using option_1 and option_2 values based on the cart item
    let filterVariantList;
    const getFlavourOption = productDetail?.options?.filter(option => {
      return option.name.toLowerCase() === 'flavour' || option.name.toLowerCase() === 'flavor';
    });
    if (getFlavourOption.length > 0) {
      filterVariantList = productDetail?.variants.filter(variant => {
        if (getFlavourOption[0].position == 1) {
          return cartItem.option_1 === variant.option1 && cartItem.variant_id != variant.id && variant.price >= (cartItem.price) / 100;
        } else if (getFlavourOption[0].position == 2) {
          return cartItem.option_2 === variant.option2 && cartItem.variant_id != variant.id && variant.price >= (cartItem.price) / 100;
        }
      });
    } else {
      filterVariantList = productDetail?.variants.filter(variant => {
        return cartItem.variant_id != variant.id && variant.price > (cartItem.price) / 100;
      });
    }
    if (filterVariantList) {
      //Hotfix raised, later on refactor the condition
      const variantsList = filterVariantList.filter(variant => {
        if(variant?.option3 && variant?.option3?.toLowerCase() !== 'routine'){
          return variant;
        }else if(!variant?.option3){
          return variant;
        }
      }).map(variant => {
        const matchingImage = productDetail?.images.find(image => image.id === variant.imageId);
        if (matchingImage) {
          return { ...variant, src: matchingImage.src };
        }
        return null;
      }).filter(item => item !== null);

      
      //Get the recommended product based on the next higher of cart item
      const recommendedVariant = variantsList.reduce((lowest, variant) => {
        return variant.price < lowest.price ? { ...variant, isRecommended: true } : { ...lowest, isRecommended: true };
      }, variantsList[0]);

      
      //Get the highest pack - left side pack
      const leftVariant = variantsList.reduce((highest, variant) => {
        return variant.price > highest.price ? variant : highest;
      }, variantsList[0]);

      if (variantsList.length === 3) {
        //Right side pack
        const rightVariant = variantsList.reduce((current, variant) => {
          return variant.price > recommendedVariant.price && variant.price < leftVariant.price ? variant : current;
        }, variantsList[0]);
        if (getUniqueVariants([leftVariant, recommendedVariant, rightVariant]).length === 3) return [leftVariant, recommendedVariant, rightVariant];
        else return [recommendedVariant, leftVariant];
      } else if (variantsList.length === 2) {
        if (getUniqueVariants([recommendedVariant, leftVariant]).length === 2) return [recommendedVariant, leftVariant];
        else return [recommendedVariant];
      } else if (variantsList.length === 1) {
        return [recommendedVariant];
      }
      else return [];
    }
  } else return [];
};

const getUniqueVariants = (listOfVariants) => {
  const uniqueByPrice = listOfVariants.reduce((acc, current) => {
    if (!acc.has(current.price)) {
      acc.set(current.price, current);
    }
    return acc;
  }, new Map());
  return Array.from(uniqueByPrice.values());
}


export const ensureMinDelay = async (promise: Promise<any>, delay = 400) => {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  const remaining = delay - elapsed;
  if (remaining > 0) await new Promise((res) => setTimeout(res, remaining));
  return result;
};

export const totalSavingsPrice = (priceModel: PriceModel) => {
  const subscriptionData: SubscriptionProductDetails | null = getSubscriptionDataFromStorage();
  const youSavePrice = checkIfSubscriptionCart() && subscriptionData ? subscriptionData.compareAtPrice - subscriptionData.price : priceModel.discount + priceModel?.freebiesDiscount + (priceModel.orderTotal - priceModel.subtotal);
  return youSavePrice;
}