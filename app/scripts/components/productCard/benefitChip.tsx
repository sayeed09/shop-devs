import React from 'react';

interface BenefitChipsProps {
  benefits: string[]
}

const BenefitChips = (props: BenefitChipsProps) => {
  const { benefits } = props;

  return (
    <ul className="productBenefitChips">
      {benefits?.length > 0 ? (
        benefits?.map((benefit, i) => (
          <li key={i}>
            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/check-icon.svg?v=1715063466" />
            {benefit}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
};

export default React.memo(BenefitChips);