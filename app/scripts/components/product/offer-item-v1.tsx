import React, { useContext, useEffect, useState } from 'react';
import { VisibilityResponse } from '../../interface/product';
import { hideScroll } from '../../utils/product/formatter';
import { GAContext } from '../../context/gatracking';
import '../../scss/import/_offer-item-v1.scss'
import OfferModal from './offer-modal';
import { productService } from '../../services/product';
import { ButtonLoader } from '../../../icons/button-loader';
import { cartService } from '../../services/cart';
import { GetCartListResponse } from '../../models/cart/get-response';
import { ProductContext } from '../../context/product';
import { OzivaFab } from '../../../icons/oziva-fab';
import { Moengage } from '../../utils/tracking/gaTracking';
import '../../scss/import/_offer-item-v1.scss'


interface OfferItemModal {
  item: VisibilityResponse;
  initialScroll: () => void;
}

const OfferItemV1 = (props: OfferItemModal) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferApplied, setShowOfferApplied] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const gaTrackingEvent = useContext(GAContext);
  const { state: ProductState } = useContext(ProductContext);
  const openOfferModal = () => {
    setShowOfferModal(!showOfferModal)
    hideScroll()
    window.location.hash = 'applied-coupon-code';
    gaTrackingEvent('view_offers', { source: 'PDP', offer_code: props.item?.code });
  }

  const handleApplyCoupon = () => {
    setLoading(true);

    const event_name = 'apply_coupon_pdp';
    const event_attributes = {
      source: 'PDP', offer_code: props.item?.code
    };
    gaTrackingEvent('apply_coupon_pdp', { source: 'PDP', offer_code: props.item?.code });
    Moengage.track_event(event_name, event_attributes);
    if (ProductState && ProductState?.productDetails?.id) {
      const payload: any = { id: ProductState?.productDetails?.id, quantity: 1 };
      productService
        .addItems(payload)
        .then((res) => {
          sessionStorage.setItem("coupon_code", props.item.code);
          sessionStorage.setItem("showConfetti", String(true));
          sessionStorage.setItem('ozivacash_apply_check', 'not applied');
          setLoading(false);
          window.location.href = '/cart';
        })
        .catch((e) => {
          console.log('Product not available', e);
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    setShowOfferApplied(sessionStorage.getItem('coupon_code'));

    cartService.getCartItems()
      .then((data: GetCartListResponse) => {
        if (data && data.total_price) {
          setCartTotal(data.total_price / 100);
        }
      });
  }, []);

  const checkIfButtonDisabled = (minSubtotal: number) => {
    if (cartTotal === 0) {
      return ProductState?.productDetails?.price < minSubtotal;
    } 
    return cartTotal + ProductState?.productDetails?.price <= minSubtotal;
  };

  return (
    <>
      <div className="coupon-card">

        <div className='coupon-card-background'></div>
        <div></div>
        <div className='coupon-card-container'>
          <div className='coupon-card-top'>
            {props?.item?.imageSrc && <img src={props?.item?.imageSrc} alt={`Offer Product - ${props?.item.code}`} className='coupon-card-product-image' />}
            <div className='coupon-card-product-text'>
              <div className='coupon-card-title'>{props.item.description}</div>
              <div className='coupon-card-description'>{props.item.validOn}</div>
              <div onClick={() => openOfferModal()} className='coupon-details'>View Details</div>
            </div>
          </div>
          <div className='coupon-card-bottom'>
            <div className="popup-tag product-offers-sec-col border bg-primaryGreenSG200 border-primaryGreen p-4">
              <div className="clearfix offer-use-sec-bottom-tic pr-4">
                <span className="float-left ml-4 mr-8 d-flex">
                  <OzivaFab />
                </span>
                <span className="font-upercase text-primaryGreen" id="copy-text">
                  {props.item.code}
                </span>
              </div>
            </div>
            {
              showOfferApplied === props.item.code ? <div className={`coupon-card-applied`}><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/success_icon_svg.svg?v=1755607973" alt="Checkbox" />APPLIED</div> : (
                !loading ? (<button className={`coupon-card-apply-btn ${checkIfButtonDisabled(props.item.minSubtotal) ? 'coupon-card-apply-btn-disabled' : ''}`} onClick={() => handleApplyCoupon()} disabled={checkIfButtonDisabled(props.item.minSubtotal)}>
                  APPLY
                </button>) : <div className="coupon-card-apply-btn">
                  <ButtonLoader />
                </div>
              )
            }
          </div>
        </div>
        <div></div>
      </div>
      {showOfferModal && (
        <OfferModal
          item={props.item}
          setShowOfferModal={setShowOfferModal}
          initialScroll={props.initialScroll}
          handleApplyCoupon={handleApplyCoupon}
          loading={loading}
          cartTotal={cartTotal}
          checkIfButtonDisabled={checkIfButtonDisabled}
        />
      )}
    </>

  );
};
export default OfferItemV1;
