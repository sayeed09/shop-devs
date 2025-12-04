import React from "react";
import LineItem from "./line-item";
import { ThreeMonthConsultMRP } from "../../utils/data-provider";
import { hostDomain } from "../../utils/endpoints";


const ThreeMonthConsult = () => {
    if(hostDomain != 'oziva.com') {
        return <>
            <div className="">
                <LineItem
                    image={'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796'}
                    title={'3 Months Nutritionist Diet Consultation + Diet Plan'}
                    price={0}
                    compareAtPrice={ThreeMonthConsultMRP}
                    hideYouSave
                    badgeTitle="3 Month"
                    hidePriceDetails
                />
            </div>
        </>
    }
}

export default ThreeMonthConsult;