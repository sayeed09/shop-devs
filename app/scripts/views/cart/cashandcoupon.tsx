import React, { useContext, useEffect, useState } from 'react';
import CartCoupan from './cart-coupon';
import { GAContext } from '../../context/gatracking';
import {
  setDiscountAndCashResponse,
  setDiscountCode,
  setCashApplied,
  setCartItems,
} from '../../actions/cart';
import { CartContext } from '../../context/cart';
import { UserContext } from '../../context/user';
import {
  GetCartListResponse,
  GetCashResponse,
} from '../../models/cart/get-response';
import {
  getVariantIdsName,
  formatCartRadiumAPIVariant,
  getPrimeVariantId,
} from '../../utils/cart/formatter';
import {
  getGaEventAttributes,
  createGACartItemList,
  Moengage,
} from '../../utils/tracking/gaTracking';
import { CashRequestModel } from '../../models/cart/freebies';
import { cartService } from '../../services/cart';
import { setUserLoggedIn, setUserModel } from '../../actions/user';
import { getVariantsFromStorage } from '../../utils/build-you-box/helper';
import { formatPrice } from '../../utils/cart/price-formatter';
import { UserLoginValue } from '../../interface/product';
import { UserProfileResponseModel } from '../../models/cart/user';
import { userService } from '../../services/user';
import { checkIfSubscriptionCart } from '../../utils/helper';
import { getAccessToken } from '../../utils/product/formatter';
import useCartDetails from '../../hooks/cart';
import { totalSavingsPrice } from '../../utils/cart/helper';
import { ToolTipIcon } from '../../../icons/tooltip-icon';
import { FREEBIES_VARIANT_ID } from '../../utils/cart/constants';

