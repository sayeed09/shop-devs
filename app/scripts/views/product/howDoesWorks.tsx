import React from 'react'
import HowDoesWorksItem from '../../components/product/howDoesWorksItem'
import { HighlightElement, productDetailsModal } from '../../interface/product'
import PDPAdditionDetailsSkeleton from '../../components/loaders/pdp-additional-details-skeleton'

interface HowDoesWorksModal {
    productDetail: productDetailsModal
    isLoading: boolean;
}

const HowDoesWorks = (props: HowDoesWorksModal) => {

    if (props.isLoading) {
        return (
          <div className='rounded-sm product-left-sec borderGray border p-16 pdp-gif-sec'>
            <PDPAdditionDetailsSkeleton />
          </div>
        )
      }
    return (
            <>
                {props?.productDetail?.howItWorks?.data.length > 0 ?
                <div className="rounded-sm product-left-sec borderGray border p-16 pdp-gif-sec">
                    <h2 className="mb-8">{props?.productDetail?.howItWorks?.title}</h2>
                    <div className="d-flex">
                        {props?.productDetail?.howItWorks?.data?.map((data: HighlightElement, i: number) => {
                            return (<HowDoesWorksItem data={data} key={i} />)
                        })}
                    </div>
                </div>
                : <></>}
            </>
    )
}
export default HowDoesWorks