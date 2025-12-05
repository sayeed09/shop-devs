import React, { useContext, useEffect, useState } from 'react';
import { GAContext } from '../../context/gatracking';
import UpsellItem from '../../components/cart/upsell-item';
import { CartContext } from '../../context/cart';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetUpsellResponse,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import {
  getVariantIds,
  getCartAPIPayload,
  formatCartRadiumAPIVariant,
} from '../../utils/cart/formatter';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking';
import { TickIcon } from '../../../icons/tickIcon';
import {
  IProductReviewObject,
  IProductReviewsResponse,
} from '../../interface/product';
import { StarFilled } from '../../../icons/star-filled';
import { StarPartialFilled } from '../../../icons/star-partial-filled';
import { StartEmpty } from '../../../icons/star-empty';
import { productService } from '../../services/product';
import { CouponRequestModel } from '../../models/cart/freebies';
import useCartDetails from '../../hooks/cart';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

const GenerateRatedStar = ({ ratings }) => {
  const ratedStarList: any[] = [];
  for (let i = 0; i < parseInt(ratings.averageRating); i++) {
    ratedStarList.push(<StarFilled key={i} />);
  }
  if (parseFloat(ratings.averageRating) % 1 !== 0)
    ratedStarList.push(<StarPartialFilled key={ratings.averageRating} />);
  if (ratedStarList.length !== 5) {
    for (let i = ratedStarList.length; i < 5; i++) {
      ratedStarList.push(<StartEmpty key={i} />);
    }
  }
  return (
    <>
      {ratedStarList.map((element) => element)}({ratings.numberOfReviews})
    </>
  );
};

const Upsell = () => {
  const queryParameters = window.location.search;
  const [upsellList, setUpsellList] = useState<GetUpsellResponse[]>([]);
  const { state, dispatch } = useContext(CartContext);
  const gaTrackingEvent = useContext(GAContext);
  const [isLoading, setLoading] = useState(false);
  const [reviewsRating, setProductReviewRatings] =
    useState<IProductReviewObject>();
  const { getCart } = useCartDetails();

  useEffect(() => {
    if (state.cart && state.cart.line_items.length) {
      getUpsellData();
    }
  }, [state.cart.line_items]);

  const getStarReviews = (product_id: string) => {
    const payload = { ids: [product_id] };
    // Here we are sending only productId in payload for particular Product.
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setProductReviewRatings(response?.data?.product[0]);
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  };

  const getUpsellData = () => {
    cartService
      .getUpsellList(getVariantIds(state))
      .then((data: GetUpsellResponse[]) => {
        setUpsellList(data);
        if (data.length > 0) {
          getStarReviews(data[0].product_id);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  if (upsellList.length === 0) {
    return null;
  }
  const addItem = (item: GetUpsellResponse) => {
    if (!isLoading) {
      setLoading(true);
      cartService
        .addItem(+item.variant_id, 1)
        .then((data: AddCartItemResponse) => {
          if (data) {
            cartService.getCartItems().then((data: GetCartListResponse) => {
              const formattedVariantObject = formatCartRadiumAPIVariant(data, state?.discountCode, state.cashApplied);
              getCart(formattedVariantObject).then(() => {
                setLoading(false);
              }).catch(() => {
                setLoading(false);
              })
            });
            const gaAttributes: any = [];
            const gaItem: any = {
              item_id: item.product_id,
              item_name: item.product_title,
              currency: 'INR',
              item_brand: 'OZiva',
              // item_variant: item?.variant_title, Not available in API response
              price: cleanPriceString(item.price),
              quantity: 1,
            };
            gaAttributes.push(gaItem);
            gaTrackingEvent('add_to_cart', { items: gaAttributes });
            gaTrackingEvent('added_upsell_product', { items: gaAttributes });
            const moeAttributes: any = {
              variant_id: item.product_id.toString(),
              product_name: item.title,
              price: item.price,
              benifit_chip: item.benefits,
              event_from: 'upsell',
            };
            (window as any).Moengage.track_event('add_to_cart', moeAttributes);
            fireFBPixelEvent({
              event: "AddToCart",
              productId: item.product_id,
              productTitle: item.title,
              price: item.price,
              variantId: item.variant_id,
            });
          }
        });
    }
  };
  return (
    <>
      <div className="bg-primaryGreenSG300 full-width alsoBoughtSec p-8 mb-16">
        <h2 className="mb-4 font-armin-sb heading-text">
          Add for Better Results
        </h2>
        <div
          className="d-flex alsoBought"
          style={isLoading ? { opacity: 0.5 } : {}}
        >
          {upsellList.map((item) => (
            <UpsellItem
              key={item.variant_id}
              item={item}
              addItem={(item: GetUpsellResponse) => addItem(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Upsell;
