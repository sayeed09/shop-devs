import React from 'react';
import { FreebiesResponseModel } from '../models/cart/freebies';
import {
  CompareAtPrices,
  GetCartListResponse,
  GetCashResponse,
  GetOfferResponse,
  LocalCartLineItem,
} from '../models/cart/get-response';
import { AddressModel } from '../models/cart/checkout';
import { AddressList } from './product';

export type ICartAction =
  | {
    type: 'REMOVE';
    payload: GetCartListResponse;
  }
  | { type: 'SET_CART_ITEMS'; payload: GetCashResponse }
  | { type: 'SET_COMPARE_AT_PRICES'; payload: CompareAtPrices[] }
  | { type: 'SET_SELECTED_FREEBIES'; payload: FreebiesResponseModel[] }
  | { type: 'SET_DISCOUNT_CODE'; payload: string }
  | { type: 'SET_CASH_APPLIED'; payload: boolean }
  | { type: 'SET_QUICK_BUY_CART'; payload: boolean }
  | { type: 'SET_DEFAULT_ADDRESS'; payload: AddressList }
  | { type: 'SET_EDIT_DEFAULT_ADDRESS'; payload: boolean }
  | { type: 'SET_INITIAL_CART_LOADING'; payload: boolean }
  | { type: 'SET_DISCOUNT_CASH_RESPONSE'; payload: GetCashResponse }
  | { type: 'SET_PROCEED_TO_CHECKOUT_EXP'; payload: boolean }
  | { type: 'SET_SHOW_UPGRADE_CART_OPTION'; payload: boolean }
  | { type: 'SET_CART_AVAILABLE_OFFERS'; payload: GetOfferResponse[] }
  | { type: 'SET_SHOW_SNACKBAR'; payload: boolean }
  | { type: 'SET_LOCAL_CART_ITEMS'; payload: LocalCartLineItem[] };


export interface ICartState {
  cart: GetCashResponse;
  selectedFreebies: FreebiesResponseModel[];
  compareAtPrices: CompareAtPrices[];
  discountCode: string;
  cashApplied: boolean;
  discountAndCashResponse: GetCashResponse;
  initialCartLoading: boolean;
  quickBuyCart?: boolean;
  defaultAddress?: AddressList;
  editDefaultAddress?: boolean;
  ProceedToCheckout?: boolean;
  showUpgradeCartOption?: boolean;
  showSnackbar?: boolean;
  offers?: GetOfferResponse[];
  localCartItems?: LocalCartLineItem[]
}

export interface ICodeVisibility {
  category: string;
  productIds: string[];
  variantIds: string[];
  prioritizedCoupon?: string;
}

export interface IContextModel {
  state: ICartState;
  dispatch: React.Dispatch<ICartAction>;
}

export interface IRedeemableCashData {
  ozivaCash: string;
  redeemableCash: number;
}
export interface IAnalyticsModel {
  checkoutId: string;
  eventInfo: any;
}

export interface ICollectionModel {
  id: string;
  handle: string;
  title: string;
  image: string;
  benefits: string[];
  compareAtPrice: number;
  price: number;
  variantId: string;
}

export interface ICollectionQuery {
  page: number;
  sortBy: string;
  sortOrder: string;
  limit: number;
}

export interface ISubscriptionObject {
  variantId: string | null;
  duration: number;
  planId: string;
}
