import { INewBenefit } from "../models/home"



export interface IProduct {
    index?: number
    variantId: string;
    productId: string;
    title: string;
    price: string;
    compareAtPrice: string;
    benefits?: string[];
    handle: string;
    image: string;
    averageRating: string;
    numberOfReviews: string;
    productTag?: IProductTag;
    benefitsNew?: INewBenefit;
    options?: string[];
}
export interface IProductTag {
    name?: string;
    color?: string;
}

export interface SearchRequestModel {
    minQueryLength: number
    productsCount: number
    q: string
    sort: string
}

export interface AutocompleteResponseModel<T> {
    payload: T;
    status: number
    statusCode: number
    message: string
    time: number
    requestId: string
    responseId: string
}

export interface AutocompletePayload {
    categories: any[]
    brands: any[]
    others: any[]
    pages: any[]
    products: Products
}
export interface SearchResultPayload {
    result: Result[]
    total: number
    hasExactMatch: boolean
    pages: number
    filters: Filters
    configs: Configs
}

export interface Products {
    result: Result[]
    total: number
    hasExactMatch: boolean
    pages: number
    filters: Filters
    configs: Configs
}



export interface Attribute {
    valuesAll: any[]
    values: Value[]
    name: string
    id: string
    type?: string
}


export interface Category {
    name: string
    id: string
}

export interface Filters {
    sort: Sort[]
    q: string
    page: number
    productsCount: number
    currency: string
    getAllVariants: string
    variantsGroup: string
    showOOSProductsInOrder: string
    attributeFacetValuesLimit: number
    searchedKey: string
}

export interface Sort {
    field: string
    order: string
}

export interface Configs {
    currency: Currency
}

export interface Currency {
    symbol: string
    code: string
}


export interface Root {
    payload: Payload
    status: number
    statusCode: number
    message: string
    time: number
    requestId: string
    responseId: string
}

export interface Payload {
    result: Result[]
    total: number
    hasExactMatch: boolean
    pages: number
    filters: Filters
    configs: Configs
}

export interface Result {
    images: any[]
    groupId: string
    finalPrice: number
    discount: number
    colors: any[]
    url: string
    discountPercentage: number
    sellingPrice: number
    totalReviews: number
    mainImage: string
    sizes: any[]
    avgRatings: number
    price: number
    name: string
    inStock: boolean
    attributes: Attribute[]
    id: string
    categories: Category[]
    sku: any[]
    brand: string
    allVariantsGroup: any[]
}

export interface Attribute {
    valuesAll: any[]
    values: Value[]
    name: string
    id: string
    type?: string
}

export interface Value {
    variationId: string
    value: any[]
}

export interface Category {
    name: string
    id: string
}

export interface Filters {
    sort: Sort[]
    q: string
    page: number
    productsCount: number
    currency: string
    getAllVariants: string
    variantsGroup: string
    showOOSProductsInOrder: string
    attributeFacetValuesLimit: number
    searchedKey: string
}

export interface Sort {
    field: string
    order: string
}

export interface Configs {
    currency: Currency
}

export interface Currency {
    symbol: string
    code: string
}


export interface SearchListModel {
    products: Result[];
    totalResults: number;
}