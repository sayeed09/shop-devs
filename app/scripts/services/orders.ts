import { baseEndpoints } from '../utils/endpoints';
import { axiosClient } from '../utils/axios-client';
import axios from 'axios';
import {
  OrderDetailResponseModel,
} from '../models/cart/orders/order-response';

const getOrdersList = async (page: number) => {
    const { data } = await axiosClient
      .get<any>(`${baseEndpoints.getOrders}?page=${page}&limit=10`)
      .then((response) => {
        return response;
      });
    return data;
};
const getOrderDetails = async (orderId: string) => {
  const { data } = await axiosClient
    .get<OrderDetailResponseModel>(`${baseEndpoints.getOrderDetail}/${orderId}`)
    .then((response) => {
      return response;
    });
  return data;
};

const cancelOrder = async (orderId: string,payload) => {
  const { data } = await axiosClient
    .post<OrderDetailResponseModel>(`${baseEndpoints.cancelOrder}/${orderId}`,payload)
    .then((response) => {
      return response;
    });
  return data;
};
export const orderService = {
  getOrdersList,
  getOrderDetails,
  cancelOrder
};
