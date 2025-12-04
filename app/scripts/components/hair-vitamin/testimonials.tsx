import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Flickity from 'react-flickity-component';
import { TestimonialItems } from '../../models/hair-vitamin';
import TestimonialsBubbles from './testimonials-bubble';
import { StarFilled } from '../../../icons/star-filled';
import { isMobile } from '../../utils/helper';
import UserIcon from '../../../icons/user-icons';
import { IProductReviewObject, IProductReviewsResponse, productDetailsModal, ProductResponseModal, SubscriptionData, SubscriptionDataRes } from '../../interface/product';
import { formatPriceWithCurrency } from '../../utils/cart/formatter'
import { HVProductId } from '../../utils/product/constants';
import { initialScroll } from '../../utils/product/formatter';
import PurchaseModal from '../product/purchase-modal';
import { ProductContext } from '../../context/product';
import { productService } from '../../services/product';
import { setProductModel } from '../../actions/product';
import { ResponsiveImage } from '../productCard/responsive-image';
import { productCardBreakPoints } from '../../utils/data-provider';
import { remainingProductsInStock, resizeImage } from '../../utils/common-functions';
import FooterNudge from '../productv2/footer-nudge';

interface IProps {
    testimonials: TestimonialItems[];
    productDetails: productDetailsModal | undefined;
    setProductDetails: React.Dispatch<React.SetStateAction<productDetailsModal | undefined>>;
}

const FlickityCardOptions = {
    initialIndex: 2,
    pageDots: false,
    prevNextButtons: false,
    groupCells: 1,
    adaptiveHeight: true,
    wrapAround: true,
    lazyLoad: true
};

