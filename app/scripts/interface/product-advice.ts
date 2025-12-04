import React from 'react';

export enum EIsComponent {
  done = 'done',
  active = 'active',
  empty = ''
}

export interface ICustomerGoal {
  name: string;
  icon: string;
}

export interface ICustomerGoalObj {
  gender: string;
  goal: ICustomerGoal[];
}

export interface IGoalList {
  data: ICustomerGoalObj[];
}

export interface IRecommendProductDetailList {
  data: IRecommendProductDetails[];
}

export interface IRecommendProductDetails {
  concern: string;
  discountCode: string;
  goal: string;
  product: IRecommendProduct;
  recommendedUse: string
}

export interface IRecommendProductImage {
  alt: string | null;
  id: string;
  position: number;
  src: string;
}

export interface IProductVariant {
  compareAtPrice: number;
  id: string;
  imageId: string;
  inventoryQuantity: number;
  isColdUserSuitable: boolean;
  maxQtyAllowed: string;
  option1: string;
  option2: string;
  option3: string;
  position: number;
  price: number;
  requireShipping: boolean;
  title: string;
  visibileOnPdp: boolean;
}

export interface IRecommendProduct {
  handle: string;
  id: string;
  images: IRecommendProductImage[];
  title: string;
  variants: IProductVariant;
}

export interface IConcern {
  id: number;
  name: string;
}

export interface IConcernListState {
  id: number;
  goalName: string;
  concernName:string;
}

export interface IConcerns {
  goal: string;
  concerns: IConcern[];
}

export interface IConcernsResponse {
  data: IConcerns[];
}

export type IProductAdviceAction = {
  type: 'SET_GOAL_CONCERS';
  payload: IConcernsResponse;
};

export interface IProductAdviceState {
  concerns: IConcernsResponse;
}

export interface IProductAdviceContextModel {
  state: IProductAdviceState;
  dispatch: React.Dispatch<IProductAdviceAction>;
}
