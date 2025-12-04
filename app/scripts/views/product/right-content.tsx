import React, { useContext } from 'react';
import { ButtonLoader } from '../../../icons/button-loader';
import { DocumentWidthContext } from '../../context/documentWidth';
import { GAContext } from '../../context/gatracking';
import { IProductState, productDetailsModal, UserLoginValue } from '../../interface/product';
import {
  convertImageSize,
  getAccessToken,
  maxMobileWidth,
} from '../../utils/product/formatter';
import { getOZParameterWRTQueryParam } from '../../utils/common-functions';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';

interface ProductRightContectModal {
  productState: IProductState;
  buyNowVariant: (variantId: string) => void;
  isShowLoading: boolean;
  setBuyButtonLoader: (btnLoader: string) => void;
  buttonLoader: string;
  isItemAdded: boolean;
  productDetail: productDetailsModal
}

const ProductRightContent = (props: ProductRightContectModal) => {
  const documentWidth = useContext(DocumentWidthContext);
  const gaTrackingEvent = useContext(GAContext);

  const { productState, productDetail } = props;
  if (!productState.productDetails) return null;

  const handleClick = () => {
    if (props.isItemAdded) {
      setTimeout(() => {
        const url = `${window.location.origin}/cart`;
        window.location.href = url;
      }, 200);
    } else {
      gaTrackingEvent('atc1', {
        product_name: productState.productDetails.title,
        product_id: productState.productDetails.id,
      });
      props.buyNowVariant(productState.productDetails?.id),
        props.setBuyButtonLoader('bottomButton')
    }
  };

  return (
    <div className="col-auto page-content-right-sec pl-0 pb-16">
      <div className="product-sticky-page">
        <div className="bg-white text-center oz-product-img">
          <img
            src={
              productState?.selectedImage === null && productDetail.variants[0].imageId === null ? productDetail.images[0].src :
                documentWidth < maxMobileWidth
                  ? convertImageSize(productState?.selectedImage?.src, 50, 50) :
                  convertImageSize(productState?.selectedImage?.src, 100, 100)
            }
            alt="Product Name"
            className="w-100"
            height="100%"
          />
        </div>
        <div>
          <span className="font-normal h3">{productState.productTitle}</span>
          <p>
            {productState.productDetails?.price !=
              productState.productDetails?.compareAtPrice && (
                <span className="text-off-gray">
                  <span>MRP:</span>{' '}
                  <span className="text-decoration">
                    {formatPriceWithCurrency(productState.productDetails?.compareAtPrice)}
                  </span>
                </span>
              )}
            <span className="f-14">{formatPriceWithCurrency(productState.productDetails?.price)}</span>
          </p>
          {productState.productDetails?.compareAtPrice -
            productState.productDetails?.price >
            0 && (
              <p className="text-primaryPahadiCitrus subtitle-small font-medium">
                You Save :
                {formatPriceWithCurrency(productState.productDetails?.compareAtPrice -
                  productState.productDetails?.price)}
              </p>
            )}
          {productState.productAllVariant.filter(
            (item) => item.inventoryQuantity > 0,
          ).length > 0 && (
            <div className="mt-16">
              {props.isShowLoading && props.buttonLoader == 'bottomButton' ? (
                <div
                  className="btn btn-primary d-block text-center"
                  style={{ height: '41.8px', padding: '6px' }}
                >
                  <ButtonLoader />
                </div>
              ) : (
                <a
                  // href="#PurchaseOptions"
                  className="btn btn-primary d-block text-center"
                  onClick={() => handleClick()}
                  style={
                    getOZParameterWRTQueryParam() === '2'
                      ? { padding: '11.5px 10.5px' }
                      : {}
                  }
                >
                  {getOZParameterWRTQueryParam() === '2'
                    ? !props.isItemAdded
                      ? `ADD TO CART - ${formatPriceWithCurrency(productState.productDetails?.price)}`
                      : `GO TO CART`
                    : `BUY NOW - ${formatPriceWithCurrency(productState.productDetails?.price)}`}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductRightContent;
