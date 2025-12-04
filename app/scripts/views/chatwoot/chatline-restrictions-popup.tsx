import React from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';

interface ModalProps {
    setModalVisibility: (isVisible: boolean) => void;
  }

const ChatlineRestrictionAccess = ({ setModalVisibility }: ModalProps) => {
    return (
        <div
            data-ml-modal
            id="applied-coupon-code"
            className={`modal-with-head footer-icon-popup target-modal`}
        >
            <div
                className="modal-overlay"
                onClick={() => {
                    setModalVisibility(false);
                }}
            ></div>

            <div className="modal-dialog position-relative">
                <span
                    className="close-modal cursor-pointer"
                    onClick={() => {
                        setModalVisibility(false);
                    }}
                >
                    <ProductModalCloseIcon />
                </span>
                <div className={`modal-content center`}>
                    <div className='chatline-restriction-content'>
                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/no_chat_access.svg?v=1743758048" alt="Chatline Icon" />
                        <div className='chatline-restriction-text'>
                            <p className='primary-text'>Unlock 1 Month of Free Chat Access! 🚀</p>
                            <p className='secondary-text'>Purchase now and enjoy seamless conversations for free for a month!</p>
                        </div>
                        <div className='shop-now-btn' onClick={() => {
                            window.location.href = '/collections/frontpage?collection=best-sellers';
                        }}>SHOP NOW</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatlineRestrictionAccess;