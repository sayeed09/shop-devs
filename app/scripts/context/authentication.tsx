import React, { useReducer } from 'react';
import {
  IAuthenticationAction,
  IAuthenticationContextModel,
  IAuthenticationState,
} from '../interface/authentication';

const defaultState: IAuthenticationState = {
  isLoginRequired: false,
  shipRocketAddressOptin: true
};

const reducer = (
  state: IAuthenticationState,
  action: IAuthenticationAction,
) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUIRED':
      return {
        ...state,
        isLoginRequired: action.payload,
      };
    case 'SHIPROCKET_ADDRESS_OPT_IN':
      return {
        ...state,
        shipRocketAddressOptin: action.payload
      };
    case 'SHIPROCKET_ADDRESS_FETCH_TOKEN':
      return {
        ...state,
        shipRocketAddressFetchToken: action.payload
      };
    case 'SHIPROCKET_VALIDATION_TOKEN':
      return {
        ...state,
        shipRocketValidationToken: action.payload
      };
    default:
      return state;
  }
};
export const AuthenticationContext = React.createContext(
  {} as IAuthenticationContextModel,
);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AuthenticationContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
