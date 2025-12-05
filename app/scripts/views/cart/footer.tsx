import React, { useContext, useEffect, useState } from 'react';
import { GAContext } from '../../context/gatracking';
import { DeliveryIcon } from '../../../icons/delivery-icon';
import { CleanProductIcon } from '../../../icons/clean-product';
import { PaymentSecurity } from '../../../icons/payment-security';
import { CartContext } from '../../context/cart';
import { UserContext } from '../../context/user';
import { cartService } from '../../services/cart';

import {
  getCheckoutRequestData,
  getCheckoutURL,
  getVariantIdsName,
  foundPrimeItemInCart,
  formatPriceWithCurrency,
  getUpdateRequestModel,
} from '../../utils/cart/formatter';
import {
  getGaEventAttributes,
  createGACartItemList,
  Moengage,
} from '../../utils/tracking/gaTracking';
import ErrorModal from '../../components/cart/error-modal';
import { formatPrice } from '../../utils/cart/price-formatter';
import { IAnalyticsModel, ISubscriptionObject } from '../../interface/cart';
import { getAccessToken, getFromCookie } from '../../utils/product/formatter';
import {
  AddressList,
  SubscriptionProductDetails,
  UserLoginValue,
} from '../../interface/product';
import {
  checkIfSubscriptionCart,
  getSubscriptionDataFromStorage,
} from '../../utils/helper';
import {
  ensureMinDelay,
  storeQuickBuyCheckouts,
} from '../../utils/cart/helper';
import { getENVSpecificPrimeItemId } from '../../utils/product/constants';
import { AuthenticationContext } from '../../context/authentication';
import { isUserLoginRequired } from '../../actions/authentication';
import { MixPanelContext } from '../../context/mixpanelContext';
import PrivacyAndTerms from '../../components/website-terms/privacy-and-terms';
import { AnalyticsService } from '../../services/analytics';
import { fireEnterAddressFloodlight } from '../../utils/tracking/yoptima';

