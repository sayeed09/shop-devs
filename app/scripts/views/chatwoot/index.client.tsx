import React, { useContext, useEffect, useState } from 'react';
import ChatwootWidget from './ChatwootView';
import { getAccessToken } from '../../utils/product/formatter';
import { UserLoginValue } from '../../interface/product';
import LoginModal from '../product/LoginModal';
import OtpVerification from '../product/OtpVerificationModal';
import OtpVerifyStep from '../product/OtpVerifyStep';
// import '../../../scripts/scss/home-style.scss';
import QuickBuyCard from '../../components/productCard/quick-buy-card';
import { userService } from '../../services/user';
import { UserProfileResponseModel } from '../../models/cart/user';
import '../../scss/import/_popup-modal.scss';
import '../../views/prime/prime.scss';
import AuthErrorPopup from '../../components/authentication/auth-error-popup';
import '../../../scripts/scss/import/_product-cards.scss';
import SearchPage from '../search';
import { AuthenticationContext, Provider as AuthenticationProvider } from '../../context/authentication';
import { loggedInUserEvent } from '../../utils/tracking/gaTracking';
import { Provider as GAProvider } from '../../context/gatracking';
import ChatlineRestrictionAccess from './chatline-restrictions-popup';
import { AnalyticsService } from '../../services/analytics';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';
import '../../scss/import/_supersale.scss';
import { isUserLoginRequired } from '~/scripts/actions/authentication';

