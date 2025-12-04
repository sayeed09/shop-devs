import React from 'react';
import { hostDomainUrl } from '../../utils/helper';
const Booknow = () => {
  return (
    <>
    <p className="topic-head">Book personalized recommendations from our product experts.</p>
   <div>
          <input
            type="reset"
            value="Book Now"
            className="btn"
            style={{width:'100%'}}
            onClick={()=>window.location.href = `https://oziva.typeform.com/product-advice?typeform-source=www.${hostDomainUrl}`}
          />
        </div>
    </>
  );
};

export default Booknow;
