import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product';
import { GAContext } from '../../context/gatracking';
import { productDetailsModal } from '../../interface/product';
import { redirectUrl } from '../../utils/endpoints';
import { remainingProductsInStock } from '../../utils/common-functions';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { StarFilled } from '../../../icons/star-filled';
import FooterNudge from './footer-nudge';
import { fireProductViewFloodlight } from '../../utils/tracking/yoptima';

interface MobileFooterModal {
    productId: string;
    buyNowVariant: (variantId: string) => void;
    isShowLoading: boolean;
    productDetail: productDetailsModal;
    isUpsellAvailable?: boolean;
    setIsItemAdded: (value: boolean) => void;
    isItemAdded: boolean;
    setSubscribeModal: (value) => void;
}

const MobileFooter = (props: MobileFooterModal) => {
    const { state: productState } = useContext(ProductContext);
    const gaTrackingEvent = useContext(GAContext);
    const [productLeftCount, setProductLeftCount] = useState(0);

    useEffect(() => {
        let product = productState.productDetails;
        if (productState.productDetails) {

            gaTrackingEvent('view_item', {
                currency: 'INR',
                value: product.price,
                items: [
                    {
                        item_id: props.productId,
                        item_name: props.productDetail.title,
                        discount: product.compareAtPrice - product.price,
                        index: 0,
                        item_brand: 'OZiva',
                        item_variant: product?.title,
                        price: product.compareAtPrice,
                        quantity: 1,
                    },
                ],
            });
            fireProductViewFloodlight(props.productDetail.newBenefitChips?.for ?? "None");
        }
        setProductLeftCount(remainingProductsInStock(props.productId));

    }, [productState.productTitle]);

    const isVariantAvailable =
        props.productDetail?.variants.filter((item) => item.inventoryQuantity > 0)
            .length > 0;

    if (props.isItemAdded) {
        props.setSubscribeModal(false);
    }

    const getProductImageLink = () => {
        if (productState && productState.selectedImage) {
            return productState.selectedImage.src;
        } else if (props.productDetail && props.productDetail.images && props.productDetail.images.length > 0) {
            return props.productDetail.images[0].src;
        }
    }

    return (
        <>
            <div className="oziva-mob-footer-1">
                {isVariantAvailable && productLeftCount && <div className='footer-msg'><FooterNudge productLeftCount={productLeftCount} /></div>}
                {isVariantAvailable ? (
                    <>
                        <div className='footer-container'>
                            <div className="image-container">
                                <img src={getProductImageLink()} />
                                <div className="product-ratings">
                                    <div className='ratings-number'>{productState && productState.productReview && productState.productReview?.averageRating}</div>
                                    <StarFilled />
                                </div>
                            </div>

                            <button className='pdp-v2-cta-btn' onClick={() => {
                                gaTrackingEvent('atc1', {
                                    product_name: props.productDetail?.title,
                                    product_id: productState?.productDetails?.id.toString(),
                                });
                                props.buyNowVariant(productState.productDetails?.id);
                            }}>
                                <div className='buy-now-button'>
                                    <div className='mrp-information'>
                                        <div className='pricing'>
                                            <span className='mrp-text'>MRP:</span> {productState.productDetails?.compareAtPrice - productState.productDetails?.price > 0 && <s className='mrp-price'>{formatPriceWithCurrency(productState.productDetails?.compareAtPrice)}</s>}<span className='selling-price'>{formatPriceWithCurrency(productState.productDetails?.price)}</span>
                                        </div>
                                        {productState.productDetails?.compareAtPrice - productState.productDetails?.price > 0 ? <div className='vertical-line'></div> : null}
                                        {productState.productDetails?.compareAtPrice -
                                            productState.productDetails?.price >
                                            0 && <div className='save-text'>Save: {formatPriceWithCurrency(productState.productDetails?.compareAtPrice -
                                                productState.productDetails?.price)}</div>}
                                    </div>
                                    <div className='buy-now-text'>
                                        BUY NOW
                                    </div>
                                </div>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="out-of-stock-btn-mob" style={{ background: 'white' }}>
                        <div className="oziva-mob-footer-dtl">
                            <span>Out of Stock</span>
                            <a
                                href={
                                    props.isUpsellAvailable
                                        ? `${redirectUrl}`
                                        : `${redirectUrl}collections/frontpage`
                                }
                            >
                                CONTINUE SHOPPING
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default MobileFooter;

