import React from "react";
import { ErrorIcon } from "../../../icons/error-icon";
import { ModalCloseIcon } from "../../../icons/modal-close-icon";

interface Props {
    message: JSX.Element;
    hideCancel?: boolean;
    handleOk: () => void;
}

const ErrorModal = (props: Props) => {
    const { message, hideCancel, handleOk } = props;
    return <>
        <div className='oziva-cart-body'>
            <div
                data-ml-modal
                id="applied-cash"
                className="oziva-offer-applied-modal error-modal open-popup"
            >
                <a className="modal-overlay"></a>
                <div className="modal-dialog">
                    <div
                        className="modal-content center text-center"
                        style={{ overflow: 'inherit' }}
                    >
                        {!hideCancel &&
                            <div
                                className="modal-close"
                                style={{ top: '-50px', right: '-10px', zIndex: '1111111' }}
                            >
                                <ModalCloseIcon />
                            </div>}
                        <div className="mb-16">
                            <ErrorIcon />
                        </div>
                        <h2>Opps!</h2>
                        <p className="text-off-gray f-12">
                            {message}
                        </p>
                        <a
                            href="javascript:void(0)"
                            onClick={handleOk}
                            className="btn btn-primary btn-block mt-8"
                        >
                            OKAY!
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default ErrorModal;