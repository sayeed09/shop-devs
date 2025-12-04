import React from 'react';
import { SuperSaleJSON } from '../../utils/supersale/constant';

const MarqueeAnimation = () => {
    return (
        <div className="marquee">
            {Array.from({ length: 3 }).map((item, index) => {
                return (
                    <div className="marquee-item" key={index}>
                        {
                            SuperSaleJSON.marqueeText.map((word, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319917.svg?v=1762337932" alt="Animated Icon" />
                                        <div className='animated-word'>{word}</div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default React.memo(MarqueeAnimation);
