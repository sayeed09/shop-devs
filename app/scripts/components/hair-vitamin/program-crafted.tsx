import React from 'react'
import NutritionIcon from '../../../icons/nutrition-icon'
import UterusIcon from '../../../icons/uterus-icon'
import StressIcon from '../../../icons/stress-icon'
import HealthIcon from '../../../icons/health-icon';
import LazyLoad from 'react-lazy-load';

const ProgramCrafted = () => {
    return (
        <LazyLoad offset={300}>
            <div className='program-crafted-container'>
                <div className='program-crafted-header'>Multi Targeted Solution for Hair Fall Control & Hair Regrowth</div>
                <div className='program-crafted-content'>
                    <div className='program-crafted-item'>
                        <div className='program-crafted-icon'><NutritionIcon /></div>
                        <div className='program-crafted-icon-text'>
                            <div>Diagnosed</div> Lack of Iron, Zinc & Biotin
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'>
                            <UterusIcon />
                        </div>
                        <div className='program-crafted-icon-text'>
                            <div>Hormonal Health</div> Excess DHT hormone
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'><StressIcon /></div>
                        <div className='program-crafted-icon-text'>
                            <div>Stress</div> High cortisol levels
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'>
                            <HealthIcon />
                        </div>
                        <div className='program-crafted-icon-text'>
                            <div>Scalp Health</div> Low levels of Vitamin E
                        </div>
                    </div>
                </div>
            </div>
        </LazyLoad>
    )
}

export default ProgramCrafted