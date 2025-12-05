import React, { useContext, useState } from 'react';
import { IOrderDetail, LineItem, Order, Package } from '../../models/cart/orders/order-response';
import { trackingStatuses } from '../../utils/data-provider';
import TrackMultipleOrdersModal from './track-multiple-orders-modal';
import ReOrderModal from './re-order-modal';
import { productService } from '../../services/product';
import { addToCartToastEvent } from '../../utils/common-functions';
import TrackingModal from './tracking-modal';
import { cleanPriceString, Moengage } from '../../utils/tracking/gaTracking'
import { GAContext } from '../../context/gatracking';
import { MixPanelContext } from '../../context/mixpanelContext';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

interface IProps {
  orderDetails: IOrderDetail;
  selectedOrder: Order;
  cancelledOrders: string[];
  setShowCancelPopup: (show: boolean) => void;
}
export const OrderFooterButtons = ({ orderDetails, setShowCancelPopup, selectedOrder, cancelledOrders }: IProps) => {

  const [trackMultipleOrders, setTrackMultipleOrders] = useState(false);
  const [reorderModal, setReorderModal] = useState(false);
  const gaTrackingEvent = useContext(GAContext);
  const { trackMixpanelEvent } = useContext(MixPanelContext);

  const getOutOfStockItems = orderDetails.lineItems.filter(item => !item.inStock || item.hideBuyAgain);
  const getAvailableItems = orderDetails.lineItems.filter(item => item.inStock && !item.hideBuyAgain);

  const trackingAddtoCart = (lineItem: any) => {
    const moeEventName = 'add_to_cart';

    if (lineItem && lineItem?.items.length > 0) {
      lineItem?.items.forEach(item => {
        (window as any).Moengage.track_event(moeEventName, {
          productId: item.product_id,
          event_from: "order_list"
        });
        const gaAttributes: any = [];
        gaAttributes.push({
          item_id: item.product_id,
          item_name: item.product_title,
          currency: 'INR',
          item_brand: 'OZiva',
          item_variant: item.variant_title,
          price: cleanPriceString(item.price),
          quantity: 1,
        });
        fireFBPixelEvent({
          event: "AddToCart",
          productId: item.product_id,
          productTitle: item.product_title,
          price: item.price,
          variantId: item.variant_id,
        });
        gaTrackingEvent('add_to_cart', { items: gaAttributes });
        trackMixpanelEvent("Product Added", {
          $currency: 'INR',
          $page_title: document.title,
          $brand: "OZiva",
          cart: [{
            "Product Name": item.variant_title,
            "Product Price": item.price,
            "Product ID": item.product_id,
            "Variant ID": item.variant_id,
            "Quantity": 1
          }]
        });
      })
    }
  };

  const addItemsIntoCart = () => {
    const payloadItemList: any = [];
    getAvailableItems.forEach((item: any, index) => {
      return payloadItemList.push({
        id: item.variantId,
        quantity: 1,
      });
    });

    const payloadObject = {
      items: payloadItemList,
    };
    productService
      .addItems(payloadObject)
      .then((data) => {
        document.dispatchEvent(new Event('updateCartItemCount'));
        addToCartToastEvent(true);
        trackingAddtoCart(data);
        window.location.href = "/cart?qb=true";
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  return (
    <>
      <div className="track-btn-group">
        {selectedOrder?.packages.length > 0 ? (
          selectedOrder?.packages[0].status != trackingStatuses.ORDER_DELIVERED && (
            <>
              {selectedOrder?.packages[0].status != trackingStatuses.ORDER_CANCELLED ? (
                <>
                  {orderDetails.paymentMode == 'COD' &&
                    (selectedOrder?.packages[0].status == trackingStatuses.ORDER_PLACED ||
                      selectedOrder?.packages[0].status == trackingStatuses.ORDER_CONFIRMED) ? (
                    <>
                      {cancelledOrders.indexOf(selectedOrder.orderNumber) >
                        -1 ? (
                        <div className="btn-link text-off-light text-uppercase">
                          Pending
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowCancelPopup(true)}
                          className="btn-link text-uppercase cancel-order-button"
                        >
                          Cancel Order
                        </button>
                      )}
                    </>
                  ) : <div></div>}
                </>
              ) : <div></div>}
            </>
          )
        ) : <div></div>}
        {selectedOrder?.packages.length > 0 &&
          selectedOrder?.packages[0].status == trackingStatuses.ORDER_DELIVERED && (
            <div style={{ flex: 0.3 }}></div>
          )}

        <button
          disabled={!(selectedOrder.deliveryStatus == trackingStatuses.ORDER_DELIVERED || selectedOrder.deliveryStatus == trackingStatuses.ORDER_CANCELLED)}
          onClick={() => {
            if (getOutOfStockItems.length > 0) {
              setReorderModal(true);
            } else {
              addItemsIntoCart();
            }
          }}
          className={`btn re-order-btn`}
        >
          RE-ORDER
        </button>
      </div>

      {
        trackMultipleOrders ? orderDetails.packages.length > 1 ? <TrackMultipleOrdersModal packageItemList={orderDetails.packages} trackMultipleOrders={trackMultipleOrders} setTrackMultipleOrders={setTrackMultipleOrders} expectedDeliveryDate={orderDetails.expectedDelivery} /> : <TrackingModal packageItem={orderDetails.packages[0] as Package} setTrackOrderPopup={setTrackMultipleOrders} trackOrderPopup={trackMultipleOrders} expectedDeliveryDate={orderDetails.expectedDelivery} /> : null
      }

      {
        reorderModal ? <ReOrderModal reorderModal={reorderModal} setReorderModal={setReorderModal} lineItems={orderDetails.lineItems as LineItem[]} addItemsIntoCart={addItemsIntoCart} getAvailableItems={getAvailableItems} getOutOfStockItems={getOutOfStockItems} /> : null
      }
    </>
  )
}