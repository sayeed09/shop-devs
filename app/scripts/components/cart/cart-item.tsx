import React, { useContext, useEffect, useState } from 'react';
import QuantityPicker from './quantitypicker';
import ConfirmationModal from './confirmationModal';
import { GAContext } from '../../context/gatracking';
import { DeleteIcon } from '../../../icons/delete-icon';
import { CartItem, LineItem, LocalCartLineItem } from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import { CartContext } from '../../context/cart';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking';
import {
  getPrimeVariantId,
  formatPriceWithCurrency,
  formatCartRadiumAPIVariant,
  formatCartAPIVariantV1,
} from '../../utils/cart/formatter';
import { TickIcon } from '../../../icons/tickIcon';
import '../../../scripts/scss/import/_cart-abs.scss';
import useCartDetails from '../../hooks/cart';
import '../../../scripts/scss/import/_product-cards.scss';
import { gaEventAttributes, gaEventItems } from '../../interface/events';
import PrimeBanner from './prime-banner';
import { MixPanelContext } from '../../context/mixpanelContext';
import ShippingDisclaimer from './shipping-disclaimer';
import { hostDomain } from '../../utils/endpoints';
import { isMobile } from '../../utils/helper';
import CartItemPopup from './cart-item-popup';
import UpgradeCartPopup from './upgrade-cart-popup';
import { setLocalCartItems, setShowSnackbar, setShowUpgradeCartOption } from '../../actions/cart';
import { filterVariants } from '../../utils/cart/helper';
import { PHMProductId, PHWProductId, SamplingProductID } from '../../utils/product/constants';
import { ACVShippingDisclaimerVariantIds, EXCLUDE_UPGRADE_SKUS_VARIANTS, FREEBIES_VARIANT_ID } from '../../utils/cart/constants';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';
import { data } from 'react-router';
import { getProductDetails } from '~/scripts/services/product';
import productDetail from '~/scripts/views/product/product-detail';
interface IProps {
  cartItem: LineItem;
  productReview: any;
  itemIndex: number;
}
const CartItem = ({ cartItem, productReview, itemIndex }: IProps) => {
  let showUpgradeOption; //UDS-563
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  const { trackMixpanelEvent } = useContext(MixPanelContext);

  const [isLoading, setLoading] = useState(false);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<{
    productId: string,
    variantId: string
  } | undefined>();

  const [upgradeCartPopup, setUpgradeCartPopup] = useState<CartItem>(); //UDS-563
  const [usersUpgradedToday, setUsersUpgradedToday] = useState(sessionStorage.getItem('usersUpgraded')); //UDS-563
  const [formattedQty, setFormattedQty] = useState<string>();//UDS-563
  const { getCart, getProductDetails, productDetail, getProductInformation } = useCartDetails(); //UDS-563

  const recommendedVariant: any = filterVariants(cartItem, productDetail)?.filter(variant => variant.isRecommended);

  const getProductLink = () => {
    if (cartItem.product_id == "7307881021499") {
      return '#';
    }
    return 'products/' + cartItem?.handle + '?variant=' + cartItem?.variant_id;
  };

  const updateQuantity = (quantity: number) => {
    if (isLoading) {
      return;
    }
    let productIdsObject = {};
    setLoading(true);
    const cartData = Object.assign({}, state.cart);
    if (quantity === 0) {
      //remove item from cart
      if (cartData?.line_items?.length == 1 && openConfirmPopup == false) {
        setConfirmPopup(true);
        setLoading(false);
        return;
      }
      cartData.line_items = cartData?.line_items?.filter(
        (item) => item.variant_id !== cartItem.variant_id,
      );

      productIdsObject[cartItem.variant_id] = quantity;

      const eventName = 'remove_from_cart';

      const eventItems: gaEventItems[] = [
        {
          item_id: cartItem.product_id.toString(),
          item_name: cartItem.product_title,
          discount:
            (Number(cleanPriceString(cartItem?.compare_at_price)) -
              Number(cleanPriceString(cartItem?.line_price))) /
            100,
          item_brand: 'OZiva',
          item_variant: cartItem?.variant_title,
          price: Number(cleanPriceString(cartItem?.compare_at_price)) / 100,
          quantity: cartItem?.quantity,
        },
      ];
      const eventAttributes: gaEventAttributes = {
        currency: 'INR',
        value: Number(cleanPriceString(cartItem.line_price)) / 100,
        items: eventItems,
      };
      gaTrackingEvent(eventName, eventAttributes);
      trackMixpanelEvent("Product Removed", {
        $currency: 'INR',
        $brand: "OZiva",
        $page_title: document.title,
        cart: [{
          "Product Name": cartItem.product_title,
          "Product Price": cartItem.line_price / 100,
          "Product ID": cartItem.product_id,
          "Variant ID": cartItem.variant_id,
          "Quantity": cartItem.quantity,
        }],
        "Order Total": state?.cart?.order_total && state?.cart?.order_total / 100,
      });

      (window as any).Moengage.track_event(eventName, eventAttributes);
    } else {
      productIdsObject[cartItem.variant_id] = quantity;
    }
    let updatedLocalCart = (state.localCartItems ?? [])
      .map((item) => {
        if (item.variantId == cartItem.variant_id) {
          return quantity !== 0 ? { ...item, quantity } : null;
        }
        return item;
      })
      .filter((item): item is LocalCartLineItem => item !== null);
    dispatch && dispatch(setLocalCartItems(updatedLocalCart));


    const upgradeItemsList = localStorage.getItem('upgradedItems') ? JSON.parse(localStorage.getItem('upgradedItems')) : null;
    if (upgradeItemsList && quantity == 0) {
      const removedVariant = upgradeItemsList.filter(item => item.variantId != cartItem.variant_id);
      localStorage.setItem('upgradedItems', JSON.stringify(removedVariant));
    }
    let variantArr: [] = formatCartAPIVariantV1(upgradeItemsList as LocalCartLineItem[]);
    let requestPayload: any = { variants: variantArr };
    getCart(requestPayload)
      .then(() => {
        setLoading(false);
        return data;
      })
      .catch(() => {
        setLoading(false);
      });

  };
  const currentCashAndOfferResponse =
    state.discountAndCashResponse.line_items.filter(
      (lineItem) => lineItem.variant_id == cartItem.variant_id,
    );

  const trackingEvent = (intent: string, quantity: number) => {
    let moeEventName, gaEventName;
    if (intent == 'increment') {
      moeEventName = 'add_to_cart';
      gaEventName = 'add_to_cart';
    } else if (intent == 'decrement') {
      moeEventName = 'remove_from_cart';
      gaEventName = 'remove_from_cart';
    }
    const moeAttributes: any = {
      variant_id: cartItem.product_id.toString(),
      product_name: cartItem.title,
      price: (quantity * cartItem.price) / 100,
      quantity: quantity,
      event_from: "cart"
    };
    (window as any).Moengage.track_event(moeEventName, moeAttributes);
    const gaAttributes: any = [];
    const item: any = {
      item_id: cartItem.product_id,
      item_name: cartItem.product_title,
      currency: 'INR',
      item_brand: 'OZiva',
      item_variant: cartItem.variant_title,
      price: cleanPriceString(cartItem.price),
      quantity: 1,
    };
    gaAttributes.push(item);
    fireFBPixelEvent({
      event: "AddToCart",
      productId: cartItem.product_id,
      productTitle: cartItem.product_title,
      price: cartItem.price / 100,
      variantId: cartItem.variant_id,
    });
    gaTrackingEvent('quantity_selector', { mode: intent, items: gaAttributes });
    gaTrackingEvent(gaEventName, { items: gaAttributes });
  };

  useEffect(() => {
    if (!sessionStorage.getItem('usersUpgraded')) {
      const value = (Math.floor(Math.random() * (600 - 450 + 1)) + 450).toString();
      setUsersUpgradedToday(value);
      sessionStorage.setItem('usersUpgraded', value);
    } else {
      setUsersUpgradedToday(sessionStorage.getItem('usersUpgraded'));
    }
  }, []);

  useEffect(() => {
    if (itemIndex === 0) {
      getProductDetails({ productId: cartItem.product_id, variantId: cartItem.variant_id });
    }
  }, [state.cart]);

  useEffect(() => {
    if (itemIndex === 0) {
      getFormattedQty();
    }
  }, [productDetail, state.cart]);

  const getFormattedQty = async () => {
    if (recommendedVariant.length > 0) {
      const responseList = await getProductInformation(recommendedVariant[0].id, cartItem.product_id);
      setFormattedQty(responseList);
    }
  }

  if (filterVariants(cartItem, productDetail) && filterVariants(cartItem, productDetail)?.length > 0) {
    showUpgradeOption = filterVariants(cartItem, productDetail)?.some(variants => state.cart.line_items.find(lineItem => lineItem.variant_id == variants.id));
  };

  const showSnackbarFunc = () => {
    if (state.showSnackbar) {
      setTimeout(() => {
        dispatch(setShowSnackbar(false));
      }, 3000);
      return (
        <div className="ATCwrapper" style={{ zIndex: 100 }}>
          <div className="ATCtextwrapper">
            <span style={{ color: '#fff' }}>Your cart has been updated!</span>
          </div>
        </div>
      )
    }
  };
  const getFormattedQtyString = (qty: string) => {
    if (cartItem.product_id == PHMProductId || cartItem.product_id == PHWProductId) {
      const gramQty = `${Number(qty) / 907} x 907 g`
      return `${Math.floor(Number(qty) / 453)}lbs/${gramQty}`;
    } else {
      return `${qty}`;
    }
  }

  const handleUpgradeClick = () => {
    const moeAttributes: any = {
      product_title: cartItem.product_title,
      product_id: cartItem.product_id,
      variant_id: cartItem.variant_id,
      cart_amount: state.cart.order_total,
    };
    (window as any).Moengage.track_event('cart_upgrade_skus', moeAttributes);
    gaTrackingEvent('cart_upgrade_skus', { items: [{ item_id: cartItem.product_id, item_name: cartItem.product_title, item_variant: cartItem.variant_title, price: cartItem.price / 100, quantity: 1 }] });
    setUpgradeCartPopup(cartItem);
  }

  const getUpgradedListFromStorage = () => {
    const getUpgradedList = localStorage.getItem('upgradedItems') ? JSON.parse(localStorage.getItem('upgradedItems')) : null;
    if (getUpgradedList && itemIndex == 0) {
      const checkIfFirstItemUpgraded = getUpgradedList.some(variant => variant.variantId == cartItem.variant_id);
      return checkIfFirstItemUpgraded;
    }
  }

  //UDS-563 End
  const getExperimentItem = () => (<div className="product-card-box-v2-items UDS-630-A">
    <div className="product-img-v2" onClick={() => {
      if (isMobile()) setSelectedCartItem({
        productId: cartItem.product_id,
        variantId: cartItem.variant_id
      });
    }}>
      <img src={cartItem.image} width="70" alt={cartItem.title} />
    </div>
    <div className="product-card-box-v2-dtl w-100">
      {!isMobile() ? <a href={getProductLink()}>
        <h2 className="productCartTitle">{cartItem.title}</h2>
      </a> :
        <div className='title-container'>
          <div onClick={() => setSelectedCartItem({
            productId: cartItem.product_id,
            variantId: cartItem.variant_id
          })} data-variant={cartItem?.variant_id}>
            <h2 className="productCartTitle">{cartItem.title}</h2>
          </div>

          <div>
            {cartItem.variant_id !== getPrimeVariantId() && cartItem.product_id != SamplingProductID &&
              (
                // ITEM INCREMENT/DECREMENT
                <QuantityPicker
                  handleDecrement={() => {
                    updateQuantity(cartItem?.quantity - 1);
                    trackingEvent('quantity_deleted', cartItem?.quantity - 1);
                  }}
                  handleIncrement={() => {
                    updateQuantity(cartItem?.quantity + 1);
                    trackingEvent('quantity_added', cartItem?.quantity + 1);
                  }}
                  quantity={cartItem.quantity}
                  maxQtyAllowed={cartItem.max_qty_allowed}
                />
              )}
          </div>
        </div>
      }

      <div className='pricing-container'>
        <div className="productPriceDetails">
          <span className="priceMRP">MRP:</span>
          {cartItem &&
            cartItem.compare_at_price != cartItem.discounted_price && (
              <del className="priceMRP">
                {formatPriceWithCurrency(cartItem.compare_at_price / 100)}
              </del>
            )}

          <span className="actualPrice">
            {currentCashAndOfferResponse.length > 0
              ? formatPriceWithCurrency(
                currentCashAndOfferResponse[0].discounted_price / 100,
              )
              : formatPriceWithCurrency(
                (cartItem.price * cartItem.quantity) / 100,
              )}
          </span>
        </div>
        <div className="productPriceDetails">
          {cartItem?.compare_at_price - cartItem.discounted_price > 0 && (
            <span className="totalPriceOff">
              You save:{' '}
              {formatPriceWithCurrency(
                (cartItem?.compare_at_price - cartItem.discounted_price) / 100,
              )}
            </span>
          )}
        </div>
      </div>

    </div>
  </div>
  )
  return (
    <>
      {/* NEW CART ITEM */}
      {!cartItem.benefits.some(
        (val) =>
          val.includes('BYB-3') ||
          val.includes('BYB_VMS') ||
          val.includes('Build Your Own Box'),
      ) && (state.discountCode == "B1G4" && (cartItem.variant_id == FREEBIES_VARIANT_ID) && isMobile() ? false : true) && (
          <div
            className={'product-card-box-v2 prime-product-card'}
            style={isLoading ? { opacity: 0.6 } : {}}
          >
            <div className="product-card-box-v2-items">
              <div className="product-img-v2" onClick={() => {
                setSelectedCartItem({
                  productId: cartItem.product_id,
                  variantId: cartItem.variant_id
                });
                gaTrackingEvent('cart_item_image_click', { items: [cartItem] });
              }}>
                <img src={cartItem.image} width="70" alt={cartItem.title} />
              </div>
              <div className="product-card-box-v2-dtl w-100">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    updateQuantity(0)
                    gaTrackingEvent('remove_from_cart', { items: [cartItem] });
                  }}
                  className="cartItemDelete"
                >
                  <DeleteIcon />
                </a>
                <div onClick={() => setSelectedCartItem({
                  productId: cartItem.product_id,
                  variantId: cartItem.variant_id
                })} data-variant={cartItem?.variant_id}>
                  <h2 className="productCartTitle">{cartItem.title}</h2>
                </div>
                {cartItem?.benefits?.length > 0 && (
                  <ul className="productBenefitChips">
                    {cartItem?.benefits?.map((benefit: string, index: number) => {
                      return (
                        <li key={index}>
                          <span>
                            <TickIcon />
                          </span>
                          {benefit}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div className="productPriceDetails">
                  <span className="priceMRP">MRP:</span>
                  {cartItem &&
                    cartItem.compare_at_price != cartItem.discounted_price && (
                      <del className="priceMRP">
                        {formatPriceWithCurrency(cartItem.compare_at_price / 100)}
                      </del>
                    )}

                  <span className="actualPrice">
                    {currentCashAndOfferResponse.length > 0
                      ? formatPriceWithCurrency(
                        currentCashAndOfferResponse[0].discounted_price / 100,
                      )
                      : formatPriceWithCurrency(
                        (cartItem.price * cartItem.quantity) / 100,
                      )}
                  </span>
                </div>

                <div className="productPriceDetails pt-8">
                  {cartItem?.compare_at_price - cartItem.discounted_price > 0 && (
                    <span className="totalPriceOff">
                      You save:{' '}
                      {formatPriceWithCurrency(
                        (cartItem?.compare_at_price - cartItem.discounted_price) / 100,
                      )}
                    </span>
                  )}
                  {cartItem.variant_id !== getPrimeVariantId() && cartItem.product_id != SamplingProductID &&
                    (
                      // ITEM INCREMENT/DECREMENT
                      <QuantityPicker
                        handleDecrement={() => {
                          updateQuantity(cartItem?.quantity - 1);
                          trackingEvent('decrement', cartItem?.quantity - 1);
                        }}
                        handleIncrement={() => {
                          updateQuantity(cartItem?.quantity + 1);
                          trackingEvent('increment', cartItem?.quantity + 1);
                        }}
                        quantity={cartItem.quantity}
                        maxQtyAllowed={cartItem.max_qty_allowed}
                      />
                    )}
                </div>
              </div>
            </div>
            {getExperimentItem()}
            {/* UDS-563 Start */}
            {EXCLUDE_UPGRADE_SKUS_VARIANTS.indexOf(cartItem.variant_id) === -1 && (state.showUpgradeCartOption && !getUpgradedListFromStorage()) ? (!showUpgradeOption && itemIndex === 0 && filterVariants(cartItem, productDetail) && filterVariants(cartItem, productDetail)?.length > 0) && (<div className='uds-563-upgrade-cart-container'>
              <div className='expert-recommended-tag-exp'>
                Experts Recommended
              </div>

              <div className='upgrade-cart-box'>
                <div className='upgrade-text'>
                  <div className='animation-image'>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Socialnudge.gif?v=1739516605" alt="Social nudge" />
                  </div>
                  <div className='upgrade-cart-text'>
                    <span className='text-1'>Switch to More Savings</span> {formattedQty && <span className='text-2'>({getFormattedQtyString(formattedQty)})</span>}
                    <div className='text-3'>
                      {usersUpgradedToday} users upgraded today for better value!
                    </div>
                  </div>
                </div>
                <button onClick={() => handleUpgradeClick()}>UPGRADE</button>
              </div>
            </div>) : null}

            {/* UDS-563 End */}
            {(ACVShippingDisclaimerVariantIds.indexOf(cartItem.variant_id) > -1)
              && <ShippingDisclaimer discount={(((cartItem?.compare_at_price - cartItem.discounted_price) / cartItem.compare_at_price) * 100)} />
            }
            {/* START PRIME SECTION */}
            {(cartItem.variant_id == getPrimeVariantId() && hostDomain != "oziva.com") && (
              <PrimeBanner
                price={cartItem.price / 100}
                compareAtPrice={cartItem.compare_at_price / 100}
              />
            )}
            {/* END PRIME SECTION */}
          </div>
        )}

      {/* END NEW CART ITEM */}

      {openConfirmPopup && (
        // DELETE LAST ITEM CONFIRMATION MODAL
        <ConfirmationModal
          setConfirmPopup={setConfirmPopup}
          updateQuantity={updateQuantity}
          cartData={state.cart.line_items}
        />
      )}
      {
        selectedCartItem?.productId &&
        <div className='cart-item-popup'>
          <CartItemPopup setSelectedCartItem={setSelectedCartItem} selectedCartItem={selectedCartItem} popupHeader={'Quick Product Overview'} isConsultation={typeof selectedCartItem === "boolean" ? true : false} />
        </div>
      }
      {/* UDS-563 Start */}
      {
        upgradeCartPopup && (
          <div className="uds-563-cart-upgrade-popup">
            <UpgradeCartPopup setUpgradeCartPopup={setUpgradeCartPopup} filteredVariants={filterVariants(cartItem, productDetail)} upgradeCartPopup={upgradeCartPopup} productReview={productReview} index={itemIndex} productId={cartItem.product_id} />
          </div>
        )
      }
      {showSnackbarFunc()}
      {/* UDS-563 End */}
    </>
  );
};
export default CartItem;