import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cart';
import {
  formatPrice,
} from '../../utils/cart/price-formatter';
import { ToolTipIcon } from '../../../icons/tooltip-icon';
import { UserContext } from '../../context/user';
import { formatPriceWithCurrency, getPrimeVariantId } from '../../utils/cart/formatter';
import { DiscountIcon } from '../../../icons/discount-icon';
import { OZPrimeLogo } from '../../../icons/oz-prime-logo';
import { SubscriptionProductDetails } from '../../interface/product';
import {
  checkIfSubscriptionCart,
  getSubscriptionDataFromStorage,
} from '../../utils/helper';
import { OneMonthConsultMRP, ThreeMonthConsultMRP } from '../../utils/data-provider';
import { FertilityProductId } from '../../utils/product/constants';

const PriceDetails = (props: any) => {
  const subscriptionData: SubscriptionProductDetails | undefined =
    getSubscriptionDataFromStorage();
  const { state } = useContext(CartContext);
  const { state: userState } = useContext(UserContext);
  const [openPriceDetails, setOpenPriceDetails] = useState(false);

  if (!checkIfSubscriptionCart()) {
    if (state.cart.line_items.length === 0) {
      return null;
    }
  }

  const priceModel = formatPrice(state);
  const totalCashback =
    userState.isLoggedIn &&
      userState.userProfile.prime?.current_status === 'prime'
      ? Math.floor(Number(priceModel.totalPayable) * 0.15) +
      Number(state.discountAndCashResponse.cashback_prime || 0) / 100
      : 0 + Number(state.discountAndCashResponse.cashback_non_prime || 0) / 100;
  const isPrimeAdded = state.cart.line_items.some((item) => item.variant_id == getPrimeVariantId());

  const checkIfFertilityProductAdded = () => {
    return state.cart.line_items.some(item => item.product_id == FertilityProductId);
  }

  return (
    <>
      <div className="cart-price-detail mt-16 full-width bg-white exp-clutter-control">
        <h2 className="pt-8 pl-8 pr-8 mb-8">Bill Summary</h2>
        <hr />
        <div className="text-gray pl-8 pr-8">
          <div className="mb-8">
            Total MRP{' '}
            <span className="float-right" style={{ color: '#333030' }}>
              {checkIfSubscriptionCart() && subscriptionData
                ? formatPriceWithCurrency(subscriptionData.compareAtPrice)
                : formatPriceWithCurrency(priceModel.orderTotal)}
            </span>
          </div>

          {(checkIfSubscriptionCart() &&
            subscriptionData &&
            subscriptionData.compareAtPrice - subscriptionData.price > 0) ||
            priceModel.orderTotal - priceModel.subtotal > 0 ? (
            <div className="mb-8">
              Discount on MRP{' '}
              <span className="float-right">
                -
                {checkIfSubscriptionCart() && subscriptionData
                  ? formatPriceWithCurrency(
                    subscriptionData.compareAtPrice - subscriptionData.price,
                  )
                  : formatPriceWithCurrency(
                    priceModel.orderTotal - priceModel.subtotal,
                  )}
              </span>
            </div>
          ) : null}
          {!checkIfSubscriptionCart() ? (
            (state.cashApplied && priceModel.discount > 0) ? (
              <div className="mb-8 text-secondaryDeepGreen">
                Discount{' '}
                <span style={{ fontWeight: 600 }}>OZiva Cash applied</span>
                <span className="float-right">-₹{priceModel.discount}</span>
              </div>
            ) : (
              state.discountCode && (
                <div className="mb-8 text-secondaryDeepGreen">
                  Discount{' '}
                  <span style={{ color: '#006e5a', fontWeight: 600 }}>
                    {state.discountCode.split('|')[0]}
                  </span>
                  <span className="float-right">-₹{priceModel.discount}</span>
                </div>
              )
            )
          ) : (
            <></>
          )}
          {!checkIfSubscriptionCart() && priceModel.freebiesDiscount > 0 && (
            <div className="mb-8 text-secondaryDeepGreen">
              Discount <span style={{ fontWeight: 500 }}>FREE Products</span>
              <span className="float-right">
                -₹{priceModel.freebiesDiscount}
              </span>
            </div>
          )}
          {!checkIfFertilityProductAdded() && <div className="mb-8 text-secondaryDeepGreen" style={{ fontWeight: 600 }}>
            {isPrimeAdded ? '3 Months' : '1 Month'}  Consultation
            <span className="float-right">
              <span className='text-decoration'>{formatPriceWithCurrency((isPrimeAdded ? ThreeMonthConsultMRP : OneMonthConsultMRP) / 100)}</span> FREE
            </span>
          </div>}
          <div className="mb-8">
            Delivery Charges
            <span className="float-right">
              <>
                <span className="mr-4 text-off-gray small-text text-decoration">
                  ₹99
                </span>
                FREE
              </>
            </span>
          </div>
        </div>
        <hr />
        <div className="font-bold pb-8 pl-8 pr-8 total-text">
          Total{' '}
          {checkIfSubscriptionCart() && subscriptionData ? (
            <span style={{ color: '#7E7E7E' }}>(per month)</span>
          ) : (
            ''
          )}
          <span className="float-right">
            {checkIfSubscriptionCart() && subscriptionData
              ? formatPriceWithCurrency(
                subscriptionData.price
              )
              : formatPriceWithCurrency(priceModel.totalPayable)}
          </span>
          {/* {totalCashback > 0 && (
            <div
              className="text-secondaryDeepGreen font-normal f-13 cashBackText mt-8 pt-8 pl-8 border-top d-flex"
              style={{
                borderTopColor: '#E0E0E0',
                margin: '8px -8px 0 -8px',
                padding: "8px 8px 0 8px, gap: '4px",
                alignContent: 'center',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <span
                className="float-left mr-4 prime-logo-small"
                style={{ marginTop: '-1px' }}
              >
                {userState.isLoggedIn &&
                  userState.userProfile.prime?.current_status == 'prime' ? (
                  <OZPrimeLogo />
                ) : (
                  <img
                    alt="CashIcon"
                    src={'https://cdn.shopify.com/s/files/1/2393/2199/files/CashIcon.jpg?v=1705314734'}
                    style={{ width: '24px', display: 'block' }}
                  />
                )}
              </span>
              You earn{' '}
              <span className="f-14 font-medium">
                {totalCashback} OZiva Cash
              </span>{' '}
              on this order
              <span className="tooltip" tabIndex={1}>
                <ToolTipIcon />
                <span className="tooltiptext">
                  {userState.isLoggedIn &&
                    userState.userProfile.prime?.current_status == 'prime' && (
                      <div>
                        Prime Member Discount:{' '}
                        {Math.floor(Number(priceModel.totalPayable) * 0.15)}
                      </div>
                    )}
                  {(Number(state.discountAndCashResponse.cashback_prime) > 0 ||
                    Number(state.discountAndCashResponse.cashback_non_prime) >
                    0) && (
                      <div>
                        {userState.isLoggedIn &&
                          userState.userProfile.prime?.current_status == 'prime'
                          ? '+'
                          : ''}{' '}
                        {state.discountAndCashResponse.discount_code} Discount:{' '}
                        {userState.isLoggedIn &&
                          userState.userProfile.prime?.current_status == 'prime'
                          ? `${Number(
                            state.discountAndCashResponse.cashback_prime,
                          ) / 100
                          }`
                          : Number(
                            state.discountAndCashResponse.cashback_non_prime,
                          ) / 100}
                      </div>
                    )}
                </span>
              </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="cart-price-detail mt-16 full-width bg-white exp-clutter-A">
        <div onClick={() => setOpenPriceDetails(openPriceDetails => !openPriceDetails)} className={`exp-price-container ${openPriceDetails ? 'pb-0' : ''}`}>
          <span className='price-bold'>
            To Pay
          </span>
          <span className='price-normal'>
            MRP:
            {checkIfSubscriptionCart() && subscriptionData
              ? subscriptionData.compareAtPrice - subscriptionData.price
              : priceModel.orderTotal - Number(priceModel.totalPayable) > 0 &&
              <span className='strike-through'>
                {checkIfSubscriptionCart() && subscriptionData
                  ? formatPriceWithCurrency(subscriptionData.compareAtPrice)
                  : formatPriceWithCurrency(priceModel.orderTotal)}
              </span>
            }
          </span>
          <span className='price-bold'>
            {checkIfSubscriptionCart() && subscriptionData
              ? formatPriceWithCurrency(
                subscriptionData.price
              )
              : formatPriceWithCurrency(priceModel.totalPayable)}
          </span>
          {checkIfSubscriptionCart() && subscriptionData
            ? subscriptionData.compareAtPrice - subscriptionData.price
            : priceModel.orderTotal - Number(priceModel.totalPayable) > 0 &&
            <span className='save-tab'>You Save {checkIfSubscriptionCart() && subscriptionData
              ? formatPriceWithCurrency(subscriptionData.compareAtPrice - subscriptionData.price)
              : formatPriceWithCurrency(priceModel.orderTotal - Number(priceModel.totalPayable))}</span>}
          <span className='arrow-icon' >
            <img src={`${openPriceDetails ?
              'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_up_black.svg?v=1745228211' :
              'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_down_black_ecee20ba-5ec5-4f0b-b9c6-c04dbff542c3.svg?v=1745228210'}`} />
          </span>
        </div>
        {openPriceDetails &&
          <>
            <hr />
            <div className="text-gray pl-8 pr-8">
              <div className="mb-8">
                Total MRP{' '}
                <span className="float-right" style={{ color: '#333030' }}>
                  {checkIfSubscriptionCart() && subscriptionData
                    ? formatPriceWithCurrency(subscriptionData.compareAtPrice)
                    : formatPriceWithCurrency(priceModel.orderTotal)}
                </span>
              </div>

              {(checkIfSubscriptionCart() &&
                subscriptionData &&
                subscriptionData.compareAtPrice - subscriptionData.price > 0) ||
                priceModel.orderTotal - priceModel.subtotal > 0 ? (
                <div className="mb-8">
                  Discount on MRP{' '}
                  <span className="float-right">
                    -
                    {checkIfSubscriptionCart() && subscriptionData
                      ? formatPriceWithCurrency(
                        subscriptionData.compareAtPrice - subscriptionData.price,
                      )
                      : formatPriceWithCurrency(
                        priceModel.orderTotal - priceModel.subtotal,
                      )}
                  </span>
                </div>
              ) : null}
              {!checkIfSubscriptionCart() ? (
                (state.cashApplied && priceModel.discount > 0) ? (
                  <div className="mb-8 text-secondaryDeepGreen">
                    Discount{' '}
                    <span style={{ fontWeight: 600 }}>OZiva Cash applied</span>
                    <span className="float-right">-₹{priceModel.discount}</span>
                  </div>
                ) : (
                  state.discountCode && (
                    <div className="mb-8 text-secondaryDeepGreen">
                      Discount{' '}
                      <span style={{ color: '#006e5a', fontWeight: 600 }}>
                        {state.discountCode.split('|')[0]}
                      </span>
                      <span className="float-right">-₹{priceModel.discount}</span>
                    </div>
                  )
                )
              ) : (
                <></>
              )}
              {!checkIfSubscriptionCart() && priceModel.freebiesDiscount > 0 && (
                <div className="mb-8 text-secondaryDeepGreen">
                  Discount <span style={{ fontWeight: 500 }}>FREE Products</span>
                  <span className="float-right">
                    -₹{priceModel.freebiesDiscount}
                  </span>
                </div>
              )}
              {!checkIfFertilityProductAdded() && <div className="mb-8 text-secondaryDeepGreen" style={{ fontWeight: 600 }}>
                {isPrimeAdded ? '3 Months' : '1 Month'}  Consultation
                <span className="float-right">
                  <span className='text-decoration'>{formatPriceWithCurrency((isPrimeAdded ? ThreeMonthConsultMRP : OneMonthConsultMRP) / 100)}</span> FREE
                </span>
              </div>}
              <div className="mb-8">
                Delivery Charges
                <span className="float-right">
                  <>
                    <span className="mr-4 text-off-gray small-text text-decoration">
                      ₹99
                    </span>
                    FREE
                  </>
                </span>
              </div>
            </div>
            <hr className='exp-clutter' />
            <div className="font-bold pb-8 pl-8 pr-8 total-text exp-clutter">
              Total{' '}
              {checkIfSubscriptionCart() && subscriptionData ? (
                <span style={{ color: '#7E7E7E' }}>(per month)</span>
              ) : (
                ''
              )}
              <span className="float-right">
                {checkIfSubscriptionCart() && subscriptionData
                  ? formatPriceWithCurrency(
                    subscriptionData.price
                  )
                  : formatPriceWithCurrency(priceModel.totalPayable)}
              </span>
              {/* {totalCashback > 0 && (
                <div
                  className="text-secondaryDeepGreen font-normal f-13 cashBackText mt-8 pt-8 pl-8 border-top d-flex"
                  style={{
                    borderTopColor: '#E0E0E0',
                    margin: '8px -8px 0 -8px',
                    padding: "8px 8px 0 8px, gap: '4px",
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <span
                    className="float-left mr-4 prime-logo-small"
                    style={{ marginTop: '-1px' }}
                  >
                    {userState.isLoggedIn &&
                      userState.userProfile.prime?.current_status == 'prime' ? (
                      <OZPrimeLogo />
                    ) : (
                      <img
                        alt="CashIcon"
                        src={'https://cdn.shopify.com/s/files/1/2393/2199/files/CashIcon.jpg?v=1705314734'}
                        style={{ width: '24px', display: 'block' }}
                      />
                    )}
                  </span>
                  You earn{' '}
                  <span className="f-14 font-medium">
                    {totalCashback} OZiva Cash
                  </span>{' '}
                  on this order
                  <span className="tooltip" tabIndex={1}>
                    <ToolTipIcon />
                    <span className="tooltiptext">
                      {userState.isLoggedIn &&
                        userState.userProfile.prime?.current_status == 'prime' && (
                          <div>
                            Prime Member Discount:{' '}
                            {Math.floor(Number(priceModel.totalPayable) * 0.15)}
                          </div>
                        )}
                      {(Number(state.discountAndCashResponse.cashback_prime) > 0 ||
                        Number(state.discountAndCashResponse.cashback_non_prime) >
                        0) && (
                          <div>
                            {userState.isLoggedIn &&
                              userState.userProfile.prime?.current_status == 'prime'
                              ? '+'
                              : ''}{' '}
                            {state.discountAndCashResponse.discount_code} Discount:{' '}
                            {userState.isLoggedIn &&
                              userState.userProfile.prime?.current_status == 'prime'
                              ? `${Number(
                                state.discountAndCashResponse.cashback_prime,
                              ) / 100
                              }`
                              : Number(
                                state.discountAndCashResponse.cashback_non_prime,
                              ) / 100}
                          </div>
                        )}
                    </span>
                  </span>
                </div>
              )} */}
            </div>
          </>}
      </div>
    </>
  );
};
export default PriceDetails;
