import React, { useCallback, useEffect, useRef, useState } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity-as-nav-for';
import { TestimonialItems } from '../../models/fertility';
import TestimonialsBubbles from './testimonials-bubble';
import { StarFilled } from '../../../icons/star-filled';
import { isMobile } from '../../utils/helper';
import LazyLoad from 'react-lazy-load';

interface IProps {
    testimonials: TestimonialItems[]
}

const FlickityOptions = {
    initialIndex: 1,
    pageDots: false,
    prevNextButtons: false,
};

const Testimonials = ({ testimonials }: IProps) => {
    const [selectedBubble, setSelectedBubble] = useState(1);
    const [showDesc, setShowDesc] = useState(false);
    const [containerHeight, setContainerHeight] = useState('auto');
    const flickityRef = useRef<Flickity | null>(null);

    const setFlickityRef = useCallback((ref: Flickity) => {
        flickityRef.current = ref;

        flickityRef.current?.on("change", handleBubbleClick);
    }, []);

    const handleBubbleClick = (index: number) => {
        setSelectedBubble(index);
        setShowDesc(false);
        if (flickityRef.current) {
            flickityRef.current.select(index);
        }
    }

    useEffect(() => {
        const updateHeight = () => {
            if (flickityRef.current) {
                const activeSlide = flickityRef.current.selectedElement as any;
                if (activeSlide) {
                    const height = activeSlide.offsetHeight;
                    setContainerHeight(`${isMobile() ? height : height}px`);
                }
            }
        };

        if (flickityRef.current) {
            flickityRef.current.on('change', updateHeight);
            updateHeight();
        }

        return () => {
            if (flickityRef.current) {
                flickityRef.current.off('change', updateHeight);
            }
        };
    }, [showDesc]);

    const testimonialsTextLimit = isMobile() ? 192 : 492;
    const testimonialsDescriptionLength = (text: string) => {
        if (isMobile()) return text.length > 192;
        else return text.length > 492;
    };
    return (
        <LazyLoad offset={300}>
            <div className='testimonials-container'>
                <div className='testimonials-header-container'>
                    <div className='testimonials-header'>The Gift Of Life:</div>
                    <div className='testimonials-sub-header'>Testimonials Of Triumph</div>
                </div>

                <div className='testimonials-bubbles-container'>
                    {
                        testimonials.map((testimonialsItem, index) => {
                            return (
                                <>
                                    <TestimonialsBubbles testimonialItems={testimonialsItem} isActive={true} handleBubbleClick={handleBubbleClick} selectedBubble={selectedBubble} />
                                </>
                            )
                        })
                    }
                </div>

                <div className="press_container" style={{ height: containerHeight }}>
                    <Flickity
                        className="press_carousel press_carousel-main"
                        elementType={'div'}
                        options={FlickityOptions}
                        flickityRef={setFlickityRef}
                    >
                        {
                            testimonials.map((testimonials, index) => {
                                return (
                                    <>
                                        <div className='testimonials-item' key={index}>
                                            <div className='testimonials-item-image'>
                                                <img src={testimonials.image} alt={testimonials.name} />
                                            </div>

                                            <div className='testimonials-content'>
                                                <div className='testimonials-item-content'>
                                                    <div className='testimonials-item-heading'>
                                                        <div className='testimonials-item-heading-name'>{testimonials.name}</div>
                                                        <div className='testimonials-item-heading-description'>{testimonials.title}</div>
                                                    </div>
                                                    <div className='testimonials-item-description'>
                                                        {
                                                            testimonialsDescriptionLength(testimonials?.description) ? !showDesc ? (
                                                                <>
                                                                    {testimonials?.description.slice(0, testimonialsTextLimit)}{'...'}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {testimonials?.description}
                                                                </>
                                                            ) : testimonials?.description
                                                        }
                                                    </div>

                                                </div>
                                                <div className='testimonials-item-footer'>
                                                    <div className='testimonials-item-rating'>
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                    </div>
                                                    {
                                                        testimonialsDescriptionLength(testimonials?.description) && <button
                                                            onClick={() => setShowDesc(!showDesc)}
                                                            className='testimonials-read-more-button'
                                                        >
                                                            {showDesc ? 'READ LESS' : 'READ MORE'}
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </Flickity>
                </div>
            </div>
        </LazyLoad>
    )
}

export default Testimonials