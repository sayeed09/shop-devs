import React from "react";
import { getFromLocalStorage } from "../../utils/helper";
import { HAIR_QUIZ_RESULT_KEY } from "../../utils/quiz/provider";
import { Moengage } from '../../utils/tracking/gaTracking';

interface Props {
    className?: string;
    refUrl: string;
}
const HairTestBanners = ({ className, refUrl }: Props) => {
    const resultCaseId = getFromLocalStorage(HAIR_QUIZ_RESULT_KEY);

    return <div className={`${className ? className : 'pt-64 pt-m-32 homepage'}`}>
        <section onClick={() => {
            (window as any).Moengage.track_event('hair_test_entry_homepage', {});
            window.location.href = `/pages/hair-test/1?ref=${refUrl}`;
        }} className='homeMain QuizLandingPage-banner-section position-relative'>
            <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/hair_test_homepage_web.png?v=1716205074'} alt="Oziva" className='hide-on-mobile w-100' />
            <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/hair_test_homepage_mobile.png?v=1716205075'} alt="Oziva" className='hide-on-web w-100' />
            <div className='QuizLandingPage-banner-buttons'>

            </div>
        </section>
    </div>
}

export default HairTestBanners;