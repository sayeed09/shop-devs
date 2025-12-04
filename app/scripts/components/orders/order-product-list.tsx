import React, { useState } from 'react';
import { IOrderDetail, LineItemShipmentMapping, Order, Package } from '../../models/cart/orders/order-response';
import TrackingModal from './tracking-modal';
import { trackingStatuses } from '../../utils/data-provider';
import TrackMultipleOrdersModal from './track-multiple-orders-modal';
import OrderLineItem from './order-line-item';

interface IProps {
  orderDetails: IOrderDetail;
  selectedOrder: Order;
}

export const OrderProductList = ({ orderDetails, selectedOrder }: IProps) => {

  const [trackingId, setTrackingId] = useState<string>('');
  const [trackOrderPopup, setTrackOrderPopup] = useState<boolean>(false);
  
  const [trackMultipleOrders, setTrackMultipleOrders] = useState(false);
  const [trackNowAWB, setTrackNowAWB] = useState<Package[]>([]);

  const checkIfLineItemSplit = (lineItemId: string) => {
    const ListOfAwb: LineItemShipmentMapping[] = [];
    orderDetails.lineItemShipmentMapping.forEach(shipmentItems => {
      if (shipmentItems.lineItems.includes(lineItemId)) {
        ListOfAwb.push(shipmentItems);
      }
    });
    return ListOfAwb;
  }

  const getSplitLineItem = () => {
    const splitLineItems: any = [];
    const nonSplitLineItems: any = [];
    if (orderDetails?.lineItemShipmentMapping && orderDetails?.lineItemShipmentMapping?.length == 0) {
      nonSplitLineItems.push({
        lineitemList: orderDetails.lineItems,
        awbId: ''
      })
    } else {
      orderDetails.lineItems && orderDetails.lineItems.length > 0 ? orderDetails.lineItems.map(lineItem => {
        if (checkIfLineItemSplit(lineItem.lineitemId).length >= 2) {
          splitLineItems.push({
            lineitemList: [lineItem],
            awbId: checkIfLineItemSplit(lineItem.lineitemId)[0].awb,
            awbIdList: checkIfLineItemSplit(lineItem.lineitemId)
          })
        } else {
          if (nonSplitLineItems.length > 0) {
            const awbObject = nonSplitLineItems.find(item => item.awbId == checkIfLineItemSplit(lineItem.lineitemId)[0].awb);
            if (awbObject) {
              awbObject?.lineitemList.push(lineItem);
            } else {
              nonSplitLineItems.push({
                lineitemList: [lineItem],
                awbId: checkIfLineItemSplit(lineItem.lineitemId)[0].awb,
                awbIdList: checkIfLineItemSplit(lineItem.lineitemId)
              })
            }
          } else {
            nonSplitLineItems.push({
              lineitemList: [lineItem],
              awbId: checkIfLineItemSplit(lineItem.lineitemId)[0].awb,
              awbIdList: checkIfLineItemSplit(lineItem.lineitemId)
            })
          }
        }
      }) : []
    }
    return {
      splitLineItems,
      nonSplitLineItems
    }
  }

  const getOrderStatus = (awbId) => {
    return orderDetails.packages.find((packageItem: Package) => packageItem.awb === awbId);
  }

  const handleTrackNow = (item) => {
    setTrackMultipleOrders(true);
    const filteredAWBFromPackage: Package[] = orderDetails?.packages.length > 0 ? orderDetails?.packages.filter(pacakge => item.awbIdList.some(awb => awb.awb === pacakge.awb)) : []
    filteredAWBFromPackage.push(...item.awbIdList.filter(awb => !awb.awb)); //To get unshipped AWB i.e. treacking not generated yet
    setTrackNowAWB(filteredAWBFromPackage);
  }

  const getTrakingPackage = (awbId) => {

    if(orderDetails?.lineItemShipmentMapping.length === 0){
      return orderDetails?.packages[0];
    }else{
      if(orderDetails?.packages && orderDetails?.packages.length > 0){
        const packageFound = orderDetails.packages.filter(item => item.awb === awbId);
        if(packageFound.length > 0){
          return packageFound[0];
        }
      }
    }
    return [] as Package[];
  }

  const isTrackNowDisabled = (awbId) => {
    if(orderDetails.lineItemShipmentMapping.length > 0){
      return getOrderStatus(awbId)?.currentStatus == trackingStatuses.ORDER_CANCELLED || selectedOrder.deliveryStatus == trackingStatuses.ORDER_CANCELLED || !awbId;
    }else{
      return getOrderStatus(awbId)?.currentStatus == trackingStatuses.ORDER_CANCELLED || selectedOrder.deliveryStatus == trackingStatuses.ORDER_CANCELLED;
    }
  }
  
  return (
    <>
      <div>
        {
          getSplitLineItem()?.nonSplitLineItems.length > 0 && getSplitLineItem()?.nonSplitLineItems.map((lineItemObject) => {
            return lineItemObject.lineitemList.map((innerItem, innerIndex, innerObject) => {
              return (
                <React.Fragment key={innerIndex}>
                  <OrderLineItem innerIndex={innerIndex} innerItem={innerItem} />
                  {
                    (innerIndex + 1 === innerObject.length) ?
                      <div className={`order-tracking-div justifySpaceBetween`}>
                        <div className={`order-tracking-id`}>
                          {getOrderStatus(lineItemObject.awbId)?.currentStatus != trackingStatuses.ORDER_DELIVERED ? lineItemObject.awbId && <>
                            <span className='traking-text'>Tracking ID:</span>
                            <span className='traking-id'>{lineItemObject.awbId}</span>
                          </> : <span className='delivered-text'><img src='https://cdn.shopify.com/s/files/1/2393/2199/files/tick_icon_svg.png?v=1739971277' alt='Tick Icon' />Delivered on {getOrderStatus(lineItemObject.awbId)?.track?.find(status => status.status == trackingStatuses.ORDER_DELIVERED)?.eventTimeStamp}</span>}
                        </div>
                        <button className={`${isTrackNowDisabled(lineItemObject.awbId) ? 'track-order-button-disabled' : 'track-order-button'}`} onClick={() => {
                          setTrackingId(lineItemObject.awbId);
                          setTrackOrderPopup(true);
                        }} disabled={isTrackNowDisabled(lineItemObject.awbId)}>
                          TRACK NOW
                        </button>
                      </div> : null
                  }
                  <hr className="order-details-horizontal-line" />
                </React.Fragment>
              )
            }
            )
          })
        }

        {
          getSplitLineItem()?.splitLineItems.length > 0 && getSplitLineItem()?.splitLineItems.map((lineItemObject) => {
            return lineItemObject.lineitemList.map((innerItem, innerIndex: number) => {
              return (
                <>
                  <OrderLineItem innerIndex={innerIndex} innerItem={innerItem} />
                  <div className={`order-tracking-div justifyEnd`} key={lineItemObject.awbId} style={{ background: '#FFF' }}>
                    <button style={{background: '#FFF'}} className={`${(getOrderStatus(lineItemObject.awbId)?.currentStatus == trackingStatuses.ORDER_CANCELLED || selectedOrder.deliveryStatus == trackingStatuses.ORDER_CANCELLED) ? 'track-order-button-disabled' : 'track-order-button'}`} onClick={() => handleTrackNow(lineItemObject)} disabled={getOrderStatus(lineItemObject.awbId)?.currentStatus == trackingStatuses.ORDER_CANCELLED || selectedOrder.deliveryStatus == trackingStatuses.ORDER_CANCELLED}>
                      TRACK NOW
                    </button>
                  </div>
                </>
              )
            }
            )
          })
        }
      </div>

      {
        trackOrderPopup ? (
          <TrackingModal packageItem={getTrakingPackage(trackingId) as Package} setTrackOrderPopup={setTrackOrderPopup} trackOrderPopup={trackOrderPopup} expectedDeliveryDate={orderDetails.expectedDelivery} />
        ) : null
      }

      {
        trackMultipleOrders ? <TrackMultipleOrdersModal packageItemList={trackNowAWB} trackMultipleOrders={trackMultipleOrders} setTrackMultipleOrders={setTrackMultipleOrders} expectedDeliveryDate={orderDetails.expectedDelivery} setTrackNowAWB={setTrackNowAWB} /> : null
      }
    </>
  )
}