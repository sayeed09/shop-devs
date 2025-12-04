import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import ReviewItem from '../../components/product/review-item';
import { LovedByThousand } from '../../interface/product';

const flickityOptions = {
  cellAlign: 'left',
  contain: true,
  pageDots: true,
  groupCells: 1,
  lazyLoad: true,
};

interface PeopleReviewModal {
  lovedByThousandsData: LovedByThousand;
}

const PeopleReview = (props: PeopleReviewModal) => {
  const [sectionHeight, setSectionHeight] = useState(
    document.getElementsByClassName('people-review-slider')[0]?.clientHeight,
  );
  useEffect(() => {
    window.addEventListener('resize', function (event) {
      setSectionHeight(
        document.getElementsByClassName('people-review-slider')[0]
          ?.clientHeight,
      );
    });
  }, []);

  if (!props?.lovedByThousandsData?.data) {
    return null;
  }
  return (
      <>
        {props?.lovedByThousandsData?.data.length > 0 ? (
          <div
            className="product-left-sec people-review-sec"
            style={{
              minHeight: `${
                sectionHeight
                  ? sectionHeight + 20
                  : document.getElementsByClassName('people-review-slider')[0]
                      ?.clientHeight + 20
              }px`,
            }}
          >
            <div className="product-full-width-sec bg-primaryGreenSG400 p-16">
              <div className="container">
                <div className="people-review-slider left-align-sec">
                  <h2 className="mb-16">{props.lovedByThousandsData.title}</h2>
                  <Flickity
                    className={'carousel carousel-nav'}
                    elementType={'div'}
                    options={flickityOptions}
                    reloadOnUpdate
                  >
                    {props?.lovedByThousandsData?.data?.map((customer, i) => (
                      <ReviewItem key={i} customer={customer} />
                    ))}
                  </Flickity>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
  )
};
export default PeopleReview;
