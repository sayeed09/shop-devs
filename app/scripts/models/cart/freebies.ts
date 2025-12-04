export interface FreebiesResponseModel {
  variant_id: number;
  product_id: number;
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
  option_2?: any;
  option_3?: any;
  max_qty_allowed?: any;
  type: any;
}

export interface FreebieRequestModel {
  variants: VariantRequestModel[];
}
export interface CashRequestModel {
  variants: VariantRequestModel[];
  cashApply: boolean;
}
export interface CouponRequestModel {
  variants: VariantRequestModel[];
  discountCode?: string | undefined;
  cashApply?: boolean
}
export interface VariantRequestModel {
  id: number | undefined;
  quantity: number | undefined;
  type?: string;
}
