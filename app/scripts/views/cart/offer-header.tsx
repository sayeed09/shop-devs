import React, { useContext } from 'react';
import { OzivaLogo } from '../../../icons/oziva-logo';
import { CartContext } from '../../context/cart';
import { HeaderClose } from '../../../icons/header-close-icon';
import { redirectUrl } from '../../utils/endpoints';
import { getCartItemsCount } from '../../utils/cart/formatter';
import SatisfactionGuaranteed from '../../components/cart/satisfaction-guaranteed';

const OfferHeader = (props: any) => {
  const { state } = useContext(CartContext);

  return (
    <>
      {/* START HEADER  */}
      <header className="oziva-header">
        <nav>
          <div className="start-nav">
            <a className="d-m-none" href={redirectUrl}>
              <OzivaLogo />
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => {
                props.offerVisible
                  ? props.setOfferVisible(false)
                  : window.history.back();
              }}
              className="back-page d-none d-m-block mr-16"
            >
              <HeaderClose />
            </a>
            <h2 className="cart-total d-none d-m-block mb-0">
              OZiva Cash and Offers
            </h2>
          </div>
          <div className="web-cart-head d-m-none">
            <span>Cart({getCartItemsCount(state.cart.line_items)})</span>
          </div>
        </nav>
      </header>
      {getCartItemsCount(state.cart.line_items) > 0 && <SatisfactionGuaranteed/>}
    </>
  );
};
export default OfferHeader;
