import React, { useState } from 'react';
import parse from 'html-react-parser';
import { productDetailsModal } from '../../interface/product';
import PDPAdditionDetailsSkeleton from '../../components/loaders/pdp-additional-details-skeleton';
import LazyLoad from 'react-lazy-load';

interface ProductBenefitModal {
  productDetail: productDetailsModal;
  isLoading: boolean;
}

const ProductBenefit = (props: ProductBenefitModal) => {
  const [showDesc, setShowDesc] = useState(false);
  const prodDetails = props?.productDetail?.description?.split('</li>')[0];
  const expandBtn = (
    <div className='text-right'>
      <button
        onClick={() => setShowDesc(!showDesc)}
        className="button-link"
      >
        {showDesc ? ' Read Less' : ' Read More'}
      </button>
    </div>
  );

  if (props.isLoading) {
    return (
      <div className='rounded-sm product-left-sec borderGray border p-16 mobile-border product-benefits'>
        <PDPAdditionDetailsSkeleton />
      </div>
    )
  }
  return !props.productDetail?.description ? (
    <></>
  ) : (
      <LazyLoad offset={300}>
        <div className="rounded-sm product-left-sec borderGray border p-16 mobile-border product-benefits bullets-icon">
          {showDesc ? (
            <>
              {parse(props.productDetail?.description)}{' '}
              {props?.productDetail?.description?.split('</li>').length > 1 &&
                expandBtn}
            </>
          ) : (
            <>
              {parse(prodDetails)}
              {props?.productDetail?.description?.split('</li>').length > 1 &&
                expandBtn}
            </>
          )}
        </div>
    </LazyLoad>
  );
};
export default ProductBenefit;
