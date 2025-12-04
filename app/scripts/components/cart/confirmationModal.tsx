import React from 'react';

const ConfirmationModal = (props: any) => {
  return (
    <div
      data-ml-modal
      id="applied-cash"
      className="confirm-applied-modal open-popup target-modal"
    >
      <a
        className="modal-overlay"
        onClick={() => props.setConfirmPopup(false)}
      ></a>
      <div className="modal-main-container">
        <div className="modal-dialog">
          <div
            className="close-btn-modal"
            onClick={() => props.setConfirmPopup(false)}
          >
            X
          </div>
          <div className="modal-content-confirm center text-center">
            <div className="confirmation-modal">
              <div className="confirmation-box">
                <div className="confirm-image">
                  <img
                    className="confirm-image-box"
                    id="delete-product-image"
                    alt=""
                    src={props.cartData[0].image}
                  />
                </div>
                <div className="confirm-text">
                  <h2 className="text-left">Remove Product from Cart</h2>
                  <p className="confirm-info text-left">
                    This will empty your cart! Do you still want to remove?
                  </p>
                </div>
              </div>
              <div className="confirmation-footer">
                <div>
                  <button onClick={() => props.setConfirmPopup(false)}>
                    NO, KEEP IT
                  </button>
                </div>
                <div>
                  <button onClick={() => props.updateQuantity(0)}>YES</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
