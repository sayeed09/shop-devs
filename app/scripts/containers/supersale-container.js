import { createRoot } from 'react-dom/client';
import React from "react";
import { Provider as MixpanelProvider } from '../context/mixpanelContext';
import { Provider as GAProvider } from '../context/gatracking';
import { SentryProvider } from '../context/errorTracking';
import SupersaleView from '../views/supersale';

const rootEl = document.getElementById("supersale-container");
const root = createRoot(rootEl);

root.render(<MixpanelProvider>
    <GAProvider>
        <SentryProvider>
            <SupersaleView />
        </SentryProvider>
    </GAProvider>
</MixpanelProvider>);