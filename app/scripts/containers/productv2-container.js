import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import ProductV2View from "../views/productv2"
import { Provider as GAProvider } from '../context/gatracking';

const rootEl = document.getElementById("product-container");
const productID = rootEl.getAttribute("data-productId") || ''
const productImage = rootEl.getAttribute("data-productImage") || '';
const loadingImage = rootEl.getAttribute("data-loadingImage") || '';
const loadingText = rootEl.getAttribute("data-loadingText") || '';

const root = createRoot(rootEl);

root.render(<MixpanelProvider>
    <GAProvider>
        <ProductV2View productId={productID} productImage={productImage} loadingImage={loadingImage} loadingText={loadingText} />
    </GAProvider>
</MixpanelProvider>);