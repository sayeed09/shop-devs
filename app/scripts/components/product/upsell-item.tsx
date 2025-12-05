import React, { useState, useContext } from 'react';
import { StarReview } from '../../../icons/star-review';
import { GAContext } from '../../context/gatracking';
import { GetUpsellResponse } from '../../models/cart/get-response';
import { productService } from '../../services/product';
import { GetCartListResponse } from '../../models/cart/get-response';
import { ButtonLoader } from '../../../icons/button-loader';
import {
  Moengage,
} from '../../utils/tracking/gaTracking';
import {
  convertImageSize,
  maxMobileWidth,
} from '../../utils/product/formatter';
import { DocumentWidthContext } from '../../context/documentWidth';
import { productDetailsModal } from '../../interface/product';
import { addToCartToastEvent } from '../../utils/common-functions';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

interface upsellItemModal {
  item: GetUpsellResponse;
  productDetail: productDetailsModal;
}

const upsellItem = (props: upsellItemModal) => {
  const { item } = props;
  const gaTrackingEvent = useContext(GAContext);
  const documentWidth = useContext(DocumentWidthContext);
  const [isLoading, setLoading] = useState(false);
  const addItem = (item: GetUpsellResponse) => {
    setLoading(true);
    productService
      .addItem(JSON.parse(item.variant_id), 1)
      .then((data: GetCartListResponse) => {
        setLoading(false);
        document.dispatchEvent(new Event('updateCartItemCount'));
        addToCartToastEvent(true)
        fireFBPixelEvent({
          event: "AddToCart",
          productId: item.product_id,
          productTitle: props.productDetail?.title as string,
          price: item.price,
          variantId: item.variant_id,
        });
        const event_name = 'add_to_cart';
        const event_attributes = {
          product_name: item.title,
          product_id: item.product_id.toString(),
          price: item.price,
          event_from: 'upsell',
        };
        let gaAttr = {
          items: [{
            id: item.product_id,
            name: item.product_title,
            brand: "OZiva",
            quantity: 1,
            price: item.price
          }]
        };
        gaTrackingEvent(event_name, gaAttr);
        (window as any).Moengage.track_event(event_name, event_attributes);
      })
      .catch((error) => {
        console.log('Get upsell item error', error);
        setLoading(false);
      });
  };
  return (
    <div className="carousel-cell active">
      <a
        href={`/products/${item.product_handle}`}
        className="bg-white text-center oz-product-img"
      >
        <img
          src={
            documentWidth < maxMobileWidth
              ? convertImageSize(item.image, 250, 250)
              : convertImageSize(item.image, 500, 500)
          }
          alt="Product Name"
          className="w-100"
          height="100%"
        />
      </a>
      <div className="people-also-bought-dtl">
        <h2 className="">{item.title}</h2>
        <div className="prod-reviews">
          <StarReview />
          <StarReview />
          <StarReview />
          <StarReview />
          <StarReview />
        </div>
        <div className="price-tag">
          <small className="f-12 text-off-gray">MRP:</small>{' '}
          <span className="text-secondaryDeepGreen f-16 font-medium">
            {formatPriceWithCurrency(item.price)}
          </span>
        </div>
        <div className="prod-btn">
          {isLoading ? (
            <div
              className="btn btn-block btn-outline-primary cursor-pointer upsell-loader"
              style={{ height: '41.8px', padding: '6px' }}
            >
              <ButtonLoader />
            </div>
          ) : (
            <a
              className="btn btn-block btn-outline-primary cursor-pointer"
              onClick={() => addItem(item)}
            >
              ADD TO CART
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default upsellItem;