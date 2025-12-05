import React, { useContext, useRef } from 'react';
import {
  CouponRequestModel,
  VariantRequestModel,
} from '../../models/cart/freebies';
import { GAContext } from '../../context/gatracking';
import {
  getVariantIdsName,
  formatCartAPIVariant,
  formatCartRadiumAPIVariant,
} from '../../utils/cart/formatter';
import { CartContext } from '../../context/cart';
import { cartService } from '../../services/cart';
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
} from '../../actions/cart';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetCashResponse,
} from '../../models/cart/get-response';
import { getCouponCode } from '../../utils/helper';

const CouponCode = (props: any) => {
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  let isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const [errorPopup, setErrorPopup] = React.useState(false);
  const [errorData, setErrorData] = React.useState<any>([]);
  const [couponText, setCouponText] = React.useState('');
  const inputEl = useRef(null);
  const [showLoader, setShowLoader] = React.useState(false);
  const couponChange = (e: any) => {
    setCouponText(e.target.value.toUpperCase());
  };
  const applyCoupon = (
    newRequestPayload: CouponRequestModel = { variants: [], discountCode: '' },
  ) => {
    setShowLoader(true);
    setErrorData('');
    if (state.discountAndCashResponse.total_discount > 0) {
      sessionStorage.setItem('ozivacash_apply_check', 'not applied');
      isCashApplied = 'not applied';
      dispatch(setCashApplied(false));
    }
    if (couponText !== '') {
      if (isCashApplied != 'applied') {
        let requestModel: CouponRequestModel;
        if (newRequestPayload.variants.length > 0) {
          requestModel = newRequestPayload;
        } else {
          const formattedVariantObject = formatCartRadiumAPIVariant(state.cart, couponText, state.cashApplied);
          requestModel = {
            variants: formattedVariantObject.variants,
            discountCode: getCouponCode(couponText),
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
            setCouponText('');

            setTimeout(() => {
              props.setOpenPopup(false);
              props.setOfferVisible(false);
            }, 3000);
            sessionStorage.setItem('coupon_code', couponCode);
            sessionStorage.setItem('discount_value', data.total_discount);
            const string_cart = getVariantIdsName(state.cart.line_items);
            const event_name = 'apply_offers_from_cart';
            const event_attributes = {
              discount_name: data.discount_code,
              product_name: string_cart.names.toString(),
              variant_id: string_cart.ids.toString(),
              product_id: string_cart.product_id.toString(),
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
            (window as any).Moengage.track_event(event_name, event_attributes);

          })
          .catch((error) => {
            if (error?.response?.data?.error?.errorCode == 'LOGIN_REQUIRED') {
              setShowLoader(false);
              props.setShowPopup(false);
              window.history.replaceState(null, null, ' ');
              const event = new Event('handleLogin');
              document.dispatchEvent(event);
              sessionStorage.setItem('login_coupon_code', getCouponCode(couponText));
            } else if (
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
                          getCouponCode(couponText),
                          state.cashApplied,
                        );
                        const requestPayload: CouponRequestModel = {
                          variants: variantObject.variants,
                          discountCode: getCouponCode(couponText),
                        };
                        cartService
                          ?.getCartList(requestPayload)
                          .then((res: GetCashResponse) => {
                            dispatch(setCartItems(res));
                            applyCoupon(requestPayload)
                          });
                      });
                  }
                });
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
      <div className="enter-coupon-input d-flex">
        <div className="pr-8 w-100 offer-input-div">
          <input
            ref={inputEl}
            type="text"
            className="font-control coupan-input"
            placeholder="Enter coupon/gift card code"
            onChange={(e) => couponChange(e)}
            value={couponText}
            onFocus={() => handleFocus()}
          />
        </div>
        {showLoader ? (
          <div className="loader-coupon apply-code text-uppercase text-primaryPahadiCitrus float-right font-medium cursor-none"></div>
        ) : (
          <div>
            <button
              disabled={couponText == ''}
              onClick={() => applyCoupon()}
              className="btn btn-primary bg-white text-orangeVibrantShade border border-primaryPahadiCitrus cursor-pointer add-btn-style font-medium hover-white"
            >
              APPLY
            </button>
          </div>
        )}
      </div>
      <p className="error-text text-left mb-8">
        {errorData?.data ? errorData?.data?.error : ''}
      </p>
      <hr className='d-block' style={{ margin: '8px' }} />
    </>
  );
};
export default CouponCode;
