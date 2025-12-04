import React, { useContext, useState } from 'react';
import { productService } from '../../services/product';
import { ButtonLoader } from '../../../icons/button-loader';
import { IProduct } from '../../interface/search-product-list';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking';
import { getAccessToken } from '../../utils/product/formatter';
import { UserLoginValue } from '../../interface/product';
import { MixPanelContext } from '../../context/mixpanelContext';
import ProductModal from '../product-modal/product-modal';
import '../../../scripts/scss/import/_product-cards.scss';
import { DownArrow } from '../../../icons/down-arrow';
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
  const [openModal, setOpenModal] = useState(false);
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
        setOpenModal(false);
      })
      .catch((e) => {
        console.log('Product not available', e);
      });
  };


  const trackingAPI = (productDetails) => {

    if (isSearchPage) {
      const authorizationToken: UserLoginValue | null = getAccessToken();
      const attributes: any = {};
      if (authorizationToken && authorizationToken?.phone) {
        attributes.phone = authorizationToken?.phone;
      }
      attributes.search_date = Date.now();
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
      product_id: productDetails.product_id.toString(),
      variant_id: productDetails.variant_id.toString(),
      price: productDetails?.price / 100,
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

  const moengageTracking = () => {
    const eventName = `show_flavour_size`;
    const eventAttributes = {
      product_name: item.title,
      product_id: item.productId,
      quantity: 1
    };
    Moengage.track_event(eventName, eventAttributes);
    gaTrackingEvent('select_flavour_size', {
      items: [{
        item_id: item.productId,
        item_name: item.title,
        currency: 'INR',
        item_brand: 'OZiva',
      }]
    });
  }

  const handleOnclick = () => {
    if (isFlavourAvailable || isSizeAvailable) {
      moengageTracking();
      setOpenModal(true);
    } else {
      addToCart(item.variantId);
    }
  }

  const isFlavourAvailable = item.options && (item.options.includes("Flavour") || item.options.includes("Flavor"));
  const isSizeAvailable = item.options && item.options.includes("Size");

  return (
    <>
      {
        (
          isShowLoading && variantId == item?.variantId ? (
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
              onClick={() => handleOnclick()}
            >
              {isFlavourAvailable || isSizeAvailable ? <>{isFlavourAvailable ? 'Select Flavour' : 'Select Size'} <DownArrow /></> : 'ADD TO CART'
              }
              <div className="single_card_overlay"></div>
            </a>
          )
        )
      }
      {openModal && <ProductModal setOpenModal={setOpenModal} openModal={openModal} item={item} addToCart={addToCart} isShowLoading={isShowLoading} isFlavourAvailable={isFlavourAvailable} isSizeAvailable={isSizeAvailable} />}
    </>
  );
};

export default AddToCartButton;
