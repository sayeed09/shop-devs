import React, { useContext } from 'react';
import { CartIcon } from '../../../icons/cart-icon';
import { DownArrow } from '../../../icons/down-arrow';
import { ProductContext } from '../../context/product';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';

const MobileOrderSummary = () => {
  const { state: productState } = useContext(ProductContext);
  return (
    <section className="d-none d-m-block oz-accordion prod-sum-accordion">
      <div className="tabs">
        <div className="tab rounded-none">
          <input type="checkbox" className="accordion-tab" id="order-summary" />
          <label className="tab-label pb-0" htmlFor="order-summary">
            <div className="d-flex">
              <span className="float-left mr-8 svg-block">
                <CartIcon />
              </span>
              Show Order Summary
              <span className="svg-block">
                <DownArrow />
              </span>
            </div>
            <div>
              <h2 className="mb-0">
                <span className="text-off-gray f-14 mr-4 text-decoration">
                  {formatPriceWithCurrency(
                    productState.subscriptionPlan.compare_at_price,
                  )}
                </span>{' '}
                {formatPriceWithCurrency(
                  productState.subscriptionPlan.base_price,
                )}
              </h2>
            </div>
          </label>
          <div className="tab-content pb-0">
            <div className="d-flex mt-16">
              <div className="oziva-item-img">
                <img
                  src={productState?.selectedImage?.src}
                  width="80"
                  className="mr-16"
                  alt={productState?.productDetails?.title}
                />
              </div>
              <div className="cart-item-dtl pb-0">
                <div className="cart-item-name">
                  <p className="small-text">{productState.productTitle}</p>
                  <div className="f-12 text-off-gray mt-8">
                    {productState.productDetails?.option1},{' '}
                    {productState.productDetails?.option2}
                  </div>
                  <div className="f-12 text-off-gray pb-8">
                    {productState.subscriptionPlan?.subscription_interval} months
                    subscription
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-price-detail">
              <h2 className="pt-8 pl-4 pr-4 mb-8">Price Details</h2>
              <hr />
              <div className="text-gray pl-4 pr-4">
                <div className="mb-8 text-secondaryDeepGreen">
                  Total (Per month){' '}
                  <span className="float-right">
                    {formatPriceWithCurrency(
                      productState.subscriptionPlan.base_price,
                    )}
                  </span>
                </div>
                <div className="mb-8 text-gray">
                  Delivery Charges
                  <span className="float-right">FREE</span>
                </div>
              </div>
              <hr className="borderGray" />
              <div className="font-bold pl-4 pr-4">
                Total
                <span className="float-right">
                  {formatPriceWithCurrency(
                    productState.subscriptionPlan.base_price,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MobileOrderSummary;
