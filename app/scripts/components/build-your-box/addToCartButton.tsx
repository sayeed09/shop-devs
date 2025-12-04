import React from 'react';
import { IBYBItem } from '../../interface/build-your-box';

interface IATCButtonProps {
  item: IBYBItem;
  addToBox: (variantId: string) => void;
  selectedVariants: IBYBItem[];
  handleRemoveProduct: (index: number) => void;
  setShowSnakbar: (showSnackbar: boolean) => void;
}

const AddToCartButton = ({ item, selectedVariants, addToBox, handleRemoveProduct, setShowSnakbar }: IATCButtonProps) => {
  const checkIfItemAddeInBox = () => {
    return selectedVariants.findIndex((elements: IBYBItem) => {
      return elements.variantId === item.variantId;
    });
  }

  const getCountOfVariants = () => {
    return selectedVariants.filter((elements: IBYBItem) => {
      return elements?.variantId === item?.variantId;
    });
  }

  const handleAddToBox = () => {
    if (getCountOfVariants().length === 2) {
      return setShowSnakbar(true);
    }
    addToBox(item.variantId);
  }

  return (
    <div>
      {
        getCountOfVariants().length > 0 ?
          getCountOfVariants().length === 2 ?
            <div className="ProductCardBtn">
              <div className="single_card_overlay">ADDED</div>
            </div> :
            <div className="ProductCardBtn">
              <div className='ProductCardBtnAddMore'>

                <button className='minus' onClick={() => handleRemoveProduct(checkIfItemAddeInBox())}><span>-</span></button>
                <button className='add_more' onClick={() => handleAddToBox()}>ADD MORE</button>
                <button className='add' onClick={() => handleAddToBox()}><span>+</span></button>
              </div>
            </div>
            :
            <div className="ProductCardBtn" onClick={() => {
              addToBox(item.variantId);
            }}>
              <div className="single_card_overlay">+ ADD TO BOX</div>
            </div>
      }
    </div>
  );
};

export default AddToCartButton;
