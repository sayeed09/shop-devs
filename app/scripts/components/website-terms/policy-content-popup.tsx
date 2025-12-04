import React, { useEffect, useState } from 'react';
import { PrivacyAndTerms } from '../../interface/product';
import { termsPolicyService } from '../../services/terms-policy';
import parse from 'html-react-parser';

interface IProps {
  policyType: string;
}
const PolicyContentPopup = ({policyType}: IProps) => {
  const [policyResponse, setPolicyResponse] = useState<PrivacyAndTerms>();

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
      }).catch((error) => console.log(error));
    };

  useEffect(() => {
    getPolicyData();  
  }, []);
  
  return (
    <>
      <p className='policy-heading text-left'>{policyResponse && policyResponse?.title}</p>
      {policyResponse && parse(policyResponse?.body)}
    </>
  )
}

export default PolicyContentPopup