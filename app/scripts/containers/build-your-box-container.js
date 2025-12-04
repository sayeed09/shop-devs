import { createRoot } from 'react-dom/client';
import React from "react";
import BuildYourBox from "../views/build-your-box";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import ProductView from "../views/product"
import { Provider as GAProvider } from '../context/gatracking';

const rootEl = document.getElementById("build-your-container");
const root = createRoot(rootEl);

root.render(
    <MixpanelProvider>
        <GAProvider>
            <BuildYourBox />
        </GAProvider>
    </MixpanelProvider>
    , rootEl);
