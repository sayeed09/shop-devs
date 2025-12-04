import React from 'react';
import { IProductReviewObject } from '../../interface/product';

interface IGeneratedStarViewProps {
  reviewDetails: IProductReviewObject
  viewTotalReviews?: boolean
}

const GeneratedStarView = (props: IGeneratedStarViewProps) => {
  const { reviewDetails, viewTotalReviews } = props;

  return (<div className="ratings-reviews-container">
    <div className="ratings-reviews">
      <span className='total-ratings'>{reviewDetails.averageRating}
        <div className="rating-icon rating-filled-icon"></div>
      </span>
      <span className='divider' />
      <span className='total-reviews'>{reviewDetails?.numberOfReviews} Reviews</span>
    </div>
  </div>
  );
};
export default GeneratedStarView;
