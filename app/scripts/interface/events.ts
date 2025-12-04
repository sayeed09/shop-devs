export interface gaEventAttributes {
    currency: string;
    value: number
    items: gaEventItems[];
}

export interface gaEventItems {
    item_id: string;
    item_name: string;
    discount: number;
    index?: number;
    item_brand: string;
    item_variant: string;
    price: number;
    quantity: number;
}