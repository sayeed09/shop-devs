import React, { useEffect, useState } from 'react';
import { BackedByScience } from '../../models/hair-vitamin';
import { useInViewport } from '../../hooks/useOnScreen';
import { animateNumber } from '../../utils/productv2/provider';
import List from '../productv2/articles/list';
import { ArticleSection } from '../../models/product/productv2';
import LazyLoad from 'react-lazy-load';

interface IProps {
  BackedByScience: BackedByScience[];
}

const BackedByScience = ({ BackedByScience }: IProps) => {
  const { isInViewport, ref } = useInViewport();
  const [selectedArticleSection, setSelectedArticleSection] = useState<BackedByScience>();

  useEffect(() => {
    if (isInViewport) {
      BackedByScience.forEach((item, index) => {
        animateNumber(`sec-${index}-slot-first`, Math.floor(Number(item.percentage) / 10), `luckiefirst${index}`);
        animateNumber(`sec-${index}-slot-second`, Number(item.percentage) % 10, `luckiesecond${index}`);
      })
    }
  }, [isInViewport]);

  return (
    <LazyLoad offset={300}>
      <div className='oziva-pdp-web backed-by-science'>
        <div className='backed-by-science-header'>Our studies <span>Backed By Science</span></div>
        <section className="article-sec backed-by-science-sec" ref={ref}>
          <div className="list-container">
            {BackedByScience.map((item, index) => (<div key={item.id} className="article-item" onClick={() => setSelectedArticleSection(item)}>
              <div className="count" id="counter">
                <div id={`sec-${index}-slot-first`} className="digits digits-first">
                  {new Array(10).fill(0).map((_, index) => <div key={index}>{index}</div>)}
                </div>
                <div id={`sec-${index}-slot-second`} className="digits digits-second">
                  {new Array(10).fill(0).map((_, index) => <div key={index}>{index}</div>)}
                </div>
              </div>
              <div className="title">
                {item.sectionTitle}
              </div>
              <span className="arrow-icon"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right.svg?v=1723614841" /></span>
            </div>))}
          </div>
          {selectedArticleSection &&
            <List articleSection={selectedArticleSection as ArticleSection} onHideModal={() => setSelectedArticleSection(undefined)} />
          }
        </section>
      </div>
    </LazyLoad>
  )
}

export default BackedByScience;