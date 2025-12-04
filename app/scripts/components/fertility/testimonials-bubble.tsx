import React from 'react';
import { TestimonialItems } from '../../models/fertility';

interface IProps {
    isActive: boolean;
    handleBubbleClick: (handle: number) => void;
    testimonialItems: TestimonialItems;
    selectedBubble: number;
}

const TestimonialsBubbles = ({ testimonialItems, selectedBubble, handleBubbleClick }: IProps) => {
    return <>
        <div onClick={() => handleBubbleClick(testimonialItems.id)} className={`testimonial-bubble-item`}>
            <img src={testimonialItems.image} alt={testimonialItems.title} className={`${testimonialItems.id === selectedBubble ? 'active' : ''} testimonial-bubble-image`}/>
        </div>
    </>
}

export default TestimonialsBubbles