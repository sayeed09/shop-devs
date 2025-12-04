import React, { useEffect, useRef } from 'react'
import { isMobile } from '../../utils/helper'
import { formatPriceWithCurrency } from '../../utils/cart/formatter'
import { DownArrow } from '../../../icons/down-arrow'
import { productDetailsModal } from '../../interface/product'

interface IProps {
    productDetails: productDetailsModal | undefined;
    scrollRef: any;
    handleBuyNow: () => void;
}

const SuccessStory = ({ productDetails, scrollRef, handleBuyNow }: IProps) => {

    const videoSectionRed = useRef<null | HTMLDivElement>(null);
    const stickyRef = useRef<null | HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    const handleStickyButton = () => {
        const stickyButton = stickyRef.current;
        const videoRect = videoSectionRed.current ? videoSectionRed.current.getBoundingClientRect() : undefined;
        if (videoRect && stickyButton) {
            if (videoRect?.bottom <= 840) {
                stickyButton.style.position = 'fixed';
            } else if (videoRect?.bottom > 840) {
                stickyButton.style.position = 'sticky';
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleStickyButton);
        return () => {
            window.removeEventListener('scroll', handleStickyButton);
        };
    }, []);
    return (
        <div className='success-story-container'>
            <div className='success-story-title'>
                Real-Life <span>Success Story</span>
            </div>

            <div className='success-story-video' ref={videoSectionRed}>
                {isMobile() ? <video preload="metadata" controls={true}>
                    <source src="https://cdn.shopify.com/videos/c/o/v/451015acaa8e4d1eb0825bafb8f0bbee.mp4#t=0.1" type="video/mp4" />
                </video> :
                    <video preload="metadata" controls={true}>
                        <source src="https://cdn.shopify.com/videos/c/o/v/974c4a29919d4629b8ed996c61c08fdc.mp4#t=0.1" type="video/mp4" />
                    </video>}
            </div>
            <div className='sticky-button' ref={stickyRef}>
                <div className='sticky-button-emi-details'>
                    <div className='sticky-button-emi-per-month-pricing'>
                        {productDetails?.variants[0].price && formatPriceWithCurrency(productDetails?.variants[0].price / 3)} <span>/month (3 months)</span>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='emi-no-cost'>
                        No cost EMI available*
                    </div>
                </div>

                <div className='sticky-button-pricing-details'>
                    <div className='sticky-button-pricing'>
                        <div>
                            <span style={{ color: '#7E7E7E' }} className='mrp-text'>MRP:{'  '}</span>
                            <span className='sticky-button-mrp'>
                                {formatPriceWithCurrency(productDetails?.variants[0]?.compareAtPrice)}
                            </span>
                            <span className='sticky-button-selling-price'>
                                {formatPriceWithCurrency(productDetails?.variants[0]?.price)}
                            </span>
                        </div>

                        <div className='sticky-button-whats-included-text' onClick={() => handleScroll()}>
                            Whats Included <DownArrow />
                        </div>
                    </div>

                    <div>
                        <button className='sticky-button-buy-now-btn' onClick={() => handleBuyNow()}>
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessStory