import React from 'react';
import { LovedByMillionSection } from '../../models/home';
import Flickity from 'react-flickity-component';
import 'flickity-fullscreen';
import LazyLoad from 'react-lazy-load';
interface IProps {
  lovedByMillion: LovedByMillionSection;
  title?: string;
}
const LBTflickityOptionsMain = {
  imagesLoaded: true,
  groupCells: true,
  prevNextButtons: true,
  contain: true,
  pageDots: false,
  lazyLoad: 2,
  autoPlay: 5000,
};

const LovedByMillion = ({lovedByMillion}: IProps) => {

  return (
    <>
      <LazyLoad offset={300}>
        <div className='loved-by-millions-container'>
          <div className='loved-by-millions-title'>{lovedByMillion.title}</div>
          {/* <div className='loved-by-millions-subtitle'>
            {lovedByMillion.subtitle}
          </div> */}
          <div className="carousel_lovedby_container">
            <Flickity
              className="carousel carousel-main"
              elementType={'div'}
              options={LBTflickityOptionsMain}
              reloadOnUpdate
            >
              {lovedByMillion.data.map((item, index) => {
                return (
                  <div className="carousel_lovedby_card" key={index}>
                    <div className="lovedby_card_image">
                      <video preload="metadata" poster={item.thumbnail} controls={true}>
                        <source src={item.video} type="video/mp4"></source>
                      </video>
                      <div className="lbm-dtl">
                        <p className="lbm-txt">{item.review}</p>
                        <p className="lbm-title">{item.customerName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Flickity>
          </div>
        </div>
      </LazyLoad>
    </>
  );
};
export default LovedByMillion;
