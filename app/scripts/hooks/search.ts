import React, { useEffect, useState } from 'react'
import { IProductReviewObject, IProductReviewsResponse, UserLoginValue } from '../interface/product';
import { SearchListModel } from '../interface/search-product-list';
import { Collections, Product } from '../models/home';
import { collectionService } from '../services/collection';
import { productService } from '../services/product';
import { getSearchResults, getAutoSuggestions } from '../services/search-product-list';
import { OPTIONS } from '../utils/search/search';
import useDebounce from './useDebounce';
import { getAccessToken } from '../utils/product/formatter';
import { Moengage } from '../utils/tracking/gaTracking';
import { STATIC_COLLECTION } from '../utils/concern-category/constants';


const PRODUCT_FETCH_LIMIT = 10;
const useSearch = () => {
    const [selectedCollection, setSelectedCollection] = useState<Collections>(STATIC_COLLECTION[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchListModel>({ products: [], totalResults: 0 });
    const [concernCategoryCollection, setConcernCategoryCollection] = useState<Collections[]>([]);
    const [reviews, setReviews] = useState<IProductReviewObject[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [pageNo, setPageNo] = useState<number>(1);
    const [emptyResults, setEmptyResults] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreItems, setHasMoreItems] = useState(false);

    useEffect(() => {
        getCollectionProducts(selectedCollection.handle);
    }, [selectedCollection.handle, pageNo]);

    useEffect(() => {
        productService.getConcernCategoryData('CONCERN')
            .then((data) => {
                setConcernCategoryCollection(data.data.collections);
            });
    }, []);

    useEffect(() => {
        // tracking for no results
        if (emptyResults) {
            const authorizationToken: UserLoginValue | null = getAccessToken();
            const attributes: any = {};
            if (authorizationToken && authorizationToken.accessToken) {
                attributes.phone = authorizationToken?.phone;
            }
            attributes.search_date = Date.now();
            attributes.search_term = searchTerm;
            Moengage.track_event('search_bar_no_results', attributes);
        }
    }, [emptyResults])

    const getStarReviews = (productIds: string[]) => {
        const payload = { ids: productIds };
        productService
            .getStarReviewDetails(payload)
            .then((response: IProductReviewsResponse) => {
                if (response?.data?.product?.length) {
                    setReviews((reviews) => [...reviews, ...response?.data?.product]);
                }
            })
            .catch((error) => {
                console.log('Get star review error', error);
            });
    };

    const loadMoreCollectionData = () => {
        const authorizationToken: UserLoginValue | null = getAccessToken();
        const attributes: any = {};
        if (authorizationToken && authorizationToken.accessToken) {
            attributes.phone = authorizationToken?.phone;
        }
        attributes.collection = selectedCollection.name;
        Moengage.track_event('search_concerns_view_more', attributes);
        setHasMoreItems(false);
        if (products.length == PRODUCT_FETCH_LIMIT)
            setPageNo((pageNo) => pageNo + 1);
    };

    const getCollectionProducts = async (handleName: string) => {
        const responseData =
            await collectionService.fetchProductsByCollectionHandle(
                handleName,
                pageNo,
                PRODUCT_FETCH_LIMIT,
            );
        let productList: Product[] = [];
        if (pageNo == 1) {
            productList = [...responseData.data.products];
        } else {
            productList = [...products, ...responseData.data.products];
        }
        setIsLoading(false)
        setProducts(productList);
        getStarReviews(responseData.data.products.map((item) => item.id));
        setTimeout(() => {
            if (responseData.data.products.length === PRODUCT_FETCH_LIMIT) {
                setHasMoreItems(responseData.data.products.length > 0 ? true : false);
            } else {
                setHasMoreItems(false);
            }
        }, 500);
    };


    useDebounce(() => {
        fetchSearchResults();
    }, [searchTerm], 200
    );

    const loadMoreResults = async () => {
        const searchResults = await getSearchResults({
            minQueryLength: 1,
            productsCount: 20,
            q: searchTerm,
            sort: JSON.stringify(OPTIONS.SORT)
        });
        setSearchResults({
            products: searchResults.payload.result,
            totalResults: searchResults.payload.total
        });
        const authorizationToken: UserLoginValue | null = getAccessToken();
        const attributes: any = {};
        if (authorizationToken && authorizationToken.accessToken) {
            attributes.phone = authorizationToken?.phone;
        }
        attributes.search_date = Date.now();
        attributes.search_term = searchTerm;
        Moengage.track_event('search_view_more', attributes);
    }

    const fetchSearchResults = async () => {
        setEmptyResults(false)
        if (searchTerm.trim().length >= 1) {
            const searchResults = await getSearchResults({
                minQueryLength: 1,
                productsCount: 10,
                q: searchTerm,
                sort: JSON.stringify(OPTIONS.SORT)
            });
            setSearchResults({
                products: searchResults.payload.result,
                totalResults: searchResults.payload.total
            });

            if (searchResults.payload.result.length === 0) {
                setEmptyResults(true);
                const attributes: any = {};
                attributes.search_date = Date.now();
                attributes.search_term = searchTerm;
                attributes.result_count = searchResults.payload.total;
                Moengage.track_event('search_no_result', attributes);
            }
            else {
                const attributes: any = {};
                attributes.search_date = Date.now();
                attributes.search_term = searchTerm;
                attributes.result_count = searchResults.payload.total;
                Moengage.track_event('search_result', attributes);
            }

        } else {
            setSearchResults({
                products: [],
                totalResults: 0
            });
        }
    }
    // const fetchAutoSuggestions = async () => {
    //     setEmptyResults(false)
    //     if (searchTerm.trim().length >= 1) {
    //         const autoSuggestionResults = await getAutoSuggestions({
    //             minQueryLength: 1,
    //             productsCount: 10,
    //             q: searchTerm,
    //             sort: JSON.stringify(OPTIONS.SORT)
    //         });
    //         setSearchResults({
    //             products: autoSuggestionResults.payload.products.result,
    //             totalResults: autoSuggestionResults.payload.products.total
    //         });

    //         if (autoSuggestionResults.payload.products.result.length === 0) {
    //             setEmptyResults(true);
    //             const attributes: any = {};
    //             attributes.search_date = Date.now();
    //             attributes.search_term = searchTerm;
    //             attributes.result_count = autoSuggestionResults.payload.products.total;
    //             Moengage.track_event('search_no_result', attributes);
    //         }
    //         else {
    //             const attributes: any = {};
    //             attributes.search_date = Date.now();
    //             attributes.search_term = searchTerm;
    //             attributes.result_count = autoSuggestionResults.payload.products.total;
    //             Moengage.track_event('search_result', attributes);
    //         }

    //     } else {
    //         setSearchResults({
    //             products: [],
    //             totalResults: 0
    //         });
    //     }
    // }

    const handleSelectedCollection = (collection: Collections) => {
        setPageNo(1)
        setSelectedCollection((selectedCollection) => collection.handle === selectedCollection.handle ? STATIC_COLLECTION[0] : collection);
    }


    return {
        selectedCollection,
        handleSelectedCollection,
        products,
        reviews,
        searchTerm,
        setSearchTerm,
        searchResults,
        loadMoreResults,
        concernCategoryCollection,
        emptyResults,
        isLoading,
        loadMoreCollectionData,
        hasMoreItems
    }
}

export default useSearch;