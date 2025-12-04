import React from 'react';
import {ResponsiveImage} from '../../components/productCard/responsive-image';
import { bannerBreakPoints } from '../../utils/data-provider';
import { isMobile } from '../../utils/helper';

const HairVitaminHeader = () => {
    return (
        <div className='hv-header-container'>
            {
                !isMobile() ? <ResponsiveImage altText='HV Hero Banner web' imageURL='https://cdn.shopify.com/s/files/1/2393/2199/files/HV_Banner_Web.png?v=1731414069' widthHeightObject={bannerBreakPoints}/> : 
                <ResponsiveImage altText='HV Hero Banner mobile' imageURL='https://cdn.shopify.com/s/files/1/2393/2199/files/HV_Banner_Mobile.png?v=1731414055' widthHeightObject={bannerBreakPoints}/>
            }
        </div>
    )
}

export default HairVitaminHeader