import { ICartAction } from '../interface/cart';
import { AddressList } from '../interface/product';
import { AddressModel } from '../models/cart/checkout';
import { FreebiesResponseModel } from '../models/cart/freebies';
import {
  CompareAtPrices,
  GetCartListResponse,
  GetCashResponse,
  GetOfferResponse,
} from '../models/cart/get-response';

export const removeItem = (cartItem: GetCartListResponse): ICartAction => ({
  type: 'REMOVE',
  payload: cartItem,
});

export const setCartItems = (cartItem: GetCashResponse): ICartAction => ({
  type: 'SET_CART_ITEMS',
  payload: cartItem,
});

export const setSelectedFreebies = (
  selectedFreebies: FreebiesResponseModel[],
): ICartAction => ({
  type: 'SET_SELECTED_FREEBIES',
  payload: selectedFreebies,
});

export const setDiscountCode = (code: string): ICartAction => ({
  type: 'SET_DISCOUNT_CODE',
  payload: code,
});
export const setCashApplied = (applied: boolean): ICartAction => ({
  type: 'SET_CASH_APPLIED',
  payload: applied,
});

export const setDiscountAndCashResponse = (
  response: GetCashResponse,
): ICartAction => ({
  type: 'SET_DISCOUNT_CASH_RESPONSE',
  payload: response,
});

export const setInitialCartLoading = (loading: boolean): ICartAction => ({
  type: 'SET_INITIAL_CART_LOADING',
  payload: loading,
});

export const setQuickBuyCart = (isQuickBuy: boolean): ICartAction => ({
  type: 'SET_QUICK_BUY_CART',
  payload: isQuickBuy,
});
export const setDefaultAddress = (address: AddressList): ICartAction => ({
  type: 'SET_DEFAULT_ADDRESS',
  payload: address,
});
export const setEditDefaultAddress = (isEdit: boolean): ICartAction => ({
  type: 'SET_EDIT_DEFAULT_ADDRESS',
  payload: isEdit,
});
export const setProceedToCheckout = (proceedToCheckout: boolean): ICartAction => ({
  type: 'SET_PROCEED_TO_CHECKOUT_EXP',
  payload: proceedToCheckout,
});
export const setShowUpgradeCartOption = (showUpgradeCartOption: boolean): ICartAction => ({
  type: 'SET_SHOW_UPGRADE_CART_OPTION',
  payload: showUpgradeCartOption,
});
export const setShowSnackbar = (showSnackbar: boolean): ICartAction => ({
  type: 'SET_SHOW_SNACKBAR',
  payload: showSnackbar,
});

export const setCartAvailableOffers = (offers: GetOfferResponse[]): ICartAction => ({
  type: 'SET_CART_AVAILABLE_OFFERS',
  payload: offers,
});