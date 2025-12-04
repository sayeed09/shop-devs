import React from 'react';
import { Package } from '../../models/cart/orders/order-response';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { trackingStatusAfterDescription, trackingStatusBeforeDescription, trackingStatuses } from '../../utils/data-provider';
import OrderModal from './Order-Modal';
import {formattedDate} from '../../utils/common-functions';

interface Props {
  packageItem: Package;
  setTrackOrderPopup: (value: boolean) => void;
  trackOrderPopup: boolean;
  expectedDeliveryDate: string;
}
const TrackingModal = (props: Props) => {
  const { packageItem, setTrackOrderPopup, trackOrderPopup, expectedDeliveryDate } = props;
  let trackStatus = packageItem.track ? [...packageItem.track]?.reverse() : [];

  return (
    <>
      <OrderModal setOrderModal={setTrackOrderPopup} orderModal={trackOrderPopup} modalTitle={'Order tracking'} packageItem={packageItem[0]}>
        <div className="oz-progress-bar">
          <ul>
            {trackStatus && trackStatus?.length > 0 ? trackStatus.map((item) => {
              const filteredActive = trackStatus.filter((item) => item.eventTimeStamp);
              const isActive = item.status == filteredActive[0].status ? true : false;
              if ((item.status == "Order Returned" && !item.eventTimeStamp) || (item.status == "Order Cancelled" && !item.eventTimeStamp)) {
                return null
              }
              return <li key={item.status} className={`${item.eventTimeStamp ? 'completed' : ''} ${isActive ? ' active' : ''}`}>
                <span className="subtitile-small">{item.status}</span>{" "}{item.eventTimeStamp ? <span className="text-off-gray">by {item.eventTimeStamp}</span> : item.status === trackingStatuses.ORDER_DELIVERED ? `by ${formattedDate(expectedDeliveryDate)}` : ''}
                <div className='mt-8'>{item.eventTimeStamp ? trackingStatusAfterDescription[item.status] : trackingStatusBeforeDescription[item.status]}</div>
              </li>
            }) : null}
          </ul>
        </div>
      </OrderModal>
    </>
  );
};
export default TrackingModal;