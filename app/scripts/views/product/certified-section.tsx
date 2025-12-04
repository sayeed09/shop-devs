import React from 'react';
import parse from 'html-react-parser';
import { isValidUrl } from '../../utils/product/formatter';
import {
  CertificateModal,
  ConfigModal,
  productDetailsModal,
  WMIBContentModal,
} from '../../interface/product';
import Skeleton from '../../components/loaders/skeleton';
import CertificateItem from '../../components/product/certificateItem';
import LazyLoad from 'react-lazy-load';

interface CertifiedSectionModal {
  productDetail: productDetailsModal;
}

const CertifiedSection = (props: CertifiedSectionModal) => {
  return (
    <LazyLoad offset={300}>
      <>
        {props.productDetail?.scientificallyTested?.highlights.length > 0 ? (
          <div className="product-left-sec certified-sec how-to-use-sec p-16 border borderGray rounded-sm">
            <h2 className="mb-16">
              {props.productDetail?.scientificallyTested?.title}
            </h2>
            
            <div className="d-flex text-center text-start">
              {props?.productDetail?.scientificallyTested?.certificates?.map(
                (certificate: CertificateModal, index: number) => {
                  return <CertificateItem certificate={certificate} key={index} />;
                },
              )}
            </div>
            {props?.productDetail?.scientificallyTested?.certificates.length > 0 && (
              <hr className="my-16" />
            )}

            <div
              className="row d-flex text-center mt-16"
              style={{ justifyContent: 'space-around' }}
            >
              {props?.productDetail?.scientificallyTested?.highlights?.map(
                (icon: WMIBContentModal, index: number) => (
                  <div className="col" key={index}>
                    {isValidUrl(icon.image) ? (
                      <img src={icon?.image} alt={`Scientifically Tested & Certified: ${icon.title}`} />
                    ) : (
                      <span className="img-fluid">{parse(icon.image)}</span>
                    )}
                    <p>{icon.title}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </LazyLoad>
  );
};

export default CertifiedSection;
