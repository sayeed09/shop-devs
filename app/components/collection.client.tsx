
import React, { lazy, useEffect, useState } from "react";


import { Provider as MixpanelProvider } from '../scripts/context/mixpanelContext';
import { Provider as GAProvider } from '../scripts/context/gatracking';
import { useLocation } from "react-router";
import BuildYourBox from "~/scripts/views/build-your-box";
import Collection from "~/scripts/views/collection";
const CollectionV1 = () => {
    const location = useLocation();

    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    console.log(location.pathname, 'haaa')
    return <>
        {state ?
            <div className="page-container">

                <MixpanelProvider><GAProvider>
                    <main className="main-content js-focus-hidden" id="MainContent">



                        <div id="shopify-section-index-layout-section-v1" className="shopify-section">






                            <>

                                {!location.pathname.includes('build-your-box') && !location.pathname.includes('build-your-own-box') ? <Collection />
                                    : <BuildYourBox />}
                            </>




                        </div>
                    </main>

                </GAProvider></MixpanelProvider>
            </div> : null}

    </>
}
export default CollectionV1;
