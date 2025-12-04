import { IAuthenticationAction } from '../interface/authentication';

export const isUserLoginRequired = (isLoginRequired: boolean): IAuthenticationAction => ({
  type: 'USER_LOGIN_REQUIRED',
  payload: isLoginRequired,
});

export const shiprocketLoginRequired = (isLoginRequired: boolean): IAuthenticationAction => ({
  type: 'SHIPROCKET_LOGIN_REQUIRED',
  payload: isLoginRequired,
});

export const shiprocketAddressOptin = (optin: boolean): IAuthenticationAction => ({
  type: 'SHIPROCKET_ADDRESS_OPT_IN',
  payload: optin,
});

export const shipRocketValidationToken = (token: string): IAuthenticationAction => ({
  type: 'SHIPROCKET_VALIDATION_TOKEN',
  payload: token,
});

export const shipRocketAddressFetchToken = (token: string): IAuthenticationAction => ({
  type: 'SHIPROCKET_ADDRESS_FETCH_TOKEN',
  payload: token,
});



