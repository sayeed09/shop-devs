import React, { useReducer } from 'react';
import { IUserAction, IUserContextModel, IUserState } from '../interface/user';
import { UserProfileResponseModel } from '../models/cart/user';

const initialState: UserProfileResponseModel = {
  identityHash: '',
  prime: null,
  urls: null,
  userDetails: null,
  wallet: null,
  chatlineAccess: false
};

const defaultState: IUserState = {
  userProfile: initialState,
  isLoggedIn: false,
};

const reducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case 'SET_USER_MODEL':
      return {
        ...state,
        userProfile: action.payload,
      };
    case 'SET_USER_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export const UserContext = React.createContext({} as IUserContextModel);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
