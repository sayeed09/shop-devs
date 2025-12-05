import React, { useState, useEffect, useContext } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { ProductContext } from '../../context/product';
import { productService } from '../../services/product';
import {
  GetCartListResponse,
  GetUpsellResponse,
} from '../../models/cart/get-response';
import { activeSubscribePlan } from '../../actions/product';
import {
  IProductReviewObject,
  ProductImageModal,
  SubscriptionDataRes,
  SubscriptionPlan,
  SubscriptionProductDetails,
  productDetailsModal,
} from '../../interface/product';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking';
import { GAContext } from '../../context/gatracking';
import {
  getUpsellData,
  getStarReviews,
  getOZParameterWRTQueryParam,
  addToCartToastEvent,
} from '../../utils/common-functions';
import { MixPanelContext } from '../../context/mixpanelContext';
import PurchaseModalContent from '../productv2/purchase-modal-content';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

interface PurchaseModal {
  subScriptionData: SubscriptionDataRes | undefined;
  setSubscribeModal: (openSubscribeModal: boolean) => void;
  initialScroll: () => void;
  productId: string;
  productDetail: productDetailsModal | undefined;
  setIsItemAdded: (value: boolean) => void;
  isItemAdded: boolean;
  hvVariantId?: string;
  title?: string;
}

