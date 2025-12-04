import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../../context/authentication';
import Authentication from '../../components/authentication/authentication';
import OrderList from '../../components/orders/order-list';
import { isUserLoginRequired } from '../../actions/authentication';
import { Order } from '../../models/cart/orders/order-response';
import { orderService } from '../../services/orders';
import { getAccessToken } from '../../utils/product/formatter';
import '../../scss/import/_oz-order-placed.scss';
import '../../scss/oziva-site.scss';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    const authToken = getAccessToken();
    if (authToken && authToken.accessToken) {
      orderService.getOrdersList(page).then((data) => {
        const orderList = [...orders, ...data?.data?.orders];
        setOrders(orderList);
        setSelectedOrder(orderList[0]);
        if (data.data.orders.length === 0) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }).catch((error) => {
        if (error.response.status == "401") {
          AuthenticationDispatch(isUserLoginRequired(true));
        }
      });
    }
    else {
      AuthenticationDispatch(isUserLoginRequired(true));
    }
    setIsLoading(false)
  };

  return (
    
    <>
     {isLoading ? <>
          <div className="loader_wrapper"><div className="loader"></div></div>
        </> 
        : 
        <>
          <Authentication shouldPageRefresh={true} redirectOnModalClose={true}/>
          <div className="oz_order_placed">
            <section className="container oz-order-header">
              <p className='fs-m-14'>
                Your Orders
              </p>
              <a href="/pages/contact-us">
                NEED HELP
              </a>
            </section>
            <OrderList orders={orders} selectedOrder={selectedOrder as Order} setSelectedOrder={setSelectedOrder} setPage={setPage} hideShowMore={showMore} page={page} fetchOrders={fetchOrders}/>
          </div>
        </>
      }
    </>
  );
};
export default Orders;
