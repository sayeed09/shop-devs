import { UserDetails } from "../models/cart/user";
import { INewBenefit } from "../models/home";
import { GoogleReviews, Section } from "../models/product/productv2";

export interface ProductOptionModal {
  name: string;
  position: number;
  values: string[];
}
export interface ProductResponseModal {
  data: productDetailsModal;
  error: ProductErrorResponseModal;
}
export interface ProductErrorResponseModal {
  errorCode: string;
  message: string;
}
export interface ProductImageModal {
  alt: string;
  id: string;
  src: string;
  position: number;
  variantIds: number[];
}
export interface ProductIdDataType {
  productId: string;
  productImage?: string;
  loadingImage?: string;
  loadingText?: string;
}
export interface ProductVariant {
  oldPrice?: number | undefined;
  src?: string | undefined;
  id: string;
  title: string;
  price: number;
  position: number;
  compareAtPrice: number;
  option1: string;
  option2: string;
  option3: string;
  imageId: string;
  inventoryQuantity: number;
  requireShipping: boolean;
  maxQtyAllowed: null;
  visibileOnPdp: boolean;
  isColdUserSuitable: boolean;
  consumptionSpanType: string | null;
  consumptionSpan: number;
  subHeader: string;
  attractor: string;
  placeholderProduct: string;
  isRecommended?: boolean;
}
export interface SubscriptionData {
  data: SubscriptionDataRes;
  message: string;
}
export interface SubscriptionDataRes {
  subscribable: boolean;
  variant_id: string;
  discount_range: string;
  plans: SubscriptionPlan[];
}
export interface IProductState {
  productDetails: ProductVariant;
  productAllVariant: ProductVariant[];
  selectedImage: ProductImageModal;
  seoData: SEO;
  subscriptionPlan: SubscriptionPlan;
  selectedOption: any[];
  productTitle: string;
  componentState: ComponentModal;
  productReview: IProductReviewObject;
}

export interface ComponentModal {
  isProductDetailLoad: boolean;
  isConfigDetailLoad: boolean;
  isBottomSectionLoad: boolean;
}

export interface SubscriptionPlan {
  plan_id: string;
  subscription_frequency: string;
  subscription_interval: number;
  base_price: number;
  compare_at_price: number;
  savings: string;
}

export interface IProductReviewsPayload {
  ids: string[];
}

export interface IProductReviewObject {
  id?: string;
  averageRating: string;
  numberOfReviews: string;
}

export interface IProductReview {
  product: IProductReviewObject[];
}

export interface IProductReviewsResponse {
  data: IProductReview;
}

export type IProductAction =
  | {
    type: 'SET_PRODUCT_MODEL';
    payload: ProductVariant;
  }
  | {
    type: 'SET_PRODUCT_VARIANT';
    payload: ProductVariant[];
  }
  | {
    type: 'SET_SELECTED_IMAGE';
    payload: ProductImageModal;
  }
  | {
    type: 'SET_SEO';
    payload: SEO;
  }
  | {
    type: 'SET_ACTIVE_PLAN';
    payload: SubscriptionPlan;
  }
  | {
    type: 'SET_SELECTED_OPTION';
    payload: any[];
  }
  | {
    type: 'SET_PRODUCT_TITLE';
    payload: string;
  }
  | {
    type: 'LAZY_COMPONENT';
    payload: ComponentModal;
  }
  | {
    type: 'SET_PRODUCT_REVIEW';
    payload: IProductReviewObject;

  };

export interface IProductContextModel {
  state: IProductState;
  dispatch: React.Dispatch<IProductAction>;
}
export interface ReviewDataRes {
  badge: string;
  product_external_id: number;
}

export interface ProductDetails {
  formatted_quantity: string[];
  sold_by: string[];
  manufatured_by: string[];
  expiry_date: string[];
  subtitle: string[];
}

export interface SubscriptionFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  countryName: string;
  acceptsMarketing: boolean;
  saveAddress: boolean;
}

export interface RazorPayOption {
  key: string;
  subscription_id: any;
  name: string;
  description: string;
  image: string;
  callback_url: string;
  prefill: PrefillOption;
  theme: themeOption;
}

