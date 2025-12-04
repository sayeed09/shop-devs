import React, { useEffect, useState } from 'react';
import UpsellModalOnPLP from './upsellToastlView';
import '../../scss/oziva-site.scss';
import {
  CartItem,
  GetCartListResponse,
  GetUpsellResponse,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import { productService } from '../../services/product';
import {
  IProductReviewObject,
  IProductReviewsResponse,
} from '../../interface/product';
import Loader from '../cart/loader';
import { starReviewNumber } from '../../utils/plp-page/review';

const UpsellCartToast = () => {
  const [isVisibleUpsell, setIsVisibleUpsell] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<CartItem>();
  const [cartCountNumber, setCartCountNumber] = useState<number>();

  const [upsellItem, setUpsellItem] = useState<GetUpsellResponse>();
  const [viewReviewStar, setViewReviewStar] = useState<any>();
  const [initialLoading, setInitialLoading] = useState(false);
  const [reviewsRating, setProductReviewRating] =
    useState<IProductReviewObject>();
  useEffect(() => {
    document.addEventListener(
      'showUpSellModal',
      function (e: any) {
        setVisibleModal(e?.detail?.showModal);
        setSelectedProduct(e?.detail?.productRes);
        if (sessionStorage.getItem('hideUpsellOnPLP') == 'yes') {
          setIsVisibleUpsell(false);
          getCartItems(false, e?.detail?.productRes);
        } else {
          setInitialLoading(true);
          getCartItems(true, e?.detail?.productRes);
        }
      },
      false,
    );
  }, []);
  const getCartItems = (isCallUpsell, cartAddedProduct) => {
    cartService
      .getCartItems()
      .then((cartData: GetCartListResponse) => {
        setCartCountNumber(cartData?.item_count);
        if (isCallUpsell) getUpsellData(cartAddedProduct, cartData);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  const getUpsellData = (cartAddedProduct, cartList) => {
    const payload = String(cartAddedProduct?.variant_id)
    if (payload)
      cartService
        .getUpsellList(payload)
        .then(async (upsellData: GetUpsellResponse[]) => {
          if (upsellData?.length) {
            let isUpsellItem: boolean = false
            for (const upsellI of upsellData) {
              let result = cartList?.items?.filter((cartI, i) => String(upsellI.variant_id) == String(cartI.variant_id))
              if (!result.length) {
                setUpsellItem(upsellI);
                getStarReviews(upsellI.product_id);
                isUpsellItem = true
                setIsVisibleUpsell(true);
                break;
              }
            }
            if (!isUpsellItem)
              setIsVisibleUpsell(false);
          } else {
            setIsVisibleUpsell(false);
          }
          setInitialLoading(false);

        })
        .catch((error) => {
          console.log('Error', error);
        });
  };
  const getStarReviews = (productId) => {
    let productIds = [productId];

    const payload = { ids: productIds };
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setProductReviewRating(response?.data?.product[0]);
          const averageRating: number = Number(
            response?.data?.product[0].averageRating,
          );
          setViewReviewStar(starReviewNumber(averageRating));
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  };

  return (
    <>
      {initialLoading && <Loader />}
      {visibleModal && (
        <UpsellModalOnPLP
          setIsVisibleUpsell={setIsVisibleUpsell}
          upsellItem={upsellItem}
          setVisibleModal={setVisibleModal}
          selectedProduct={selectedProduct}
          isVisibleUpsell={isVisibleUpsell}
          reviewsRating={reviewsRating}
          viewReviewStar={viewReviewStar}
          cartCountNumber={cartCountNumber}
          setCartCountNumber={setCartCountNumber}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </>
  );
};

export default UpsellCartToast;