import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../context/product';

const FooterSeo = () => {
  const { state: productState } = useContext(ProductContext);
  useEffect(() => {
    if(productState.seoData) {
      const event = new CustomEvent('footerSeoData', {"detail": productState.seoData} );
      document.dispatchEvent(event);
    }
  }, [productState.seoData]);

  return (null);
};

export default FooterSeo;
