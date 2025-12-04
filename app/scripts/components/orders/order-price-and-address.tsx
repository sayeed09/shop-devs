import React from 'react';
import { IOrderDetail } from '../../models/cart/orders/order-response';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import OrderPaymentIcon from '../../../icons/order-payment-icon';

interface IProps {
    orderDetails: IOrderDetail;
}

export const OrderPriceAndAddress = ({orderDetails} : IProps) => {
    return (
        <>
            <div className="order-details-address-container">
              <p className="order-details-address-header">Shipping Address</p>
              <hr style={{ margin: '0' }} />
              <div className="order-details-address-body">
                <p className="order-details-customer-name">
                  {orderDetails.shippingAddress.firstName}{' '}
                  {orderDetails.shippingAddress.lastName}
                </p>
                <p className="text-off-gray order-details-customer-address">
                  {orderDetails.shippingAddress.address1}{' '}
                  {orderDetails.shippingAddress.address2},{' '}
                  {orderDetails.shippingAddress.city},{' '}
                  {orderDetails.shippingAddress.province}-
                  {orderDetails.shippingAddress.zip}{' '}
                  {orderDetails.shippingAddress.country}
                </p>
                <p>
                  <span className="text-off-gray fs-m-13 fs-14">Mobile:</span>
                  <span className="text-gray fs-m-13 fs-14">
                    {` ${orderDetails.shippingAddress.phone}`}
                  </span>
                </p>
              </div>
            </div>
            <div className="order-details-price-container">
              <p className="order-details-price-header">Price Details</p>
              <hr style={{ margin: '0' }} />
              <div className="order-details-price-body">
                <div className="order-details-price">
                  <div>Total MRP</div>
                  <div>
                    {formatPriceWithCurrency(orderDetails.total)}
                  </div>
                </div>
                {
                  orderDetails.total - orderDetails.subtotal > 0 ? (
                    <div className="order-details-price">
                      <div>Discount on MRP</div>
                      <div>
                        -{formatPriceWithCurrency(
                          orderDetails.total - orderDetails.subtotal,
                        )}
                      </div>
                    </div>
                  ) : null
                }
                <hr style={{ margin: '4px 0' }} />
                <div className="order-details-price font-medium">
                  <div>Total</div>
                  <div>
                    {formatPriceWithCurrency(orderDetails.total)}
                  </div>
                </div>
                <hr style={{ margin: '4px 0' }} />
                <div className="order-details-payment-by">
                  <OrderPaymentIcon /> Paid by {orderDetails.paymentMode}
                </div>
              </div>
            </div>
        </>
    )
}