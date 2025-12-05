/* eslint-disable */

let dataLayer = (window as any).dataLayer || [];

export const Moengage = (window as any).Moengage;

export const loggedInUserEvent = () => {
  if (window.location.pathname.indexOf('/products/') > -1) {
    const urlParams = new URLSearchParams(window.location.search);
    const handle = window.location.pathname.split('/products/')[1];
    const varaintId = urlParams.get('variant');
    (window as any).Moengage.track_event('PRODUCT_PAGE_VIEW', {
      handle: handle,
      varaintId: varaintId
    });
  }
}

export const getGaEventAttributes = (items: any) => {
  try {
    const attributes: any = {
      currency: 'INR',
      items: items,
    };
    for (let key in attributes) {
      if (
        attributes[key] === undefined ||
        attributes[key] === null ||
        attributes[key] === ''
      ) {
        delete attributes[key];
      }
    }
    return attributes;
  } catch (error) {
    return null;
  }
};

export const getGaEventAttributesRemoveCart = (amount: any, items: any) => {
  try {
    const attributes: any = {
      currency: 'INR',
      value: Number(cleanPriceString(amount)) / 100,
      items: items,
    };
    for (let key in attributes) {
      if (
        attributes[key] === undefined ||
        attributes[key] === null ||
        attributes[key] === ''
      ) {
        delete attributes[key];
      }
    }
    return attributes;
  } catch (error) {
    return null;
  }
};

export const getGaEventAttributesCoupon = (coupon: any, items: any) => {
  try {
    const attributes: any = {
      currency: 'INR',
      coupon: coupon,
      items: items,
    };
    for (let key in attributes) {
      if (
        attributes[key] === undefined ||
        attributes[key] === null ||
        attributes[key] === ''
      ) {
        delete attributes[key];
      }
    }
    return attributes;
  } catch (error) {
    return null;
  }
};

export const cleanPriceString = (price: any) => {
  if (price) {
    return parseInt(
      price.toString().replace(/[&\/\\#,₹+()$~%.'":*?<>{}]/g, ''),
    );
  }
  return null;
};

export const createGACartItemList = (items: any) => {
  if (items && items.length > 0) {
    const updatedItems = Array.from(items, (item, index) => {
      return createGACartItem(item);
    });
    return updatedItems;
  }
};

export const createGACartItem = (item: any) => {
  if (item) {
    const val = {
      item_id: item?.product_id,
      item_name: item?.title,
      discount: (Number(cleanPriceString(item?.compare_at_price)) - Number(cleanPriceString(item?.line_price))) / 100,
      item_brand: 'OZiva',
      item_variant: item?.variant_title,
      price: Number(cleanPriceString(item?.compare_at_price)) / 100,
      quantity: item?.quantity,
    };
    return val;
  }
};

export const createAttributesItem = (item: any) => {
  if (item) {
    const val = {
      item_id: item?.product_id,
      item_name: item?.product_name,
      item_brand: 'OZiva',
      item_variant: item?.variant_options?.toString(),
      price: cleanPriceString(item?.final_line_price),
      quantity: item?.quantity,
    };
    return val;
  }
};
