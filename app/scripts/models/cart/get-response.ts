/* eslint-disable */
export interface Attributes { }

export interface Properties { }

export interface FeaturedImage {
  aspect_ratio: number;
  alt: string;
  height: number;
  url: string;
  width: number;
}

export interface CartItem {
  id?: number;
  properties?: Properties;
  quantity?: number;
  variant_id?: number;
  key?: string;
  title?: string;
  price?: number;
  original_price?: number;
  discounted_price?: number;
  line_price?: number;
  original_line_price?: number;
  total_discount?: number;
  discounts?: any[];
  sku?: string;
  grams?: number;
  vendor?: string;
  taxable?: boolean;
  product_id?: number;
  product_has_only_default_variant?: boolean;
  gift_card?: boolean;
  final_price?: number;
  final_line_price?: number;
  url?: string;
  featured_image?: FeaturedImage;
  image?: string;
  handle?: string;
  requires_shipping?: boolean;
  product_type?: string;
  product_title?: string;
  product_description?: string;
  variant_title?: string;
  variant_options?: string[];
  options_with_values?: OptionsWithValue[];
  line_level_discount_allocations?: any[];
  line_level_total_discount?: number;
  benefits?: string[];
  compare_at_price?: number;
  max_qty_allowed?: any;
  option_1?: string;
  option_2?: string;
  option_3?: string;
}

export interface GetCartListResponse {
  token?: string;
  note?: any;
  attributes?: Attributes;
  original_total_price?: number;
  total_price?: number;
  total_discount?: number;
  total_weight?: number;
  item_count?: number;
  items?: CartItem[];
  requires_shipping?: boolean;
  currency?: string;
  items_subtotal_price?: number;
  cart_level_discount_applications?: any[];
}

export interface GetUpsellResponse {
  compare_at_price: number;
  image?: string;
  price: number;
  product_id: string;
  title: string;
  variant_id: string;
  product_handle: string;
  benefits?: string[];
  product_title: string;
}

export interface GetCashResponse {
  discount_brief?: any;
  discount_code?: string;
  free_shipping?: boolean;
  line_items: LineItem[];
  order_subtotal?: number;
  order_total?: number;
  shipping_charges?: number;
  shipping_name?: string;
  total_discount?: number;
  cashback_non_prime?: number;
  cashback_prime?: number;
  order_total_mrp?: number;
}

export interface GetOfferResponse {
  code: string;
  title?: string;
  description: string;
  startAt: Date;
  endAt: Date | null;
  minQuantity: number;
  minSubtotal: number;
  productIds?: any;
  variantIds?: any;
  type: string;
  validOn?: string;
  listing: any[];
  landingPage?: string;
}

export interface OptionsWithValue {
  name: string;
  value: string;
}

export interface AddCartItemResponse {
  id: number;
  properties?: any;
  quantity: number;
  variant_id: number;
  key: string;
  title: string;
  price: number;
  original_price: number;
  discounted_price: number;
  line_price: number;
  original_line_price: number;
  total_discount: number;
  discounts: any[];
  sku: string;
  grams: number;
  vendor: string;
  taxable: boolean;
  product_id: number;
  product_has_only_default_variant: boolean;
  gift_card: boolean;
  final_price: number;
  final_line_price: number;
  url: string;
  featured_image: FeaturedImage;
  image: string;
  handle: string;
  requires_shipping: boolean;
  product_type: string;
  product_title: string;
  product_description: string;
  variant_title: string;
  variant_options: string[];
  options_with_values: OptionsWithValue[];
  line_level_discount_allocations: any[];
  line_level_total_discount: number;
}

export interface CompareAtPrices {
  variant_id: number;
  compare_at_price: number;
}

export interface LineItem {
  benefits: string[];
  variant_id: any;
  product_id: any;
  image: string;
  title: string;
  variant_title: string;
  price: number;
  compare_at_price: number;
  discounted_price: number;
  quantity: number;
  line_price: number;
  total_discount: number;
  option_1: string;
  option_2: string;
  option_3?: any;
  max_qty_allowed?: any;
  handle: string;
  product_title: string;
}

export interface PriceModel {
  subtotal: number;
  discount: number;
  cashDiscount?: number;
  shippingCharges: number;
  deliveryCharges: number;
  totalPayable?: number;
  incentiveDiscount: number;
  freebiesDiscount?: number;
  orderTotal: number;
}


export interface LocalCartLineItem {
  variantId: string;
  quantity: number;
}