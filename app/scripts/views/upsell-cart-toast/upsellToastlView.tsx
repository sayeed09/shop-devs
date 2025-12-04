import React from 'react';
import { CloseModalIcon } from '../../../icons/closeModalIcon';
import { productService } from '../../services/product';
import { StartEmpty } from '../../../icons/star-empty';
import { StarPartialFilled } from '../../../icons/star-partial-filled-Modal';

import { StarReview } from '../../../icons/star-review';

import { TickIcon } from '../../../icons/tickIcon';
import { CheckedCircle } from '../../../icons/checked-circle';
import { AddCartItemResponse } from '../../models/cart/get-response';

const UpsellModalView = ({
  setIsVisibleUpsell,
  upsellItem,
  setVisibleModal,
  selectedProduct,
  isVisibleUpsell,
  reviewsRating,
  viewReviewStar,
  cartCountNumber,
  setCartCountNumber,
  setSelectedProduct,
}) => {
  const addToCart = () => {
    let variantId: string = upsellItem?.variant_id;
    productService
      .addItem(variantId, 1)
      .then((data: AddCartItemResponse) => {
        setSelectedProduct(data);
        setCartCountNumber(cartCountNumber + 1);
        sessionStorage.setItem('hideUpsellOnPLP', 'yes');
        setIsVisibleUpsell(false);
      })
      .catch(() => {
        console.log('Product not available');
      });
  };


  const renderStarReview = () => {
    return [...Array(Number(5))].map((e, i) => {
      if (i < viewReviewStar?.filled) {
        return (
          <span key={i}>
            <StarReview />
          </span>
        );
      } else if (
        viewReviewStar?.filled == i &&
        viewReviewStar?.partial == 1
      ) {
        return (
          <span key={i}>
            {' '}
            <StarPartialFilled />
          </span>
        );
      } else {
        return (
          <span key={i}>
            <StartEmpty />
          </span>
        );
      }
    })
  };

  return (
    <div id="abs-modal" className="abs-modal show">
      <a
        href="javascript:void(0)"
        className="abs-modal-overlay abs-popup-toggle"
        onClick={() => setVisibleModal(false)}
      ></a>
      <div className="abs-modal-content">
        <a
          href="javascript:void(0)"
          className="close-modal abs-popup-toggle"
          onClick={() => setVisibleModal(false)}
        >
          <CloseModalIcon />
        </a>
        <div className="abs-prod-card-top">
          <div className="abs-prod-card-top-img">
            <img src={selectedProduct?.image} width="66" alt="Product Name" />
          </div>
          <div className="abs-prod-card-top-name">
            <div className="abs-prod-card-top-name-dtl">
              <h3>
                <span style={{ width: '24px' }}>
                  <CheckedCircle />
                </span>
                <span>
                  Added <strong>{selectedProduct?.title}</strong> in your cart
                </span>
              </h3>
            </div>
            <div className="abs-prod-card-top-btn">
              <a href="/cart">GO TO CART ({cartCountNumber})</a>
              <div className="abs-prod-card-top-price">
                Cart Subtotal{' '}
                <strong>₹{(selectedProduct?.original_price || 0) / 100}</strong>
              </div>
            </div>
          </div>
        </div>

        {isVisibleUpsell && (
          <div id="abs-prod-list-section">
            <hr />
            <h2>Add for Better Results</h2>
            <div className="abs-prod-card">
              <div className="abs-prod-card-header">
                <span className="best-seller-badge">Best Sellers</span>{' '}
                {upsellItem?.benefits?.length ? 'in' : ''}
                {upsellItem?.benefits?.map((item, i) => {
                  return (
                    <span key={i}>
                      <TickIcon /> {item}
                    </span>
                  );
                })}
              </div>
              <div className="abs-prod-card-list">
                <div className="abs-prod-card-list-img">
                  <img
                    src={upsellItem?.image}
                    width="100%"
                    alt="Product Name"
                  />
                </div>
                <div className="abs-prod-card-list-dtl">
                  <h5>{upsellItem?.title}</h5>
                  <div className="abs-prod-review">
                    {viewReviewStar && renderStarReview()}{' '}
                    ({reviewsRating?.numberOfReviews})
                  </div>

                  <div className="product-price-dtls">
                    <span className="mrp">MRP:</span>{' '}
                    <span className="strike">
                      ₹{upsellItem?.compare_at_price}
                    </span>{' '}
                    <strong className="prod-price">₹{upsellItem?.price}</strong>{' '}
                    <span className="offer">
                      {(upsellItem?.compare_at_price || 0) -
                        (upsellItem?.price || 0) >
                        0
                        ? '₹' +
                        ((upsellItem?.compare_at_price || 0) -
                          (upsellItem?.price || 0)) +
                        ' off'
                        : ''}{' '}
                    </span>
                  </div>
                  <div className="abs-prod-card-list-btn">
                    <a
                      href="javascript:void(0)"
                      className="abs-card-added"
                      onClick={addToCart}
                    >
                      ADD TO CART
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpsellModalView;
