import React from 'react';
import { DownArrow } from '../../../icons/down-arrow';

const PrimeTermsAndCondition = () => {
  return (
    <>
      <div className="tab">
        <input type="checkbox" id="TANDC" className="accordion-tab" />
        <label className="tab-label" htmlFor="TANDC">
          Terms & Conditions
          <span className="arrow-tab">
            <DownArrow />
          </span>
        </label>
        <div className="tab-content">
          <p>This 3-month OZiva Prime membership offer (&quot;Offer&quot;), is provided to you by Zywie Ventures Private Limited, having the brand name &ldquo;OZiva&rdquo; on the website www.oziva.in and the corresponding mobile site and mobile application (collectively, &quot;OZiva&quot;), in respect of OZiva Prime membership made available by OZiva.</p>
          <p>These terms and conditions (&quot; Prime&quot;) shall be read in conjunction with the general website terms and conditions and the applicable Privacy Notice, to which you agree by availing OZiva Prime Membership. In the event of any conflict between such terms and these OZiva Prime Membership Terms, these Prime Terms will prevail, for the purposes of this Offer.</p>
          <p>Customers can purchase an OZiva Prime membership from the official website's Prime Page or Cart Page. OZiva Prime benefits will be available to its members only.</p>
          <p>OZiva Prime membership is the perfect start to move ahead in your journey of #aBetterYou. One can avail the benefits such as additional discounts and cashback will be made through a member&rsquo;s OZiva Cash Wallet and access to connect with our certified Nutritionists will be exclusively available to our Prime members from the OZiva website.</p>
          <p>OZiva Cash reward points can be redeemed during any purchase on the OZiva app. 1 unit of OZiva cash is equivalent to &#8377;1. At the moment, OZiva Cash is available only in India. OZiva cash will expire if not redeemed within 6 months from the date of earnings.</p>
          <p>OZiva reserves the sole right, at any time, without prior notice and without assigning any reason whatsoever, to add/alter/modify/change any or all of these Offer Terms or to replace the Offer of the Prime membership.</p>
          <p>OZiva reserves the right to disqualify any customer from availing the OZiva Prime membership, if any fraudulent activity is identified as being carried out for the purpose of availing this Offer/ membership. OZiva Prime membership is non-transferable.</p>
          <p>OZiva Prime membership expires in 3 months from the date of purchase, depending on your chosen plan. </p>
        </div>
      </div>
    </>
  )
};
export default PrimeTermsAndCondition;
