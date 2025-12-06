
import React, { lazy, useEffect, useState } from "react";

const AboutUsV1 = () => {
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
                            <h1>About Us</h1>
                        </div>
                        <div className="rte">
                            <section>
                                <div className="radio-container">
                                    <div>
                                        <span color="#000000">
                                            At OZiva, we're committed to supporting every single person
                                            who wants to be a better version of themselves - because
                                            <span>&nbsp;</span>
                                            <b>we firmly believe there's more to everyone</b>
                                            .&nbsp;&nbsp;As you move ahead in your journey of #aBetterYou,
                                            we want to ensure that you achieve the best fitness,
                                            physically &amp; mentally, with&nbsp;
                                            <b>High Quality Clean Nutrition</b>&nbsp;- the one that your
                                            body truly deserves.&nbsp;&nbsp;
                                        </span>
                                    </div>
                                    <div>
                                        <span color="#000000">&nbsp;</span>
                                    </div>
                                    <div>
                                        <span style={{ color: "#6bbd5e" }}>
                                            <strong>
                                                <span color="#000000">This is our commitment to you.</span>
                                            </strong>
                                        </span>
                                    </div>
                                    <div>
                                        <div>
                                            <span color="#000000">
                                                <br />
                                            </span>
                                            <div>
                                                <b>
                                                    <span color="#000000">Clean, Plant Based</span>
                                                </b>
                                            </div>
                                            <div>
                                                <span color="#000000">
                                                    Staying away from preservatives, artificial sweeteners,
                                                    colors, allergens&nbsp; - we source the most authentic
                                                    ingredients from farms across the globe to ensure you get
                                                    the Clean Nutrition to live an active life
                                                </span>
                                            </div>
                                            <div>
                                                <b>
                                                    <span color="#000000">&nbsp;</span>
                                                </b>
                                            </div>
                                            <div>
                                                <b>
                                                    <span color="#000000">Based on Ayurveda&nbsp;</span>
                                                </b>
                                            </div>
                                            <div>
                                                <span color="#000000">
                                                    Combining thousands of years of Ayurvedic wisdom &amp; the
                                                    Modern day foods - we create products that give you the
                                                    benefits of both the sciences&nbsp;
                                                </span>
                                            </div>
                                            <div>
                                                <span color="#000000">&nbsp;</span>
                                            </div>
                                            <div>
                                                <b>
                                                    <span color="#000000">Going beyond the products</span>
                                                </b>
                                            </div>
                                            <div>
                                                <span color="#000000">
                                                    Our complete ecosystem offers more than the products -
                                                    Free diet consultation digitally and guidance from experts
                                                    to keep you motivated and to help you on your journey of
                                                    being better.&nbsp;
                                                </span>
                                            </div>
                                            <div>
                                                <span color="#000000">&nbsp;</span>
                                            </div>
                                            <div>
                                                <span color="#000000" />
                                                <br />
                                            </div>
                                            <div>
                                                <span color="#000000">
                                                    <b>
                                                        <i>
                                                            OZiva's 100% clean, natural products are sold by Zywie
                                                            Ventures Private Ltd.
                                                            <br />
                                                        </i>
                                                    </b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span>&nbsp;</span>
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
export default AboutUsV1;
