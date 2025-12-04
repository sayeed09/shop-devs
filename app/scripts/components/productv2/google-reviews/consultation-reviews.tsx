import React from "react";
import { ConsultationReview, Review } from "../../../models/product/productv2";
import Flickity from "react-flickity-component";
import { GoogleReviewflickityOptions } from "../../../utils/productv2/provider";
import { generateRatedStar } from "./ratings-review";
import { consultationReview } from "../../../utils/cart/constants";

const CartConsultationReview = () => (
    <div className="reviews-consultation-sec">
        <Flickity
            className="carousel carousel-main"
            elementType={'div'}
            options={GoogleReviewflickityOptions}
            reloadOnUpdate
        >
            {consultationReview.map((item) => <div key={item.reviewer} className="review-item">
                <img src={item.image} alt={item.reviewer} className="reviewer-image" />
                <div className="reviewer-content">
                    <div className="reviewer-info">
                        <div className="title">{item.reviewer}</div>    
                        <div className="postedAgo">{item.postedAgo}</div>    
                    </div>
                    <div className="user-rating">
                        {generateRatedStar(item.rating)}
                    </div>
                    <div className="review-desc">
                        {item.review}
                    </div>
                </div>
            </div>)}
        </Flickity>
    </div>
)
export default CartConsultationReview;