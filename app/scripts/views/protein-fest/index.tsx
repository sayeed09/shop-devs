import React from 'react'
import HeroBanner from '../../components/home/hero-banner';
import { Banner } from '../../models/home';
import '../../scss/import/_supersale.scss';
import '../../scss/import/_cart-abs.scss';
import '../../scss/import/_productv2.scss';
import './protein-fest.scss';

import CustomerReviews from '../../components/supersale/customer-reviews';
import { ProteinFestJson } from '../../utils/protein-fest/constants';
import { CollectionContainer } from '../../components/protein-fest/collection-container';


const ProteinFestView = () => {

    return (
        <>
            <div className='supersale-banner'>
                <HeroBanner homepageData={ProteinFestJson.banners as Banner[]} />
            </div>

            <CollectionContainer />
            <CustomerReviews />
        </>
    )
}

export default ProteinFestView