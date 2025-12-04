import React, { useEffect, useState } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { PrivacyAndTerms } from '../../interface/product';
import { termsPolicyService } from '../../services/terms-policy';
import parse from 'html-react-parser';
import '../../scss/import/_oz-policy-terms.scss';

interface IProps {
    setShowPopup: (authErrorPopup: boolean) => void;
    policyType: string;
}

const PrivacyAndTerms = ({ setShowPopup, policyType }: IProps) => {
    
  const [policyResponse, setPolicyResponse] = useState<PrivacyAndTerms>();
  const [loader, setLoader] = useState(true);

  const getPolicyData = () => {
    termsPolicyService.policyAndTermsService(policyType).then((response) => {
      if (response && response.data && response.data.shop) {
        if (policyType === 'privacyPolicy') {
          setPolicyResponse(response?.data?.shop.privacyPolicy);
        } else if (policyType === 'termsOfService') {
          setPolicyResponse(response?.data?.shop?.termsOfService);
        } else if (policyType === 'refundPolicy') {
          setPolicyResponse(response?.data?.shop.refundPolicy);
        }
      } 
      setLoader(false);
    }).catch((error) => {
      setLoader(false);
      console.log(error);
    });
    };

  useEffect(() => {
    getPolicyData();  
  }, []);

  return (
    <>
        <div className="footer-icons-col">
            <div data-ml-modal id="authentic"
              className="modal-with-head footer-icon-popup target-modal"
              >
              <a className="modal-overlay"
                  onClick={() => {
                      setShowPopup(false);
                  }}
              ></a>
              <div className="modal-dialog position-relative">
                  <a className="close-modal cursor-pointer"
                      onClick={() => {
                          setShowPopup(false);
                      }}
                  >
                  <ProductModalCloseIcon />
                  </a>
                  <div className="modal-content center">
                      <div className="policy-modal-head">
                        <p>{policyResponse?.title}</p>
                      </div>
                      <div className="policy-model-body">
                        {
                          loader ? <div className="product-loader"></div> : 
                          policyResponse && parse(policyResponse?.body)
                        }
                      </div>
                  </div>
              </div>
            </div>
      </div>
    </>
    
  )
}

export default PrivacyAndTerms;