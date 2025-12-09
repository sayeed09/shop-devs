import React, { Suspense } from "react";
import ProductClient from "./product";

const ProductView = ({ productData, variantId }) => {
    return <>
        <ProductClient productData={productData} variantId={variantId} />

    </>
}
export default ProductView;