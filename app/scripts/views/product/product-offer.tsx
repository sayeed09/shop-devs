import React, { useState, useEffect, useContext } from 'react';
import { cartService } from '../../services/cart';
import { VisibilityResponse } from '../../interface/product';
import { ProductContext } from '../../context/product';
import Skeleton from '../../components/loaders/skeleton';
import { ICodeVisibility } from '../../interface/cart';
import OfferItemV1 from '../../components/product/offer-item-v1';

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
    <div className="rounded-border product-left-sec borderGray border p-16 mobile-border product-offers-section-main" id="offers-container-id">
      <p className="mb-8 h2 fw-bold">Offers</p>
      <div className="row product-offers-sec-row">
        {offerList?.map((item: VisibilityResponse, i: number) => (
           <OfferItemV1 key={i} item={item} initialScroll={props.initialScroll} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default ProductOffer;
