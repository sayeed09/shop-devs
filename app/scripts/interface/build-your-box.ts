import { IProductReviewObject } from '../interface/product';

export interface IBYBItem {
    benefits: string[];
    compareAtPrice: number;
    handle: string;
    id: string;
    image: string;
    price: number;
    title: string;
    variantId: string;
    itemReviews: IProductReviewObject;
    collectionHandle?:string;
}

export interface ISelectedVariants {
    variant_id: string;
}

export interface IRequiredData {
    title: string[];
    totalMRP: number;
    discountOnMRP: number;
}
