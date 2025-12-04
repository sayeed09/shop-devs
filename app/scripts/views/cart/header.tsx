import React, { useContext, useEffect, useRef, useState } from 'react';
import { OzivaLogo } from '../../../icons/oziva-logo';
import { BackArrow } from '../../../icons/back-arrow';
import { CartContext } from '../../context/cart';
import { redirectUrl } from '../../utils/endpoints';
import { formatPriceWithCurrency, getCartItemsCount, getCheckoutURL } from '../../utils/cart/formatter';
import { formatToPrice, setCookie } from '../../utils/product/formatter';
import SatisfactionGuaranteed from '../../components/cart/satisfaction-guaranteed';
import { formatPrice } from '../../utils/cart/price-formatter';
import { totalSavingsPrice } from '../../utils/cart/helper';
import { checkIfSubscriptionCart, getSubscriptionDataFromStorage, isMobile } from '../../utils/helper';
import { SubscriptionProductDetails } from '../../interface/product';
import { DownArrow } from '../../../icons/down-arrow';
import { UpArrowIcon } from '../../../icons/up-arrow';
import { UserContext } from '../../context/user';

const Header = (props: any) => {
  const { state } = useContext(CartContext);
  const { state: userState } = useContext(UserContext);
  const priceModel = formatPrice(state);
  const youSavePrice = totalSavingsPrice(priceModel);
  const subscriptionProductData: SubscriptionProductDetails | null = getSubscriptionDataFromStorage()

  //UDS-690-Start
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const el = document.querySelector('.oziva-cart-left-spacing-1')
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
      if (el) {
        (el as HTMLElement).style.marginTop = `${contentRef.current.scrollHeight + 110}px`
      }
    } else {
      setHeight("0px");
      if (el) {
        (el as HTMLElement).style.marginTop = `${110}px`
      }

      //Added timeout to avoid glitch while collapsing
      // setTimeout(() => {
      //   if (el) {
      //     (el as HTMLElement).style.marginTop = `${89}px`
      //   }
      // }, 300);
    }
  }, [isOpen]);


  //UDS-690-End

  useEffect(() => {
    // poc for PDP hosted on subdomain, TODO:// remove this snippet after poc is done
    setCookie('cartItemCnt', getCartItemsCount(state?.cart?.line_items));
  }, [getCartItemsCount(state?.cart?.line_items)]);

  const redirectURL = () => {
    if (document.referrer === getCheckoutURL()) {
      window.location.href = `${redirectUrl}collections/best-sellers`;
    } else if (props.offerVisible) {
      props.setOfferVisible(false)
    } else {
      window.history.back();
    }
  }

  const totalCashback =
    userState.isLoggedIn &&
      userState.userProfile.prime?.current_status === 'prime'
      ?
      Number(state.discountAndCashResponse.cashback_prime || 0) / 100
      : 0 + Number(state.discountAndCashResponse.cashback_non_prime || 0) / 100;

  const getCashBackOnOrder = () => {
    return state.discountAndCashResponse?.order_total ? Math.floor((Number(state.discountAndCashResponse.order_total) / 100) * 0.15) : Math.floor((Number(+(state?.cart?.order_total ?? 0) / 100) * 0.15))
  }

  const getDiscountedValue = () => {
    const couponCode = state?.discountAndCashResponse.discount_code;
    const totalDiscount = (state?.discountAndCashResponse.total_discount ?? 0) / 100;

    //Need to refactor
    return couponCode && couponCode.includes('_freebies')
      ? couponCode.split('|').length > 1
        ? totalDiscount - (priceModel?.freebiesDiscount ?? 0)
        : totalDiscount
      : totalDiscount;
  };

  const currentOfferDetails = state.offers && state.offers.find((item) => item.code == state.discountCode.split('|')[0]);

  return (
    <>
      <header className={`${youSavePrice > 0 ? '' : 'oziva-header-border'} oziva-header`}>
        <nav className='oziva-header-control'>
          <div className="start-nav">
            <a className="d-m-none" href={redirectUrl}>
              <OzivaLogo />
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => redirectURL()}
              className="back-page d-none d-m-block"
            >
              <BackArrow />
            </a>
            {(checkIfSubscriptionCart() ? (subscriptionProductData?.variant_id) : (state.cart.line_items.length > 0)) &&
              <div className='stepper-container'>
                <div className='step-item active-text'>
                  <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/tick_filled_26a0879b-5b69-4a19-aa96-5519ab570341.svg?v=1744610712' width={15} height={15} />
                  <div>Cart</div>
                </div>
                <span className='line'></span>
                <div className='step-item'>
                  <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/tick_with_outline_c3d5f0c8-eceb-46ea-97d5-7fb944404ea1.svg?v=1744610713' width={15} height={15} />
                  <div>Address</div>
                </div>
                <span className='line'></span>
                <div className='step-item'>
                  <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/tick_with_outline_c3d5f0c8-eceb-46ea-97d5-7fb944404ea1.svg?v=1744610713' width={15} height={15} />
                  <div>Payment</div>
                </div>
              </div>
            }
          </div>
        </nav>
        <div className='cashback'>
          {youSavePrice > 0 && <div className='cashback-container'>
            <div className='cashback-text' onClick={() => {
              if (!checkIfSubscriptionCart()) {
                setIsOpen((prev) => !prev);
              }
            }}>
              <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/savings.svg?v=1763102614" alt="Cash Savings" className='cashback-heading-icon' />
              <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/discount_icon_2.svg?v=1749714933" alt="Cash Savings" className='discount-heading-icon' />
              <div className='saved-text'>
                {!checkIfSubscriptionCart() ? <span className='highlighted-text'>You saved {formatPriceWithCurrency(formatToPrice(youSavePrice))} </span> : <span style={{ color: '#6bbd58', fontWeight: 600 }}>You saved {formatPriceWithCurrency(formatToPrice(youSavePrice))}
                </span>} on this order today!
                {!checkIfSubscriptionCart() && <span className='arrow-icon-header' style={isOpen ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}><DownArrow />
                </span>}
              </div>
              {!checkIfSubscriptionCart() ? <div
                ref={contentRef}
                style={{ height: height, display: 'none' }}
                className='additional-saving-info-container'
              >
                {
                  state.cashApplied ? (
                    <p className='additional-saving-info'>
                      <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' alt='done icon' />
                      {formatPriceWithCurrency(formatToPrice(getDiscountedValue()))} saved {' '}
                      with OZiva Cash
                    </p>
                  ) : state.discountCode ? <p className='additional-saving-info'>
                    <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' alt='done icon' />
                    {currentOfferDetails?.description || `${formatPriceWithCurrency(formatToPrice(getDiscountedValue()))} ' saved`}
                    {' '} with {state.discountCode.split('|')[0]}
                  </p> : null
                }
                {(youSavePrice - (Number(getDiscountedValue()))) > 0 ? <p className='additional-saving-info'><img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' alt='done icon' />{formatPriceWithCurrency(formatToPrice(youSavePrice - (Number(getDiscountedValue() || 0))))} saved with product price drop!</p> : null}
                {(getCashBackOnOrder() > 0 || totalCashback > 0) ? <p className='additional-saving-info'><img src='https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' alt='done icon' />You earn {Number(totalCashback + getCashBackOnOrder())} OZiva Cash on this order</p> : null}
              </div> : null}
            </div>
          </div>}

        </div>
      </header>
      {getCartItemsCount(state.cart.line_items) > 0 && <SatisfactionGuaranteed />}
    </>
  );
};
export default Header;
