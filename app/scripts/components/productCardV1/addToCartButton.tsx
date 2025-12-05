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
import { LocalCartLineItem } from '~/scripts/models/cart/get-response';
import { setLocalCartItems } from '~/scripts/actions/cart';
import { formatCartItemV1 } from '~/scripts/utils/cart/helper';
import { CartContext } from '~/scripts/context/cart';

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
  const { state: cartState, dispatch: CartDispatch } = useContext(CartContext);

  const addToCart = (variantId: string) => {
    setIsShowLoading(true);
    setVariantId(variantId);
    const payload: any = { id: variantId, quantity: 1 };
    let currentItems = cartState?.localCartItems ?? [];

    const isPresentInCart = currentItems.some((item) => item.variantId === variantId);

    const updatedItems: LocalCartLineItem[] = isPresentInCart
      ? currentItems.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...currentItems, formatCartItemV1(payload)];
    CartDispatch(setLocalCartItems(updatedItems));
    trackingAPI(item);

    setTimeout(() => {
      setIsShowLoading(false);
      setShowSnakbar(true);
      setOpenModal(false);
    }, 400)

    // productService
    //   .addItems(payload)
    //   .then((res) => {
    //     const increaseCartCount = new CustomEvent("updateCartItemCount", {})
    //     document.dispatchEvent(increaseCartCount)
    //     setIsShowLoading(false);
    //     setShowSnakbar(true);
    //     trackingAPI(res);
    //     setOpenModal(false);
    //   })
    //   .catch((e) => {
    //     console.log('Product not available', e);
    //   });
  };


  const trackingAPI = (productDetails: IProduct) => {

    if (isSearchPage) {
      const authorizationToken: UserLoginValue | null = getAccessToken();
      const attributes: any = {};
      if (authorizationToken && authorizationToken?.phone) {
        attributes.phone = authorizationToken?.phone;
      }
      attributes.search_date = Date.now();
      attributes.search_result = { productId: productDetails.productId, variantId: productDetails.variantId };
      (window as any).Moengage.track_event('search_bar_results_a2c', attributes);
    }
    fireFBPixelEvent({
      event: "AddToCart",
      productId: productDetails.productId,
      productTitle: productDetails.title,
      price: +productDetails.price / 100,
      variantId: productDetails.variantId,
    });
    const eventName = 'add_to_cart';
    const eventAttributes = {
      product_name: productDetails.title,
      product_id: productDetails.productId.toString(),
      variant_id: productDetails.variantId.toString(),
      price: +productDetails?.price / 100,
      quantity: 1
    };
    (window as any).Moengage.track_event(eventName, eventAttributes);
    const gaAttributes: any[] = [];
    gaAttributes.push({
      item_id: productDetails.productId,
      item_name: productDetails.title,
      currency: 'INR',
      item_brand: 'OZiva',
      price: +productDetails.price / 100,
      quantity: 1,
    });
    gaTrackingEvent('add_to_cart', { items: gaAttributes });
    trackMixpanelEvent("Product Added", {
      $currency: 'INR',
      $page_title: document.title,
      $brand: "OZiva",
      cart: [{
        "Product Name": productDetails.title,
        "Product Price": +productDetails.price / 100,
        "Product ID": productDetails.productId,
        "Variant ID": productDetails.variantId,
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
    (window as any).Moengage.track_event(eventName, eventAttributes);
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