const PurchaseModal = (props: PurchaseModal) => {
  const queryParams = new URLSearchParams(window.location.search);
  const gaTrackingEvent = useContext(GAContext);
  const { trackMixpanelEvent } = useContext(MixPanelContext);

  const { state: productState, dispatch: productDispatch } =
    useContext(ProductContext);
  const [activeSubscribeData, setActiveSubscribeData] =
    useState<SubscriptionPlan>();
  const [planArray, setPlanArray] = useState<SubscriptionPlan[]>([]);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [upsellList, setUpsellList] = useState<GetUpsellResponse[]>([]);
  const [reviewsRating, setProductReviewRatings] =
    useState<IProductReviewObject>();
  const [isUpsellProductAdded, setIsUpsellProductAdded] =
    useState<boolean>(false);
  const [isUpsellProductAddedOnPDP, setIsUpsellProductAddedOnPDP] =
    useState(true);

  useEffect(() => {
    const getData = async () => {
      if (props.productDetail) {
        const upsellData: GetUpsellResponse[] = await getUpsellData(
          props.productDetail,
        );
        if (upsellData?.length > 0) {
          setUpsellList(upsellData);
          const reviewsData: IProductReviewObject = await getStarReviews(
            upsellData[0].product_id,
          );
          if (reviewsData) {
            setProductReviewRatings(reviewsData);
          }
        }
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const oneTimePurchase: SubscriptionPlan[] = [];
    let planArray: SubscriptionPlan[] = [];
    oneTimePurchase.push({
      plan_id: 'plan_0',
      subscription_frequency: '1',
      subscription_interval: 1,
      base_price: productState?.productDetails?.price,
      compare_at_price: productState?.productDetails?.compareAtPrice,
      savings: `${productState?.productDetails?.compareAtPrice -
        productState?.productDetails?.price
        }`,
    });
    if (props.subScriptionData?.plans) {
      planArray = [...oneTimePurchase, ...props.subScriptionData?.plans];
      setPlanArray(planArray);
    } else {
      setPlanArray([...oneTimePurchase]);
    }
    setActiveSubscribeData(planArray[0]);
  }, []);
  const redirect = (subQry = '') => {
    setTimeout(() => {
      // Done for Analytics events 
      const url = `${window.location.origin}/cart`;
      window.location.href = url;
    }, 200);
  }
  const buyNowSubscribe = async (subscribePlan: SubscriptionPlan) => {
    window.location.hash = 'SubscribeCart';
    setIsShowLoading(true);

    fireFBPixelEvent({
      event: "AddToCart",
      productId: props.productId,
      productTitle: props.productDetail?.title as string,
      price: subscribePlan.base_price,
      variantId: productState.productDetails.id,
    });
    const eventName = 'add_to_cart';
    const eventAttributes = {
      product_name: props.productDetail?.title,
      product_id: props.productId,
      item_brand: 'OZiva',
      final_line_price: productState.productDetails.price,
      variant_options: [
        productState.productDetails?.option1,
        productState.productDetails?.option2,
      ],
      currency: 'INR',
      quantity: '1',
    };
    const gaAttributes = [];
    const item1 = {
      item_id: props.productId,
      item_name: props.productDetail?.title,
      currency: 'INR',
      item_brand: 'OZiva',
      item_variant: [
        productState.productDetails?.option1,
        productState.productDetails?.option2,
      ].join(),
      price: cleanPriceString(subscribePlan.base_price),
      quantity: 1,
    };
    gaAttributes.push(item1);
    // Need to send this only when the upsell item is checked
    // if (upsellList.length > 0) {
    //   const upsellFirstItem = upsellList[0];
    //   const item2 = {
    //     item_id: upsellFirstItem?.product_id,
    //     item_name: upsellFirstItem?.title,
    //     currency: 'INR',
    //     item_brand: 'OZiva',
    //     price: cleanPriceString(upsellFirstItem?.price),
    //     quantity: 1,
    //   };
    //   gaAttributes.push(item2);
    // }
    gaTrackingEvent(eventName, { items: gaAttributes });
    trackMixpanelEvent("Product Added", {
      $currency: 'INR',
      $page_title: document.title,
      $brand: "OZiva",
      cart: [{
        "Product Name": productState.productTitle,
        "Product Price": productState.productDetails.price,
        "Product ID": props.productId,
        "Variant ID": queryParams.get('variant'),
        "Quantity": 1
      }]
    });
    (window as any).Moengage.track_event(eventName, eventAttributes);
    const moeEventName = `pdp_buy_now_${subscribePlan?.subscription_interval}_months`;
    const moeEventAttributes = {
      product_name: productState.productTitle,
      product_id: props.productId,
      variant_id: productState.productDetails.id,
      price: subscribePlan.base_price,
      quantity: 1,
      subscription_id: subscribePlan.plan_id,
    };
    (window as any).Moengage.track_event(moeEventName, moeEventAttributes);
    if (subscribePlan?.subscription_interval === 1) {
      if (isUpsellProductAdded && upsellList.length > 0) {
        const upsellFirstItem = upsellList[0];
        await productService
          .addItem(JSON.parse(upsellFirstItem?.variant_id), 1)
          .then((data: GetCartListResponse) => {
            return data;
          })
          .catch((error) => {
            console.log('Get upsell item error', error);
          });
      }
      await productService
        .addItem(productState.productDetails.id, 1)
        .then((data: GetCartListResponse) => {
          props.setSubscribeModal(false);
          props.setIsItemAdded(false);
          document.dispatchEvent(new Event('updateCartItemCount'));
          redirect();
        })
        .catch((error) => {
          setIsShowLoading(false);
          console.log('Add to cart error', error);
        });
    } else {
      const subscriptionProductData: SubscriptionProductDetails = {
        compareAtPrice: subscribePlan.compare_at_price,
        price: subscribePlan.base_price,
        handle: props.productDetail.handle,
        image: productState?.selectedImage
          ? productState?.selectedImage.src
          : props.productDetail.images[0].src,
        product_id: props.productDetail.id,
        quantity: 1,
        title: productState?.productTitle ? productState?.productTitle : props.title,
        variant_id: props.hvVariantId ? props.hvVariantId : queryParams.get('variant'),
        subscriptionPlan: subscribePlan?.subscription_interval,
        benefitChips: props.productDetail.benefits,
        planId: subscribePlan.plan_id,
      };
      sessionStorage.setItem(
        'subscriptionData',
        JSON.stringify(subscriptionProductData),
      );
      props.setSubscribeModal(false);
      setIsShowLoading(false);
      productDispatch(activeSubscribePlan(subscribePlan));
      const event_name = 'Subscribtion_CTA_click';
      const event_attributes = {
        product_name: productState.productTitle,
        product_id: props.productId,
        subscription_duration: `${subscribePlan?.subscription_interval} Months`,
      };
      (window as any).Moengage.track_event(event_name, event_attributes);
      setTimeout(() => {
        const url = `${window.location.origin}/cart?view=subscription`;
        window.location.href = url;
      }, 200);
    }
  };

  const trackingEvent = (selectedPlan: SubscriptionPlan) => {
    if (selectedPlan?.subscription_interval != 1) {
      const eventName = 'subscribe_save';
      const eventAttributes = {
        subscription_duration: `${selectedPlan?.subscription_interval} Months`,
        product_name: productState.productTitle,
        product_id: props.productId,
      };
      (window as any).Moengage.track_event(eventName, eventAttributes);
      gaTrackingEvent('pdp_subscription_change', {
        subscription_duration: `${selectedPlan?.subscription_interval} Months`,
        items: [
          {
            item_id: props.productId,
            item_name: productState.productTitle,
          }
        ]
      })
    }
  };

  const handleClick = (item: GetUpsellResponse) => {
    setIsUpsellProductAdded((prevState) => !prevState);
    if (isUpsellProductAddedOnPDP) {
      document.dispatchEvent(new Event('updateCartItemCount'));
      const eventName = 'pdp_upsell_add_to_cart';
      const eventAttributes = {
        product_name: item?.title,
        product_id: item?.product_id,
        price: item?.price,
      };
      const gaAttr = {
        items: [
          {
            id: item?.product_id,
            name: item?.title,
            brand: 'OZiva',
            quantity: 1,
            price: item?.price,
          },
        ],
      };
      gaTrackingEvent(eventName, gaAttr);
      (window as any).Moengage.track_event(eventName, eventAttributes);
    }
    setIsUpsellProductAddedOnPDP((prevState) => !prevState);
  };

  return (
    <div
      data-ml-modal
      id="PurchaseOptions"
      className="modal-with-head footer-icon-popup open-modal target-modal"
    >
      <div
        className="modal-overlay"
        onClick={() => {
          props.setSubscribeModal(false), props.initialScroll();
        }}
      ></div>
      <div className="modal-dialog">
        <span
          className="close-modal cursor-pointer"
          onClick={() => {
            props.setSubscribeModal(false), props.initialScroll();
          }}
        >
          <ProductModalCloseIcon />
        </span>
        <PurchaseModalContent
          buyNow={() => buyNowSubscribe(activeSubscribeData as SubscriptionPlan)}
          planArray={planArray}
          productId={props.productId}
          activeSubscribeData={activeSubscribeData}
          onPlanChange={(plan) => {
            setActiveSubscribeData(plan), trackingEvent(plan)
          }}
          averageRating={productState.productReview?.averageRating}
          productImage={props.productDetail?.images.find((item) => item.id == productState?.productDetails.imageId) as ProductImageModal}
        />
      </div>
    </div>
  );
};
export default PurchaseModal;
