import React from 'react';
import { AwardWinningClinicallyProven } from '../../models/hair-vitamin';
import LazyLoad from 'react-lazy-load';
import { ResponsiveImage } from '../productCard/responsive-image';
import { bannerBreakPoints, bubbleImageBreakPoints } from '../../utils/data-provider';

interface IProps {
    awardWinningClinicallyProven: AwardWinningClinicallyProven[];
}

const AwardWinningClinicallyProven = ({ awardWinningClinicallyProven }: IProps) => {

    const imageBreakpoints = {
        small: `250x250`,
        medium: `300x300`,
        large: `400x400`,
    }
    return (
        <LazyLoad offset={300}>
            <div className='awcp-container'>
                <div className='awcp-header'>
                    Award Winning, Clinically Proven{' '}
                    <span className='awcp-bold-title'>Plant Ingredients To Regrow Hair</span>
                </div>

                <div className='awcp-content'>
                    {awardWinningClinicallyProven.map((item, index) => {
                        return (
                            <div key={item.id} className='awcp-content-item' style={(index === awardWinningClinicallyProven.length - 1) ? { borderBottom: 'none !important' } : { borderBottom: '2px solid #E0E0E0' }}>
                                <ResponsiveImage altText={item.heading} imageURL={item.image} widthHeightObject={imageBreakpoints} loading='lazy'/>
                                <div className='awcp-text'>
                                    <div className='awcp-title'>{item.heading}</div>
                                    <div className='awcp-sub-text'>{item.subHeading}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </LazyLoad>
    )
}

export default AwardWinningClinicallyProven