export interface PrefillOption {
  name: string;
  contact: any;
}

export interface themeOption {
  color: string;
}

export interface ConfigModal {
  banner: string[];
  eb: string[];
  faq: FAQModal;
  hte: HTEModal;
  lbt: LBTModal;
  wimh: WIMHModal;
  wmib: WMIBModal;
  wmig: WMIGModal;
}

export interface WIMHModal {
  bullets: string;
  footer: string;
  heading: string;
}

export interface LBTModal {
  content: LBTContentModal[];
}

export interface LBTContentModal {
  customerName: string;
  image: string;
  review: string;
}

export interface HTEModal {
  content: HTEContentModal[];
  reciepies: HTEReciepiesModal[];
}

export interface HTEContentModal {
  heading: string;
  icon: string;
}

export interface HTEReciepiesModal {
  heading: string;
  video: string;
}

export interface WMIGModal {
  backgroundDesktop: string;
  backgroundMobile: string;
  content: WMIGContentModal[];
}

export interface WMIGContentModal {
  description: string;
  title: string;
  image: string;
}

export interface WMIBModal {
  backgroundDesktop: string;
  backgroundMobile: string;
  content: WMIBContentModal[];
}

export interface WMIBContentModal {
  title: string;
  image: string;
}

export interface ConsumerModal {
  data: ConsumerDataModal[];
  subtext: string;
  title: string;
}

export interface ConsumerDataModal {
  description: string;
  header: string;
}

export interface HowDoesWorksDataModal {
  description: string;
  image: string;
}

export interface CertificateModal {
  certificate: string;
  description: string;
  thumbnail: string;
  title: string;
}

export interface FAQModal {
  content: FAQContentModal[];
}

export interface FAQContentModal {
  answer: string;
  question: string;
}
export interface VisibilityResponse {
  code: string;
  description: string;
  endAt: string;
  landingPage: string;
  listing: string[];
  minQuantity: number;
  minSubtotal: number;
  productIds: string[];
  startAt: string;
  title: string;
  type: string;
  validOn: string;
  variantIds: string[];
  imageSrc: string;
}

export interface getVariantInfoResponse {
  formatted_quantity: string;
  inventory_details: InventoryDetailsModal;
  position: number;
  quantity: number;
  title: string;
  variant_id: string;
  subtitle?: string;
}

export interface InventoryDetailsModal {
  expiry_date: string;
  manufatured_by: ManufacturedModal;
  sold_by: SoldByModal;
}

export interface ManufacturedModal {
  address: string;
  id: number;
  name: string;
}

export interface SoldByModal {
  address: string;
  name: string;
}

export interface CustomerModal {
  product_external_id: number;
  widget: string;
}

export interface ZipResponseModal {
  data: ZipDataModal[];
  status: string;
}

export interface ZipDataModal {
  Deliverystatus: string;
  Districtname: string;
  'Related Headoffice': string;
  'Related Suboffice': string;
  Taluk: string;
  Telephone: string;
  circlename: string;
  divisionname: string;
  officeType: string;
  officename: string;
  pincode: string;
  regionname: string;
  statename: string;
}

export interface subscriptionCustomerModal {
  data: subscriptionIDModal;
}

export interface subscriptionIDModal {
  customerID: number;
  paymentMethodToShow: string[];
}

export interface subscriptionFormModal {
  address1: string;
  address2: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  saveAddress: boolean;
  zip: string;
}

export interface subscriptionBillingModal {
  id?: number;
  zip: string;
  city: string;
  province: string;
  country: string;
  billingAddress1: string;
  billingAddress2: string;
  phone: string;
  country_name?: string;
}

export interface DeliveryDataModal {
  pincode: number;
  displayRange: string;
}

