import React from 'react'
import { productDetailsModal } from '../../interface/product'
import { convertImageSize } from '../../utils/product/formatter'
import { SectionHeader } from './common'

interface RecommendedExpertModal {
    productDetail: productDetailsModal
}

const RecommendedExpert = (props: RecommendedExpertModal) => {
    return (
        props?.productDetail?.recommendedByExperts?.title ?
            <section className="recommended-by-experts-sec clearfix">
                <SectionHeader title={<p>Recommended by <strong>Experts</strong></p>} />
                <div className='content-sec'>
                    <img src={props?.productDetail?.recommendedByExperts?.image} alt={props?.productDetail?.title} className="rounded-sm expert-recommended-pdp" />
                    <div className='desc-container'>
                        <p className="desc">{props?.productDetail?.recommendedByExperts?.description}</p>
                        <p className="title">{props?.productDetail?.recommendedByExperts?.title}</p>
                    </div>
                </div>
            </section >
            : <></>
    )
}
export default RecommendedExpert