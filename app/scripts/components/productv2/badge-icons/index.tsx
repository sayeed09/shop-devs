import React, { useEffect, useState } from 'react';
import { DeliveryTruckFooterIcon } from '../../../../icons/delivery-truck-footer';
import { EasyReturnsFooterIcon } from '../../../../icons/easy-returns-footer';
import { ProductModalCloseIcon } from '../../../../icons/product-modal-close';
import { SecureIcon } from '../../../../icons/secure-icon';
import { hideScroll, initialScroll } from '../../../utils/product/formatter';
import Flickity from 'react-flickity-component';
import 'flickity-fullscreen';
import { cartGoogleReviews } from '../../../utils/cart/constants';
import { generateRatedStarYellow } from '../google-reviews/ratings-review';

export const ICONS = [
    {
        title: <>
            <span>Potent Plant</span>
            <span>Extracts</span>
        </>,
        description: '',
        icon: <><img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Plant_Based_fc43f992-708e-4ceb-8351-09a6bd9d51c4.png?v=1731055107' />
        </>
    },
    {
        title: <>
            <span>No Side</span>
            <span>Effects</span>
        </>,
        description: '',
        icon: <><img src='https://cdn.shopify.com/s/files/1/2393/2199/files/No_Side_Effects_07e53ea8-02a0-4ab5-9956-70d847b5178e.png?v=1731055107' />
        </>
    },
    {
        title: <>
            <span>Fast</span>
            <span>Delivery</span>
        </>,
        description: '',
        icon: <> <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Free_Shipping_884d30f6-49aa-4ee3-9ed7-2635a021aa1f.png?v=1731055107' />
        </>
    },
    {
        title: <>
            <span>Secure</span>
            <span>Payments</span>
        </>,
        description: '',
        icon: <> <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/Secure_Payments_ca26cd42-afed-457a-91ee-a6304c3ea1d6.png?v=1731055464' />
        </>
    }
];

export const GoogleReviewflickityOptions = {
    prevNextButtons: false,
    contain: true,
    pageDots: true,
    groupCells: 1,
    cellAlign: 'left'
};

export const Variant3 = ({ rerenderCarousel }: { rerenderCarousel: boolean }) => {
    const [isCarouselRerender, setIsCarouselRerender] = useState<boolean>(false);

    useEffect(() => {
        if (rerenderCarousel) {
            setIsCarouselRerender(!isCarouselRerender);
        }
    }, [rerenderCarousel]);
    return (
        <>
            <div className='footer-icons-v3'>
                <div className='cart-google-reviews-header'>
                    <div className='title'>We are Trusted by Millions!</div>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/google-icon-logo_1.svg?v=1723620685" className='google-logo' />
                    <img src="https://cdn.shopify.com/s/files/1/0366/1004/8044/files/filled_star.svg?v=1724055254" className='rated-star' />
                    <div>4.7 stars</div>
                </div>

                <div className='cart-google-reviews-container'>
                    <div className='cart-google-reviews-list'>
                        <Flickity
                            className="carousel carousel-main"
                            elementType={'div'}
                            options={GoogleReviewflickityOptions}
                            reloadOnUpdate
                        >
                            {cartGoogleReviews.map((item) => {
                                return (
                                    <div key={item.reviewer} className="cart-google-review-item">
                                        <div className='reviewer-image'>
                                            <img src={item.image} alt={item.reviewer} />
                                        </div>

                                        <div className='review-details'>
                                            <div className='review-heading'>
                                                <div className='reviewer'>
                                                    {item.reviewer}
                                                </div>
                                                <div className='timeago'>
                                                    {item.timeAgo}
                                                </div>
                                            </div>
                                            <div className='cart-review-item-stars'>
                                                {generateRatedStarYellow(5)}
                                            </div>
                                            <div className='review'>{item.review}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Flickity>
                    </div>
                </div>
            </div>
        </>
    )
}

const BadgeIcons = ({ v1, className }: { v1?: boolean, className?: string }) => {
    const [modalContent, setModalContent] = useState<{
        title: React.JSX.Element,
        description: string,
        icon: React.JSX.Element
    }>();
    const [rerenderCarousel, setRerenderCarousel] = useState(false);
    const iconList = ICONS;
    const pathname = window.location.pathname;

    // Experiment UDS-523

    const handleRerenderCarousel = () => {
        setRerenderCarousel(true);
    }
    useEffect(() => {
        window.addEventListener('rerenderGoogleReviews', handleRerenderCarousel);

        return () => {
            window.removeEventListener('rerenderGoogleReviews', handleRerenderCarousel);
        };
    }, []);

    useEffect(() => {
        if (rerenderCarousel) {
            handleRerenderCarousel();
        }
    }, [rerenderCarousel]);
    return (
        <>
            <section className={`footer-icons ${v1 ? 'footer-icons-v1' : 'footer-icons-control'} ${className}`}>
                <div className='footer-icons-container'>
                    {iconList.map((item, index) => <div className="footer-icons-col" key={index}>
                        <a
                            href="#authentic"
                            className="d-block"
                            onClick={() => {
                                if (item.description) {
                                    setModalContent(item), hideScroll();
                                }
                            }}
                        >
                            <div className="footer-icon-svg">
                                {item.icon}
                            </div>
                            <div className="mt-8 f-m-12 title">{item.title}
                            </div>

                        </a>
                    </div>)}
                </div>

                {modalContent && (
                    <div
                        data-ml-modal
                        id="authentic"
                        className="modal-with-head footer-icon-popup target-modal"
                    >
                        <a
                            className="modal-overlay"
                            onClick={() => {
                                setModalContent(undefined), initialScroll();
                            }}
                        ></a>
                        <div className="modal-dialog position-relative">
                            <a
                                className="close-modal cursor-pointer"
                                onClick={() => {
                                    setModalContent(undefined), initialScroll();
                                }}
                            >
                                <ProductModalCloseIcon />
                            </a>
                            <div className="modal-content center">
                                <h3 className="modal-head text-left">{modalContent.title}</h3>
                                <div className="modal-content-inner text-left">
                                    {modalContent?.description}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <div className='footer-horizontal-line'></div>

            {/* //UDS-523 Experiment */}
            {pathname === '/cart' && <section className={`footer-icons ${v1 ? 'footer-icons-v2' : 'footer-icons-control'} ${className}`}>
                <div className='footer-icons-v1-title cart-declutter-experiment'>Trusted by Millions for a Reason</div>
                <div className='footer-icons-container'>
                    {ICONS.map((item, index) => <div className="footer-icons-col" key={index}>
                        <div className="d-block">
                            <div className="footer-icon-svg">
                                {item.icon}
                            </div>
                            <div className="mt-8 f-m-12 title">{item.title}
                            </div>

                        </div>
                    </div>)}
                </div>

                {modalContent && (
                    <div
                        data-ml-modal
                        id="authentic"
                        className="modal-with-head footer-icon-popup target-modal"
                    >
                        <a
                            className="modal-overlay"
                            onClick={() => {
                                setModalContent(undefined), initialScroll();
                            }}
                        ></a>
                        <div className="modal-dialog position-relative">
                            <a
                                className="close-modal cursor-pointer"
                                onClick={() => {
                                    setModalContent(undefined), initialScroll();
                                }}
                            >
                                <ProductModalCloseIcon />
                            </a>
                            <div className="modal-content center">
                                <h3 className="modal-head text-left">{modalContent.title}</h3>
                                <div className="modal-content-inner text-left">
                                    {modalContent?.description}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>}
            {/* //UDS-523 Experiment end */}
        </>
    );
};
export default BadgeIcons;
