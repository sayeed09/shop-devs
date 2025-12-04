import React, { useEffect, useState } from 'react';
import '../../scss/oziva-site.scss';
import '../../scss/home-style.scss';
import ProductRecommendation from '../../components/quiz/result/product-recommendation';
import UserScore from '../../components/quiz/result/user-score';
import RootCause from '../../components/quiz/result/root-cause';
import { quizService } from '../../services/quiz';
import { QuizResultResponse } from '../../models/quiz/quiz-response';
import TestimonialAndStages from '../../components/quiz/result/testimonial-stages';
import Cancel from '../../../icons/cancel-icon-white';
import SearchLoader from '../../components/loaders/search-loader';
import { Moengage } from '../../utils/tracking/gaTracking';
import HairGrowthPhase from '../../components/quiz/result/hair-growth-phase';


const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resultsData, setResultsData] = useState<QuizResultResponse>();

  useEffect(() => {
    Moengage.track_event('hair_test_results_page_view', {
      url: window.location.href
    });
    const searchQuery = new URLSearchParams(window.location.search);
    const caseId = searchQuery.get('caseId');
    if (caseId?.trim())
      fetchQuizResults(caseId as string);
  }, [])

  const fetchQuizResults = async (caseId: string) => {
    const results = await quizService.fetchResult(caseId);
    setResultsData(results?.data);
    setTimeout(() => {
      setIsLoading(false)   //adding delay to loader to look results are being generated on intensive calculations
    }, 2000)
  }

  if (isLoading || !resultsData) {
    return <SearchLoader />
  }

  return (
    <div className='QuizResultPage'>
      <div className="quiz-header result-page-head">
        <div className="quiz-header-container">
          <img src="https://www.oziva.in/cdn/shop/t/10/assets/OZiva_logo_svg.svg?v=40952796546038467691629803346" alt="OZiva Logo" width={119} />
          <div className='title'>Your Diagnosis</div>
          <button className="cancel-quiz" onClick={() => window.location.href = "/"}>
            <Cancel />
          </button>
        </div>
      </div>
      <div className='homeMain'>
        <UserScore user={resultsData.user} hairAnalysis={resultsData.hairAnalysis} />

        <RootCause diagnosis={resultsData.diagnosis} />

        <ProductRecommendation productRecomendations={resultsData.productRecommendations} />

        <HairGrowthPhase beforeImg={resultsData.hairAnalysis.beforeImage} afterImg={resultsData.hairAnalysis.afterImage} condition={resultsData.hairAnalysis.condition} />

        <TestimonialAndStages hairStages={resultsData.hairStageImages} />

      </div>
    </div>
  );
};
export default Result;
