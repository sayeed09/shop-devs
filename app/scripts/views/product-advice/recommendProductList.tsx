import React, { useContext, useEffect, useState } from 'react';
import { StarReview } from '../../../icons/star-review';
import '../../scss/import/product-advice.scss';
import { productService } from '../../services/product';
import { cartService } from '../../services/cart';

import { IRecommendProductDetails } from '../../interface/product-advice';
import { IProductReviewsResponse } from '../../interface/product';
import {
  CouponRequestModel,
  VariantRequestModel,
} from '../../models/cart/freebies';
import { GetCashResponse } from '../../models/cart/get-response';
import {
  Moengage,
} from '../../utils/tracking/gaTracking';
import { GAContext } from '../../context/gatracking';
import { getAccessToken } from '../../utils/product/formatter';

export interface IRecommendProductProps {
  recommendList: IRecommendProductDetails[];
}

export interface IViewProductList {
  title: string;
  item: IRecommendProductDetails[];
}
const RecommendProductList = (props) => {
  const {
    recommendList,
    gender,
    selectGoals,
    selectConcern,
    setRecommendList,
    setGender,
    setSelectGoals,
    setSelectConcern,
    setActiveComponent,
  } = props;
  const [productInCartList, setProductInCartList] = useState<string[]>([]);
  const [reviewsRating, setProductReviewRatings] = useState([]);
  const [discountAndPrice, setDiscountAndPrice] = useState<any>();
  const gaTrackingEvent = useContext(GAContext);

  useEffect(() => {
    getStarReviews();
    selectFirstTwoProduct();

    let eventAttribute:any = []
    for (const obj of recommendList) {
        let newObj:any ={}
        newObj.variantId= obj?.product?.variants?.id,
        newObj.name= obj?.product?.title,
        newObj.price= obj?.product?.variants?.price
        eventAttribute.push(newObj)             
    }

    const eventName = 'product_advice_view_recommendation';
    const eventAttributes = {
      phone: getAccessToken ? getAccessToken()?.phone : '',
      items:eventAttribute
    };
    (window as any).Moengage.track_event(eventName, eventAttributes);
    
  }, []);

  const selectFirstTwoProduct = () => {
    let temp = [...productInCartList];
    for (let i = 0; i < recommendList.length; i++) {
      if (i < 2) {
        let id = recommendList[i]?.product?.variants?.id;
        if (!temp?.some((obj) => obj == id)) {
          temp.push(id);
        }
      } else {
        break;
      }
    }
    setProductInCartList(temp);
    fetchDiscount(temp);
  };

  const onHandleChange = (id: string) => {
    let temp: string[] = [...productInCartList];
    if (!temp?.some((obj) => obj == id)) {
      temp.push(id);
      fetchDiscount(temp);
    } else {
      temp = temp.filter((obj) => obj != id);
      fetchDiscount(temp);
    }
    setProductInCartList(temp);
  };

  const retakeAdvice = () => {
    setRecommendList([]);
    setGender('');
    setSelectGoals([]);
    setSelectConcern([]);
    setActiveComponent({
      step1: 'active',
      step2: '',
      step3: '',
    });
  };


  const makeResponseForDiscount = (variantIdList) => {
    let variantIds: string[] = variantIdList;
    let variantRequest: VariantRequestModel[] = [];
    variantIds?.forEach((item) => {
      const request = {
        id: Number(item),
        quantity: 1,
      };
      variantRequest.push(request);
    });

    return variantRequest;
  };

  const fetchDiscount = async (variantIdList) => {
    let variantRequest = await makeResponseForDiscount(variantIdList);

    const requestModel: CouponRequestModel = {
      variants: variantRequest,
      discountCode: recommendList[0]?.discountCode,
    };
    cartService
      .getCartList(requestModel)
      .then((data: GetCashResponse) => {
        setDiscountAndPrice(data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  const addToCart = () => {
    let productArr: any = [];
    for (const item of productInCartList) {
      productArr.push({ id: item, quantity: 1 });
    }
    const prodRequest: any = {
      items: productArr,
    };
    productService
      .addItems(prodRequest)
      .then((res) => {
        if (discountAndPrice?.discount_code)
          sessionStorage.setItem(
            'coupon_code',
            discountAndPrice?.discount_code,
          );

        window.location.href = '/cart';
      })
      .catch(() => {
        console.log('Product not available');
      });

    var eventAttribute: any = []
    for (const obj of recommendList) {
      if (productInCartList?.some((cartObj) => cartObj == obj?.product?.variants?.id)) {
        let newObj: any = {}
        newObj.variantId = obj?.product?.variants?.id,
          newObj.name = obj?.product?.title,
          newObj.price = obj?.product?.variants?.price
        eventAttribute.push(newObj)
      }
    }
    const eventName = 'product_advice_view_recommendation';
    const eventAttributes = {
      phone: getAccessToken ? getAccessToken()?.phone : '',
      items: eventAttribute,
      sub_total: discountAndPrice?.order_subtotal,
      total_dicount: discountAndPrice?.total_discount
    };
    (window as any).Moengage.track_event(eventName, eventAttributes);
    gaTrackingEvent(eventName, eventAttributes);
  };

  const getStarReviews = () => {
    let productIds = [];
    recommendList.map((item) => {
      productIds.push(item?.product?.id);
    });
    const payload = { ids: productIds };
    // Here we are sending only productId in payload for particular Product.
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setProductReviewRatings(response?.data?.product);
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  };

  const viewProductList = () => {
    let productList: IViewProductList[] = [],
      product1: IRecommendProductDetails[] = [],
      product2: IRecommendProductDetails[] = [];
    recommendList.map((item, i) => {
      if (i <= 1) {
        product1.push(item);
      } else {
        product2.push(item);
      }
    });

    productList.push({
      title: 'Products based on your assesment',
      item: product1,
    });
    if (recommendList.length > 2)
      productList.push({
        title: 'Make your regimen more effective',
        item: product2,
      });

    return (
      <>
        {productList?.map((productDetails: IViewProductList, mainIndex) => {
          const { item, title } = productDetails;
          return (
            <div key={mainIndex}>
              <h2>{title}</h2>
              <div className="row assesment-prod-listing">
                {item?.map((item, i) => {
                  return (
                    <div className="col-6 assesment-prod-list-card" key={i}>
                      <div className="row">
                        <div className="assesment-prod-img">
                          <img
                            src={item?.product?.images[0]?.src}
                            alt=""
                            width={75}
                          />
                          {/* <img src="https://cdn.shopify.com/s/files/1/2393/2199/products/PHW_Front.png" alt="" width={75} /> */}
                        </div>
                        <div>
                          <h4>{item?.product?.title}</h4>

                          <div className="product-oz-review">
                            <span className="start-review">
                              {reviewsRating?.map((review) => {
                                if (review?.id == item?.product?.id) {
                                  return review?.averageRating;
                                }
                              })}
                            </span>{' '}
                            <StarReview /> |{' '}
                            {reviewsRating?.map((review) => {
                              if (review?.id == item?.product?.id) {
                                return review?.numberOfReviews;
                              }
                            })}{' '}
                            Reviews
                          </div>
                          <div className="product-price-dtls">
                            <span className="mrp">MRP:</span>{' '}
                            <span className="strike">
                              {item?.product?.variants?.compareAtPrice >
                              item?.product?.variants?.price
                                ? '₹' + item?.product?.variants?.compareAtPrice
                                : ''}
                            </span>{' '}
                            <span className="item-price">
                              ₹{item?.product?.variants?.price}
                            </span>{' '}
                            <span className="discount">
                              {item?.product?.variants?.compareAtPrice !=
                              item?.product?.variants?.price
                                ? '₹' +
                                  (item?.product?.variants?.compareAtPrice -
                                    item?.product?.variants?.price)
                                : ''}
                            </span>
                          </div>
                        </div>

                        <div key={i} className="prod-check-box">
                          <label
                            onClick={(e) => {
                              mainIndex != 0
                                ? onHandleChange(item.product.variants.id)
                                : '';
                            }}
                          >
                            <input
                              id="weight"
                              type="checkbox"
                              checked={
                                mainIndex == 0
                                  ? true
                                  : productInCartList.some(
                                      (obj) =>
                                        item?.product?.variants?.id == obj ||
                                        false,
                                    )
                              }
                              readOnly
                              value={item.product.variants.id}
                            />
                            <label></label>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="product-advice-dtls-page">
      <div className="product-advice-user-dtls">
        <a href="#" onClick={retakeAdvice}>
          RETAKE
        </a>
        <p>
          <strong>Gender: </strong>{' '}
          {gender?.charAt(0).toUpperCase() + gender?.substr(1)}
        </p>
        <p>
          {/* <strong>Goal: </strong>{selectGoals.join(", ")}  */}
          <strong>Goal: </strong>
          {selectGoals
            ?.map((obj) => {
              return obj.charAt(0).toUpperCase() + obj.substr(1);
            })
            .join(', ')}
        </p>
        <p>
          <strong>Concern: </strong>
          {selectConcern
            ?.map((obj) => {
              return (
                obj.concernName.charAt(0).toUpperCase() +
                obj.concernName.substr(1)
              );
            })
            .join(', ')}
        </p>
      </div>
      <div className="product-advice-dtls-sec">
        <div className="row product-advice-dr-dtls">
          <img
            src={require('../../../assets/Shikha_img.png').default}
            alt="Hi, this is nutritionist Shikha!"
            width="52"
          />
          <div>
            <h3>Hi, this is nutritionist Shikha!</h3>
            <p>
              Based on your goals, I recommend the following{' '}
              {recommendList?.length} product(s)
            </p>
          </div>
        </div>
        {viewProductList()}
        <div className="recommended-use">
        {recommendList[0]?.recommendedUse ? (
          <>
            <h3>Recommended Use:</h3>
            <p>
              Take Product 1 in the morning, product 2 in the afternoon and
              product 3 and 4 in the night for 3 to 6 months
            </p>
            </>
        ) : (
          ''
        )}
        </div>

        <div className="product-advice-footer">
          {discountAndPrice?.total_discount > 0 && (
            <div className="off-dtls-text">
              <strong>
                ₹{discountAndPrice?.total_discount / 100} Extra Off
              </strong>{' '}
              on buying{' '}
              {productInCartList?.length == recommendList?.length ? 'all' : ''}{' '}
              {productInCartList?.length} products
            </div>
          )}
          {!discountAndPrice ? (
            <button className="item-submit-buttom disable-button" disabled>
              BUY ALL
            </button>
          ) : (
            <a className="item-submit-buttom" onClick={addToCart}>
              <span>
                <span className="mrp">MRP:</span>{' '}
                {discountAndPrice?.order_subtotal / 100 !=
                  discountAndPrice?.order_total / 100 && (
                  <span className="strike">
                    ₹{discountAndPrice?.order_subtotal / 100}
                  </span>
                )}
                <span className="item-price">
                  ₹{+discountAndPrice?.order_total / 100}
                </span>
                {(discountAndPrice?.order_subtotal -
                  discountAndPrice?.order_total) /
                  100 >
                  0 && (
                  <span className="discount">
                    Save : ₹
                    {(discountAndPrice?.order_subtotal -
                      discountAndPrice?.order_total) /
                      100}
                  </span>
                )}
              </span>
              <span className="btn-text">
                BUY{' '}
                {productInCartList?.length == recommendList?.length
                  ? 'ALL'
                  : ''}
                ({productInCartList.length})
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendProductList;
