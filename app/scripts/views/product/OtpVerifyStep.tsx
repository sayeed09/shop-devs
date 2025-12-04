import React, { useContext, useState } from 'react';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import '../../../scripts/scss/import/_otp-verification.scss';
import { AuthenticationContext } from '../../context/authentication';
import { isUserLoginRequired, shiprocketAddressOptin, shipRocketValidationToken } from '../../actions/authentication';
import { loginService } from '../../services/login';
import { CartContext } from '../../context/cart';
import { setProceedToCheckout } from '../../actions/cart';
import { GAContext } from '../../context/gatracking';

interface OtpVerifyStepModal {
  setIsShowOtpVerificationModal: (isShowOtpVerificationModal: boolean) => void;
  mobileInput: string;
  setIsShowOtpModal: (isShowOtpModal: boolean) => void;
  setIsShowLoginModal?: (isShowLoginModal: boolean) => void;
}
//Todo: Moved this component from product directory to any miscellaneous directory
const OtpVerifyStep = (props: OtpVerifyStepModal) => {
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const {dispatch: cartDispatch} = useContext(CartContext);
  const gatrackingEvent = useContext(GAContext);
  
  const [stepName, setStepName] = useState('');
  const verifyStepState = () => {
    if (stepName === 'resendotp') {
      const loginData = {
        phone: props.mobileInput,
        source: 'order_management',
        type: 'sms',
        consentForAddressUse: authenticationState.shipRocketAddressOptin
      };
      loginService
        .sendOtp(loginData)
        .then((data: any) => {
          props.setIsShowOtpVerificationModal(false);

          setTimeout(() => {
            props.setIsShowOtpModal(true);
            gatrackingEvent('resend_otp', {phone: props.mobileInput});
          }, 10);
          data.shiprocketOtpToken && AuthenticationDispatch(shipRocketValidationToken(data.shiprocketOtpToken))

        })
        .catch((error) => {
          console.log('mobile number login error', error);
        });
    } else if (stepName === 'callotp') {
      const loginData = {
        phone: props.mobileInput,
        source: 'order_management',
        type: 'call',
      };
      loginService
        .sendOtp(loginData)
        .then((data: any) => {
          props.setIsShowOtpVerificationModal(false);
          setTimeout(() => {
            props.setIsShowOtpModal(true);
          }, 10);
        })
        .catch((error) => {
          console.log('mobile number login error', error);
        });
    } else if (stepName === 'diffnumber') {
      props.setIsShowOtpVerificationModal(false);
      setTimeout(() => {
        props.setIsShowLoginModal && props.setIsShowLoginModal(true);
        cartDispatch(setProceedToCheckout(false));
        AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(true));
      }, 10);
    }
  };
  return (
    <div className="oz-custom-popup show">
      <div className="oz-custom-popup-body" style={{ textAlign: 'left' }}>
        <div
          className="oz-cross-btn cursor-pointer"
          onClick={() => {
            cartDispatch(setProceedToCheckout(false));
            props.setIsShowOtpVerificationModal(false);
          }}
        >
          <ModalCloseIcon />
        </div>
        <h4>OTP Verification</h4>
        <div className="oz-input-group">
          <div
            style={{ marginBottom: '8px' }}
            onClick={() => setStepName('resendotp')}
          >
            <input type="radio" id="resendOtp" name="otp_verification" onChange={(e) => AuthenticationDispatch(shiprocketAddressOptin(!e.target.checked))}/>
            <label htmlFor="resendOtp">
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: '18px',
                  paddingLeft: '10px',
                }}
              >
                Resend OTP on
              </span>{' '}
              <strong>+91 {props?.mobileInput}</strong>{' '}
            </label>
          </div>
          <div
            style={{ marginBottom: '8px' }}
            onClick={() => setStepName('diffnumber')}
          >
            <input type="radio" id="diffnumber" name="otp_verification" onChange={(e) => AuthenticationDispatch(shiprocketAddressOptin(!e.target.checked))}/>
            <label htmlFor="diffnumber">
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: '18px',
                  paddingLeft: '10px',
                }}
              >
                Login with different number
              </span>
            </label>
          </div>
        </div>
        <div className="send-cta">
          <button
            id="send-btn"
            className="button"
            onClick={() => verifyStepState()}
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};
export default OtpVerifyStep;
