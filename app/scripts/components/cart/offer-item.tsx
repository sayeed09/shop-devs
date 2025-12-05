import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart';
import { GAContext } from '../../context/gatracking';
import { ErrorIcon } from '../../../icons/error-icon';
import { cartService } from '../../services/cart';
import {
  CouponRequestModel,
  VariantRequestModel,
} from '../../models/cart/freebies';
import { UpArrowIcon } from '../../../icons/up-arrow';
import { DownArrow } from '../../../icons/down-arrow';

import {
  getVariantIdsName,
  formatCartAPIVariant,
  formatCartRadiumAPIVariant,
} from '../../utils/cart/formatter';
import {
  getGaEventAttributesCoupon,
  createGACartItemList,
  Moengage,
} from '../../utils/tracking/gaTracking';
import {
  setCartItems,
  setDiscountAndCashResponse,
  setDiscountCode,
  setCashApplied,
  setInitialCartLoading,
  setProceedToCheckout,
} from '../../actions/cart';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetCashResponse,
  PriceModel,
} from '../../models/cart/get-response';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { formatPrice } from '../../utils/cart/price-formatter';
import useCartDetails from '../../hooks/cart';
import { getCouponCode } from '../../utils/helper';
import { ButtonLoader } from '../../../icons/button-loader';
import { OzivaFab } from '../../../icons/oziva-fab';

