import React from 'react';
import { FAQ } from '../../../interface/product';

interface ProductFaqSectionModal {
    faqData: FAQ[];
}

const ProductFaqSection = (props: ProductFaqSectionModal) => {
    if (!props.faqData) {
        return null;
    }
    return props.faqData.length > 0 ? (
        <div className="tab">
            <div className="tab-content">
                <ol>
                    {props.faqData?.map((faq, i: number) => (
                        <li key={i}>
                            <div className='question'>{faq.question}</div>
                            <div className='answer'>{faq.answer}</div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    ) : (
        <></>
    );
};
export default ProductFaqSection;
