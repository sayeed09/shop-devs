import React, { useContext } from 'react'
import { communicationLineItemMRP, communicationLineItemPDP } from '../../utils/product/constants'
import { formatPriceWithCurrency } from '../../utils/cart/formatter'
import { ProductContext } from '../../context/product';
import { isMobile } from '../../utils/helper';
import { productDetailsModal } from '../../interface/product';

interface IProps {
  productDetail: productDetailsModal;
}

const ValueCommunication = ({ productDetail }: IProps) => {
    const { state: productState } = useContext(ProductContext);
    const selectedVariant = productState.productDetails;
    const images = productState.selectedImage;
    const characterLimit = isMobile() ? 24 : 34;

    const getTitle = selectedVariant?.title ? selectedVariant?.title?.length > 26 ? `${selectedVariant?.title?.substring(0, characterLimit)}...` : selectedVariant?.title : productState?.productTitle ? productState?.productTitle?.length > 26 ? `${productState?.productTitle?.substring(0, characterLimit)}...` : productState?.productTitle : null;

    return (
        <div>
            {selectedVariant ? <div className='value-communication-container'>
                <div className='value-communication-heading'>Your order includes FREE Consultation + Diet Plan!</div>
                <div className='value-communication-items dynamic-variant-item'>
                    <div className='item-image-title'>
                        <img src={images?.src ? images?.src : productDetail.images[0].src} alt="Variant Image" className='item-variant-image' />
                        <div>
                            <div className='item-title'>{getTitle}</div>
                            <div className='item-sub-title'>{selectedVariant.subHeader}</div>
                        </div>
                    </div>
                    <div className='item-pricing' style={selectedVariant.compareAtPrice - selectedVariant.price <= 0 ? {display: 'flex'} : {}}>
                        <div className='item-mrp'>MRP: {selectedVariant.compareAtPrice - selectedVariant.price > 0 && <s>{formatPriceWithCurrency(selectedVariant.compareAtPrice)}</s>}</div>
                        <div className='item-price'>{formatPriceWithCurrency(selectedVariant.price)}</div>
                    </div>
                </div>
                <div className='value-communication-free-items'>
                    {
                        communicationLineItemPDP.map((item, index) => {
                            return (
                                <div className='value-communication-items' key={index}>
                                    <div className='item-image-title'>
                                        <img src={item.image} alt={item.title} className='item-variant-image' />
                                        <div className='item-title'>{item.title}</div>
                                        <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/V1-_Gift.svg?v=1741246553'} alt={'Gift gif'} className='item-gift-gif' />
                                    </div>
                                    <div className='item-pricing'>
                                        <div className='item-mrp'>MRP: <s>{formatPriceWithCurrency(item.mrp)}</s></div>
                                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/FREE.gif?v=1741248344" alt="Free gift" className='item-free-gift-gif' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='pay-only-box'>
                    <div className='pay-only-text'>You pay only</div>
                    <div>
                        <s className='pay-only-mrp'>{formatPriceWithCurrency(communicationLineItemMRP + selectedVariant.compareAtPrice)}</s>
                        <span className='pay-only-price'>{formatPriceWithCurrency(selectedVariant.price)}</span>
                    </div>
                    
                </div>
            </div> : null}
        </div>
    )
}

export default ValueCommunication;