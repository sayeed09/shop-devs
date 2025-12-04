import React, { useContext, useState, useEffect } from 'react';
import { OZPrimeLogo } from '../../../icons/oz-prime-logo';
import { TickIcon } from '../../../icons/tickIcon';
import { setCartItems } from '../../actions/cart';
import { CartContext } from '../../context/cart';
import { UserContext } from '../../context/user';
import useCartDetails from '../../hooks/cart';
import { CouponRequestModel } from '../../models/cart/freebies';
import {
  AddCartItemResponse,
  GetCartListResponse,
} from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import {
  getPrimeVariantId,
  showPrimeItemInCart,
  getCartAPIPayload,
} from '../../utils/cart/formatter';
import { ProductResponseModal } from '../../interface/product';
import { productService } from '../../services/product';
import { getENVSpecificPrimeItemId } from '../../utils/product/constants';

const PrimeItem = () => {
  // const {primeLineItem} = props;
  const queryString = window.location.search;
  const { state, dispatch } = useContext(CartContext);
  const { state: userState } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useCartDetails();
  const [primeLineItem, setPrimeLineItem] = useState<ProductResponseModal>();

  const showLogin = () => {
    const event = new Event('handleLogin');
    document.dispatchEvent(event);
  };

  useEffect(() => {
    productService.getProductDetails(getENVSpecificPrimeItemId, 'pdp', true, false)
    .then((data: ProductResponseModal) => {
      setPrimeLineItem(data);
    })
  }, []);

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
              .then(() => {
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
    )
  ) {
    return null;
  } else if (!showPrimeItemInCart(userState)) {
    return null;
  }
  return (
    <>
      {
        primeLineItem && <> <div
          className="cart-item bg-white rounded-sm mb-4 d-flex"
          style={isLoading ? { opacity: 0.6, marginBottom: '8px' } : { marginBottom: '8px' }}
        >
          <div className="cart-item-dtl">
            <h3 className="mb-8 mb-m-4 cart-item-name">
              OZiva {primeLineItem.data.title}
            </h3>
            <p className="small-text mb-16 mb-m-8 text-off-gray">
              Save 30% extra
            </p>

            <div className="small-text">
              <a
                href="javascript:void(0)"
                onClick={() => addItem()}
                className="text-uppercase text-orangeVibrantShade font-medium mr-8"
              >
                ADD NOW
              </a>
              <span className="mr-2 text-off-gray ">
                MRP: <span className="text-decoration">₹{primeLineItem.data.variants[0].compareAtPrice}</span>
              </span>{' '}
              <span className="font-medium prime-number">₹{primeLineItem.data.variants[0].price}</span>
            </div>
          </div>
          <div className="oziva-item-img PrimeBoxPrimeLogo">
            <OZPrimeLogo />
          </div>
        </div>
          <div className="cart-item-footer">
            {!userState.isLoggedIn && (
              <>
                <span className="text-secondaryDeepGreen mr-8">
                  Already a prime member?
                </span>
                <a
                  href="javascipt:void(0)"
                  onClick={() => showLogin()}
                  className="text-uppercase text-primaryGreen"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </>
      }
    </>
  );
};

export default PrimeItem;
