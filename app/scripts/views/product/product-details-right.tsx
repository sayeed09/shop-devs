import React, { useState, useEffect, useContext } from 'react';
import BenefitItem from '../../components/product/benefit-item';
import OptionItem from '../../components/product/option-item';
import { productService } from '../../services/product';
import { ProductContext } from '../../context/product';
import { ButtonLoader } from '../../../icons/button-loader';
import { StartEmpty } from '../../../icons/star-empty';
import {
  setProductModel,
  setSelectedImage,
  setSelectedOption,
  loadComponent,
  setProductReviewDetails,
} from '../../actions/product';
import { StarReview } from '../../../icons/star-review';
import {
  SubscriptionData,
  ProductVariant,
  ProductImageModal,
  ProductOptionModal,
  productDetailsModal,
  IProductReviewsResponse,
  IProductReviewObject,
} from '../../interface/product';
import { GAContext } from '../../context/gatracking';
import PopupModal from './popup-modal';
import { redirectUrl } from '../../utils/endpoints';
import { getOZParameterWRTQueryParam } from '../../utils/common-functions';
import PurchaseModal from '../../components/product/purchase-modal';
import { Moengage } from '../../utils/tracking/gaTracking';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { HairVitaminsCopyProductID, VALUE_COMMS_HIDE_PRODUCTS } from '../../utils/product/constants';
import ValueCommunication from '../../components/productv2/value-communication';


let filterArr: ProductVariant[] = [];
let variantArr: ProductVariant[] = [];

interface ProductDetailRightModal {
  variantArray: any;
  setVariantArray: (variantArray: any) => void;
  productDetail: productDetailsModal;
  buySubscription: (variantId: string) => void;
  productId: string;
  isShowLoading: boolean;
  buttonLoader: string;
  buyNowVariant: (variantId: string) => void;
  setBuyButtonLoader: (btnLoader: string) => void;
  subscriptionState: SubscriptionData;
  setSubscriptionData: (data: SubscriptionData) => void;
  setSubscribeModal: (openSubscribeModal: boolean) => void;
  initialScroll: () => void;
  openSubscribeModal: boolean;
  directSubscriptionCart: boolean;
  isUpsellAvailable?: boolean;
  imageArray: any;
  setIsItemAdded: (value: boolean) => void;
  isItemAdded: boolean;
  setIsShowLoading?: (value: boolean) => void;
  isComboProduct?: number | null;
  setIsComboProduct?: (value: number | null) => void;
}

