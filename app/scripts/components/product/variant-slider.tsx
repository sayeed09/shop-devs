import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/product';
import { setProductModel, setSelectedImage } from '../../actions/product';
import { ProductImageModal } from '../../interface/product';

const VariantSliderItem = (props: any) => {
  const { variantOption } = props;
  const { dispatch: productDispatch } = useContext(ProductContext);
  const [prodImg, setProdImg] = useState<ProductImageModal>();
  useEffect(() => {
    displayVariantImage();
  }, [variantOption]);
  const displayVariantImage = () => {
    props.productDetails.images?.map((prodImage: any, i: number) => {
      if (variantOption.imageId == prodImage.id) {
        setProdImg(prodImage);
      }
    });
  };
  const setActiveVariantOpt = (variant: any) => {
    props.setIsactiveId(variant.id);
    props.buySubscription(variant.id);
    productDispatch(setProductModel(variantOption));
    const url = new URLSearchParams(window.location.search);
    url.set('variant', variantOption.id);
    window.history.replaceState(
      {},
      '',
      decodeURIComponent(`${window.location.pathname}?${url}`),
    );
    flikyIndex();
  };
  const flikyIndex = () => {
    props.productDetails.images?.map((image: any, i: number) => {
      if (variantOption.imageId == image.id) {
        props.setCarouselIndex(i);
        productDispatch(setSelectedImage(image));
      }
    });
  };
  return (
    <div
      className={props.isActive ? 'carousel-cell active' : 'carousel-cell'}
      onClick={() => setActiveVariantOpt(variantOption)}
    >
      <div className="bg-white text-center oz-product-img">
        <img src={prodImg?.src} alt="Product Name" className="w-100" />
      </div>
      <div className="p-8 pb-0">
        <p className="text-off-gray products-list-title mb-8">
          {variantOption.title}
        </p>
        <h4 className="mb-0">{props.productDetails.title}</h4>
        <div className="products-list-price-dtl">
          <p>
            <span className="text-off-gray">
              <span className="f-12">MRP:</span>
              <span className="strike">₹{variantOption.compareAtPrice}</span>
            </span>
            <span className="f-14 font-medium">₹{variantOption.price}</span>
          </p>
          <p className="text-orangeVibrantShade mb-0">
            You Save : ₹{variantOption.compareAtPrice - variantOption.price}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VariantSliderItem;
