import React from 'react';
import { LovedByThousandData } from '../../interface/product';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';

interface ReviewItemModal {
  customer: LovedByThousandData;
}

const GenerateRatedStar = (rating) => {
  const ratedStarList: any[] = [];
  for (let i = 0; i < parseInt(rating.ratings); i++) {
    ratedStarList.push(<div style={{ width: 18, height: 18 }} key={i} className="rating-icon rating-filled-icon"> </div>);
  }
  if (parseFloat(rating.ratings) % 1 !== 0)
    ratedStarList.push(<div style={{ width: 18, height: 18 }} className="rating-icon rating-partial-icon"> </div>);
  if (ratedStarList.length !== 5) {
    for (let i = ratedStarList.length; i < 5; i++) {
      ratedStarList.push(<div style={{ width: 18, height: 18 }} key={i} className="rating-icon rating-empty-icon"> </div>);
    }
  }
  return (
    <>
      {ratedStarList.map((element) => element)}
    </>
  );
};

const ReviewItem = (props: ReviewItemModal) => {

  return (
    <>
      <div className="carousel-cell">
        <div
          className="bg-white text-center oz-user-img"
          style={{ width: '100%', height: '100%' }}
        >
          <ResponsiveImage imageURL={props.customer.image} widthHeightObject={productCardBreakPoints} altText={`User Review: ${props.customer.reviewerName}`}/>
        </div>
        <div className="pt-16">
          <p className="user-description body-2">{props.customer.review}</p>
          <div className="review-slider-footer">
            <p className="body-2">{props.customer.reviewerName}</p>
            <div className="people-review-starts mt-8" style={{ display: 'flex' }}>
              <GenerateRatedStar ratings={props.customer.rating} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewItem;
