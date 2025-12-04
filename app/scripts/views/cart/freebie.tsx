import React, { useContext, useEffect, useState } from 'react';
import { setSelectedFreebies } from '../../actions/cart';
import FreebieItem from '../../components/cart/freebie-item';
import { CartContext } from '../../context/cart';
import {
  FreebieRequestModel,
  FreebiesResponseModel,
} from '../../models/cart/freebies';
import { cartService } from '../../services/cart';
import { formatRequestPayload } from '../../utils/cart/formatter';

const Freebies = () => {
  const { state, dispatch } = useContext(CartContext);
  const [freebies, setFreebies] = useState<FreebiesResponseModel[]>([]);
  useEffect(() => {
    if (state.cart && state.cart.line_items.length) {
      getFreebies();
    }
  }, [state.cart]);
  const getFreebies = () => {
    const requestModel: FreebieRequestModel = {
      variants: formatRequestPayload(state),
    };
    cartService
      .getFreebies(requestModel)
      .then((data: FreebiesResponseModel[]) => {
        dispatch(setSelectedFreebies(data));
        setFreebies(data);
      });
  };
  const onSelectFreebie = (
    item: FreebiesResponseModel,
    isSelected: boolean,
  ) => {
    let selectedFreebies = [...state.selectedFreebies];
    if (isSelected) {
      const isAdded = selectedFreebies.some(
        (freebie) => freebie.variant_id === item.variant_id,
      );
      if (!isAdded) {
        selectedFreebies.push(item);
      }
    } else {
      selectedFreebies = selectedFreebies.filter(
        (freebie) => freebie.variant_id !== item.variant_id,
      );
    }
    dispatch(setSelectedFreebies(selectedFreebies));
  };
  if (freebies.length === 0) {
    return null;
  }
  return (
    <div className="free-gift-sec mt-16 mb-16">
      <p className="free-gifts-heading heading-text">FREE GIFTS</p>
      <div className="bg-primaryPahadiCitrusPC200 rounded-sm p-8">
        {freebies.map((item) => (
          <FreebieItem
            item={item}
            key={item.variant_id}
            onSelectFreebie={onSelectFreebie}
          />
        ))}
      </div>
    </div>
  );
};
export default Freebies;