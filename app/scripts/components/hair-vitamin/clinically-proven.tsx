import React from 'react';
import { ClinicalProven } from '../../models/hair-vitamin';
import LazyLoad from 'react-lazy-load';

interface IProps {
  clinicallyProven: ClinicalProven[];
}

const ClinicallyProven = ({ clinicallyProven }: IProps) => {

  return (
    <LazyLoad offset={300}>
      <div className='oziva-pdp-web clinically-proven-result'>
        <div className='clinically-proven-result-header'>Our Numbers Say It All <span>Clinically Proven Results</span></div>
        <section className="article-sec clinically-proven-result-content">
          <div className="list-container">
            {clinicallyProven.map((item, index) => (<div key={item.id} className="article-item" >
              <div className="count">
                <div className="digits digits-first">
                  {item.percentage}%
                </div>
              </div>
              <div className="title">
                {item.description}
              </div>
            </div>))}
          </div>
        </section>
      </div>
    </LazyLoad>
  )
}

export default ClinicallyProven;