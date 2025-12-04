import React, { useEffect, useRef, useState } from "react";
import { DiscountIcon } from "../../../../icons/discount-icon";
import { productService } from "../../../services/product";
import { ProductResponseModal } from "../../../interface/product";
import { formatPriceWithCurrency } from "../../../utils/cart/formatter";
import { getPricingDetails } from "../../../utils/quiz/helper";
import { getFromLocalStorage, setToLocalStorage } from "../../../utils/helper";
import { cartService } from "../../../services/cart";
import ErrorModal from "../../modals/error";
import { ButtonLoader } from "../../../../icons/button-loader";
import { HAIR_QUIZ_PRODUCTS_KEY } from "../../../utils/quiz/provider";
import { Moengage } from "../../../utils/tracking/gaTracking";
import OneMonthConsult from "../../cart/one-month-consult";
import { OneMonthConsultMRP } from "../../../utils/data-provider";

interface Props {
  productResponseList: ProductResponseModal[];
}
const HairPlan = ({ productResponseList }: Props) => {

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const divRef: any = useRef();

  const buyNow = (e) => {
    e.stopPropagation();
    if (isLoading) return

    const eventName = `hair_test_results_buy_now_click`;
    const eventAttributes = {
      value: productResponseList.map(({ data }) => {
        return {
          productId: data.id,
          productTitle: data.title,
          productVariantId: data.variants[0].id,
        }
      }),
    };
    Moengage.track_event(eventName, eventAttributes);
    setIsLoading(true);
    const currentItems: string[] = JSON.parse(getFromLocalStorage(HAIR_QUIZ_PRODUCTS_KEY) || JSON.stringify([]));

    if (currentItems && currentItems.length > 0) {
      const variantIdsObj = {};
      currentItems.forEach((item) => variantIdsObj[item] = 0);
      const updateProduct: any = {
        updates: variantIdsObj,
      };
      cartService
        .updateItems(updateProduct)
        .then(async (res) => {
          addToCart();
        })
    } else {
      addToCart();
    }
  }

  const addToCart = async () => {
    const payloadItemList: any = [];
    productResponseList.reverse().forEach((item, index) => {
      return payloadItemList.push({
        id: item.data.variants[0].id,
        quantity: 1,
      });
    });

    const payloadObject = {
      items: payloadItemList,
    };
    const addToCart = await handleAddToCart(payloadObject);
    if (addToCart) {
      setToLocalStorage(HAIR_QUIZ_PRODUCTS_KEY, JSON.stringify(productResponseList.map((item) => item.data.variants[0].id)));
      window.location.href = '/cart';
    } else {
      setIsLoading(false);
    }
  }

  const handleAddToCart = (payloadObject) => {
    return new Promise((resolve, reject) => {
      productService
        .addItems(payloadObject)
        .then((data) => {
          if (data) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.status == 422) {
            setShowErrorModal(true)
          }
          reject(false);
        });
    });
  };
  const getMessage = () => {
    return (
      <>
        <p className="mb-16">
          One of the product that you added is currently out of stock.
        </p>
      </>
    );
  };

  const handleScroll = () => {
    Moengage.track_event('hair_test_result_sticky_button', {});
    const { current } = divRef
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" })
    }
  }


  return <>
    <section className='homeSection personalized-product-section' ref={divRef}>
      <p className='h2 fw-bold text-center'>Your personalized hair growth solution</p>
      <div className='custom-card-v3'>
        <div className='custom-card-v3-head'>1 Month Kit</div>
        <div className='custom-card-v3-prod-list'>
          {productResponseList.map((item, index) => {
            return <div className="custom-card-v3-prod-list-img" key={index}>
              <img src={item.data.images[0].src} alt={item.data.title} key={item.data.id} />
            </div>
          })}
          <div className="custom-card-v3-prod-list-img">
            <span className="free-tag oz-tag position-absolute bg-secondaryTurmericYellow text-black font-bold">FREE</span>
            <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796'} alt={'Free one month consultation image'} />
          </div>
        </div>
        <hr />
        <div className='custom-card-v3-list-dtls'>
          {productResponseList.map((item, index) => {
            const { title, variants } = item.data;
            return <>
              <div className={`prod-list`} key={index}>
                <span>{title}</span>
                <span className='price'>
                  {variants[0].compareAtPrice - variants[0].price > 0 &&
                    <del>{formatPriceWithCurrency(variants[0].compareAtPrice)}</del>}
                  <span>
                    {formatPriceWithCurrency(variants[0].price)}
                  </span>
                </span>
              </div>
            </>
          })}
          <div className={`prod-list-offer`}>
            <span className={`font-medium`}>{"1 Month Nutritionist Diet Consultation + Diet Plan"}</span>
            <span className='price'>
              <del>{formatPriceWithCurrency(OneMonthConsultMRP / 100)}</del>
              <span className={`font-medium`}>
                FREE
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section onClick={() => handleScroll()} className={"homeSection your-plan-section  plan-fixed-section"}>
      <div className='custom-card-v4'>
        <div className='custom-card-v4-head'>
          Hair Growth Solution + FREE Consultation (Worth ₹1,499)
        </div>
        <div className='custom-card-v4-dtls'>
          <div className='price-details'>
            <div className='offers-price'>
              <span className='total-text'>Total MRP</span>
              <del>{formatPriceWithCurrency(getPricingDetails(productResponseList).totalMrp)}</del>
              <span className='total-mrp'>{formatPriceWithCurrency(getPricingDetails(productResponseList).price - getPricingDetails(productResponseList).incentiveDiscount)}</span>
            </div>
            <div className='save-price'>You Save <span style={{ fontWeight: 500 }}>{formatPriceWithCurrency(getPricingDetails(productResponseList).totalMrp - getPricingDetails(productResponseList).price + getPricingDetails(productResponseList).incentiveDiscount)}</span></div>
          </div>
          <div className='button-tab'>
            <button onClick={(e) => buyNow(e)} className='btn btn-primary'>
              {isLoading ?
                <ButtonLoader />
                : <>1 month Kit - Buy NOW</>}
            </button>
          </div>
        </div>
      </div>
    </section >
    {showErrorModal && (
      <ErrorModal
        message={getMessage()}
        hideCancel={true}
        handleOk={() => {
          setShowErrorModal(false);
        }}
      />)
    }
  </>
}
export default HairPlan;