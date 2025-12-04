import React, { useEffect, useState } from 'react';
import { GetCartListResponse } from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import { BuildYourBoxDetailProvider, getVariantsFromStorage } from '../../utils/build-you-box/helper';
const AddtocartSnackbar = () => {
  const [cartItems, setCartItems] = useState<GetCartListResponse>();

  useEffect(() => {
    cartService.getCartItems().then((response: GetCartListResponse) => {
      setCartItems(response);
    });
  }, []);

  const getItemCount = () => {
    let itemCount = 0;
    if (cartItems && cartItems?.item_count >= 3 && getVariantsFromStorage()) {
      const uniqueHandles:string[] = Array.from(new Set(getVariantsFromStorage().map((item) => item.collectionHandle)));
      let totalQty = 0;
      uniqueHandles.forEach((item) => totalQty += BuildYourBoxDetailProvider[item].quantity)
      itemCount - (totalQty - uniqueHandles.length)
      itemCount = cartItems?.item_count - (totalQty-uniqueHandles.length);
      
    } else {
      itemCount = cartItems?.item_count
    }
    return itemCount;
  }
  return (
    <>
      {cartItems?.total_price &&
        <div
          className="ATCwrapper"
          onClick={(e) => (window.location.href = '/cart')}
        >
          <div className="ATCtextwrapper">
            <div>You have {getItemCount()} item(s) in your cart</div>
            <div>
              Subtotal{' '}
              <span style={{ color: 'white' }}>
                ₹{(cartItems?.total_price || 0) / 100}
              </span>
            </div>
          </div>
          <div className="ATCbuttonwrapper">
            <a href="#">VIEW CART</a>
          </div>
        </div>
      }
    </>
  );
};

export default AddtocartSnackbar;
