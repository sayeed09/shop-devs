import React from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import '../../scss/oziva-site.scss';

interface NotificationModalInterface {
  showMessageModal: boolean
  setShowMessageModal: (value: boolean) => void;
  handleReset: () => void;
  submitQuery: () => void;
}
const NotificationModal = (props: NotificationModalInterface) => {

  return (
    <div
      data-ml-modal
      id="applied-coupon-code"
      className="applied-coupon-code target-modal"
    >
      <div
        className="modal-overlay"
        onClick={e => props.setShowMessageModal(false)}
      ></div>

      <div className="modal-dialog position-relative">
        <span
          className="close-modal cursor-pointer"
          onClick={e => props.setShowMessageModal(false)}
        >
          <ProductModalCloseIcon />
        </span>
        <div className="modal-content text-center center">
          <div className='pb-16'>
            <h4 className='text-off-gray font-normal f-16 mb-16'>We see you have already submitted a query with us. We suggest you allow us 24 hours to get back to you.</h4>
            <p className='f-14 text-gray'>Do you still want to submit a new ticket ?</p>
          </div>
          <div className="topic-btn-group">
            <input
              type="button"
              value='YES'
              className="topic-btn topic-btn-reset"
              onClick={() => { props.submitQuery(); props.setShowMessageModal(false) }}
            />
            <input type="button"
              value='NO'
              onClick={() => { props.handleReset(); props.setShowMessageModal(false) }}
              className="topic-btn topic-btn-submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationModal;
