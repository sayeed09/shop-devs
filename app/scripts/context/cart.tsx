import React, { useReducer } from 'react';
import { ICartAction, ICartState, IContextModel } from '../interface/cart';
import { GetCashResponse } from '../models/cart/get-response';

const initialState: GetCashResponse = {
  line_items: [],
};
const defaultState: ICartState = {
  cart: initialState,
  selectedFreebies: [],
  compareAtPrices: [],
  cashApplied: false,
  discountCode: '',
  discountAndCashResponse: initialState,
  initialCartLoading: true,
  defaultAddress: undefined,
  quickBuyCart: false,
  editDefaultAddress: false,
  ProceedToCheckout: false,
  showUpgradeCartOption: true,
  showSnackbar: false,
};

const reducer = (state: ICartState, action: ICartAction): ICartState => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cart: action.payload,
      };
    case 'SET_SELECTED_FREEBIES':
      return {
        ...state,
        selectedFreebies: action.payload,
      };
    case 'SET_COMPARE_AT_PRICES':
      return {
        ...state,
        compareAtPrices: action.payload,
      };
    case 'SET_CASH_APPLIED':
      return {
        ...state,
        cashApplied: action.payload,
      };
    case 'SET_DISCOUNT_CODE':
      return {
        ...state,
        discountCode: action.payload,
      };
    case 'SET_DISCOUNT_CASH_RESPONSE':
      return {
        ...state,
        discountAndCashResponse: action.payload,
      };
    case 'SET_INITIAL_CART_LOADING':
      return {
        ...state,
        initialCartLoading: action.payload,
      };
    case 'SET_QUICK_BUY_CART':
      return {
        ...state,
        quickBuyCart: action.payload,
      };
    case 'SET_DEFAULT_ADDRESS':
      return {
        ...state,
        defaultAddress: action.payload,
      };
    case 'SET_EDIT_DEFAULT_ADDRESS':
      return {
        ...state,
        editDefaultAddress: action.payload,
      };
    case 'SET_PROCEED_TO_CHECKOUT_EXP':
      return {
        ...state,
        ProceedToCheckout: action.payload,
      };
    case 'SET_SHOW_UPGRADE_CART_OPTION':
      return {
        ...state,
        showUpgradeCartOption: action.payload,
      };
    case 'SET_SHOW_SNACKBAR':
      return {
        ...state,
        showSnackbar: action.payload,
      };
    case 'SET_CART_AVAILABLE_OFFERS':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};

export const CartContext = React.createContext({} as IContextModel);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
