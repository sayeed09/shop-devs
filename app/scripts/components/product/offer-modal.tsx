import React, { useContext, useState } from 'react';
import { OzivaFab } from '../../../icons/oziva-fab';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { RightArrowIcon } from '../../../icons/right-arrow';
import { VisibilityResponse } from '../../interface/product';
import { copyToClipboard } from '../../utils/helper';
import { GAContext } from '../../context/gatracking';
import { ButtonLoader } from '../../../icons/button-loader';
import FilledCheckbox from '../../../icons/filled-checkbox';
import { ProductContext } from '../../context/product';

interface OfferModalInterface {
  item: VisibilityResponse;
  setShowOfferModal: (showOfferModal: boolean) => void;
  initialScroll: () => void;
  handleApplyCoupon?: () => void;
  loading?: boolean;
  cartTotal?: number;
  checkIfButtonDisabled?: (minSubtotal: number) => boolean;
}
const OfferModal = (props: OfferModalInterface) => {
  const couponCode = sessionStorage.getItem('coupon_code') ? sessionStorage.getItem('coupon_code') : null; // GCSK-1701
  const item = props;
  const [toggleListing, setToggleListing] = useState(false);

  return (
    <div
      data-ml-modal
      id="applied-coupon-code"
      className="applied-coupon-code target-modal"
    >
      <div
        className="modal-overlay"
        onClick={() => {
          props.setShowOfferModal(false), props.initialScroll();
        }}
      ></div>

      <div className="modal-dialog position-relative">
        <span
          className="close-modal cursor-pointer"
          onClick={() => {
            props.setShowOfferModal(false), props.initialScroll();
          }}
        >
          <ProductModalCloseIcon />
        </span>
        <div className="modal-content center">
          {couponCode == props.item.code ? <div className='coupon-card-applied'><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/success_icon_svg.svg?v=1755607973" alt="Checkbox" />APPLIED</div> : !props.loading ? (<button className={`copy-coupon coupon-card-apply-btn ${props.checkIfButtonDisabled && props.checkIfButtonDisabled(props.item.minSubtotal) ? 'coupon-card-apply-btn-disabled' : ''}`} onClick={() => {
            if (props.handleApplyCoupon) {
              props.handleApplyCoupon();
            }
          }} disabled={props.checkIfButtonDisabled && props.checkIfButtonDisabled(props.item.minSubtotal)} >
            APPLY
          </button>) : <div className="copy-coupon coupon-card-apply-btn">
            <ButtonLoader />
          </div>}
          <div className="popup-tag product-offers-sec-col border bg-primaryGreenSG200 border-primaryGreen mb-16 p-4">
            <div className="clearfix offer-use-sec-bottom-tic pr-4">
              <span className="float-left ml-4 mr-8 d-flex">
                <OzivaFab />
              </span>
              <span className="font-upercase text-primaryGreen" id="copy-text">
                {item.item.code}
              </span>
            </div>
          </div>

          <h4 className='offer-modal-description'>{item.item.description}</h4>
          <p className="text-off-gray f-m-12">Apply at cart</p>
          {item.item.listing.length > 0 && item.item.listing.length < 11 && (
            <>
              <hr className="mb-8" />
            </>
          )}
          <p className="text-off-gray mb-8 subtitle-small">
            <a
              href="#"
              onClick={() => setToggleListing(!toggleListing)}
              className={`offer-list-prod-toggle ${toggleListing ? 'open-listing' : ''
                }`}
            >
              {item.item.validOn}
              {item.item.listing.length > 0 && item.item.listing.length < 11 && (
                <>
                  {' '}
                  <span>
                    <RightArrowIcon />
                  </span>
                </>
              )}
            </a>
          </p>
          {item.item.listing.length > 0 && item.item.listing.length < 11 && (
            <>
              <div className={`${toggleListing ? 'show' : 'hide'}`}>
                <hr className="mt-8 mb-16" />
                <ul className="offers-prod-list">
                  {item.item.listing.map((productName) => (
                    <li>{productName}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OfferModal;
