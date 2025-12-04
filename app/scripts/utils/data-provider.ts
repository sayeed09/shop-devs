export const trackingStatusBeforeDescription = {
    "Order Placed": 'Order yet to be placed',
    "Order Confirmed": 'Order yet to be Confirmed',
    "Ready To Ship": 'Order is being prepared',
    "Order In Transit": 'Order is being prepared',
    "Order Delivered": 'Order yet to be delivered',
    "Order Returned": "",
    "Order Cancelled": ""
}
export const trackingStatusAfterDescription = {
    "Order Placed": 'Order was placed successfully',
    "Order Confirmed": 'Order Confirmed',
    "Ready To Ship": 'Order ready to be shipped',
    "Order In Transit": 'Order is scheduled for Delivery',
    "Order Delivered": 'Order out for delivery',
    "Order Returned": "",
    "Order Cancelled": "",
}

export enum trackingStatuses {
    ORDER_PLACED = "Order Placed",
    ORDER_CONFIRMED = 'Order Confirmed',
    READY_TO_SHIP = 'Ready To Ship',
    ORDER_IN_TRANSIT = 'Order In Transit',
    ORDER_DELIVERED = 'Order Delivered',
    ORDER_RETURNED = 'Order Returned',
    ORDER_CANCELLED = 'Order Cancelled',
    ORDER_PARTIALLY_DELIVERED = 'Order Partially Delivered',
}

export const OneMonthConsultMRP = 149900;

export const ThreeMonthConsultMRP = 249900;

export const productCardBreakPoints = {
    small: `450x450`,
    medium: `500x500`,
    large: `550x550`,
}

export const bannerBreakPoints = {
    small: `500x500`,
    medium: `700x700`,
    large: `1600x1600`,
}

export const bubbleImageBreakPoints = {
    small: `120x120`,
    medium: `200x200`,
    large: `320x320`,
}
