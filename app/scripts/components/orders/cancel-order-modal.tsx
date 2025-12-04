import React, { useState } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { ButtonLoader } from '../../../icons/button-loader';
import { Order } from '../../models/cart/orders/order-response';

interface Props {
    showCancelPopup: boolean;
    setShowCancelPopup: (show: boolean) => void;
    cancelOrderLoading: boolean;
    showCancelOrderSnackbar: boolean;
    cancelOrder: (order: string, reason: string, comments?: string) => void;
    selectedOrder: Order;
}

enum CancellationReason {
    CHANGE_ADDRESS = 'Change in address',
    DELAYED_DELIVERY = 'Delayed delivery',
    OFFER_NOT_APPLIED = 'Offer not applied',
    ORDERED_BY_MISTAKE = 'Ordered by mistake',
    ORDERED_FROM_ANOTHER_WEBSITE = 'Ordered from another website',
    WRONG_PRODUCT_ORDERED = 'Wrong product ordered',
    OTHERS = 'Others [Please mention the reason]',
}

const CancelOrderModal = (props: Props) => {
    const [cancelReason, setCancelReason] = useState('');
    const [showTextarea, setShowTextarea] = useState(false);
    const [showCancelOrderButton, setShowCancelOrderButton] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const { setShowCancelPopup, showCancelPopup, showCancelOrderSnackbar, cancelOrder, selectedOrder } = props;
    const handleRadioClick = (e) => {
        const key = e.target.id;
        setCancelReason(key);
        setShowTextarea(CancellationReason[key] === CancellationReason.OTHERS);
        setShowCancelOrderButton(true);
    };
    const handleTextareaOnChange = (e) => {
        setTextareaValue(e.target.value);
    }
    return (<>
        {showCancelPopup && <>
            <div
                data-ml-modal
                id="cancel-order-modal"
                className="modal-with-head footer-icon-popup target-modal"
            >
                <a
                    className="modal-overlay"
                ></a>
                <div className="modal-dialog position-relative cancel-order-popup">
                    <a
                        className="close-modal cursor-pointer"
                        onClick={() => {
                            setShowCancelPopup(!showCancelPopup);
                        }}
                    >
                        <ProductModalCloseIcon />
                    </a>
                    <div className="modal-content center">
                        {!showCancelOrderSnackbar ?
                            <>
                                <h3 className="modal-head text-left">
                                    Reason for Cancellation
                                </h3>
                                <div className="modal-content-inner text-left oziva-body">
                                    <>
                                        {Object.entries(CancellationReason).map(
                                            ([key, value]) => {
                                                return (
                                                    <div className="sub-topic-list radio-button-container" key={key}>
                                                        <input
                                                            type="radio"
                                                            id={key}
                                                            name="sub-topic-list"
                                                            value={value}
                                                            className='oz-radio'
                                                            checked={cancelReason === key}
                                                            onClick={handleRadioClick}
                                                        />
                                                        <label className='radio-button-label' htmlFor={key}>{value}</label>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </>
                                </div>
                                <div className='separation-container'>
                                    {showTextarea && (
                                        <hr className='my-16 my-m-8' />
                                    )}
                                </div>
                                <div className="modal-content-inner text-left">
                                    {showTextarea && (
                                        <div className="textarea-container">
                                            <textarea
                                                id="otherReason"
                                                placeholder="Tell us more"
                                                className='custom-textarea'
                                                onChange={handleTextareaOnChange}
                                                maxLength={200}
                                            />
                                            <div style={{ color: 'inherit' }}>
                                                {200 - textareaValue.trim().length} characters left
                                            </div>
                                        </div>
                                    )}
                                    {showCancelOrderButton && (
                                        <div className='cancel-button-container model row order-placed-body flex-center mt-16'>
                                            <div className="col track-btn-group text-right">
                                                <div
                                                    onClick={() => CancellationReason[cancelReason] === CancellationReason.OTHERS && textareaValue.trim().length ==0 ? {} : cancelOrder(selectedOrder?.orderNumber as string, cancelReason, textareaValue)}
                                                    className={`btn btn-outline-secondary`}
                                                    style={CancellationReason[cancelReason] === CancellationReason.OTHERS && textareaValue.trim().length == 0 ? { opacity: 0.5 } : {}}
                                                >
                                                    <span>CANCEL ORDER</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                            : <>
                                <h3 className='modal-head text-left d-flex' style={{ alignItems: 'center' }}>
                                    <div className='pr-8'>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            {...props}
                                        >
                                            <path
                                                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                                fill="#6BBD58"
                                            />
                                            <path
                                                d="M8.4994 18.3828L3.2002 13.082L4.34579 11.9364L8.5058 16.0964L18.1906 6.40039L19.3362 7.54599L8.4994 18.3828Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    Cancellation is in progress. You will receive a message when the status changes.
                                </h3>
                                <div className='modal-content-inner text-left'>
                                    <p className="mb-16">Please feel free to reach out to us on <a href='mailto:community@oziva.in' className='text-primaryGreen'>community@oziva.in</a> for your queries.</p>
                                    <a href='javascript:void(0);' className='btn btn-block btn-loader btn-secondary text-uppercase' onClick={() => setShowCancelPopup(false)}>
                                        OKAY, GOT IT
                                    </a>
                                </div>
                            </>}

                    </div>
                </div>
            </div>

        </>

        }
    </>
    );
};
export default CancelOrderModal;
