import React, { useState } from 'react';
import { Package } from '../../models/cart/orders/order-response';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';

interface Props {
  orderModal: any;
  setOrderModal: (show: boolean) => void;
  children: React.ReactNode;
  modalTitle: string;
  packageItem?: any;
  setTrackNowAWB?: (value: any) => void;
}
const OrderModal = ({children, setOrderModal, orderModal, modalTitle, packageItem, setTrackNowAWB }: Props) => {

  return (<>
    {
      orderModal && (
        <div
          data-ml-modal
          id="authentic"
          className="modal-with-head footer-icon-popup target-modal"
        >
          <a
            className="modal-overlay"
            onClick={() => {
            }}
          ></a>
          <div className="modal-dialog position-relative">
            <a
              className="close-modal cursor-pointer"
              onClick={() => {
                setOrderModal(false);
                if(setTrackNowAWB) setTrackNowAWB(null);
              }}
            >
              <ProductModalCloseIcon />
            </a>
            <div className="modal-content center">
              <h3 className="modal-head text-left">
                <div>{modalTitle}</div>
                {packageItem && packageItem.aggregator && <div className='f-14 mt-8'>Tracking: <span className='text-off-gray'>{packageItem.aggregator}</span> ({packageItem.awb}) </div>}
              </h3>
              <div className="modal-content-inner text-left">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
  </>
  );
};
export default OrderModal;