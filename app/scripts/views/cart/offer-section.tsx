import React, { useContext, useEffect, useState } from 'react';
import CashLogin from './cash-login';
import CouponCode from './coupon-code';
import OfferList from './offer-list';
import { FooterWave } from '../../../icons/footer-wave';
import { CartContext } from '../../context/cart';
import {
  GetOfferResponse,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import {
  getOfferIdsInArray
} from '../../utils/cart/formatter';
import SuccessModal from '../../components/cart/successModal';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { ICodeVisibility } from '../../interface/cart';
import { setCartAvailableOffers } from '../../actions/cart';

const OfferSection = ({
  setOfferVisible,
  offerVisible,
  setShowPopup,
  setDocumentWidth,
  showPopup,
  setOpenPopup,
  openPopup,
  setIsDisplayConfeti,
  isDispalyConfeti,
  redeemableCashData,
}: any) => {
  const { state, dispatch } = useContext(CartContext);
  const [offerList, setOfferList] = useState<GetOfferResponse[]>([]);
  const [loader, setLoader] = useState(false);
  const isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const [cashApply, setCashApply] = useState(isCashApplied);
  useEffect(() => {
    if (state?.cart?.line_items?.length > 0) {
      getOfferData();
    }
  }, [state.cart]);
  useEffect(() => {
    window.addEventListener('hashchange', hashHandler, false);
    if (showPopup) {
      window.location.hash = 'offers';
    } else {
      window.history.replaceState(null, null, ' ');
    }
  }, [showPopup]);
  const hashHandler = () => {
    if (window.location.hash.indexOf('offers') == -1 && showPopup) {
      setShowPopup(false);
    } else if (window.location.hash.indexOf('offers') > -1 && !showPopup) {
      setShowPopup(true);
    }
  };
  const getOfferData = () => {
    // setLoader(true);
    const jsonVar: ICodeVisibility = {
      category: 'CART',
      productIds: getOfferIdsInArray(state.cart.line_items, 'product_id'),
      variantIds: getOfferIdsInArray(state.cart.line_items, 'variant_id'),
    };
    if (sessionStorage.getItem('campaignCode')) {
      jsonVar.prioritizedCoupon = sessionStorage.getItem('campaignCode') || ''
    }
    cartService
      .getOfferList(jsonVar)
      .then((data: any) => {
        setOfferList(data);
        dispatch(setCartAvailableOffers(data))
        setLoader(false);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  if (loader && !showPopup) {
    return (
      <div className="loader_container">
        <div className="loader_wrapper">
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {setDocumentWidth > 767 && showPopup ? (
        <div
          data-ml-modal
          id="applied-cash"
          className="oziva-offer-applied-modal-web open-popup"
        >
          <a className="modal-overlay" onClick={() => setShowPopup(false)}></a>
          <div className="modal-main-container modal-main-web pos-rel">
            <div className="modal-dialog">
              <div className="modal-close" onClick={() => setShowPopup(false)}>
                <ModalCloseIcon />
              </div>
              <div className="modal-content center text-center rmv-padding">
                <main
                  className={`oziva-cart-content-area oziva-Offers-page ${showPopup ? '' : 'd-none'
                    }`}
                >
                  <CouponCode
                    setOfferVisible={setOfferVisible}
                    setShowPopup={setShowPopup}
                    setDocumentWidth={setDocumentWidth}
                    setCashApply={cashApply}
                    setOpenPopup={setOpenPopup}
                    setIsDisplayConfeti={setIsDisplayConfeti}
                  />
                  <p className="font-medium text-off-gray text-left cash-text">
                    You can either apply OZiva Cash or Offer
                  </p>
                  <CashLogin
                    setOfferVisible={setOfferVisible}
                    setCashApply={setCashApply}
                    setShowPopup={setShowPopup}
                    cashApply={cashApply}
                    setOpenPopup={setOpenPopup}
                    setIsDisplayConfeti={setIsDisplayConfeti}
                    redeemableCashData={redeemableCashData}
                  />
                  <OfferList
                    setOfferVisible={setOfferVisible}
                    setCashApply={cashApply}
                    setShowPopup={setShowPopup}
                    setOfferList={offerList}
                    setDocumentWidth={setDocumentWidth}
                    setOpenPopup={setOpenPopup}
                    setIsDisplayConfeti={setIsDisplayConfeti}
                  />
                </main>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main
          className={`oziva-cart-content-area oziva-Offers-page ${offerVisible ? '' : 'd-none'
            }`}
        >
          <CouponCode
            setOfferVisible={setOfferVisible}
            setShowPopup={setShowPopup}
            setDocumentWidth={setDocumentWidth}
            setCashApply={cashApply}
            setOpenPopup={setOpenPopup}
            setIsDisplayConfeti={setIsDisplayConfeti}

          />
          <p className="font-medium text-off-gray text-left cash-text mb-8">
            You can either apply OZiva Cash or Offer
          </p>
          <CashLogin
            setOfferVisible={setOfferVisible}
            setCashApply={setCashApply}
            setShowPopup={setShowPopup}
            cashApply={cashApply}
            setOpenPopup={setOpenPopup}
            setIsDisplayConfeti={setIsDisplayConfeti}
            redeemableCashData={redeemableCashData}
          />
          <OfferList
            setOfferVisible={setOfferVisible}
            setShowPopup={setShowPopup}
            setOfferList={offerList}
            setCashApply={cashApply}
            setDocumentWidth={setDocumentWidth}
            setOpenPopup={setOpenPopup}
            setIsDisplayConfeti={setIsDisplayConfeti}
          />
          {offerVisible && <FooterWave />}
        </main>
      )}
      {openPopup && <SuccessModal setOpenPopup={setOpenPopup} cartData={state} />}
    </>
  );
};

export default OfferSection;