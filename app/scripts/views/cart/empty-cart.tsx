import React from 'react';
import { EmptyCartIcon } from '../../../icons/empty-cart-icon';
import { redirectUrl } from '../../utils/endpoints';

const EmptyCart = () => {
  const startShopping = () => {
    window.location.href = `${redirectUrl}collections/frontpage`;
  };
  return (
    <>
      <div className="empty-cart-icon">
        <div className="mb-40">
          <EmptyCartIcon />
        </div>
        <h2 className="empty-cart-heading">Hey, It Feels So Light!</h2>
        <p className="empty-cart-info">
          There is nothing in your bag. Let&apos;s add some products.
        </p>
        <div>
          <button
            className="start-shopping-btn cursor-pointer"
            onClick={() => startShopping()}
          >
            START SHOPPING
          </button>
        </div>
      </div>
    </>
  );
};
export default EmptyCart;
