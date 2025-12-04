import React from 'react'
import { ProgramInformation } from '../../models/fertility'
import { ResponsiveImage } from '../productCard/responsive-image';
import { bannerBreakPoints } from '../../utils/data-provider';
import LazyLoad from 'react-lazy-load';

interface IProps {
    programInformation: ProgramInformation[];
    scrollRef: any;
}

const ProgramInformation = ({ programInformation, scrollRef }: IProps) => {
    return (
        <LazyLoad offset={300}>
            <div className='program-information-container' ref={scrollRef}>
                <div className='program-information-header'>Comprehensive Understanding Of The <span>90-day Fertility Support Program</span></div>
                <div className='program-information-content'>
                    {
                        programInformation.map((information, index) => {
                            return (
                                <div key={index} className='program-information-data'>
                                    <div className='program-information-data-left'>
                                        <div className='program-information-data-index'>{index + 1}</div>
                                        <div className='program-information-data-left-header'>
                                            <div className='program-information-data-left-title'>{information.title}</div>
                                            <div className='program-information-data-left-description'>{information.description}</div>
                                        </div>
                                    </div>
                                    <div className='program-information-data-right'>
                                        <ResponsiveImage imageURL={information.image} widthHeightObject={bannerBreakPoints} altText={information.title} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </LazyLoad>
    )
}

export default ProgramInformation