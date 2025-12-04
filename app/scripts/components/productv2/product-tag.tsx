import React from 'react'
import { VariantDetails } from '../../interface/product';
import { ExpertRecommendedTag } from '../../../icons/expert-recommend-tag';

interface IProps {
    item: string;
    getVariantDetails: (val: string) => VariantDetails;
}

const ProductTag = ({ item, getVariantDetails }: IProps) => {
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
                        <div style={getVariantDetails(item)?.variant?.attractor === 'Expert Recommended' ? {} : { marginLeft: '4px' }}>
                            {getVariantDetails(item)?.variant?.attractor &&
                                getVariantDetails(item)?.variant?.attractor}
                        </div>
                    </span >
                </div >
            )}
        </>
    )
}

export default ProductTag