export default function ChatwootView() {
  const [chatBubble, setChatBubble] = useState<boolean>(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false);
  const [isShowOtpModal, setIsShowOtpModal] = useState<boolean>(false);
  const [mobileInput, setMobileInput] = useState('');
  const [directChat, setDirectChat] = useState(false);  // on pages/drectchat precede user status base access
  const [toggleInitialChat, setToggleInitialChat] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showQuickBuy, setShowQuickBuy] = useState<boolean>(false);
  const [authErrorPopup, setAuthErrorPopup] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showChatlineRestrictionModal, setShowChatlineRestrictionModal] = useState<boolean>(false);
  const [showconfetti, setShowconfetti] = useState(false);


  const [isShowOtpVerificationModal, setIsShowOtpVerificationModal] =
    useState(false);
  const [userData, setUserData] = useState<UserProfileResponseModel | null>(null);
  const [showPopUp, setShowPopup] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const identityHash = queryParams.get('identityHash');
  const phone = queryParams.get('phone');
  let authorizationToken: UserLoginValue | null = getAccessToken();
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);

  useEffect(() => {
    document.getElementById('PBarNextFrameWrapper')?.remove();
    if (window.location.hash.indexOf('chat-loaded') > -1 && !chatBubble) {
      setChatBubble(true);
    }
    const pathName = window.location.pathname;
    // if (
    //   pathName.indexOf('/collections/') > -1 &&
    //   pathName.indexOf('build-your-box') == -1 &&
    //   pathName.indexOf('/pages/') == -1 &&
    //   pathName.indexOf('/products') == -1
    //   && pathName.indexOf('collections/new-launches') == -1
    //   && pathName.indexOf('collections/frontpage') == -1
    // ) {
    //   setShowQuickBuy(true);
    // }

    if (authorizationToken && authorizationToken.accessToken) {
      userService
        .getUserProfile()
        .then((data) => {
          setUserData(data);
          loggedInUserEvent();
        })
        .catch((error) => {
          console.log(error);
        });
      // AnalyticsService.sendSessionMergeEvent();
    }
    if (window.location.pathname.indexOf('directchat') > -1) setDirectChat(true)

    // Listen for the custom event
    window.addEventListener('toggleSearchModalVisibility', handleSearchModalVisibility);
    window.addEventListener('sendEventToFB', sendEventToFB);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('toggleSearchModalVisibility', handleSearchModalVisibility);
      window.removeEventListener('sendEventToFB', sendEventToFB);
    };
  }, []);

  useEffect(() => {
    if (showSearchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showSearchModal])
  const handleSearchModalVisibility = () => {
    setShowSearchModal(showSearchModal => !showSearchModal);
  }

  useEffect(() => {
    if (window.location.hash.indexOf('chat-loaded') > -1 && showChat && ((identityHash && phone) || directChat || (userData && (userData.chatlineAccess)))) {
      setToggleInitialChat(!toggleInitialChat);
    }
    else if (window.location.hash.indexOf('chat-loaded') > -1 && showChat && !identityHash) {
      setShowChatlineRestrictionModal(true);
    }
  }, [showChat, userData]);

  const sendEventToFB = (e: any) => {
    const data = e.detail;
    fireFBPixelEvent({
      event: "AddToCart",
      productId: data.productId.toString(),
      productTitle: data.title,
      price: data.price,
      variantId: data.variantId.toString(),
    });
  }

  const handleChatwoot = (details) => {
    authorizationToken = getAccessToken();
    if (authorizationToken && authorizationToken.accessToken && !identityHash) {
      if (userData) {
        if (userData.chatlineAccess || directChat) {
          addUrlParams(queryParams);
          setChatBubble(!chatBubble);
        } else {
          setShowChatlineRestrictionModal(true);
          if (details && details.isConsult) {
            setShowPopup(true);
          }
        }
      }
    } else {
      addUrlParams(queryParams);
      if (identityHash && phone) {
        setChatBubble(!chatBubble);
      } else {
        setIsShowLoginModal(!isShowLoginModal);
        window.history.pushState('', 'Chat Loaded', '#chat-loaded');
      }
    }
  };

  const addUrlParams = (queryParams) => {
    const ncChatwootSource = queryParams.get('nc_source');
    const identityHash = queryParams.get('identityHash');
    const phone = queryParams.get('phone');
    let hashStr = '';
    if (identityHash && phone) {
      hashStr = `&identityHash=${identityHash}&phone=${phone}`;
    }
    let url = '';
    if (ncChatwootSource) {
      url =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        `?nc_source=${ncChatwootSource}${hashStr}#chat-loaded`;
    } else {
      url =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        `?nc_source=default${hashStr}#chat-loaded`;
    }

    window.history.pushState({ path: url }, '', url);
    window.history.pushState('', '', '#chat-loaded');
  };

  document.addEventListener(
    'triggerChatWoot',
    function (e: any) {
      if (e.detail && e.detail.phone) setMobileInput(e.detail);
      handleChatwoot(e.detail);
    },
    { once: true },
  );

  useEffect(() => {

    //Blast after 1 sec, cause banner image doesn't load immediately
    const showSuperSaleConfettiStr = sessionStorage.getItem('showSuperSaleConfetti');
    const showSuperSaleConfetti = showSuperSaleConfettiStr ? JSON.parse(showSuperSaleConfettiStr) : null;

    if (!showSuperSaleConfetti) {
      setTimeout(() => {
        setShowconfetti(true);
        sessionStorage.setItem('showSuperSaleConfetti', JSON.stringify(true));
      }, 500);

      //To hide confetti
      setTimeout(() => {
        setShowconfetti(false);
      }, 2800);
    }
    // fireFloodlight(
    //   "DC-12897990/invmedia/oziva001+unique",
    //   "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?"
    // );

  }, []);

  useEffect(() => {
    if (authenticationState?.isLoginRequired) {
      setIsShowLoginModal(true)
    }
  }, [authenticationState?.isLoginRequired])
  useEffect(() => {
    if (!isShowLoginModal) {
      AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(false));
    }
  }, [isShowLoginModal])
  return <>
    <AuthenticationProvider>
      <GAProvider>
        <div>
          {showconfetti && <div className="super-sale-confetti"></div>}

          {showQuickBuy && <QuickBuyCard />}
          {!authorizationToken && !identityHash ? (
            <>
              {isShowLoginModal && (
                <LoginModal
                  setIsShowLoginModal={setIsShowLoginModal}
                  setIsShowOtpModal={setIsShowOtpModal}
                  setMobileInput={setMobileInput}
                  mobileInput={mobileInput}
                  loginRequiredMsg={'To chat with our experts'}
                  onHandleClose={() => window.history.replaceState(null, '', ' ')}
                  setAuthErrorPopup={setAuthErrorPopup}
                  isConsultLogin={true}
                />
              )}
              {isShowOtpModal && (
                <OtpVerification
                  mobileInput={mobileInput}
                  setIsShowLoginModal={setIsShowLoginModal}
                  setIsShowOtpModal={setIsShowOtpModal}
                  setIsShowOtpVerificationModal={setIsShowOtpVerificationModal}
                  shouldPageRefresh={true}
                />
              )}
              {isShowOtpVerificationModal && (
                <OtpVerifyStep
                  setIsShowOtpVerificationModal={setIsShowOtpVerificationModal}
                  mobileInput={mobileInput}
                  setIsShowOtpModal={setIsShowOtpModal}
                  setIsShowLoginModal={setIsShowLoginModal}
                />
              )
              }
              {
                authErrorPopup ?
                  <AuthErrorPopup setAuthErrorPopup={setAuthErrorPopup} shouldRedirect={false} /> : null
              }
            </>
          ) : (
            window.location.pathname.includes('/pages/chat') && <ChatwootWidget
              chatBubble={chatBubble}
              setShowChat={() => setShowChat(true)}
              authToken={authorizationToken}
              toggleInitialChat={toggleInitialChat}
              urlParams={{ phone: phone as string, identityHash: identityHash as string }}
            />
          )}
          {showChatlineRestrictionModal ? <ChatlineRestrictionAccess setModalVisibility={setShowChatlineRestrictionModal} /> : null}
          {showSearchModal &&
            <SearchPage setModalVisibility={() => setShowSearchModal(showSearchModal => !showSearchModal)} />
          }
        </div>
      </GAProvider>
    </AuthenticationProvider>
  </>
}
