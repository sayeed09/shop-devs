import React from 'react'
import { VariantDetails } from '../../interface/product';
import { ExpertRecommendedTag } from '../../../icons/expert-recommend-tag';

interface IProps {
  item: string;
  getVariantDetails: (val: string) => VariantDetails;
}

const ProductTag = ({item, getVariantDetails}: IProps) => {
  return (
    <>
      {item.length > 0 && (
                    <div
                      className={`ExpertRecommendedTag ${getVariantDetails(item)?.variant?.attractor === 'Expert Recommended' || getVariantDetails(item)?.variant?.attractor === 'FREE Shaker' ? 'expert-recommended-tag' : 'new-launch-tag'}`}
                      style={{
                        visibility: getVariantDetails(item)?.variant?.attractor
                          ? 'visible'
                          : 'hidden',
                      }}
                    >
                      <span className={getVariantDetails(item)?.variant?.attractor === 'Expert Recommended' ? 'expert-recommended-tag-span' : 'new-launched-tag-span'}>
                        <div style={getVariantDetails(item)?.variant?.attractor === 'Expert Recommended' ? {}: {marginLeft: '4px'}}>
                          {getVariantDetails(item)?.variant?.attractor === 'Expert Recommended' || getVariantDetails(item)?.variant?.attractor === 'FREE Shaker' ? <>
                            <ExpertRecommendedTag />
                            {getVariantDetails(item)?.variant?.attractor &&
                              getVariantDetails(item)?.variant?.attractor}
                          </> : <>
                            <img
                              src="https://cdn.shopify.com/s/files/1/2393/2199/files/new_varient_tag_icon_70e79725-d9f4-444a-ba12-a85e71143a28.svg?v=1710495487"
                              width={16}
                              alt="New Launch"
                            />
                            {
                              getVariantDetails(item)?.variant?.attractor &&
                              getVariantDetails(item)?.variant?.attractor
                            }
                          </>}
                        </div>
                      </span>
                    </div>
                  )}
    </>
  )
}

export default ProductTag