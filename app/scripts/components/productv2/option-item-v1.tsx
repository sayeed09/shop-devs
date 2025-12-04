import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/product';
import {
    ProductOptionModal,
    ProductVariant,
    SubscriptionData,
    VariantDetails,
    productDetailsModal,
} from '../../interface/product';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';
import ProductTag from './product-tag';
import { getFlavourImage } from '../../utils/product/formatter';

interface OptionItemModal {
    proOption: ProductOptionModal;
    productDetail: productDetailsModal;
    productId: string;
    variantItem: any;
    optionKey: number;
    subScriptionData: SubscriptionData;
    setSubscriptionData: (data: SubscriptionData) => void;
    getProductOption: (item: string, option: number) => void;
    row: any;
    imageArray: any;
    setIsShowLoading?: (value: boolean) => void;
}

const OptionItemV1 = (props: OptionItemModal) => {
    const { proOption, productDetail } = props;
    const [animationIndex, setAnimationIndex] = useState(0);
    const [fadeState, setFadeState] = useState('fade-in');
    const { state: productState } = useContext(ProductContext);
    const getAvailableVarint = (item: string) => {
        const selectOpt = [...productState.selectedOption];
        selectOpt[proOption.position - 1] = item;
        return props.variantItem.some((variant: ProductVariant) => {
            return (
                variant?.option1 == selectOpt[0] && variant?.option2 == selectOpt[1]
            );
        });
    };
    const getVariantDetails = (item: string) => {
        const selectOpt = [...productState.selectedOption];
        selectOpt[proOption.position - 1] = item;
        const filteredProduct: ProductVariant = props.variantItem.filter(
            (variant: ProductVariant) =>
                selectOpt[0] === variant?.option1 &&
                (selectOpt[1] ? selectOpt[1] === variant.option2 : true),
        )[0];
        const productImage =
            filteredProduct &&
            props.imageArray.filter(
                (image: any) => image.id === filteredProduct.imageId,
            )[0]?.src;
        const response: VariantDetails = {
            variant: filteredProduct,
            image: productImage,
        };
        return response;
    };

    const duration = `${getVariantDetails(productState.selectedOption[props.optionKey])?.variant.consumptionSpan} ${getVariantDetails(productState.selectedOption[props.optionKey])?.variant.consumptionSpanType}`;
    const animatedTextList = productDetail.benefits
        ? [...productDetail.benefits, duration].reverse()
        : productDetail?.newBenefitChips
            ? props.productId === '4484402872379' ? [duration, ...productDetail?.newBenefitChips?.for.split('/')] : [productDetail?.newBenefitChips?.for, duration].reverse()
            : [];


    useEffect(() => {
        const timeout = setTimeout(() => {
            setFadeState('fade-out');

            setTimeout(() => {
                setAnimationIndex((prev) => (prev + 1) % animatedTextList.length);
                setFadeState('fade-in');
            }, 1000);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [animationIndex]);

    const getSubHeader1 = (subHeader) => {
        return props.productId == '2277916082235' ? subHeader.split('+')[0].includes(')') ? subHeader.split('+')[0] : subHeader.split('+')[0].trim() + ')' : subHeader.split('(')[0]?.replace('tubes', '');
    }
    const getSubHeader2 = (subHeader) => {
        return props.productId == '2277916082235' ? subHeader.split('(')[1]?.split('+')[1]?.replace(')', '') :
            subHeader.split('(')[1]?.replace(')', '');
    }

    return (
        <>
            {props.row.length - 1 !== props.optionKey ? (
                <div>
                    <p className="mb-16 small-sec-title">
                        {proOption.name} :
                        <span className="subtitle-text f-14 font-medium">
                            {productState.selectedOption[props.optionKey]}
                        </span>
                    </p>
                    <div className="oz-tag-group">
                        {proOption.values?.map((item: string, index: number) => {
                            return (
                                <button
                                    style={
                                        getAvailableVarint(item)
                                            ? {
                                                height: 30,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'row'
                                            }
                                            : { display: 'none' }
                                    }
                                    className={
                                        productState.selectedOption[0] == item ||
                                            productState.selectedOption[1] == item
                                            ? 'oz-tag cursor-pointer active'
                                            : 'oz-tag cursor-pointer'
                                    }
                                    key={index}
                                    onClick={(e) => {
                                        props.setIsShowLoading(true);
                                        if (props.subScriptionData && props?.subScriptionData?.data) {
                                            let temp = { ...props.subScriptionData };
                                            temp.data.plans = [];
                                            props.setSubscriptionData(temp);
                                        }
                                        props.getProductOption(item, proOption.position);
                                    }}
                                >
                                    {/* UDS-645 Experiment Start */}
                                    {getFlavourImage(item) &&
                                        <img className='uds-645-exp' src={getFlavourImage(item)} width={21} height={20} />
                                    }
                                    {/* UDS-645 Experiment end */}
                                    <div
                                        className="variants-name"
                                        style={{ textAlign: 'center' }}
                                    >
                                        {item}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flavour-list">
                    <p className="mb-16 small-sec-title">
                        {proOption.name} :
                        <span className="subtitle-text f-14 font-medium">
                            {productState.selectedOption[props.optionKey]}
                        </span>
                    </p>
                    <div className="oz-tag-group">
                        {proOption.values?.map((item: string, index: number) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div
                                    className="oz-tag-pdp-items-v1"
                                    key={index}
                                    style={getAvailableVarint(item) ? {} : { display: 'none' }}
                                >
                                    <ProductTag item={item} getVariantDetails={getVariantDetails} />
                                    <button
                                        className={`${productState.selectedOption[0] == item ||
                                            productState.selectedOption[1] == item
                                            ? 'oz-tag cursor-pointer active'
                                            : 'oz-tag cursor-pointer'
                                            }`}
                                        key={index}
                                        onClick={() => {
                                            props.setIsShowLoading && props.setIsShowLoading(true);
                                            const temp = { ...props.subScriptionData };
                                            if (props.subScriptionData && props.subScriptionData.data)
                                                temp.data.plans = [];
                                            props.setSubscriptionData(temp);
                                            props.getProductOption(item, proOption.position);
                                        }}
                                    >
                                        <div className="variant-image">
                                            <ResponsiveImage imageURL={getVariantDetails(item).image} widthHeightObject={productCardBreakPoints} altText={productState?.productTitle} />

                                            {/* UDS-657-Start */}
                                            <>
                                                {productDetail.variants.map((variant, index) => {
                                                    if (getVariantDetails(item)?.variant?.id &&
                                                        (variant.consumptionSpan !== 0 &&
                                                            variant.consumptionSpanType !== null)) {
                                                        return <div key={index} className='variant-month-container-v1'>
                                                            {variant.id ===
                                                                getVariantDetails(item)?.variant?.id &&
                                                                (variant.consumptionSpan !== 0 &&
                                                                    variant.consumptionSpanType !== null ? (
                                                                    <div className="variants-month-UDS-657">
                                                                        {variant.consumptionSpan +
                                                                            ' ' +
                                                                            variant.consumptionSpanType}
                                                                    </div>
                                                                ) : null)}
                                                        </div>
                                                    } else {
                                                        return null;
                                                    }

                                                })}
                                                {productDetail.variants.map((variant, index) => {
                                                    if (getVariantDetails(item)?.variant?.id &&
                                                        (variant.consumptionSpan !== 0 &&
                                                            variant.consumptionSpanType !== null)) {
                                                        const temp = [`${variant.consumptionSpan} ${variant.consumptionSpanType}`, ...animatedTextList.slice(1)];
                                                        return productState.selectedOption[0] == item ||
                                                            productState.selectedOption[1] == item ? <div key={index} className={`variant-month-container-v2`}>
                                                            {variant.id ===
                                                                getVariantDetails(item)?.variant?.id &&
                                                                (variant.consumptionSpan !== 0 &&
                                                                    variant.consumptionSpanType !== null ? (
                                                                    <div className="variants-month-UDS-657" style={{ background: 'rgba(254, 204, 14, 0.5)' }}>
                                                                        {!([...animatedTextList][animationIndex].includes('month') || [...animatedTextList][animationIndex].includes('days')) && <span className={` fade-text ${fadeState}`}><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Tickmark.png?v=1748937437" alt="Tick Mark" className='tickmark-icon' /></span>}<span className={` fade-text ${fadeState}`}>{[...temp][animationIndex]}</span>
                                                                    </div>
                                                                ) : null)}
                                                        </div> : <div key={index} className={`variant-month-container-v2`}>
                                                            {variant.id ===
                                                                getVariantDetails(item)?.variant?.id &&
                                                                (variant.consumptionSpan !== 0 &&
                                                                    variant.consumptionSpanType !== null ? (
                                                                    <div className="variants-month-UDS-657" style={{ background: 'rgba(254, 204, 14, 0.5)' }}>
                                                                        {variant.consumptionSpan +
                                                                            ' ' +
                                                                            variant.consumptionSpanType}
                                                                    </div>
                                                                ) : null)}
                                                        </div>
                                                    } else {
                                                        return null;
                                                    }

                                                })}
                                            </>
                                            {/* UDS-657-End */}
                                        </div>
                                        <div className="variants-name-v1">{item}</div>
                                        <>
                                            {productDetail.variants.map((variant, index) => (
                                                <div key={index} style={variant.id ===
                                                    getVariantDetails(item)?.variant?.id ? { height: '70px' } : {}}>
                                                    {variant.id ===
                                                        getVariantDetails(item)?.variant?.id && (
                                                            <div className="variants-name-subtext-v1" style={!getSubHeader2(variant.subHeader) ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}>
                                                                <div className='variant-subtext' style={!getSubHeader2(variant.subHeader) ? { flexDirection: 'row', gap: '4px' } : { flexDirection: 'column' }}>
                                                                    <img src={props.productId == '2277916082235' ? "https://cdn.shopify.com/s/files/1/2393/2199/files/whey_2.png?v=1748946776" : "https://cdn.shopify.com/s/files/1/2393/2199/files/effervescent_2.png?v=1748847040"} alt="" />
                                                                    {variant.subHeader === null
                                                                        ? ''
                                                                        : getSubHeader1(variant.subHeader)}{' '}
                                                                </div>
                                                                {getSubHeader2(variant.subHeader) && <div className='variant-subtext'>
                                                                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/round_2.png?v=1748847039" alt="" />
                                                                    {variant.subHeader === null
                                                                        ? ''
                                                                        : getSubHeader2(variant.subHeader)}{' '}
                                                                </div>}
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </>
                                        <div className="prod-price-off-v1">
                                            <span className={`ml-2 ${getVariantDetails(item) &&
                                                getVariantDetails(item)?.variant?.compareAtPrice -
                                                getVariantDetails(item)?.variant?.price > 0 ? 'text-off-gray strike' : ''}`}>
                                                    MRP:{formatPriceWithCurrency(
                                                        getVariantDetails(item)?.variant?.compareAtPrice,
                                                    )}
                                                </span>
                                            {getVariantDetails(item) && getVariantDetails(item)?.variant?.price
                                                && (
                                                    <span className="d-inline-block pr-4 mb-4 finalPricePDP-v1">
                                                        Now:
                                                        {getVariantDetails(item) &&
                                                            formatPriceWithCurrency(
                                                                getVariantDetails(item)?.variant?.price,
                                                            )}
                                                    </span>
                                                )}
                                        </div>
                                    </button>
                                    {getVariantDetails(item) &&
                                        getVariantDetails(item)?.variant?.compareAtPrice -
                                        getVariantDetails(item)?.variant?.price >
                                        0 && <div className='saving-text-option-item-v1'> <img src='https://cdn.shopify.com/s/files/1/2393/2199/files/offers2.gif?v=1737643416' alt='Saving gif' />Save {getVariantDetails(item) &&
                                            formatPriceWithCurrency(
                                                getVariantDetails(item)?.variant
                                                    ?.compareAtPrice -
                                                getVariantDetails(item)?.variant?.price,
                                            )} today!</div>}

                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
export default OptionItemV1;
