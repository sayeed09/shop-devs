import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Carousel from "./carousel";
import "./testimonial.scss";
import { SectionHeader } from "../common";
import Flickity from "react-flickity-component";
import { ProductContext } from "../../../context/product";
import { productDetailsModal } from "../../../interface/product";
import ProductModal from "../../product-modal/product-modal";
import { productService } from "../../../services/product";
import { ACV_TESTIMONIALS, flickityOptions, getProductImageLink, PHW_LIFESTYLES, PHW_TESTIMONIALS, TESTIMONIALS } from "./utils";
import { Moengage } from "../../../utils/tracking/gaTracking";
import { GAContext } from "../../../context/gatracking";
import { MixPanelContext } from "../../../context/mixpanelContext";
import { TestimonialModel } from "../../../models/product/productv2";
import { ACVMoringProductID, PHWProductId } from "../../../utils/product/constants";
import { fireFBPixelEvent } from "../../../utils/fbPixelUtils";
const OPTIONS = { axis: 'y', loop: true }


interface Props {
    productDetail: productDetailsModal;
    productId: string;
}
const VideoTestimonials = ({ productDetail, productId }: Props) => {
    const { state: productState } = useContext(ProductContext);
    const [selectedSwiperItem, setSelectedSwiperItem] = useState<number>();
    const [openModal, setOpenModal] = useState(false);
    const gaTrackingEvent = useContext(GAContext);
    const { trackMixpanelEvent } = useContext(MixPanelContext);
    const [isShowLoading, setIsShowLoading] = useState(false);
    const flickityRef = useRef<Flickity | null>(null);
    const [showTestimonial, setShowTestimonial] = useState(false);
    const [flickityRefState, setFlickityRefState] = useState<any>();
    const [testimonials, setTestimonials] = useState<TestimonialModel[]>([]);

    const setFlickityRef = useCallback((ref: Flickity) => {
        flickityRef.current = ref;
        setFlickityRefState(flickityRef)
    }, []);

    useEffect(() => {
        const getTestimonials = (): TestimonialModel[] => {
            if (productId === ACVMoringProductID) return ACV_TESTIMONIALS;

            if (productId === PHWProductId) {
                return (window as any)?.videoTestimonialExpB === 1
                    ? PHW_TESTIMONIALS
                    : PHW_LIFESTYLES;
            }

            return TESTIMONIALS;
        };

        const updateTestimonials = () => {
            setTestimonials(getTestimonials());
            setShowTestimonial((window as any)?.videoTestimonialExp === 1);
        };

        updateTestimonials();

        window.addEventListener("VideoTestimonialExp", updateTestimonials);

        return () => {
            window.removeEventListener("VideoTestimonialExp", updateTestimonials);
        };
    }, []);

    useEffect(() => {
        if (showTestimonial && flickityRefState?.current) {
            setTimeout(() => {
                flickityRefState.current?.resize();
                flickityRefState.current?.reloadCells();
                flickityRefState.current?.reposition();
            }, 1000); // Delay ensures DOM settles before recalculating
        }
    }, [showTestimonial, flickityRefState]);
    const addToCart = (variantId) => {
        setIsShowLoading(true);
        const payload: any = { id: variantId, quantity: 1 };
        productService
            .addItems(payload)
            .then((res) => {
                const increaseCartCount = new CustomEvent("updateCartItemCount", {})
                trackingAPI(res);
                document.dispatchEvent(increaseCartCount)
                setIsShowLoading(false);
                setOpenModal(false);
                redirect()
            })
            .catch((e) => {
                console.log('Product not available', e);
                setIsShowLoading(false);
                setOpenModal(false);
            });
    };
    const trackingAPI = (productDetails) => {
        const selectedVideo = testimonials[selectedSwiperItem as number];

        fireFBPixelEvent({
            event: "AddToCart",
            productId: productDetails.product_id,
            productTitle: productDetails.product_title,
            price: productDetails.price / 100,
            variantId: productDetails.variant_id,
        });
        const eventName = 'add_to_cart';
        const eventAttributes = {
            product_name: productDetails.product_title,
            product_id: productDetails.product_id,
            variant_id: productDetails.variant_id,
            price: productDetails.price / 100,
            quantity: 1,
            video_interaction: true,
            video_name: selectedVideo.name,
        };
        (window as any).Moengage.track_event(eventName, eventAttributes);
        const gaAttributes: any[] = [];
        gaAttributes.push({
            item_id: productDetails.product_id,
            item_name: productDetails.product_title,
            currency: 'INR',
            item_brand: 'OZiva',
            price: productDetails.price / 100,
            quantity: 1,
            video_interaction: true,
            video_name: selectedVideo.name,
        });
        gaTrackingEvent('add_to_cart', { items: gaAttributes });
        trackMixpanelEvent("Product Added", {
            $currency: 'INR',
            $page_title: document.title,
            $brand: "OZiva",
            cart: [{
                "Product Name": productDetails.product_title,
                "Product Price": productDetails.price / 100,
                "Product ID": productDetails.product_id,
                "Variant ID": productDetails.variant_id,
                "Quantity": 1
            }]
        });
    };
    const redirect = () => {
        setTimeout(() => {
            // Done for Analytics events 
            const url = `${window.location.origin}/cart`;
            window.location.href = url;
        }, 200);
    }
    const getProductItem = () => {
        return {
            averageRating: productState.productReview?.averageRating,
            compareAtPrice: productState.productDetails?.compareAtPrice.toString(),
            price: productState.productDetails.price.toString(),
            handle: productDetail.handle,
            title: productDetail.title,
            numberOfReviews: productState.productReview?.numberOfReviews,
            variantId: productState.productDetails.id,
            options: productDetail.options.map((item) => item.name),
            productId: productDetail.id,
            benefitsNew: productDetail.newBenefitChips,
            image: productDetail.images.find((item) => item.id == productState.productDetails.imageId)?.src || "",

        }
    }
    const handleSelectedItem = (item: TestimonialModel) => {
        const index = testimonials.findIndex((testimonial) => testimonial.video === item.video);
        setSelectedSwiperItem(index);

        const eventAttributes = {
            product_name: productDetail.title,
            product_id: productDetail.id,
            variant_id: productState.productDetails.id,
            price: productState.productDetails.price,
            quantity: 1,
            video_name: item.name,
            index: index + 1
        };
        const eventName = 'video_played'
        (window as any).Moengage.track_event(eventName, eventAttributes);
        gaTrackingEvent(eventName, eventAttributes);
    }
    const handleShopNow = (item: TestimonialModel) => {
        const index = testimonials.findIndex((testimonial) => testimonial.video === item.video);
        const eventAttributes = {
            product_name: productDetail.title,
            product_id: productDetail.id,
            variant_id: productState.productDetails.id,
            price: productState.productDetails.price,
            quantity: 1,
            video_name: item.name,
            index: index + 1
        };
        const eventName = 'shop_now_pdp'
        (window as any).Moengage.track_event(eventName, eventAttributes);
        gaTrackingEvent(eventName, eventAttributes);
        setOpenModal(true);
    }
    const onHandleVideoPopupClose = () => {
        setSelectedSwiperItem(undefined);
        setTimeout(() => { flickityRef.current?.select(0); }, 200)
    }
    if (!showTestimonial) return <></>;

    return <section className="video-testimonial-container">

        <div className="video-stories-container">
            <div className="title-A">
                <SectionHeader title={<><strong>Proven Results </strong>from Real People <strong>Like You</strong></>} />
            </div>
            <div className="title-B">
                <SectionHeader title={<>From <strong>Struggles to Success </strong>– Hear Their <strong>Stories</strong></>} />
            </div>
            <div className="title-C">
                <SectionHeader title={<><strong>Verified Stories.</strong>Visible <strong>Results</strong></>} />
            </div>
            <Flickity
                className="carousel carousel-main"
                elementType={'div'}
                options={flickityOptions}
                reloadOnUpdate
                flickityRef={setFlickityRef}
            >
                {testimonials.map((item, index) => <div key={index} className="testimonial-item" onClick={() => handleSelectedItem(item)}>
                    <div className="video-card" >
                        <img className="thumbnail-item-img" src={item.thumbnailImage} />
                        <span className="play-icon">
                            <img width={24} height={24} src="https://cdn.shopify.com/s/files/1/2393/2199/files/play_arrow.svg?v=1747981571" />
                        </span>
                        <div className="thumbnail-img">
                            <img className="item-img" src={getProductImageLink(productState, productDetail)} width={50} height={50} />
                        </div>
                    </div>

                    <div className="title">
                        {item.title}
                    </div>
                </div>)}

            </Flickity>
        </div>

        {selectedSwiperItem != undefined &&
            <div className='fullscreen-modal vide-testimonial-modal'>
                <div className='modal-container'>
                    <Carousel
                        selectedSwiperItem={selectedSwiperItem}
                        setModalVisibility={() => onHandleVideoPopupClose()}
                        testimonials={testimonials}
                        options={OPTIONS}
                        handleShopNow={handleShopNow}
                        productDetail={productDetail}
                    />
                </div>
            </div>

        }


        {openModal && <ProductModal
            setOpenModal={setOpenModal}
            openModal={openModal}
            item={getProductItem()}
            addToCart={addToCart}
            isShowLoading={isShowLoading}
            isFlavourAvailable={productDetail.options.find((item) => item.name == "Flavour") ? true : false}
            isSizeAvailable={productDetail.options.find((item) => item.name == "Size") ? true : false}
        />}


    </section>
}

export default VideoTestimonials;