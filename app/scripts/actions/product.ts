/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  IProductAction,
  ProductImageModal,
  SubscriptionPlan,
  ProductVariant,
  ComponentModal,
  SEO,
  IProductReviewObject,
} from '../interface/product';

export const setProductModel = (
  productDetails: ProductVariant,
): IProductAction => ({
  type: 'SET_PRODUCT_MODEL',
  payload: productDetails,
});

export const setProductVariant = (
  productAllVariant: ProductVariant[],
): IProductAction => ({
  type: 'SET_PRODUCT_VARIANT',
  payload: productAllVariant,
});

export const setSelectedImage = (
  productAllVariant: ProductImageModal,
): IProductAction => ({
  type: 'SET_SELECTED_IMAGE',
  payload: productAllVariant,
});

export const setSeoData = (seoData: SEO): IProductAction => ({
  type: 'SET_SEO',
  payload: seoData,
});

export const activeSubscribePlan = (
  subscriptionPlan: SubscriptionPlan,
): IProductAction => ({
  type: 'SET_ACTIVE_PLAN',
  payload: subscriptionPlan,
});

export const setSelectedOption = (selectedOption: any[]): IProductAction => ({
  type: 'SET_SELECTED_OPTION',
  payload: selectedOption,
});

export const setProductTitle = (productTitle: string): IProductAction => ({
  type: 'SET_PRODUCT_TITLE',
  payload: productTitle,
});

export const loadComponent = (
  componentHierarchy: ComponentModal,
): IProductAction => ({
  type: 'LAZY_COMPONENT',
  payload: componentHierarchy,
});

export const setProductReviewDetails = (productReview: IProductReviewObject): IProductAction => ({
  type: 'SET_PRODUCT_REVIEW',
  payload: productReview,
});