import React, { useEffect, useState } from 'react'
import { isMobile } from '../../utils/helper';

const MircroInteraction = () => {
  const [isPastProductOffers, setIsPastProductOffers] = useState(false);
  const [isPastGoogleReviews, setIsPastGoogleReviews] = useState(false);

  useEffect(() => {
    if (isMobile()) {
      const handleScroll = () => {
        const productSection = document.querySelector('.product-offers-section-main');
        const reviewsSection = document.querySelector('.goolge-review-sec');

        if (productSection && !isPastProductOffers) {
          setIsPastProductOffers(true);
        }

        if (reviewsSection && !isPastGoogleReviews) {
          setIsPastGoogleReviews(true);
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {isPastProductOffers && <div className='micro-interactions micro-interaction-v1'>
        <a href='#offers-container-id'>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Offer_GIF.gif?v=1747913240" alt="Google Icon logo" className="micro-interaction-img-1" /> See Today's Best Deal
        </a>
      </div>}
      {isPastGoogleReviews && <div className="micro-interactions micro-interaction-v2">
        <a href="#goolge-review-sec-uds-649">
          <img
            src="https://cdn.shopify.com/s/files/1/2393/2199/files/google-icon-logo_1.svg?v=1723620685"
            alt="Google Icon logo" className="micro-interaction-img-2"
          />{" "}
          Read Real Customer Stories
        </a>
      </div>}
    </>
  )
}

export default MircroInteraction