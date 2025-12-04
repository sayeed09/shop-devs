import { generateEventId } from "./helper";
import { AnalyticsService } from "../services/analytics";
import { fireBuyNowFloodlight } from "./tracking/yoptima";

export interface FBPixelEventParams {
    event: string;
    productId: string;
    productTitle: string;
    price: number;
    currency?: string;
    variantId?: string;
    quantity?: number;
    url?: string;
}
export interface FBPixelMultiItem {
    productId: string;
    productTitle: string;
    price: number;
    currency?: string;
    variantId?: string;
    quantity?: number;
}

export interface FBPixelMultiItemParams {
    event: string;
    items: FBPixelMultiItem[];
    url?: string;
}

export const fireFBPixelEvent = (params: FBPixelEventParams) => {
    const {
        event,
        productId,
        productTitle,
        price,
        currency = "INR",
        variantId,
        quantity = 1,
        url = window.location.href,
    } = params;

    const eventId = generateEventId();

    if (typeof (window as any)?.fbq !== "function") {
        return setTimeout(() => fireFBPixelEvent(params), 300);
    }

    const productIdStr = String(productId ?? "");
    const variantIdStr = String(variantId ?? "");
    const priceStr = String(price ?? "0");
    const quantityStr = String(quantity ?? "1");

    // --- Frontend Pixel ---
    (window as any).fbq("track", event, {
        content_ids: [productIdStr],
        content_type: "product_group",
        content_name: productTitle,
        currency,
        value: Number(priceStr),
        contents: [
            {
                id: productIdStr,
                sku: variantIdStr,
                item_price: Number(priceStr),
                quantity: Number(quantityStr),
                currency,
            },
        ],
    }, { eventID: eventId });

    // --- Server-side Pixel ---
    const requestBody = {
        n: event,
        url,
        id: eventId,
        att: {
            productId: productIdStr,
            productTitle,
            currency,
            price: priceStr,
            variantId: variantIdStr,
            quantity: quantityStr,
        },
    };

    AnalyticsService.sendS2SEvent(requestBody);

    // send atc to YOptima
    if (event === "AddToCart") {
        fireBuyNowFloodlight();
    }
};


export const fireFBPixelMultiItemEvent = (params: FBPixelMultiItemParams) => {
    const { event, items, url = window.location.href } = params;

    const eventId = generateEventId();

    if (typeof (window as any)?.fbq !== "function") {
        return setTimeout(() => fireFBPixelMultiItemEvent(params), 300);
    }

    // For FB Pixel → A single currency must be used
    const currency = items[0]?.currency || "INR";

    const totalValue = items.reduce(
        (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1),
        0
    );

    const contentIds = items.map((i) => String(i.productId));

    const contents = items.map((i) => ({
        id: String(i.productId),
        sku: String(i.variantId ?? ""),
        item_price: Number(i.price || 0),
        quantity: Number(i.quantity || 1),
        currency,
        title: i.productTitle,
    }));

    // ---- Frontend Pixel ----
    (window as any).fbq(
        "track",
        event,
        {
            content_ids: contentIds,
            content_type: "product_group",
            currency,
            value: totalValue,
            contents,
        },
        { eventID: eventId }
    );

    // ---- Server-side Pixel ----
    const requestBody = {
        n: event,
        url,
        id: eventId,
        att: {
            items: items.map((i) => ({
                productId: String(i.productId),
                productTitle: i.productTitle,
                price: String(i.price),
                quantity: String(i.quantity ?? 1),
                variantId: String(i.variantId ?? ""),
                currency,
            })),
        },
    };

    AnalyticsService.sendS2SEvent(requestBody);

    // ---- Floodlight Trigger for ATC ----
    if (event === "AddToCart") {
        fireBuyNowFloodlight();
    }
};