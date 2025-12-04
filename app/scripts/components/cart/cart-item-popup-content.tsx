import React, { useEffect } from 'react';
import { LineItem } from '../../models/cart/get-response';
import { ClinicalStudy } from '../productv2/title-review';
import ProductSlider from '../productv2/product-slider';
import ForWithBenefits from '../productv2/for-with-ratings';
import { INewBenefit } from '../../models/home';
import { TickIcon } from '../../../icons/tickIcon';
import GoogleReviews from '../productv2/google-reviews';
import { GoogleReviews as GoogleReviewsModel } from '../../models/product/productv2';
import useCartDetails from '../../hooks/cart';
import BadgeIcons from '../productv2/badge-icons';

interface IProps {
    selectedCartItem: {
        productId: string,
        variantId: string
    };
}

const CartItemPopupContent = ({ selectedCartItem }: IProps) => {

    const { getProductDetails, getImageList, productReview, productDetail, googleReviews, imageList } = useCartDetails();

    useEffect(() => {
        getProductDetails(selectedCartItem);
    }, []);

    useEffect(() => {
        if (productDetail) {
            getImageList(selectedCartItem)
        }
    }, [productDetail]);

    return (
        <>
            {
                productDetail && <>
                    <div className='popup-product-title pl-16'>
                        {productDetail.title}
                    </div>

                    {productReview && <div className='title-review-mobile-sec '>
                        <ForWithBenefits newBenefitChips={productDetail.newBenefitChips as INewBenefit} reviewsRating={productReview} />
                    </div>}
                    <div className='oziva-pdp-content-area'>
                        <div className='col product-slider mb-16 p-8' style={{ minHeight: '300px' }}>
                            <ClinicalStudy clinicalStudies={productDetail.clinicalStudies} />
                            <ProductSlider sellingFastAndTimerNudge={false} imageList={imageList} noFullScreenIcon={true} />
                        </div>
                    </div>
                    {productDetail.benefits && productDetail.benefits.length > 0 ? <div className='popup-benefit-chips'>
                        {
                            productDetail.benefits.map(chips => <p><span className='mr-2'>
                                <TickIcon />
                            </span>{chips}</p>)
                        }
                    </div> : null}
                    {googleReviews && <GoogleReviews googleReview={googleReviews.googleReview ? googleReviews.googleReview as GoogleReviewsModel : googleReviews} header={googleReviews.header ? googleReviews.header as string : '<p><strong>Google</strong>&nbsp;Reviews</p>'} />}
                    <BadgeIcons v1 />
                </>
            }
        </>
    )
}

export default CartItemPopupContent;