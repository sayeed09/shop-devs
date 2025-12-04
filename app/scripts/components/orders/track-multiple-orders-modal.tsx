import React, { useState } from 'react';
import { Package } from '../../models/cart/orders/order-response';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { trackingStatusAfterDescription, trackingStatusBeforeDescription, trackingStatuses } from '../../utils/data-provider';
import OrderModal from './Order-Modal';
import TrackingModal from './tracking-modal';
import { formattedDate } from '../../utils/common-functions';

interface Props {
  packageItemList: Package[];
  setTrackMultipleOrders: (show: any) => void;
  trackMultipleOrders: any;
  expectedDeliveryDate: string;
  setTrackNowAWB?: (value: any) => void;
}
const TrackMultipleOrdersModal = (props: Props) => {
  const [trackOrderProgressBar, setTrackOrderProgressBar] = useState<number>(0);
  const { packageItemList, setTrackMultipleOrders, trackMultipleOrders, expectedDeliveryDate, setTrackNowAWB } = props;
  return (
    <>
      <OrderModal orderModal={trackMultipleOrders} setOrderModal={setTrackMultipleOrders} modalTitle='Order Tracking' setTrackNowAWB={setTrackNowAWB}>
        <div className='multiple-order-tracking-text'>Hey, Looks like you have more than one shipment for this order</div>
        {
          packageItemList.map((trackingItem, index) => {
            const trackItemStatuses = trackingItem.track ? [...trackingItem.track].reverse() : [];
            if (trackItemStatuses.length === 0) {
              return (
                <div className="oz-progress-bar tracking-multiple-orders" key={index}>
                  <div className='multiple-orders-tracking shipment-preparing-text'>
                    Preparing Shipment: Tracking will be shared soon
                  </div>
                </div>
              )
            }
            return (
              <div className="oz-progress-bar tracking-multiple-orders" key={index}>
                <div className='multiple-orders-tracking' onClick={() => setTrackOrderProgressBar(index + 1)}>
                  <div>Tracking ID: <span className='tracking-id'>{index + 1}</span></div>
                  <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/expand_more_a02ecb38-854a-40e5-884b-d5285dc1a0eb.svg?v=1739987779" alt="Expand Icon" style={(trackOrderProgressBar === index + 1) ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }} />
                </div>
                {
                  index + 1 === trackOrderProgressBar ? <ul className='order-tracking-progress-bar'>
                    {trackItemStatuses.length > 0 ? trackItemStatuses.map((item) => {
                      const filteredActive = trackItemStatuses?.filter((item) => item.eventTimeStamp);
                      const isActive = item.status == filteredActive[0].status ? true : false;
                      if ((item.status == "Order Returned" && !item.eventTimeStamp) || (item.status == "Order Cancelled" && !item.eventTimeStamp)) {
                        return null
                      }
                      return <li key={item.status} className={`${item.eventTimeStamp ? 'completed' : ''} ${isActive ? ' active' : ''}`}>
                        <span className="subtitile-small">{item.status}</span>{" "}{item.eventTimeStamp ? <span className="text-off-gray">by {item.eventTimeStamp}</span> : item.status === trackingStatuses.ORDER_DELIVERED ? `by ${formattedDate(expectedDeliveryDate)}` : ''}
                        <div className='mt-8'>{item.eventTimeStamp ? trackingStatusAfterDescription[item.status] : trackingStatusBeforeDescription[item.status]}</div>
                      </li>
                    }) : null}
                  </ul> : null
                }
              </div>
            )
          })
        }
      </OrderModal>
    </>
  );
};
export default TrackMultipleOrdersModal;