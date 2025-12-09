import React, { Suspense, useEffect, useState } from "react";
import { GoogleReviews } from "../../../models/product/productv2";
import { SectionHeader } from "../common";
import ReviewsRating from "./ratings-review";
import List from "./list.client";




interface Props {
    googleReview: GoogleReviews;
    header?: string;
    customeClassName?: string;
}

const GoogleReviews = ({ googleReview, header, customeClassName }: Props) => {
    if (!googleReview) return null
    return <section className={`goolge-review-sec ${customeClassName}`} id="goolge-review-sec-uds-649">
        <SectionHeader title={header ? header : ""} subTitle={googleReview.subTitle} />
        <ReviewsRating ratings={googleReview.ratings} totalReviews={googleReview.totalReviews} />
        <Suspense>
            <List reviews={googleReview.reviews} />
        </Suspense>


    </section >
}
export default GoogleReviews;