import React, { useContext } from 'react';
import OfferItem from '../../components/cart/offer-item';
import { GetOfferResponse, PriceModel } from '../../models/cart/get-response';
import { formatPrice } from '../../utils/cart/price-formatter';
import { CartContext } from '../../context/cart';


const OfferList = (props: any) => {
  const { state, dispatch } = useContext(CartContext);
  const priceModel: PriceModel = formatPrice(state);

  return (
    <>
      <h2 className="text-left heading-text mb-8 pt-16">Offers</h2>
      <div className="applied-cash-box">
        {/* applicable offers */}
        {/* {showQuickBuyOffer(state) && offerItem(QuickBuyOffer, -1)} */}
        {props.setOfferList.map((offer: GetOfferResponse, ind: number) => {
          if (priceModel && priceModel?.subtotal > offer.minSubtotal)
            return (
              <OfferItem
                key={ind}
                item={offer}
                setOfferVisible={props.setOfferVisible}
                setCashApply={props.setCashApply}
                setShowPopup={props.setShowPopup}
                setDocumentWidth={props.setDocumentWidth}
                setOpenPopup={props.setOpenPopup}
                setIsDisplayConfeti={props.setIsDisplayConfeti}
              />
            ) 
        })}

        {/* Non applicable offers */}
        {props.setOfferList.map((offer: GetOfferResponse, ind: number) => {
          if (priceModel && priceModel?.subtotal <= offer.minSubtotal)
            return (
              <OfferItem
                key={ind}
                item={offer}
                setOfferVisible={props.setOfferVisible}
                setCashApply={props.setCashApply}
                setShowPopup={props.setShowPopup}
                setDocumentWidth={props.setDocumentWidth}
                setOpenPopup={props.setOpenPopup}
                setIsDisplayConfeti={props.setIsDisplayConfeti}
              />)
        })}
      </div>
    </>
  );
};
export default OfferList;
