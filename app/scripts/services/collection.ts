import { baseEndpoints } from '../utils/endpoints';
import { axiosClient } from '../utils/axios-client';
import {
  CollectionByHandleResponse,
  HomePageResponseModel,
} from '../models/home';

const fetchProductsByCollectionHandle = async (
  handle: string,
  pageNo: number,
  limit: number,
  sortBy?: string,
  sortOrder?: string,
) => {
  const { data } = await axiosClient
    .get<CollectionByHandleResponse>(
      `${baseEndpoints.collectionByHandle}/${handle}?${getQuery(
        pageNo,
        limit,
        sortBy as string,
        sortOrder as string,
      )}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};

const getQuery = (
  pageNo: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
) => {
  let query = '';
  if (pageNo) {
    query += `page=${pageNo}`;
  }
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (sortBy) {
    query += `&sortBy=${sortBy}`;
  }
  if (sortOrder) {
    query += `&sortOrder=${sortOrder}`;
  }
  return query;
};
export const collectionService = {
  fetchProductsByCollectionHandle,
};
