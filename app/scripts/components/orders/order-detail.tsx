import React from 'react';
import {
  Order,
  IOrderDetail,
} from '../../models/cart/orders/order-response';
import { isMobile } from '../../utils/helper';
import { OrderProductList } from './order-product-list';
import { OrderFooterButtons } from './order-footer-buttons';
import { OrderPriceAndAddress } from './order-price-and-address';

interface Props {
  selectedOrder: Order;
  orderDetails: IOrderDetail;
  setShowCancelPopup: (show: boolean) => void;
  cancelledOrders: string[];
}
const OrderDetail = (props: Props) => {
  const {
    selectedOrder,
    orderDetails,
    setShowCancelPopup,
    cancelledOrders,
  } = props;
  
  return (
    <>
      <div className="order-details-container">
        {!isMobile() ? <hr /> : null}
        <div className="order-details-body">
          <section className="order-details-left-section">
            <OrderProductList orderDetails={orderDetails} selectedOrder={selectedOrder}/>
            <OrderFooterButtons selectedOrder={selectedOrder} orderDetails={orderDetails} cancelledOrders={cancelledOrders} setShowCancelPopup={setShowCancelPopup} />
          </section>
          <section className="order-details-right-container">
            <OrderPriceAndAddress orderDetails={orderDetails}/>
          </section>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
