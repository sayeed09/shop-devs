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
import ProductTag from './product-tag';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';

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
  isComboProduct?: number | null;
  setIsComboProduct?: (value: number | null) => void;
}

const OptionItem = (props: OptionItemModal) => {
  const sectionRef = useRef(null);
  const { state: productState } = useContext(ProductContext);
  const { proOption, productDetail } = props;
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
                  className="oz-tag-pdp-items"
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
                      if (getVariantDetails(item).variant.placeholderProduct) {
                        props.setIsComboProduct && props.
                          setIsComboProduct(Number(getVariantDetails(item).variant.placeholderProduct));
                      } else {
                        props.setIsComboProduct && props.
                          setIsComboProduct(null);
                      }
                      const temp = { ...props.subScriptionData };
                      if (props.subScriptionData && props.subScriptionData.data)
                        temp.data.plans = [];
                      props.setSubscriptionData(temp);
                      props.getProductOption(item, proOption.position);
                    }}
                  >
                    <div className="variant-image">
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
                                <div className="variants-month">
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
                              <div className="variants-name-subtext">
                                {' '}
                                {variant.subHeader === null
                                  ? ''
                                  : variant.subHeader}{' '}
                              </div>
                            )}
                        </div>
                      ))}
                    </>
                    <div className="prod-price-off">
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
                      {getVariantDetails(item) && getVariantDetails(item)?.variant?.price
                        && (
                          <span className="d-inline-block pr-4 mb-4 finalPricePDP">
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
                        )}
                    </div>
                    {getVariantDetails(item) &&
                      getVariantDetails(item)?.variant?.compareAtPrice -
                      getVariantDetails(item)?.variant?.price >
                      0 && <div className='save-today-price'> Save {getVariantDetails(item) &&
                        formatPriceWithCurrency(
                          getVariantDetails(item)?.variant
                            ?.compareAtPrice -
                          getVariantDetails(item)?.variant?.price,
                        )} today!</div>}
                  </button>

                </div>
              );
            })}
          </div>
        </div>
      )}
      <hr className="my-16" />
    </>
  );
};
export default OptionItem;
