import React, { useState } from 'react'
import { FAQ } from '../../models/fertility';
import { UpArrowIcon } from '../../../icons/up-arrow';
import { DownArrow } from '../../../icons/down-arrow';
import LazyLoad from 'react-lazy-load';

interface IProps {
  faq: FAQ[];
}

const FAQ = ({ faq }: IProps) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openQuestionIndex === index) {
      setOpenQuestionIndex(null);
    } else {
      setOpenQuestionIndex(index);
    }
  };

  return (
    <LazyLoad offset={300}>

      <div className="faq-container">
        <div className='faq-header'>FAQ</div>
        {faq.map((item, index) => (
          <div key={index} className="faq-item">
            <div className={`faq-quetion-div`} onClick={() => toggleAnswer(index)}>
              <div className='question'>
                <div className='faq-question'>{index + 1}.</div>
                <div
                  className="faq-question"
                >
                  {item.quetion}
                </div>
              </div>
              <span>{openQuestionIndex !== index ? <DownArrow /> : <UpArrowIcon />}</span>
            </div>
            <div className={`${openQuestionIndex === index ? 'expanded' : 'contracted'}`}>
              <div>
                {item.answer}
              </div>
              <ul className='faq-extra-points'>
                {item.extraPoint?.map((points, index) => {
                  return (
                    <li key={index}>{points}</li>
                  )
                })}
              </ul>
            </div>
            {index + 1 !== faq.length && <hr className='faq-horizontal-line' />}
          </div>
        ))}
      </div>
    </LazyLoad>
  )
}

export default FAQ