import React, { useContext, useState } from "react";
import ProductInformation from "./product-info";
import ProductFaqSection from "./faq";
import { ProductDetails, productDetailsModal } from "../../../interface/product";
import { useProductInfo } from "../../../hooks/product-info";
import { SectionHeader } from "../common";
import { GAContext } from "../../../context/gatracking";

interface Props {
    productDetail: productDetailsModal;
}
const ProductInfoAndFAQ = ({ productDetail }: Props) => {
    const { variantDetails } = useProductInfo();
    const gaTrackingEvent = useContext(GAContext);
    const [selectedTab, setSelectedTab] = useState('Faq');

    return <section className="product-info-faq-sec">
        {productDetail?.faq?.length > 0 && variantDetails ?

            <div className="tabs-v2">
                <button onClick={() => {
                    setSelectedTab('Faq')
                    gaTrackingEvent('pdp_tab_click_faq', { tab: 'Faq' });
                }} className={`tab-item ${selectedTab == "Faq" ? 'active' : ''}`}>Frequently Asked Questions</button>
                <button onClick={() => {
                    setSelectedTab('Info')
                    gaTrackingEvent('pdp_tab_click_info', { tab: 'Info' });
                }} className={`tab-item ${selectedTab == "Info" ? 'active' : ''}`}>Product Details</button>
            </div>
            :
            productDetail?.faq?.length > 0 || variantDetails &&
            <SectionHeader title={productDetail?.faq?.length > 0 ? 'Frequently Asked Questions' : 'Product Details'} />
        }
        {selectedTab == "Info" && variantDetails?.manufatured_by && <ProductInformation variantDetails={variantDetails as ProductDetails} />}
        {selectedTab == "Faq" && productDetail?.faq?.length && <ProductFaqSection faqData={productDetail.faq} />}

    </section >
}
export default ProductInfoAndFAQ;