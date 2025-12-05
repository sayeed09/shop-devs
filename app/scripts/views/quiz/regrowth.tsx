import React, { useEffect } from 'react';
import '../../scss/oziva-site.scss';
import '../../scss/home-style.scss';
import LovedByMillion from '../../components/home/loved-by-million';
import { HAIR_QUIZ_RESULT_KEY, beforeAfterImages, lbt } from '../../utils/quiz/provider';
import { getFromLocalStorage, isMobile } from '../../utils/helper';
import Flickity from 'react-flickity-component';
import { Moengage } from '../../utils/tracking/gaTracking';


const Regrowth = () => {
    const resultCaseId = getFromLocalStorage(HAIR_QUIZ_RESULT_KEY);
    const LBTflickityOptionsMain = {
        imagesLoaded: true,
        groupCells: 1,
        prevNextButtons: false,
        contain: true,
        pageDots: isMobile() ? true : false,
        lazyLoad: 2,
        autoPlay: false,
    };

    useEffect(() => {
        (window as any).Moengage.track_event('hair_test_landing_page_view', {});
    }, []);
    return (
        <div className='QuizResultPage QuizLandingPage regrowthLanding'>
            <section onClick={() => {
                (window as any).Moengage.track_event('hair_test_landing_page_test', {});
                window.location.href = `/pages/hair-test/1?ref=landing_page`;
            }} className='QuizLandingPage-banner-section position-relative'>
                <img src={require('../../../assets/landing_page_web.png').default} alt="Oziva" className='hide-on-mobile w-100' />
                <img src={require('../../../assets/landing_page_mobile.png').default} alt="Oziva" className='hide-on-web w-100' />
                <div className='QuizLandingPage-banner-buttons'>
                    {resultCaseId && <button onClick={(e) => {
                        e.stopPropagation()
                        (window as any).Moengage.track_event('hair_test_landing_page_results', {});
                        window.location.href = `/pages/hair-test/result?caseId=${resultCaseId}&ref=landing_page`;
                    }} className='btn view-result-button'>VIEW YOUR RESULT</button>}
                </div>
            </section>

            <div className='homeMain'>
                <section className="homeSection lovedByMillionSection d-none">
                    {/* <LovedByMillion lovedByMillion={lbt.lbt} title="What Our Customers Have To Say" /> */}
                </section>


                <section className="homeSection test-landing-page quiz-before-after-section pt-64 pt-32">
                    <p className="h2">Success Stories</p>
                    <Flickity
                        className="carousel carousel-main hair-regrowth"
                        elementType={'div'}
                        options={LBTflickityOptionsMain}
                        reloadOnUpdate
                    >
                        {beforeAfterImages.map((item, index) => {
                            return <>
                                <div key={index}><img src={item} alt="Before After" className='w-m-100' /></div>
                            </>
                        })}

                    </Flickity>
                </section>
            </div>
        </div >
    );
};
export default Regrowth;
