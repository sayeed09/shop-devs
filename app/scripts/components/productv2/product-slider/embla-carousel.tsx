import React, { useState, useEffect, useCallback, useContext } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductImageModal } from '../../../interface/product';
import { Thumbnail } from './embla-carousel-thumbnail';
import { convertImageSize, maxMobileWidth } from '../../../utils/product/formatter';
import ProductZoom from '../product-zoom';
import { DocumentWidthContext } from '../../../context/documentWidth';
import './product-slider.scss';
import { ProductContext } from '../../../context/product';

type EmblaCarouselProps = {
    imageList: ProductImageModal[];
    options?: EmblaOptionsType;
    noFullscreen?: boolean;
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ imageList, options, noFullscreen }) => {
    const { state: productState } = useContext(ProductContext);
    const documentWidth = useContext(DocumentWidthContext);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPrevDisabled, setPrevDisabled] = useState(true);
    const [isNextDisabled, setNextDisabled] = useState(true);

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });
    useEffect(() => {
        setSelectedIndex(0);
        if (emblaThumbsApi) {
            emblaThumbsApi.scrollTo(0);
        }
        if (emblaMainApi) {
            emblaMainApi.scrollTo(0);
        }
    }, [imageList])

    const handleThumbClick = useCallback(
        (index: number) => {
            if (emblaMainApi) emblaMainApi.scrollTo(index);
        },
        [emblaMainApi]
    );

    const handleSelect = useCallback(() => {
        if (emblaMainApi && emblaThumbsApi) {
            const currentIndex = emblaMainApi.selectedScrollSnap();
            setSelectedIndex(currentIndex);
            setPrevDisabled(!emblaMainApi.canScrollPrev());
            setNextDisabled(!emblaMainApi.canScrollNext());
            emblaThumbsApi.scrollTo(currentIndex);
        }
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (emblaMainApi) {
            handleSelect();
            emblaMainApi.on('select', handleSelect).on('reInit', handleSelect);
        }
        return () => {
            if (emblaMainApi) {
                emblaMainApi.off('select', handleSelect).off('reInit', handleSelect);
            }
        };
    }, [emblaMainApi, handleSelect]);

    const handlePrev = useCallback(() => {
        emblaMainApi?.scrollPrev();
    }, [emblaMainApi]);

    const handleNext = useCallback(() => {
        emblaMainApi?.scrollNext();
    }, [emblaMainApi]);
    return (
        <div className="embla pdp-product-slider position-relative">
            <div className="embla__viewport main-slider" ref={emblaMainRef}>
                <div className="embla__container">
                    {imageList.map((product, index) => (
                        <div className="embla__slide" key={product.id}>
                            {noFullscreen ? (
                                <>
                                    <img
                                        className="carousel-img"
                                        src={convertImageSize(product.src, documentWidth < maxMobileWidth ? 400 : 800, documentWidth < maxMobileWidth ? 400 : 800)}
                                        alt={productState?.productTitle || 'Product image'}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                        loading="lazy"
                                    />
                                </>

                            ) : (
                                <ProductZoom
                                    imageList={imageList}
                                    productTitle={productState?.productTitle || ''}
                                    index={index}
                                    src={convertImageSize(product.src, documentWidth < maxMobileWidth ? 400 : 800, documentWidth < maxMobileWidth ? 400 : 800)}
                                    selectedVariant={productState.productDetails}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="slider-button-container">
                    <button
                        onClick={handlePrev}
                        className={`prev-btn ${isPrevDisabled ? 'is-disabled' : ''}`}
                        disabled={isPrevDisabled}
                    >
                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/left_1.svg?v=17549796257" alt="Previous" />
                    </button>
                    <button
                        onClick={handleNext}
                        className={`next-btn ${isNextDisabled ? 'is-disabled' : ''}`}
                        disabled={isNextDisabled}
                    >
                        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/right_1.svg?v=1754979624" alt="Next" />
                    </button>
                </div>
            </div>

            <div className="embla-thumbs">
                <div className="embla-thumbs__viewport thumb-slider" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {imageList.map((item, index) => (
                            <Thumbnail
                                key={item.id}
                                onClick={() => handleThumbClick(index)}
                                selected={index === selectedIndex}
                                item={item}
                                productTitle={productState?.productTitle || ''}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {selectedIndex + 5 < imageList.length && (
                <p className="images-count">{`+${imageList.length - selectedIndex - 5}`}</p>
            )}
        </div>
    );
};

export default EmblaCarousel;