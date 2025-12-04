import React, { useContext, useState } from 'react';
import LoginModal from '../../views/product/LoginModal';
import OtpVerification from '../../views/product/OtpVerificationModal';
import OtpVerifyStep from '../../views/product/OtpVerifyStep';
import { AuthenticationContext } from '../../context/authentication';
import AuthErrorPopup from './auth-error-popup';
interface Props {
  shouldPageRefresh?: boolean;
  loginRequiredMsg?: string;
  redirectOnModalClose?: boolean;
}
function Authentication(props: Props) {
  const { state: authenticationState, dispatch: AuthenticationDispatch } =
    useContext(AuthenticationContext);
  const [isShowOtpModal, setIsShowOtpModal] = useState<boolean>(false);
  const [mobileInput, setMobileInput] = useState<string>('');
  const [isShowOtpVerificationModal, setIsShowOtpVerificationModal] =
    useState<boolean>(false);
  const [authErrorPopup, setAuthErrorPopup] = useState(false);
  const [handleLoginModal, setHandleLoginModal] = useState(false);

  return (
    <div>
      {authenticationState.isLoginRequired && !isShowOtpModal && !handleLoginModal && (
        <LoginModal
          setIsShowOtpModal={setIsShowOtpModal}
          setMobileInput={setMobileInput}
          mobileInput={mobileInput}
          loginRequiredMsg={'Login to avail the offer'}
          setAuthErrorPopup={setAuthErrorPopup}
          setHandleLoginModal={setHandleLoginModal}
          redirectOnModalClose={props.redirectOnModalClose ? props.redirectOnModalClose : false}
        />
      )}
      {authenticationState.isLoginRequired && isShowOtpModal && (
        <OtpVerification
          mobileInput={mobileInput}
          setIsShowOtpModal={setIsShowOtpModal}
          setIsShowOtpVerificationModal={setIsShowOtpVerificationModal}
          shouldPageRefresh={props.shouldPageRefresh}
        />
      )}
      {authenticationState.isLoginRequired && isShowOtpVerificationModal && (
        <OtpVerifyStep
          setIsShowOtpVerificationModal={setIsShowOtpVerificationModal}
          mobileInput={mobileInput}
          setIsShowOtpModal={setIsShowOtpModal}
        />
      )}

      {
        authErrorPopup ?
          <AuthErrorPopup setAuthErrorPopup={setAuthErrorPopup}
            setHandleLoginModal={setHandleLoginModal}
            shouldRedirect={false} />
          : null
      }
    </div>
  );
}

export default Authentication;