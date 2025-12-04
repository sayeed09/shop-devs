import React, { useRef } from "react";
import Flickity from 'react-flickity-component';
import 'flickity-fullscreen';
import { Banner } from "../../models/home";
import { isMobile } from "../../utils/helper";
import { ResponsiveImage } from '../productCard/responsive-image';
import { bannerBreakPoints } from "../../utils/data-provider";

interface IProps {
    homepageData: Banner[];
}


const HeroBanner = (props: IProps) => {
    const flickityOptionsMain = {
        initialIndex: 0,
        pageDots: false,
        lazyLoad: 1,
        adaptiveHeight: true,
        prevNextButtons: props.homepageData.length > 1 ? true : false
    };
    const flickityRef = useRef(null);
    return <Flickity
        className="carousel carousel-main hero-banner-home"
        elementType={'div'}
        options={flickityOptionsMain}
        reloadOnUpdate
        flickityRef={c => (flickityRef.current = c)}

    >
        {props.homepageData?.map(
            (item) => {
                let itemLink = null;
                if (item.link && item.link.indexOf('blog.oziva.in') == -1) {
                    itemLink = new URL(item.link);
                    itemLink.hostname = window.location.hostname;
                } else if (item.link.indexOf('blog.oziva.in') != -1) {
                    itemLink = new URL(item.link);
                }
                return (
                    <a href={itemLink ? itemLink.href : "javascript:void(0)"} className="carousel-cell" key={item.image} onClick={() => {
                        (window as any).gtag('event', 'Hero_Banner_Click', {
                            'event_category': item.title,
                            'event_label': 'Hero Banner',
                            'value': item.link,
                            send_to: 'GA4'
                        });
                    }}>
                        {item.mobileImage.indexOf('.mp4') > -1 ?
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                onLoadedMetadata={() => {
                                    flickityRef?.current?.resize();
                                }}
                            >
                                <source src={isMobile() ? item.mobileImage : item.image} type="video/mp4" />
                            </video>
                            :
                            <ResponsiveImage imageURL={isMobile() ? item.mobileImage : item.image}
                                widthHeightObject={bannerBreakPoints} altText={`OZiva: ${item.title}`} />
                        }
                    </a>
                )
            }
        )}
    </Flickity>
}
export default HeroBanner;