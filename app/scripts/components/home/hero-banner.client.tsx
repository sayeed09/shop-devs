import React, { useEffect, useRef, useState } from "react";
import { Banner } from "../../models/home";
import { isMobile as checkIsMobile } from "../../utils/helper";

interface IProps {
    homepageData: Banner[];
}

export default function HeroBanner({ homepageData }: IProps) {
    const flickityRef = useRef<any>(null);
    const [FlickityComponent, setFlickityComponent] = useState<any>(null);
    const [clientLinks, setClientLinks] = useState<(URL | null)[]>([]);

    // Lazy-load Flickity and compute links on client
    useEffect(() => {
        import("react-flickity-component").then((mod) => {
            setFlickityComponent(() => mod.default);
        });
        import("flickity-fullscreen");

        const links = homepageData.map((item) => {
            if (!item.link) return null;
            try {
                const url = new URL(item.link);
                if (url.hostname !== "blog.oziva.in") {
                    url.hostname = window.location.hostname;
                }
                return url;
            } catch {
                return null;
            }
        });
        setClientLinks(links);
    }, [homepageData]);

    if (!FlickityComponent || clientLinks.length === 0) return null;

    const flickityOptions = {
        initialIndex: 0,
        pageDots: false,
        lazyLoad: 1,
        adaptiveHeight: true,
        prevNextButtons: homepageData.length > 1,
    };

    const isMobile = checkIsMobile();

    return (
        <FlickityComponent
            className="carousel carousel-main hero-banner-home"
            elementType="div"
            options={flickityOptions}
            reloadOnUpdate
            flickityRef={(c: any) => (flickityRef.current = c)}
        >
            {homepageData.map((item, index) => {
                const itemLink = clientLinks[index];
                return (
                    <a
                        href={itemLink?.href || "#"}
                        className="carousel-cell"
                        key={item.image}
                    >
                        {item.mobileImage.includes(".mp4") ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                onLoadedMetadata={() => flickityRef?.current?.resize?.()}
                            >
                                <source
                                    src={isMobile ? item.mobileImage : item.image}
                                    type="video/mp4"
                                />
                            </video>
                        ) : (
                            <img
                                src={isMobile ? item.mobileImage : item.image}
                                alt={`OZiva: ${item.title}`}
                            />
                        )}
                    </a>
                );
            })}
        </FlickityComponent>
    );
}