import { IProductReviewObject, productDetailsModal } from "../interface/product";
import { GetUpsellResponse } from "../models/cart/get-response";
import { getVariantIds } from "../utils/product/formatter";
import { cartService } from "../services/cart";
// import { productService } from "../services/product";
import { OrderStatuses, Track } from "../models/cart/orders/order-response";
import { trackingStatuses } from "./data-provider";

export const addToCartToastEvent = (isViewCartButtonRequired: boolean) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("isViewCartButtonRequired", JSON.stringify(isViewCartButtonRequired));
    const event = new CustomEvent("addToCartToast", {});
    document.dispatchEvent(event);
};

export const getOZParameterWRTQueryParam = (): string => {
    if (typeof window === "undefined") return "";
    const url = new URLSearchParams(window.location.search);
    return url.get("oz_c") === "2" ? "2" : "";
};

// Get upsell data
export const getUpsellData = async (productDetail: productDetailsModal) => {
    try {
        const data: GetUpsellResponse[] = await cartService.getUpsellList(getVariantIds(productDetail));
        return data || [];
    } catch (error) {
        console.log("Get upsell data error", error);
        return [];
    }
};

// Get reviews data
export const getStarReviews = async (productId: string) => {
    // try {
    //     const payload = { ids: [productId] };
    //     const response = await productService.getStarReviewDetails(payload);
    //     return response?.data?.product?.[0] || null;
    // } catch (error) {
    //     console.log("Get star review error", error);
    //     return null;
    // }
};

export const getMultiStarReviews = async (productIds: string[]) => {
    // try {
    //     const payload = { ids: productIds };
    //     const response = await productService.getStarReviewDetails(payload);
    //     return response?.data?.product || [];
    // } catch (error) {
    //     console.log("Get star review error", error);
    //     return [];
    // }
};

export const resizeImage = (img: string, widthHeight: string) => {
    try {
        if (!img) return img;
        if (img.split(".png").length > 2 || img.split(".jpg").length > 2) return img;

        if (img.includes(".png")) return img.replace(".png", `_${widthHeight}.png`);
        if (img.includes(".jpg")) return img.replace(".jpg", `_${widthHeight}.jpg`);
        return img;
    } catch (error) {
        console.log("Error : ", error, img);
        return img;
    }
};

const filterOutStatus = (orderTrackingStatusList: Track[], basedOn: string) => {
    return orderTrackingStatusList.filter(status => status.status === basedOn)[0];
};

export const formattedDate = (expectedDeliveryDate: string) => {
    const date = new Date(expectedDeliveryDate);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
};

export const getOrderTrackingStatuses = (orderTrackingStatusList: Track[] | undefined) => {
    const trackingStatus: OrderStatuses[] = [];
    if (orderTrackingStatusList && orderTrackingStatusList.length > 0) {
        trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_PLACED), active: true });

        if (orderTrackingStatusList.some(status => status.status === trackingStatuses.ORDER_CANCELLED && status.eventTimeStamp)) {
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_CANCELLED), active: true });
        } else {
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.READY_TO_SHIP), active: false });
            trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_IN_TRANSIT), active: false });

            for (let i = 1; i < orderTrackingStatusList.length; i++) {
                if (orderTrackingStatusList[i].eventTimeStamp && trackingStatuses.ORDER_DELIVERED !== orderTrackingStatusList[i].status) {
                    trackingStatus[1] = { ...orderTrackingStatusList[i], active: true };
                }
            }

            if (trackingStatus.length >= 2 && [trackingStatuses.READY_TO_SHIP, trackingStatuses.ORDER_IN_TRANSIT].includes(trackingStatus[1].status)) {
                const deliveredStatus = filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_DELIVERED);
                trackingStatus[2] = deliveredStatus?.eventTimeStamp ? { ...deliveredStatus, active: true } : { ...deliveredStatus, active: false };
            }
        }
    }
    return trackingStatus;
};

export const remainingProductsInStock = (productId: string) => {
    if (typeof window === "undefined") return 0;
    const productLeft = Math.floor(Math.random() * (99 - 49 + 1)) + 49;
    const productLeftFromStorage = sessionStorage.getItem("productLeftObject") ? JSON.parse(sessionStorage.getItem("productLeftObject")!) : {};
    if (productLeftFromStorage[productId]) return productLeftFromStorage[productId];
    productLeftFromStorage[productId] = productLeft;
    sessionStorage.setItem("productLeftObject", JSON.stringify(productLeftFromStorage));
    return productLeft;
};

export const productSoldInPastHour = (productId: string) => {
    if (typeof window === "undefined") return 0;
    const productSold = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
    const productSoldFromStorage = sessionStorage.getItem("productSold") ? JSON.parse(sessionStorage.getItem("productSold")!) : {};
    if (productSoldFromStorage[productId]) return productSoldFromStorage[productId];
    productSoldFromStorage[productId] = productSold;
    sessionStorage.setItem("productSold", JSON.stringify(productSoldFromStorage));
    return productSold;
};