export interface productDetailsModal {
  id: string;
  title: string;
  description: string;
  vendor: string;
  handle: string;
  status: string;
  variants: ProductVariant[];
  options: ProductOptionModal[];
  images: ProductImageModal[];
  seo: SEO;
  footer: SEO;
  benefits: string[];
  howItWorks: HowItWorks;
  consumerStudy: ConsumerStudy;
  whatMakesItGood: HowItWorks;
  scientificallyTested: ScientificallyTested;
  recommendedByExperts: RecommendedByExperts;
  faq: FAQ[];
  howToUse: HowToUse;
  lovedByThousand: LovedByThousand;
  sellingFastAndTimerNudge: boolean;
  verifiedResults: IVerifiedResult;
  clinicalStudies: IClinicalStudy;
  templateName: string;
  sections?: Section[];
  googleReviews?: GoogleReviews;
  newBenefitChips?: INewBenefit;
  labReportSection?: ILabReportSection;
}

export interface ILabReportSection {
  heading: string;
  content: string;
}

export interface IVerifiedResult {
  title: string;
  data: IVerifiedResultDatum[];
}

export interface IVerifiedResultDatum {
  image: string;
  deviceType: DeviceType;
}

enum DeviceType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export interface IClinicalStudyDatum {
  image: string;
  deviceType: DeviceType;
}

export interface IClinicalStudy {
  data: IClinicalStudyDatum[];
}
export interface HowItWorks {
  title: null | string;
  data: HighlightElement[];
}

export interface HighlightElement {
  title: string;
  image: string;
  position: number;
  description?: string;
}

export interface ConsumerStudy {
  title: string;
  subtext: string;
  data: ConsumerStudyDatum[];
}

export interface ConsumerStudyDatum {
  header: string;
  description: string;
  position: number;
}

export interface ScientificallyTested {
  title: string;
  certificates: Certificate[];
  highlights: Highlight[];
}

export interface Certificate {
  thumbnail: string;
  certificate: string;
  title: string;
  description: string;
  position: number;
}

export interface Highlight {
  title: string;
  image: string;
  position: number;
}
export interface RecommendedByExperts {
  title: string;
  image: string;
  description: string;
}

export interface UserLoginValue {
  phone?: string | null;
  accessToken?: string | null;
}

export interface LoginData {
  phone: string;
  source: string;
  type: string;
}

export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  acceptsMarketing: boolean;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  province: string;
  country: string;
  addressType: string;
  defaultAddress: boolean;
}

export interface OtpData {
  OTP: string;
  phone: string;
  source: string;
  type: string;
  shipRocketValidationToken?: string;
  consentForAddressUse?: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface OtpVerifyData {
  tokens: Tokens;
  phone: string;
  message: string;
  status: string;
  addressImportToken?: string;
}

export interface AddressList {
  acceptsMarketing: boolean;
  address1: string;
  address2: string;
  addressType: string;
  city: string;
  country: string;
  countryCode: string;
  countryName: string;
  createdAt: string;
  defaultAddress: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  phone: string;
  province: string;
  provinceCode: string;
  updatedAt: string;
  userId: number;
  zip: string;
}

export interface StateArrayList {
  key: string;
  value: string;
}

export interface VariantDetails {
  variant: ProductVariant;
  image: string;
}
export interface FAQ {
  question: string;
  answer: string;
  position: number;
  link: string;
  linkText: string;
}
export interface HowToUse {
  caption: null | string;
  data: string[];
}

export interface LovedByThousandData {
  image: string;
  position: number;
  rating: string;
  review: string;
  reviewerName: string;
}
export interface LovedByThousand {
  title: null | string;
  data: LovedByThousandData[];
}

export interface SEO {
  title: string;
  description: string;
}

export interface OZHelpDeskMoEngageJson {
  phone_number: string;
  login_status: boolean;
  prime_status: boolean;
  shopifyCustomer?: UserDetails;
}

export interface SubscriptionProductDetails {
  compareAtPrice: number;
  handle: string;
  image: string;
  price: number;
  product_id: string;
  quantity: number;
  title: string;
  variant_id: string | null;
  subscriptionPlan: number;
  benefitChips?: string[];
  planId: string;
}

export interface PrivacyAndTerms {
  body: string;
  title: string;
}

export interface GetDeliveryDetailResponseModel {
  pincode: number;
  warehouse: string;
  city: string;
  state: string;
  pickrrZone: string;
  orderToDeliverTat: number;
  displayRange: string;
}