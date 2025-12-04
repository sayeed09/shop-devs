import React, { useEffect, useRef, useState } from "react";
import { Banner } from "../../models/home";
import { isMobile as checkIsMobile } from "../../utils/helper";

interface IProps {
    homepageData: Banner[];
}

export default function HeroBanner({ homepageData }: IProps) {
    // const flickityRef = useRef<any>(null);
    // const [FlickityComponent, setFlickityComponent] = useState<any>(null);
    // const [clientLinks, setClientLinks] = useState<(URL | null)[] | null>(null);
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true); // mark that we're on client

    //     import("react-flickity-component").then((mod) => setFlickityComponent(() => mod.default));
    //     import("flickity-fullscreen");

    //     // compute links safely
    //     const links = homepageData.map((item) => {
    //         if (!item.link) return null;
    //         try {
    //             const url = new URL(item.link);
    //             if (url.hostname !== "blog.oziva.in") {
    //                 url.hostname = window.location.hostname; // safe now inside useEffect
    //             }
    //             return url;
    //         } catch {
    //             return null;
    //         }
    //     });
    //     setClientLinks(links);
    // }, [homepageData]);

    // if (!isClient || !FlickityComponent || !clientLinks) return null; // SSR safe

    // const flickityOptionsMain = {
    //     initialIndex: 0,
    //     pageDots: false,
    //     lazyLoad: 1,
    //     adaptiveHeight: true,
    //     prevNextButtons: homepageData.length > 1,
    // };

    // const isMobile = checkIsMobile(); // safe because now on client

    return (
        <></>
    );
}