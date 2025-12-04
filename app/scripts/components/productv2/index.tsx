import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../context/product';
import {
    setProductVariant,
    setSeoData,
    setSelectedOption,
} from '../../actions/product';
import {
    SubscriptionData,
    ProductVariant,
    productDetailsModal,
    ProductImageModal,
} from '../../interface/product';
import { getUrlVariantId } from '../../utils/product/formatter';
import { isMobile, setToLocalStorage } from '../../utils/helper';
import { MixPanelContext } from '../../context/mixpanelContext';
import ProductDetailRight from './product-details-right';
import '../../scss/import/_productv2.scss';
import ProductSlider from './product-slider';
import { INewBenefit } from '../../models/home';
import { ClinicalStudy, TitleAndReview } from './title-review';
import { GAContext } from '../../context/gatracking';
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
    getAdditionalProductDetails: (productId: string) => void;
}
const ProductV2 = (props: ProductDetailModal) => {
    const { state: productState, dispatch: productDispatch } = useContext(ProductContext);
    const gaTrackingEvent = useContext(GAContext);

    const [variantArray, setVariantArray] = useState<ProductVariant[]>([]);
    const { trackMixpanelEvent, mixpanelExp } = useContext(MixPanelContext);
    const [imageList, setImageList] = useState<ProductImageModal[]>([]);
    const [isComboVariantSelected, setIsComboVariantSelected] = useState(false);


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
        if (props.productDetail) {
            getProductDetails();
            getFirstOption();
        }

    }, [props.productDetail]);

    useEffect(() => {
        if (productState?.productDetails?.id) {
            getImageList();
        }
    }, [productState?.productDetails?.id]);

    useEffect(() => {
        const selectedVariantId = productState?.productDetails?.id;
        if (!selectedVariantId) return;

        const { variants } = props.productDetail;
        const comboVariants = variants.filter(variant => variant.placeholderProduct);

        if (comboVariants.length === 0) return;

        const selectedVariant = variants.find(variant => variant.id === selectedVariantId);

        if (selectedVariant?.placeholderProduct) {
            props.getAdditionalProductDetails(selectedVariant.placeholderProduct);
            setIsComboVariantSelected(true);
        } else if (isComboVariantSelected) {
            props.getAdditionalProductDetails(props.productId);
            setIsComboVariantSelected(false);
        }


    }, [productState?.productDetails?.id]);

    const getImageList = () => {
        let productDetails: ProductImageModal[] = [];

        if (productState?.productDetails?.id) {
            productDetails = props.productDetail.images;
        }
        let selectedVariantImages = productDetails?.filter((item) => item.variantIds.indexOf(Number(productState?.productDetails?.id)) > -1);
        let commonImages = productDetails.filter((item) => item.variantIds.length == 0);
        setImageList([...selectedVariantImages, ...commonImages]);

    }

    useEffect(() => {
        if (mixpanelExp) {
            // trackMixpanelEvent("$experiment_started", {
            //     'Variant name': mixpanelExp,
            //     'Experiment name': 'UDS-676 - PDP First fold results'
            // });
            trackMixpanelEvent("Experience Viewed", {
                variant: mixpanelExp
            });
            gaTrackingEvent('experience_viewed', { variant: mixpanelExp })

        }

    }, [mixpanelExp])

    const getFirstOption = () => {
        let selectedOptions: string[] = [];
        let variantArr: ProductVariant[] = [];
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
            <section className={`product-dtl-sec mb-16 ${mixpanelExp === "variant_1" ? 'mixpanel-exp-1' :
                mixpanelExp === "variant_2" ? 'mixpanel-exp-2' : ''}`}>
                <div className="container">
                    <div className="row pr-16">
                        <TitleAndReview
                            productId={props.productId}
                            reviewsRating={productState.productReview}
                            newBenefitChips={props.productDetail.newBenefitChips as INewBenefit}
                            title={productState.productTitle}
                            expTitle={props.productDetail?.title}
                        />
                        {!props.directSubscriptionCart && (
                            <div className="col product-slider" style={{ minHeight: '360px' }}>
                                <div className={mixpanelExp != "variant_1" && mixpanelExp != "variant_2" ? '' : 'd-none'}>
                                    <ClinicalStudy clinicalStudies={props.productDetail.clinicalStudies} />
                                </div>

                                <ProductSlider
                                    imageList={imageList}
                                    sellingFastAndTimerNudge={props.productDetail?.sellingFastAndTimerNudge}
                                />

                            </div>
                        )}
                        {/* sale banner  */}
                        {isMobile() &&
                            <img className='pt-16' src="https://cdn.shopify.com/s/files/1/2393/2199/files/B1G4-final.png?v=1762338125" />}
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
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
export default ProductV2;
