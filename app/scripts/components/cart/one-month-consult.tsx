import React, { useState } from "react";
import LineItem from "./line-item";
import { OneMonthConsultMRP } from "../../utils/data-provider";
import { hostDomain } from '../../utils/endpoints';
import { isMobile } from "../../utils/helper";
import { LineItem as ILineItem } from "../../models/cart/get-response";
import CartItemPopup from "./cart-item-popup";
import OneMonthChatSupport from "./one-month-chat-support";


const OneMonthConsult = () => {
    const [selectedCartItem, setSelectedCartItem] = useState<{
        productId: string,
        variantId: string
    } | undefined | boolean>();

    if (hostDomain != 'oziva.com') {
        return <>
            <div className="product-card-box-v2 cart-decluttter-exp-A gcsk-1654-control uds-690-exp" onClick={() => setSelectedCartItem(true)}>
                <LineItem
                    image={'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796'}
                    title={'1 Month Nutritionist Diet Consultation + Diet Plan'}
                    price={0}
                    compareAtPrice={OneMonthConsultMRP}
                    hideYouSave
                    badgeTitle="1 Month"
                />
            </div>
            <div className="gcsk-1654-exp-chat-support-container" onClick={() => setSelectedCartItem(true)}>
                <OneMonthChatSupport setSelectedCartItem={setSelectedCartItem} />
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

export default OneMonthConsult;