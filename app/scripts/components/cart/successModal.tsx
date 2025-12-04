import React, { useContext } from 'react';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { OfferAppliedTickIcon } from '../../../icons/offer-applied-tick';
import { formatPrice } from '../../utils/cart/price-formatter';
import { CartContext } from '../../context/cart';


const SuccessModal = (props: any) => {

  const { state } = useContext(CartContext);
  const priceModel = formatPrice(state);

  const getDiscountedValue = () => {
    const couponCode = props.cartData.discountAndCashResponse.discount_code;
    const totalDiscount = props.cartData.discountAndCashResponse.total_discount / 100;

    return couponCode && couponCode.includes('_freebies') ? couponCode.split('|').length > 1 ? totalDiscount - priceModel?.freebiesDiscount : totalDiscount : totalDiscount;

  };

  return (
    <div
      data-ml-modal
      id="applied-cash"
      className="oziva-offer-applied-modal open-popup"
      style={{ bottom: 0 }}
    >
      <a className="modal-overlay"></a>
      <div className="modal-dialog" style={{ maxWidth: 422 }}>
        <div className="d-m-block offer-applied-gif" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/2393/2199/files/offer-applied.gif)' }}></div>
        <div className="modal-content center text-center" style={{ overflow: 'inherit' }}>
          <div className="modal-close" style={{ top: '-50px', right: '-10px', zIndex: '1111111' }} onClick={() => {
            props.setOpenPopup(false);
            sessionStorage.removeItem('showConfetti');
          }}>
            <ModalCloseIcon />
          </div>
          <div className="pb-16">
            <OfferAppliedTickIcon />
          </div>
          {props.cartData.cashApplied ? (
            <p className='text-secondaryDeepGreen mt-16'>
              &apos;OZiva Cash&apos; Applied
              You got ₹
              {getDiscountedValue()} off
            </p>
          ) : (
            <div>
              <p className='mb-16 f-14'>
                Yay! Coupon code has been applied successfully.
              </p>
              {props.cartData.discountAndCashResponse.total_discount > 0 && (
                <p className='text-secondaryDeepGreen f-14'>
                  You got ₹
                  {getDiscountedValue()}{' '}
                  off
                </p>
              )}
            </div>
          )}
          <a
            href="javascript:void(0)"
            onClick={() => {
              props.setOpenPopup(false);
              sessionStorage.removeItem('showConfetti');
            }}
            className="btn btn-primary btn-block mt-8"
          >
            OKAY!
          </a>
        </div>
      </div>
    </div>
  );
};
export default SuccessModal;
