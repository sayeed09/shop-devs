import React, { useState } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';

interface ModalProps {
  setModalVisibility?: (isVisible: boolean) => void;
  children: JSX.Element;
  contentClassName?: string;
  modalClassName?: string;
}
const Modal = ({ children, setModalVisibility, contentClassName, modalClassName }: ModalProps) => (
  <div
    data-ml-modal
    id="applied-coupon-code"
    className={`modal-with-head footer-icon-popup target-modal ${modalClassName}`}
  >
    <div
      className="modal-overlay"
      onClick={() => {
        setModalVisibility && setModalVisibility(false);
      }}
    ></div>

    <div className="modal-dialog position-relative">
        <span
          className="close-modal cursor-pointer"
          onClick={() => {
            setModalVisibility && setModalVisibility(false);
          }}
        >
          <ProductModalCloseIcon />
        </span>
      <div className={`modal-content center ${contentClassName}`}>{children}</div>
    </div>
  </div>
);
export default Modal;
