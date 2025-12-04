import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user';
import { userService } from '../../services/user';
import { AddressList } from '../../interface/product';
import { EditIcon } from '../../../icons/edit-icon';
import {
  setDefaultAddress,
  setEditDefaultAddress,
  setQuickBuyCart,
} from '../../actions/cart';
import { CartContext } from '../../context/cart';
import { getQuickBuyItems } from '../../utils/cart/helper';
import Loader from '../../views/cart/loader';

const QuickBuyAddress = () => {
  const { state: userState } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState<AddressList>();

  useEffect(() => {
    if (userState.isLoggedIn) {
      fetchUserAddress();
    }
  }, [userState.isLoggedIn]);


  const fetchUserAddress = async () => {
    const quickBuyItem = getQuickBuyItems();
    const url = new URLSearchParams(window.location.search);
    if (Boolean(url.get('qb'))) {
      setIsLoading(true);
      const addressList = await userService.getUserAddress();
      const defaultAddress =
        addressList.filter((item) => item.defaultAddress).length > 0
          ? addressList[0]
          : undefined;
      if (defaultAddress) {
        setUserAddress(defaultAddress);
        cartDispatch(setDefaultAddress(defaultAddress as AddressList));
        cartDispatch(setQuickBuyCart(defaultAddress ? true : false));
        setIsLoading(false);
      }
    }
  };
  if (!userAddress || !cartState.quickBuyCart) {
    return <></>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="cart-price-detail mt-16 full-width bg-white cart-address-details oziva-body">
        <h3 className="m-0 p-8">Address</h3>
        <hr />
        <label className="p-8 d-block">
          <input type="radio" className="oz-radio" checked />
          <span className="address-name">
            {userAddress.firstName} {userAddress.lastName}
          </span>
          <span className="oz-tag">HOME</span>
        </label>
        <div className="cart-full-address">
          <p>
            {userAddress.address1},{' '}
            {userAddress.address2 ? `${userAddress.address2},` : ''}{' '}
            {userAddress.province}, {userAddress.zip}
          </p>
          <p> {userAddress.country}</p>
          <p>
            Mobile no:{' '}
            <span className="mobile-number">{userAddress.phone}</span>
          </p>
        </div>
        <button
          type="button"
          className="cart-address-edit button-link"
          onClick={() => cartDispatch(setEditDefaultAddress(true))}
        >
          <EditIcon />
        </button>
      </div>
    </>
  );
};

export default QuickBuyAddress;
