import React from 'react';
import { INewBenefit } from '../../models/home';

interface BenefitChipsProps {
  benefits: INewBenefit;
}

const ForWithBenefits = (props: BenefitChipsProps) => {
  const { benefits } = props;

  return (
    <div className='for-with-container'>
      {benefits.for &&
        <div className='item'>
          <span className='text-for'>
            FOR
          </span>
          <span className='text-with'>
            {benefits.for}
          </span>
        </div>
      }
      {benefits.with &&
        <div className='item'>
          <span className='text-for'>
            WITH
          </span>
          <span className='text-with'>
            {benefits.with}
          </span>
        </div>
      }

    </div>
  );
};

export default React.memo(ForWithBenefits);