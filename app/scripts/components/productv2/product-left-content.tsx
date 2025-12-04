import React from 'react';
import {
  productDetailsModal,
} from '../../interface/product';
import ProductOffer from './product-offer';
import RecommendedExpert from './recommended-by-expert';
import ImageComparison from './image-comparison';
import BadgeIcons from './badge-icons';
import Banner from './banner';
import ProductInfoAndFAQ from './info-faq';
import { getImageList, isItAtLastPostion } from '../../utils/productv2/provider';
import LabReportsSection from './lab-reports-section';
import ChatSocialProof from './chat-social-proof';
import Articles from './articles';
import IconDescriptionComponent from './icon-description';
import GoogleReviews from './google-reviews';
import { ArticleSection, Comparison, GoogleReviews as GoogleReviewsModel, IconDescription, Section } from '../../models/product/productv2';
import VideoTestimonials from './video-testimonials';

interface ProductLeftContentModal {
  productId: string;
  initialScroll: () => void;
  productDetail: productDetailsModal;
  isLoading: boolean;
  buyNowVariant: (variantId: string) => void;
}


const ProductLeftContent = (props: ProductLeftContentModal) => {
  const ComparisonImage = ({ item }: { item: Section }) => item ? <ImageComparison headerSection={item?.header as string} imageComparisons={getImageList(item?.comparisons as Comparison[])} /> : null;
  const Article = ({ item }: { item: Section }) => item ? <Articles sectionHeader={item.header as string} articleSection={item.articleSection as ArticleSection[]} productId={props.productId} className={'uds-597-control'} /> : null;
  const IconDescription = ({ item }: { item: Section }) => item ? <IconDescriptionComponent sectionHeader={item.header as string} iconDescriptions={item.iconDescriptions as IconDescription[]} className='uds-597-control' /> : null;
  const Image = ({ item }: { item: Section }) => item ? <Banner title={item?.header} desktopImage={item.desktop as string} mobileImage={item.mobile as string} index={item.sort as number} showDisclaimer={isItAtLastPostion(props?.productDetail?.sections?.filter((sec) => sec.type === "Image") as Section[], item)} buyNowVariant={props.buyNowVariant} /> : null
  const GoogleReview = ({ item }: { item: Section }) => item ? <GoogleReviews googleReview={item.googleReview as GoogleReviewsModel} header={item.header as string} customeClassName='uds-557-control' /> : null;

  const componentsMap = {
    ComparisonImage,
    Article,
    IconDescription,
    Image,
    GoogleReview
  };

  return (
    <>
      <div className="page-content-left-sec pdp-left-data clearfix product-v2-row gcsk-1630-Control">
        <BadgeIcons className={props?.productDetail?.recommendedByExperts?.title ? '' : 'footer-sec-border'} v1 />
        {props.productDetail.labReportSection ? <LabReportsSection productId={props.productId} labReportsSection={props.productDetail.labReportSection}/> : null}
        <RecommendedExpert productDetail={props?.productDetail} />
        <ProductOffer
          initialScroll={props.initialScroll}
          productId={props.productId}
        />
        {/* <VideoTestimonials productDetail={props?.productDetail} productId={props.productId} /> */}

        {/* <div className='chat-social-proof-container'>
          <ChatSocialProof productId={props.productId} />
        </div> */}
        {props?.productDetail?.sections && props?.productDetail?.sections.map((item) => {
          const ComponentToRender = componentsMap[item.type];
          return ComponentToRender ? <ComponentToRender item={item} /> : null;
        })}
        <ProductInfoAndFAQ productDetail={props.productDetail} />
      </div>
    </>
  );
};
export default ProductLeftContent;
