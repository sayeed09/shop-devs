import React, { useEffect, useState } from 'react'
import HeroBanner from '../../components/home/hero-banner';
import { Banner } from '../../models/home';
import '../../scss/import/_supersale.scss';
import { SuperSaleJSON } from '../../utils/supersale/constant';
import '../../scss/oziva-site.scss';
import CustomerReviews from '../../components/supersale/customer-reviews';
import { CollectionContainer } from '../../components/supersale/collection-container';


const SupersaleView = () => {
  const [showconfetti, setShowconfetti] = useState(false);

  useEffect(() => {

    //Blast after 1 sec, cause banner image doesn't load immediately
    const showSuperSaleConfettiStr = sessionStorage.getItem('showSuperSaleConfetti');
    const showSuperSaleConfetti = showSuperSaleConfettiStr ? JSON.parse(showSuperSaleConfettiStr) : null;

    if (!showSuperSaleConfetti) {
      setTimeout(() => {
        setShowconfetti(true);
        sessionStorage.setItem('showSuperSaleConfetti', JSON.stringify(true));
      }, 500);

      //To hide confetti
      setTimeout(() => {
        setShowconfetti(false);
      }, 2800);
    }

  }, []);
  return (
    <>
      {/* {showconfetti && <div className="super-sale-confetti"></div>} */}
      <div className='supersale-banner'>
        <HeroBanner homepageData={SuperSaleJSON.supersaleBanner as Banner[]} />
      </div>

      <CollectionContainer />
      <CustomerReviews />
    </>
  )
}

export default SupersaleView