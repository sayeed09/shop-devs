import { IProductReviewObject, productDetailsModal } from "../interface/product";
import { GetUpsellResponse } from "../models/cart/get-response";
import { getVariantIds } from "../utils/product/formatter";
import { cartService } from "../services/cart";
import { productService } from "../services/product";
import { OrderStatuses, Track } from "../models/cart/orders/order-response";
import { trackingStatuses } from "./data-provider";

export const addToCartToastEvent = (isViewCartButtonRequired: boolean) => {
    sessionStorage.setItem("isViewCartButtonRequired", JSON.stringify(isViewCartButtonRequired));
    const event = new CustomEvent('addToCartToast', {});
    document.dispatchEvent(event);
};

export const getOZParameterWRTQueryParam = (): string => {
    const url = new URLSearchParams(window.location.search);
    if(url.get('oz_c') === '2'){
        return '2';
    }
    return '';
};

//Get upsell data
export const getUpsellData = async (productDetail: productDetailsModal) => {
    try {
        const data: GetUpsellResponse[] = await cartService.getUpsellList(getVariantIds(productDetail)).then(response => response);
        if(data){
            return data;
        }
    } catch (error) {
        console.log('Get upsell data error', error);
    }
}; 

//Get reviews data
export const getStarReviews = async (productId: string) => {
    try {
        const payload = { ids: [productId] };
        let reviewsData: IProductReviewObject;
        const response = await productService.getStarReviewDetails(payload).then(response => response);
        if(response){
            reviewsData = response?.data?.product[0];
            return reviewsData;
        }
    } catch (error) {
        console.log('Get star review error', error);
    }
};

export const getMultiStarReviews = async (productIds: string[]) => {    
    try {
        const payload = { ids: productIds };        
        let reviewsData: IProductReviewObject;
        const response = await productService.getStarReviewDetails(payload).then(response => response);
        if(response){
            reviewsData = response?.data?.product
            return reviewsData;
        }
    } catch (error) {
        console.log('Get star review error', error);
    }
};

export const resizeImage = (img: string, widthHeight: string) => {
    try {
        if (img) {
            if (img.split('.png').length > 2) {
                return img;
            } else if (img.split('.jpg').length > 2) {
                return img;
            } else {
                if (img.indexOf('.png') > -1) {
                    return img.replace('.png', `_${widthHeight}.png`);
                } else if (img.indexOf('.jpg') > -1) {
                    return img.replace('.jpg', `_${widthHeight}.jpg`);
                } else {
                    return img;
                }
            }
        } else {
            return img;
        }
    } catch (error) {
        console.log("Error : ", error, img);
    }
};

const filterOutStatus = (orderTrackingStatusList: Track[], basedOn: string) => {
    return orderTrackingStatusList.filter(status => status.status === basedOn)[0]
}
export const formattedDate = (expectedDeliveryDate: string) => {
    const date = new Date(expectedDeliveryDate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
  
export const getOrderTrackingStatuses = (orderTrackingStatusList: Track[] | undefined) => {
    const trackingStatus: OrderStatuses[] = [];
    if (orderTrackingStatusList && orderTrackingStatusList.length > 0) {
        //To get Order Placed Status
        trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_PLACED), active: true });

        //To check if order is cancelled
        if (orderTrackingStatusList.filter(status => status.status === trackingStatuses.ORDER_CANCELLED && status.eventTimeStamp).length > 0) {
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_CANCELLED), active: true })
        } else {

            //Find out Ready to Ship status and push into trackingStatus
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.READY_TO_SHIP), active: false });

            //Find out Order in Transit status and push into trackingStatus
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_IN_TRANSIT), active: false });
    
            //Delivery Status
            for (let i = 1; i < orderTrackingStatusList.length; i++){
                if (orderTrackingStatusList[i].eventTimeStamp && trackingStatuses.ORDER_DELIVERED !== orderTrackingStatusList[i].status) { 
                    trackingStatus[1] = {...orderTrackingStatusList[i], active: true};
                }
            }
            if (trackingStatus.length >= 2 && (trackingStatus[1].status === trackingStatuses.READY_TO_SHIP || trackingStatus[1].status === trackingStatuses.ORDER_IN_TRANSIT)) {
            trackingStatus[2] = filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_DELIVERED).eventTimeStamp ? { ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_DELIVERED), active: true } : { ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_DELIVERED), active: false };  
            }
      }
    }    

    return trackingStatus;
  }


export const remainingProductsInStock = (productId) => {
    const productLeft = Math.floor(Math.random() * (99 - 49 + 1)) + 49;
    const productLeftFromStorage = sessionStorage.getItem("productLeftObject") ? JSON.parse(sessionStorage.getItem("productLeftObject")) : {};
    if(productLeftFromStorage && productLeftFromStorage[productId]){
        return productLeftFromStorage[productId];
    }else{
      productLeftFromStorage[productId] = productLeft;
      sessionStorage.setItem("productLeftObject", JSON.stringify(productLeftFromStorage));
      return productLeft;
    }
}

export const productSoldInPastHour = (productId) => {
    const productSold = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
    const productLeftFromStorage = sessionStorage.getItem("productSold") ? JSON.parse(sessionStorage.getItem("productSold")) : {};
    if(productLeftFromStorage && productLeftFromStorage[productId]){
        return productLeftFromStorage[productId];
    }else{
      productLeftFromStorage[productId] = productSold;
      sessionStorage.setItem("productSold", JSON.stringify(productLeftFromStorage));
      return productSold;
    }
}