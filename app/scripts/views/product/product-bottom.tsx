import React, { useContext } from 'react';
import ProductLeftContent from './left-content';
import ProductRightContent from './right-content';
import { ProductContext } from '../../context/product';
import { productDetailsModal } from '../../interface/product';

interface ProductBottomSectionModal {
  productId: string;
  buyNowVariant: (variantId: string) => void;
  isShowLoading: boolean;
  setBuyButtonLoader: (btnLoader: string) => void;
  buttonLoader: string;
  initialScroll: () => void;
  productDetail: productDetailsModal;
  isItemAdded: boolean;
  isLoading: boolean;
}

const ProductBottomSection = (props: ProductBottomSectionModal) => {
  const { state: productState } = useContext(ProductContext);
  return (
    <div className="container page-content-sec">
      <div className="row">
        <ProductLeftContent
          productId={props.productId}
          initialScroll={props.initialScroll}
          productDetail={props.productDetail}
          isLoading={props.isLoading}
        />
        <ProductRightContent
          productState={productState}
          buyNowVariant={props.buyNowVariant}
          isShowLoading={props.isShowLoading}
          setBuyButtonLoader={props.setBuyButtonLoader}
          buttonLoader={props.buttonLoader}
          isItemAdded={props.isItemAdded}
          productDetail={props.productDetail}
        />
      </div>
    </div>
  );
};
export default ProductBottomSection;
