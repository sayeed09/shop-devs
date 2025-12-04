import { Comparison, Section } from "../../models/product/productv2";
import { isMobile } from "../helper";



export const getImageList = (comparisons: Comparison[]) => {
    let list: {
        image1: string,
        image2: string
    }[] = [];
    if (comparisons) {
        comparisons.map((item) => {
            list.push(
                {
                    image1: isMobile() ? item.mobileImage1 : item.desktopImage1,
                    image2: isMobile() ? item.mobileImage2 : item.desktopImage2
                }
            )
        })
    }
    return list;
}

export const comparisonsSliderOptions = () => {
    if (isMobile()) {
        return {
            // groupCells: 1,
            prevNextButtons: false,
            // contain: true,
            pageDots: false,
            lazyLoad: 2,
            autoPlay: false,
            draggable: false,
            cellAlign: 'left',
        };
    } else {
        return {
            groupCells: 2,
            prevNextButtons: false,
            contain: true,
            pageDots: false,
            lazyLoad: 2,
            autoPlay: false,
            draggable: false,
            cellAlign: 'left'
        };
    }
}

export const GoogleReviewflickityOptions = {
    prevNextButtons: false,
    contain: true,
    pageDots: true,
    lazyLoad: 2,
    autoPlay: false,
    draggable: true,
    groupCells: 1,
    cellAlign: 'left'
};


export enum SECTION_TYPES {
    ComparisonImage = 'ComparisonImage',
    IconDescription = 'IconDescription',
    Image = 'Image',
    Article = 'Article'
}

export const animateNumber = (id: string, number: number, animationName: string) => {
    const slotElement = document.getElementById(id);
    const newMarginTop = `-${number}em`;  // Define your new margin-top value

    // Create a new <style> element
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    if (slotElement && styleElement) {
        // Define the keyframes with the new margin-top value
        const keyframes = `@keyframes ${animationName} {
                        100% {
                        margin-top: ${newMarginTop};
                        }
                        }`;

        // Append the new keyframes to the new stylesheet
        styleElement?.sheet?.insertRule(keyframes, 0);

        // Remove and reapply the class to restart the animation
        slotElement.classList.remove(`${animationName}`);

        // Reapply the class after a short delay to trigger the new animation
        setTimeout(() => {
            slotElement.classList.add(`${animationName}`);
        }, 10);
    }

}

export const FIRST_FOLD_SECTIONS = ['newBenefits', 'variants', , 'images', 'clinicalStudy'];

export const SECOND_FOLD_SECTIONS = ['sections', 'seo', 'footer', 'faq', 'recommendedByExpert', 'labReports'];


export function expectedDeliveryDate(result, orderDate) {
    let startDate = new Date(orderDate);
    let endDate = new Date(orderDate);

    const date1 = +result.split(" to ")[0];
    const date2 = +result.split(" to ")[1];

    startDate.setDate(startDate.getDate() + date1);
    endDate.setDate(endDate.getDate() + date2);
    let startMonth = startDate.toLocaleString(
        "default",
        { month: "short" });

    let endMonth = endDate.toLocaleString(
        "default",
        { month: "short" });

    let minDate = (startDate.getDate()) + " " + (startMonth != endMonth ? startMonth : "");
    let maxDate = endDate.getDate() + " " + endMonth;

    return { startDate: minDate, endDate: maxDate }
}
declare const LimeChatWhatsapp: any;
export const addLimeChat = () => {
    var lc_url =

        "https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/LC_whatsapp_widget.js";

    var s = document.createElement("script");

    s.type = "text/javascript";

    s.defer = true;

    s.src = lc_url;

    s.onload = function () {

        var whatsAppBtn = new LimeChatWhatsapp({

            phone: "917400492021",

            prefill_text: "I want to know more about Oziva Protein and Herbs for Women",

            button_message_mobile: "Chat with us",

            button_message_desktop: "Chat with us",

            display_on: "both",

            widget_type_desktop: "icon",

            widget_type_mobile: "icon",

            display_size_desktop: 44,

            position_desktop: "right",

            bottom_margin_desktop: 25,

            left_margin_desktop: 48,

            right_margin_desktop: 124,

            display_size_mobile: 44,

            position_mobile: "right",

            bottom_margin_mobile: 91,

            left_margin_mobile: 24,

            right_margin_mobile: 15,

            show_pop_up: false,

            pop_up_message_position: "side",

            pop_up_message_text: "Chat with Customer Care",

            pop_up_image: " ",

            pop_up_delay: 3,

            pdp_prefill_text: "Hey! I would like to know about ",

            pages_to_display: ["homepage", "cart", "blogs", "products", "collections", "checkout", "pages"],

            includeVariant: false,

            isShopify: false,

            zIndex: 1000

        });

        whatsAppBtn.renderButton();

    };

    var x = document.getElementsByTagName("script")[0];
    if (x && x.parentNode)
        x.parentNode.insertBefore(s, x);
}

export const sortDateWise = (data) => {
    const parseDate = (mfgMonth) => {
        const [month, year] = mfgMonth.split('-');
        const monthIndex = new Date(`01 ${month} 20${year}`).getMonth();
        return new Date(`20${year}-${String(monthIndex + 1).padStart(2, '0')}-01`);
    };

    return data.sort((a, b) => {
        const dateA = parseDate(a['Mfg month']).getTime();
        const dateB = parseDate(b['Mfg month']).getTime();
        return dateB - dateA;
    });

}

export const formatDateForLabReportSection = (dateStr) => {
    const date = new Date(dateStr);

    const shortMonth = date.toLocaleString('en-US', { month: 'short' });
    const shortYear = date.getFullYear().toString().slice(2);
    const formatted = `${shortMonth}-${shortYear}`;
    return formatted;
}
export const isItAtLastPostion = (sections: Section[], currentSection: Section): boolean => {
    if (!sections?.length) return false;

    const lastSection = sections[sections.length - 1];
    return lastSection?.sort === currentSection?.sort;
};
