import { IProductReviewObject, productDetailsModal } from "../interface/product";
import { GetUpsellResponse } from "../models/cart/get-response";
import { getVariantIds } from "../utils/product/formatter";
import { cartService } from "../services/cart";
import { productService } from "../services/product";
import { OrderStatuses, Track } from "../models/cart/orders/order-response";
import { trackingStatuses } from "./data-provider";

// Add to cart toast
export const addToCartToastEvent = (isViewCartButtonRequired: boolean) => {
    if (typeof window === "undefined") return;

    sessionStorage.setItem("isViewCartButtonRequired", JSON.stringify(isViewCartButtonRequired));
    const event = new CustomEvent("addToCartToast", {});
    document.dispatchEvent(event);
};

// Get OZ parameter from query string
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

// Get single product reviews
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

// Get multiple product reviews
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

// Resize image
export const resizeImage = (img: string, widthHeight: string) => {
    try {
        if (!img) return img;

        if (img.includes(".png") && img.split(".png").length <= 2) {
            return img.replace(".png", `_${widthHeight}.png`);
        } else if (img.includes(".jpg") && img.split(".jpg").length <= 2) {
            return img.replace(".jpg", `_${widthHeight}.jpg`);
        }

        return img;
    } catch (error) {
        console.log("Error resizing image:", error, img);
        return img;
    }
};

// Filter order status
const filterOutStatus = (orderTrackingStatusList: Track[], basedOn: string) => {
    return orderTrackingStatusList.filter((status) => status.status === basedOn)[0];
};

// Format date
export const formattedDate = (expectedDeliveryDate: string) => {
    const date = new Date(expectedDeliveryDate);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
};

// Get order tracking statuses
export const getOrderTrackingStatuses = (orderTrackingStatusList: Track[] | undefined) => {
    const trackingStatus: OrderStatuses[] = [];

    if (!orderTrackingStatusList || orderTrackingStatusList.length === 0) return trackingStatus;

    trackingStatus.push({
        ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_PLACED),
        active: true,
    });

    const cancelled = orderTrackingStatusList.find(
        (status) => status.status === trackingStatuses.ORDER_CANCELLED && status.eventTimeStamp
    );

    if (cancelled) {
        trackingStatus.push({ ...cancelled, active: true });
    } else {
        trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.READY_TO_SHIP), active: false });
        trackingStatus.push({ ...filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_IN_TRANSIT), active: false });

        for (let i = 1; i < orderTrackingStatusList.length; i++) {
            if (orderTrackingStatusList[i].eventTimeStamp && orderTrackingStatusList[i].status !== trackingStatuses.ORDER_DELIVERED) {
                trackingStatus[1] = { ...orderTrackingStatusList[i], active: true };
            }
        }

        const delivered = filterOutStatus(orderTrackingStatusList, trackingStatuses.ORDER_DELIVERED);
        trackingStatus[2] = delivered?.eventTimeStamp
            ? { ...delivered, active: true }
            : { ...delivered, active: false };
    }

    return trackingStatus;
};

// SSR-safe session storage helpers
export const remainingProductsInStock = (productId: string) => {
    if (typeof window === "undefined") return 0;

    const productLeft = Math.floor(Math.random() * (99 - 49 + 1)) + 49;
    const storage = sessionStorage.getItem("productLeftObject");
    const productLeftFromStorage = storage ? JSON.parse(storage) : {};

    if (productLeftFromStorage[productId]) return productLeftFromStorage[productId];

    productLeftFromStorage[productId] = productLeft;
    sessionStorage.setItem("productLeftObject", JSON.stringify(productLeftFromStorage));
    return productLeft;
};

export const productSoldInPastHour = (productId: string) => {
    if (typeof window === "undefined") return 0;

    const productSold = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
    const storage = sessionStorage.getItem("productSold");
    const productSoldFromStorage = storage ? JSON.parse(storage) : {};

    if (productSoldFromStorage[productId]) return productSoldFromStorage[productId];

    productSoldFromStorage[productId] = productSold;
    sessionStorage.setItem("productSold", JSON.stringify(productSoldFromStorage));
    return productSold;
};