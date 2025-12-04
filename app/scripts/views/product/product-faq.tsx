import React from 'react';
import { DownArrow } from '../../../icons/down-arrow';
import { FAQ } from '../../interface/product';

interface ProductFaqSectionModal {
  faqData: FAQ[];
}

const ProductFaqSection = (props: ProductFaqSectionModal) => {
  if (!props.faqData) {
    return null;
  }
  return (
      <>
        {
          props.faqData.length > 0 ? (
            <div className="tab">
              <input type="checkbox" id="FAQ" className="accordion-tab" />
              <label className="tab-label" htmlFor="FAQ">
                Frequently Asked Questions
                <span className="arrow-tab">
                  <DownArrow />
                </span>
              </label>
              <div className="tab-content">
                <ol>
                  {props.faqData?.map((faq, i: number) => (
                    <li key={i}>
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <></>
          )
        }
      </>
  );
};
export default ProductFaqSection;
