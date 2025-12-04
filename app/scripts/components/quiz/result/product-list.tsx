import React, { useCallback, useState, useRef } from "react";
import { IProductReviewObject, ProductResponseModal } from "../../../interface/product";
import { formatPriceWithCurrency } from "../../../utils/cart/formatter";
import { TickIcon } from '../../../../icons/tickIcon';
import Flickity from "react-flickity-component";
import { isMobile } from "../../../utils/helper";
import { Moengage } from "../../../utils/tracking/gaTracking";


interface Props {
  productResponseList: ProductResponseModal[];
  reviews: IProductReviewObject[];
}
const ProductList = ({ productResponseList, reviews }: Props) => {
  const flickityRef = useRef<Flickity>();
  let prevIndex = 0;

  const LBTflickityOptionsMain = {
    imagesLoaded: true,
    groupCells: isMobile() ? 1 : 3,
    prevNextButtons: false,
    contain: true,
    pageDots: isMobile() && productResponseList.length > 1 ? true : false,
    lazyLoad: 1,
    autoPlay: 5000,
  };

  const handleOnChange = (index: number) => {
    const value = [{
      productTitle: productResponseList[index].data.title,
      productId: productResponseList[index].data.id,
      variantId: productResponseList[index].data.variants[0].id,
    }];
    let eventName = '';
    if (prevIndex > index) {
      eventName = `hair_test_product_recommendation_prev`;
    } else if (prevIndex < index) {
      eventName = `hair_test_product_recommendation_next`;
    }
    Moengage.track_event(eventName, {value: value});
    prevIndex = index;
  }

  const setFlickityRef = useCallback((ref: Flickity) => {
    flickityRef.current = ref;

    flickityRef.current?.on("change", handleOnChange);
  }, []);

  return <>
    <section className='homeSection result-product-section'>
      <p className='h2 fw-bold'>
        How these products will help you
        <span className="treatment-sub-title font-normal text-black hide-on-mobile ml-16" style={{ fontFamily: 'Roboto', fontWeight: 400 }}>({productResponseList.length} {productResponseList.length > 1 ? 'Products' : 'Product'})</span>
      </p>
      <p className="treatment-sub-title hide-on-web">({productResponseList.length} {productResponseList.length > 1 ? 'Products' : 'Product'})</p>
      <Flickity
        className="carousel carousel-main"
        elementType={'div'}
        options={LBTflickityOptionsMain}
        reloadOnUpdate
        flickityRef={setFlickityRef}
      >
        {productResponseList.map((item) => {
          const { id, howToUse, whatMakesItGood, title, images } = item.data;
          const currentReview = reviews.find((review) => review.id == id)
          return <div className='prod-cards-v4-lists' key={id}>
            <div className='prod-card-v4' key={id}>
              <div className="prod-lists-top">
                <div className='prod-card-v4-img'>
                  <img src={images[0]?.src} alt={title} width={150} />
                </div>
                <div className="prod-lists-top-right">
                  <div className='prod-card-v4-name'>
                    {item.data.title}
                  </div>
                  {item.data.benefits.length > 0 &&
                    <ul className="productBenefitChips">
                      {item.data.benefits.map((item, index) => {
                        return <li key={index}>
                          <span>
                            <TickIcon />
                          </span>
                          {item}
                        </li>
                      })}
                    </ul>}
                  <div className="productPriceDetails">
                    <span className="priceMRP">MRP: </span>
                    {item.data.variants[0].compareAtPrice - item.data.variants[0].price > 0 && <del className="priceMRP">{formatPriceWithCurrency(item.data.variants[0].compareAtPrice)}</del>
                    }
                    <span className='actualPrice'>
                      {formatPriceWithCurrency(item.data.variants[0].price)}
                    </span>
                    {item.data.variants[0].compareAtPrice - item.data.variants[0].price > 0 && <span className="totalPriceOff">{formatPriceWithCurrency(item.data.variants[0].compareAtPrice - item.data.variants[0].price)} off</span>}
                  </div>
                </div>
              </div>
              <hr />
              <div className='prod-card-v4-key-ingredients'>
                {whatMakesItGood.data.length > 0 && <>
                  <div className='heading'>Key Ingredients</div>
                  <div className='prod-card-v4-key-ingredients-lists'>
                    {whatMakesItGood.data.map((item) => {
                      return <div className='prod-card-v4-key-ingredients-box' key={item.title}>
                        <img src={item.image} alt={item.title} />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <span>{item.description}</span>
                        </div>
                      </div>
                    })}
                  </div>
                </>
                }
                {howToUse.data.length > 0 && <>
                  <hr />
                  <div className='prod-card-v4-key-ingredients-info'>
                    <p>How To Use</p>
                    <ol>
                      {howToUse.data.map((item, index) => {
                        return <li key={index}>{item}</li>
                      })}
                    </ol>
                  </div>
                </>
                }
              </div>
            </div>
          </div>
        })}
      </Flickity>
    </section>
  </>
}
export default ProductList;