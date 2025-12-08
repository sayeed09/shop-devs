import React, { Suspense } from "react";
import ProductClient from "./product";

const ProductView = ({ productData }) => {
    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <ProductClient productData={productData} />
        </Suspense>

    </>
}
export default ProductView;