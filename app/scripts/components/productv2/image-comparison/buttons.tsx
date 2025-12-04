import React, { useCallback, useEffect, useState } from "react";
import { ImageComparisonModel } from "../../../models/product/productv2";
import Flickity from "react-flickity-component";

interface Props {
    handlePrev: () => void;
    handleNext: () => void;
    imageComparisons: ImageComparisonModel[];
}

const Buttons = ({ handlePrev, handleNext, imageComparisons }: Props) => {
    const [currentIndx, setCurrentIndx] = useState(0);

    const onhandlePrev = () => {
        if (currentIndx > 0) {
            setCurrentIndx((currentIndx) => currentIndx - 1);
            handlePrev();
        }
    }
    const onhandleNext = () => {
        if (currentIndx < imageComparisons.length - 1) {
            setCurrentIndx((currentIndx) => currentIndx + 1)
            handleNext();
        }
    }
    return <>
        <span className={`${currentIndx == 0 ? 'disabled' : ''} sec-btn`} onClick={() => onhandlePrev()}><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/left-arrow.svg?v=1723565978" /></span>
        <span className={`${currentIndx == imageComparisons.length - 1 ? 'disabled' : ''} sec-btn`} onClick={() => onhandleNext()}><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/right-arrow.svg?v=1723565917" /></span>
    </>
};

export default Buttons;