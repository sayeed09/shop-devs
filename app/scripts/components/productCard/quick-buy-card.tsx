import React, { useContext, useEffect, useState } from 'react';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { TickIcon } from '../../../icons/tickIcon';
import { productService } from '../../services/product';
import {
  ProductResponseModal,
  ProductVariant,
  productDetailsModal,
} from '../../interface/product';
import { SparkIcon } from '../../../icons/spark-icon';
import { cartService } from '../../services/cart';
import { AddCartItemResponse } from '../../models/cart/get-response';
import { getAccessToken } from '../../utils/product/formatter';
import { ButtonLoader } from '../../../icons/button-loader';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking';
import { getQuickBuyItems } from '../../utils/cart/helper';
import { GAContext } from '../../context/gatracking';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

const QuickBuyCard = () => {
  const [productDetails, setProductDetails] = useState<productDetailsModal>();
  const [loading, setIsLoading] = useState(false);
  const [variantDetails, setVariantDetails] = useState<ProductVariant | null>();
  const [addtoCartFlag, setAddToCartFlag] = useState<boolean>(false);
  const gaTrackingEvent = useContext(GAContext);

  useEffect(() => {
    const quickBuyItem = getQuickBuyItems();
    if (quickBuyItem) {
      fetchProductDetails(quickBuyItem.productId, quickBuyItem.variantId);
      if (Boolean(sessionStorage.getItem('quickBuyATC')) && getAccessToken()) {
        setAddToCartFlag(true);
      }
    }
  }, []);

  useEffect(() => {
    if (addtoCartFlag && variantDetails?.id) {
      handleQuickBuy();
    }
  }, [addtoCartFlag, variantDetails]);

  const fetchProductDetails = (productId: string, variantId: string) => {
    productService
      .getProductDetails(productId, 'pdp', true, false)
      .then((data: ProductResponseModal) => {
        setProductDetails(data.data);
        let selectedVariant: ProductVariant[] = data.data.variants.filter(
          (item) => item.id == variantId,
        );

        if (selectedVariant.length > 0 && selectedVariant[0].inventoryQuantity > 0) {
          setVariantDetails(selectedVariant[0]);
          trackingQuickBuy();
        }
      })
      .catch((error) => {
        console.log('Get product details error', error);
      });
  };

  const trackingQuickBuy = () => {
    const moeEventName = 'quick_buy_session';
    Moengage.track_event(moeEventName, {
      productId: productDetails?.id,
    });
  };

  const trackingAddtoCart = () => {
    fireFBPixelEvent({
      event: "AddToCart",
      productId: productDetails?.id as string,
      productTitle: productDetails?.title as string,
      price: Number(variantDetails?.price),
      variantId: variantDetails?.id,
    });
    const moeEventName = 'add_to_cart';
    Moengage.track_event(moeEventName, {
      productId: productDetails?.id,
      event_from: 'quick_buy',
    });
    const gaAttributes: any = [];
    const item: any = {
      item_id: productDetails?.id,
      item_name: productDetails?.title,
      currency: 'INR',
      item_brand: 'OZiva',
      item_variant: variantDetails?.title,
      price: cleanPriceString(variantDetails?.price),
      quantity: 1,
    };
    gaAttributes.push(item);
    gaTrackingEvent('add_to_cart', { items: gaAttributes });
  };

  const handleQuickBuy = () => {
    if (getAccessToken()) {
      trackingAddtoCart();
      addToCart(Number(variantDetails?.id));
    } else {
      const event = new Event('handleLogin');
      document.dispatchEvent(event);
      // This is added to handle after login auto add and redirect to cart
      sessionStorage.setItem('quickBuyATC', 'true');
    }
  };

  const addToCart = (variantId: number) => {
    setIsLoading(true);
    sessionStorage.removeItem('quickBuyATC');
    cartService.addItem(variantId, 1).then((addData: AddCartItemResponse) => {
      if (addData) {
        window.location.href = '/cart?qb=true';
      }
    });
  };

  if (!variantDetails || !productDetails) {
    return <></>;
  }

  let variantImage = productDetails?.images.filter(
    (item) => variantDetails.imageId == item.id,
  );
  let image =
    variantImage?.length > 0 ? variantImage[0] : productDetails?.images[0];

  return (
    <>
      <div className="quick-buy-section">
        <div className="quick-buy-title">Simplify your checkout experience!</div>
        {/* <p className="quick-buy-subtitle">Shop Now & get FLAT 15% OFF!</p> */}
        <div className="product-card-box-v2">
          <div className="product-card-box-v2-items">
            <div className="box-pdp-left-v2">
              <div className="product-img-v2">
                <img src={image.src} width="70" />
              </div>
              <div className="product-card-box-v2-dtl w-100 product-card-v1">
                <div className="pdp-v2-left-dtl">
                  <a>
                    <h2 className="productCartTitle">
                      {productDetails?.title}
                    </h2>
                  </a>
                  <ul className="productBenefitChips">
                    {productDetails?.benefits.map((item, index) => (
                      <li key={index}>
                        <span>
                          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/check-icon.svg?v=1715063466" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="productPriceDetails">
                    <span className="priceMRP">MRP:</span>{' '}
                    {variantDetails.compareAtPrice - variantDetails.price >
                      0 && (
                        <del className="priceMRP">
                          {formatPriceWithCurrency(variantDetails.compareAtPrice)}
                        </del>
                      )}
                    <span className="actualPrice">
                      {formatPriceWithCurrency(variantDetails.price)}
                    </span>
                  </div>
                  <div className="productPriceDetails pt-8">
                    {variantDetails.compareAtPrice - variantDetails.price >
                      0 && (
                        <span className="totalPriceOff">
                          You save:{' '}
                          {formatPriceWithCurrency(
                            variantDetails.compareAtPrice - variantDetails.price,
                          )}
                        </span>
                      )}
                  </div>
                </div>
                <div className="right-card-btn-v2">
                  <button
                    onClick={() => handleQuickBuy()}
                    className={`btn ProductCardBtn ${loading ? ' btn-primary' : ' btn-outline-primary'
                      }`}
                  >
                    {!loading ? <SparkIcon /> : <ButtonLoader />}
                    QUICK BUY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickBuyCard;
