'use client';

import React, { lazy, useEffect, useState } from "react";

import { Provider as MixpanelProvider } from '../scripts/context/mixpanelContext';
import { Provider as GAProvider } from '../scripts/context/gatracking';
import { useLocation } from "react-router";
import Collection from "~/scripts/views/collection";
const Categoriesv1 = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])


    return <>
        <MixpanelProvider><GAProvider>
            <div className="page-container">
                <main className="main-content js-focus-hidden" id="MainContent">



                    <div id="shopify-section-index-layout-section-v1" className="shopify-section">





                        {state ? <Collection /> : null}

                    </div>
                </main>

            </div>


        </GAProvider></MixpanelProvider>


    </>
}
export default Categoriesv1;
