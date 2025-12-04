import React from 'react'
import { ResponsiveImage } from '../productCard/responsive-image';
import { bannerBreakPoints } from '../../utils/data-provider';

interface IProps {
    setOpenPopup: (openPopup: boolean) => void;
    handleBuyNow: () => void;
}

const FertilityHeader = ({setOpenPopup, handleBuyNow}: IProps) => {
    return (
        <div className='fertility-header-banner'>
            <picture>
                <source media="(max-width: 430px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/Ferttility-Hero-Banner-Mobile.png?v=1732269338'}/>
                <source media="(max-width: 720px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/Ferttility-Hero-Banner-Mobile.png?v=1732269338'} />
                <source media="(min-width: 721px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/fertility_banner_w_o_button_desktop.png?v=1732163664'} />
                <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/fertility_banner_w_o_button_desktop.png?v=1732163664'} width="100%" alt={"Fertility hero banner"} />
            </picture>
            <div className="emi-details-container">
                <button className='product-buy-now-btn' onClick={() => handleBuyNow()}>
                    BUY NOW
                </button>
                <div className='whats-included-text' onClick={() => setOpenPopup(true)}>
                    WHAT'S INCLUDED
                </div>
            </div>
        </div>
    )
}

export default FertilityHeader