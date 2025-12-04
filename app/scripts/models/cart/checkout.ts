import { GetCartListResponse, CartItem } from './get-response';

export interface ProceedToCheckoutPayload {
  discount_code: string;
  discount_value?: number;
  order_total?: number;
  order_subtotal?: number;
  payment_hash?: string;
  line_items: CartItem[];
  channel: string;
  page_url: string;
  localstorage_coupon_code?: string;
  cash_apply?: boolean;
  cart_js_response?: CartJSResponse;
}

export interface CartJSResponse {
  data: GetCartListResponse;
  status: any;
  statusText: any;
}

export interface Customer {
  addresses: any[];
}

export interface LineItem {
  variantId: number;
  productId: number;
  image: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice: number;
  discountedPrice: number;
  quantity: number;
  linePrice: number;
  totalDiscount: number;
  option1: string;
  option2: string;
  option3?: any;
  maxQtyAllowed?: any;
}

export interface CheckoutData {
  updated_at: Date;
  free_shipping: boolean;
  shipping_charges: number;
  discount_code?: any;
  discount_value: number;
  incentive_discount: number;
  customer: Customer;
  accepts_marketing: boolean;
  save_address: boolean;
  financial_status: string;
  checkout_id: string;
  created_at: Date;
  shipping_name: string;
  order_total: number;
  order_subtotal: number;
  currency: string;
  line_items: LineItem[];
  status: string;
  channel: string;
  discountBrief: any[];
}

export interface CheckoutResponse {
  status: string;
  data: CheckoutData;
}

export interface GetCheckoutResponseModel {
  updated_at: string;
  free_shipping: boolean;
  shipping_charges: number;
  discount_code?: any;
  discount_value: number;
  incentive_discount: number;
  accepts_marketing: boolean;
  save_address: boolean;
  financial_status: string;
  checkout_id: string;
  created_at: string;
  shipping_name: string;
  order_total: number;
  order_subtotal: number;
  currency: string;
  line_items: Lineitem[];
  status: string;
  channel: string;
  discountBrief: any[];
  checkoutType: string;
  cashbackNonPrime: number;
  cashbackPrime: number;
  metaData?: MetaData;
  orderTotalMrp: number;
  paymentMethodsToShow: string[];
  paymentOptions: PaymentOption[];
  incentive_cashback?: number;
}

export interface PaymentOption {
  method: string;
  isActive: boolean;
  reason: string;
}

export interface Lineitem {
  benefits: string[];
  image: string;
  variantTitle: string;
  quantity: number;
  productId: number;
  linePrice: number;
  handle: string;
  title: string;
  discountedPrice: number;
  price: number;
  maxQtyAllowed?: any;
  option3?: any;
  totalDiscount: number;
  option1: string;
  variantId: number;
  option2: string;
  compareAtPrice: number;
}

export interface AddressModel {
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  country_name: string;
  accepts_marketing?: boolean;
  save_address?: boolean;
}

export interface UpdateCheckoutRequestModel {
  shipping_address: AddressModel;
  billing_address?: AddressModel;
}

export interface FetchByPincodeDetailModel {
  status: string;
  data: PincodeDetails[];
}

interface PincodeDetails {
  officename: string;
  pincode: string;
  officeType: string;
  Deliverystatus: string;
  divisionname: string;
  regionname: string;
  circlename: string;
  Taluk: string;
  Districtname: string;
  statename: string;
  Telephone: string;
  RelatedSuboffice?: string;
  RelatedHeadoffice?: string;
}

export interface PaymentMethodResponseModel {
  updated_at: string;
  free_shipping: boolean;
  shipping_charges: number;
  discount_code?: any;
  discount_value: number;
  incentive_discount: number;
  accepts_marketing: boolean;
  save_address: boolean;
  financial_status: string;
  checkout_id: string;
  created_at: string;
  shipping_name: string;
  order_total: number;
  order_subtotal: number;
  customer: Customer;
  currency: string;
  line_items: Lineitem[];
  billing_address: AddressModel;
  shipping_address: AddressModel;
  status: string;
  channel: string;
  discountBrief: any[];
  checkoutType: string;
  cashbackNonPrime: number;
  cashbackPrime: number;
  metaData: MetaData;
  orderTotalMrp: number;
  paymentMethodsToShow: string[];
  paymentOptions: PaymentOption[];
}

export interface UpdateCheckoutResponseModel {
  data: CheckoutResponseModel;
  status: string;
}

interface CheckoutResponseModel {
  updated_at: string;
  free_shipping: boolean;
  shipping_charges: number;
  discount_code?: any;
  discount_value: number;
  incentive_discount: number;
  accepts_marketing: boolean;
  save_address: boolean;
  financial_status: string;
  checkout_id: string;
  created_at: string;
  shipping_name: string;
  order_total: number;
  order_subtotal: number;
  customer: Customer;
  currency: string;
  line_items: Lineitem[];
  billing_address: AddressModel;
  shipping_address: AddressModel;
  status: string;
  channel: string;
  discountBrief: any[];
  checkoutType: string;
  cashbackNonPrime: number;
  cashbackPrime: number;
  metaData: MetaData;
  payment_methods_to_show: string[];
  paymentOptions: PaymentOption[];
  guestAuthToken: string;
  orderTotalMrp: number;
}
export interface Customer {
  lastOrderId: string;
  phone: string;
  id: string;
  email?: string;
}

export interface MetaData {
  ipAddress: string;
  userAgent: string;
  isNewCustomer: boolean;
}

export type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  pincode: string;
  city: string;
  states: string;
  country: string;
  address1: string;
  address2: string;
  isBillingAddDifferent: string;
  acceptsMarketing: boolean;
  billingPhone: string;
  billingFirstName: string;
  billingLastName: string;
  billingStates: string;
  billingCity: string;
  billingPincode: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCountry: string;
  saveAddress: boolean;
  addressType: string;
};


export interface AddressFetchProgressResponse {
  data: AddressFetchProgress;
}

export interface AddressFetchProgress {
  phone: string
  token: string
  status: string
}
