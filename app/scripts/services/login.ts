import axios from "axios";
import { IExpiredAccessToken, SendOtpResponsetModel } from "../interface/authentication";
import { LoginData, OtpData } from "../interface/product";
import { baseEndpoints } from "../utils/endpoints";
import { getFromCookie } from "../utils/product/formatter";
import { getEnvironmentValue } from "../utils/helper";

const otpVerify = async (otpData: OtpData) => {
  const { data } = await axios
    .post(baseEndpoints.otpVerify, otpData)
    .then((response) => {
      return response;
    });
  return data;
};
const getRenewableAccessToken = async (expiredAccessToken: IExpiredAccessToken) => {
  const authorizationToken: string = getFromCookie(`refreshToken${getEnvironmentValue()}`);
  if (authorizationToken) {
    const { data } = await axios
      .post<any>(
        `${baseEndpoints.refreshToken}`,
        expiredAccessToken, {
        headers: { 'Authorization': `Bearer ${authorizationToken}` }
      })
      .then((response) => {
        return response;
      })

    return data;
  }
};

const sendOtp = async (loginData: LoginData): Promise<SendOtpResponsetModel> => {
  const { data } = await axios
    .post(baseEndpoints.login, loginData)
    .then((response) => {
      return response;
    });
  return data;
};


export const loginService = {
  getRenewableAccessToken,
  otpVerify,
  sendOtp,
}