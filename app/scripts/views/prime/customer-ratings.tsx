import React from "react";
import { StartEmpty } from "../../../icons/star-empty";
import { StarFilled } from "../../../icons/star-filled";

interface ICustomerRating {
    rating: number;
    totalRating: number;
}

export default function CustomerRatings({rating, totalRating}: ICustomerRating) {
    return(
        <>
            {new Array(rating).fill(0).map((item, index) => <StarFilled key={index}/>)}
            {new Array(totalRating-rating).fill(1).map((item, index) => <StartEmpty key={index}/>)}
        </>
    );
}