import React, { useState } from "react";
import LineItem from "./line-item";
import { OneMonthConsultMRP } from "../../utils/data-provider";
import { hostDomain } from '../../utils/endpoints';
import { isMobile } from "../../utils/helper";
import { LineItem as ILineItem } from "../../models/cart/get-response";
import CartItemPopup from "./cart-item-popup";
import { TickIcon } from "../../../icons/tickIcon";

interface IProps {
    setSelectedCartItem: (item: {
        productId: string,
        variantId: string
    } | undefined | boolean) => void;
}
const OneMonthChatSupport = ({ setSelectedCartItem }: IProps) => {
    if (hostDomain != 'oziva.com') {
        return <>
            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/nutritionist.png?v=1747199289" alt="Chat Support Image" className="nutritionist-image" />
            <div className="chat-support-content">
                <div className="chat-support-header">Get <span>1-1 FREE Chat Support</span> After Purchase!</div>
                <div className="chat-support-benefits-chips">
                    <div>
                        <span className="mr-4">
                            <TickIcon />
                        </span>Nutritionist Diet Consultation</div>
                    <div>
                        <span className="mr-4">
                            <TickIcon />
                        </span>Diet Plan</div>
                </div>
                <div className="chat-support-price-details">
                    <span className="priceMRP">MRP:</span>
                    <del className="priceMRP mr-4">1499</del>
                    <span className="free-text">FREE</span>
                    <div className="product-card-badge ml-8">1 Month</div>
                </div>
            </div>
        </>
    }
}

export default OneMonthChatSupport;