import React, { useContext, useEffect, useRef, useState } from 'react';
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
import LighningBolt from '../../../icons/lighning-bolt';
import ProductTagV2 from './product-tag-v2';
import { ACVMoringProductID } from '../../utils/product/constants';

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
    startPriceAnimation: boolean;
}

const OptionItem = (props: OptionItemModal) => {
    const { state: productState } = useContext(ProductContext);
    const sectionRef = useRef(null);
    const [gcsk1731Exp, setGcsk1731Exp] = useState(false); // To check if user is in GCSK-1731 experiment
    const { proOption, productDetail } = props;
    const getAvailableVarint = (item: string) => {
        const selectOpt = [...productState.selectedOption];
        selectOpt[proOption.position - 1] = item;
        return props.variantItem.some((variant: ProductVariant) => {
            // Condition fopr UDS-679 experiment
            if (variant.option3 !== 'Routine') {
                return (
                    variant?.option1 == selectOpt[0] && variant?.option2 == selectOpt[1]
                );
            }
            // End Condition
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

    useEffect(() => {
        // GCSK-1731 experiment start
        setGcsk1731Exp((window as any).GCSK1731 == 1 ? true : false);
        window.addEventListener("GCSK1731", () => {
            setGcsk1731Exp(true)
        });
    }, []);

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
                    <div className="oz-tag-group" ref={sectionRef}>
                        {proOption.values?.map((item: string, index: number) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div
                                    className={gcsk1731Exp ? 'oz-tag-pdp-items-gcsk-1731-v1' : 'oz-tag-pdp-items'}
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
                                            {getVariantDetails(item)?.variant?.price > 1599 && props.productId == ACVMoringProductID &&
                                                <ProductTagV2 title='Buy 1 Get 4' className='product-tag-option-item' />
                                            }
                                            <ResponsiveImage imageURL={getVariantDetails(item).image} widthHeightObject={productCardBreakPoints} altText={productState?.productTitle} />
                                        </div>
                                        <>
                                            {productDetail.variants.map((variant, index) => {
                                                if (getVariantDetails(item)?.variant?.id &&
                                                    (variant.consumptionSpan !== 0 &&
                                                        variant.consumptionSpanType !== null)) {
                                                    return <div key={index}>
                                                        {variant.id ===
                                                            getVariantDetails(item)?.variant?.id &&
                                                            (variant.consumptionSpan !== 0 &&
                                                                variant.consumptionSpanType !== null ? (
                                                                <div className="variants-month variants-month-control">
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
                                        <div className="variants-name">{item}</div>
                                        <>
                                            {productDetail.variants.map((variant, index) => (
                                                <div key={index}>
                                                    {variant.id ===
                                                        getVariantDetails(item)?.variant?.id && (
                                                            <div className="variants-name-subtext variants-name-subtext-control">
                                                                {' '}
                                                                {variant.subHeader === null
                                                                    ? ''
                                                                    : variant.subHeader}{' '}
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </>
                                        <div className="prod-price-off ">
                                            <span
                                                className={
                                                    getVariantDetails(item) &&
                                                        getVariantDetails(item)?.variant?.compareAtPrice -
                                                        getVariantDetails(item)?.variant?.price >
                                                        0 ?
                                                        'text-off-gray' : ''
                                                }
                                            >
                                                MRP:
                                                <span className={`ml-2 ${getVariantDetails(item) &&
                                                    getVariantDetails(item)?.variant?.compareAtPrice -
                                                    getVariantDetails(item)?.variant?.price > 0 ? 'text-off-gray strike' : ''}`}>
                                                        {formatPriceWithCurrency(
                                                            getVariantDetails(item)?.variant?.compareAtPrice,
                                                        )}
                                                        <span style={{ width: 0 }}></span>
                                                    </span>
                                            </span>
                                            <br />
                                            <span className="pr-4 mb-4 finalPricePDP prod-price-off-control">
                                                {
                                                    getVariantDetails(item) &&
                                                    getVariantDetails(item)?.variant?.compareAtPrice -
                                                    getVariantDetails(item)?.variant?.price > 0 &&
                                                    <>
                                                        <div>
                                                            Now <span style={{ fontWeight: 700, fontSize: 16 }}>{formatPriceWithCurrency(getVariantDetails(item)?.variant?.price)}</span>
                                                        </div>
                                                    </>
                                                }
                                            </span>
                                        </div>

                                        <div className='prod-price-off prod-price-off-gcsk-1731-variant'>
                                            {
                                                getVariantDetails(item) &&
                                                getVariantDetails(item)?.variant?.compareAtPrice -
                                                getVariantDetails(item)?.variant?.price > 0 &&
                                                <>
                                                    <div className='now-price-text-gcsk-1731-variant'>
                                                        Now <span style={{ fontWeight: 700, fontSize: 16 }}>{formatPriceWithCurrency(getVariantDetails(item)?.variant?.price)}</span>
                                                    </div>

                                                    {
                                                        getVariantDetails(item) &&
                                                        getVariantDetails(item)?.variant?.compareAtPrice -
                                                        getVariantDetails(item)?.variant?.price >
                                                        0 && <>
                                                            <span className='price-off-text-gcsk-1731-variant'>
                                                                {formatPriceWithCurrency(
                                                                    getVariantDetails(item)?.variant
                                                                        ?.compareAtPrice -
                                                                    getVariantDetails(item)?.variant?.price,
                                                                )} Off
                                                                <LighningBolt className={"thunder-bolt"} />
                                                            </span>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                        {getVariantDetails(item) &&
                                            getVariantDetails(item)?.variant?.compareAtPrice -
                                            getVariantDetails(item)?.variant?.price >
                                            0 && <div className='save-today-price'> Save {getVariantDetails(item) &&
                                                formatPriceWithCurrency(
                                                    getVariantDetails(item)?.variant
                                                        ?.compareAtPrice -
                                                    getVariantDetails(item)?.variant?.price,
                                                )} today!
                                            </div>}
                                        {/* gcsk-1731-Start */}
                                        <>
                                            {productDetail.variants.map((variant, index) => (
                                                <div key={index}>
                                                    {variant.id ===
                                                        getVariantDetails(item)?.variant?.id && (
                                                            <div className="variants-name-subtext variants-name-subtext-gcsk-1731-v1">
                                                                {' '}
                                                                {variant.subHeader === null
                                                                    ? ''
                                                                    : variant.subHeader}{' '}
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </>

                                        <>
                                            {productDetail.variants.map((variant, index) => {
                                                if (getVariantDetails(item)?.variant?.id &&
                                                    (variant.consumptionSpan !== 0 &&
                                                        variant.consumptionSpanType !== null)) {
                                                    return <div key={index}>
                                                        {variant.id ===
                                                            getVariantDetails(item)?.variant?.id &&
                                                            (variant.consumptionSpan !== 0 &&
                                                                variant.consumptionSpanType !== null ? (
                                                                <div className="variants-month-gcsk-1731-v2">
                                                                    For <span className='month-text'>
                                                                        {variant.consumptionSpan +
                                                                            ' ' +
                                                                            variant.consumptionSpanType}</span>
                                                                </div>

                                                            ) : null)}
                                                    </div>
                                                } else {
                                                    return null;
                                                }

                                            })}
                                        </>
                                        {/* gcsk-1731-End */}
                                    </button>


                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
export default OptionItem;