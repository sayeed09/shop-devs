import React from 'react';
import CapsuleIcon from '../../../icons/capsule_icon';
import { ProductInformation } from '../../models/hair-vitamin';
import LazyLoad from 'react-lazy-load';
import { ResponsiveImage } from '../productCard/responsive-image';
import { bubbleImageBreakPoints, productCardBreakPoints } from '../../utils/data-provider';

interface IProps {
  productInformation: ProductInformation[];
  benefits: string[] | undefined;
}
const HVProduct = ({ productInformation, benefits }: IProps) => {
  return (
    <LazyLoad offset={300}>
      <div className='hv-product-container'>
        <div className='hv-product-title'>
          2 Capsules Every Day for {' '}
          <span className='hv-product-bold-title'>
            4 Months!</span>
        </div>

        <div className='hv-product-item-container'>
          <div className='hv-product-img'>
            <ResponsiveImage altText={`HV Product image`} imageURL={`https://cdn.shopify.com/s/files/1/0366/1004/8044/files/hv-product.png?v=1729289399`} widthHeightObject={productCardBreakPoints} loading='lazy' />
            <div className='hv-product-text'><CapsuleIcon />2 Capsules after lunch</div>
            <div className='benefit-container'>
              {benefits?.map((item) => <span className='benefit-item'>
                <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Tick_mark.svg?v=1733403333' />
                {item}</span>)}
            </div>
          </div>

          <div className='hv-product-information'>
            {productInformation.map(item => {
              return (
                <div key={item.id} className='hv-product-item'>
                  <div className='hv-product-item-left'>
                    <ResponsiveImage altText={item.months} imageURL={item.image} widthHeightObject={bubbleImageBreakPoints} />
                  </div>
                  <div className='hv-product-divider'>
                    <div className='hv-product-vertical-line'></div>
                    <div className='hv-product-arrow'></div>
                  </div>
                  <div className='hv-product-item-right'>
                    <div className='hv-product-item-right-title'><span>{item.months}</span></div>
                    <div className='hv-product-item-right-content'>{item.information}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </LazyLoad>
  )
}

export default HVProduct