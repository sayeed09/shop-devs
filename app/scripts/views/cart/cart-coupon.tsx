import React, { useContext, useEffect, useRef } from 'react';
import { GAContext } from '../../context/gatracking';
import { CouponRequestModel, VariantRequestModel } from '../../models/cart/freebies';
import {
  getVariantIdsName,
  formatCartAPIVariant,
  formatCartRadiumAPIVariant
} from '../../utils/cart/formatter';
import { CartContext } from '../../context/cart';
import { cartService } from '../../services/cart';
import {
  setCartItems,
  setDiscountAndCashResponse,
  setDiscountCode,
  setCashApplied,
} from '../../actions/cart';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetCashResponse,
} from '../../models/cart/get-response';
import {
  getGaEventAttributesCoupon,
  createGACartItemList,
  Moengage,
} from '../../utils/tracking/gaTracking';
import { getCouponCode } from '../../utils/helper';

const CartCoupan = (props: any) => {
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  const [couponText, setCouponText] = React.useState('');
  const [showLoader, setShowLoader] = React.useState(false);
  const [errorData, setErrorData] = React.useState<any>([]);
  let isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const [couponData, setCouponData] = React.useState<any>([]);
  const [errorPopup, setErrorPopup] = React.useState(false);
  const inputEl = useRef(null);
  const couponChange = (e: any) => {
    setCouponText(e.target.value.toUpperCase());
  };
  const applyCoupon = (newRequestPayload: CouponRequestModel = { variants: [], discountCode: '' }) => {
    setShowLoader(true);
    if (
      state?.discountAndCashResponse?.total_discount &&
      state?.discountAndCashResponse?.total_discount > 0
    ){
      sessionStorage.setItem('ozivacash_apply_check', 'not applied');
      isCashApplied = 'not applied';
      dispatch(setCashApplied(false));
    }
    setErrorData('');
    if (couponText !== '') {
      if (isCashApplied != 'applied') {
        let requestModel: CouponRequestModel;
        if (newRequestPayload.variants.length > 0) {
          requestModel = newRequestPayload;
        } else {
          const formattedVariantObject = formatCartRadiumAPIVariant(state.cart, couponText, state.cashApplied);
          requestModel = {
            variants: formattedVariantObject.variants,
            discountCode: couponText,
          };
        }
        cartService
          .getCartList(requestModel)
          .then((data: any) => {
            setShowLoader(false);
            const couponCode = getCouponCode(data.discount_code);
            dispatch(setDiscountCode(couponCode));
            dispatch(setDiscountAndCashResponse(data));
            props.setShowPopup(false);
            setTimeout(() => {
              props.setOpenPopup(true);
            }, 100);
            setCouponData(data);
            inputEl.current.value = '';
            setCouponText('');

            sessionStorage.setItem('coupon_code', couponCode);

            sessionStorage.setItem('discount_value', data.total_discount);

            setTimeout(() => {
              props.setOpenPopup(false);
              props.setOfferVisible(false);
            }, 3000);

            const string_cart = getVariantIdsName(state.cart.line_items);
            const event_name = 'apply_offers_from_cart';
            const event_attributes = {
              discount_name: data.discount_code,
              product_name: string_cart.names.toString(),
              variant_id: string_cart.ids.toString(),
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
            Moengage.track_event(event_name, event_attributes);
          })
          .catch((error) => {
            if (error?.response?.data?.error?.errorCode == 'LOGIN_REQUIRED') {
              setShowLoader(false);
              setTimeout(() => {
                window.history.replaceState(null, null, ' ');
                const event = new Event('handleLogin');
                document.dispatchEvent(event);
              }, 100);
              sessionStorage.setItem('login_coupon_code', couponText);
            } else if (
              error?.response?.data?.error.indexOf('Missing variant') > -1
            ) {
              cartService
                .addItem(+error.response.data.error.split(':')[1].trim(), 1)
                .then((data: AddCartItemResponse) => {
                  if (data) {
                    cartService
                      .getCartItems()
                      .then((data: GetCartListResponse) => {
                        let formattedVariantObject = formatCartRadiumAPIVariant(data, couponText, state.cashApplied);
                        const requestPayload: CouponRequestModel = {
                          variants: formattedVariantObject.variants,
                          discountCode: couponText,
                        };
                        cartService
                          ?.getCartList(requestPayload)
                          .then((res: GetCashResponse) => {
                            dispatch(setCartItems(res));
                            applyCoupon(requestPayload);
                          })
                      });
                  }
                });
              inputEl.current.value = '';
              setCouponText('');
            } else {
              setErrorPopup(!errorPopup);
              setErrorData(error.response);
              setShowLoader(false);
              setCouponText('');
            }
          });
      }
    }
  };
  const handleFocus = () => {
    inputEl.current.value = '';
    setErrorData('');
    setErrorPopup(false);
  }
  
  return (
    <>
      {!state.quickBuyCart && 
      <div className="enter-coupon-input d-flex">
        {/* <div
          className={
            state.discountAndCashResponse.line_items.length > 0
              ? "w-100 offer-input-div d-flex pos-rel apply-cash-opacity"
              : "w-100 offer-input-div d-flex pos-rel"
          }
        > */}
        <div className="w-100 offer-input-div d-flex pos-rel">
          <input
            ref={inputEl}
            type="text"
            className="font-control cart-page-input"
            placeholder={`Enter coupon/gift card code`}
            onChange={(e) => couponChange(e)}
            value={couponText}
            onFocus={() => handleFocus()}
          />

          {showLoader ? (
            <span className="loader-coupon apply-code text-uppercase text-primaryPahadiCitrus float-right font-medium cursor-none apply-link-btn"></span>
          ) : (
            <span className="apply-link-btn">
              <button
              disabled={couponText == ''}
              onClick={() => applyCoupon()}
              className={
                props.setCashApply == 'applied'
                  ? 'bg-white text-orangeVibrantShade apply-cash-opacity font-medium button-format'
                  : `bg-white text-orangeVibrantShade cursor-pointer font-medium button-format`
              }
              >
                APPLY
              </button> 
            </span>
          )}
        </div>
      </div>
      }
      
      <p className="error-text text-left pt-2 pl-2">
        {errorData?.data ? errorData?.data?.error : ''}
      </p>
    </>
  );
};
export default CartCoupan;