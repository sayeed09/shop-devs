import React from 'react'
import { isMobile } from '../../utils/helper'
import { ResponsiveImage } from '../productCard/responsive-image'
import { bannerBreakPoints } from '../../utils/data-provider'
import LazyLoad from 'react-lazy-load'

export const ConsistencyIsKey = () => {
  return (
    <LazyLoad offset={300}>
      <div className='consistency-is-the-key-banner'>
        {isMobile() ? <ResponsiveImage imageURL='https://cdn.shopify.com/s/files/1/0366/1004/8044/files/consistency-is-the-key-banner.png?v=1729285451' altText='Consistency is the key Mobile' widthHeightObject={bannerBreakPoints} loading='lazy'/> :
         <ResponsiveImage imageURL='https://cdn.shopify.com/s/files/1/2393/2199/files/web_mihir.png?v=1731309010' altText='Consistency is the key web' widthHeightObject={bannerBreakPoints} loading='lazy'/>}
      </div>
    </LazyLoad>
  )
}
