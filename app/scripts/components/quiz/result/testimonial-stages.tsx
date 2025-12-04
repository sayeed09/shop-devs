import React from "react";
import Flickity from "react-flickity-component";


const getHairStages = (stages: string[]) => {
  const LBTflickityOptionsMain = {
    imagesLoaded: true,
    groupCells: 1,
    prevNextButtons: false,
    contain: true,
    pageDots: false,
    lazyLoad: 2,
    autoPlay: false,
  };
  return <section className="homeSection quiz-before-after-section">
    <Flickity
      className="carousel carousel-main"
      elementType={'div'}
      options={LBTflickityOptionsMain}
      reloadOnUpdate
    >
      {stages.map((item, index) => {
        return <>
          <div key={index}><img src={item} alt="Before After" className='w-m-100' /></div>
        </>
      })}
    </Flickity>
  </section>
}
interface Props {
  hairStages: string[]
}
const TestimonialAndStages = ({ hairStages }: Props) => {
  return <>

    {getHairStages(hairStages)}
    <section className='homeSection dr-info-footer'>
      <div className='d-flex quiz-dr-card'>
        <div className='align-item-center'>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/arantxa-img.jpg?v=1707285915" alt="scientifically backed products" className='w-m-100' />
        </div>
        <div>
          <p>This is the end of your diagnosis. With consistent use of scientifically backed products and personalized diet plan, you too can see great results.</p>
        </div>
      </div>
    </section>
  </>
}
export default TestimonialAndStages;