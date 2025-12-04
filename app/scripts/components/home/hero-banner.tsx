import React, { useEffect, useRef, useState } from "react";
import { Banner } from "../../models/home";
import { isMobile } from "../../utils/helper";

interface IProps {
    homepageData: Banner[];
}

export default function HeroBanner({ homepageData }: IProps) {
    const flickityRef = useRef<any>(null);
    const [FlickityComponent, setFlickityComponent] = useState<any>(null);
    const [clientLinks, setClientLinks] = useState<(URL | null)[] | null>(null);

    // Load Flickity and compute links only on client
    useEffect(() => {
        let isMounted = true;

        import("react-flickity-component").then((mod) => {
            if (isMounted) setFlickityComponent(() => mod.default);
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

        if (isMounted) setClientLinks(links);

        return () => {
            isMounted = false;
        };
    }, [homepageData]);

    // Avoid rendering anything until clientLinks & Flickity are ready
    if (!FlickityComponent || !clientLinks) return null;

    const flickityOptionsMain = {
        initialIndex: 0,
        pageDots: false,
        lazyLoad: 1,
        adaptiveHeight: true,
        prevNextButtons: homepageData.length > 1,
    };

    return (
        <FlickityComponent
            className="carousel carousel-main hero-banner-home"
            elementType="div"
            options={flickityOptionsMain}
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
                                    src={isMobile() ? item.mobileImage : item.image}
                                    type="video/mp4"
                                />
                            </video>
                        ) : (
                            <></>
                            // Replace with your <ResponsiveImage /> if needed
                        )}
                    </a>
                );
            })}
        </FlickityComponent>
    );
}