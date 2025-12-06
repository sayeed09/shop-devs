
import React, { lazy, useEffect, useState } from "react";

const DisclaimerV1 = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    return <>
        <main className="main-content js-focus-hidden" id="MainContent" tabIndex={-1}>
            {/*<div class="messenger_float_custom" style="position: fixed !important; width: 100%; max-width: 130px; z-index: 99; right: 2%; bottom: 2%; transform: none !important;"><a href="https://goo.gl/pTJgtW"><img src="https://fitcircle.in/fitcircle/images/messageus.png" style="width: 100%;" alt="OZiva | No.1 Choice for Clean, Plant based Nutrition & Beauty Products" /></a></div>*/}
            <div className="page-width">
                <div className="grid">
                    <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                        <div className="section-header text-center">
                            <h1>Disclaimer Policy</h1>
                        </div>
                        <div className="rte">
                            <section className="main staticPage">
                                <div className="container">
                                    <div>
                                        <strong>Product -</strong>
                                    </div>
                                    <div>
                                        <strong>&nbsp;</strong>
                                    </div>
                                    <div>
                                        All images are for aesthetic purposes only. The statements have
                                        not been evaluated by the FDA. This product is not intended to
                                        diagnose, treat, cure or prevent any disease. Children and
                                        elderly should consult doctor before use.
                                    </div>
                                    <div>&nbsp;</div>
                                    <div>
                                        <strong>&nbsp;</strong>
                                    </div>
                                    <div>
                                        <strong>General -&nbsp;</strong>
                                    </div>
                                    <div>
                                        <strong>&nbsp;</strong>
                                    </div>
                                    <div>
                                        The information contained in this website is for general
                                        information purposes only. The information is provided by OZiva.
                                        and while we endeavour to keep the information up to date and
                                        correct, we make no representations or warranties of any kind,
                                        express or implied, about the completeness, accuracy,
                                        reliability, suitability or availability with respect to the
                                        website or the information, products, services, or related
                                        graphics contained on the website for any purpose. Any reliance
                                        you place on such information is therefore strictly at your own
                                        risk.
                                    </div>
                                    <div>&nbsp;</div>
                                    <div>
                                        In no event will we be liable for any loss or damage including
                                        without limitation, indirect or consequential loss or damage, or
                                        any loss or damage whatsoever arising from loss of data or
                                        profits arising out of, or in connection with, the use of this
                                        website.
                                    </div>
                                    <div>&nbsp;</div>
                                    <div>
                                        Through this website you are able to link to other websites
                                        which are not under the control of OZiva. We have no control
                                        over the nature, content and availability of those sites. The
                                        inclusion of any links does not necessarily imply a
                                        recommendation or endorse the views expressed within them.
                                    </div>
                                    <div>&nbsp;</div>
                                    <div>
                                        Every effort is made to keep the website up and running
                                        smoothly. However, OZiva takes no responsibility for, and will
                                        not be liable for, the website being temporarily unavailable due
                                        to technical issues beyond our control.
                                    </div>
                                    <div />
                                    <div />
                                    <div>
                                        <a href="https://www.oziva.in/pages/disclouse-page-1">
                                            Disclosure
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>



    </>
}
export default DisclaimerV1;
