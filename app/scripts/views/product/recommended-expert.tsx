import React from 'react'
import { productDetailsModal } from '../../interface/product'
import { convertImageSize } from '../../utils/product/formatter'

interface RecommendedExpertModal{
    productDetail:productDetailsModal
}

const RecommendedExpert = (props:RecommendedExpertModal) => {
    return (
            <>
                {
                    props?.productDetail?.recommendedByExperts?.title ?
                    <div className="product-left-sec recommended-by-experts clearfix">
                        <div className="product-full-width-sec bg-primaryGreenSG400 p-16">
                            <div className="container">
                                <div className="left-align-sec">
                                    <h2 className="mb-8">Recommended By Experts</h2>
                                    <div className="bg-white d-flex p-16 rounded-border">
                                        <div className="pr-16 user-img-cell text-center">
                                            <img src={convertImageSize(props?.productDetail?.recommendedByExperts?.image,400,400)} alt={props?.productDetail?.title} className="rounded-sm expert-recommended-pdp" />
                                        </div>
                                        <div className="experts-text">
                                            <h3 className="mb-8">{props?.productDetail?.recommendedByExperts?.title}
                                            </h3>
                                            <p className="text-off-gray">{props?.productDetail?.recommendedByExperts?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <></>
                }
            </>
    )
}
export default RecommendedExpert