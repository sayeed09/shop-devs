import React, { useCallback, useRef, useState } from "react";
import Flickity from "react-flickity-component";
import 'flickity-fullscreen';
import { SectionHeader } from "../common";
import { ImageComparisonModel } from "../../../models/product/productv2";
import Slider from "./slider";
import Buttons from "./buttons";


interface Props {
    imageComparisons: ImageComparisonModel[];
    headerSection: string;
}
const ImageComparison = ({ imageComparisons, headerSection }: Props) => {
    const flickityRef = useRef<Flickity>();

    const setFlickityRef = useCallback((ref: Flickity) => {
        flickityRef.current = ref;
    }, []);

    const handleNext = () => {
        flickityRef?.current?.next();
    }
    const handlePrev = () => {
        flickityRef?.current?.previous();
    }


    return <section className="img-comparion-container">
        <div className="header-container">
            <SectionHeader title={headerSection} />

            <div className="next-prev-btns hide-on-mobile">
                <Buttons
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    imageComparisons={imageComparisons}
                />
            </div>

        </div>
        <Slider setFlickityRef={setFlickityRef} imageComparisons={imageComparisons} />

        <div className="next-prev-btns hide-on-web">

            <Buttons
                handleNext={handleNext}
                handlePrev={handlePrev}
                imageComparisons={imageComparisons}
            />
        </div>
    </section>
}
export default ImageComparison;