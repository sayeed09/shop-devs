import React, { useContext, useEffect } from 'react';
import { GAContext } from '../../context/gatracking';
import { ProductContext } from '../../context/product';
import '../../../scripts/scss/import/_desktop_sticky_bar.scss';
import { remainingProductsInStock } from '../../utils/common-functions';
import FooterNudge from './footer-nudge';
import { productDetailsModal } from '../../interface/product';
import { fireProductViewFloodlight } from '../../utils/tracking/yoptima';

interface IDesktopFooter {
    productId: string;
    buyNowVariant: (variantId: string) => void;
    isShowLoading: boolean;
    productDetail: productDetailsModal;
    setIsItemAdded: (value: boolean) => void;
    isItemAdded: boolean,
    setSubscribeModal: (value: boolean) => void;
};

const DesktopFooter = (props: IDesktopFooter) => {

    const { state: productState } = useContext(ProductContext);
    const gaTrackingEvent = useContext(GAContext);

    useEffect(() => {
        if (props.isItemAdded) {
            props.setSubscribeModal(false);
        }
    }, [props.isItemAdded]);

    const isProductAvailable =
        props.productDetail?.variants?.length > 0 &&
        props.productDetail?.variants.filter((item) => item.inventoryQuantity > 0)
            .length > 0;

    useEffect(() => {
        let product = productState.productDetails;
        if (product) {
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
            fireProductViewFloodlight(props.productDetail.newBenefitChips?.for ??
                "None"
            );
        }

    }, [productState.productTitle]);


    const getProductImageLink = () => {
        if (productState && productState.selectedImage) {
            return productState.selectedImage.src;
        } else if (props.productDetail && props.productDetail.images && props.productDetail.images.length > 0) {
            return props.productDetail.images[0].src;
        }
    }

    return (
        <div className='fixed-container'>
            <div className="desktopFooter">
                <div className='header'>
                    {remainingProductsInStock(props.productDetail.id) && <div className='sellingOutText'><FooterNudge productLeftCount={remainingProductsInStock(props.productDetail.id)} /></div>}
                </div>
                <div className='content'>
                    <div className='productInfo'>
                        <img src={getProductImageLink()} className='productImage' />
                        <div className='productDetails'>
                            <p className='rating'>{productState?.productReview?.averageRating} <span className='starRating'>★</span></p>
                            <div>
                                <p style={{ marginBottom: 0 }}>
                                    <span className='mrp'>MRP: </span>
                                    {productState?.productDetails?.compareAtPrice - productState?.productDetails?.price > 0 &&
                                        <span className='mrp-price'>₹{productState?.productDetails?.compareAtPrice}</span>
                                    }
                                    <span style={{ fontSize: 24 }}>
                                        <strong>₹{productState?.productDetails?.price}</strong>
                                    </span>
                                </p>
                                {productState?.productDetails?.compareAtPrice - productState?.productDetails?.price > 0 &&
                                    <p className='save' style={{ marginBottom: 0 }}>Save: ₹{productState?.productDetails?.compareAtPrice - productState?.productDetails?.price}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        if (isProductAvailable) {
                            gaTrackingEvent('atc1', {
                                product_name: props.productDetail.title,
                                product_id: props.productDetail.id.toString(),
                            });
                            props.buyNowVariant(productState.productDetails?.id);
                        }
                    }} className={`buyNowButton ${isProductAvailable ? '' : 'disabled'}`}>
                        {isProductAvailable ? 'BUY NOW' : 'OUT OF STOCK'}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DesktopFooter;
