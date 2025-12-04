import React, { useEffect, useState } from "react";
import { INewBenefit } from "../../models/home";
import { IProductReviewObject } from "../../interface/product";
import { productBenefitsMap } from "../../utils/product/constants";


interface props {
    newBenefitChips?: INewBenefit;
    reviewsRating: IProductReviewObject;
    className?: string;
    productId?: string;
    isExp?: boolean;
}
const ForWithRatings = ({ productId, newBenefitChips, reviewsRating, className = "", isExp }: props) => {

    // UDS-676-Start
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    // UDS-676-End

    return (
        <>
            <div className={`for-with-rating-sec ${className}`}>
                {newBenefitChips?.for && newBenefitChips?.with ?
                    <div className='for-with-sec'>
                        <div className='item'>
                            <span className='title'>FOR</span>
                            <span className='desc'>{newBenefitChips?.for}</span>
                        </div>
                        <div className='item'>
                            <span className='title'>WITH</span>
                            <span className='desc'>{newBenefitChips?.with}</span>
                        </div>
                    </div> : null
                }
                {reviewsRating ?
                    <div className='rating-sec'>
                        <span>{reviewsRating.averageRating}</span>
                        <span className='user-rating'>
                            <div className="rating-icon rating-filled-icon" />
                        </span>
                        <span className="divider" />
                        <span>{reviewsRating.numberOfReviews} Reviews</span>
                    </div> : null}
            </div>

            {/* UDS-676-Start */}
            {isExp ? <div className="for-with-rating-sec-experiment">
                {productId ? <div className={`box ${animate ? 'animate' : ''}`}>
                    {productBenefitsMap[productId]?.text}&nbsp;<span className="months">{productBenefitsMap[productId]?.month}</span><img src={productBenefitsMap[productId]?.img} alt="Icons" className="icon-image"/>
                </div> : null}
                <div className="rating-sec">
                    <div className="avarage-rating">
                        {reviewsRating?.averageRating} <img src="https://cdn.shopify.com/s/files/1/0366/1004/8044/files/filled_star.svg?v=1724055254" alt="Star Rating" className="star-image"/>
                    </div>

                    <div className="rating-pipe"></div>

                    <div className="number-of-rating">
                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/checked_e185afb2-708d-468f-bf51-21d569f2a972.svg?v=1744095951" alt="Review Tick" /> {reviewsRating?.numberOfReviews} Reviews
                    </div>
                </div>
            </div> : null}
            {/* UDS-676-End */}
        </>

    );
}
export default ForWithRatings;