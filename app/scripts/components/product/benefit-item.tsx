import React from 'react';
import { TickIcon } from '../../../icons/tickIcon';

interface BenefitItemModal {
  benefitItem: string;
}

const BenefitItem = (props: BenefitItemModal) => {
  const { benefitItem } = props;
  return (
    <li>
      <span>
        <TickIcon />
      </span>
      {benefitItem}
    </li>
  );
};
export default BenefitItem;
