import React, { useContext, useEffect } from 'react';
import { CashIcon } from '../../../icons/cash-icon';
import { cartService } from '../../services/cart';
import { formatCartRadiumAPIVariant, getVariantIdsName } from '../../utils/cart/formatter';
import { CartContext } from '../../context/cart';
import { CashRequestModel } from '../../models/cart/freebies';
import { setDiscountAndCashResponse, setCashApplied, setDiscountCode } from '../../actions/cart';
import { GetCashResponse } from '../../models/cart/get-response';
import { UserContext } from '../../context/user';
import { Moengage } from '../../utils/tracking/gaTracking';
import { setUserLoggedIn } from '../../actions/user';
import { GAContext } from '../../context/gatracking';

const CashLogin = (props: any) => {
  const ifCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const { state, dispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const gaTrackingEvent = useContext(GAContext);

  const [checked, setChecked] = React.useState(
    ifCashApplied == 'applied' ? true : false,
  );

  const CashLogin = () => {
    props.setShowPopup(false);
    setTimeout(() => {
      const event = new Event('handleLogin');
      document.dispatchEvent(event);
    }, 100);
  };
  const select_cash = () => {
    setChecked(!checked);


    const requestModel: CashRequestModel = {
      variants: formatCartRadiumAPIVariant(state.cart, state.discountCode, state.cashApplied).variants,
      cashApply: !state.cashApplied,
    };
    cartService
      .getCashRadium(requestModel)
      .then((data: any) => {
        dispatch(setCashApplied(true));
        dispatch(setDiscountAndCashResponse(data));
        dispatch(setDiscountCode(''));
        // remove discount code
        sessionStorage.setItem('coupon_code', '');
        sessionStorage.setItem('login_coupon_code', '');

        if (!state.cashApplied) {
          sessionStorage.setItem('ozivacash_apply_check', 'applied');
          props.setCashApply('applied');
          props.setShowPopup(false);
          setTimeout(() => {
            props.setOpenPopup(true);
          }, 100);
          setTimeout(() => {
            props.setOpenPopup(false);
            props.setOfferVisible(false);
          }, 3000);
          const { names, product_id, ids, price } = getVariantIdsName(data?.line_items);
          const eventName = 'cart_apply_oziva_cash';
          const moeAttributes: any = {
            variant_id: ids,
            product_id: product_id,
            product_name: names,
            price: price,
            discount_code: data.discount_code,
            cash_applied: props.redeemableCashData && props.redeemableCashData.redeemable_cash,
            discount: data.total_discount / 100,
          };

          (window as any).Moengage.track_event(eventName, moeAttributes);
          gaTrackingEvent('apply_oziva_cash', {});
        } else {
          sessionStorage.setItem('ozivacash_apply_check', 'not applied');
          props.setCashApply('not applied');
          dispatch(setCashApplied(false));
          const initialCashState: GetCashResponse = {
            line_items: [],
          };
          dispatch(setDiscountAndCashResponse(initialCashState));
          setTimeout(() => {
            props.setOpenPopup(false);
          }, 3000);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) userDispatch(setUserLoggedIn(false));

      });
  };

  return (
    <>
      <div className="mb-16 oz-cash-box">
        <div className="cart-item offer-box bg-white rounded-sm mb-4 border borderGray p-8">
          <p className="font-medium mb-8 text-left heading-text">OZiva Cash</p>
          <hr className='d-block' style={{ margin: '8px -8px' }} />
          <div className='d-flex'>
            <div className="oziva-item-img cashIconPopup mr-16">
              <img alt='CashIcon' src={'https://cdn.shopify.com/s/files/1/2393/2199/files/CashIcon.jpg?v=1705314734'} width={42} height={42} />
            </div>
            <div className="cart-item-dtl pb-0">
              {!userState.isLoggedIn ? (
                <>
                  <a
                    onClick={() => CashLogin()}
                    className="delete-item text-uppercase text-orangeVibrantShade float-right font-medium cursor-pointer button-format"
                  >
                    Login
                  </a>
                  <div className="cart-item-name">
                    <p className="mb-8 font-medium text-left">
                      Login to apply OZiva Cash and Save Upto ₹375
                    </p>
                    <p className="mb-0 font-normal text-left text-off-gray earn-cash-first-purchase">
                      Get 200 OZiva Cash on your First Purchase
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {!state.cashApplied ? (
                    <button
                      className={`bg-white cursor-pointer font-medium button-format border-0 pos-checkbox text-orangeVibrantShade`}
                      onClick={() => select_cash()}
                      disabled={(props.redeemableCashData && props.redeemableCashData.redeemable_cash > 0) ? false : true}
                    >
                      APPLY
                    </button>
                  ) : (
                    <button
                      className="bg-white text-orangeVibrantShade cursor-pointer font-medium button-format border-0 pos-checkbox"
                      onClick={() => select_cash()}

                    >
                      APPLIED
                    </button>
                  )}
                  <div className="cart-item-name">
                    {
                      userState.userProfile.userDetails && userState.userProfile.userDetails.orderCount > 0 ?
                        <>
                          <p className="mb-8 font-medium text-left">
                            Use {props.redeemableCashData && props.redeemableCashData.redeemable_cash} OZiva Cash to Save ₹
                            {props.redeemableCashData && props.redeemableCashData.redeemable_cash}
                          </p>
                          <p className="text-left text-off-gray cash-balance">
                            Your Cash Balance: {props.redeemableCashData && props.redeemableCashData.oziva_cash}
                          </p>
                        </> :
                        <p className="mb-0 text-left" style={{ "marginBottom": "1rem" }}>Redeem 200 OZiva Cash on your First Purchase</p>
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CashLogin;