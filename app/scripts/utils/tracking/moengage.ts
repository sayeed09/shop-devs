import { Moengage } from "./gaTracking";

export interface MoengageCartItem {
    product_name: string;
    product_id: string;
    price: string;
    variant_id: string;
    quantity: number;
}

export type PurchaseType = "one_time" | "subscription";

const trackAddToCart = (
    items: MoengageCartItem[],
    purchaseType: PurchaseType = "one_time"
) => {
    const totalPrice = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
    );

    const totalQuantity = items.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
    );

    (window as any).Moengage.track_event("add_to_cart_v2", {
        product_id: items.map((item) => item.product_id),
        variant_id: items.map((item) => item.variant_id),
        total_price: totalPrice,
        total_quantity: totalQuantity.toString(),
        purchase_type: purchaseType
    });
};

export const MoengageTracking = {
    trackAddToCart

}