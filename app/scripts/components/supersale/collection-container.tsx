import React, { useEffect, useRef, useState } from 'react';
import { SuperSaleJSON } from '../../utils/supersale/constant';
import { isMobile } from '../../utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import CollectionSection from './collection-section';
import Loader from '../../views/cart/loader';
import MarqueeAnimation from './marquee-animation';


export const CollectionContainer = () => {
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [pageNo, setPageNo] = useState<number>(0);
    const [isStickyBubble, setIsStickyBubble] = useState(false);
    const [flag1, setFlag1] = useState(-1);
    const [currentPageInViewport, setCurrentPageInViewPort] = useState(0);
    const [lastPageNumberLoaded, setLastPageNumberLoaded] = useState(0);
    const sectionRefs = useRef([]);
    const [isLoading, setLoading] = useState(false);

    const handleStickyButton = () => {
        const ozMenuList = isMobile()
            ? document.querySelector('.oz-site-main-header')
            : document.querySelector('#shopify-section-new-header');

        const bubblesSupersale = document.querySelector('.bubbles-supersale');
        const marqueeDiv = document.querySelector('.marquee');
        const banner = document.querySelector('.hero-banner-home');

        if (ozMenuList && bubblesSupersale && marqueeDiv && banner) {
            let shouldStick = false;
            if (marqueeDiv.getBoundingClientRect().top < 4) {
                shouldStick = true;
                if (banner.getBoundingClientRect().bottom > 0) {
                    shouldStick = false;
                }
            }
            setIsStickyBubble(shouldStick);
        }

        sectionRefs.current.forEach((section: any, index) => {
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const inView =
                rect.top - 100 <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2;

            if (inView) {
                setCurrentPageInViewPort(index);
            }
        });
    }
    useEffect(() => {
        if (flag1 >= 0 && !hasMoreItems) {
            setLastPageNumberLoaded(lastPageNumberLoaded < flag1 ? flag1 : lastPageNumberLoaded);
            setPageNo(flag1);
            if (flag1 < SuperSaleJSON.spotlightCollections.length - 1) {
                setHasMoreItems(true);
            }
            setFlag1(-1) //reset
        }
    }, [hasMoreItems, flag1])
    useEffect(() => {
        const header = document.querySelector<HTMLElement>("#shopify-section-new-header");
        if (header) {
            header.style.position = "relative";
        }
        window.addEventListener('scroll', handleStickyButton);

        return () => {
            window.removeEventListener('scroll', handleStickyButton);
        };
    }, []);

    const loadMore = () => {
        setPageNo(page => page + 1);
        setLastPageNumberLoaded(pageNo + 1)
        if (pageNo > SuperSaleJSON.spotlightCollections.length) {
            setHasMoreItems(false);
        }
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
                    const scrollTop = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: scrollTop - 200, behavior: "smooth" });
                    setLoading(false);
                    return;
                }
            }

            window.scrollBy({ top: scrollSpeed, behavior: "smooth" });
        }, scrollIntervalTime);
    };

    const qabEl = document.getElementById('parentQABAnchor');
    const headerEl = document.querySelector('.oz-site-main-header');

    const getTopPosition = 0;

    return (
        <>
            {isLoading && <Loader />}

            <div id="marque-sec" className={` marque-sec ${isStickyBubble ? 'fixed-bubbles' : 'relative-positioning'}`} style={isStickyBubble ? { top: getTopPosition } : {}}>

                <MarqueeAnimation />
                <div className={`bubbles-supersale`}>
                    {
                        SuperSaleJSON.spotlightCollections.map((item, index) => (
                            <a key={index} className="all-categories-title" href={`#scalloped-box-${index}`} onClick={() => handleBubbleClick(index)}>
                                <div className="icon-img" >
                                    <img src={item.imgSrc} alt={`OZiva ${item.name}`} className='bubble-image' style={currentPageInViewport === index && !isLoading ? { border: '3px solid #9334AE' } : {}} />
                                </div>
                                <div className={currentPageInViewport === index && !isLoading ? 'selected-title' : 'title'} style={{ whiteSpace: 'break-spaces' }}>{item.name}</div>
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className={`collection-section-container ${isLoading ? 'hide-scrollbar' : ''}`} style={isLoading ? { opacity: 0.1 } : isStickyBubble ? isMobile() ? { marginTop: 173 } : { marginTop: 241 } : { marginTop: 0 }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMoreItems}
                >
                    {
                        SuperSaleJSON && SuperSaleJSON.spotlightCollections.length > 0 && SuperSaleJSON.spotlightCollections.filter((_, index) => index <= lastPageNumberLoaded).map((collections, index) => {
                            return (
                                <CollectionSection collections={collections} index={index}
                                    sectionRefs={sectionRefs} isHorizontal={collections.properties.isHorizontal} />
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </>

    )
}
