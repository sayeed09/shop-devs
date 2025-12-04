import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import ProductView from "../views/product"
import { Provider as GAProvider } from '../context/gatracking';

const rootEl = document.getElementById("product-container");
const productID = rootEl.getAttribute("data-productId") || ''
const productImage = rootEl.getAttribute("data-productImage") || ''
const root = createRoot(rootEl);

root.render(<MixpanelProvider>
    <GAProvider>
        <ProductView productId={productID} productImage={productImage} />
    </GAProvider>
</MixpanelProvider>, rootEl);
