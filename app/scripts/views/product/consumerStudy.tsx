import * as React from 'react';
import ConsumerItem from '../../components/product/consumer-study-item';
import { ConsumerDataModal, productDetailsModal } from '../../interface/product';

interface ConsumerStudyModal {
    productDetail: productDetailsModal
}

const ConsumerStudy = (props: ConsumerStudyModal) => {
    return (
            <>
                {props?.productDetail?.consumerStudy?.data?.length > 0 ?
                <div className="rounded-sm consumer-study-sec product-left-sec borderGray border p-16">
                    <h2 className='mb-0'>{props?.productDetail?.consumerStudy?.title}</h2>
                    <p className="text-off-gray mb-16 subtext">{props?.productDetail?.consumerStudy?.subtext}
                    </p>
                    <div className="d-flex">
                        {props?.productDetail?.consumerStudy?.data.map((data: ConsumerDataModal, i: number) => {
                            return(<ConsumerItem data={data} key={i} />)
                        })}
                    </div>
                </div>
                : <></>}
            </>
    )
}
export default ConsumerStudy