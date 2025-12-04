import React, { useContext, useEffect, useState } from 'react';
import '../../scss/oziva-site.scss';
import '../../scss/import/product-common.scss';

import {
    productDetailsModal,
    ProductIdDataType,
} from '../../interface/product';
import { Provider as ProductProvider } from '../../context/product';
import { GAContext } from '../../context/gatracking';
import { MixPanelContext } from '../../context/mixpanelContext';
import { Provider as DocumentWidthProvider } from '../../context/documentWidth';
import { Provider as UserContext } from '../../context/user';
import { productService } from '../../services/product';
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
import SkeletonPdp, { SectionSkeleton } from '../../components/loaders/skeleton-pdp';
import { cartService } from '../../services/cart';
import ProductV2 from '../../components/productv2';
import ProductBottomSectionV2 from "../../components/productv2/product-bottom-section";
import FooterSeo from '../product/footer-seo';
import { FIRST_FOLD_SECTIONS, SECOND_FOLD_SECTIONS } from '../../utils/productv2/provider';
import MobileFooter from '../../components/productv2/mobile-footer';
import DesktopFooter from '../../components/productv2/desktop-footer';
import { isMobile, mutationObserver } from '../../utils/helper';
import MircroInteraction from '../../components/productv2/micro-interaction';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';



const ProductV2View = (props: ProductIdDataType) => {
    const [subscriptionState, setSubscriptionData] = useState<SubscriptionData>();
    const [openSubscribeModal, setSubscribeModal] = useState(false);
    const [isShowLoading, setIsShowLoading] = useState(false);
    const [productDetail, setProductDetails] = useState<productDetailsModal>();
    const [buttonLoader, setBuyButtonLoader] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUpsellAvailable, setIsUpsellAvailable] = useState<boolean>(false);
    const [isItemAdded, setIsItemAdded] = useState<boolean>(false);
    const [additionalDataFetched, setAdditionalDataFetched] = useState(false);
    const { trackMixpanelEvent } = useContext(MixPanelContext);
    const gaTrackingEvent = useContext(GAContext);

    useEffect(() => {
        // handleStickyButton();
        mutationObserver();
        getProductDetails(props.productId);
    }, []);
    useEffect(() => {
        window.addEventListener('hashchange', hashHandler, false);
    }, [openSubscribeModal]);

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
            .getProductDetailsV2(productId, FIRST_FOLD_SECTIONS.toString(), true, tofOfFunnel)
            .then((data: ProductResponseModal) => {
                getAdditionalProductDetails(productId);
                setProductDetails(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Get product details error', error);
            });
    };

    const getAdditionalProductDetails = (productId: string) => {
        const UrlParams = new URLSearchParams(window.location.search);
        const tofOfFunnel = UrlParams.get('topOfFunnel') == 'true' ? true : false;
        const fetchCombo = props.productId == productId ? false : true;
        productService
            .getProductDetailsV2(productId, SECOND_FOLD_SECTIONS.toString(), true, tofOfFunnel)
            .then((data: ProductResponseModal) => {
                if (fetchCombo) {
                    setProductDetails(productDetail => (
                        {
                            ...productDetail as productDetailsModal,
                            sections: data.data.sections,
                            faq: data.data.faq,
                        }
                    ));
                } else {
                    setProductDetails(productDetail => ({
                        ...productDetail,
                        ...data.data
                    }));
                    setAdditionalDataFetched(true);
                }

            })
            .catch((error) => {
                console.log('Get product details error', error);
            });
    }

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
            Moengage.track_event(event_name, event_attributes);
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

            Moengage.track_event(event_name, {
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
                        // Done for Analytics events 
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
        return <SkeletonPdp
            productImage={props.productImage}
            loadingImage={props.loadingImage}
            loadingText={props.loadingText} />;
    }

    return (
        <>
            <SentryProvider>
                <UserContext>
                    <DocumentWidthProvider>
                        <ProductProvider>
                            <div className="oziva-body product-container-v2">
                                <div className="oziva-mob-container">
                                    <main className="oziva-pdp-content-area oziva-pdp-web">
                                        <ProductV2
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
                                            getAdditionalProductDetails={getAdditionalProductDetails}
                                        />
                                        <ProductBottomSectionV2
                                            productId={props.productId}
                                            buyNowVariant={buyNowVariant}
                                            isShowLoading={isShowLoading}
                                            setBuyButtonLoader={setBuyButtonLoader}
                                            buttonLoader={buttonLoader}
                                            initialScroll={initialScroll}
                                            productDetail={productDetail as productDetailsModal}
                                            isItemAdded={isItemAdded}
                                            isLoading={isLoading}
                                        />
                                        {!additionalDataFetched && <SectionSkeleton />}
                                        <MircroInteraction />
                                        <FooterSeo />
                                        {isMobile() ?
                                            <MobileFooter
                                                productId={props.productId}
                                                buyNowVariant={buyNowVariant}
                                                isShowLoading={isShowLoading}
                                                productDetail={productDetail as productDetailsModal}
                                                isUpsellAvailable={isUpsellAvailable}
                                                setIsItemAdded={setIsItemAdded}
                                                isItemAdded={isItemAdded}
                                                setSubscribeModal={setSubscribeModal}
                                            /> :
                                            <DesktopFooter
                                                productId={props.productId}
                                                buyNowVariant={buyNowVariant}
                                                isShowLoading={isShowLoading}
                                                productDetail={productDetail as productDetailsModal}
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
            </SentryProvider >
        </>
    );
};
export default ProductV2View;
