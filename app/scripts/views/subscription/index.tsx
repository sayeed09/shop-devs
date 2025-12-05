import React, { useContext, useEffect, useState } from 'react';
import '../../scss/oziva-site.scss';
import ProductDetail from '../product/product-detail';
import { ProductIdDataType, productDetailsModal } from '../../interface/product';
import {
  Provider as ProductProvider,
} from '../../context/product';
import { GAContext, Provider as GAProvider } from '../../context/gatracking';
import { Provider as DocumentWidthProvider } from '../../context/documentWidth';
import { productService } from '../../services/product';
import { initialScroll } from '../../utils/product/formatter';
import {
  SubscriptionData,
  ProductResponseModal,
} from '../../interface/product';
import { Moengage } from '../../utils/tracking/gaTracking';
import { SentryProvider } from '../../context/errorTracking';

const SubscriptionView = (props: ProductIdDataType) => {
  const [subscriptionState, setSubscriptionData] = useState<SubscriptionData>();
  const [openSubscribeModal, setSubscribeModal] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [productDetail, setProductDetails] = useState<productDetailsModal>();
  const [buttonLoader, setBuyButtonLoader] = useState('');
  const gaTrackingEvent = useContext(GAContext);

  useEffect(() => {
    getProductDetails();
    document.addEventListener(
      'showSubscriptionForm',
      function (e: any) {
        window.location.hash = 'SubscribeCart';
      },
      false,
    );
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', hashHandler, false);
  }, [openSubscribeModal]);
  const hashHandler = () => {
    if (window.location.hash.indexOf('PurchaseOptions') == 1) {
      setSubscribeModal(true);
    }
  };

  const getProductDetails = () => {
    const UrlParams = new URLSearchParams(window.location.search);
    const tofOfFunnel = UrlParams.get('topOfFunnel') == 'true' ? true : false;
    productService
      .getProductDetails(props.productId, 'pdp', true, tofOfFunnel)
      .then((data: ProductResponseModal) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.log('Get product details error', error);
      });
  };
  const buySubscription = (variantId: string) => {
    productService
      .getSubscription(variantId)
      .then((data: SubscriptionData) => {
        if (data?.data?.subscribable == true) {
          setSubscriptionData(data);
        } else {
          setSubscriptionData(data);
        }
      })
      .catch((error) => {
        console.log('Buy subscription plan error', error);
      });
  };
  const buyNowVariant = (variantId: string) => {
    if(!productDetail?.title){
      return 
    }
    window.location.hash = 'PurchaseOptions';
    gaTrackingEvent('atc1', {
      product_name: productDetail.title,
      product_id: props.productId.toString(),
    });
    setIsShowLoading(true);
    if (subscriptionState?.data?.subscribable) {
      setSubscribeModal(true);
      const event_name = 'view_subscribe_save';
      const event_attributes = {
        product_name: productDetail.title,
        product_id: props.productId.toString(),
      };
      (window as any).Moengage.track_event(event_name, event_attributes);
      setIsShowLoading(false);
    }
  };
  return (
    <>
      <SentryProvider>
        <GAProvider>
          <DocumentWidthProvider>
            <ProductProvider>
              <div className="oziva-body">
                <div className="oziva-mob-container">
                  <main className="oziva-pdp-content-area oziva-pdp-web">
                    <ProductDetail
                      productId={props.productId}
                      subscriptionState={subscriptionState}
                      setSubscriptionData={setSubscriptionData}
                      openSubscribeModal={openSubscribeModal}
                      setSubscribeModal={setSubscribeModal}
                      buyNowVariant={buyNowVariant}
                      initialScroll={initialScroll}
                      buySubscription={buySubscription}
                      isShowLoading={isShowLoading}
                      productDetail={productDetail}
                      setBuyButtonLoader={setBuyButtonLoader}
                      buttonLoader={buttonLoader}
                      directSubscriptionCart={true}
                    />
                  </main>
                </div>
              </div>
            </ProductProvider>
          </DocumentWidthProvider>
        </GAProvider>
      </SentryProvider>
    </>
  );
};
export default SubscriptionView;
