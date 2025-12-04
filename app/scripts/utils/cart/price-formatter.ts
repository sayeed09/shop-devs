import { ICartState } from '../../interface/cart';
import { PriceModel } from '../../models/cart/get-response';

const DELIVERY_CHARGES = 4900;
const MIN_PRICE_FOR_FREE_DELIVERY = 39900;

export const INCENTIVE_DISCOUNT = 0.05;
export const formatPrice = (state: ICartState) => {
  let priceModel: PriceModel;
  if (state.discountAndCashResponse.line_items.length > 0) {
    // this when cash/offer applied
    priceModel = {
      cashDiscount: state.cashApplied
        ? state.discountAndCashResponse.total_discount / 100
        : 0,
      deliveryCharges: getCODCharges(state),
      shippingCharges: state.discountAndCashResponse.shipping_charges / 100,
      incentiveDiscount: getIncentive(state),
      discount: state.discountAndCashResponse.total_discount / 100,
      subtotal:
        (state.discountAndCashResponse.order_subtotal -
          state.discountAndCashResponse.shipping_charges) /
        100,
      orderTotal: state.cart.order_total_mrp / 100,
    };
  } else {
    priceModel = {
      cashDiscount: 0,
      deliveryCharges: getCODCharges(state),
      shippingCharges: state.cart.shipping_charges / 100,
      incentiveDiscount: getIncentive(state),
      discount: state.cart.total_discount / 100,
      subtotal: state.cart.order_subtotal / 100,
      orderTotal: state.cart.order_total_mrp / 100,
    };
  }
  priceModel.freebiesDiscount = getFreebiesDiscount(state);
  priceModel.discount = state.discountAndCashResponse.discount_code?.includes(
    '_freebies',
  )
    ? priceModel.discount - priceModel.freebiesDiscount
    : priceModel.discount;
  priceModel.totalPayable = getTotalPayable(priceModel);
  return priceModel;
};

const getCODCharges = (state: ICartState) => {
  // const deliveryCharges = 0;
  // no charge only if prime is present
  // if (
  //   state.cart.items.length == 1 &&
  //   state.cart.items.some((item) => item.variant_id === getPrimeVariantId())
  // ) {
  //   return deliveryCharges;
  // }
  // if (state.discountAndCashResponse.line_items.length > 0) {
  //   deliveryCharges = state.discountAndCashResponse.shipping_charges;
  // } else {
  //   if (state.cart.items_subtotal_price < MIN_PRICE_FOR_FREE_DELIVERY) {
  //     deliveryCharges = DELIVERY_CHARGES;
  //   }
  // }
  return 99;
};

const getIncentive = (state: ICartState) => {
  let paymentIncentive = 0;
  if (state.discountAndCashResponse.line_items.length > 0) {
    paymentIncentive =
      (state.discountAndCashResponse.order_subtotal -
        state.discountAndCashResponse.total_discount) /
      100;
  } else {
    paymentIncentive =
      state.cart.order_subtotal / 100 + getCODCharges(state);
  }
  paymentIncentive = !state.discountAndCashResponse.discount_code?.includes(
    '_freebies',
  )
    ? paymentIncentive - getFreebiesDiscount(state)
    : paymentIncentive;
  paymentIncentive = paymentIncentive * INCENTIVE_DISCOUNT;
  paymentIncentive = matchPaymentIncentive(paymentIncentive);
  return Math.round(paymentIncentive);
};

const getTotalPayable = (priceModel: PriceModel) => {
  const totalPayable =
    priceModel.subtotal -
    priceModel.discount -
    priceModel.freebiesDiscount

  return totalPayable;
};

const getFreebiesDiscount = (state: ICartState) => {
  let freebiesDiscount = 0;
  state.selectedFreebies.forEach(
    (freebie) => (freebiesDiscount = freebiesDiscount + freebie.price),
  );
  return freebiesDiscount / 100;
};

const matchPaymentIncentive = (paymentIncentive: number) => {
  // Not a good way to match the figures of cart and checkout page in case of values like 22.5 etc
  const decimalValue = Number(paymentIncentive % 1).toFixed(2);
  if (+decimalValue === 0.5) {
    paymentIncentive = paymentIncentive - 0.1;
  }
  return paymentIncentive;
};