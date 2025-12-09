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

const RightStickyCard = (props: ProductRightContectModal) => {
  const documentWidth = useContext(DocumentWidthContext);
  const gaTrackingEvent = useContext(GAContext);

  const { productState, productDetail } = props;
  if (!productState.productDetails) return null;

  const handleClick = () => {
    if (props.isItemAdded) {
      setTimeout(() => {
        const url = `${window.location.origin}/cart?`;
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
                  convertImageSize(productState?.selectedImage?.src, 300, 300)
            }
            alt={productState?.productTitle}
            className="w-100"
            height="100%"
          />

        </div>
      </div>
    </div >
  );
};
export default RightStickyCard;
