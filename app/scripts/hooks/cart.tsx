import { useContext, useEffect, useState } from 'react';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetCashResponse,
  LineItem,
} from '../models/cart/get-response';
import { formatCartRadiumAPIVariant, getCartAPIPayload } from '../utils/cart/formatter';
import {
  setDiscountAndCashResponse,
  setDiscountCode,
  setCartItems,
  setInitialCartLoading,
} from '../actions/cart';
import { CouponRequestModel } from '../models/cart/freebies';
import { CartContext } from '../context/cart';
import { cartService } from '../services/cart';
import { AuthenticationContext } from '../context/authentication';
import { isUserLoginRequired } from '../actions/authentication';
import { getCouponCode, getFromLocalStorage } from '../utils/helper';
import { HAIR_QUIZ_PRODUCTS_KEY } from '../utils/quiz/provider';
import { getGoogleReviewsJsonData, productService } from '../services/product';
import { IProductReviewObject, IProductReviewsResponse, productDetailsModal, ProductImageModal, ProductResponseModal } from '../interface/product';
import { PHMProductId, PHWProductId } from '../utils/product/constants';
import { FREEBIES_VARIANT_ID } from '../utils/cart/constants';

const useCartDetails = () => {
  const { state, dispatch } = useContext(CartContext);
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const [cartList, setCartList] = useState<GetCashResponse>();
  const [productDetail, setProductDetails] = useState<productDetailsModal>();
  const [googleReviews, setGoogleReviews] = useState<any>();
  const [productReview, setProductReview] = useState<IProductReviewObject>();
  const [imageList, setImageList] = useState<ProductImageModal[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);


  const getCart = (input: any) => {
    return new Promise<GetCashResponse>((resolve, reject) => {
      cartService
        .getCartList(input)
        .then((data: GetCashResponse) => {
          if (!(sessionStorage.getItem('ozivacash_apply_check') === 'applied')) {
            const couponCode = getCouponCode(data?.discount_code);
            dispatch(setDiscountCode(couponCode || ''));
          }

          dispatch(setDiscountAndCashResponse(data));
          dispatch(setCartItems(data));
          setCartList(data);
          dispatch(setInitialCartLoading(false));
          resolve(data);
          setShowConfetti(true);
        })
        .catch((error) => {
          if (error?.response?.data?.error?.errorCode == 'LOGIN_REQUIRED') {

            if (document.referrer.startsWith(`https://${window.location.hostname}/products`)) {
              setTimeout(() => {
                window.history.replaceState(null, null, ' ');
                const event = new Event('handleLogin');
                document.dispatchEvent(event);
              }, 1000);
            } else {
              AuthenticationDispatch(isUserLoginRequired(true));
            }
            cartService.getCartItems().then((data: GetCartListResponse) => {
              const requestPayload: CouponRequestModel = getCartAPIPayload(
                data,
                '',
              );
              cartService
                .getCartList(requestPayload)
                .then((response: GetCashResponse) => {
                  dispatch(setCartItems(response));
                  setCartList(response);
                  dispatch(setInitialCartLoading(false));
                });
            });
          } else if (error?.response?.data?.error?.indexOf('Missing variant') > -1) {
            cartService
              .addItem(+error.response.data.error.split(':')[1].trim(), 1)
              .then((respose: AddCartItemResponse) => {
                if (respose) {
                  cartService
                    .getCartItems()
                    .then((data: GetCartListResponse) => {
                      const requestPayload: CouponRequestModel =
                        getCartAPIPayload(data, input?.discountCode || state?.discountCode
                          || sessionStorage.getItem("login_coupon_code")
                          || sessionStorage.getItem("coupon_code"));
                      getCart(requestPayload);
                    });
                }
              });
          } else {
            const initialCashState: GetCashResponse = {
              line_items: [],
            };
            sessionStorage.setItem('coupon_code', '');
            sessionStorage.setItem('login_coupon_code', '');
            sessionStorage.removeItem('showConfetti');
            dispatch(setDiscountCode(''));
            dispatch(setDiscountAndCashResponse(initialCashState));
            setCartList(initialCashState);
            cartService.getCartItems().then((data: GetCartListResponse) => {
              const requestPayload: CouponRequestModel = getCartAPIPayload(
                data,
                '',
              );
              cartService
                .getCartList(requestPayload)
                .then((respose: GetCashResponse) => {
                  dispatch(setCartItems(respose));
                  setCartList(respose);
                  dispatch(setInitialCartLoading(false));
                });
            });
          }
          reject(error);
        });
    });
  };

  const getHairPlanItems = () => {
    const hairGrowthItems: string[] = JSON.parse(getFromLocalStorage(HAIR_QUIZ_PRODUCTS_KEY) || JSON.stringify([]));
    return state.cart.line_items.filter((item) => hairGrowthItems.some((hairItem) => hairItem == item.variant_id))
  }
  const removeCoupon = () => {
    const initialCashState: GetCashResponse = {
      line_items: [],
    };
    const initialCartDicountState: GetCashResponse = {
      ...state.cart,
      total_discount: 0,
    };
    sessionStorage.setItem('coupon_code', '');
    sessionStorage.setItem('login_coupon_code', '');
    dispatch(setDiscountCode(''));
    dispatch(setDiscountAndCashResponse(initialCashState));
    dispatch(setCartItems(initialCartDicountState));
  };

  const getProductDetails = async (selectedCartItem: {
    productId: string,
    variantId: string
  }) => {
    if (selectedCartItem) {
      productService
        .getProductDetailsV2(selectedCartItem.productId, ['sections', 'newBenefits', 'images', 'clinicalStudy', 'variants'].toString(), true, false)
        .then((data: ProductResponseModal) => {
          setProductDetails(data?.data);
          //Google reviews data
          getStarReviews(selectedCartItem);
          const googleReviewsData = data?.data?.sections?.filter(section => section.type === 'GoogleReview');
          if (googleReviewsData) {
            setGoogleReviews(googleReviewsData[0]);
          } else {
            getGoogleReviewsJsonData();
          }
        })
        .catch((error) => {
          console.log('Get product details error', error);
        });
    }

    const getGoogleReviewsJsonData = () => {
      productService
        .getGoogleReviewsJsonData()
        .then((response: any) => {
          setGoogleReviews(response);
        })
        .catch((error) => {
          console.log('Get star review error', error);
        });
    }

    const getStarReviews = (selectedCartItem: {
      productId: string,
      variantId: string
    }) => {
      if (selectedCartItem?.productId) {
        const payload = { ids: [selectedCartItem?.productId.toString()] };
        productService
          .getStarReviewDetails(payload)
          .then((response: IProductReviewsResponse) => {
            setProductReview(response?.data?.product[0]);
          })
          .catch((error) => {
            console.log('Get star review error', error);
          });
      }
    };
  };

  const getImageList = (selectedCartItem: {
    productId: string,
    variantId: string
  }) => {
    if (productDetail) {
      let selectedVariantImages = productDetail?.images?.filter((item) => item.variantIds.indexOf(Number(selectedCartItem.variantId)) > -1);
      let commonImages = productDetail?.images?.filter((item) => item.variantIds.length == 0);
      setImageList([...selectedVariantImages, ...commonImages]);
    }
  }

  //UDS-563 Start
  const handleUpgradeCart = (upgradeCartPopup: LineItem | null | any, id: string) => {
    return new Promise((resolve, reject) => {
      let productIdsObject = {};
      const variantId = upgradeCartPopup.variant_id;
      if (variantId) {
        productIdsObject[variantId] = 0;
        const updateProduct: any = {
          updates: productIdsObject,
        };
        cartService.updateItems(updateProduct).then((updateItemdata) => {
          cartService
            .addItem(Number(id), 1)
            .then((data: AddCartItemResponse) => {
              if (data) {
                cartService.getCartItems().then((data: GetCartListResponse) => {
                  const formattedVariantObject = formatCartRadiumAPIVariant(data, state?.discountCode, state.cashApplied);
                  getCart(formattedVariantObject).then((response) => {
                    resolve(response);
                  }).catch((error) => {
                    console.log("Error : ", error);
                  })
                });
              }
            })
        });
      }
    })
  }

  const getProductInformation = async (variantId: number, productId: number) => {
    const { data } = await productService.getVaraintDetails(variantId);
    if (productId == Number(PHMProductId) || productId == Number(PHWProductId)) {
      return data.variants[0].quantity;
    } else {
      return data.variants[0].formatted_quantity;
    }
  }
  //UDS-563 End
  return { getCart, cartList, getHairPlanItems, removeCoupon, getProductDetails, getGoogleReviewsJsonData, productDetail, googleReviews, imageList, productReview, getImageList, handleUpgradeCart, getProductInformation, showConfetti };
};

export default useCartDetails;
