import React from 'react';
import { MinusIcon } from '../../../icons/minus-icon';
import { PlusIcon } from '../../../icons/plus-icon';

interface IProps {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  maxQtyAllowed: number;
}
const QuantityPicker = ({
  quantity,
  handleIncrement,
  handleDecrement,
  maxQtyAllowed
}: IProps) => {
  return (
    <div className="add-remove-item">
      {
        maxQtyAllowed !== null && maxQtyAllowed === 1 ? null :
          <>
            <div className="border border-light-gray rounded-sm bg-white d-flex">
              <a onClick={handleDecrement}>
                <MinusIcon />
              </a>
              <input
                type="text"
                value={quantity}
                className="border-0 text-center small-text"
                placeholder="0"
                readOnly
              />
              <a onClick={handleIncrement} style={maxQtyAllowed === quantity ? { pointerEvents: "none" } : {}}>
                <PlusIcon />
              </a>
            </div>
          </>
      }
    </div>
  );
};
export default QuantityPicker;
