import React from 'react';
import { UserProfileResponseModel } from '../models/cart/user';

export type IUserAction =
  | {
      type: 'SET_USER_MODEL';
      payload: UserProfileResponseModel;
    }
  | {
      type: 'SET_USER_LOGGED_IN';
      payload: boolean;
    };

export interface IUserState {
  userProfile: UserProfileResponseModel;
  isLoggedIn: boolean;
}

export interface IUserContextModel {
  state: IUserState;
  dispatch: React.Dispatch<IUserAction>;
}
