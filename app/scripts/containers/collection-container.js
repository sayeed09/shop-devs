import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import { Provider as GAProvider } from '../context/gatracking';
import Collection from "../views/collection";

const rootEl = document.getElementById("collection-container");
const root = createRoot(rootEl); 

root.render(<MixpanelProvider><GAProvider><Collection /></GAProvider></MixpanelProvider>);