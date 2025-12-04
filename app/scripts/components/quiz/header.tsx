import React from 'react';
import OZivaLogo from '../../../icons/ozivs-log';
import Cancel from '../../../icons/cancel-icon-white';

const Header = () => {
  return (
    <>
      <div className="quiz-header">
        <div className="quiz-header-container">
          <button className="cancel-quiz" onClick={() => history.back()}>
            <Cancel />
          </button>
          <OZivaLogo />
          <p>Take the Hair Test to identify the cause behind your hair fall & hair health.</p>
        </div>
      </div>
      <section className='quiz-benefit-sec'>
        <div className='container-block'>
          <div className='heading'>
            What you get
          </div>
          <div className='quiz-benefit-items'>
            <div className='item'>
              <span className='item-bg'>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/doc_recom_treatment_plan.svg?v=1711021260" />
              </span>
              <span className='title'>
                Doctor recommended treatment plan.
              </span>
            </div>
            <div className='item'>
              <span className='item-bg'>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/clean_nutri_product.svg?v=1711021260" />
              </span>
              <span className='title'>
                Clean nutrition products for best results.
              </span>
            </div>
            <div className='item'>
              <span className='item-bg'>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/expert_guidance_icon_8c9c05b3-bbaa-461d-a22b-664648010ff1.svg?v=1711021260" />
              </span>
              <span className='title'>
                FREE Personalized guidance from experts.
              </span>
            </div>

          </div>
        </div>
      </section >
    </>

  );
};

export default Header;
