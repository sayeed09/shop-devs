// CollectionContainer.client.tsx
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from '../../utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import CollectionSection from './collection-section';
import Loader from '../../views/cart/loader';
import {
    CertificatesSection,
    DataBlock,
    InTheNews,
    LovedByMillionSection,
} from '../../models/home';
import LovedByMillion from '../../components/home/loved-by-million';
import Certificates from '../../components/home/certificate';
import NewsSection from '../../components/home/news-section';

interface IProps {
    dataBlock: DataBlock[];
}

export const CollectionContainer = ({ dataBlock }: IProps) => {
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [pageNo, setPageNo] = useState<number>(0);
    const [isStickyBubble, setIsStickyBubble] = useState(false);
    const [currentPageInViewport, setCurrentPageInViewPort] = useState(0);
    const [lastPageNumberLoaded, setLastPageNumberLoaded] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Mark client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Sticky bubble and current section in viewport
    useEffect(() => {
        if (!isClient) return;

        const handleStickyButton = () => {
            const ozMenuList = isMobile()
                ? document.querySelector('.oz-site-main-header')
                : document.querySelector('#shopify-section-new-header');

            const bubblesSupersale = document.querySelector('.bubbles-supersale');
            const banner = document.querySelector('.hero-banner-home');

            if (ozMenuList && bubblesSupersale && banner) {
                let shouldStick = false;
                if (bubblesSupersale.getBoundingClientRect().top < 4) {
                    shouldStick = true;
                    if (banner.getBoundingClientRect().bottom > 0) {
                        shouldStick = false;
                    }
                }
                setIsStickyBubble(shouldStick);
            }

            sectionRefs.current.forEach((section, index) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const inView =
                    rect.top - 100 <= window.innerHeight / 2 &&
                    rect.bottom >= window.innerHeight / 2;

                if (inView) {
                    setCurrentPageInViewPort(index);
                }
            });
        };

        const header = document.querySelector<HTMLElement>(
            '#shopify-section-new-header'
        );
        if (header) header.style.position = 'relative';

        window.addEventListener('scroll', handleStickyButton);

        return () => window.removeEventListener('scroll', handleStickyButton);
    }, [isClient]);

    const loadMore = () => {
        setPageNo((page) => page + 1);
        setLastPageNumberLoaded(pageNo + 1);
        if (pageNo > dataBlock.length) setHasMoreItems(false);
    };

    const handleBubbleClick = (index: number) => {
        setLoading(true);
        setHasMoreItems(true);

        const scrollSpeed = isMobile() ? 5000 : 10000;
        const scrollIntervalTime = isMobile() ? 150 : 100;

        const scrollInterval = setInterval(() => {
            const el = document.getElementById(`scalloped-box-${index}`);
            if (el) {
                const top = el.getBoundingClientRect().top;

                if (top <= 550) {
                    clearInterval(scrollInterval);
                    const calculatedScrollValue = isMobile() ? 150 : 220;
                    const scrollTop = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: scrollTop - calculatedScrollValue, behavior: 'smooth' });
                    setLoading(false);
                    return;
                }
            }

            window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
        }, scrollIntervalTime);
    };

    const getTopPosition = 0;

    if (!isClient) return null;

    return (
        <>
            {isLoading && <Loader />}
            <div
                id="marque-sec"
                className={`marque-sec ${isStickyBubble ? 'fixed-bubbles' : 'relative-positioning'}`}
                style={isStickyBubble ? { top: getTopPosition } : {}}
            >
                <div className="bubbles-supersale">
                    {dataBlock &&
                        dataBlock.map((item, index) => {
                            if (item.type === 'productSection') {
                                return (
                                    <a
                                        key={index}
                                        className="all-categories-title"
                                        href={`#scalloped-box-${index}`}
                                        onClick={() => handleBubbleClick(index)}
                                    >
                                        <div className="icon-img">
                                            <img
                                                src={item.img}
                                                alt={`OZiva ${item.title}`}
                                                className="bubble-image"
                                                style={
                                                    currentPageInViewport === index && !isLoading
                                                        ? { border: '3px solid #9334AE' }
                                                        : {}
                                                }
                                            />
                                        </div>
                                        <div
                                            className={
                                                currentPageInViewport === index && !isLoading
                                                    ? 'selected-title'
                                                    : 'title'
                                            }
                                            style={{ whiteSpace: 'break-spaces' }}
                                        >
                                            {item.title}
                                        </div>
                                    </a>
                                );
                            }
                        })}
                </div>
            </div>

            <div className="homeMain">
                <div
                    className={`collection-section-container ${isLoading ? 'hide-scrollbar' : ''}`}
                    style={
                        isLoading
                            ? { opacity: 0.1 }
                            : isStickyBubble
                                ? isMobile()
                                    ? { marginTop: 160 }
                                    : { marginTop: 220 }
                                : { marginTop: 0 }
                    }
                >
                    <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMoreItems}>
                        {dataBlock &&
                            dataBlock
                                .filter((_, index) => index <= lastPageNumberLoaded)
                                .map((collection, index) => {
                                    if (collection.type === 'productSection') {
                                        return (
                                            <CollectionSection
                                                key={index}
                                                collections={collection}
                                                index={index}
                                                sectionRefs={sectionRefs}
                                                isHorizontal={false}
                                            />
                                        );
                                    } else if (collection.type === 'banner') {
                                        return (
                                            <section key={index} className={`section-divider banner-image-${index}`}>
                                                <img
                                                    src={isMobile() ? collection.mobile : collection.desktop}
                                                    alt="Banner Image"
                                                />
                                            </section>
                                        );
                                    } else if (collection.type === 'lovedByMillion') {
                                        return <LovedByMillion key={index} lovedByMillion={collection as LovedByMillionSection} />;
                                    } else if (collection.type === 'certificates') {
                                        return <Certificates key={index} certificates={collection as CertificatesSection} />;
                                    } else if (collection.type === 'inTheNewsSection') {
                                        return <NewsSection key={index} newsData={collection as InTheNews} />;
                                    }
                                })}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};