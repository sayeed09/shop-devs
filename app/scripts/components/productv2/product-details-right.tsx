import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../../services/product';
import { ProductContext } from '../../context/product';
import { ButtonLoader } from '../../../icons/button-loader';
import {
  setProductModel,
  setSelectedImage,
  setSelectedOption,
  setProductReviewDetails,
} from '../../actions/product';
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
import { redirectUrl } from '../../utils/endpoints';
import { getOZParameterWRTQueryParam } from '../../utils/common-functions';
import PurchaseModal from '../../components/product/purchase-modal';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import PopupModal from '../../views/product/popup-modal';
import OptionItemV1 from './option-item-v1';
import OptionItem from './option-item';
import ForWithRatings from './for-with-ratings';
import { VALUE_COMMS_HIDE_PRODUCTS } from '../../utils/product/constants';
import ValueCommunication from './value-communication';

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
}

const ProductDetailRight = (props: ProductDetailRightModal) => {
  variantArr = props.variantArray;
  const gaTrackingEvent = useContext(GAContext);
  const { productDetail } = props;
  const { state: productState, dispatch: productDispatch } =
    useContext(ProductContext);
  const [timerClock, setTimerClock] = useState('');

  const [isEventTriggered, setIsEventTriggered] = useState(false);
  // const [isEventTriggered1, setIsEventTriggered1] = useState(false);
  const [startPriceAnimation, setStartPriceAnimation] = useState(false);

  useEffect(() => {
    getStarReviews();
    if (props.directSubscriptionCart) {
      props.buyNowVariant(productState.productDetails?.id),
        props.setBuyButtonLoader('topButton');
    }
    // TODO: To be moved in different component.
    if (productDetail.sellingFastAndTimerNudge) {
      const timer = setInterval(() => {
        const value = productService.orderDeliveryTimes.getCurrentTimeValue();
        if (value != '') {
          setTimerClock(value);
        } else {
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (productState.selectedOption?.length != 0) {
      getProductOption('', null);
    }
  }, [productState.selectedOption]);

  useEffect(() => {
    setIsEventTriggered((window as any).UDS657 ? true : false);
    (window as any).addEventListener('UDS657', function () {
      setIsEventTriggered((window as any).UDS657 ? true : false);
    });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    let boundingRect = document.getElementsByClassName('flavour-list');
    if (boundingRect.length > 0) {
      const boundingValues = document.getElementsByClassName('flavour-list')[0].getBoundingClientRect();
      if (boundingValues.y < boundingValues.height && !startPriceAnimation) {
        setStartPriceAnimation(true);
      } else if (boundingValues.height < boundingValues.y && startPriceAnimation) {
        setStartPriceAnimation(false);
      }
    }
  }

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
          productDispatch(setProductReviewDetails(response?.data?.product[0]));
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
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


  return !props.directSubscriptionCart ? (
    <div className="col p-16 border borderGray rounded-border product-dtl">
      <h1 className='hide-on-mobile'>
        {productState?.productTitle}
      </h1>
      <ForWithRatings
        productId={props.productId}
        newBenefitChips={productDetail.newBenefitChips} reviewsRating={productState.productReview as IProductReviewObject}
        className='hide-on-mobile'
        isExp={false}
      />

      {productDetail.sellingFastAndTimerNudge === true &&
        timerClock != '' && (<div className="mb-16 review-dtl-tag">
          <div className="pdpTimerTag">
            For fastest delivery, order within{' '}
            <span className="font-medium">{timerClock}</span>
          </div>
        </div>)}
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
              <p className="text-orangeVibrantShade subtitle-small font-medium mb-4">
                You save
                {" " + formatPriceWithCurrency(
                  productState.productDetails?.compareAtPrice -
                  productState.productDetails?.price,
                )}
              </p>
            )}
        </div>
        <div className="text-off-gray hide-on-mobile">MRP Incl. of all taxes</div>
      </div>

      {productDetail?.variants.filter((item) => item.inventoryQuantity > 0)
        .length > 0 &&
        productState.productAllVariant != null &&
        productDetail.variants.length > 1 &&
        sortedProductOptionsByPosition?.map(
          (proOption: ProductOptionModal, index: number, row) => (
            <>
              {isEventTriggered ? <OptionItemV1
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
              />
                :
                <>
                  {isEventTriggered ? <OptionItemV1
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
                  /> : <OptionItem
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
                    startPriceAnimation={startPriceAnimation}
                  />}
                </>
              }
              <hr className={`my-16 ${index < sortedProductOptionsByPosition.length - 1 ? '' : 'hide-on-mobile'}`} />
            </>
          ),
        )}

      <p className="mb-16 mt-16 f-12 text-off-gray d-none d-m-block gcsk-1630-Control">
        *MRP Inclusive of all taxes
      </p>

      {props.subscriptionState?.data?.plans?.length > 0 &&
        <p className='subscription-text hide-on-mobile'> * Check the Subscription option in the next step</p>
      }
      {
        isProductAvailable ? (
          <>
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
        )
      }
      {VALUE_COMMS_HIDE_PRODUCTS.indexOf(+props.productId) == -1 &&
        <div className='value-communication gcsk-1630-Control'>
          <ValueCommunication productDetail={productDetail} />
        </div>
      }
      {
        props.openSubscribeModal && (
          <PurchaseModal
            productId={props.productId}
            subScriptionData={props?.subscriptionState?.data}
            setSubscribeModal={props.setSubscribeModal}
            initialScroll={props.initialScroll}
            productDetail={props.productDetail}
            setIsItemAdded={props.setIsItemAdded}
            isItemAdded={props.isItemAdded}
          />
        )
      }
    </div >
  ) : (
    <></>
  );
};
export default ProductDetailRight;
