import React from 'react';
import { DownArrow } from '../../../icons/down-arrow';
import { FAQs } from '../../utils/prime-page';

const PrimeFrequentlyAskedQuestions = () => {
  return (
    <>
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
          {FAQs && FAQs.map((item, index) => {
            return(<li key={index}>
              <h4>{item.heading}</h4>
              <p>
               {item.description}
              </p>
            </li>);
          })}
          </ol>
        </div>
      </div>
    </>
  );
};
export default PrimeFrequentlyAskedQuestions;
