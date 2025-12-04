import React, { useEffect, useState, useContext } from 'react';
import ProductDetailRight from './product-details-right';
import ProductSlider from '../../components/product/product-slider';
import { ProductContext } from '../../context/product';
import {
  setProductVariant,
  setSeoData,
  setSelectedOption,
} from '../../actions/product';
import {
  ProductOptionModal,
  SubscriptionData,
  ProductVariant,
  productDetailsModal,
  ProductImageModal,
} from '../../interface/product';
import { getUrlVariantId } from '../../utils/product/formatter';
import { setToLocalStorage } from '../../utils/helper';
import { MixPanelContext } from '../../context/mixpanelContext';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

interface ProductDetailModal {
  productDetail: productDetailsModal;
  productId: string;
  subscriptionState: SubscriptionData;
  setSubscriptionData: (data: SubscriptionData) => void;
  openSubscribeModal: boolean;
  setSubscribeModal: (openSubscribeModal: boolean) => void;
  buySubscription: (variantId: string) => void;
  buyNowVariant: (variantId: string) => void;
  initialScroll: () => void;
  isShowLoading: boolean;
  setBuyButtonLoader: (btnLoader: string) => void;
  buttonLoader: string;
  directSubscriptionCart: boolean;
  isUpsellAvailable?: boolean;
  setIsItemAdded?: (value: boolean) => void;
  isItemAdded?: boolean;
  setIsShowLoading?: (value: boolean) => void;
  isComboProduct?: number | null;
  setIsComboProduct?: (value: number | null) => void;
  comboProductDetails?: productDetailsModal;
}
const ProductDetail = (props: ProductDetailModal) => {
  const { state: productState, dispatch: productDispatch } = useContext(ProductContext);
  const [variantArray, setVariantArray] = useState<ProductVariant[]>([]);
  const { trackMixpanelEvent } = useContext(MixPanelContext);
  const [imageList, setImageList] = useState<ProductImageModal[]>([]);

  useEffect(() => {
    if (props.productDetail) {
      getProductDetails();
      getFirstOption();
    }
  }, [props.productDetail]);

  useEffect(() => {
    if (productState?.productDetails?.id) {
      fireFBPixelEvent({
        event: "ViewContent",
        productId: props.productId,
        productTitle: props.productDetail.title,
        price: productState.productDetails.price,
        variantId: productState.productDetails.id,
      });
    }
  }, [productState?.productDetails?.id])

  useEffect(() => {

    //Image list will be change if the combo product is selected. Combo product image list will be displayed.
    getImageList();
  }, [productState?.productDetails?.id, props.isComboProduct, props.comboProductDetails]);


  const getImageList = () => {
    let productDetails: ProductImageModal[] = [];
    if (props.isComboProduct && props.comboProductDetails) {
      productDetails = props.comboProductDetails.images;
    } else if (productState?.productDetails?.id) {
      productDetails = props.productDetail.images;
    }

    let selectedVariantImages = productDetails?.filter((item) => item.variantIds.indexOf(Number(productState?.productDetails?.id)) > -1);
    let commonImages = productDetails.filter((item) => item.variantIds.length == 0);
    setImageList([...selectedVariantImages, ...commonImages]);
  }

  const getFirstOption = () => {
    let selectedOptions: string[] = [];
    let variantArr = [];
    const UrlVaraintID = getUrlVariantId();
    if (UrlVaraintID) {
      selectedOptions = [];
      variantArr = props.productDetail?.variants?.filter(
        (variantItem: ProductVariant) => variantItem?.visibileOnPdp,
      );
      variantArr?.map((variant: ProductVariant) => {
        if (UrlVaraintID.toString() == variant.id) {
          selectedOptions.push(variant?.option1, variant?.option2);
        }
      });
      if (selectedOptions.length === 0 && variantArr.length > 0) {
        const { option1, option2 } = variantArr[0];
        selectedOptions.push(option1, option2);
      }
      if (selectedOptions.length > 0)
        productDispatch(setSelectedOption(selectedOptions));
    } else {
      defultSelectFirstProduct();
    }
    try {
      const getSelectedVariant: ProductVariant[] =
        props.productDetail?.variants?.filter(
          (variant: ProductVariant) =>
            variant?.option1 === selectedOptions[0] &&
            variant?.option2 === selectedOptions[1],
        );
      const imageURL: ProductImageModal[] =
        getSelectedVariant &&
        props.productDetail.images.filter(
          (image: ProductImageModal) =>
            image.id === getSelectedVariant[0]?.imageId,
        );
    } catch (error) {
      console.log('Admitad script error', error);
    }

    // Need to remove this function from inside the function and create some service for this method.
    function defultSelectFirstProduct() {
      const allVariants = props.productDetail.variants;
      const { option1, option2 } = allVariants[0];
      selectedOptions.push(option1, option2);
      if (selectedOptions.length > 0)
        productDispatch(setSelectedOption(selectedOptions));
    }
  };
  const getProductDetails = () => {
    setToLocalStorage('ProductID', props.productDetail?.id);
    const variantArr = props.productDetail?.variants?.filter(
      (variantItem: ProductVariant) => variantItem?.visibileOnPdp,
    );
    setVariantArray(variantArr);
    productDispatch(setProductVariant(variantArr));
    productDispatch(setSeoData(props.productDetail?.footer));
    trackMixpanelEvent("Product Viewed", {
      $currency: 'INR',
      $page_title: document.title,
      $brand: "OZiva",
      cart: [{
        "Product Name": props.productDetail?.title,
        "Product ID": props.productDetail?.id,
      }]
    });
  };

  return (
    <>
      <section className="product-dtl-sec mb-16">
        <div className="container" style={{ minHeight: '100vh' }}>
          <div className="row pr-16">
            {!props.directSubscriptionCart && (
              <div className="col product-slider" style={{ minHeight: '360px' }}>
                <ProductSlider
                  imageList={imageList}
                  sellingFastAndTimerNudge={props.productDetail?.sellingFastAndTimerNudge}
                />
              </div>
            )}

            <ProductDetailRight
              productId={props.productId}
              productDetail={props.productDetail}
              variantArray={variantArray}
              setVariantArray={setVariantArray}
              subscriptionState={props.subscriptionState}
              setSubscriptionData={props.setSubscriptionData}
              openSubscribeModal={props.openSubscribeModal}
              setSubscribeModal={props.setSubscribeModal}
              buySubscription={props.buySubscription}
              buyNowVariant={props.buyNowVariant}
              isShowLoading={props.isShowLoading}
              setBuyButtonLoader={props.setBuyButtonLoader}
              buttonLoader={props.buttonLoader}
              initialScroll={props.initialScroll}
              directSubscriptionCart={props.directSubscriptionCart}
              isUpsellAvailable={props.isUpsellAvailable}
              imageArray={props.productDetail?.images}
              setIsItemAdded={props.setIsItemAdded}
              isItemAdded={props.isItemAdded}
              setIsShowLoading={props.setIsShowLoading}
              isComboProduct={props.isComboProduct}
              setIsComboProduct={props?.setIsComboProduct}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
