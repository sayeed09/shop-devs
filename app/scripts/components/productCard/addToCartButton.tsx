import React, { useContext, useState } from 'react';
import { productService } from '../../services/product';
import { ButtonLoader } from '../../../icons/button-loader';
import { IProduct } from '../../interface/search-product-list';
import { Moengage } from '../../utils/tracking/gaTracking';
import { getAccessToken } from '../../utils/product/formatter';
import { UserLoginValue } from '../../interface/product';
import { MixPanelContext } from '../../context/mixpanelContext';
import { GAContext } from '../../context/gatracking';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

interface IATCButtonProps {
  item: IProduct;
  setShowSnakbar: (value) => void;
  isSearchPage: boolean;
}

const AddToCartButton = (props: IATCButtonProps) => {
  const { setShowSnakbar, item, isSearchPage } = props;
  const gaTrackingEvent = useContext(GAContext);

  const [isShowLoading, setIsShowLoading] = useState(false);
  const [variantId, setVariantId] = useState();
  const { trackMixpanelEvent } = useContext(MixPanelContext);


  const addToCart = (variantId) => {
    setIsShowLoading(true);
    setVariantId(variantId);
    const payload: any = { id: variantId, quantity: 1 };
    productService
      .addItems(payload)
      .then((res) => {
        const increaseCartCount = new CustomEvent("updateCartItemCount", {})
        document.dispatchEvent(increaseCartCount)
        setIsShowLoading(false);
        setShowSnakbar(true);
        trackingAPI(res);
      })
      .catch((e) => {
        console.log('Product not available', e);
      });
  };

  const findSearchQuery = () => {
    const queryString = window.location.search;
    const myurlParams = new URLSearchParams(queryString);
    const query = encodeURIComponent(myurlParams.get('q') || '') || '';
    return query;
  };

  const trackingAPI = (productDetails) => {

    if (isSearchPage) {
      const authorizationToken: UserLoginValue | null = getAccessToken();
      const attributes: any = {};
      if (authorizationToken && authorizationToken?.phone) {
        attributes.phone = authorizationToken?.phone;
      }
      attributes.search_date = Date.now();
      attributes.result_url = findSearchQuery();
      attributes.search_result = { productId: productDetails.product_id, variantId: productDetails.variantId };
      Moengage.track_event('search_bar_results_a2c', attributes);
    }
    fireFBPixelEvent({
      event: "AddToCart",
      productId: productDetails.product_id,
      productTitle: productDetails.product_title,
      price: productDetails.price / 100,
      variantId: productDetails.variant_id,
    });
    const eventName = 'add_to_cart';
    const eventAttributes = {
      product_name: productDetails.product_title,
      product_id: productDetails.product_id,
      variant_id: productDetails.variant_id,
      price: productDetails.price / 100,
      quantity: 1
    };
    Moengage.track_event(eventName, eventAttributes);
    const gaAttributes: any[] = [];
    gaAttributes.push({
      item_id: productDetails.product_id,
      item_name: productDetails.product_title,
      currency: 'INR',
      item_brand: 'OZiva',
      price: productDetails.price / 100,
      quantity: 1,
    });
    gaTrackingEvent('add_to_cart', { items: gaAttributes });
    trackMixpanelEvent("Product Added", {
      $currency: 'INR',
      $page_title: document.title,
      $brand: "OZiva",
      cart: [{
        "Product Name": productDetails.product_title,
        "Product Price": productDetails.price / 100,
        "Product ID": productDetails.product_id,
        "Variant ID": productDetails.variant_id,
        "Quantity": 1
      }]
    });
  };

  return (
    <div>
      {isShowLoading && variantId == item?.variantId ? (
        <div
          className="ProductCardBtn"
          style={{
            background: '#F04E23',
          }}
        >
          <ButtonLoader />
        </div>
      ) : (
        <a
          className="ProductCardBtn"
          onClick={(e) => addToCart(item?.variantId)}
        >
          ADD TO CART<div className="single_card_overlay"></div>
        </a>
      )}
    </div>
  );
};

export default AddToCartButton;
