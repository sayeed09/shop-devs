import React, { useContext, useEffect, useState } from 'react';
import '../../scss/import/offer-nudge.scss'
import { CartContext } from '../../context/cart';
import AnimatedOfferNudgeCTA from './animted-offer-nudge-cta';
import { GAContext } from '../../context/gatracking';
import { CouponRequestModel } from '../../models/cart/freebies';
import { setCartItems, setCashApplied, setDiscountAndCashResponse, setDiscountCode } from '../../actions/cart';
import { formatCartRadiumAPIVariant, getVariantIdsName } from '../../utils/cart/formatter';
import { cartService } from '../../services/cart';
import { getCouponCode, isMobile } from '../../utils/helper';
import { createGACartItemList, getGaEventAttributesCoupon, Moengage } from '../../utils/tracking/gaTracking';
import { AddCartItemResponse, GetCartListResponse, GetCashResponse } from '../../models/cart/get-response';
import { FREEBIES_VARIANT_ID } from '../../utils/cart/constants';
import useCartDetails from '../../hooks/cart';
import Loader from '../../views/cart/loader';
import { getVariantsFromStorage } from '../../utils/build-you-box/helper';
import { formatPrice } from '../../utils/cart/price-formatter';

interface IProps {
    setOpenPopup: (openPopup: boolean) => void;
}
const OfferNudge = ({ setOpenPopup }: IProps) => {
    const [loader, setLoader] = useState(false);


    const { state, dispatch } = useContext(CartContext);
    const gaTrackingEvent = useContext(GAContext);
    const { getCart } = useCartDetails();
    let isCashApplied = sessionStorage.getItem('ozivacash_apply_check');
    const couponText = 'B1G4';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if ((state.discountCode && state.discountCode != 'B1G4') || state.discountCode == "") {
            const isPresent = state.cart.line_items.find((item) => item.variant_id == FREEBIES_VARIANT_ID);
            if (isPresent) {
                let productIdsObject: any = {};
                productIdsObject[FREEBIES_VARIANT_ID] = 0;
                const updateProduct: any = {
                    updates: productIdsObject,
                };
                setIsLoading(true)
                cartService.updateItems(updateProduct).then((data) => {
                    const requestPayload = formatCartRadiumAPIVariant(
                        data,
                        state.discountCode,
                        state.cashApplied,
                    );
                    getCart(requestPayload)
                        .then(() => {
                            setIsLoading(false)
                            return data;
                        })
                });
            }
        }
    }, [state.discountCode]);

    const applyCoupon = (newRequestPayload: CouponRequestModel = { variants: [], discountCode: '' }) => {
        if (
            state?.discountAndCashResponse?.total_discount &&
            state?.discountAndCashResponse?.total_discount > 0
        ) {
            sessionStorage.setItem('ozivacash_apply_check', 'not applied');
            isCashApplied = 'not applied';
            dispatch(setCashApplied(false));
        }


        if (couponText) {
            // if (isCashApplied != 'applied') {
            let requestModel: CouponRequestModel;
            if (newRequestPayload.variants.length > 0) {
                requestModel = newRequestPayload;
            } else {
                const formattedVariantObject = formatCartRadiumAPIVariant(state.cart, couponText, state.cashApplied);
                requestModel = {
                    variants: formattedVariantObject.variants,
                    discountCode: couponText,
                };
            }
            setLoader(true);
            cartService
                .getCartList(requestModel)
                .then((data: any) => {
                    dispatch(setCashApplied(false));
                    const couponCode = getCouponCode(data.discount_code);
                    dispatch(setDiscountCode(couponCode));
                    dispatch(setDiscountAndCashResponse(data));
                    setTimeout(() => {
                        setOpenPopup(true);
                    }, 100);

                    sessionStorage.setItem('coupon_code', couponCode);

                    sessionStorage.setItem('discount_value', data.total_discount);

                    setTimeout(() => {
                        setOpenPopup(false);
                    }, 3000);

                    const string_cart = getVariantIdsName(state.cart.line_items);
                    const event_name = 'apply_offers_from_cart';
                    const event_attributes = {
                        discount_name: data.discount_code,
                        product_name: string_cart.names.toString(),
                        variant_id: string_cart.ids.toString(),
                    };
                    const ga_attributes = getGaEventAttributesCoupon(
                        data.discount_code,
                        createGACartItemList(state.cart.line_items),
                    );

                    const select_promotion_event_name = 'select_promotion';

                    //Hardcoded coupon information
                    const select_promotion_ga_attributes = {
                        creative_name: 'GRAND B1G4',
                        creative_slot: 'ENTITLED',
                        promotion_id: couponText,
                        promotion_name: 'https://www.oziva.in/pages/supersale',
                    }

                    gaTrackingEvent(select_promotion_event_name, select_promotion_ga_attributes);
                    gaTrackingEvent(event_name, ga_attributes);
                    Moengage.track_event(event_name, event_attributes);
                    setLoader(false);
                })
                .catch((error) => {

                    if (error?.response?.data?.error?.errorCode == 'LOGIN_REQUIRED') {
                        setTimeout(() => {
                            window.history.replaceState(null, null, ' ');
                            const event = new Event('handleLogin');
                            document.dispatchEvent(event);
                        }, 100);
                        sessionStorage.setItem('login_coupon_code', couponText);
                        setLoader(false);
                    } else if (
                        error?.response?.data?.error.indexOf('Missing variant') > -1
                    ) {
                        cartService
                            .addItem(+error.response.data.error.split(':')[1].trim(), 1)
                            .then((data: AddCartItemResponse) => {
                                if (data) {
                                    cartService
                                        .getCartItems()
                                        .then((data: GetCartListResponse) => {
                                            let formattedVariantObject = formatCartRadiumAPIVariant(data, couponText, state.cashApplied);
                                            const requestPayload: CouponRequestModel = {
                                                variants: formattedVariantObject.variants,
                                                discountCode: couponText,
                                            };
                                            cartService
                                                ?.getCartList(requestPayload)
                                                .then((res: GetCashResponse) => {
                                                    dispatch(setCartItems(res));
                                                    setLoader(false);
                                                    applyCoupon(requestPayload);
                                                })
                                        });
                                }
                            }).catch(() => {
                                setLoader(false);
                            });
                    } else {
                        setLoader(false);
                    }
                });
            // }
        }
    };
    const priceModel = formatPrice(state);
    const isOfferApplicable = state.offers?.find((item) => item.code == "B1G4");

    if (priceModel.subtotal >= 1599 && isMobile() && getVariantsFromStorage()?.length == 0 && isOfferApplicable) {
        return (
            <>
                {isLoading && <Loader />}

                {
                    state.discountCode && state.discountCode === 'B1G4' ? (
                        <div className='offer-nudge-heading'>
                            <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/B1G4appliedstate_a0d2aa4f-6435-40dd-89f9-57f3c2779c1f.png?v=1764571415' width={"100%"} />
                        </div>
                    ) : (
                        <div className='offer-nudge-container'>
                            <div className='offer-nudge-heading' onClick={() => applyCoupon()}>
                                <div className='offer-nudge-main-heading'>Freebies worth over ₹2,500-{' '}
                                    <span className='offer-nudge-you-pay'>You pay ₹0</span>
                                </div>
                                <AnimatedOfferNudgeCTA loader={loader} />
                            </div>
                            <div className='freebies-product-image-container'>
                                <img src='https://cdn.shopify.com/s/files/1/0897/4644/0489/files/B1G4-_mobile.png?v=1764062390' width={"100%"} className='variant-image-1' />
                            </div>
                        </div>
                    )
                }
            </>
        )
    } else {
        return null;
    }
}

export default OfferNudge;


