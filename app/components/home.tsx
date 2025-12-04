
import React, { useEffect, useState } from "react";
import HomeView from "~/scripts/views/home/index.client";


const HomepageV1 = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    return <>
        <div className="page-container">
            <main className="main-content js-focus-hidden" id="MainContent">



                <div id="shopify-section-index-layout-section-v1" className="shopify-section">

                    {state ? <HomeView /> : null}




                </div>
            </main>

        </div>

    </>
}
export default HomepageV1;