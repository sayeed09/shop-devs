import React from 'react';
import {
    ProductImageModal,
} from '../../interface/product';
import '../../scss/image-zoom.scss';
import { FastSellingIcon } from '../../../icons/fast-selling';
import 'photoswipe/style.css';
import EmblaCarousel from './product-slider/embla-carousel';
import { isMobile } from '../../utils/helper';
interface ProductSliderModal {
    imageList: ProductImageModal[];
    sellingFastAndTimerNudge: boolean;
    noFullScreenIcon?: boolean;
}

const ProductSlider = ({ sellingFastAndTimerNudge, imageList, noFullScreenIcon }: ProductSliderModal) => {
    return (
        <div className="sticky-top">
            <EmblaCarousel imageList={imageList} noFullscreen={noFullScreenIcon} />
            {
                sellingFastAndTimerNudge === true && (
                    <div className="FastSellingIcon">
                        <span>
                            <FastSellingIcon />
                        </span>
                        Selling fast, last 23 units left
                    </div>
                )
            }
        </div >
    );
};
export default ProductSlider;