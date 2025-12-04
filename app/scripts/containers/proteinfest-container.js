import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import { Provider as GAProvider } from '../context/gatracking';
import { SentryProvider } from '../context/errorTracking';
import ProteinFestView from '../views/protein-fest';

const rootEl = document.getElementById("proteinfest-container");
const root = createRoot(rootEl);

root.render(<MixpanelProvider>
    <GAProvider>
        <SentryProvider>
            <ProteinFestView />
        </SentryProvider>
    </GAProvider>
</MixpanelProvider>);