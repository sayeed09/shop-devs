import React from 'react'
import { HighlightElement } from '../../interface/product'
import { convertImageSize } from '../../utils/product/formatter'

interface HowDoesWorksItemModal {
    data: HighlightElement
}

const HowDoesWorksItem = (props: HowDoesWorksItemModal) => {
    return (
        <div className="gif-boxes">
            <div className="rounded-sm gif-boxes-inner text-center">
                <img src={convertImageSize(props?.data?.image,313,313)} />
            </div>
            {/* <h4>1 - 4 Weeks</h4> */}
            <p className="f-14">{props?.data?.description}</p>
        </div>
    )
}
export default HowDoesWorksItem