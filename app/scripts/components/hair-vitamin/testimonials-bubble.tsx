import React from 'react';
import { TestimonialItems } from '../../models/hair-vitamin';
import Flickity from 'react-flickity-component';
import 'flickity-as-nav-for';
import { isMobile } from '../../utils/helper';
import { ResponsiveImage } from '../productCard/responsive-image';
import { bubbleImageBreakPoints } from '../../utils/data-provider';
import { resizeImage } from '../../utils/common-functions';

interface IProps {
    handleBubbleClick: (handle: number) => void;
    testimonialList: TestimonialItems[];
    selectedBubble: number;
    setFlickityRef: any;
}

let flickityOptionsThamb = {
    prevNextButtons: isMobile() ? true : false,
    imagesLoaded: true,
    asNavFor: isMobile() ? '.press_carousel-main' : '',
    initialIndex: 2,
    wrapAround: true,
    lazyLoad: true
};


const TestimonialsBubbles = ({ testimonialList, selectedBubble, handleBubbleClick, setFlickityRef }: IProps) => {

    return <>
        {testimonialList && testimonialList.length > 0 && (<div className='testimonials-bubbles-container'>
            <Flickity
                className="press_carousel press_carousel-nav"
                elementType={'div'}
                options={flickityOptionsThamb}
                flickityRef={setFlickityRef}
            >
                {
                    testimonialList.map((item) => {
                        return (
                            <div className='press_carousel-cell' key={item.id}>
                                <div onClick={() => handleBubbleClick(item.id)} className={`testimonial-bubble-item`}>
                                    <img alt={item.name} src={resizeImage(item.image, '200x200')} className={item.id === selectedBubble ? 'active' : ''}/>
                                </div>
                            </div>
                        )
                    })
                }
            </Flickity>
        </div>)}
    </>
}

export default TestimonialsBubbles