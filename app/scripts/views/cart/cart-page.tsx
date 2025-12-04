import React, { useContext, useEffect, useState } from 'react';
import EmptyCart from './empty-cart';
import Footer from './footer';
import Loader from './loader';
import {
  setCartItems,
  setCashApplied,
  setInitialCartLoading,
} from '../../actions/cart';
import CartItem from '../../components/cart/cart-item';
import { CartContext } from '../../context/cart';
import {
  GetCartListResponse,
  GetCashResponse,
  LineItem,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import CashCoupon from '../cart/cashandcoupon';
import PriceDetails from '../cart/price-detail';
import { userService } from '../../services/user';
import { UserProfileResponseModel } from '../../models/cart/user';
import { setUserLoggedIn, setUserModel } from '../../actions/user';
import { UserContext } from '../../context/user';
import { Moengage, cleanPriceString } from '../../utils/tracking/gaTracking';
import { GAContext } from '../../context/gatracking';
import {
  IRedeemableCashData,
} from '../../interface/cart';
import {
  getAccessToken,
  getFromCookie,
  setCookie,
} from '../../utils/product/formatter';
import {
  formatCartAPIVariant,
  getPrimeVariantId,
  getVariantIdsName,
} from '../../utils/cart/formatter';
import useCartDetails from '../../hooks/cart';
interface variantArrProps {
  id: number | undefined;
  quantity: number | undefined;
}
import { productService } from '../../services/product';
import { AuthenticationContext } from '../../context/authentication';
import Authentication from '../../components/authentication/authentication';
import { IProductReviewsResponse, SubscriptionProductDetails, UserLoginValue } from '../../interface/product';
import { gaEventAttributes, gaEventItems } from '../../interface/events';
import SubscriptionItem from '../../components/cart/subscription-item';
import { checkIfSubscriptionCart, getSubscriptionDataFromStorage, isMobile } from '../../utils/helper';
import {
  checkAllBYOBVaraiantsInCart,
  getVariantsFromStorage,
} from '../../utils/build-you-box/helper';
import BuildYourBox from '../../components/cart/build-your-box';
import QuickBuyAddress from '../../components/cart/quick-buy-address';
import HairPlan from './hair-plan';
import OneMonthConsult from '../../components/cart/one-month-consult';
import { MixPanelContext } from '../../context/mixpanelContext';
import BadgeIcons from '../../components/productv2/badge-icons';
import { FertilityProductId } from '../../utils/product/constants';
import { hostDomain } from '../../utils/endpoints';
import { formatPrice } from '../../utils/cart/price-formatter';
import { AnalyticsService } from '../../services/analytics';
import OfferNudge from '../../components/cart/offer-nudge';
import CashCouponV1 from './cashandcoupon-v1';
import { fireCartViewFloodlight } from '../../utils/tracking/yoptima';

const CartPage = (props: any) => {
  const { state, dispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: authenticationState, dispatch: AuthenticationDispatch } =
    useContext(AuthenticationContext);
  const gaTrackingEvent = useContext(GAContext);
  const { trackMixpanelEvent } = useContext(MixPanelContext);

  const couponApplied = sessionStorage.getItem('coupon_code');
  const [offerRemove, setOfferRemove] = React.useState(couponApplied);
  const [redeemableCashData, setRedeemableCashData] =
    useState<IRedeemableCashData>();
  const [isLoading, setIsLoading] = useState(false);
  const [productReview, setProductReview] = useState<any>();
  const [autoAppliedCoupon, setAutoAppliedCoupon] = useState(false);
  const priceModel = formatPrice(state);
  const isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
  const [uds686Exp1, setUds686Exp1] = useState<boolean>(false); // UDS-686 experiment start
  const { getCart, getHairPlanItems, showConfetti } = useCartDetails();
  const [topHeight, setTopHeight] = useState<number>(80);

  useEffect(() => {
    fetchCartItems();

  }, []);
  const subscriptionData: SubscriptionProductDetails | null = getSubscriptionDataFromStorage();

  useEffect(() => {
    let offset = uds686Exp1 ? 8 : 0;
    const topEl = document.querySelector(
      ".oziva-header"
    ) as HTMLElement | null;
    setTopHeight(Number(topEl?.offsetHeight) + offset as number);
  }, [state.cart, uds686Exp1])

  useEffect(() => {
    // UDS-686 experiment start
    setUds686Exp1((window as any).Uds686 == 1 ? true : false);
    window.addEventListener("Uds6861", () => {
      setUds686Exp1(true)
    });
    // UDS-686 experiment end
  }, [])

  useEffect(() => {
    if (userState.isLoggedIn && !checkIfSubscriptionCart()) {
      getCashDetails();
    }
  }, [state.cart, authenticationState.isLoginRequired]);

  useEffect(() => {
    if (state.cart.line_items && state.cart.line_items.length > 0) {
      getStarReviews();
    }
  }, [state.cart.line_items]);

  useEffect(() => {
    if (sessionStorage.getItem('showConfetti') && showConfetti && isCashApplied == 'not applied') {
      props.setOpenPopup(true);

      setTimeout(() => {
        props.setOpenPopup(false);
        sessionStorage.removeItem('showConfetti');
      }, 5000);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (userState.isLoggedIn) {
      AnalyticsService.sendSessionMergeEvent();
    }
  }, [userState.isLoggedIn])

  const getStarReviews = () => {
    const productIdsList = state.cart.line_items.map(item => item.product_id.toString());
    const payload = { ids: productIdsList };
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setProductReview(response?.data?.product);
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  };

  const fetchCartItems = async () => {
    await addToCartFromCookie();
    cartService.getCartItems().then((data: GetCartListResponse) => {
      let variantArr: variantArrProps[] = formatCartAPIVariant(data);
      checkAllBYOBVaraiantsInCart(data.items?.map((item) => item.variant_id) as number[]);
      let requestPayload: any = { variants: variantArr };
      if (
        sessionStorage.getItem('coupon_code') ||
        sessionStorage.getItem('login_coupon_code')
      ) {
        requestPayload.discountCode = sessionStorage.getItem(
          'login_coupon_code',
        )
          ? sessionStorage.getItem('login_coupon_code')
          : sessionStorage.getItem('coupon_code');
      } else if (
        sessionStorage.getItem('ozivacash_apply_check') === 'applied'
      ) {
        requestPayload.cashApply = true;
        dispatch(setCashApplied(true));
      }
      getCart(requestPayload).then((data: GetCashResponse) => {
        checkIfBYOBItemsInStorage(data)
        dispatch(setCartItems(data));
        viewCartEvent(data);
        dispatch(setInitialCartLoading(false));
        if (sessionStorage.getItem('ozivacash_apply_check') !== 'applied') setAutoAppliedCoupon(true);
        const mixpanelCart = data.line_items.map((item, index) => {
          return {
            "Product Name": item.title,
            "Product Price": item.price / 100,
            "Product ID": item.product_id,
            "Variant ID": item.variant_id,
            "Quantity": item.quantity
          }
        });
        trackMixpanelEvent("Cart Viewed", {
          $currency: 'INR',
          $page_title: document.title,
          $brand: "OZiva",
          cart: mixpanelCart,
          "Order Total": data?.order_total && data?.order_total / 100,
          "Discount Code": data?.discount_code,
          // $discount_code: props.discountCode,
        })
      })
    });
    const authorizationToken: UserLoginValue | null = getAccessToken();
    if (
      authorizationToken &&
      authorizationToken.accessToken &&
      !checkIfSubscriptionCart()
    ) {
      userDispatch(setUserLoggedIn(true));
      userService
        .getUserProfile()
        .then((data: UserProfileResponseModel) =>
          userDispatch(setUserModel(data)),
        )
        .catch((error) => {
          if (error?.response?.status === 401)
            userDispatch(setUserLoggedIn(false));
        });
    }
  };
  const checkIfBYOBItemsInStorage = (data: GetCashResponse) => {
    const byobCartItems = data.line_items.filter((item) => item.benefits.some(
      (val) =>
        val.includes('BYB-3') ||
        val.includes('BYB_VMS') ||
        val.includes('Build Your Own Box'),
    ));
    let notPresentItems: LineItem[] = [];
    if (byobCartItems.length > 0) {
      const localByobItems = getVariantsFromStorage();
      if (localByobItems && localByobItems.length > 0) {

        notPresentItems = byobCartItems.filter((item) => !localByobItems.find((val) => item.variant_id == val.variant_id))

      } else {
        notPresentItems = byobCartItems;
      }
    }
    if (notPresentItems.length > 0) {
      let productIdsObject = {};
      const updateProduct: any = {
        updates: productIdsObject,
      };
      notPresentItems.forEach((item) => {
        productIdsObject[item.variant_id] = 0;
      })

      cartService.updateItems(updateProduct).then((data) => {
        fetchCartItems();
      })
    }
  }
  const getCashDetails = () => {
    cartService
      .getCashDetails(state)
      .then((data: any) => {
        setRedeemableCashData(data);
        props.setRedeemableCashData(data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) userDispatch(setUserLoggedIn(false));
      });
  };

  const viewCartEvent = (data: GetCashResponse) => {
    const eventName = 'view_cart';
    const lineItems = data.line_items;

    const eventItems: gaEventItems[] = lineItems.map((item) => {
      return {
        item_id: item?.product_id.toString(),
        item_name: item?.product_title,
        discount:
          (Number(cleanPriceString(item?.compare_at_price)) -
            Number(cleanPriceString(item?.line_price))) /
          100,
        item_brand: 'OZiva',
        item_variant: item?.variant_title,
        price: Number(cleanPriceString(item?.compare_at_price)) / 100,
        quantity: item?.quantity,
      };
    });
    const gaAttributes: gaEventAttributes = {
      currency: 'INR',
      value: Number(cleanPriceString(data?.order_total)) / 100,
      items: eventItems,
    };

    gaTrackingEvent(eventName, gaAttributes);

    const { price, quantity, names, ids, product_id } = getVariantIdsName(lineItems);
    const moeAttributes: any = {
      variant_id: ids,
      product_id: product_id,
      product_name: names,
      price: price,
      quantity: quantity,
    };
    Moengage.track_event(eventName, moeAttributes);
    fireCartViewFloodlight();
  };
  const addToCartFromCookie = async () => {
    // poc for PDP hosted on subdomain, TODO:// remove this snippet after poc is done
    const atcCookie = getFromCookie('atc');
    if (atcCookie?.trim()) {
      const variantIds = atcCookie.split(',').filter((item) => item.trim());
      let inputArr: any = [];
      for (const item of variantIds) {
        inputArr.push({ id: item, quantity: 1 });
      }
      const prodRequest: any = {
        items: inputArr,
      };
      await productService.addItems(prodRequest);
      setCookie('atc', '');
    }
  };
  if (state.initialCartLoading) {
    return <Loader />;
  }
  if (!checkIfSubscriptionCart()) {
    if (state.cart.line_items.length === 0 && !state.initialCartLoading) {
      sessionStorage.setItem('login_coupon_code', '');
      return (
        // EMPTY CART
        <div className="empty-container">
          <EmptyCart />
        </div>
      );
    }
  }

  const getLineItems = () => {
    const filteredArray = state.cart.line_items.filter(
      (lineItems) =>
        !(state.selectedFreebies.some(
          (freebiesItem) => lineItems.variant_id === freebiesItem.variant_id,
        )) &&
        !(getHairPlanItems().some((hairItem) => hairItem.variant_id == lineItems.variant_id)),
    );
    return filteredArray;
  };
  const youSavePrice = checkIfSubscriptionCart() && subscriptionData ? subscriptionData.compareAtPrice - subscriptionData.price : priceModel.discount + priceModel?.freebiesDiscount + (priceModel.orderTotal - priceModel.subtotal);
  return (
    <>
      <Authentication
        shouldPageRefresh={false}
      />
      {/* CART ITEM LIST */}
      {/* START WEB LEFT */}
      <div style={isMobile() ? { marginTop: topHeight } : {}} className={`${youSavePrice > 0 ? 'oziva-cart-left-spacing-1' : 'oziva-cart-left-spacing-2'} oziva-cart-left mb-16`}>

        {checkIfSubscriptionCart() ? (
          <>
            <SubscriptionItem />
            {!getLineItems().some((item) => {
              return item.product_id == FertilityProductId
            }) && !isMobile() && (
                <OneMonthConsult />
              )}
          </>
        ) : (
          <>
            {getHairPlanItems().length > 0 && (
              <HairPlan cartItems={getHairPlanItems()} />
            )}
            {getVariantsFromStorage() && getVariantsFromStorage().length > 0 && (
              <BuildYourBox cartItems={state.cart.line_items} />
            )}

            {getLineItems().map((item, index) => {
              return (
                <CartItem key={item.variant_id} cartItem={item} productReview={productReview ? productReview[index] : null} itemIndex={index} />
              )
            })}


            {!getLineItems().some((item) => {
              return item.variant_id == getPrimeVariantId() || item.product_id == FertilityProductId
            }) && getHairPlanItems().length == 0 && hostDomain != 'oziva.com' && !isMobile() && (
                <OneMonthConsult />
              )}

            {/* UDS-690-Start */}
            <OfferNudge setOpenPopup={props.setOpenPopup} />
            {/* UDS-690-End */}

            {/* <SamplingItem /> */}
          </>
        )}
        {/* {!checkIfSubscriptionCart() && !state.quickBuyCart && getHairPlanItems().length == 0 && <PrimeItemV2 />} */}
        <BadgeIcons v1 />
      </div>
      {/* END WEB LEFT */}
      {/* START WEB RIGHT */}
      <div className={`${youSavePrice > 0 ? 'oziva-cart-right-spacing-1' : 'oziva-cart-right-spacing-2'} oziva-cart-right`}>
        {/* START FREE GIFT  */}

        {/* <Freebies /> */}
        {/* END FREE GIFT */}
        {/* START People also bought Section */}
        {/* {!checkIfSubscriptionCart() && (
          <Upsell />
        )} */}
        {/* END People also bought Section */}
        {/* START OFFERS */}
        {!checkIfSubscriptionCart() && (
          <div className='UDS-686-control'>
            {isMobile() ? <CashCouponV1
              setOfferVisible={props.setOfferVisible}
              documentWidth={props.setDocumentWidth}
              setShowPopup={props.setShowPopup}
              setOpenPopup={props.setOpenPopup}
            /> :
              <CashCoupon
                setOfferVisible={props.setOfferVisible}
                setOfferRemove={setOfferRemove}
                setDocumentWidth={props.setDocumentWidth}
                setShowPopup={props.setShowPopup}
                setOpenPopup={props.setOpenPopup}
                setIsDisplayConfeti={props.setIsDisplayConfeti}
                redeemableCashData={redeemableCashData}
              />
            }


          </div>
        )}
        {/* END OFFERS */}
        {/* START PRICE DETAIL */}
        <QuickBuyAddress />
        <PriceDetails />
        {/* END PRICE DETAIL */}
        {/* START FOOTER */}
        <Footer />
        {/* END FOOTER */}
      </div>
      {/* END WEB RIGHT */}
      {isLoading && <Loader />}
    </>
  );
};
export default CartPage;
