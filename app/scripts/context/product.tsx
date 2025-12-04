import React, { useReducer } from 'react';
import {
  IProductState,
  IProductAction,
  IProductContextModel,
} from '../interface/product';

const defaultState: IProductState = {
  productDetails: null,
  productAllVariant: null,
  selectedImage: null,
  seoData: null,
  subscriptionPlan: null,
  selectedOption: [],
  productTitle: null,
  componentState: null,
  productReview: null
};

const reducer = (
  state: IProductState,
  action: IProductAction,
): IProductState => {
  switch (action.type) {
    case 'SET_PRODUCT_MODEL':
      return {
        ...state,
        productDetails: action.payload,
      };
    case 'SET_PRODUCT_VARIANT':
      return {
        ...state,
        productAllVariant: action.payload,
      };
    case 'SET_SELECTED_IMAGE':
      return {
        ...state,
        selectedImage: action.payload,
      };
    case 'SET_SEO':
      return {
        ...state,
        seoData: action.payload,
      };
    case 'SET_ACTIVE_PLAN':
      return {
        ...state,
        subscriptionPlan: action.payload,
      };
    case 'SET_SELECTED_OPTION':
      return {
        ...state,
        selectedOption: action.payload,
      };
    case 'SET_PRODUCT_TITLE':
      return {
        ...state,
        productTitle: action.payload,
      };
    case 'LAZY_COMPONENT':
      return {
        ...state,
        componentState: action.payload,
      };
    case 'SET_PRODUCT_REVIEW':
      return {
        ...state,
        productReview: action.payload,
      };
    default:
      return state;
  }
};

export const ProductContext = React.createContext({} as IProductContextModel);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
