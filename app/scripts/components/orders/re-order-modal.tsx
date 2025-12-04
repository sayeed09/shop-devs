import React from 'react';
import { LineItem } from '../../models/cart/orders/order-response';
import OrderModal from './Order-Modal';

interface Props {
    setReorderModal: (show: boolean) => void;
    reorderModal: boolean;
    lineItems: LineItem[];
    getOutOfStockItems: LineItem[];
    getAvailableItems: LineItem[];
    addItemsIntoCart: () => void;
}
const ReOrderModal = ({ setReorderModal, reorderModal, lineItems, getOutOfStockItems, getAvailableItems, addItemsIntoCart }: Props) => {

    return (<>
        <OrderModal setOrderModal={setReorderModal} orderModal={reorderModal} modalTitle={'REORDER'}>
            <div className='reorder-out-of-stock'>
                {getOutOfStockItems.length > 0 ? <div className='out-stock-title'>The following item is currently unavailable:</div> : null}
                {
                    getOutOfStockItems.length > 0 ? getOutOfStockItems.map((item, index) => {
                        return (
                            <div className='reorder-out-of-stock-item' key={index}>
                                <img src={item.image} alt={item.variantTitle} />
                                <div>{item.variantTitle ? item.variantTitle : item.name}</div>
                            </div>
                        )
                    }) : null
                }

                {getOutOfStockItems.length > 0 && getAvailableItems.length > 0 ? <hr /> : null}

                {getAvailableItems.length > 0 ? <div>
                    <div className='re-order-available-stock-text'>Available items will be added to your cart</div>
                    <button className='btn re-order-proceed-btn' onClick={() => addItemsIntoCart()}>PROCEED</button>
                </div> : null}
            </div>
        </OrderModal>

    </>
    );
};
export default ReOrderModal;