const OfferItem = (props: any) => {
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  let isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const [showLoader, setShowLoader] = useState(false);
  const [isShowValid, setIsShowValid] = useState(false);
  const [couponData, setCouponData] = useState<any>([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorData, setErrorData] = useState<any>([]);
  const [isGCSK1701Exp, setIsGCSK1701Exp] = useState(false);
  const { item } = props;
  const { getCart } = useCartDetails();
  const priceModel: PriceModel = formatPrice(state);
  let validOn = '';
  if (item.listing.length == 1) {
    validOn = `Valid on all above ${item.minSubtotal}`;
  } else if (item.listing.length > 1) {
    validOn = `Valid on listed ${item.listing.length} items `;
  } else {
    validOn = `Valid on all orders`;
  }
  const applyCoupon = (
    newRequestPayload: CouponRequestModel = { variants: [], discountCode: '' },
  ) => {
    setShowLoader(true);
    if (state.discountAndCashResponse.total_discount > 0) {
      sessionStorage.setItem('ozivacash_apply_check', 'not applied');
      isCashApplied = 'not applied';
      dispatch(setCashApplied(false));
    }
    if (isCashApplied != 'applied') {
      let requestModel: CouponRequestModel;
      if (newRequestPayload.variants.length > 0) {
        requestModel = newRequestPayload;
      } else {
        const formattedVariantObject = formatCartRadiumAPIVariant(
          state.cart,
          item.code,
          state.cashApplied,
        );
        // getCart(formattedVariantObject).then((data: GetCashResponse) => {
        //   dispatch(setCartItems(data));
        // });
        requestModel = {
          variants: formattedVariantObject.variants,
          discountCode: item.code,
        };
      }
      cartService
        .getCartList(requestModel)
        .then((data: GetCashResponse) => {
          setShowLoader(false);
          props.setShowPopup(false);
          setTimeout(() => {
            props.setOpenPopup(true);
          }, 100);
          setCouponData(data);

          const couponCode = getCouponCode(data?.discount_code);
          sessionStorage.setItem('coupon_code', couponCode || '');
          const { names, ids, product_id } = getVariantIdsName(
            state.cart?.line_items,
          );
          const event_name = 'apply_offers_from_cart';
          const moeEventName = 'cart_apply_offer';
          const moeAttributes = {
            product_name: names,
            variant_id: ids,
            product_id: product_id,
            price: Number(data.order_total) / 100,
            discount_code: data.discount_code,
            discount: Number(data.total_discount) / 100,
          };
          const ga_attributes = getGaEventAttributesCoupon(
            data.discount_code,
            createGACartItemList(state.cart.line_items),
          );

          const select_promotion_event_name = 'select_promotion';

          const select_promotion_ga_attributes = {
            creative_name: props.item.title,
            creative_slot: props.item.type,
            promotion_id: props.item.code,
            promotion_name: props.item.landingPage,
            // items: createGACartItemList(state.cart.line_items)
          }

          gaTrackingEvent(select_promotion_event_name, select_promotion_ga_attributes);
          gaTrackingEvent(event_name, ga_attributes);
          (window as any).Moengage.track_event(moeEventName, moeAttributes);
          setTimeout(() => {
            props.setOpenPopup(false);
          }, 3000);
          props.setOfferVisible(false);
          if (
            !(sessionStorage.getItem('ozivacash_apply_check') === 'applied')
          ) {
            const couponCode = getCouponCode(data?.discount_code);
            dispatch(setDiscountCode(couponCode || ''));
          }

          dispatch(setDiscountAndCashResponse(data));
          dispatch(setCartItems(data));
          dispatch(setInitialCartLoading(false));
        })
        .catch((error) => {
          // login required
          if (error?.response?.data?.error?.errorCode == 'LOGIN_REQUIRED') {
            setShowLoader(false);
            setTimeout(() => {
              window.history.replaceState(null, null, ' ');
              const event = new Event('handleLogin');
              document.dispatchEvent(event);
            }, 100);
            sessionStorage.setItem('login_coupon_code', item.code);
          }
          // if missing variant
          else if (
            error?.response?.data?.error?.indexOf('Missing variant') > -1
          ) {
            cartService
              .addItem(+error.response.data.error.split(':')[1].trim(), 1)
              .then((data: AddCartItemResponse) => {
                if (data) {
                  cartService
                    .getCartItems()
                    .then((data: GetCartListResponse) => {
                      let variantObject = formatCartRadiumAPIVariant(
                        data,
                        item.code,
                        state.cashApplied,
                      );
                      const requestPayload: CouponRequestModel = {
                        variants: variantObject.variants,
                        discountCode: item.code,
                      };
                      cartService
                        ?.getCartList(requestPayload)
                        .then((res: GetCashResponse) => {
                          dispatch(setCartItems(res));
                          applyCoupon(requestPayload);
                        });
                    });
                }
              });
          } else {
            setErrorPopup(!errorPopup);
            setShowLoader(false);
            setErrorData(error.response);
          }
        });
    }
  };

  return (
    <>
      <div className="coupon-container">
        <div className="coupon-content">
          <div className='coupon-text-container'>
            <div className='coupon-text'>
              <div className="coupon-header">
                {item.description}
              </div>
              <div className="coupon-description">
                {item.validOn}
              </div>
            </div>
            <div className='coupon-product-image'>
              {/* <div className="percentage-bg">%</div> */}
              {props?.item?.imageSrc && <img src={props?.item?.imageSrc} alt={`Offer Image - ${props?.item?.code}`} className='product-img' />}
            </div>
          </div>
          <div className='coupon-code-container'>
            <div className="popup-tag product-offers-sec-col border bg-primaryGreenSG200 border-primaryGreen p-4">
              <div className="clearfix offer-use-sec-bottom-tic pr-4">
                <span className="float-left ml-4 mr-8 d-flex">
                  <OzivaFab />
                </span>
                <span className="font-upercase text-primaryGreen" id="copy-text">
                  {props.item.code}
                </span>
              </div>
            </div>
            {
              !showLoader ? (<button className='coupon-card-apply-btn' onClick={() => applyCoupon()}
                disabled={
                  (priceModel && priceModel?.subtotal < item.minSubtotal || state.discountCode == item.code)
                    ? true
                    : false
                } style={(priceModel && priceModel?.subtotal < item.minSubtotal || state.discountCode == item.code) ? { color: '#BDBDBD' } : { color: '#FE6F00' }}>
                {state.discountCode == item.code ? 'APPLIED' : 'APPLY'}
              </button>) : <div className="coupon-card-apply-btn">
                <ButtonLoader />
              </div>
            }
          </div>
        </div>

      </div>
      {errorPopup && (
        <div
          data-ml-modal
          id="applied-cash"
          className="oziva-offer-applied-modal error-modal open-popup auth-error-popup-modal"
          style={{ zIndex: 1000000000 }}
        >
          <a className="modal-overlay"></a>
          <div className="modal-dialog">
            <div
              className="modal-content center text-center"
              style={{ overflow: 'inherit' }}
            >
              <div
                className="modal-close"
                style={{ top: '-50px', right: '-10px', zIndex: '1111111' }}
                onClick={() => {
                  setErrorPopup(false);
                  dispatch(setProceedToCheckout(false));
                }}
              >
                <ModalCloseIcon />
              </div>
              <div className="mb-16">
                <ErrorIcon />
              </div>
              <h2>Oh snap!</h2>
              <p className="text-off-gray f-12">
                {errorData.data ? errorData.data.error : ''}
              </p>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  setErrorPopup(false);
                  dispatch(setProceedToCheckout(false));
                }}
                className="btn btn-primary btn-block mt-8"
              >
                OKAY!
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OfferItem;
