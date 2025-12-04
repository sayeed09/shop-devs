import React from "react";
import { treatmentSteps } from "../../../utils/quiz/provider";
import HairTestArrow from "../../../../icons/hair-test-result";

interface Props {
  beforeImg: string;
  afterImg: string;
  condition: string;
}
const HairGrowthPhase = ({ beforeImg, afterImg, condition }: Props) => {
  return <>
    <section className='homeSection quiz-treatment-sec'>
      <p className='h2'>Expected progress of your treatment plan </p>
      <p className="treatment-sub-title">Treatment Duration - 4 Months</p>
      <div className='quiz-treatment-box'>
        <div className='d-flex'>
          <div className='d-flex quiz-treatment-left'>
            {treatmentSteps.map((item, index) => {
              return <div className='quiz-treatment-steps' key={index}>
                <div className='quiz-treatment-step-img'>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className='quiz-treatment-step-text'>
                  <p className='title'>{item.title}</p>
                  <p className='details'>{item.description}</p>
                </div>
              </div>
            })}
          </div>
          <div className='d-flex quiz-treatment-right'>
            <div className='quiz-treatment-right-top'>
              <div className='quiz-treatment-right-card'>
                <img src={beforeImg} width={81} alt="You are here" />
                <div className='card-text'>You are <span className='fw-bold'>here</span></div>
              </div>
              <div className='quiz-treatment-right-arrow'>
                <div>Get visible results</div>
                <HairTestArrow />
              </div>
              <div className='quiz-treatment-right-card'>
                <img src={afterImg} width={81} alt="After 4 Months" />
                <div className='card-text'>After 4 Months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='homeSection quiz-result-tabs-sec'>
      <p className='h2 fw-bold'>Your treatment plan includes</p>
      <div className="quiz-result-treatment-plan">
        <div className="treatment-plan-coll">
          <p>Clean nutrition products</p>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/clean_nutrition_product_icon_8afa23db-5f2b-4bdd-959f-9f954edc55ab.svg?v=1707288914" alt="Clean nutrition products" />
          <p>for proper nourishment</p>
        </div>
        <div className="treatment-plan-coll">
          <p>Expert guidance</p>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/expert_guidance_icon_2bf9d5d8-03d5-4cbe-ba8b-1469e6d7cb65.svg?v=1707289419" alt="Expert guidance" />
          <p>every step of the way</p>
        </div>
        <div className="treatment-plan-coll">
          <p>Personalized diet plan</p>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/personalized_diet_plan_icon_973843c7-87aa-4f0c-854e-c726aaf5a1ea.svg?v=1707289419" alt="Personalized diet plan" />
          <p>for best results</p>
        </div>
      </div>
    </section>
    <section className='homeSection quiz-result-tabs-sec'>
      <p className='h2 fw-bold'>Hair growth happens in cycle.</p>
      <img src="https://cdn.shopify.com/s/files/1/0366/1004/8044/files/hair_growth_happen_in_cycle.png?v=1707996383" alt="Hair growth happens in cycle." className="d-block w-100 mb-16" />
      <p className="font-medium">It’s important to nourish your health with right nutrients and lifestyle. Don’t worry I have come up with a treatment plan just for you.</p>
    </section>
  </>
}
export default HairGrowthPhase;