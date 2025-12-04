import React, { useContext } from 'react';
import { CartContext } from '../../context/cart';
import { FreebiesResponseModel } from '../../models/cart/freebies';

interface IProps {
  item: FreebiesResponseModel;
  onSelectFreebie: (item: FreebiesResponseModel, isSelected: boolean) => void;
}
const FreebieItem = ({ item, onSelectFreebie }: IProps) => {
  const { state } = useContext(CartContext);

  return (
    <>
      <div className="cart-item border border-white rounded-sm mb-4 d-flex">
        <div className="gift-checkbox">
          <input
            className="green-checkbox"
            id="green-checkbox-1"
            type="checkbox"
            checked={state.selectedFreebies.some(
              (freebie) => freebie.variant_id === item.variant_id,
            )}
            onChange={(e) => onSelectFreebie(item, e.target.checked)}
          />
          <label htmlFor="green-checkbox-1"></label>
        </div>
        <div className="oziva-item-img">
          <img src={item.image} width="70" alt={item.title} />
        </div>
        <div className="cart-item-dtl pb-0">
          <div className="cart-item-name">
            <p className="mb-8 small-text">{item.title}</p>
            {/* <ul className="cart-tag-list small-text d-flex mb-4">
              <li>Anti - Hairfall</li>
            </ul> */}
            <div>
              <span className="text-off-gray mr-2">MRP:</span>
              <span className="mr-4 text-off-gray small-text text-decoration">
                ₹{item.price / 100}
              </span>{' '}
              <span>FREE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FreebieItem;