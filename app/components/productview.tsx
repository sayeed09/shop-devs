import React, { Suspense } from "react";
import ProductClient from "./product";

const ProductView = ({ productData, variantId, isMobile }) => {
    return <>
        <ProductClient productData={productData} variantId={variantId} isMobile={isMobile} />

    </>
}
export default ProductView;