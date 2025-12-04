import React, { useEffect, useState } from 'react';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { ExclusiveIcon } from '../../../icons/excusive-yellow';
import '../../views/prime/prime.scss';
import PrimeBenefits from '../prime/prime-benefits';
import { OZPrimeLogo } from '../../../icons/oz-prime-logo';
import { formatPriceWithCurrency, getPrimeVariantId } from '../../utils/cart/formatter';
import { ProductResponseModal, ProductVariant } from '../../interface/product';
import { productService } from '../../services/product';
import { getENVSpecificPrimeItemId } from '../../utils/product/constants';
import { ButtonLoader } from '../../../icons/button-loader';

interface IPrimePopUp {
  setShowPopup: (value: boolean) => void;
}

const ChatlinePopUp = ({ setShowPopup }: IPrimePopUp) => {

  const [primeVariantDetails, setPrimeVariantDetails] = useState<ProductVariant>();
  const [loader, setLoader] = useState<boolean>();
  useEffect(() => {
    productService.getProductDetails(getENVSpecificPrimeItemId, 'pdp', true, false).then((productDetails: ProductResponseModal) => {
      const filteredPrimeProduct = productDetails.data.variants.filter(variants => variants.id === `${getPrimeVariantId()}`)[0];
      setPrimeVariantDetails(filteredPrimeProduct);
    });
  }, []);

  const handlePrimeBuyClick = () => {
    setLoader(true);
    const payloadObject = {
      items: [{ id: getPrimeVariantId(), quantity: 1 }],
    };
    productService.
      addItems(payloadObject).then((data) => {
        if (data) {
          window.location.href = '/cart';
        }
      }).catch((error) => {
        console.log("Error : ", error);
        setLoader(false);
      });
  }

  return (
    <>
      <div data-ml-modal id="chatline-popup" className="oz-custom-popup applied-coupon-code target-modal non-prime-popup" style={{bottom: 0}}>
        <a className="modal-overlay" href="javascript:void(0)" onClick={() => {
            setShowPopup(false);
            window.history.replaceState(null, '', ' ');
        }}></a>
        <div
          className="modal-main-container modal-main-web pos-rel"
          style={{ maxWidth: '420px', width: '100%'}}
        >
          <div
            className="modal-dialog prime-container p-0"
            style={{ maxWidth: '100%' }}
          >
            <div className="prime-modal-close-icon modal-close" onClick={() => {
              setShowPopup(false);
              window.history.replaceState(null, '', ' ');
            }}>
              <ModalCloseIcon />
            </div>
            <div
              className="prime-sections prime-customer-love-section border-0"
              style={{ maxHeight: '70vh', overflow: 'auto', marginBottom: '0', backgroundColor: 'white', padding: '16px' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <OZPrimeLogo />
                </div>
                <div style={{position: 'relative', display: 'inline-flex'}}>
                  <span className='exclusive-subtext'>EXCLUSIVE</span>
                  <ExclusiveIcon/>
                </div>
              </div>
              <section style={{ marginBottom: 16 }} className='pt-16'>
                <h4 className='heading-style-h4'>Service available exclusively for OZiva Prime members.</h4>
                <p className='paragraph-style'>
                  Buy OZiva Prime membership and get three month unlimited consultation access! 
                </p>
              </section>
              <section className='text-center' style={{ marginTop: 16 }}>
                <button
                  style={{width: '100%'}}
                  className='btn btn-primary prime-buy-more-btn'
                  onClick={() => handlePrimeBuyClick()}
                >
                  {loader ? <ButtonLoader /> : 'BUY OZIVA PRIME'}
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatlinePopUp;
