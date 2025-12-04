import React from "react";
import ProductV2View from "~/scripts/views/productv2";
import { Provider as MixpanelProvider } from '../scripts/context/mixpanelContext';
import { Provider as GAProvider } from '../scripts/context/gatracking';


const ProductClient = ({ productId }) => {
    return <>
        <MixpanelProvider>
            <GAProvider>
                <ProductV2View productId={productId} />
            </GAProvider>
        </MixpanelProvider>


    </>
}
export default ProductClient;