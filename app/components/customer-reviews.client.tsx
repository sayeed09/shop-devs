import React, { useEffect, useRef, useState } from "react";

interface CustomerReviewsModal {
    productId: string;
    title: string;
}

const CustomerReviews = (props: CustomerReviewsModal) => {
    const [loadScripts, setLoadScripts] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoadScripts(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // start loading *before* fully in view
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!loadScripts) return;

        const script1 = document.createElement("script");
        script1.src = "https://cdn.shopify.com/s/files/1/0366/1004/8044/files/judgeme_94bce467-b6b8-4c07-9a93-e3156d03c919.js?v=1745006413";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "https://cdn.judge.me/assets/installed.js";
        script2.async = true;

        document.head.appendChild(script1);
        document.head.appendChild(script2);

        script1.addEventListener("load", () => {
            setTimeout(() => {
                moveImagesToFirst();
            }, 1000);
        });
    }, [loadScripts]);

    const moveImagesToFirst = () => {
        let parentDivList = Array.from(
            document.getElementsByClassName("jdgm-rev__content")
        );
        let childDivList = document.getElementsByClassName("jdgm-rev__pics");
        if (parentDivList && parentDivList.length > 0) {
            parentDivList.forEach((item, index) => {
                if (
                    childDivList[index] &&
                    childDivList[index]?.childNodes[1]?.childNodes[1]
                ) {
                    let imageElement = childDivList[index].childNodes[1]
                        .childNodes[1] as HTMLInputElement;
                    let url = new URL(imageElement.getAttribute("data-src") || "");
                    var searchParams = url.searchParams;
                    searchParams.set("w", "300");
                    url.search = searchParams.toString();
                    var newLink = url.toString();
                    imageElement.setAttribute("data-src", newLink);
                    imageElement.setAttribute("src", newLink);
                    item.insertBefore(childDivList[index], item.firstChild);
                }
            });
        }
    };

    return (

        <div className="review-widget container" id="customerReview" ref={ref}>
            <div
                className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
                data-id={props.productId}
                data-product-title={props.title}
            ></div>
        </div>
    );
};

export default CustomerReviews;