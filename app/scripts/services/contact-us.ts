import { IUserData } from '../interface/contact-us';
import { baseEndpoints } from '../utils/endpoints';
import axios from 'axios';
import { axiosClient } from '../utils/axios-client';

const createTicket = async (userData: IUserData) => {
  const { data } = await axiosClient
    .post(baseEndpoints.hydro, userData)
    .then((response) => {
      return response;
    });
  return data;
};

const uploadAttachment = async (fileData) => {
  const { data } = await axiosClient
    .post(baseEndpoints.attchment, fileData, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (ProgressEvent) => {
        console.log(ProgressEvent.loaded);
      },
    })
    .then((response) => {
      return response;
    });
  return data;
};

export const contactUsService = {
  createTicket,
  uploadAttachment,
};
