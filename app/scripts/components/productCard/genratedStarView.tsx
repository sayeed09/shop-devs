import React, { useEffect, useState } from 'react';
import { StarFilled } from '../../../icons/star-filled';
import { StarPartialFilled } from '../../../icons/star-partial-filled';
import { StartEmpty } from '../../../icons/star-empty';
import { IProductReviewObject } from '../../interface/product';

interface IGeneratedStarViewProps {
  reviewDetails: IProductReviewObject
  viewTotalReviews?: boolean
}

const GeneratedStarView = (props: IGeneratedStarViewProps) => {
  const { reviewDetails, viewTotalReviews } = props;
  const isViewReviews = props?.hasOwnProperty("viewTotalReviews") ? viewTotalReviews : true
  const [ratedStarList, setRatedStarList] = useState<any>();

  useEffect(() => {
    generateRatedStar();
  }, []);

  const generateRatedStar = () => {
    if (reviewDetails?.averageRating) {
      const ratedStar: any[] = [];
      for (let i = 0; i < parseInt(reviewDetails.averageRating); i++) {
        ratedStar.push(<div key={i} className="rating-icon rating-filled-icon"></div>
        );
      }
      if (parseFloat(reviewDetails.averageRating) % 1 !== 0)
        ratedStar.push(<div className="rating-icon rating-partial-icon"></div>);
      if (ratedStar.length !== 5) {
        for (let i = ratedStar.length; i < 5; i++) {
          ratedStar.push(<div key={i} className="rating-icon rating-empty-icon"></div>);
        }
      }
      setRatedStarList(ratedStar);
    } else {
      setRatedStarList([]);
    }
  };
  return (
    <>
      {ratedStarList?.length > 0 ? (
        <div className="search-review">
          {ratedStarList.map((element) => element)}
          {isViewReviews &&
            <span>({reviewDetails?.numberOfReviews})</span>
          }
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default GeneratedStarView;
