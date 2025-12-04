import React, { useEffect, useState } from "react";


interface Props {
    ratings: number;
    totalReviews: number;
}

export const generateRatedStar = (ratings: number) => {
    const ratedStar: JSX.Element[] = [];
    for (let i = 0; i < Math.floor(ratings); i++) {
        ratedStar.push(<div key={i} className="rating-icon rating-filled-icon"></div>
        );
    }
    if (ratings % 1 !== 0)
        ratedStar.push(<div key={20} className="rating-icon rating-partial-icon"></div>);
    if (ratedStar.length !== 5) {
        for (let i = ratedStar.length; i < 5; i++) {
            ratedStar.push(<div key={i + 1} className="rating-icon rating-empty-icon"></div>);
        }
    }

    return ratedStar
};

export const generateRatedStarYellow = (ratings: number) => {
    const ratedStar: JSX.Element[] = [];
    for (let i = 0; i < Math.floor(ratings); i++) {
        ratedStar.push(<div key={i} className="product-rating-icon product-rating-filled-icon"></div>
        );
    }
    if (ratings % 1 !== 0)
        ratedStar.push(<div key={20} className="product-rating-icon product-rating-partial-icon"></div>);
    if (ratedStar.length !== 5) {
        for (let i = ratedStar.length; i < 5; i++) {
            ratedStar.push(<div key={i + 1} className="product-rating-icon product-rating-empty-icon"></div>);
        }
    }

    return ratedStar
};

const ReviewsRating = ({ ratings, totalReviews }: Props) => {

    return <>
        <div className="rating-sec">
            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/google-icon-logo_1.svg?v=1723620685" />
            <div className="ratings">
                <div className="rating-text">{ratings.toFixed(1)}</div>
                <div className="rating-stars">
                    {generateRatedStar(ratings).map((element) => element)}
                </div>

            </div>
        </div>
        <span className="total-reviews"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/verified.svg?v=1723651884" /> {totalReviews}+ reviews</span>

    </>
}
export default ReviewsRating;