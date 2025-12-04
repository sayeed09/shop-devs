import React, { useCallback, useContext, useEffect } from "react";
import { Review } from "../../../models/product/productv2";
import Flickity from "react-flickity-component";
import { GoogleReviewflickityOptions } from "../../../utils/productv2/provider";
import { generateRatedStar } from "./ratings-review";
import { GAContext } from "../../../context/gatracking";


interface Props {
    reviews: Review[];
}
const List = ({ reviews }: Props) => {
    const flickityRef = React.useRef<Flickity | null>(null);
    const gaTrackingEvent = useContext(GAContext);

    const setRef = useCallback((ref: Flickity) => {
        flickityRef.current = ref;
        flickityRef.current?.on("change", function (index: number) {
            gaTrackingEvent('google_review_swipe', {review_number: index + 1});
        });
    }, []);

    return (
        <div className="reviews-list-sec">
            <Flickity
                flickityRef={setRef}
                className="carousel carousel-main"
                elementType={'div'}
                options={GoogleReviewflickityOptions}
                reloadOnUpdate
            >
                {reviews.map((item) => <div key={item.reviewer} className="review-item">
                    <div className="title-img">
                        <img src={item.image} alt={item.reviewer} />
                        <div className="title-sec">
                            <div className="title">{item.reviewer}</div>
                        </div>
                    </div>
                    <div className="user-rating">
                        {generateRatedStar(item.rating)}
                    </div>
                    {
                        item.heading && (
                            <div className="review-heading">
                                {item.heading}
                            </div>
                        )
                    }
                    <div className="review-desc">
                        {item.review}
                    </div>
                </div>)}
            </Flickity>
        </div>
    );
}
export default List;