import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import { Provider as GAProvider } from '../context/gatracking';
import FrontpageCollection from "../views/collection/frontpageCollection";

const rootEl = document.getElementById("new-collection-container");
const root = createRoot(rootEl); 

root.render(<MixpanelProvider><GAProvider><FrontpageCollection /></GAProvider></MixpanelProvider>);