import React from "react";
import ForWithRatings from "./for-with-ratings";
import { INewBenefit } from "../../models/home";
import { IClinicalStudy, IProductReviewObject } from "../../interface/product";

interface Props {
    title: string;
    newBenefitChips: INewBenefit;
    reviewsRating: IProductReviewObject;
    productId: string;
    expTitle: string;
}

interface clinicalStudyProps {
    clinicalStudies: IClinicalStudy;
}

export const TitleAndReview = ({ productId, title, newBenefitChips, reviewsRating, expTitle }: Props) => (<>

    <div className="title-review-mobile-sec hide-on-web">
        <h1 className={'product-title product-title-control'}>
            {title}
        </h1>
        <h1 className={'product-title product-title-exp'}>
            {expTitle}
        </h1>
        {title ? <div className="product-title-subtext">{title.split('-').splice(1)}</div> : null}
        <ForWithRatings reviewsRating={reviewsRating} newBenefitChips={newBenefitChips} productId={productId} isExp={true}/>
    </div>
</>
);


export const ClinicalStudy = ({ clinicalStudies }: clinicalStudyProps) => (
    <>
        {clinicalStudies?.data?.filter((item) => item.deviceType == "MOBILE").length > 0 &&
            <img className='clinical-study hide-on-web' src={clinicalStudies.data.filter((item) => item.deviceType == "MOBILE")[0].image} />}

        {clinicalStudies?.data?.filter((item) => item.deviceType == "DESKTOP").length > 0 &&
            <img className='clinical-study hide-on-mobile' src={clinicalStudies.data.filter((item) => item.deviceType == "DESKTOP")[0].image} />}
    </>
)

