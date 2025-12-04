import React from 'react';

export type IAuthenticationAction =
  {
    type: 'USER_LOGIN_REQUIRED';
    payload: boolean;
  } |
  {
    type: 'SHIPROCKET_LOGIN_REQUIRED';
    payload: boolean;
  }
  |
  {
    type: 'SHIPROCKET_ADDRESS_OPT_IN';
    payload: boolean;
  } |
  {
    type: 'SHIPROCKET_VALIDATION_TOKEN';
    payload: string;
  } |
  {
    type: 'SHIPROCKET_ADDRESS_FETCH_TOKEN';
    payload: string;
  };


export interface IAuthenticationState {
  isLoginRequired: boolean;
  shipRocketLogin?: boolean;
  shipRocketAddressOptin?: boolean;
  shipRocketAddressFetchToken?: string;
  shipRocketValidationToken?: string;
}

export interface IAuthenticationContextModel {
  state: IAuthenticationState;
  dispatch: React.Dispatch<IAuthenticationAction>;
}

export interface IExpiredAccessToken {
  expired: string;
}

export interface SendOtpResponsetModel {
  status: string
  message: string
  shiprocketOtpToken?: string
}
