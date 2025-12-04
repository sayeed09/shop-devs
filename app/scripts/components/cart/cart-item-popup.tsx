import React, { useContext, useEffect, useState } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { LineItem } from '../../models/cart/get-response';
import CartItemPopupContent from './cart-item-popup-content';
import CartConsultationContent from './cart-consultation-content';
import { CartContext } from '../../context/cart';
import { setProceedToCheckout } from '../../actions/cart';
import { remainingProductsInStock } from '../../utils/common-functions';
import CartConsultationContentV1 from './cart-consultation-content-v1';
interface IProps {
  setSelectedCartItem: (selectedCartItem: {
    productId: string,
    variantId: string
  } | undefined) => void;
  selectedCartItem: LineItem | any;
  popupHeader: string;
  isConsultation: boolean;
}
const CartItemPopup = ({ setSelectedCartItem, popupHeader, selectedCartItem, isConsultation }: IProps) => {
  const { dispatch: cartDispatch } = useContext(CartContext);
  const [isExpRendered, setIsExpRendered] = useState(false); // UDS-674

  useEffect(() => {
    setIsExpRendered((window as any).UDS674V2 ? true : false);
    window.addEventListener('UDS674EventV2', function () {
      setIsExpRendered(true);
    })
  }, []);

  return (
    <>
      <div className="modal-with-head footer-icon-popup target-modal" data-ml-modal="true">
        <a className="modal-overlay"></a>
        <div className="modal-dialog" style={isConsultation ? { 'height': 'auto' } : {}}>
          <span
            className="close-modal cursor-pointer"
            onClick={() => {
              setSelectedCartItem(undefined);
              cartDispatch(setProceedToCheckout(false));
            }}
          >
            <ProductModalCloseIcon />
          </span>
          <div className='modal-content center'>
            <div className='modal-head text-left'>{popupHeader}</div>
            <div className='modal-body oziva-pdp-content-area oziva-pdp-web'>
              {!isConsultation ? <CartItemPopupContent selectedCartItem={selectedCartItem} /> :
                isExpRendered ? <CartConsultationContentV1 /> : <CartConsultationContent />}
              <div className='uds-559-proceed-to-checkout-btn'>
                {!isConsultation && <div className='uds-559-popup-nudge'>
                  <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Timer.svg?v=1728993233" alt="PDP footer nudge icon" />Selling out fast! Less than {remainingProductsInStock(selectedCartItem.product_id)} left
                </div>}
                <button className='btn btn-primary btn-block' onClick={() => {
                  cartDispatch(setProceedToCheckout(true));
                }}>PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(CartItemPopup);