const ProductDetailRight = (props: ProductDetailRightModal) => {
  variantArr = props.variantArray;
  const gaTrackingEvent = useContext(GAContext);
  const { productDetail } = props;
  const { state: productState, dispatch: productDispatch } =
    useContext(ProductContext);
  const [reviewsRating, setProductReviewRatings] =
    useState<IProductReviewObject>();
  const [timerClock, setTimerClock] = useState('');

  useEffect(() => {
    getStarReviews();
    if (props.directSubscriptionCart) {
      props.buyNowVariant(productState.productDetails?.id),
        props.setBuyButtonLoader('topButton');
    }
    // TODO: To be moved in different component.
    const timer = setInterval(() => {
      const value = productService.orderDeliveryTimes.getCurrentTimeValue();
      if (value != '') {
        setTimerClock(value);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productState.selectedOption?.length != 0) {
      getProductOption('', null);
    }
  }, [productState.selectedOption]);

  const getProductOption = (item: string, option: number) => {
    const selectedOptions = productState.selectedOption;
    selectedOptions[option - 1] = item;

    const isAvailable = props.productDetail.variants.some(
      (variant: ProductVariant) => {
        return (
          variant?.option1 == selectedOptions[0] &&
          variant?.option2 == selectedOptions[1]
        );
      },
    );

    if (!isAvailable && option) {
      const optionString = `option${option}`;
      const filteredOptions = props.productDetail.variants
        .sort((a: ProductVariant, b: ProductVariant) => a.position - b.position)
        .filter((val: any) => {
          return val[optionString] == item;
        });
      const optArr = props.productDetail.options;
      const selectedOptions: any = [];
      optArr.sort(
        (a: ProductOptionModal, b: ProductOptionModal) =>
          a.position - b.position,
      );
      optArr.map((opt: ProductOptionModal, i: number) => {
        if (opt.name != 'CustomTitle') {
          selectedOptions.push(filteredOptions[0][`option${i + 1}`]);
        }
      });
      productDispatch(setSelectedOption(selectedOptions));
      gaTrackingEvent('variant_change', { variant: selectedOptions.join(',') })
    } else {
      filterArr = [];
      variantArr = props.productDetail.variants;

      const selectedOption = productState.selectedOption;
      variantArr.forEach((variant: ProductVariant) => {
        // hardcoded option
        if (
          selectedOption[0] == variant?.option1 &&
          selectedOption[1] == variant?.option2
        ) {
          //} && selectedOption[2].value == variant.option3 ){
          filterArr.push(variant);
          productDispatch(setProductModel(filterArr[0]));
          gaTrackingEvent('variant_change', { variant: filterArr[0] })
          props.productDetail.images?.map(
            (image: ProductImageModal, i: number) => {
              if (filterArr[0].imageId == image.id) {
                productDispatch(setSelectedImage(image));
              }
            },
          );
        }
      });
    }
    if (filterArr.length > 0) {
      props.buySubscription(filterArr[0].id);
      const url = new URLSearchParams(window.location.search);
      url.set('variant', filterArr[0].id);
      window.history.replaceState(
        {},
        '',
        decodeURIComponent(`${window.location.pathname}?${url}`),
      );
    }
  };

  const getStarReviews = () => {
    const payload = { ids: [props.productId] };
    // Here we are sending only productId in payload for particular Product.
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setProductReviewRatings(response?.data?.product[0]);
          productDispatch(setProductReviewDetails(response?.data?.product[0]));
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
    const componentHierarchy = {
      isProductDetailLoad: true,
      isConfigDetailLoad: true,
      isBottomSectionLoad: true,
    };
    productDispatch(loadComponent(componentHierarchy));
  };

  const isProductAvailable =
    productDetail?.variants?.length > 0 &&
    productDetail?.variants.filter((item) => item.inventoryQuantity > 0)
      .length > 0;

  const sortedProductOptionsByPosition =
    productDetail?.options &&
    productDetail?.options.sort(
      (a: ProductOptionModal, b: ProductOptionModal) => a.position - b.position,
    );

  const handleClick = () => {
    if (props.isItemAdded) {
      setTimeout(() => {
        const url = `${window.location.origin}/cart`;
        window.location.href = url;
      }, 200);
    } else {
      let pDetails = productState.productDetails;
      const productData = {
        id: pDetails.id,
        title: pDetails.title,
      };
      gaTrackingEvent('atc1', { items: productData });
      props.buyNowVariant(productState.productDetails?.id),
        props.setBuyButtonLoader('topButton');
    }
  };
  const trackingEvent = () => {
    const moeEventName = 'pdp_clk_review';
    Moengage.track_event(moeEventName, {});
  };

  return !props.directSubscriptionCart ? (
    <div className="col p-16 border borderGray rounded-border product-dtl">
      <h1>
        <span className="font-medium">{productState?.productTitle}</span>
      </h1>
      <>
        {productDetail?.benefits?.length > 0 && (
          <ul className="cart-tag-list small-text d-flex mb-16">
            {productDetail?.benefits?.map(
              (benefitItem: string, index: number) => (
                <BenefitItem key={index} benefitItem={benefitItem} />
              ),
            )}
          </ul>
        )}
      </>
      {productDetail.clinicalStudies.data && (
        props.productId !== '4484402872379' &&
        props.productId !== HairVitaminsCopyProductID &&
        <div className="pdp-clinical-study-text">
          {productDetail.clinicalStudies.data.map((item, index) => (
            <img
              key={index}
              src={item.deviceType === 'MOBILE' ? item.image : item.image}
              className={
                item.deviceType === 'MOBILE' ? 'hide-on-web' : 'hide-on-mobile'
              }
              alt={`Clinical Study ${index + 1}`}
            />

          ))}
        </div>
      )}

      {/* START FOR HV PDP  */}
      {props.productId == '4484402872379' || (props.productId == HairVitaminsCopyProductID) &&
        <div className="pdp-clinical-study-text">
          <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/HV_results_banner_mobile.png?v=1718090696' alt='Hair Average Growth' className='hide-on-web' />
          {/* below banner is temporary */}
          <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/HV_results_banner_web.png?v=1718016246' alt='Hair Average Growth' className='hide-on-mobile' />
        </div>
      }
      {/* END FOR HV PDP  */}

      {reviewsRating?.averageRating ? (
        <div className="mb-16 review-dtl-tag">
          <a href="#customerReview">
            <span onClick={() => trackingEvent()} className="d-inline-block border borderGray rounded-sm review-dtl text-secondaryDeepGreen font-medium cursor-pointer">
              {reviewsRating?.averageRating} <StarReview />
              <span className="text-off-gray total-reviews font-medium">
                {reviewsRating?.numberOfReviews} Reviews
              </span>
            </span>
          </a>
          {productDetail.sellingFastAndTimerNudge === true &&
            timerClock != '' && (
              <div className="pdpTimerTag">
                For fastest delivery, order within{' '}
                <span className="font-medium">{timerClock}</span>
              </div>
            )}
        </div>
      ) : (
        <div className="mb-16 review-dtl-tag">
          <span className="d-inline-block border borderGray rounded-sm review-dtl text-secondaryDeepGreen font-medium cursor-pointer">
            5
            <StartEmpty />
            <span className="text-off-gray total-reviews font-medium">
              {' '}
              0 review{' '}
            </span>
          </span>
        </div>
      )}
      <div className="product-price-dtl">
        <div className="prod-price-off">
          <span className="d-inline-block pr-4 mb-4 finalPricePDP">
            {productState.productDetails?.price &&
              formatPriceWithCurrency(productState.productDetails?.price)}
          </span>{' '}
          {productState.productDetails?.price !=
            productState.productDetails?.compareAtPrice && (
              <span className="text-off-gray">
                MRP:
                <span className="strike ml-2">
                  {productState.productDetails?.compareAtPrice &&
                    formatPriceWithCurrency(
                      productState.productDetails?.compareAtPrice,
                    )}
                </span>
              </span>
            )}
          {productState.productDetails?.compareAtPrice -
            productState.productDetails?.price >
            0 && (
              <p className="text-primaryPahadiCitrus subtitle-small font-medium mb-4">
                Save:
                {formatPriceWithCurrency(
                  productState.productDetails?.compareAtPrice -
                  productState.productDetails?.price,
                )}
              </p>
            )}
        </div>
        <div className="text-off-gray">MRP Incl. of all taxes</div>
      </div>

      <hr className="my-16" />
      {productDetail?.variants.filter((item) => item.inventoryQuantity > 0)
        .length > 0 &&
        productState.productAllVariant != null &&
        productDetail.variants.length > 1 &&
        sortedProductOptionsByPosition?.map(
          (proOption: ProductOptionModal, index: number, row) => (
            <OptionItem
              proOption={proOption}
              key={index}
              subScriptionData={props?.subscriptionState}
              setSubscriptionData={props.setSubscriptionData}
              variantItem={props.variantArray}
              getProductOption={getProductOption}
              optionKey={index}
              row={row}
              imageArray={props.imageArray}
              productId={props.productId}
              setIsShowLoading={props.setIsShowLoading}
              productDetail={productDetail}
              isComboProduct={props.isComboProduct}
              setIsComboProduct={props.setIsComboProduct}
            />
          ),
        )}
      {/* START FOR OZiva+ Advanced Hair Growth Serum to Rebalance Scalp Microbiome PDP */}

      {props.productId == '7289960595515' ?
        <>
          <div className='horizontal-card-image'>
            <p className='mb-8 font-medium'>Recommended By Experts</p>
            <div className='d-flex'>
              <div>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/MG-image.png?v=1705657869" className='rounded-circle' width={80} alt="OZiva MG" />
              </div>
              <div>
                <p className='text-gray'>”Our consumer research showed that hair thinning is a concerning issue prevalent in women, especially in the 30+ age group. OZiva+ Advanced Hair Growth Actives, India's 1st Anti-Thinning Hair Active Formula targets seven different reasons for hair thinning. It has shown great results in our clinical trials with regular consumption of 3 capsules daily for 4 months.”</p>
                <p className='dr-name'>Mihir Gadani</p>
                <p className='dr-name'>Biotechnologist & Co-Founder, OZiva</p>
              </div>
            </div>
          </div>
        </>
        : props.productId == '7237175476283' ?
          <>
            <div className='horizontal-card-image'>
              <p className='mb-8 font-medium'>Recommended By Experts</p>
              <div className='d-flex'>
                <div>
                  <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/MG-image.png?v=1705657869" className='rounded-circle' width={80} alt="OZiva MG" />
                </div>
                <div>
                  <p className='text-gray'>”OZiva Bioactive Gluta is an Advanced Antioxidant Formula with the power of 5 Bioactives that help fight against cellular damage, reduce pigmentation and inflammation, for radiant and even-toned skin.”</p>
                  <p className='dr-name'>Mihir Gadani</p>
                  <p className='dr-name'>Biotechnologist & Co-Founder, OZiva</p>
                </div>
              </div>
            </div>
          </>
          : props.productId == '7255392944187' ?
            <>
              <div className='horizontal-card-image'>
                <p className='mb-8 font-medium'>Recommended By Experts</p>
                <div className='d-flex'>
                  <div>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/MG-image.png?v=1705657869" className='rounded-circle' width={80} alt="OZiva MG" />
                  </div>
                  <div>
                    <p className='text-gray'>”OZiva+ Advanced Hair Growth Serum, with 3 clinically studied ingredients, takes 4 months to rebalance the scalp and nourish hair follicles to start seeing new hair. We strongly recommend daily application of the hair growth serum for 4 months.”</p>
                    <p className='dr-name'>Mihir Gadani</p>
                    <p className='dr-name'>Biotechnologist & Co-Founder, OZiva</p>
                  </div>
                </div>
              </div>
            </>
            : (props.productId == '4484402872379' || props.productId == HairVitaminsCopyProductID) ?
              <>
                <div className='horizontal-card-image'>
                  <p className='mb-8 font-medium'>Recommended By Experts</p>
                  <div className='d-flex'>
                    <div>
                      <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/MG-image.png?v=1705657869" className='rounded-circle' width={80} alt="OZiva MG" />
                    </div>
                    <div>
                      <p className='text-gray'>"Our Clinical Trials show that it takes at least 4 months to reduce hair fall & start seeing hair growth. We strongly recommend two capsules of OZiva Hair Vitamins daily for a period of 4 months."</p>
                      <p className='dr-name'>Mihir Gadani</p>
                      <p className='dr-name'>Biotechnologist & Co-Founder, OZiva</p>
                    </div>
                  </div>
                </div>
              </> : <></>
      }
      {/* END FOR HV PDP */}
      <hr />
      {isProductAvailable ? (
        <>
          {props.subscriptionState &&
            props.subscriptionState.data &&
            props.subscriptionState.data.subscribable && (
              <p className="mb-16 mb-m-0 f-m-12">
                *Check the subscription options in the next step
              </p>
            )}
          <p className="mb-16 pt-8 f-12 text-off-gray d-none d-m-block">
            *MRP Inclusive of all taxes
          </p>
          <div className="submit-btn-sec">
            {(props.isShowLoading && props.buttonLoader == 'topButton') ||
              props.isShowLoading ? (
              <div
                className="btn btn-primary"
                style={{ height: '41.8px', padding: '6px' }}
              >
                <ButtonLoader />
              </div>
            ) : (
              <div className="btn btn-primary" onClick={() => handleClick()}>
                {getOZParameterWRTQueryParam() === '2'
                  ? !props.isItemAdded
                    ? `ADD TO CART - ${formatPriceWithCurrency(
                      productState.productDetails?.price,
                    )}`
                    : 'GO TO CART'
                  : `BUY NOW - ${formatPriceWithCurrency(
                    productState.productDetails?.price,
                  )}`}
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <div className="out-of-stock">
            <span className="out-of-stock-text">Out Of Stock</span>
            <a
              className="btn btn-outline-primary"
              href={
                props.isUpsellAvailable
                  ? `${redirectUrl}`
                  : `${redirectUrl}collections/frontpage`
              }
            >
              CONTINUE SHOPPING
            </a>
          </div>
          {props.isUpsellAvailable && (
            <PopupModal
              productId={props.productId}
              productDetail={props.productDetail}
            />
          )}
        </div>
      )}
      {VALUE_COMMS_HIDE_PRODUCTS.indexOf(+props.productId) == -1 &&
        <div className='value-communication'>
          <ValueCommunication productDetail={productDetail} />
        </div>
      }
      {props.openSubscribeModal && (
        <PurchaseModal
          productId={props.productId}
          subScriptionData={props?.subscriptionState?.data}
          setSubscribeModal={props.setSubscribeModal}
          initialScroll={props.initialScroll}
          productDetail={props.productDetail}
          setIsItemAdded={props.setIsItemAdded}
          isItemAdded={props.isItemAdded}
        />
      )}
    </div>
  ) : (
    <></>
  );
};
export default ProductDetailRight;