const CashCoupon = (props: any) => {
  const { redeemableCashData } = props;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  const [isLoading, setLoading] = React.useState(false);
  const [hideCouponInput, setHideCouponInput] = React.useState(false);
  const priceModel = formatPrice(state);
  const { getCart, getHairPlanItems } = useCartDetails();
  const youSavePrice = totalSavingsPrice(priceModel);



  useEffect(() => {
    const queryString = window.location.search;
    const myurlParams = new URLSearchParams(queryString);
    const channel = myurlParams.get('oz_b');
    if (channel == '1') {
      setHideCouponInput(true);
    }
  }, []);



  const removeCoupon = () => {

    setLoading(true);
    trackRemoveCoupon();
    fetchCartItems();
    setTimeout(() => {
      sessionStorage.removeItem('showConfetti');
      sessionStorage.setItem('coupon_code', '');
      sessionStorage.setItem('login_coupon_code', '');
      dispatch(setDiscountCode(''));
      // dispatch(setCartItems(initialCartDicountState));
      setLoading(false);
    }, 1000);

  };

  const fetchCartItems = async () => {
    const dicountCode = '';
    cartService.getCartItems().then((data: GetCartListResponse) => {
      const formattedVariantObject = formatCartRadiumAPIVariant(
        data,
        dicountCode,
        state.cashApplied,
      );
      getCart(formattedVariantObject)
        .then((data) => {
          dispatch(setCartItems(data));
        })
        .catch(() => {
          setLoading(false);
        });
    });
    const authorizationToken: UserLoginValue | null = getAccessToken();
    if (
      authorizationToken &&
      authorizationToken.accessToken &&
      !checkIfSubscriptionCart()
    ) {
      userDispatch(setUserLoggedIn(true));
      userService
        .getUserProfile()
        .then((data: UserProfileResponseModel) =>
          userDispatch(setUserModel(data)),
        )
        .catch((error) => {
          if (error?.response?.status === 401)
            userDispatch(setUserLoggedIn(false));
        });
    }
  };
  const removeCash = () => {
    const formattedVariantObject = formatCartRadiumAPIVariant(
      state.cart,
      state.discountCode,
      state.cashApplied,
    );
    const requestModel: CashRequestModel = {
      variants: formattedVariantObject.variants,
      cashApply: false,
    };
    cartService
      .getCashRadium(requestModel)
      .then((data: any) => {
        dispatch(setCashApplied(true));
        dispatch(setDiscountAndCashResponse(data));
        sessionStorage.setItem('ozivacash_apply_check', 'not applied');
        sessionStorage.removeItem('showConfetti');
        dispatch(setCashApplied(false));
        const initialCashState: GetCashResponse = {
          line_items: [],
        };
        const initialCartDicountState: GetCashResponse = {
          ...state.cart,
          total_discount: 0,
        };
        dispatch(setDiscountAndCashResponse(initialCashState));
        dispatch(setCartItems(initialCartDicountState));
        setTimeout(() => {
          props.setOpenPopup(false);
        }, 3000);
      })
      .catch((error) => {
        if (error?.response?.status === 401)
          userDispatch(setUserLoggedIn(false));
      });
  };

  const trackRemoveCoupon = () => {
    const { price, quantity, names, ids } = getVariantIdsName(
      state.cart.line_items,
    );
    const event_name = 'remove_coupon';
    const moeEventName = 'remove_offer';
    const moeAttributes = {
      price: price,
      quantity: quantity,
      product_name: names,
      variant_id: ids,
    };
    const ga_attributes = getGaEventAttributes(
      createGACartItemList(state.cart.line_items),
    );
    gaTrackingEvent(event_name, { items: ga_attributes });
    (window as any).Moengage.track_event(moeEventName, moeAttributes);
  };

  const viewOffer = () => {
    if (props.setDocumentWidth > 767) {
      props.setOfferVisible(false);
      props.setShowPopup(true);
    } else {
      window.scrollTo(0, 0);
      props.setOfferVisible(true);
    }
    const data = state.cart.line_items;
    const string_cart = getVariantIdsName(data);
    const event_name = 'view_promotion';
    const event_attributes = {
      product_name: string_cart.names.toString(),
      product_id: string_cart.product_id.toString(),
      variant_id: string_cart.ids.toString(),
    };
    (window as any).Moengage.track_event(event_name, event_attributes);
    gaTrackingEvent('view_offers', { source: 'Cart' });
  };

  if (state.cart.line_items.length === 0) {
    return null;
  }

  const getDiscountedValue = () => {
    const couponCode = state?.discountAndCashResponse.discount_code;
    const totalDiscount = (state?.discountAndCashResponse.total_discount ?? 0) / 100;

    //Need to refactor
    return couponCode && couponCode.includes('_freebies')
      ? couponCode.split('|').length > 1
        ? totalDiscount - (priceModel?.freebiesDiscount ?? 0)
        : totalDiscount
      : totalDiscount;
  };
  const currentOfferDetails = state.offers && state.offers.find((item) => item.code == state.discountCode.split('|')[0]);

  const totalCashback =
    userState.isLoggedIn &&
      userState.userProfile.prime?.current_status === 'prime'
      ?
      Number(state.discountAndCashResponse.cashback_prime || 0) / 100
      : 0 + Number(state.discountAndCashResponse.cashback_non_prime || 0) / 100;

  const getCashBackOnOrder = () => {
    return state.discountAndCashResponse?.order_total ? Math.floor((Number(state.discountAndCashResponse.order_total) / 100) * 0.15) : Math.floor((Number(+state?.cart?.order_total / 100) * 0.15))
  }
  return (
    <div className={`cart-offers  ${!userState.isLoggedIn ? 'offer-unlock-test-ab' : ''}`}>
      <div className="cart-item bg-white rounded-sm mb-4 saving-corner-container">
        <h2
          className={`free-gifts-heading mb-8`}
        >
          Savings Corner
          {youSavePrice > 0 &&
            <span >
              <span className='total-savings'>
                Total savings: ₹{youSavePrice}
              </span>
            </span>
          }
        </h2>
        <hr style={{ margin: '8px -8px 16px' }} />
        <div
          className="d-flex coupon-container-view"
          style={getVariantsFromStorage() ? { alignItems: 'center' } : {}}
        >
          <div className="oziva-item-img ozi-img-cart">
            <img
              alt="CashIcon"
              src={state.discountCode && !state.cashApplied ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/Coupon.svg?v=1751538407' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/OZiva_cash.svg?v=1751538405'}
              style={{ width: '24px' }}
            />
          </div>
          {(!getVariantsFromStorage() ||
            getVariantsFromStorage()?.length === 0) && getHairPlanItems().length == 0 ? (
            <div className="cart-item-dtl pb-0">
              {!state.discountCode && !state.cashApplied ? (
                <>
                  <a
                    onClick={() => viewOffer()}
                    className="delete-item text-uppercase text-orangeVibrantShade float-right font-medium cursor-pointer button-format cart-declutter-control"
                  >
                    VIEW OFFERS
                  </a>
                  <div className='cart-devlutter-A' onClick={() => viewOffer()}>
                    <div className='exp-offer-tab'>{state.offers?.length || ""} {state.offers?.length > 1 ? 'Offers' : 'Offer'}</div>
                    <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right_black.svg?v=1724078331' />
                  </div>
                </>
              ) : state.cashApplied ? (
                <a
                  style={isLoading ? { opacity: 0.5 } : {}}
                  onClick={() => removeCash()}
                  className="delete-item text-uppercase text-orangeVibrantShade float-right font-medium cursor-pointer button-format"
                >
                  REMOVE
                </a>
              ) : (
                <a
                  style={
                    isLoading
                      ? { opacity: 0.5 }
                      : {}
                  }
                  onClick={() => removeCoupon()}
                  className={
                    'delete-item text-uppercase text-orangeVibrantShade  float-right font-medium  cursor-pointer button-format'
                  }
                >
                  REMOVE
                </a>
              )}
              <div className="cart-item-name">
                {!state.discountCode ? (
                  <>
                    <p className="font-bold heading-text">
                      {state.cashApplied ? <>
                        <span className='heading-text-cash'>
                          ₹{getDiscountedValue()} saved
                          <span className='heading-sub-text-cash' >
                            with OZiva Cash
                          </span>
                        </span>
                      </> : 'Apply OZiva Cash & Offers'}
                    </p>
                    {!state.cashApplied && (

                      <p className="small-text coupan-save">
                        Save ₹
                        {redeemableCashData &&
                          redeemableCashData.redeemable_cash
                          ? redeemableCashData.redeemable_cash
                          : 375}{' '}
                        by using OZiva Cash
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-bold heading-text">
                      {currentOfferDetails?.description || `₹${getDiscountedValue()} ' saved`}
                      <span className='heading-sub-text-cash' >
                        with {state.discountCode.split('|')[0]}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <h4 style={{ alignItems: 'center' }}>
              {getHairPlanItems().length != 0 ? 'Hair Growth Plan Applied' : 'BYB Applied'}
            </h4>
          )}
        </div>
        {/* {(state.discountCode || state.cashApplied) && (
          <p className="small-text cash-amount" onClick={() => viewOffer()}>
            View all offers <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right_550969f3-f7dc-4e71-8cde-ff9a3a35931b.svg?v=1751432643" />
          </p>
        )} */}
        {(youSavePrice - (Number(getDiscountedValue()))) > 0 &&
          < div className='product-savings-container'>
            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Coupon.svg?v=1751538407' />
            <span className='saving-text'>
              <span className='bold mr-4'>₹{youSavePrice - (Number(getDiscountedValue() || 0))}</span>
              saved with product price drop!
            </span>
            <span className='applied-text'>
              <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done.svg?v=1751376837' />
              Applied</span>
          </div>}
        {(getCashBackOnOrder() > 0 || totalCashback > 0) &&
          <div className='product-savings-container'>
            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Coupon.svg?v=1751538407' />
            <span className='saving-text'>
              You earn{' '}
              <span className="bold ml-2 mr-2">
                {Number(totalCashback + getCashBackOnOrder())} OZiva Cash
              </span>{' '}
              on this order
              {totalCashback > 0 &&
                <span className="tooltip" tabIndex={1}>
                  <ToolTipIcon />
                  <span className="tooltiptext">
                    {totalCashback >
                      0 && (
                        <div>
                          {state.discountAndCashResponse.discount_code} Cashback:{' '}
                          {totalCashback}
                        </div>
                      )}
                  </span>
                </span>}
            </span>
            <span className='applied-text'>
              <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done.svg?v=1751376837' />
              Applied</span>
          </div>}
        <div
          className={`${!state.quickBuyCart ? 'pt-16' : 'pt-0'
            } ${hideCouponInput ? 'd-none' : ''}`}
        >
          {(!getVariantsFromStorage() ||
            getVariantsFromStorage()?.length == 0) && getHairPlanItems().length === 0 && (
              <CartCoupan
                setOfferVisible={props.setOfferVisible}
                setOpenPopup={props.setOpenPopup}
                setShowPopup={props.setShowPopup}
                setIsDisplayConfeti={props.setIsDisplayConfeti}
              />
            )}

        </div>
      </div>
    </div >
  );
};
export default CashCoupon;