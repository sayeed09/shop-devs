import React, { useContext, useState } from 'react'
import { DeleteIcon } from '../../../icons/delete-icon';
import { SubscriptionProductDetails } from '../../interface/product';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { TickIcon } from '../../../icons/tickIcon';
import { getSubscriptionDataFromStorage, isMobile } from '../../utils/helper';
import CartItemPopup from './cart-item-popup';
import { GAContext } from '../../context/gatracking';

const SubscriptionItem = () => {
  const [selectedCartItem, setSelectedCartItem] = useState<{
    productId: string,
    variantId: string
  } | undefined | boolean>();
  const gaTrackingEvent = useContext(GAContext);
  const subscriptionProductData: SubscriptionProductDetails | null = getSubscriptionDataFromStorage()
  const getProductImageLink = () => {
    if (document.referrer.indexOf('shop.oziva.in') > -1 && subscriptionProductData && subscriptionProductData.handle) {
      return `https://shop.oziva.in/products/${subscriptionProductData.handle}?variant=${subscriptionProductData.variant_id}`;
    } else if (subscriptionProductData && subscriptionProductData.handle) {
      return `products/${subscriptionProductData.handle}?variant=${subscriptionProductData.variant_id}`;
    }
  }

  const handleDeleteClick = () => {
    sessionStorage.removeItem('subscriptionData');
    document.cookie = `subscriptionData = ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain= oziva.in; path=/;`
    window.location.href = getProductImageLink();
  }
  return (
    <>
      <div className="product-card-box-v2">
        <div className='product-card-box-v2-items'>
          <div className="product-img-v2" onClick={() => {
            if (isMobile()) setSelectedCartItem({ productId: String(subscriptionProductData?.product_id), variantId: String(subscriptionProductData?.variant_id) });
          }}>
            <img src={subscriptionProductData && subscriptionProductData.image} width="70" />
          </div>
          <div className="product-card-box-v2-dtl w-100">
            <span className='h2 add-remove-item subscription-month'>{subscriptionProductData && subscriptionProductData.subscriptionPlan} Months</span>
            <button
              onClick={() => {
                handleDeleteClick()
                gaTrackingEvent('remove_subscription_from_cart', { items: [subscriptionProductData] });
              }}
              className="cartItemDelete"
            >
              <DeleteIcon />
            </button>
            {!isMobile() ? <a href={getProductImageLink()}>
              <h2 className="productCartTitle">{subscriptionProductData && subscriptionProductData.title}</h2>
            </a> :
              <div onClick={() => setSelectedCartItem({ productId: String(subscriptionProductData?.product_id), variantId: String(subscriptionProductData?.variant_id) })} data-variant={subscriptionProductData && subscriptionProductData.variant_id}>
                <h2 className="productCartTitle">{subscriptionProductData && subscriptionProductData.title}</h2>
              </div>}
            {subscriptionProductData && subscriptionProductData.benefitChips && subscriptionProductData.benefitChips.length > 0 &&
              <ul className="productBenefitChips">
                {subscriptionProductData.benefitChips?.map((benefit: string, index: number) => {
                  return (
                    <li key={index}>
                      <span>
                        <TickIcon />
                      </span>
                      {benefit}
                    </li>
                  );
                })}
              </ul>
            }

            <div className="productPriceDetails">
              <span className="priceMRP">MRP:</span>
              {subscriptionProductData && subscriptionProductData.compareAtPrice > 0 && (
                <>
                  {' '}
                  <del className="priceMRP">
                    {formatPriceWithCurrency(subscriptionProductData.compareAtPrice)}
                  </del>
                </>
              )}
              <span className="actualPrice">
                {subscriptionProductData && formatPriceWithCurrency(subscriptionProductData.price)}
              </span>
            </div>
            <div className='productPriceDetails pt-8'>
              {subscriptionProductData && (subscriptionProductData.compareAtPrice - subscriptionProductData.price > 0) &&
                <span className="totalPriceOff">
                  You save: {formatPriceWithCurrency(subscriptionProductData.compareAtPrice - subscriptionProductData.price)}
                </span>
              }
            </div>
          </div>
        </div>
      </div >
      {
        selectedCartItem &&
        <div className='cart-item-popup'>
          <CartItemPopup setSelectedCartItem={setSelectedCartItem} selectedCartItem={selectedCartItem} popupHeader={'Quick Product Overview'} isConsultation={typeof selectedCartItem === "boolean" ? true : false} />
        </div>
      }
    </>
  )
}

export default SubscriptionItem;