const Testimonials = ({ testimonials, productDetails, setProductDetails }: IProps) => {
    const [selectedBubble, setSelectedBubble] = useState(2);
    const [showDesc, setShowDesc] = useState(false);
    const [containerHeight, setContainerHeight] = useState('auto');
    // const [productDetails, setProductDetails] = useState<productDetailsModal>();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionDataRes | undefined>();
    const [subscribeModal, setSubscribeModal] = useState<boolean>(false);
    const [productLeftCount, setProductLeftCount] = useState(0);
    const flickityRef = useRef<Flickity | null>(null);
    const [productReview, setProductReview] = useState<IProductReviewObject>();

    const { dispatch: productDispatch } =
        useContext(ProductContext);

    const setFlickityRef = useCallback((ref: Flickity) => {
        flickityRef.current = ref;
        flickityRef.current?.on("change", handleBubbleClick);
    }, []);

    const handleBubbleClick = (index: number) => {
        setSelectedBubble(index);
        setShowDesc(false);
        if (flickityRef.current) {
            flickityRef.current.select(index, true, true);
        }
    }
    const updateHeight = () => {
        if (flickityRef.current) {
            const activeSlide = flickityRef.current.selectedElement as any;
            if (activeSlide) {
                const height = activeSlide.offsetHeight;
                setContainerHeight(`${isMobile() ? height : height}px`);
            }
        }
    };

    useEffect(() => {
        if (flickityRef.current) {
            flickityRef.current.on('change', updateHeight);
            updateHeight();
        }

        return () => {
            if (flickityRef.current) {
                flickityRef.current.off('change', updateHeight);
            }
        };
    }, [showDesc]);

    const testimonialsTextLimit = isMobile() ? 192 : 492;
    const testimonialsDescriptionLength = (text: string) => {
        if (isMobile()) return text.length > 192;
        else return text.length > 492;
    };

    useEffect(() => {
        productService.getProductDetails(HVProductId, 'pdp', true, false)
            .then((data: ProductResponseModal) => {
                setProductDetails(data.data);
                productDispatch(setProductModel(data.data.variants[0]));
                buySubscription(data.data.variants[0].id);
                setProductLeftCount(remainingProductsInStock(data.data.id));
                getReviews(data.data.id)
            })
    }, []);

    const buySubscription = (variantId: string) => {
        productService
            .getSubscription(variantId)
            .then((data: SubscriptionData) => {
                if (data?.data?.subscribable == true) {
                    setSubscriptionData(data.data);
                } else {
                    setSubscriptionData(data.data);
                }
            })
            .catch((error) => {
                console.log('Buy subscription plan error', error);
            });
    };

    const handleBuyNow = () => {
        if (!subscriptionData?.subscribable) {
            const variantId = productDetails?.variants[0].id;
            const payload: any = { id: variantId, quantity: 1 };
            productService
                .addItems(payload)
                .then((res) => {
                    window.location.href = '/cart'
                })
                .catch((e) => {
                    console.log('Product not available', e);
                });
        } else {
            setSubscribeModal(true);
        }
    }
    const getReviews = (productId) => {
        const payload = { ids: [productId] };
        // Here we are sending only productId in payload for particular Product.
        productService
            .getStarReviewDetails(payload)
            .then((response: IProductReviewsResponse) => {
                if (response?.data?.product?.length) {
                    setProductReview(response?.data?.product[0])
                }
            })
            .catch((error) => {
                console.log('Get star review error', error);
            });
    };
    return (
        <div className='testimonials-container'>
            <div className='testimonials-header-container'>
                <div className='testimonials-header'>Trusted By <br /><span>24000+ Verified Consumers & Counting!</span></div>
            </div>

            {testimonials && testimonials.length > 0 ? <TestimonialsBubbles testimonialList={testimonials} handleBubbleClick={handleBubbleClick} selectedBubble={selectedBubble} setFlickityRef={setFlickityRef} /> : null}

            {testimonials && testimonials.length > 0 ? <div className="press_container" style={{ height: containerHeight }}>
                <Flickity
                    className="press_carousel press_carousel-main"
                    elementType={'div'}
                    options={FlickityCardOptions}
                    flickityRef={setFlickityRef}
                >
                    {
                        testimonials.map((testimonials) => {
                            return (
                                <>
                                    <div className='testimonials-item-container' key={testimonials.id}>
                                        {
                                            isMobile() && <div className='testimonials-title'>
                                                {testimonials.name}
                                            </div>
                                        }
                                        <div className='testimonials-item'>
                                            <div className='testimonials-item-image'>
                                                {/* <ResponsiveImage altText={testimonials.name} imageURL={testimonials.image} widthHeightObject={productCardBreakPoints} /> */}
                                                <img alt={testimonials.name} src={resizeImage(testimonials.image, '500x500')} />
                                            </div>

                                            <div className='testimonials-content'>
                                                <div className='testimonials-item-content'>
                                                    <div className='testimonials-item-heading'>
                                                        <div className='testimonials-item-heading-name'>{testimonials.name}</div>
                                                        <div className='testimonials-item-heading-description'>{testimonials.title}</div>
                                                        <div className='benefit-container'>
                                                            {productDetails?.benefits.map((item) => <span className='benefit-item'>
                                                                <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Tick_mark.svg?v=1733403333' />
                                                                {item}</span>)}
                                                        </div>
                                                    </div>
                                                    <div className='testimonials-item-description'>
                                                        {
                                                            testimonialsDescriptionLength(testimonials?.description) ? !showDesc ? (
                                                                <>
                                                                    {testimonials?.description.slice(0, testimonialsTextLimit)}{'...'}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {testimonials?.description}
                                                                </>
                                                            ) : testimonials?.description
                                                        }
                                                    </div>

                                                </div>
                                                <div className='testimonials-item-footer'>
                                                    <div className='testimonials-item-rating'>
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                        <StarFilled />
                                                    </div>
                                                    {
                                                        testimonialsDescriptionLength(testimonials?.description) && <button
                                                            onClick={() => setShowDesc(!showDesc)}
                                                            className='testimonials-read-more-button'
                                                        >
                                                            {showDesc ? 'READ LESS' : 'READ MORE'}
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </Flickity>
            </div> : null}
            {productDetails && productDetails.id && (<div className='sticky-button'>
                <div className='sticky-button-header'>
                    <FooterNudge productLeftCount={productLeftCount} />
                </div>

                <div className='sticky-footer-container'>
                    {/* <div className='sticky-button-pricing'>
                        <div>
                            <span style={{ color: '#7E7E7E' }} className='mrp-text'>MRP:{'  '}</span>
                            <span className='sticky-button-mrp'>
                                {formatPriceWithCurrency(productDetails?.variants[0]?.compareAtPrice)}
                            </span>
                            <span className='sticky-button-selling-price'>
                                {formatPriceWithCurrency(productDetails?.variants[0]?.price)}
                            </span>
                        </div>

                    </div>

                    <div>
                        <button className='sticky-button-buy-now-btn' onClick={() => handleBuyNow()}>
                            BUY NOW
                        </button>
                    </div> */}
                    <div className='thumb-container'>
                        <img className='thubmnail-img' src='https://cdn.shopify.com/s/files/1/2393/2199/files/1copy4.jpg?v=1714041044' />
                        <span className='rating-text'>{productReview?.averageRating}</span>
                        <div className="rating-icon rating-filled-icon" />
                    </div>

                    <div>
                        <button className='btn' onClick={() => handleBuyNow()}>
                            <span className='mrp-text'>MRP: <span className='strike-text'>{formatPriceWithCurrency(productDetails?.variants[0]?.compareAtPrice)}</span> </span>
                            <span className='price'>{formatPriceWithCurrency(productDetails?.variants[0]?.price)}</span>
                            <span className='line' />
                            <span className='save-text'>Save:{formatPriceWithCurrency(productDetails?.variants[0]?.compareAtPrice - (productDetails?.variants[0]?.price))}</span>
                            <span className='buynow-text'>BUY NOW</span>
                        </button>
                    </div>
                </div>
            </div>)}
            {
                subscriptionData?.subscribable ? (subscribeModal && (
                    <PurchaseModal
                        productId={HVProductId}
                        subScriptionData={subscriptionData}
                        setSubscribeModal={setSubscribeModal}
                        initialScroll={initialScroll}
                        productDetail={productDetails}
                        isItemAdded={false}
                        setIsItemAdded={() => console.log("Item added")}
                        hvVariantId={productDetails?.variants[0].id}
                        title={productDetails?.title}
                    />
                )) : null
            }
        </div>
    )
}

export default Testimonials