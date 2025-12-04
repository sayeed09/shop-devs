import React, { useEffect, useState } from 'react';
// import '../../scss/oziva-search-product-page.scss';
import HeroBanner from '../../components/home/hero-banner';
import { HomePageResponseModel } from '~/scripts/models/home';
import { SentryProvider } from '~/scripts/context/errorTracking';
// import '../../scss/oziva-site.scss';
// import '../../scss/home-style.scss';
// import { homeService } from '../../services/home';
// import {
//   Banner,
//   DataBlock,
//   HomePageResponseModel,
// } from '../../models/home';
import { Provider as GAProvider } from '../../context/gatracking';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import { Provider as UserContext } from '../../context/user';
// import { SentryProvider } from '../../context/errorTracking';
// import HomeSkeleton from '../../components/loaders/home-skeleton';
// import { CollectionContainer } from '../../components/home/collection-container';

export default function HomeView() {
  const [isLoading, setIsLoading] = useState(true);
  const [homePageData, setHomePageDate] = useState<HomePageResponseModel>();

  useEffect(() => {
    // fetchHomePageData();
  }, []);
  // const fetchHomePageData = async () => {
  //   setIsLoading(true);
  //   const data = await homeService.fetchHomePageData();
  //   setHomePageDate(data);
  //   setIsLoading(false);
  // };

  if (!isLoading) {
    return (
      <>
        <SentryProvider>
          <GAProvider>
            <MixpanelProvider>
              <UserContext>
                {/* <HeroBanner homepageData={homePageData?.banners as Banner[]} />
                <CollectionContainer dataBlock={homePageData?.dataBlocks as DataBlock[]} /> */}
              </UserContext>
            </MixpanelProvider>
          </GAProvider>
        </SentryProvider>
      </>
    );
  } else {
    // return <HomeSkeleton />;
  }
}