import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/cart';
import { UserContext } from '../../context/user';
import useCartDetails from '../../hooks/cart';
import { CouponRequestModel } from '../../models/cart/freebies';
import {
  AddCartItemResponse,
  GetCartListResponse,
  GetCashResponse,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import {
  getPrimeVariantId,
  showPrimeItemInCart,
  getCartAPIPayload,
  formatCartRadiumAPIVariant,
  formatPriceWithCurrency,
} from '../../utils/cart/formatter';
import { ProductResponseModal, UserLoginValue } from '../../interface/product';
import { productService } from '../../services/product';
import { getENVSpecificPrimeItemId } from '../../utils/product/constants';
import { setCartItems } from '../../actions/cart';
import { TickIcon } from '../../../icons/tickIcon';
import { getAccessToken } from '../../utils/product/formatter';

const PrimeItemV2 = () => {
  const { state, dispatch } = useContext(CartContext);
  const { state: userState } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useCartDetails();
  const [primeLineItem, setPrimeLineItem] = useState<ProductResponseModal>();
  let authorizationToken: UserLoginValue | null = getAccessToken();

  useEffect(() => {
    productService
      .getProductDetails(getENVSpecificPrimeItemId, 'pdp', true, false)
      .then((data: ProductResponseModal) => {
        setPrimeLineItem(data);
      });
  }, []);

  const showLogin = () => {
    const event = new Event('handleLogin');
    document.dispatchEvent(event);
  };

  const addItem = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    cartService
      .addItem(+getPrimeVariantId(), 1)
      .then((addData: AddCartItemResponse) => {
        if (addData) {
          cartService.getCartItems().then((data: GetCartListResponse) => {
            const requestPayload: CouponRequestModel = getCartAPIPayload(
              data,
              state?.discountCode,
            );
            getCart(requestPayload)
              .then((response) => {
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
          });
        }
      });
  };
  if (
    state.cart.line_items.some(
      (variant) => variant.variant_id === getPrimeVariantId(),
    ) || !primeLineItem?.data
  ) {
    return null;
  } else if (!showPrimeItemInCart(userState)) {
    return null;
  }

  return (
    <div className='cart-prime-banner-sec' style={{ marginBottom: 16 }}>
      <div className="prime-cart-banner-section">
        <div className='prime-card-box-v2-items'>
          <div className='product-img-v2'>
            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/prime_logo.svg?v=1709117915' />
          </div>
          <div>
            <h2 className='productCartTitle mb-4 pb-0' style={{ minHeight: 15 }}>
              {primeLineItem?.data.title}
            </h2>
            <div className="product-card-badge">
              3 Months
            </div>
          </div>

        </div>
        <div className='prime-benefits'>
          <div>
            <TickIcon />
            3 Months Nutritionist Diet Consultation + Diet Plan
          </div>
          <div>
            <TickIcon />
            30% EXTRA savings (15% discount with OZiva Cash & 15% Cashback)
          </div>
        </div>
        <div className="productPriceDetails pb-0">
          <span className="priceMRP">MRP:</span>
          {primeLineItem?.data?.variants && primeLineItem?.data?.variants[0]?.compareAtPrice - primeLineItem?.data?.variants[0]?.price > 0 &&
            <del className="priceMRP">{formatPriceWithCurrency(
              primeLineItem?.data?.variants && primeLineItem?.data?.variants[0]?.compareAtPrice)
            }</del>}
          <span className="actualPrice"> {formatPriceWithCurrency(primeLineItem?.data?.variants[0]?.price)}
          </span>

        </div>
        <div className="productPriceDetails pt-8 pb-0">
          {primeLineItem?.data?.variants && primeLineItem?.data?.variants[0]?.compareAtPrice - primeLineItem?.data?.variants[0]?.price > 0 &&
            <span className="totalPriceOff"><span>You save:</span> {formatPriceWithCurrency(
              primeLineItem?.data?.variants && primeLineItem?.data?.variants[0]?.compareAtPrice - primeLineItem?.data?.variants[0]?.price
            )}
            </span>}
          <div style={isLoading ? { opacity: 0.5 } : {}} className='add-now' onClick={() => addItem()}>
            ADD NOW
          </div>
        </div>

      </div>
      {!authorizationToken?.accessToken &&
        <div className='prime-card-save-text mt-8'>
          Already A Prime Member? <span style={{ cursor: 'pointer' }} onClick={() => showLogin()}> LOGIN</span>
        </div>
      }
    </div>
  );
};

export default PrimeItemV2;
