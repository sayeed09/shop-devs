import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Loader from '../../../views/cart/loader'
import { TestimonialModel } from '../../../models/product/productv2';
import { ProductContext } from '../../../context/product';
import { productDetailsModal } from '../../../interface/product';
import { formatPriceWithCurrency } from '../../../utils/cart/formatter';
import { getProductImageLink } from './utils';

interface Props {
    handleShopNow: (item: TestimonialModel) => void;
    selectedSwiperItem: number;
    setModalVisibility: () => void;
    testimonials: TestimonialModel[];
    options: any;
    productDetail: productDetailsModal;
}
const Carousel = (props: Props) => {
    const { testimonials, options,
        productDetail, selectedSwiperItem,
        handleShopNow, setModalVisibility } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [loadedStates, setLoadedStates] = useState(
        Array(testimonials.length).fill(false)
    )
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isMuted, setIsMuted] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [volumeIconOnVideo, setVolumeIcon] = useState(false);
    const { state: productState } = useContext(ProductContext);

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCurrentSlide(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.scrollTo(selectedSwiperItem, true)
        emblaApi.on('select', onSelect);
        // Initial set
        setCurrentSlide(emblaApi.selectedScrollSnap())

        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    const handleVideoLoaded = (index: number) => {
        setLoadedStates(prev =>
            prev.map((item, indx) =>
                indx === index ? true : item
            )
        );
    }
    const toggleMute = (index, onVideoClick = false) => {
        videoRefs.current.forEach((video: any, indx) => {
            if (!isMuted && index == indx) {
                if (video) {
                    video.muted = false;
                }
            } else {
                if (video) {
                    video.muted = true;
                }
            }

        })
        setIsMuted(prev => !prev);
        if (onVideoClick) {
            setVolumeIcon(true);
            setTimeout(() => {
                setVolumeIcon(false);
            }, 2000)
        }
    }
    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {testimonials.map((item, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                {!loadedStates[index] && (
                                    <Loader />
                                )}
                                <div className='top-shadow'></div>
                                <video
                                    onClick={() => toggleMute(index, true)}
                                    muted={currentSlide == index && !isMuted ? false : true}
                                    ref={el => videoRefs.current[index] = el}
                                    onLoadedData={() => handleVideoLoaded(index)}
                                    style={{ display: loadedStates[index] ? 'block' : 'none' }}
                                    playsInline preload="metadata" autoPlay={true} loop>
                                    <source src={item.video} type="video/mp4"></source>
                                </video>
                                <div onClick={() => setModalVisibility()} className='cancel-icon'>
                                    <img width={20} height={20} src='https://cdn.shopify.com/s/files/1/2393/2199/files/cancel_icon_svg_24_98dfee51-a008-49e1-8488-e22d1e19a8bc.svg?v=1747656893' />
                                </div>
                                {loadedStates[index] && <>
                                    {volumeIconOnVideo &&
                                        <div className='volume-btn video-btn'>
                                            <img width={20} height={20} src={isMuted ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/mdi_volume-mute.svg?v=1747656892' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/mdi_volume-high.svg?v=1747656893'} />
                                        </div>
                                    }

                                    <div onClick={() => toggleMute(index)} className='volume-btn'>
                                        <img width={20} height={20} src={isMuted ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/mdi_volume-mute.svg?v=1747656892' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/mdi_volume-high.svg?v=1747656893'} />
                                    </div>
                                    <div className='footer-bottom-section'>
                                        <div className='thumbnail-img'>
                                            <img src={getProductImageLink(productState, productDetail)} />
                                        </div>
                                        <div className='pricing-container'>
                                            <div className='title'>{productDetail.title}</div>
                                            <div className='pricing'>
                                                <span className='mrp'>MRP</span>
                                                {productState.productDetails?.compareAtPrice -
                                                    productState.productDetails?.price >
                                                    0 && <del>{formatPriceWithCurrency(productState.productDetails?.compareAtPrice)}</del>}
                                                <span className='selling-price'>{formatPriceWithCurrency(productState.productDetails?.price)}</span>

                                            </div>
                                            {productState.productDetails?.compareAtPrice -
                                                productState.productDetails?.price >
                                                0 &&
                                                <div className='save'>
                                                    You save: {formatPriceWithCurrency(productState.productDetails?.compareAtPrice - productState.productDetails?.price)}
                                                </div>
                                            }
                                        </div>

                                        <button onClick={() => handleShopNow(item)} className='cta-button'>SHOP NOW</button>
                                    </div>
                                </>}


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Carousel
