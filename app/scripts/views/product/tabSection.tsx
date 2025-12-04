import React from 'react';
import { productDetailsModal } from '../../interface/product';
import ProductFaqSection from './product-faq';
import ProductInformation from './product-information';
import PeopleUpsellSection from './people-upsell';
import { PlantBasedBiotinProductID } from '../../utils/product/constants';

interface TabSectionModal {
  productDetail: productDetailsModal;
  productId: string;
  setShowSnakbar: (value) => void;
}

const TabSection = (props: TabSectionModal) => {
  return (
    <>
      <section className="container oz-accordion mb-16">
        <div className="tabs">
          <ProductFaqSection faqData={props.productDetail.faq} />
          <ProductInformation productDetail={props.productDetail} />
        </div>
      </section>
      <PeopleUpsellSection
        productId={props.productId}
        productDetail={props.productDetail}
        isOutOfStock={false}
        setShowSnakbar={props.setShowSnakbar}
      />
    </>
  );
};
export default TabSection;
