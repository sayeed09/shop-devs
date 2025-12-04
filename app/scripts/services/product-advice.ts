import {
  IConcernsResponse,
  ICustomerGoalObj,
  IGoalList,
  IRecommendProductDetailList,
} from '../interface/product-advice';
import { baseEndpoints } from '../utils/endpoints';
import {axiosClient} from '../utils/axios-client';

interface concernPayload {
  concerns: number[];
}

export const getProductGoals = async () => {
  const { data }: IGoalList = await axiosClient
    .get(`${baseEndpoints.product}catalog/product/goals`)
    .then((response) => {
      return response;
    });
  return data;
};

export const getConcernsFromGoals = async (payload: ICustomerGoalObj) => {
  const { data }: IConcernsResponse = await axiosClient
    .post(`${baseEndpoints.product}catalog/product/concerns`, payload)
    .then((response) => {
      return response;
    });

  return data;
};

export const getRecommendation = async (payload: concernPayload) => {
  const { data }: IRecommendProductDetailList = await axiosClient
    .post(`${baseEndpoints.product}catalog/product/recommendation`, payload)
    .then((response) => {
      return response;
    });

  return data;
};
