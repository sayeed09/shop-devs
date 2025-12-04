import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import { Provider as GAProvider } from '../context/gatracking';
import ConcernCategories from "../views/concern-categories";

const rootEl = document.getElementById("concern-categories-container");
const isConcern = rootEl.getAttribute('data-urlpath') === '/pages/concerns';
const root = createRoot(rootEl); 

root.render(<MixpanelProvider><GAProvider><ConcernCategories isConcern={isConcern}/></GAProvider></MixpanelProvider>);
