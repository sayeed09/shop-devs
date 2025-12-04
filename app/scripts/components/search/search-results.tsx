import React, { useContext } from "react";
import ProductCard from "../productCardV1/productCard";
import { IProduct, Result, SearchListModel } from "../../interface/search-product-list";
import { GAContext } from "../../context/gatracking";


interface Props {
    results: SearchListModel;
    searchTerm: string;
    loadMoreResults: () => void;
    setShowSnakbar: (show: boolean) => void;
}
const SearchResultList = ({ results, searchTerm, loadMoreResults, setShowSnakbar }: Props) => {

    const gaTrackingEvent = useContext(GAContext);
    const getProduct = (product: Result) => {
        const handle = product.attributes.find((item) => item.name == "handle")?.values;
        const newBenefits = product.attributes.find((item) => item.name == "new_benefits")?.values;
        const productOptions = product.attributes.find((item) => item.name == "options")?.values;
        const productTag = product.attributes.find((item) => item.name == "product_tag")?.values;
        const variant_id = product.attributes.find((item) => item.name == "variant_id")?.values;


        const currentProduct: IProduct = {
            variantId: variant_id ? variant_id[0].value[0] : '',
            productId: product.id,
            title: product.name,
            price: product.sellingPrice.toString(),
            compareAtPrice: product.price.toString(),
            handle: handle ? handle[0].value[0] : '',
            image: product.mainImage,
            averageRating: product.avgRatings.toString(),
            numberOfReviews: product.totalReviews.toString(),
            productTag: {
                name: productTag ? JSON.parse(productTag[0].value[0])?.name : '',
                color: productTag ? JSON.parse(productTag[0].value[0])?.color : ''
            },
            benefitsNew: newBenefits && newBenefits.length > 0 ? JSON.parse(newBenefits[0].value[0]) : null,
            options: productOptions ? JSON.parse(productOptions[0].value[0]).map((item) => item.name) : ''
        };
        return currentProduct;
    };

    return <div className="product-list-container">
        <div className="result-heading">{`Showing ${results.totalResults} results for '${searchTerm}'`}</div>
        <div
            className="oz-collection-product-card-listing collections-lists"
            id="product-listing"
        >
            {results.products.map((product: Result) => {
                return (
                    <ProductCard
                        key={product.id}
                        item={getProduct(product)}
                        setShowSnakbar={setShowSnakbar}
                        isSearchPage
                        handleClick={() => {
                            gaTrackingEvent('search_product_clicked', {
                                items: [{
                                    item_id: product.id,
                                    item_name: product.name,
                                    item_variant: getProduct(product).title
                                }]
                            });
                        }}
                    />
                );
            })}

        </div>
        {results.totalResults > 10 && results.products.length <= 10 &&
            <div className="load-more-btn">
                <button onClick={() => loadMoreResults()} className="btn btn-outline-secondary">
                    View More
                </button>
            </div>}
    </div>
}
export default SearchResultList;