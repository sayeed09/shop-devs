import React, { useEffect } from 'react';
import { ClinicallProven } from '../../models/fertility';
import { useInViewport } from '../../hooks/useOnScreen';
import { animateNumber } from '../../utils/productv2/provider';

interface IProps {
  clinicallyProven: ClinicallProven[];
}

const ClinicallyProven = ({ clinicallyProven }: IProps) => {
  const { isInViewport, ref } = useInViewport();

  useEffect(() => {
    if (isInViewport) {
      clinicallyProven.forEach((item, index) => {
        animateNumber(`sec-${index}-slot-first`, Math.floor(item.percentage / 10), `luckiefirst${index}`);
        animateNumber(`sec-${index}-slot-second`, item.percentage % 10, `luckiesecond${index}`);
      })
    }
  }, [isInViewport]);
    return (
        <div className='oziva-pdp-web'>
          <div className='clinically-proven-result-header'>Clinically <span>Proven Results</span></div>
          <section className="article-sec" ref={ref}>
            <div className="list-container">
              {clinicallyProven.map((item, index) => (<div key={item.id} className="article-item" >
                <div className="count" id="counter">
                  <div id={`sec-${index}-slot-first`} className="digits digits-first">
                    {new Array(10).fill(0).map((_, index) => <div key={index}>{index}</div>)}
                  </div>
                  <div id={`sec-${index}-slot-second`} className="digits digits-second">
                    {new Array(10).fill(0).map((_, index) => <div key={index}>{index}</div>)}
                  </div>
                  <div className='percentage-sign'>
                    %
                  </div>
                </div>
                <div className="title">
                  {item.description}
                </div>
              </div>))}
            </div>
          </section>
        </div>
    )
}

export default ClinicallyProven;