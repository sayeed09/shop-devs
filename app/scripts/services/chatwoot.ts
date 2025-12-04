import { baseEndpoints } from '../utils/endpoints';
import {axiosClient} from '../utils/axios-client';

const getChatWootData = async (chatWootData) => {
  const { data } = await axiosClient
    .post<any>(`${baseEndpoints.chatWoot}`, chatWootData)
    .then((response) => {
      return response;
    });
  return data;
};


export const chatWootService = {
    getChatWootData
};