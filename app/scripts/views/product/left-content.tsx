import React from 'react';
import { useContext } from 'react';
import ProductOffer from './product-offer';
import ProductBenefit from './product-benefit';
import PeopleReview from './people-review';
import ProductUsage from './product-usage';
import ProductIngredients from './ingredients';
import CertifiedSection from './certified-section';
import {
  UserLoginValue,
  productDetailsModal,
} from '../../interface/product';
import { ProductContext } from '../../context/product';
import RecommendedExpert from './recommended-expert';
import ConsumerStudy from './consumerStudy';
import HowDoesWorks from './howDoesWorks';
import BadgeIcons from '../../components/productv2/badge-icons';
import LabReportsSection from '../../components/productv2/lab-reports-section';

interface ProductLeftContentModal {
  productId: string;
  initialScroll: () => void;
  productDetail: productDetailsModal;
  isLoading: boolean;
}

const ProductLeftContent = (props: ProductLeftContentModal) => {
  const { state: productState } = useContext(ProductContext);
  return (
    <>
      <div className="col page-content-left-sec pdp-left-data clearfix">
        {productState?.componentState?.isConfigDetailLoad && (
          <>
            <BadgeIcons v1 />
            {props.productDetail.labReportSection ? <LabReportsSection productId={props.productId} labReportsSection={props.productDetail.labReportSection}/> : null}
            <ProductOffer
              initialScroll={props.initialScroll}
              productId={props.productId}
            />

            <ProductBenefit productDetail={props?.productDetail} isLoading={props.isLoading} />
            <HowDoesWorks productDetail={props?.productDetail} isLoading={props.isLoading} />
            <ConsumerStudy productDetail={props?.productDetail} />
            <PeopleReview
              lovedByThousandsData={props.productDetail.lovedByThousand}
            />
            <ProductUsage howToUseData={props.productDetail.howToUse} />
            <ProductIngredients productDetail={props?.productDetail} />
            <CertifiedSection productDetail={props?.productDetail} />
            <RecommendedExpert productDetail={props?.productDetail} />

          </>
        )}
      </div>
    </>
  );
};
export default ProductLeftContent;
