import {
  IBYBItem,
  IRequiredData,
  ISelectedVariants,
} from '../../interface/build-your-box';
import { LineItem } from '../../models/cart/get-response';
import { cartService } from '../../services/cart';

export const getVariantsFromStorage = () => {
  let storedData = localStorage.getItem('buildYourBoxV3');
  let parsedData = [];
  try {
    parsedData = storedData ? JSON.parse(storedData) : [];
  } catch (e) {
    console.error('Invalid JSON in localStorage', e);
  }
  return parsedData;
};
export const checkAllBYOBVaraiantsInCart = (variantIds: number[]) => {
  const buildYouBoxItems = getVariantsFromStorage() || [];

  // If no BYOB items, nothing to check
  if (buildYouBoxItems.length === 0) return;


  const allValid = buildYouBoxItems.every(item =>
    variantIds.includes(Number(item.variant_id))
  );

  // If ANY item is invalid → remove storage once
  if (!allValid) {
    let productIdsObject = {};
    const updateProduct: any = {
      updates: productIdsObject,
    };
    buildYouBoxItems.forEach((item) => {
      productIdsObject[item.variant_id] = 0;
    })

    cartService.updateItems(updateProduct).then((data) => {
    })
    localStorage.removeItem("buildYourBoxV3");
  }
};

export const storeBYBInStorage = (
  temp: IBYBItem[],
  collectionHandle: string,
) => {
  if (temp.length > 0) {
    const variantIdObject = temp.map((item: IBYBItem) => {
      return {
        variant_id: item.variantId,
        collectionHandle: collectionHandle,
        title: item.title,
      };
    });
    const currentItems =
      getVariantsFromStorage() && getVariantsFromStorage().length > 0
        ? getVariantsFromStorage()?.filter(
          (value) => value.collectionHandle !== collectionHandle,
        )
        : [];
    const uniqueArray: any[] = [];
    variantIdObject.map((item) => {
      if (
        uniqueArray.filter((val) => val.variant_id == item.variant_id).length ==
        0
      ) {
        uniqueArray.push(item);
      }
    });
    currentItems.map((item) => {
      if (
        uniqueArray.filter((val) => val.variant_id == item.variant_id).length ==
        0
      ) {
        uniqueArray.push(item);
      }
    });
    localStorage.setItem(
      'buildYourBoxV3',
      JSON.stringify([...variantIdObject, ...currentItems]),
    );
  }
};

export const selectedVariantsFromStorage = (
  collectionItems: any,
  collectionHandle: string,
) => {
  if (
    getVariantsFromStorage() &&
    getVariantsFromStorage().length > 0 &&
    collectionItems &&
    collectionItems.length > 0
  ) {
    const lineItemsObject = {};

    collectionItems.forEach((item: any) => {
      lineItemsObject[item.variantId] = item;
    });
    const BYBItemList = getVariantsFromStorage()
      .filter((item) => item.collectionHandle == collectionHandle)
      .map((item: ISelectedVariants) => {
        if (lineItemsObject[item.variant_id]) {
          return {
            ...lineItemsObject[item.variant_id],
          };
        }
      });
    return BYBItemList.filter((item) => item);
  }

  return [];
};
export const getAllVariantsFromStorage = (collectionHandle: string) => {
  if (getVariantsFromStorage() && getVariantsFromStorage().length > 0) {
    return getVariantsFromStorage().filter(
      (item) => item.collectionHandle == collectionHandle,
    );
  }
  return [];
};

export const extractRequiredData = (BYBItemList: any) => {
  const requiredData: IRequiredData = {
    title: [],
    totalMRP: 0,
    discountOnMRP: 0,
  };
  const BYBTitleList: string[] = [];
  let totalMRP = 0;
  let discountOnMRP = 0;
  BYBItemList.forEach((item: any) => {
    const quantity = item.quantity > 1 ? item.quantity : 0;
    const title = item.title.split('|') ? item.title.split('|')[0] : item.title;
    const titleWithQuantity = quantity
      ? `${title} x ${item.quantity}`
      : `${title}`;
    BYBTitleList.push(titleWithQuantity);
    totalMRP += item.compareAtPrice
      ? item.compareAtPrice
      : item.compare_at_price;
    discountOnMRP += item.discounted_price ? item.discounted_price : item.price;
  });

  requiredData['title'] = BYBTitleList;
  requiredData['totalMRP'] = totalMRP;
  requiredData['discountOnMRP'] = discountOnMRP;
  return requiredData;
};

export const generateReviewsForItem = (id: string) => {
  const getAbsoluteNumber = Math.abs(Number(id) % 4.65);
  const averageRating =
    getAbsoluteNumber - Math.floor(getAbsoluteNumber) + 4 <= 4.5 ? 4.5 : 5;
  const numberOfReviews = (
    Math.ceil(Math.sqrt(Number(id) % 100000)) + 300
  ).toString();
  return {
    averageRating,
    numberOfReviews,
  };
};

export const getBYBItemsForCart = (
  cartItems: LineItem[],
  benefitChip: string,
) => {
  const bybItemList =
    (cartItems &&
      cartItems.length > 0 &&
      cartItems.filter((item) => item.benefits.includes(benefitChip))) ||
    [];
  return bybItemList;
};

export const calculateSavedPrice = (items: IBYBItem[]) => {
  const result = extractRequiredData(items);
  return result.totalMRP - result.discountOnMRP;
};

export const BuildYourBoxDetailProvider = {
  'build-your-box': {
    quantity: 4,
    benefitChip: 'Build Your Own Box',
    price: 1199
  },
  'build-your-own-box': {
    quantity: 3,
    benefitChip: 'BYB-3',
    price: 1299
  },
  'build-your-box-vitamins': {
    quantity: 3,
    benefitChip: 'BYB_VMS',
    price: 1299
  },
};

export const getImage = (collectionHandle) => {
  let imageModel = {};
  if (collectionHandle == 'build-your-box') {
    return (imageModel = {
      mobile: 'Collection_BYOB_mobile.png?v=1699437911',
      desktop:
        'collection_desktop_-_1350_x215_6c89e354-4c44-4d3e-a8d2-827034622c33.png?v=1699437911',
    });
  } else if (collectionHandle == 'build-your-own-box') {
    return (imageModel = {
      mobile: 'Collection_mobile_953b3d27-5d1a-4fca-a716-877283b10320.png?v=1763533184',
      desktop: 'BYB-3_web.png?v=1695634440',
    });
  } else if (collectionHandle == 'build-your-box-vitamins') {
    return (imageModel = {
      mobile: 'Collection_BYOB_mobile_vitamins.png?v=1695895225',
      desktop: 'Home_page_desktop_-_1350_x360_vitamins.png?v=1695895224',
    });
  }
};
