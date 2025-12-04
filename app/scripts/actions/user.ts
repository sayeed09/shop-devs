import { IUserAction } from '../interface/user';
import { UserProfileResponseModel } from '../models/cart/user';

export const setUserModel = (
  userProfile: UserProfileResponseModel,
): IUserAction => ({
  type: 'SET_USER_MODEL',
  payload: userProfile,
});

export const setUserLoggedIn = (isLoggedIn: boolean): IUserAction => ({
  type: 'SET_USER_LOGGED_IN',
  payload: isLoggedIn,
});
