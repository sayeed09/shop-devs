import React, { useState, useEffect } from 'react';
import Header from './header';
import OfferSection from './offer-section';
import OfferHeader from './offer-header';
import CartPage from './cart-page';
import '../../scss/oziva-cart.scss';
import { Provider as CartProvider } from '../../context/cart';
import { Provider as UserProvider } from '../../context/user';
import { Provider as GAProvider } from '../../context/gatracking';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import { Provider as AuthenticationProvider } from '../../context/authentication';
import { SentryProvider } from '../../context/errorTracking';
import { IRedeemableCashData } from '../../interface/cart';
import { getFromCookie } from '../../utils/product/formatter';
import { checkIfSubscriptionCart } from '../../utils/helper';

const CartView = () => {
  const subscriptionData = sessionStorage.getItem("subscriptionData") || getFromCookie("subscriptionData");
  const queryParameters = new URLSearchParams(window.location.search);
  const [offerVisible, setOfferVisible] = useState(false);
  const [documentWidth, setDocumentWidth] = useState(
    document.documentElement.clientWidth,
  );
  const [showPopup, setShowPopup] = useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isDispalyConfeti, setIsDisplayConfeti] = useState(false);
  const [redeemableCashData, setRedeemableCashData] = useState<IRedeemableCashData>();
  useEffect(() => {
    if (!subscriptionData && queryParameters.get('view') === 'subscription') {
      window.location.href = '/cart';
    }
    /* offer section open in modal */
    window.addEventListener('load', function (event) {
      setDocumentWidth(document.documentElement.clientWidth);
    });
    window.addEventListener('resize', function (event) {
      setDocumentWidth(document.documentElement.clientWidth);
    });

  }, []);
  return (
    <>
      <SentryProvider>
        <GAProvider>
          <MixpanelProvider>
            <AuthenticationProvider>
              <UserProvider>
                <CartProvider>
                  <div className="oziva-cart-body">
                    <div className="oziva-mob-container">
                      {/* START HEADER */}
                      {!offerVisible ? (
                        <Header
                          setOfferVisible={setOfferVisible}
                          offerVisible={offerVisible}
                        />
                      ) : (
                        <OfferHeader
                          setOfferVisible={setOfferVisible}
                          offerVisible={offerVisible}
                        />
                      )}
                      {/* END HEADER */}
                      {/* START CONTENT AREA */}
                      <main
                        className={`oziva-cart-content-area oziva-cart-web ${offerVisible ? 'd-none' : ''
                          }`}
                      >
                        {/* CART PAGE */}
                          <CartPage
                            setOfferVisible={setOfferVisible}
                            setDocumentWidth={documentWidth}
                            setShowPopup={setShowPopup}
                            setOpenPopup={setOpenPopup}
                            setIsDisplayConfeti={setIsDisplayConfeti}
                            setRedeemableCashData={setRedeemableCashData}
                          />
                      </main>
                      {/* END CONTENT AREA */}
                      {/* OFFER SECTION */}
                      {/* {
                        !checkIfSubscriptionCart() &&
                        <OfferSection
                          setOfferVisible={setOfferVisible}
                          offerVisible={offerVisible}
                          setShowPopup={setShowPopup}
                          setDocumentWidth={documentWidth}
                          showPopup={showPopup}
                          setOpenPopup={setOpenPopup}
                          openPopup={openPopup}
                          setIsDisplayConfeti={setIsDisplayConfeti}
                          isDispalyConfeti={isDispalyConfeti}
                          redeemableCashData={redeemableCashData}
                        />
                      } */}
                    </div>
                  </div>
                </CartProvider>
              </UserProvider>
            </AuthenticationProvider>
          </MixpanelProvider>
        </GAProvider>
      </SentryProvider>
    </>
  );
};
export default CartView;