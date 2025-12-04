import React from "react";
import { isMobile } from "../../../utils/helper";
import { SectionHeader } from "../common";
import { useProductInfo } from "../../../hooks/product-info";

interface Props {
    title?: string;
    desktopImage: string;
    mobileImage: string;
    index: number;
    buyNowVariant: (variantId: string) => void;
    showDisclaimer: boolean;
}

const Banner = ({ title, desktopImage, mobileImage, index, showDisclaimer }: Props) => {

    return (
        <>
            <section className={`banner-img-sec banner-image-${index}`}>
                {title && <SectionHeader title={title} />}
                <img
                    src={isMobile() ? mobileImage : desktopImage}
                    alt={title || 'Banner Image'}
                    className=""
                />
            </section>
            {
                showDisclaimer && <div className="disclaimer-product-v2">
                    This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Health claims based on
                    scientifically studied ingredients.
                </div>
            }
        </>



    );
};

export default Banner;
