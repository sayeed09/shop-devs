import React from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import pswpModule from 'photoswipe';
import { ProductImageModal, ProductVariant } from '../../interface/product';
import { isMobile } from '../../utils/helper';
import ProductTagV2 from './product-tag-v2';
interface ProductSliderModal {
    imageList: ProductImageModal[];
    productTitle: string;
    index: number;
    src: string;
    selectedVariant: ProductVariant;
}

const ProductZoom = ({ imageList, productTitle, index, src, selectedVariant }: ProductSliderModal) => {

    const createDataSource = imageList.map(images => {
        return {
            alt: images.alt,
            src: images.src,
            width: 1620,
            height: 1480
        }
    });

    const handleZoom = (index: number) => {
        const lightbox = new PhotoSwipeLightbox({
            dataSource: createDataSource,
            showHideAnimationType: 'none',
            pswpModule: pswpModule,
            zoom: false,
            counter: false,
            bgOpacity: 1,
            mainClass: 'pswp--custom-bg',
        });
        lightbox.init();
        lightbox.on('uiRegister', function () {
            lightbox.pswp.ui.registerElement({
                name: 'close-icon',
                ariaLabel: 'Toggle zoom',
                order: 9,
                isButton: true,
                html: '<img src="https://cdn.shopify.com/s/files/1/2393/2199/files/cancel_icon_svg_1568.svg?v=1735561725" alt="Close Icon" />',
                onClick: () => {
                    lightbox.pswp?.close();
                }
            });
        });
        lightbox.loadAndOpen(index);
    }

    return (
        <>
            <img src={src} alt={productTitle} />
            <div className='gcsk-1568-zoom-icon' onClick={() => handleZoom(index)}>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/expand_b63f8a4b-6858-4c7d-b64e-9705a018539c.png?v=1738309584" alt="Zoom Icon" />
            </div>
        </>
    );
};
export default ProductZoom;