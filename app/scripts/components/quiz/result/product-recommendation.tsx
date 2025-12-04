import React, { useEffect, useState } from "react";
import ProductList from "./product-list";
import HairPlan from "./hair-plan";
import { ProductRecomendation } from "../../../models/quiz/quiz-response";
import { productService } from "../../../services/product";
import { IProductReviewObject, IProductReviewsResponse, ProductResponseModal } from "../../../interface/product";

interface Props {
    productRecomendations: ProductRecomendation[];
}
const ProductRecommendation = ({ productRecomendations }: Props) => {

    const [productResponseList, setProductResponseList] = useState<ProductResponseModal[]>([]);
    const [reviews, setReviews] = useState<IProductReviewObject[]>([]);

    useEffect(() => {
        getProductList(productRecomendations.map((item) => item.productId));
        getStarReviews(productRecomendations.map((item) => item.productId));
    }, []);

    const getProductList = async (products: string[]) => {
        const responseList = await Promise.all([...products.map((item) => getProductDetails(item))])
        setProductResponseList(responseList.filter((item) => item.data.variants.length > 0))
    }

    const getProductDetails = async (productId: string) => {
        const productData = await productService
            .getProductDetails(productId, 'Test', true, false);
        return productData;
    }
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
    if (productResponseList.length == 0) {
        return null
    };
    return <>
        <HairPlan productResponseList={productResponseList.filter((item) => item.data.variants.length > 0 && item.data.variants[0].price > 0)} />
        <ProductList productResponseList={productResponseList.filter((item) => item.data.variants.length > 0 && item.data.variants[0].price > 0)}
            reviews={reviews} />
    </>
}
export default ProductRecommendation;