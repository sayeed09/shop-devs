import React, { useContext, useEffect, useState } from 'react';
import { ButtonLoader } from '../../../icons/button-loader';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { ExclusiveIcon } from '../../../icons/excusive-yellow';
import '../../../scripts/scss/import/_login.scss';
import { AuthenticationContext } from '../../context/authentication';
import { isUserLoginRequired, shiprocketAddressOptin, shipRocketValidationToken } from '../../actions/authentication';
import { loginService } from '../../services/login';
import PrivacyAndTerms from '../../components/website-terms/privacy-and-terms';
import { Moengage } from '../../utils/tracking/gaTracking';
import { setProceedToCheckout } from '../../actions/cart';
import { CartContext } from '../../context/cart';
import { GAContext } from '../../context/gatracking';
import { fireSendOTPFloodlight } from '../../utils/tracking/yoptima';

interface LoginModalInt {
  setIsShowLoginModal?: (isShowLoginModal: boolean) => void;
  setIsShowOtpModal: (isShowOtpModal: boolean) => void;
  setMobileInput: (mobileInput: string) => void;
  mobileInput: string;
  loginRequiredMsg?: string;
  shouldRedirect?: boolean;
  onHandleClose?: () => void;
  setAuthErrorPopup: (authErrorPopup: boolean) => void;
  setHandleLoginModal?: (loginModal: boolean) => void;
  isConsultLogin?: boolean;
  redirectOnModalClose?: boolean;
}
//Todo : Moved this component from product directory to any miscellaneous directory
const LoginModal = (props: LoginModalInt) => {
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const { dispatch } = useContext(CartContext);
  const [showLoading, setShowLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [policyType, setPolicyType] = useState('privacyPolicy');
  const gaTrackingEvent = useContext(GAContext);

  const submitNumber = (event: any) => {
    event.preventDefault();
    fireSendOTPFloodlight();
    const loginData = {
      phone: props.mobileInput,
      source: 'order_management',
      type: 'sms',
      consentForAddressUse: authenticationState.shipRocketAddressOptin
    };
    loginService
      .sendOtp(loginData)
      .then((data) => {
        Moengage.track_event('Submit_mobilenum_click', { phone: props.mobileInput });
        gaTrackingEvent('send_otp', { phone: props.mobileInput });
        props.setIsShowLoginModal && props.setIsShowLoginModal(false);
        data.shiprocketOtpToken && AuthenticationDispatch(shipRocketValidationToken(data.shiprocketOtpToken))
        setTimeout(() => {
          props.setIsShowOtpModal(true);
        }, 10);
      })
      .catch((error) => {
        if (error.response.status === 429) {
          props.setIsShowLoginModal && props.setIsShowLoginModal(false);
          props.setIsShowOtpModal(false);
          props.setAuthErrorPopup(true)

          // props.setIsShowOtpModal(true);
        }
      });

  };

  return (
    <>
      <div className="oz-custom-popup show">
        <div className="oz-custom-popup-body">
          <div
            className="oz-cross-btn cursor-pointer"
            onClick={() => {
              props.setIsShowLoginModal && props.setIsShowLoginModal(false);
              AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(false));
              props.onHandleClose && props.onHandleClose();
              dispatch(setProceedToCheckout(false));
              props.redirectOnModalClose && window.history.back()
            }}
          >
            <ModalCloseIcon />
          </div>

          {props.isConsultLogin ? (
            <>
              <h3 style={{
                marginBottom: '8px'
              }}>Verify your Mobile Number</h3>
              <h4>{props.loginRequiredMsg}</h4>
              <div className='highlight-text'>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <span className='exclusive-subtext'>EXCLUSIVE</span>
                  <ExclusiveIcon />
                </div>
              </div>
            </>
          ) : (
            <h4 style={{
              marginBottom: '8px'
            }}>Verify your Mobile Number</h4>
          )}
          <form onSubmit={(e) => submitNumber(e)}>
            <div className="oz-input-group">
              <input
                id="Mobilenumberv1"
                className="oz-input"
                type="tel"
                placeholder="Mobile No."
                onChange={(e) => props.setMobileInput(e.target.value)}
                value={props.mobileInput}
                required
                pattern="^[6-9]\d{9}$"
              />
            </div>
            <div className='fetch-address-container'>
              <label className="oz-select">
                <span className='label-txt'> Fetch my shipping addresses based on past order</span>
                <input type="checkbox" className="oz-select-label"
                  id="address-consent" name="address-consent" checked={authenticationState.shipRocketAddressOptin}
                  onChange={(e) => AuthenticationDispatch(shiprocketAddressOptin(e.target.checked))} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="send-cta">
              {!showLoading ? (
                <button id="send-btn" className="button" type="submit">
                  SEND OTP
                </button>
              ) : (
                <div
                  className="button"
                  style={{ height: '41.8px', padding: '6px' }}
                >
                  <ButtonLoader />
                </div>
              )}
            </div>
          </form>
          <div className="accept_website_policy" style={{ position: 'relative' }}>
            By continuing, you agree that you have read and accept our{' '}
            <a href="javascript:void(0)" onClick={() => {
              setShowPopup(true);
              setPolicyType('termsOfService');
            }}>
              T&amp;Cs
            </a>{', '}
            <a href="javascript:void(0)" onClick={() => {
              setShowPopup(true);
              setPolicyType('privacyPolicy');
            }}>
              Privacy Policy
            </a>
            {', '}
            and Shiprocket's <a href="https://checkout.shiprocket.in/terms-conditions/" target='_blank'>
              T&amp;C
              <div className="new-tab-info">(Opens in a new window)</div>
            </a>
            {', '}
            <a href="https://www.shiprocket.in/privacy-policy/my-shiprocket/" target='_blank'>
              Privacy Policy
              <div className="new-tab-info">(Opens in a new window)</div>
            </a>
            {' '}
          </div>
          <div className='powered-by'>
            Powered by <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/shiprocket_logo_1.svg?v=1729484034' />
          </div>
        </div>
        {
          showPopup && <PrivacyAndTerms setShowPopup={setShowPopup} policyType={policyType} />
        }
      </div>
    </>
  );
};
export default LoginModal;
