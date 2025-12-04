import React, { useContext, useEffect, useState } from "react";
import { productService } from "../../services/product";
import { ACVMoringProductID, getENVSpecificPrimeItemId, SamplingProductID } from "../../utils/product/constants";
import { ProductResponseModal } from "../../interface/product";
import { cartService } from "../../services/cart";
import { AddCartItemResponse, GetCartListResponse } from "../../models/cart/get-response";
import { formatCartRadiumAPIVariant, getCartAPIPayload } from "../../utils/cart/formatter";
import { CouponRequestModel } from "../../models/cart/freebies";
import { CartContext } from "../../context/cart";
import useCartDetails from "../../hooks/cart";
import { setInitialCartLoading } from "../../actions/cart";

const SamplingItem = () => {
  const { state, dispatch } = useContext(CartContext);
  const { getCart } = useCartDetails();
  const [isLoading, setLoading] = useState(false);

  const [productData, setProductData] = useState<ProductResponseModal>();
  useEffect(() => {
    productService
      .getProductDetails(SamplingProductID, 'cart', false, false)
      .then((data: ProductResponseModal) => {
        setProductData(data);
      });
  }, []);

  useEffect(() => {
    const getSamplingId = state.cart.line_items.find((item) => item.product_id == SamplingProductID);
    if (getSamplingId && state.cart.line_items.length == 2 && state.cart.line_items.some((item) => item.product_id == getENVSpecificPrimeItemId)) {
      updateQuantity(0)
    }
    if (getSamplingId && state.cart.line_items.length == 1 && state.cart.line_items.some((item) => item.product_id == SamplingProductID)) {
      updateQuantity(0)
    }
  }, [state.cart])

  const updateQuantity = (quantity) => {
    const getSamplingId = state.cart.line_items.find((item) => item.product_id == SamplingProductID);
    if (!getSamplingId) {
      return;
    }
    dispatch(setInitialCartLoading(true));
    let productIdsObject = {};
    setLoading(true);
    const cartData = Object.assign({}, state.cart);
    if (quantity === 0) {
      //remove item from cart
      cartData.line_items = cartData?.line_items?.filter(
        (item) => item.variant_id !== getSamplingId.variant_id,
      );
      productIdsObject[getSamplingId.variant_id] = quantity;

      const updateProduct: any = {
        updates: productIdsObject,
      };
      cartService.updateItems(updateProduct).then((data) => {
        const requestPayload = formatCartRadiumAPIVariant(
          data,
          state.discountCode,
          state.cashApplied,
        );

        getCart(requestPayload)
          .then(() => {
            setLoading(false);
            return data;
          })
          .catch(() => {
            setLoading(false);
          });
      });
    };
  }

  const addItem = (variantId) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    cartService
      .addItem(Number(variantId), 1)
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
  if (state.cart.line_items.length == 1 && state.cart.line_items.some((item) => item.product_id == getENVSpecificPrimeItemId)) {
    return <></>
  }
  if (state.cart.line_items.length > 0 && state.cart.line_items.some((item) => item.product_id == ACVMoringProductID)) {
    return <></>
  }
  if (!productData?.data?.variants || productData?.data?.variants.length === 0) return <></>;

  if (state.cart.line_items.some((item) => item.product_id == SamplingProductID)) return <></>;

  if (productData?.data?.variants && productData?.data?.variants.length > 0 && productData?.data?.variants[0].inventoryQuantity == 0) return <></>;

  return <>
    <div className="sampling-product-card">
      <div className="sampling-header">Try at just ₹{productData?.data?.variants[0].price}</div>
      <div className="sampling-product">
        <div className="sampling-product-image">
          {productData && <img src={productData?.data?.images[0].src} />}
        </div>
        <div className="sampling-product-details">
          {productData && <span className="sampling-product-title">{productData?.data?.title}</span>}
          <div className="sampling-product-price">
            <div className="productPriceDetails">
              <span className="priceMRP">MRP:</span>
              {productData && (productData?.data?.variants[0].compareAtPrice - productData?.data?.variants[0].price > 0) &&
                <del className="priceMRP">₹{productData && productData?.data?.variants[0].compareAtPrice}</del>}
              <span className="actualPrice">₹{productData && productData?.data?.variants[0].price}</span>
              {productData && (productData?.data?.variants[0].compareAtPrice - productData?.data?.variants[0].price > 10) ?
                <>|<span style={{ color: '#f04e23', fontSize: '13px' }}>₹{productData?.data?.variants[0].compareAtPrice - productData?.data?.variants[0].price} Off</span></> : ''}
            </div>
          </div>
        </div>
        <div className="sampling-product-atc">
          <button style={isLoading ? { opacity: 0.5 } : {}} onClick={() => addItem(productData?.data?.variants[0].id)}>ADD NOW</button>
        </div>
      </div>
    </div>
  </>
}

export default SamplingItem;