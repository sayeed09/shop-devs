import React, { useEffect, useState } from 'react';
import { IOrderDetail, Order } from '../../models/cart/orders/order-response';
import OrderDetail from './order-detail';
import { orderService } from '../../services/orders';
import CancelOrderModal from './cancel-order-modal';
import TrackingModal from './tracking-modal';
import { UpArrowIcon } from '../../../icons/up-arrow';
import { DownArrow } from '../../../icons/down-arrow';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { DeliveryTruckIcon } from '../../../icons/delivery-truck-icon'
import { trackingStatuses } from '../../utils/data-provider';
import { hasDaysPassed } from '../../utils/helper';

interface Props {
    orders: Order[]
    setSelectedOrder: (order: Order) => void | undefined;
    hideShowMore: boolean;
    setPage: (page: number) => void;
    page: number;
    selectedOrder: Order;
    fetchOrders: () => void;
}
const OrderList = (props: Props) => {
    const { orders, setSelectedOrder, hideShowMore, setPage, page, selectedOrder, fetchOrders } = props;
    const [orderDetails, setOrderDetails] = useState<IOrderDetail>();


    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [cancelOrderLoading, setCancelOrderLoading] = useState(false);
    const [showCancelOrderSnackbar, setShowCancelOrderSnackbar] = useState(false);
    const [cancelledOrders, setCancelledOrders] = useState<string[]>([]); // maintain a local state to show the cancellation in progress status


    const fetchOrderDetails = async () => {
        const ordersResponse = await orderService.getOrderDetails(
            selectedOrder?.orderNumber as string,
        );
        setOrderDetails(ordersResponse.data);
    };


    useEffect(() => {
        if (selectedOrder) {
            fetchOrderDetails();
        }
    }, [selectedOrder]);

    const cancelOrder = async (orderId: string, reason: string, comments?: string) => {
        setCancelOrderLoading(true);
        setCancelledOrders(cancelledOrders => [...cancelledOrders, orderId]);
        const data = { "send_email": true, reason, comments };
        await orderService.cancelOrder(
            orderId, data
        );
        setCancelOrderLoading(false);
        setShowCancelOrderSnackbar(true);
        fetchOrderDetails();
        fetchOrders()
    }

    return (<>
        {orders.map((item) => {
            return (
                <section className="container oz-order-sec" key={item.orderNumber}>
                    <div className={`order-placed-header-container`}>
                        <div className="order-placed-header">
                            <div>
                                <h2 className="order-placed-text-left">
                                    {item.deliveryStatus
                                        ? item.deliveryStatus
                                        : 'ORDER PLACED'}
                                </h2>
                                <span className='order-placed-id'>
                                    Order ID: #{item.orderNumber}
                                </span>
                            </div>
                            <div className="text-right odr-dtl-right">
                                <p className="text-off-gray order-placed-text-right">
                                    Order Placed
                                </p>
                                <div className="text-off-gray order-place-date">
                                    {item.orderDate}
                                </div>
                            </div>
                        </div>
                        <div className="order-placed-body flex-center">
                            <div className="order-total-container">
                                <p className="order-product-count">{item.productCount} Products</p>
                                <p className="order-total">Order Total: <span>{formatPriceWithCurrency(item.orderTotal)}</span></p>
                            </div>
                            <button onClick={() => {
                                if (selectedOrder && selectedOrder.orderNumber === item.orderNumber) {
                                    setSelectedOrder(undefined);
                                } else {
                                    setSelectedOrder(item)
                                }
                            }} className="view-order-details-button">
                                <span className="view-order-details-text">VIEW DETAILS</span>{(orderDetails && orderDetails.orderNumber === item.orderNumber && selectedOrder) ? <UpArrowIcon /> : <DownArrow />}
                            </button>
                        </div>
                        {item.deliveryStatus === trackingStatuses.ORDER_PARTIALLY_DELIVERED && <div className='order-tracking-message'>
                            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/delivery_truck.png?v=1739966698" alt="Truck Icon" />
                            <div>Some items from your order are still on the way. You’ll receive them soon.</div>
                        </div>}
                        {item.deliveryStatus == trackingStatuses.ORDER_PLACED && hasDaysPassed(item.orderDate, 3) && <div className='order-tracking-message'>
                            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/delivery_truck.png?v=1739966698" alt="Truck Icon" />
                            <div>Due to a high inflow of orders, your package is slightly delayed. We’ll update you once it’s on the way.</div>
                        </div>}
                    </div>
                    {selectedOrder && (selectedOrder.orderNumber == item.orderNumber) && orderDetails &&
                        <OrderDetail selectedOrder={selectedOrder as Order} orderDetails={orderDetails} setShowCancelPopup={setShowCancelPopup} cancelledOrders={cancelledOrders} />}
                </section>
            );
        })}

        {!hideShowMore &&
            <section className="container oz-order-sec-btn pb-16 text-center">
                <div
                    className="btn btn-outline-primary"
                    onClick={() => setPage(page + 1)}
                >
                    VIEW MORE
                </div>
            </section>
        }

        {
            showCancelPopup &&
            <CancelOrderModal selectedOrder={selectedOrder as Order} setShowCancelPopup={setShowCancelPopup} cancelOrder={cancelOrder} cancelOrderLoading={cancelOrderLoading} showCancelOrderSnackbar={showCancelOrderSnackbar} showCancelPopup={showCancelPopup} />
        }
    </>
    );
};
export default OrderList;
