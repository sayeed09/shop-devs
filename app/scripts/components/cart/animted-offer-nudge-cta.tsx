import React, { useEffect, useState } from 'react';
import { ButtonLoader } from '../../../icons/button-loader';

interface IProps {
    loader: boolean;

}

const AnimatedOfferNudgeCTA = ({ loader }: IProps) => {
    const items = [
        { text: "TAP TO APPLY OFFER", image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/tap.gif?v=1763026073' },
        { text: "DON'T MISS OUT!", image: '' },
    ];
    const [index, setIndex] = useState(0);




    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);
    return (
        <>
            {
                loader ? (
                    <div className="cta-container">
                        <ButtonLoader />
                    </div>
                ) : <div className="cta-container">
                    <span>{items[index].text}</span>
                    {items[index]?.image && <img src={items[index]?.image} alt={items[index].text} className={'cta-image'} />}
                </div>
            }

        </>
    )
}

export default AnimatedOfferNudgeCTA