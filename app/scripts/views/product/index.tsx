import React, { useContext, useEffect, useState } from 'react';
import '../../scss/oziva-site.scss';
import '../../scss/import/product-common.scss';
import ProductBottomSection from './product-bottom';
import ProductDetail from './product-detail';
import MobileFooter from './mobile-footer';
import {
  productDetailsModal,
  ProductIdDataType,
} from '../../interface/product';
import { Provider as ProductProvider } from '../../context/product';
import { MixPanelContext } from '../../context/mixpanelContext';
import { Provider as DocumentWidthProvider } from '../../context/documentWidth';
import { Provider as UserContext } from '../../context/user';
import { productService } from '../../services/product';
import FooterSeo from './footer-seo';
import { GetCartListResponse, GetUpsellResponse } from '../../models/cart/get-response';
import { initialScroll, getVariantIds } from '../../utils/product/formatter';
import {
  SubscriptionData,
  ProductResponseModal,
} from '../../interface/product';
import {
  cleanPriceString,
  Moengage,
} from '../../utils/tracking/gaTracking';
import { SentryProvider } from '../../context/errorTracking';
import SkeletonPdp from '../../components/loaders/skeleton-pdp';
import TabSection from './tabSection';
import { cartService } from '../../services/cart';

import { GAContext } from '../../context/gatracking';
import DesktopFooter from '../../components/productv2/desktop-footer';
import { isMobile } from '../../utils/helper';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';

