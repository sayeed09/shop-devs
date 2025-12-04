import React, { useState } from 'react';
import { CertificateList, CertificatesSection } from '../../models/home';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';
import LazyLoad from 'react-lazy-load';

interface IProps {
  certificates: CertificatesSection;
}
const Certificates = ({certificates}: IProps) => {

  const renderModal = () => {
    return (
      <>
        
      </>
    );
  };
  return (
    <LazyLoad offset={300}>
      <>
        <div className="other-cards-section">
          <div className="other-cards-head">
            <h2 className="certificate-title">{certificates.title}</h2>
            <p className='certificate-subtitle'>{certificates.subtitle}</p>
          </div>
          <div className="d-flex text-center other-cards-row wave-cards-row">
            {certificates.data.map((item, index) => {
              return (
                <div className="other-cards-cards" key={index}>
                  <a
                    href="javascript:void()"
                    className="d-block"
                  >
                    <ResponsiveImage imageURL={item.image} widthHeightObject={productCardBreakPoints} altText="OZiva Certificate"/>
                  </a>
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        {renderModal()}
      </>
    </LazyLoad>
  );
};
export default Certificates;