const Footer = () => {
  const subscriptionData: SubscriptionProductDetails | null =
    getSubscriptionDataFromStorage();
  const queryParameters = new URLSearchParams(window.location.search);
  const { state } = useContext(CartContext);
  // const { distinctId } = useContext(MixPanelContext);
  const distinctId = ""; // This is done for mixpanel expeirment, ToDo: remove after POC is done
  const gaTrackingEvent = useContext(GAContext);
  const { state: userState } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [ErrorData, setErrorData] = useState('');
  const [proceedToChkt, setProceedToChk] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [policyType, setPolicyType] = useState('privacyPolicy');

  const sessionExpVal = sessionStorage.getItem('_experimental');
  const parsedExpVal = sessionExpVal ? JSON.parse(sessionExpVal) : null;
  const getCookie = JSON.parse(getFromCookie('_experimentalPDP') || '{}') || {};
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const [fetchAddressProgress, setAddressFetchProgress] = useState(false);

  useEffect(() => {
    setLoading(false);

  }, [])

  useEffect(() => {
    if (userState.isLoggedIn && proceedToChkt) {
      proceedToCheckout();
    }
    if (userState.isLoggedIn) {
      AnalyticsService.sendSessionMergeEvent();
    }
  }, [userState.isLoggedIn]);

  //UDS-560 Start
  useEffect(() => {
    if (state.ProceedToCheckout) {
      proceedToCheckout();
    }
  }, [state.ProceedToCheckout]);
  //UDS-560 End

  useEffect(() => {
    if (!userState.isLoggedIn && !authenticationState.shipRocketAddressOptin) {
      setProceedToChk(true)
    }
  }, [authenticationState.shipRocketAddressOptin])

  useEffect(() => {
    if (authenticationState.shipRocketAddressFetchToken && fetchAddressProgress) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await cartService.fetchAddressSaveProgress(authenticationState.shipRocketAddressFetchToken as string);
          if (response.data.status === "COMPLETED") {
            proceedToCheckout();
          } else {
            setTimeout(fetchData, 2000);
          }
        } catch (err) {
          setTimeout(fetchData, 2000);
        }
      };

      fetchData();

    }

  }, [authenticationState.shipRocketAddressFetchToken])

  const proceedToCheckout = () => {
    if (!isLoading) {
      fireEnterAddressFloodlight()
      const authorizationToken: UserLoginValue | null = getAccessToken();
      if (!authorizationToken?.accessToken) {
        AuthenticationDispatch(isUserLoginRequired(true));
        setAddressFetchProgress(true)
        return;

      } else {
        setLoading(true);
        if (subscriptionData && queryParameters.get('view') === 'subscription') {
          const subscriptionObject: ISubscriptionObject = {
            variantId: subscriptionData.variant_id,
            duration: subscriptionData.subscriptionPlan,
            planId: subscriptionData.planId,
          };
          ensureMinDelay(cartService
            .proceedToCheckoutWithSubsriptionItem(subscriptionObject, distinctId),
            1000
          )
            .then((data) => {
              if (data.status === 201) {
                setLoading(false);
                window.location.href = `${getCheckoutURL()}?id=${data.data.data.checkoutId
                  }&step=0`;
              } else {
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              setErrorData(error?.response?.data?.error?.description);
              setShowErrorModal(true);
            });
        }
        else {
          trackCheckout();
          ensureMinDelay(cartService
            .proceedCheckout(getCheckoutRequestData(state), distinctId), 1000)
            .then((data: any) => {
              if (data?.status) {
                storeQuickBuy(data.data.checkout_id);
                if (parsedExpVal !== null || Object.keys(getCookie).length != 0)
                  storeAnalyticsData(data.data.checkout_id);
                if (state.quickBuyCart && !state.editDefaultAddress) {
                  proceedToQuickBuy(data.data.checkout_id);
                } else {
                  window.location.href = `${getCheckoutURL()}?id=${data.data.checkout_id
                    }&step=0`;
                }
              } else {
                setLoading(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              setErrorData(err?.response?.data?.error?.description);
              setShowErrorModal(true);
            });
        }
      }
    }
  };
  useEffect(() => {
    if (state.editDefaultAddress) {
      proceedToCheckout();
    }
  }, [state.editDefaultAddress]);
  const proceedToQuickBuy = async (checkoutId: string) => {
    const response = await cartService.proceedToPayment(
      checkoutId,
      getUpdateRequestModel(state.defaultAddress as AddressList),
    );
    // Todo: fallback to be added for error
    if (response.status) {
      window.location.href = `${getCheckoutURL()}?id=${checkoutId}&step=1`;
    }
  };

  const storeAnalyticsData = (checkoutId: string) => {
    //Todo: PDP POC - to be removed
    let eventInfo = { ...getCookie, ...parsedExpVal };
    const analyticsPayload: IAnalyticsModel = {
      checkoutId: checkoutId,
      eventInfo: eventInfo,
    };
    cartService.storeAnalyticsData(analyticsPayload).then((data: any) => {
      return data;
    });
  };
  const storeQuickBuy = (checkoutId: string) => {
    let filteredLineItems = state.discountAndCashResponse.line_items.filter(
      (item) =>
        item.product_id != getENVSpecificPrimeItemId &&
        !item.benefits.some(
          (val) =>
            val.includes('BYB-3') ||
            val.includes('BYB_VMS') ||
            val.includes('Build Your Own Box'),
        ) &&
        !state.selectedFreebies.some(
          (freebie) => freebie.variant_id == item.variant_id,
        ),
    );
    if (filteredLineItems.length > 0) {
      filteredLineItems = filteredLineItems.sort((a, b) => b.price - a.price);
      storeQuickBuyCheckouts(
        checkoutId,
        filteredLineItems[0].product_id,
        filteredLineItems[0].variant_id,
      );
    }
  };
  const trackCheckout = () => {
    const event_name = 'cart_place_order_click';
    const moeEventName = 'cart_place_order';
    const ga_attributes = getGaEventAttributes(
      createGACartItemList(state.cart.line_items),
    );
    const { names, product_id, ids, price, benefits_chips, quantity } =
      getVariantIdsName(state.cart.line_items);
    const moeAttributes = {
      product_name: names,
      variant_id: ids,
      product_id: product_id,
      price: price,
      benifit_chip: benefits_chips,
      quantity: quantity,
    };
    gaTrackingEvent(event_name, ga_attributes);
    (window as any).Moengage.track_event(moeEventName, moeAttributes);
  };
  const cart_items: any = getVariantIdsName(state.cart.line_items);
  const cart_items_id: number[] = cart_items.ids;
  if (!subscriptionData || queryParameters.get('view') !== 'subscription') {
    if (state.cart.line_items.length === 0) {
      return null;
    }
  }
  const priceModel = formatPrice(state);

  const handleOkGotItClick = () => {
    setShowErrorModal(false);
  };
  const youSavePrice = checkIfSubscriptionCart() && subscriptionData ? subscriptionData.compareAtPrice - subscriptionData.price : priceModel.orderTotal - priceModel.subtotal;

  return (
    <>
      <div className="oziva-cart-footer">
        <div className='uds-523-exp-link'>
          <span onClick={() => {
            setShowPopup(true);
            setPolicyType('refundPolicy');
          }}>Refund Policy</span>,{' '}
          <span onClick={() => {
            setShowPopup(true);
            setPolicyType('termsOfService');
          }}>Terms of Service</span> and{' '}
          <span onClick={() => {
            setShowPopup(true);
            setPolicyType('privacyPolicy');
          }}>Privacy Policy</span>.
        </div>
        {/* <!-- END FOOTER ICONS --> */}
        <footer className="cart-footer bg-white">
          <span></span>
          <div className="d-flex flex-center uds-665-control">
            <div>
              <span className="mr-4 text-off-gray d-block pl-2 UDS-665-Exp">
                Total <span className="mrp-text">MRP:</span>
                {checkIfSubscriptionCart() &&
                  subscriptionData &&
                  subscriptionData.compareAtPrice - subscriptionData.price > 0 ? (
                  <span className="text-decoration mr-4">
                    {formatPriceWithCurrency(subscriptionData.compareAtPrice)}{' '}
                  </span>
                ) : (
                  priceModel.orderTotal - Number(priceModel.subtotal) > 0 && (
                    <span className="text-decoration mr-4">
                      {formatPriceWithCurrency(priceModel.orderTotal)}{' '}
                    </span>
                  )
                )}
                <h3 className="text-black d-inline">
                  {checkIfSubscriptionCart() && subscriptionData
                    ? formatPriceWithCurrency(subscriptionData.price)
                    : priceModel.totalPayable &&
                    formatPriceWithCurrency(priceModel.totalPayable)}
                </h3>
                {youSavePrice > 0 &&
                  <p className="small-text text-orangeVibrantShade">
                    You save &nbsp;
                    {checkIfSubscriptionCart() && subscriptionData
                      ? formatPriceWithCurrency(
                        subscriptionData.compareAtPrice -
                        subscriptionData.price,
                      )
                      : formatPriceWithCurrency(
                        priceModel.discount +
                        priceModel.freebiesDiscount +
                        (priceModel.orderTotal - priceModel.subtotal),
                      )}
                  </p>}

              </span>
            </div>
            <div className="text-right btn-div w-100">
              <a
                style={isLoading ? { opacity: 0.5 } : {}}
                href="javascript:void(0)"
                id="login"
                onClick={() => proceedToCheckout()}
                className={
                  userState.isLoggedIn &&
                    userState.userProfile.prime?.current_status == 'prime'
                    ? `btn btn-primary btn-block button-format border-radius-chng cta-cart-btn  ${isLoading ? 'cta-cart-btn-loading' : 'btn-cta'}`
                    : `btn btn-primary btn-block button-format cta-cart-btn ${isLoading ? 'cta-cart-btn-loading' : 'btn-cta'}`
                }
              >
                <span>
                  {state.quickBuyCart ? 'PROCEED TO PAYMENT' : 'ENTER ADDRESS'}
                </span>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Address_1_6378cb5d-edc1-4c66-aa0a-743504dd93e4.gif?v=1748438350" className='location-gif-loading' />
              </a>
            </div>
          </div>
          {/* UDS-665-Start */}
          <div
            style={isLoading ? { opacity: 0.5, height: '42px', alignItems: 'center' } : { height: '42px', alignItems: 'center' }}
            id="login"
            onClick={() => proceedToCheckout()}
            className={
              `btn-primary btn-block cta-cart-btn-exp uds-665-v3 ${userState.isLoggedIn && userState.userProfile.prime?.current_status == 'prime'
                ? 'border-radius-chng'
                : ''} ${isLoading ? 'cta-cart-btn-loading' : 'btn-cta'}`
            }

          >
            {!isLoading ? <>
              <div className='pricing-container'>
                {checkIfSubscriptionCart() &&
                  subscriptionData &&
                  subscriptionData.compareAtPrice - subscriptionData.price > 0 ? (
                  <span className="text-decoration mr-4 mrp-price-footer">
                    {formatPriceWithCurrency(subscriptionData.compareAtPrice)}{' '}
                  </span>
                ) : (
                  priceModel.orderTotal - Number(priceModel.subtotal) > 0 && (
                    <span className="text-decoration mr-4 mrp-price-footer">
                      {formatPriceWithCurrency(priceModel.orderTotal)}{' '}
                    </span>
                  )
                )}
                <span style={{ fontWeight: 500, fontSize: '14px' }}>{checkIfSubscriptionCart() && subscriptionData
                  ? formatPriceWithCurrency(subscriptionData.price)
                  : priceModel.totalPayable &&
                  formatPriceWithCurrency(priceModel.totalPayable)}</span>

                {youSavePrice > 0 &&
                  <p className="you-save-footer">
                    You save &nbsp;
                    {checkIfSubscriptionCart() && subscriptionData
                      ? formatPriceWithCurrency(
                        subscriptionData.compareAtPrice -
                        subscriptionData.price,
                      )
                      : formatPriceWithCurrency(
                        priceModel.discount +
                        priceModel.freebiesDiscount +
                        (priceModel.orderTotal - priceModel.subtotal),
                      )}
                  </p>}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>
                <span className='vertical-line-footer'></span> Enter Address
              </div>
            </> : null}

            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Address_1_6378cb5d-edc1-4c66-aa0a-743504dd93e4.gif?v=1748438350" className='location-gif-loading-exp' />
          </div>
          {/* UDS-665-End */}
        </footer>
      </div>
      {showErrorModal && (
        <ErrorModal
          errorMessage={ErrorData ? ErrorData : 'Exception Occured'}
          handleOkGotItClick={handleOkGotItClick}
        />
      )}
      {
        showPopup && <PrivacyAndTerms setShowPopup={setShowPopup} policyType={policyType} />
      }
    </>
  );
};
export default Footer;