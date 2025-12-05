import React, { useContext } from 'react';
import { SubscriptionPlan } from '../../interface/product';
import { ProductContext } from '../../context/product';
import { Moengage } from '../../utils/tracking/gaTracking';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';

interface SubscriptionPlanItemModal {
  planItem: SubscriptionPlan;
  activeSubscribe: boolean;
  setActiveSubscribeData: (activeSubscribeData: SubscriptionPlan) => void;
  productId: string;
}

const SubscriptionPlanItem = (props: SubscriptionPlanItemModal) => {
  const { state: productState } = useContext(ProductContext);
  const trackingEvent = (selectedPlan: SubscriptionPlan) => {
    const event_name = 'subscribe_save';
    const event_attributes = {
      subscription_duration: `${selectedPlan?.subscription_interval} Months`,
      product_name: productState.productTitle,
      product_id: props.productId,
    };
    (window as any).Moengage.track_event(event_name, event_attributes);
  };

  return (
      <label
        htmlFor={props.planItem.plan_id}
        className={
          props.activeSubscribe
            ? 'border borderGray subscription-list rounded-border active'
            : 'border borderGray subscription-list rounded-border'
        }
      >
        <div className="OneTimePurchase">
            <input
              id={props.planItem.plan_id}
              name="subscription-list-group"
              className="oz-radio"
              type="radio"
              checked={props.activeSubscribe}
              onChange={() => {
                props.setActiveSubscribeData(props.planItem),
                  trackingEvent(props.planItem);
              }}
            />
            <>
              <span className="plan-item">
                {props.planItem?.subscription_interval} months subscription
              </span>
            </>
        </div>
        <div className="d-inline-block price-dtetails">
          <span className="text-off-gray">
            <span className="f-12 mr-2">MRP:</span>
            {props.planItem.compare_at_price != props.planItem.base_price&&
            <span className="text-decoration">
              {formatPriceWithCurrency(props.planItem.compare_at_price)}
            </span>}
          </span>{' '}
          <h3 className="d-inline-block mb-0">{formatPriceWithCurrency(props.planItem.base_price)}</h3>
          {props.planItem.compare_at_price - props.planItem.base_price > 0 && (
            <div className="text-orangeVibrantShade">
              You Save: {formatPriceWithCurrency(props.planItem.compare_at_price - props.planItem.base_price)}
            </div>
          )}
        </div>
      </label>
  );
};
export default SubscriptionPlanItem;