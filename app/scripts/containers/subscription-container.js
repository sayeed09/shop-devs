import { createRoot } from 'react-dom/client';
import React from "react";
import SubscriptionView from "../views/subscription"
import { Provider as MixpanelProvider } from '../context/mixpanelContext';

const rootEl = document.getElementById("product-container");
const productID = rootEl.getAttribute("data-productId") || ''
const root = createRoot(rootEl); 

root.render(<MixpanelProvider disableSdk={true} ><SubscriptionView productId={productID} /></MixpanelProvider>, rootEl);