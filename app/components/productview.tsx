import React, { Suspense } from "react";
import ProductClient from "./product.client";

const ProductView = ({ productId }) => {
    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <ProductClient productId={productId} />
        </Suspense>

    </>
}
export default ProductView;