const ProductView = (props: ProductIdDataType) => {
  const [subscriptionState, setSubscriptionData] = useState<SubscriptionData>();
  const [openSubscribeModal, setSubscribeModal] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [productDetail, setProductDetails] = useState<productDetailsModal>();
  const [comboProductDetails, setComboProductDetails] = useState<productDetailsModal>();
  const [buttonLoader, setBuyButtonLoader] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpsellAvailable, setIsUpsellAvailable] = useState<boolean>(false);
  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);
  const [isComboProduct, setIsComboProduct] = useState<number | null>();
  const [showSnakBar, setShowSnakbar] = useState(false);
  const gaTrackingEvent = useContext(GAContext);

  const { trackMixpanelEvent } = useContext(MixPanelContext);


  useEffect(() => {
    getProductDetails(props.productId);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', hashHandler, false);
  }, [openSubscribeModal]);

  useEffect(() => {
    if (isComboProduct) {
      getProductDetails(isComboProduct);
    }
  }, [isComboProduct]);
  const hashHandler = () => {
    if (window.location.hash.indexOf('PurchaseOptions') == 1) {
      setSubscribeModal(true);
    } else if (
      window.location.hash.indexOf('PurchaseOptions') == -1 &&
      window.location.hash.indexOf('SubscribeCart') == -1 &&
      window.location.hash.indexOf('SubscriptionCheckout') == -1
    ) {
      setSubscribeModal(false);
    }
  };
  const getProductDetails = (productId?: any) => {
    const UrlParams = new URLSearchParams(window.location.search);
    const tofOfFunnel = UrlParams.get('topOfFunnel') == 'true' ? true : false;
    productService
      .getProductDetails(productId, 'pdp', true, tofOfFunnel)
      .then((data: ProductResponseModal) => {
        //This is done for the combo product additional details. If variant is the combination of two products, then additional details should be display of both the products. (Ref. tik GCSK-1381) 
        if (isComboProduct) {
          setComboProductDetails(data.data);
        } else {
          setProductDetails(data.data);
        }
        const getPlaceholderProductId = data.data.variants.find(variant => variant.id === UrlParams.get('variant'))?.placeholderProduct;
        if (getPlaceholderProductId) {
          setIsComboProduct(Number(getPlaceholderProductId));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Get product details error', error);
      });
  };

  const buySubscription = (variantId: string) => {
    productService
      .getSubscription(variantId)
      .then((data: SubscriptionData) => {
        setIsShowLoading(false);
        if (data?.data?.subscribable == true) {
          setSubscriptionData(data);
        } else {
          setSubscriptionData(data);
        }
      })
      .catch((error) => {
        setIsShowLoading(false);
        console.log('Buy subscription plan error', error);
      });
  };
  const buyNowVariant = (variantId: string) => {
    setIsShowLoading(true);
    if (subscriptionState?.data?.subscribable) {
      window.location.hash = 'PurchaseOptions';
      setSubscribeModal(true);
      const event_name = 'view_subscribe_save';
      const event_attributes = {
        product_name: productDetail?.title,
        product_id: props.productId.toString(),
      };
      (window as any).Moengage.track_event(event_name, event_attributes);
      setIsShowLoading(false);
    } else {
      let selectedVariant = productDetail?.variants.filter((item) => {
        return item.id == variantId;
      });
      fireFBPixelEvent({
        event: "AddToCart",
        productId: productDetail?.id.toString() as string,
        productTitle: productDetail?.title as string,
        price: Number(selectedVariant && selectedVariant[0]?.price),
        variantId: selectedVariant && selectedVariant[0]?.id.toString(),
      });
      const event_name = 'add_to_cart';

      (window as any).Moengage.track_event(event_name, {
        product_name: productDetail?.title,
        product_id: productDetail?.id.toString(),
        price: cleanPriceString(selectedVariant[0]?.price),
        variant_id: selectedVariant[0]?.id.toString(),
      });
      const gaAttributes = [];
      const item = {
        item_id: productDetail?.id,
        item_name: productDetail?.title,
        currency: 'INR',
        item_brand: 'OZiva',
        item_variant: selectedVariant[0]?.title,
        price: cleanPriceString(selectedVariant[0]?.price),
        quantity: 1,
      };
      gaAttributes.push(item);
      gaTrackingEvent(event_name, { items: gaAttributes });
      trackMixpanelEvent("Product Added", {
        $currency: 'INR',
        $page_title: document.title,
        $brand: "OZiva",
        cart: [{
          "Product Name": productDetail?.title,
          "Product Price": selectedVariant[0]?.price,
          "Product ID": productDetail?.id,
          "Variant ID": selectedVariant[0]?.id,
          "Quantity": 1
        }]
      });
      productService
        .addItem(variantId, 1)
        .then((data: GetCartListResponse) => {
          setTimeout(() => {
            const url = `${window.location.origin}/cart`;
            window.location.href = url;
          }, 200);
        })
        .catch((error) => {
          setIsShowLoading(false);
          console.log('Buy now variant error', error);
        });
    }
  };

  useEffect(() => {
    if (productDetail) {
      getUpsellData();
    }
  }, [productDetail]);
  const getUpsellData = () => {
    cartService
      .getUpsellList(getVariantIds(productDetail))
      .then((data: GetUpsellResponse[]) => {
        if (data.length > 0) {
          setIsUpsellAvailable(true);
        }
      })
      .catch((error) => {
        setIsUpsellAvailable(false);
        console.log('Get upsell data error', error);
      });
  };
  if (isLoading || productDetail?.variants?.length == 0) {
    return <SkeletonPdp productImage={props.productImage} />;
  }

  const currentProductDetails = comboProductDetails && isComboProduct ? comboProductDetails as productDetailsModal : productDetail as productDetailsModal

  return (
    <>
      <SentryProvider>
        <UserContext>
          <DocumentWidthProvider>
            <ProductProvider>
              <div className={`oziva-body`}>
                <div className="oziva-mob-container">
                  <main className="oziva-pdp-content-area oziva-pdp-web">
                    <ProductDetail
                      productId={props.productId}
                      subscriptionState={subscriptionState as SubscriptionData}
                      openSubscribeModal={openSubscribeModal}
                      setSubscribeModal={setSubscribeModal}
                      setSubscriptionData={setSubscriptionData}
                      buyNowVariant={buyNowVariant}
                      initialScroll={initialScroll}
                      buySubscription={buySubscription}
                      isShowLoading={isShowLoading}
                      productDetail={productDetail as productDetailsModal}
                      setBuyButtonLoader={setBuyButtonLoader}
                      buttonLoader={buttonLoader}
                      directSubscriptionCart={false}
                      isUpsellAvailable={isUpsellAvailable}
                      setIsItemAdded={setIsItemAdded}
                      isItemAdded={isItemAdded}
                      setIsShowLoading={setIsShowLoading}
                      setIsComboProduct={setIsComboProduct}
                      isComboProduct={isComboProduct}
                      comboProductDetails={comboProductDetails}
                    />
                    <ProductBottomSection
                      productId={props.productId}
                      buyNowVariant={buyNowVariant}
                      isShowLoading={isShowLoading}
                      setBuyButtonLoader={setBuyButtonLoader}
                      buttonLoader={buttonLoader}
                      initialScroll={initialScroll}
                      productDetail={currentProductDetails}
                      isItemAdded={isItemAdded}
                      isLoading={isLoading}
                    />
                    {currentProductDetails?.verifiedResults.data && currentProductDetails?.verifiedResults.data.length > 1 && (
                      <div className="container page-content-sec">
                        <div className='row'>
                          <div className='col page-content-left-sec clearfix'>
                            <div className='product-left-sec'>
                              <p className="mb-8 h2 fw-bold">{currentProductDetails.verifiedResults.title}</p>
                              <picture>
                                <source
                                  media="(min-width: 491px)"
                                  srcSet={currentProductDetails.verifiedResults.data[0].image}
                                />
                                <source
                                  media="(max-width: 490px)"
                                  srcSet={currentProductDetails.verifiedResults.data[1].image}
                                />
                                <img
                                  className="lazyload banner-image-click d-block"
                                  style={{ width: "100%", borderRadius: 6 }}
                                  alt="Verified Results"
                                />
                              </picture>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <TabSection
                      productId={props.productId}
                      productDetail={currentProductDetails}
                      setShowSnakbar={setShowSnakbar}
                    />
                    <FooterSeo />
                    {isMobile() ?
                      <MobileFooter
                        productId={props.productId}
                        buyNowVariant={buyNowVariant}
                        isShowLoading={isShowLoading}
                        productDetail={currentProductDetails}
                        isUpsellAvailable={isUpsellAvailable}
                        setIsItemAdded={setIsItemAdded}
                        isItemAdded={isItemAdded}
                        setSubscribeModal={setSubscribeModal}
                      /> :
                      <DesktopFooter
                        productId={props.productId}
                        buyNowVariant={buyNowVariant}
                        isShowLoading={isShowLoading}
                        productDetail={currentProductDetails}
                        setIsItemAdded={setIsItemAdded}
                        isItemAdded={isItemAdded}
                        setSubscribeModal={setSubscribeModal}
                      />
                    }
                  </main>
                </div>
              </div>
            </ProductProvider>
          </DocumentWidthProvider>
        </UserContext>
      </SentryProvider>
    </>
  );
};
export default ProductView;
