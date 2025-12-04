import React from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import Flickity from "react-flickity-component";
import { ImageComparisonModel } from "../../../models/product/productv2";
import { comparisonsSliderOptions } from "../../../utils/productv2/provider";

interface props {
    imageComparisons: ImageComparisonModel[];
    setFlickityRef: (ref: Flickity) => void;
}

const Slider = ({ imageComparisons, setFlickityRef }: props) => (
    <Flickity
        className="carousel carousel-main"
        elementType={'div'}
        options={comparisonsSliderOptions()}
        reloadOnUpdate
        flickityRef={setFlickityRef}
    >
        {imageComparisons.map((item, index) => <div key={index} className={`carousel-item ${index == imageComparisons.length - 1 ? 'carousel-last-item' : ''}`}>
            <ReactCompareSlider
                itemOne={
                    <ReactCompareSliderImage
                        src={item.image1}
                        alt="Image one"
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                        src={item.image2}
                        alt="Image two"

                    />
                }
                onlyHandleDraggable
            />
            <div className="overlay-txt">Swipe</div>
        </div>)}

    </Flickity>
)
export default Slider;