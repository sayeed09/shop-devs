import { UserProfileResponseModel } from '../models/cart/user';
import { baseEndpoints } from '../utils/endpoints';
import { axiosClient } from '../utils/axios-client';
import { AddressList } from '../interface/product';

export const getUserProfile = async () => {
  const { data } = await axiosClient
    .get<UserProfileResponseModel>(`${baseEndpoints.profile}`)
    .then((response) => {
      return response;
    });
  return data;
};
const getUserAddress = async (): Promise<AddressList[]> => {
  const { data } = await axiosClient
    .get(baseEndpoints.address, {
      headers: {
        'x-channel': 'web',
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};
export const userService = {
  getUserProfile,
  getUserAddress,
};
