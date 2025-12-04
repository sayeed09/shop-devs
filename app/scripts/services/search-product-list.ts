import {
  AutocompletePayload,
  AutocompleteResponseModel,
  SearchRequestModel,
  SearchResultPayload,
} from '../interface/search-product-list';
import { baseEndpoints } from '../utils/endpoints';
import { axiosClient } from '../utils/axios-client';
import { getCredsForSearch } from '../utils/search/search';


export const getAutoSuggestions = async (payload: SearchRequestModel) => {
  const { data } = await axiosClient
    .post<AutocompleteResponseModel<AutocompletePayload>>(`${baseEndpoints.search}/autocomplete`, payload, {
      headers: {
        'x-store-id': getCredsForSearch().STORE_ID,
        'x-api-key': getCredsForSearch().API_KEY
      },
    })
    .then((response) => {
      return response;
    });
  return data;
}


export const getSearchResults = async (payload: SearchRequestModel) => {
  const { data } = await axiosClient
    .post<AutocompleteResponseModel<SearchResultPayload>>(`${baseEndpoints.search}/products/search`, payload, {
      headers: {
        'x-store-id': getCredsForSearch().STORE_ID,
        'x-api-key': getCredsForSearch().API_KEY
      },
    })
    .then((response) => {
      return response;
    });
  return data;
}