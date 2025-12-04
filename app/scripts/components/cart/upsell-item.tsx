import React from 'react';
import { TickIcon } from '../../../icons/tickIcon';
import { GetUpsellResponse } from '../../models/cart/get-response';
import { formatPriceWithCurrency, getRandomUserNumber } from '../../utils/cart/formatter';

interface IProps {
  item: GetUpsellResponse;
  addItem: (item: GetUpsellResponse) => void;
}
const UpsellItem = (props: IProps) => {
  const { item, addItem } = props;
  return (
    <>
      <div className="product-card-box-v3">
        <a href="#" className="product-img-v3">
          <img
            src={item.image}
            width="97"
            alt="OZiva Phyto cleanse anti acne serum"
          />
        </a>
        <div className="product-card-box-v3-dtl">
            <h2 className="productCartTitle">{item.title}</h2>
            <ul className="productBenefitChips">
              {item.benefits &&
                item.benefits.length > 0 &&
                item.benefits?.map((upsellItem, ind) => {
                return (
                  <li key={ind}>
                    <span>
                      <TickIcon /> 
                    </span>
                    {upsellItem}
                  </li>
                );
              })}
          </ul>
          <div className="productPriceDetails">
            <span className="priceMRP">MRP:</span>
            {item?.compare_at_price - item.price > 0 && 
              <del className="priceMRP">
                {formatPriceWithCurrency(item?.compare_at_price)}
              </del>
            }
            <span className="actualPrice">{formatPriceWithCurrency(item.price)}</span>
            {item?.compare_at_price - item.price > 0 && 
              <span className="totalPriceOff">
              {formatPriceWithCurrency(item?.compare_at_price - item.price)} off
            </span>
            }
          </div>
          <div className="product-card-box-v3-footer">
            <div>{getRandomUserNumber(item.variant_id)}+ Users added</div>
            <a
              href="javascript:void(0)"
              onClick={() => addItem(item)}
              className="ProductCardBtnSmall"
            >
              ADD
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpsellItem;