'use client';

import React, { lazy, useEffect, useState } from "react";

import { Provider as MixpanelProvider } from '../scripts/context/mixpanelContext';
import { Provider as GAProvider } from '../scripts/context/gatracking';
import CashDealView from "~/scripts/views/cash-deal";
const CashDealV1 = () => {

    return <>
        <MixpanelProvider><GAProvider>
            <div className="page-container">
                <main className="main-content js-focus-hidden" id="MainContent">



                    <div id="shopify-section-index-layout-section-v1" className="shopify-section">




                        <CashDealView /> 

                    </div>
                </main>

            </div>


        </GAProvider></MixpanelProvider>


    </>
}
export default CashDealV1;
