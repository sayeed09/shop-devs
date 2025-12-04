import React from 'react';
import { HowToUse } from '../../interface/product';

interface ProductUsageModal {
  howToUseData: HowToUse;
}
const ProductUsage = (props: ProductUsageModal) => {
  if (!props.howToUseData || !props.howToUseData?.data.length) {
    return null;
  }
  return (
      <>
        <div className="rounded-sm product-left-sec borderGray border p-16 how-to-use-sec how-to-use-sec-list">
          <h2 className="mb-16">How To Use</h2>
          <ul>
            {props.howToUseData?.data.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
          <p className="mt-16 f-m-12 text-off-gray">{props.howToUseData.caption}</p>
          <div>
            <p className="mt-16 f-m-12 text-off-gray" style={{fontStyle: 'italic'}}>
              *Health Claims based on scientifically/clinically studied ingredients. Individual results may vary depending on an individual's health, lifestyle, and other factors.
            </p>
          </div>
        </div>
      </>
  );
};
export default ProductUsage;
