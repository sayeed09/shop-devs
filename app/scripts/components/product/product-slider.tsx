import React from 'react';
import 'flickity-as-nav-for';
import {
  ProductImageModal,
} from '../../interface/product';
import '../../scss/image-zoom.scss';
import { FastSellingIcon } from '../../../icons/fast-selling';
import EmblaCarousel from '../productv2/product-slider/embla-carousel';
interface ProductSliderModal {
  imageList: ProductImageModal[];
  sellingFastAndTimerNudge: boolean;
}


const ProductSlider = ({ sellingFastAndTimerNudge, imageList }: ProductSliderModal) => {

  return (
    <div className="sticky-top">
      <EmblaCarousel imageList={imageList} />
      {sellingFastAndTimerNudge === true && (
        <div className="FastSellingIcon">
          <span>
            <FastSellingIcon />
          </span>
          Selling fast, last 23 units left
        </div>
      )}
    </div>
  );
};
export default ProductSlider;