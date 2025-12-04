import React from 'react';
import { PrimeLovedByCustomer } from '../../utils/prime-page';
import CustomerRatings from './customer-ratings';

const PrimeCustomersLoveYourExperts = () => {
  return (
    <>
      <h2>Customers Love your Experts!</h2>
      <div className="prime-customer-love-lists">
        {PrimeLovedByCustomer && PrimeLovedByCustomer.map((item, index) => {
          return(
            <div key={index} className="prime-customer-love-lists-item">
              <div className="prime-user-review">
                <div>
                  <div>{item.name}</div>
                  <div className="prime-user-star">
                    <CustomerRatings rating={item.rating} totalRating={5}/>
                  </div>
                </div>
              </div>
              <p>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default PrimeCustomersLoveYourExperts;
