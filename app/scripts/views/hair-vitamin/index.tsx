import React, { useEffect, useState } from 'react';
import { SentryProvider } from '../../context/errorTracking';
import { Provider as GAProvider } from '../../context/gatracking';
import FAQ from '../../components/hair-vitamin/faq';
import '../../scss/import/_hair-vitamin.scss';
import '../../scss/import/_productv2.scss';
import Testimonials from '../../components/hair-vitamin/testimonials';
import ProgramInformation from '../../components/hair-vitamin/program-information';
import ClinicallyProven from '../../components/hair-vitamin/clinically-proven';
import ProgramCrafted from '../../components/hair-vitamin/program-crafted';
import BackedByScience from '../../components/hair-vitamin/backed-by-science';
import GoogleReviews from '../../components/productv2/google-reviews';
import AwardWinningClinicallyProven from '../../components/hair-vitamin/awcp';
import HVProduct from '../../components/hair-vitamin/hv-product';
import HairVitaminHeader from '../../components/hair-vitamin/hair-vitamin-header';
import {
  Provider as ProductProvider,
} from '../../context/product';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import { HVData } from '../../models/hair-vitamin';
import { getHVData } from '../../services/product';
import { ConsistencyIsKey } from '../../components/hair-vitamin/consistency-is-key';
import Skeleton from '../../components/loaders/skeleton';
import { productDetailsModal } from '../../interface/product';

const HairVitaminView = () => {

  const [hvData, setHVData] = useState<HVData>();
  const [loadOtherComponents, setLoadOtherComponents] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<productDetailsModal>();


  const fetchHVData = async () => {
    const data = await getHVData();
    setHVData(data);
  };

  useEffect(() => {
    fetchHVData();
    const timer = setTimeout(() => {
      setLoadOtherComponents(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SentryProvider>
      <MixpanelProvider>
        <GAProvider>
          <ProductProvider>
            {
              hvData ? <>
                <HairVitaminHeader />
                {
                  !loadOtherComponents &&
                  <>
                    <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
                    <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
                  </>
                }
                {
                  loadOtherComponents &&
                  <div className='hv-content-container'>
                    <Testimonials testimonials={hvData.TestimonialsList} productDetails={productDetails} setProductDetails={setProductDetails} />
                    <ProgramInformation programInformation={hvData.ProgramInformation} />
                    <ClinicallyProven clinicallyProven={hvData.ClinicalProven} />
                    <ProgramCrafted />
                    <BackedByScience BackedByScience={hvData.BackedByScience} />
                    <AwardWinningClinicallyProven awardWinningClinicallyProven={hvData.AwardWinningClinicallyProven} />
                    <HVProduct productInformation={hvData.ProductInformation} benefits={productDetails?.benefits} />
                    <ConsistencyIsKey />
                    <div className='oziva-pdp-web hv-google-reviews'>
                      <GoogleReviews googleReview={hvData.GoogleReviews} />
                    </div>
                    <FAQ faq={hvData.FrequentlyAskedQuestion} />
                  </div>
                }
              </> : <>
                <Skeleton height="300px" width="100%" count={1} margin="8px 0px" />
                <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
                <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
              </>
            }
          </ProductProvider>
        </GAProvider>
      </MixpanelProvider>
    </SentryProvider>
  )
}

export default HairVitaminView;