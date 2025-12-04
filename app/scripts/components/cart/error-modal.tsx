import React from 'react';
import { ModalCloseIcon } from '../../../icons/modal-close-icon';

interface ErrorModalInt {
  errorMessage: string;
  handleOkGotItClick: () => void;
}

const ErrorModal = (props: ErrorModalInt) => {
  if (props?.errorMessage) {
    return (
      <div data-ml-modal id="applied-cash" className="open-popup">
        <a className="modal-overlay"></a>
        <div className="modal-dialog">
          <div className="modal-content center text-center error-modal-content" style={{overflow: "inherit"}}>
            <div className="modal-close" style={{top: "-50px", right: "-8px"}} onClick={() => props?.handleOkGotItClick()}>
              <ModalCloseIcon />
            </div>  
            <h4 className="error-modal-text">
              {props?.errorMessage}
            </h4>
            <div className="d-inline-flex">
              <a
                className="error-modal-button"
                onClick={() => props?.handleOkGotItClick()}
              >
                ok, got it
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
export default ErrorModal;
