import React from "react";
import { formatPriceWithCurrency } from "../../utils/cart/formatter";

interface Props {
    image: string;
    title: string;
    price: number;
    compareAtPrice: number;
    hideYouSave?: boolean;
    badgeTitle?: string;
    hidePriceDetails?: boolean;
}
const LineItem = ({ image, title, price, compareAtPrice, hideYouSave, badgeTitle, hidePriceDetails }: Props) => {
    return <>
        <div className="product-card-box-v2-items">
            <div className="product-img-v2">
                <img
                    src={image}
                    width={70}
                    alt={title}
                />
            </div>
            <div className="product-card-box-v2-dtl w-100">
                <a>
                    <h2 className={`productCartTitle ${badgeTitle ? 'mb-4' : ''}`}>{title} </h2>
                </a>
                {badgeTitle &&
                    <div className="product-card-badge">
                        {badgeTitle}
                    </div>}
                {!hidePriceDetails &&
                    <div className="productPriceDetails">
                        <span className="priceMRP">MRP:</span>
                        {compareAtPrice - price > 0 &&
                            <del className="priceMRP">{formatPriceWithCurrency(
                                compareAtPrice / 100)
                            }</del>}
                        <span className="actualPrice">{price > 0 ? formatPriceWithCurrency(
                            price / 100) : 'FREE'
                        }</span>
                    </div>}
                <div className="productPriceDetails pt-8">
                    {compareAtPrice - price > 0 && !hideYouSave &&
                        <span className="totalPriceOff"><span className="mr-4">You save:</span> {formatPriceWithCurrency(
                            (compareAtPrice - price) / 100,
                        )}
                        </span>}
                </div>
            </div>
        </div>
    </>
}
export default LineItem;