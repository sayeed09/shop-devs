import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity-as-nav-for';
import 'flickity-fullscreen';
import parse from 'html-react-parser';
import { InTheNews } from '../../models/home';

interface IProps {
  newsData: InTheNews;
}
const NewsSection = ({newsData}: IProps) => {
  const [options, setOptions] = useState<any>();
  useEffect(() => {
    let intheNewsflickityOptionsMain = {
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      imagesLoaded: true,
      draggable: false,
      asNavFor: '.press_carousel-main',
      initialIndex: 2,
    };
    setOptions(intheNewsflickityOptionsMain)
  }, [])
  const IntheNewsflickityOptionsNav = {
    initialIndex: 2,
    pageDots: false,
    prevNextButtons: false,
  };
  return (
      <div className='in-the-news-container'>
        <>
          <div className='in-the-news-title'>
            {newsData?.title}
          </div>
          <Flickity
            className="press_carousel press_carousel-main"
            elementType={'div'}
            options={IntheNewsflickityOptionsNav}
            reloadOnUpdate
          >
            {newsData?.data.map((item, index) => {
              return (
                <div className="press_carousel-cell in-the-news-subtitle" key={index}>
                  {parse(item.description)}
                </div>
              );
            })}
          </Flickity>
        </>
        {options &&
          <Flickity
            className="press_carousel press_carousel-nav"
            elementType={'div'}
            options={options}
            reloadOnUpdate
          >
            {newsData?.data.map((item, index) => {
              return (
                <div className="press_nav_carousel-cell" key={index}>
                  <img
                    style={{ width: '100%', aspectRatio: '3/1' }}
                    src={item.image}
                    alt="OZiva Press"
                  />
                </div>
              );
            })}
          </Flickity>}
      </div>
  );
};
export default NewsSection;
