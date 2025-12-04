import React, { useState } from 'react';
import { EasyReturnsFooterIcon } from '../../../icons/easy-returns-footer';
import { SecureIcon } from '../../../icons/secure-icon';
import { DeliveryTruckFooterIcon } from '../../../icons/delivery-truck-footer';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { hideScroll, initialScroll } from '../../utils/product/formatter';
import { CashOnDelivery } from '../../../icons/cash-on-delivery';

const FooterIcons = () => {
  const [authenticModal, setAuthenticModal] = useState(false);
  const [easyReturnsModal, setEasyReturnsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [shippingModal, setShippingModal] = useState(false);
  return (
    <div className="footer-icons">
      <div className="footer-icons-col">
        <a
          href="#FreeShipping"
          className="d-block"
          onClick={() => {
            setShippingModal(!shippingModal), hideScroll();
          }}
        >
          <div className="footer-icon-svg">
            <DeliveryTruckFooterIcon />
          </div>
          <div className="mt-8 f-m-12">
            Free
            <div>Shipping</div>
          </div>
        </a>
        {shippingModal && (
          <div
            data-ml-modal
            id="FreeShipping"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setShippingModal(!shippingModal), initialScroll();
              }}
            ></a>
            <div className="modal-dialog position-relative">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setShippingModal(!shippingModal), initialScroll();
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
                <h3 className="modal-head text-left">Free Shipping</h3>
                <div className="modal-content-inner text-left">
                  <p>We offer FREE Shipping on all prepaid orders and COD order</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer-icons-col">
        <a
          href="#SecurePayments"
          className="d-block"
          onClick={() => {
            setPaymentModal(!paymentModal), hideScroll();
          }}
        >
          <div className="footer-icon-svg">
            <SecureIcon />
          </div>
          <div className="mt-8 f-m-12">Secure
            <div>Payments</div>
          </div>
        </a>
        {paymentModal && (
          <div
            data-ml-modal
            id="SecurePayments"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setPaymentModal(!paymentModal), initialScroll();
              }}
            ></a>
            <div className="modal-dialog position-relative">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setPaymentModal(!paymentModal), initialScroll();
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
                <h3 className="modal-head text-left">Secure Payments</h3>
                <div className="modal-content-inner text-left">
                  <p>
                    Complete your payments in a simple, easy and secure way on the OZiva website. We protect all data shared, no matter the method.
                  </p>
                  <p>100% Secure | 100% Easy </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer-icons-col">
        <a
          href="#EasyReturns"
          className="d-block"
          onClick={() => {
            setEasyReturnsModal(!easyReturnsModal), hideScroll();
          }}
        >
          <div className="footer-icon-svg">
            <EasyReturnsFooterIcon />
          </div>
          <div className="mt-8 f-m-12">Easy
            <div>Returns</div>
          </div>
        </a>
        {easyReturnsModal && (
          <div
            data-ml-modal
            id="EasyReturns"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setEasyReturnsModal(!easyReturnsModal), initialScroll();
              }}
            ></a>
            <div className="modal-dialog position-relative">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setEasyReturnsModal(!easyReturnsModal), initialScroll();
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
                <h3 className="modal-head text-left">Easy Returns</h3>
                <div className="modal-content-inner text-left">
                  <p>
                    If we receive a cancellation notice and the order has not
                    been processed / approved by us, we shall cancel the order
                    and refund the entire amount to User within 14 working days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FooterIcons;
