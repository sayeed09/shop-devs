import React, { } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { LineItem } from '../../models/cart/get-response';
import { remainingProductsInStock } from '../../utils/common-functions';
import AddToCartButton from '../productCardV1/addToCartButton';
import CartConsultationContent from '../cart/cart-consultation-content';
import CartItemPopupContent from '../cart/cart-item-popup-content';
import { Product } from '../../models/home';
import { IProduct } from '../../interface/search-product-list';
interface IProps {
    setSelectedCartItem: (selectedCartItem: {
        productId: string,
        variantId: string
    } | undefined) => void;
    selectedCartItem: LineItem | any;
    popupHeader: string;
    isConsultation: boolean;
    item: IProduct;
    setShowSnakbar: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartItemPopup = ({ setSelectedCartItem, popupHeader, selectedCartItem, isConsultation,
    item, setShowSnakbar }: IProps) => {
    return (
        <>
            <div className="modal-with-head footer-icon-popup target-modal" data-ml-modal="true">
                <a className="modal-overlay"></a>
                <div className="modal-dialog" style={isConsultation ? { 'height': 'auto' } : {}}>
                    <span
                        className="close-modal cursor-pointer"
                        onClick={() => {
                            setSelectedCartItem(undefined);
                        }}
                    >
                        <ProductModalCloseIcon />
                    </span>
                    <div className='modal-content center'>
                        <div className='modal-head text-left'>{popupHeader}</div>
                        <div className='modal-body oziva-pdp-content-area oziva-pdp-web protein-fest-popup-area'>
                            {!isConsultation ? <CartItemPopupContent selectedCartItem={selectedCartItem} /> :
                                <CartConsultationContent />}
                            <div className='uds-559-proceed-to-checkout-btn'>
                                {!isConsultation && <div className='uds-559-popup-nudge'>
                                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Timer.svg?v=1728993233" alt="PDP footer nudge icon" />Selling out fast! Less than {remainingProductsInStock(selectedCartItem.product_id)} left
                                </div>}
                                <AddToCartButton setShowSnakbar={setShowSnakbar} item={item} isSearchPage={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default React.memo(CartItemPopup);
