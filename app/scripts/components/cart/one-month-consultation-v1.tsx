import React, { useState } from "react";
import { hostDomain } from '../../utils/endpoints';
import { LineItem as ILineItem } from "../../models/cart/get-response";
import CartItemPopup from "./cart-item-popup";
import { formatPriceWithCurrency } from "../../utils/cart/formatter";


const OneMonthConsultV1 = () => {
    const [selectedCartItem, setSelectedCartItem] = useState<{
        productId: string,
        variantId: string
    } | undefined | boolean>();

    if (hostDomain != 'oziva.com') {
        return <>
            <div className="product-card-box-v2 cart-decluttter-exp-A gcsk-1654-control">
                <div className="product-card-box-v2-items product-card-box-v2-items-exp">
                    <div className="product-img-v2">
                        <img
                            src={'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796'}
                            width={70}
                            alt={'Expert guidance. Real results.'}
                        />
                    </div>
                    <div className="product-card-box-v2-dtl w-100">
                        <a>
                            <h2 className={`productCartTitle`}>Expert guidance. Real results. </h2>
                        </a>
                        <div className="productInfo">
                            <div>
                                <div className="benefit-info"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Tick.svg?v=1752038878" alt="Tick Icon" />Consultation for your goals and</div>
                                <div className="benefit-info"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Tick.svg?v=1752038878" alt="Tick Icon" />Diet/Lifestyle Plan</div>
                            </div>
                            <div className="productPriceDetails">
                                <del className="priceMRP">{formatPriceWithCurrency(1499)}</del>
                                <span className="actualPrice">FREE</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="you-save-text"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/offers2.gif?v=1737643416" alt="Saving gif" />You save&nbsp;<span>₹1,499</span>&nbsp;with your <span>&nbsp;FREE 1 Month plan!</span></div>
                    <div className="know-more-button" onClick={() => setSelectedCartItem(true)}>Know More</div>
                </div>
            </div>
            {
                selectedCartItem &&
                <div className='cart-item-popup'>
                    <CartItemPopup setSelectedCartItem={setSelectedCartItem} selectedCartItem={selectedCartItem} popupHeader={'1 Month Nutritionist Diet Consultation + Diet Plan'} isConsultation={typeof selectedCartItem === "boolean" ? true : false} />
                </div>
            }
        </>
    }
}

export default OneMonthConsultV1;