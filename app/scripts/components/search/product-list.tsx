import React, { useContext } from "react";
import ProductCard from "../productCardV1/productCard";
import { IProduct } from "../../interface/search-product-list";
import { IProductReviewObject } from "../../interface/product";
import { Collections, Product } from "../../models/home";
import { STATIC_COLLECTION } from "../../utils/concern-category/constants";
import { GAContext } from "../../context/gatracking";


interface Props {
    selectedCollection: Collections;
    products: Product[];
    reviews: IProductReviewObject[];
    setShowSnakbar: (show: boolean) => void;
    loadMoreCollectionData: () => void;
    hasMoreItems: boolean;
}
const ProductList = ({ selectedCollection, products, reviews, setShowSnakbar, hasMoreItems, loadMoreCollectionData }: Props) => {
    const gaTrackingEvent = useContext(GAContext);
    const getProduct = (product: Product) => {
        const review = reviews.filter(
            (currentReview) => currentReview.id == product.id,
        );
        const currentProduct: IProduct = {
            variantId: product.variantId,
            productId: product.id,
            title: product.title,
            price: product.price.toString(),
            compareAtPrice: product.compareAtPrice.toString(),
            benefits: product.benefits,
            handle: product.handle,
            image: product.image,
            averageRating: review.length > 0 ? review[0].averageRating : '',
            numberOfReviews: review.length > 0 ? review[0].numberOfReviews : '',
            productTag: {
                name: product.productTag?.name as string,
                color: product.productTag?.color as string,
            },
            benefitsNew: product.benefitsNew,
            options: product.options,
        };
        return currentProduct;
    };
    const getProducts = () => {
        return products
    };
    return <div className="product-list-container">
        <div className="header">{selectedCollection.handle != STATIC_COLLECTION[0].handle ? `Best Sellers in ${selectedCollection.name}` : 'Explore our Best Sellers'} </div>
        <div
            className="oz-collection-product-card-listing collections-lists"
            id="product-listing"
        >
            {getProducts().map((product: Product) => {
                return (
                    <ProductCard
                        key={product.id}
                        item={getProduct(product)}
                        setShowSnakbar={setShowSnakbar}
                        handleClick={() => {
                            gaTrackingEvent('search_product_clicked', {});
                        }}
                    />
                );
            })}
            {hasMoreItems &&
                <div className="load-more-btn">
                    <button onClick={() => loadMoreCollectionData()} className="btn btn-outline-secondary">
                        View More
                    </button>
                </div>
            }
        </div>
    </div>
}
export default ProductList;