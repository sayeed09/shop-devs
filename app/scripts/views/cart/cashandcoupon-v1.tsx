import React, { useContext, useEffect } from 'react';
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
import '../../scss/import/offer-nudge.scss'
import { RightArrowIcon } from '../../../icons/right-arrow'
interface IProps {
  setOfferVisible: (offerVisible: boolean) => void;
  documentWidth: number;
  setShowPopup: (showPopup: boolean) => void;
  setOpenPopup: (openPopup: boolean) => void;
}

const CashCouponV1 = ({ documentWidth, setOfferVisible, setOpenPopup, setShowPopup }: IProps) => {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  const [isLoading, setLoading] = React.useState(false);
  const [hideCouponInput, setHideCouponInput] = React.useState(false);
  const priceModel = formatPrice(state);
  const { getCart } = useCartDetails();

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
          setOpenPopup(false);
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
    if (documentWidth > 767) {
      setOfferVisible(false);
      setShowPopup(true);
    } else {
      window.scrollTo(0, 0);
      setOfferVisible(true);
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

  if (state.cart.line_items.length === 0) {
    return null;
  }

  return (
    <div className="cash-and-coupon-container btn-cta" style={state.discountCode || state.cashApplied ? { padding: '4px 8px' } : { padding: '12px 8px' }} onClick={() => {
      if (!state.cashApplied && !state.discountCode && (!getVariantsFromStorage() ||
        getVariantsFromStorage()?.length === 0)) {
        viewOffer()
      }
    }}>
      <div className='cash-and-coupon-uppar-container'>
        <div className='available-offers-text'>
          <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/available-coupon.svg?v=1763048923' />
          {(!getVariantsFromStorage() ||
            getVariantsFromStorage()?.length === 0) ?
            <>
              {
                state.cashApplied ? (
                  <span className='heading-text-cash'>
                    ₹{getDiscountedValue()} saved {' '}
                    <span className='heading-sub-text-cash' >
                      with OZiva Cash
                    </span>
                  </span>
                ) : state.discountCode ? <p>
                  {currentOfferDetails?.description || `₹${getDiscountedValue()} ' saved`}
                  <span className='heading-sub-text-cash' >
                    {' '} with {state.discountCode.split('|')[0]}
                  </span>
                </p> : 'AVAILABLE OFFERS'
              }
            </>
            : <>
              {'BYB APPLIED'}
            </>}

        </div>
        {(!getVariantsFromStorage() ||
          getVariantsFromStorage()?.length === 0) &&
          <>
            {
              !state.discountCode && !state.cashApplied ? (
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/offers.svg?v=1763102613" alt="right icon" />
              ) : (
                <div
                  style={isLoading ? { opacity: 0.5 } : {}}
                  onClick={() => {
                    if (state.cashApplied) {
                      removeCash();
                    } else {
                      removeCoupon();
                    }
                  }}
                >
                  REMOVE
                </div>
              )
            }
          </>}
      </div>
      {
        state.discountCode || state.cashApplied ? <div className='cash-and-coupon-lower-container' onClick={() => viewOffer()}>
          View all offers <RightArrowIcon />
        </div> : null
      }
    </div >

  );
};
export default CashCouponV1;