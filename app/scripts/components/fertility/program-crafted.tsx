import React from 'react';
import LazyLoad from 'react-lazy-load';

const ProgramCrafted = () => {
    return (
        <LazyLoad offset={300}>
            <div className='program-crafted-container'>
                <div className='program-crafted-header'>For who is the program crafted?</div>
                <div className='program-crafted-content'>
                    <div className='program-crafted-item'>
                        <div className='program-crafted-icon'>
                            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Diagnosed_with_PCOD_PCOS_Irregular_Periods.png?v=1732271229'/>
                        </div>
                        <div className='program-crafted-icon-text'>
                            Diagnosed with PCOD, PCOS, Irregular Periods
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'>
                            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/AHM_issues.png?v=1732271230'/>
                        </div>
                        <div className='program-crafted-icon-text'>
                            AMH Issues
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'>
                            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Problem_with_Egg_Quality.png?v=1732271230'/>
                        </div>
                        <div className='program-crafted-icon-text'>
                            Problem with Egg Quality
                        </div>
                    </div>
                    <div className='program-crafted-item text-center'>
                        <div className='program-crafted-icon'>
                            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Problems_with_Ovulation.png?v=1732271230'/>
                        </div>
                        <div className='program-crafted-icon-text'>
                            Problems with Ovulation
                        </div>
                    </div>
                </div>
            </div>
        </LazyLoad>
    )
}

export default ProgramCrafted