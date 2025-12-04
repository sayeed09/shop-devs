import React, { useContext, useEffect, useState } from 'react';
import { GetCashResponse, LineItem } from '../../models/cart/get-response';
import { DeleteIcon } from '../../../icons/delete-icon';
import {
  formatPriceWithCurrency,
  getCartAPIPayload,
} from '../../utils/cart/formatter';
import { EditIcon } from '../../../icons/edit-icon';
import { CartContext } from '../../context/cart';
import useCartDetails from '../../hooks/cart';
import { cartService } from '../../services/cart';
import { CouponRequestModel } from '../../models/cart/freebies';
import {
  BuildYourBoxDetailProvider,
  getBYBItemsForCart,
  getVariantsFromStorage,
} from '../../utils/build-you-box/helper';
import {
  ISelectedVariants,
} from '../../interface/build-your-box';
import {
  setCartItems,
  setDiscountAndCashResponse,
  setDiscountCode,
} from '../../actions/cart';
import { GAContext } from '../../context/gatracking';
import { isMobile } from '../../utils/helper';

interface IProps {
  cartItems: LineItem[];
  benefitChip: string;
}

const BYBItem = ({ cartItems, benefitChip }: IProps) => {
  const lineItems: LineItem[] = getBYBItemsForCart(cartItems, benefitChip);
  const totalMRP = lineItems.reduce((accumulator, currentValue) => accumulator + currentValue.compare_at_price, 0);
  const discountedMRP = lineItems.reduce((accumulator, currentValue) => accumulator + currentValue.discounted_price, 0);


  const [isLoading, setLoading] = useState(false);
  const gaTrackingEvent = useContext(GAContext);
  const { state, dispatch } = useContext(CartContext);
  const { getCart } = useCartDetails();
  const updateQuantity = (quantity: number) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    const productIdsObject = {};
    const collectionHandle = Object.keys(BuildYourBoxDetailProvider).filter(
      (item) => BuildYourBoxDetailProvider[item].benefitChip == benefitChip,
    );
    const filteredVariants = getVariantsFromStorage().filter(
      (item) => item.collectionHandle == collectionHandle[0],
    );
    if (collectionHandle.length > 0) {
      getVariantsFromStorage() &&
        filteredVariants?.forEach((item: ISelectedVariants) => {
          productIdsObject[item.variant_id] = 0;
        });
      const updateProduct: any = {
        updates: productIdsObject,
      };
      cartService.updateItems(updateProduct).then((data) => {
        const requestPayload: CouponRequestModel = getCartAPIPayload(data, '');
        getCart(requestPayload)
          .then(() => {
            setLoading(false);
            localStorage.setItem(
              'buildYourBoxV3',
              JSON.stringify(
                getVariantsFromStorage().filter(
                  (item) => item.collectionHandle != collectionHandle[0],
                ),
              ),
            );
            dispatch(setDiscountCode(''));
            const updateQuantity = new CustomEvent('updateCartItemCount', {});
            document.dispatchEvent(updateQuantity);
            return data;
          })
          .catch(() => {
            setLoading(false);
          });
      });
    }
  };

  const removeCoupon = () => {
    const initialCashState: GetCashResponse = {
      line_items: [],
    };
    const initialCartDicountState: GetCashResponse = {
      ...state.cart,
      total_discount: 0,
    };

    sessionStorage.setItem('coupon_code', '');
    sessionStorage.setItem('login_coupon_code', '');
    dispatch(setDiscountCode(''));
    dispatch(setDiscountAndCashResponse(initialCashState));
    dispatch(setCartItems(initialCartDicountState));
    setLoading(false);
  };

  useEffect(() => {
    if (getVariantsFromStorage()) {
      removeCoupon();
    }
  }, []);

  const handleOnEdit = () => {
    const collectionHandle = Object.keys(BuildYourBoxDetailProvider).filter(
      (item) => BuildYourBoxDetailProvider[item].benefitChip == benefitChip,
    );
    if (collectionHandle.length > 0) {
      window.location.href = `/collections/${collectionHandle[0]}`;
    } else {
      return;
    }
  };
  if (cartItems.length === 0) {
    return null;
  }
  return (
    <>
      <div className="product-card-box-v2 byb-background" style={isMobile() ? {marginTop: 110} : {}}>
        <div className="product-card-box-v2-items">
          <div className="add-remove-item">
            <div
              className="text-off-gray qty-text"
              style={{ cursor: 'pointer' }}
            >
              {!isMobile() &&
                <button
                  onClick={() => {
                    updateQuantity(0);
                    gaTrackingEvent('remove_from_cart', { items: cartItems });
                  }}
                  className="cartItemDelete button-link">
                  <DeleteIcon />
                </button>
              }
              <button onClick={handleOnEdit} className="cartItemDelete button-link">
                <EditIcon />
              </button>
            </div>
          </div>
          {isMobile() &&
            <button
              onClick={() => {
                updateQuantity(0);
                gaTrackingEvent('remove_from_cart', { items: cartItems });
              }}
              className="cartItemDelete button-link"
              style={{ position: 'absolute', right: '4px', top: '-25px', textTransform: 'capitalize', textDecoration: 'underline', color: '#7E7E7E', fontWeight: 400 }}>
              Remove
            </button>
          }
          <div className="product-card-box-v2-dtl w-100">
            <h3>
              Box worth {formatPriceWithCurrency(totalMRP / 100)}- 
              <span style={{ color: '#f04e23' }}>
                {' '} You pay only {formatPriceWithCurrency(discountedMRP / 100)}
              </span>
            </h3>
            <ul className="list-item-cart">
              {lineItems.length > 0 && lineItems.map((item ,index) => {
                return (
                  <div className='byb-item-list'>
                    <img src={item.image} />
                    <div style={{flexGrow: 1, lineHeight: '16px'}}>
                      <li style={{fontWeight: 500, marginBottom: '4px'}} key={index}>{item.title?.split('|')[0]}</li>
                      <div style={{ color: '#757575'}}>MRP: {formatPriceWithCurrency(item.compare_at_price / 100)}</div>
                      <div style={{ color: '#757575', fontSize: 11 }}>Qty: {item.quantity}</div>
                    </div>
                    <div>
                      <span className='added-to-box'>Added to box</span>
                    </div>
                    {index < lineItems.length - 1 && <div className='round-grey'>
                      <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Plus.svg?v=1764241425" style={{width: 28, height: 28}}/>
                      </div>}
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BYBItem;
