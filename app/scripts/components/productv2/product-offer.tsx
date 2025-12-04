import React, { useState, useEffect, useContext } from 'react';
import { cartService } from '../../services/cart';
import OfferItemV1 from '../../components/product/offer-item-v1';
import { VisibilityResponse } from '../../interface/product';
import { ProductContext } from '../../context/product';
import Skeleton from '../../components/loaders/skeleton';
import { ICodeVisibility } from '../../interface/cart';
import { SectionHeader } from './common';

interface ProductOfferModal {
    productId: string;
    initialScroll: () => void;
}

const ProductOffer = (props: ProductOfferModal) => {
    const { state: productState } = useContext(ProductContext);
    const [offerList, setOfferList] = useState<any>();
    const [offerDataLoading, setOfferDataLoading] = useState(true);
    useEffect(() => {
        if (productState?.productDetails?.id)
            getOfferData();
    }, [productState?.productDetails?.id]);

    const getOfferData = () => {
        let jsonVar: ICodeVisibility = {
            category: 'PRODUCT',
            productIds: [`${props.productId}`],
            variantIds: productState?.productDetails?.id
                ? [`${productState?.productDetails?.id}`]
                : [],
        };
        if (sessionStorage.getItem('campaignCode')) {
            jsonVar.prioritizedCoupon = sessionStorage.getItem('campaignCode') || ''
        }
        cartService
            .getOfferList(jsonVar)
            .then((data: any) => {
                setOfferDataLoading(false);
                setOfferList(data);
            })
            .catch((error) => {
                setOfferDataLoading(false);
                console.log('Get offer data error', error);
            });
    };
    if (offerDataLoading) {
        <div style={{ marginBottom: '32px' }}>
            <Skeleton height="104px" width="240px" count={3} margin="8px" />
        </div>;
    }
    return offerList?.length > 0 ? (
        <section className="product-offers-section-main" id="offers-container-id">
            <SectionHeader title={<><strong>Offers</strong></>} />
            <div className={`product-offer-container`}>
                {
                    offerList?.map((item: VisibilityResponse, i: number) => (
                        <OfferItemV1 key={i} item={item} initialScroll={props.initialScroll} />
                    ))
                }
            </div>
        </section>
    ) : (
        <></>
    );
};
export default ProductOffer;
