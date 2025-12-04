import React from 'react';
import { ConsumerDataModal } from '../../interface/product';

const ConsumerItem = (props:{data:ConsumerDataModal}) => {
  return (
    <>
      <div className="consumer-study-box">
        <div className="consumer-study-box-inner">
          <h2>{props?.data?.header}</h2>
          <p>{props?.data?.description}</p>
        </div>
      </div>
    </>
  );
};
export default ConsumerItem;
