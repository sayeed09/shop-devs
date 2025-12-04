import React, { useEffect, useState } from 'react';
import '../../views/prime/prime.scss';
import PrimeTermsAndCondition from './terms-and-condition';
import PrimeFrequentlyAskedQuestions from './faq';
import PrimeCustomersLoveYourExperts from './customers-love-your-experts';
import PrimeOzCashIcon from '../../../icons/prime-oz-cash-icon';
import PrimeOZivaCashRedeemedIcon from './prime-oz-cash-redeemed';
import PrimeBenefits from './prime-benefits';
import { userService } from '../../services/user';
import { UserProfileResponseModel } from '../../models/cart/user';
import PrimeStatusBar from './prime-status-bar';
import AddUpgradeToPrime from './add-upgrade-to-prime';
import { CurrentPrimeStatus } from '../../models/prime';
import { UserLoginValue } from '../../interface/product';
import { getAccessToken } from '../../utils/product/formatter';

const Prime = () => {
  const [userPrimeInfo, setUserPrimeInfor] =
    useState<UserProfileResponseModel>();
  const [userIsPrime, setUserIsPrime] = useState(false);
  let authorizationToken: UserLoginValue | null = getAccessToken();

  const getUserProfile = async () => {
    try {
      const info = await userService.getUserProfile();
      setUserPrimeInfor(info);
      if (info.prime.current_status == CurrentPrimeStatus.PRIME) {
        setUserIsPrime(true);
      }
      return info;
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    if (authorizationToken && authorizationToken.accessToken)
      getUserProfile();
  }, []);
  const handleChatwoot = (phone) => {
    const event = new CustomEvent('triggerChatWoot', { detail: { phone } });
    document.dispatchEvent(event);
  };

  return (
    <>
      {userPrimeInfo ? (
        // User information is fetched.
        // In case of failure due to any reason shownig default prime page
        <div className="prime-container">
          <section className="free-bee-section">
            <PrimeStatusBar
              status={userPrimeInfo.prime.current_status}
              details={userPrimeInfo}
            />
            {userIsPrime ? (
              <div className="prime-money-section">
                <div className="prime-money-item">
                  <PrimeOzCashIcon />
                  <div>
                    <div className="fs-m-12">OZiva Cash Earnings</div>
                    <div className="prime-total-money fs-m-14">
                      {Number(
                        userPrimeInfo?.wallet?.oziva_cash_earnings,
                      ).toLocaleString('en')}
                    </div>
                  </div>
                </div>
                <div className="prime-money-item">
                  <PrimeOZivaCashRedeemedIcon />
                  <div>
                    <div className="fs-m-12">OZiva Cash Redeemed</div>
                    <div className="prime-total-money fs-m-14">
                      {Number(
                        userPrimeInfo.wallet.oziva_cash_redeemed,
                      ).toLocaleString('en')}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              userPrimeInfo && (
                <AddUpgradeToPrime
                  currentStatus={userPrimeInfo?.prime?.current_status}
                />
              )
            )}
          </section>
          {(userPrimeInfo?.prime?.current_status == CurrentPrimeStatus.PRIME || userPrimeInfo?.prime?.current_status == CurrentPrimeStatus.FREE_TRIAL) && <section className="prime-sections p-0">
            <button
              style={{
                outline: 'none',
                padding: 0,
                border: 'none',
                display: 'block',
              }}
              onClick={() => handleChatwoot(userPrimeInfo?.userDetails?.phone)}
            >
              <picture>
                <source
                  media="(min-width: 491px)"
                  srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_CWE_web_f2ba2cee-72fa-4734-8ae1-10341add53d9.png?v=1699253522'} />
                <source
                  media="(max-width: 490px)"
                  srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_CWE_d372b690-12cd-4ec0-8519-68bd7cc11114.png?v=1699253522'} />
                <img
                  className="lazyload banner-image-click d-block"
                  style={{ width: "100%", borderRadius: 6 }}
                  alt="OZiva Prime Membership Benefits"
                />
              </picture>
            </button>
          </section>}
          <section className="prime-sections prime-benefits-section">
            <PrimeBenefits />
          </section>
          <section className="prime-sections prime-customer-love-section">
            <PrimeCustomersLoveYourExperts />
          </section>
          <section className="prime-additional-details prime-sections">
            <h2>Additional Details</h2>
            <div className="oz-accordion">
              <div className="tabs">
                <PrimeFrequentlyAskedQuestions />
                <PrimeTermsAndCondition />
              </div>
            </div>
          </section>
        </div>
      ) : (
        // If the response is not set due to any reason
        // showing default non-login PRIME page
        <div className="prime-container">
          <section className="free-bee-section">
            <PrimeStatusBar status={'default'} details={userPrimeInfo} />
            <AddUpgradeToPrime currentStatus={'never_prime'} />
          </section>
          <section className="prime-sections prime-benefits-section">
            <PrimeBenefits />
          </section>
          <section className="prime-sections prime-customer-love-section">
            <PrimeCustomersLoveYourExperts />
          </section>
          <section className="prime-additional-details prime-sections">
            <h2>Additional Details</h2>
            <div className="oz-accordion">
              <div className="tabs">
                <PrimeFrequentlyAskedQuestions />
                <PrimeTermsAndCondition />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
export default Prime;
