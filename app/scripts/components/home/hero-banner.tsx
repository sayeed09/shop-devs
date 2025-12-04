import React, { useEffect, useRef, useState } from "react";
import { Banner } from "../../models/home";
import { isMobile } from "../../utils/helper";
import { ResponsiveImage } from "../productCard/responsive-image";
import { bannerBreakPoints } from "../../utils/data-provider";

interface IProps {
    homepageData: Banner[];
}

export default function HeroBanner(props: IProps) {
    const flickityRef = useRef<any>(null);
    const [FlickityComponent, setFlickityComponent] = useState<any>(null);
    const [clientLinks, setClientLinks] = useState<(URL | null)[]>([]);

    // Load Flickity ONLY on client
    useEffect(() => {
        import("react-flickity-component").then((mod) => {
            setFlickityComponent(() => mod.default);
        });
        import("flickity-fullscreen");

        // Compute links safely on client
        const links = props.homepageData.map((item) => {
            if (typeof window === "undefined") return null;
            if (item.link && item.link.indexOf("blog.oziva.in") === -1) {
                const u = new URL(item.link);
                u.hostname = window.location.hostname;
                return u;
            } else if (item.link) {
                return new URL(item.link);
            }
            return null;
        });
        setClientLinks(links);
    }, [props.homepageData]);

    if (!FlickityComponent) return null; // Avoid SSR

    const flickityOptionsMain = {
        initialIndex: 0,
        pageDots: false,
        lazyLoad: 1,
        adaptiveHeight: true,
        prevNextButtons: props.homepageData.length > 1,
    };

    return (
        <FlickityComponent
            className="carousel carousel-main hero-banner-home"
            elementType="div"
            options={flickityOptionsMain}
            reloadOnUpdate
            flickityRef={(c: any) => (flickityRef.current = c)}
        >
            {props.homepageData?.map((item, index) => {
                const itemLink = clientLinks[index];
                return (
                    <a
                        href={itemLink?.href || "javascript:void(0)"}
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
                                onLoadedMetadata={() => {
                                    flickityRef?.current?.resize();
                                }}
                            >
                                <source
                                    src={isMobile() ? item.mobileImage : item.image}
                                    type="video/mp4"
                                />
                            </video>
                        ) : (
                            <ResponsiveImage
                                imageURL={isMobile() ? item.mobileImage : item.image}
                                widthHeightObject={bannerBreakPoints}
                                altText={`OZiva: ${item.title}`}
                            />
                        )}
                    </a>
                );
            })}
        </FlickityComponent>
    );
}