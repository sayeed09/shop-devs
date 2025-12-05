import React, { useContext, useEffect, useState } from 'react';
import '../../../scripts/scss/import/_otp-verification.scss';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { ButtonLoader } from '../../../icons/button-loader';
import {
  AddressList,
  OZHelpDeskMoEngageJson,
  OtpVerifyData,
  UserLoginValue,
} from '../../interface/product';
import { hostDomainUrl, setAuthTokenWRTEnv, setToLocalStorage } from '../../utils/helper';
import { isUserLoginRequired, shipRocketAddressFetchToken } from '../../actions/authentication';
import { AuthenticationContext } from '../../context/authentication';
import { loginService } from '../../services/login';
import { Moengage } from '../../utils/tracking/gaTracking';
import { UserDetails, UserProfileResponseModel } from '../../models/cart/user';
import { getAccessToken } from '../../utils/product/formatter';
import { userService } from '../../services/user';
import { setUserLoggedIn } from '../../actions/user';
import { UserContext } from '../../context/user';
import { CartContext } from '../../context/cart';
import { setProceedToCheckout } from '../../actions/cart';
import { GAContext } from '../../context/gatracking';
import { fireOTPVerifyFloodlight } from '../../utils/tracking/yoptima';

interface OtpVerificationModal {
  mobileInput: string;
  setIsShowLoginModal?: (isShowLoginModal: boolean) => void;
  setIsShowOtpModal: (isShowOtpModal: boolean) => void;
  setIsShowOtpVerificationModal: (isShowOtpVerificationModal: boolean) => void;
  getAddressList?: (addressList: AddressList) => void;
  shouldPageRefresh?: boolean;
}
//Todo : Moved this component from product directory to any miscellaneous directory
const OtpVerification = (props: OtpVerificationModal) => {
  const { state: authenticationState, dispatch: AuthenticationDispatch } =
    useContext(AuthenticationContext);

  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { dispatch: cartDispatch } = useContext(CartContext);
  const [time, setTime] = useState({ minutes: 0, seconds: 59 });
  const { minutes, seconds } = time;
  const [otpInput, setOtpInput] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState('');
  const gaTrackingEvent = useContext(GAContext);

  function addMoengageUserAttributes(customerDetails: UserDetails) {
    try {
      Moengage.add_first_name(customerDetails?.firstName);
      Moengage.add_last_name(customerDetails?.lastName);
      Moengage.add_email(customerDetails?.email);
      Moengage.add_mobile(customerDetails?.phone);
      Moengage.add_unique_user_id(customerDetails?.customerId);
    } catch (error) {
      console.log(error);
    }
  }

  function addHelpDeskCookie(customerDetails: UserDetails, isPrime: boolean) {
    try {
      const date = new Date();
      const expiryDate = date.setDate(date.getDate() + 1);

      const ozHelpDeskMoEngageJson: OZHelpDeskMoEngageJson = {
        phone_number: customerDetails.phone,
        login_status: true,
        prime_status: isPrime,
      };
      if (customerDetails) {
        ozHelpDeskMoEngageJson.shopifyCustomer = customerDetails;
      }
      document.cookie = `__hd_moe=${JSON.stringify(
        ozHelpDeskMoEngageJson,
      )};expires=${expiryDate};domain=${hostDomainUrl}`;
    } catch (error) {
      console.log(error);
    }
  }

  const setProfileData = () => {
    const authorizationToken: UserLoginValue | null = getAccessToken();
    if (authorizationToken && authorizationToken.accessToken) {
      userService
        .getUserProfile()
        .then((data: UserProfileResponseModel) => {
          addMoengageUserAttributes(data?.userDetails);
          const isPrime: boolean =
            data?.prime?.current_status === 'prime' ? true : false;
          addHelpDeskCookie(data?.userDetails, isPrime);
        })
        .catch((error) => {
          console.log('Error : ', error);
          if (error?.response?.status === 401)
            userDispatch(setUserLoggedIn(false));
        });
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const { minutes, seconds } = prevTime;

        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        if (seconds === 0) {
          return { minutes: minutes - 1, seconds: 59 };
        }

        return { minutes, seconds: seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const backMobileModal = () => {
    props.setIsShowOtpModal(false);
    gaTrackingEvent('edit_mobile_number', {});
    setTimeout(() => {
      props.setIsShowLoginModal && props.setIsShowLoginModal(true);
      AuthenticationDispatch &&
        AuthenticationDispatch(isUserLoginRequired(true));
    }, 10);
  };
  const clickHereStep = () => {
    props.setIsShowOtpModal(false);
    setTimeout(() => {
      props.setIsShowOtpVerificationModal(true);
      gaTrackingEvent('resend_otp', { phone: props.mobileInput });
    }, 10);
  };
  const otpVerify = () => {
    setShowLoading(true);
    gaTrackingEvent('submit_otp', { otp: otpInput.trim(), phone: props.mobileInput });
    if (
      !isNaN(Number(otpInput.trim())) &&
      (authenticationState.shipRocketAddressOptin ? otpInput.trim().length === 6 : otpInput.trim().length === 4) &&
      otpInput.trim() !== ''
    ) {
      const otpData = {
        OTP: otpInput.trim(),
        phone: props.mobileInput,
        source: 'order_management',
        type: 'sms',
        consentForAddressUse: authenticationState.shipRocketAddressOptin,
        token: authenticationState.shipRocketAddressOptin ? authenticationState.shipRocketValidationToken : undefined
      };

      loginService
        .otpVerify(otpData)
        .then((data: OtpVerifyData) => {
          fireOTPVerifyFloodlight();
          (window as any).Moengage.track_event('Submit_OTP_click', { otp: otpInput.trim(), phone: props.mobileInput });
          gaTrackingEvent('verified_otp', { otp: otpInput.trim(), phone: props.mobileInput });
          setShowLoading(false);
          props.setIsShowOtpModal(false);
          setAuthTokenWRTEnv(data);
          setProfileData();
          setErrorMSG('');
          sessionStorage.removeItem('sessionMergeFlag')
          if (userDispatch) userDispatch(setUserLoggedIn(true));
          data.addressImportToken && AuthenticationDispatch(shipRocketAddressFetchToken(data.addressImportToken));
          if (props.getAddressList) props.getAddressList(null);
          {
            props.shouldPageRefresh === true && window.location.reload();
          } //on the Shopify home page, the state is not updating. It keeps the same state. That's why refresh is used.
          AuthenticationDispatch(isUserLoginRequired(false));
        })
        .catch((error) => {
          setShowLoading(false);
          console.log('otp verify error', error);
          if (error.response.data.message === 'Invalid OTP') {
            setErrorMSG('OTP is not valid');
            gaTrackingEvent('invalid_otp', { otp: otpInput.trim(), phone: props.mobileInput });
          } else {
            setErrorMSG('');
          }
        });
    }
  };

  return (
    <>
      <div className="oz-custom-popup show">
        <div className="oz-custom-popup-body">
          <div
            className="oz-cross-btn cursor-pointer"
            onClick={() => {
              props.setIsShowOtpModal(false)
              cartDispatch(setProceedToCheckout(false));
              AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(false))
            }
            }
          >
            <ModalCloseIcon />
          </div>
          <h4>OTP Verification</h4>
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <a
              style={{ position: 'absolute', top: '20px', right: 0 }}
              onClick={() => backMobileModal()}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.75"
                height="18.748"
                viewBox="0 0 18.75 18.748"
              >
                <path
                  id="edit_icon"
                  d="M19.6,3.755a2.582,2.582,0,0,0-3.648,0l-.913.918L5.313,14.39l-.021.021c-.005.005-.005.01-.01.01-.01.016-.026.031-.036.046s-.005.005-.005.01-.015.026-.026.041-.005.01-.01.016-.01.026-.016.041-.005.005-.005.01L3.027,21.072a.508.508,0,0,0,.124.526.519.519,0,0,0,.366.15.612.612,0,0,0,.165-.026l6.481-2.162c.005,0,.005,0,.01-.005a.188.188,0,0,0,.046-.021.019.019,0,0,0,.01-.005c.015-.01.036-.021.051-.031s.031-.026.047-.036.01-.005.01-.01.016-.01.021-.021L21,8.8a2.582,2.582,0,0,0,0-3.648ZM10,18.348,6.407,14.756,15.4,5.767l3.592,3.591ZM5.9,15.711l3.138,3.137L4.328,20.417ZM20.268,8.074l-.547.552L16.129,5.034l.552-.552a1.548,1.548,0,0,1,2.188,0l1.4,1.4A1.553,1.553,0,0,1,20.268,8.074Z"
                  transform="translate(-3 -3)"
                  fill="#006e5a"
                ></path>
              </svg>
            </a>
            Please Enter {authenticationState.shipRocketAddressOptin ? '6' : '4'} digit code sent on
            <h4 style={{ margin: '0', fontSize: '16px' }}>
              +91 {props.mobileInput}{' '}
            </h4>
          </div>

          <div className="oz-input-group">
            <input
              id="otp"
              className="oz-input"
              type="text"
              placeholder="OTP"
              autoFocus
              onChange={(e) => setOtpInput(e.target.value)}
              maxLength={authenticationState.shipRocketAddressOptin ? 6 : 4}
            />
          </div>
          {errorMSG && (
            <span style={{ color: 'red', display: 'flex' }}>{errorMSG}</span>
          )}
          <div className="send-cta">
            {!showLoading ? (
              <button
                id="send-btn"
                className="button"
                disabled={
                  isNaN(Number(otpInput.trim())) ||
                  (authenticationState.shipRocketAddressOptin ? otpInput.trim().length !== 6 : otpInput.trim().length !== 4) ||
                  otpInput.trim() === ''
                }
                onClick={() => otpVerify()}
              >
                VERIFY
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
          <div className="accept_website_policy" style={{ textAlign: 'center' }}>
            Didn&apos;t receive OTP?{' '}
            <button
              disabled={minutes === 0 && seconds != 0}
              onClick={clickHereStep}
            >
              Click here{' '}
            </button>
            {minutes === 0 && seconds === 0 ? null : (
              <span>
                ({minutes}:{seconds < 10 ? `0${seconds}` : seconds})
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default OtpVerification;