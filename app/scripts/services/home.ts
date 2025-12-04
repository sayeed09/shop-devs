import { baseEndpoints } from '../utils/endpoints';
import { axiosClient } from '../utils/axios-client';
import {
  CollectionByHandleResponse,
  HomePageResponseModel,
} from '../models/home';
import { IConcernCategoryResponse } from '../interface/concern-categories';

const fetchProductsByCollectionHandle = async (
  handle: string,
  pageNo: number,
  limit: number,
) => {
  const { data } = await axiosClient
    .get<CollectionByHandleResponse>(
      `${baseEndpoints.collectionByHandle}/${handle}?page=${pageNo}&limit=${limit}`,
    )
    .then((response) => {
      return response;
    });
  return data;
};
const fetchHomePageData = async () => {
  const { data } = await axiosClient
    .get<HomePageResponseModel>(`${baseEndpoints.config}/web/home`)
    .then((response) => {
      return response;
    });
  return data;
};


export const homeService = {
  fetchProductsByCollectionHandle,
  fetchHomePageData,
};
