import React, { useContext } from 'react';
import { ProductContext } from '../../context/product';
import { productDetailsModal } from '../../interface/product';
import ProductLeftContent from './product-left-content';
import RightStickyCard from './product-right-sticky';

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

const ProductBottomSectionV2 = (props: ProductBottomSectionModal) => {
    const { state: productState } = useContext(ProductContext);

    return (
        <div className="container page-content-sec">
            <div className="row">
                <ProductLeftContent
                    productId={props.productId}
                    initialScroll={props.initialScroll}
                    productDetail={props.productDetail}
                    isLoading={props.isLoading}
                    buyNowVariant={props.buyNowVariant}
                />
                <RightStickyCard
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
export default ProductBottomSectionV2;