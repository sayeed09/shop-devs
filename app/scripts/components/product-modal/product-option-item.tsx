import React from 'react';
import { ProductContext } from '../../context/product';
import {
  ProductOptionModal,
  ProductVariant,
  VariantDetails,
  productDetailsModal,
} from '../../interface/product';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';

interface IProps {
  productDetails: productDetailsModal;
  productOption: ProductOptionModal;
  optionKey: number;
  row: ProductOptionModal[];
  getProductOption: (item: string, option: number) => void;
  selectedOptions: string[] | undefined;
  setSelectedVariant: (selectedVariant: ProductVariant) => void;
}
const ProductOptionItem = ({ productDetails, productOption, optionKey, row, getProductOption, selectedOptions, setSelectedVariant }: IProps) => {

  const filterProductsVisiblity = (variantList: ProductVariant[]) => {
    return variantList?.filter(
      (variantItem: ProductVariant) => variantItem?.visibileOnPdp
    );
  }
  
  const getAvailableVarint = (item: string) => {
    let selectedOpt: string[] = [];
    if (selectedOptions) {
      selectedOpt = [...selectedOptions];
    }
    selectedOpt[productOption.position - 1] = item;
    if (selectedOpt) {
      
      return filterProductsVisiblity(productDetails.variants).some((variant: ProductVariant) => {
        return (
          variant?.option1 == selectedOpt[0] && variant?.option2 == selectedOpt[1]
        );
      });
    }
  };
  const getVariantDetails = (item: string) => {
    let selectedOpt: string[] = [];
    if (selectedOptions) {
      selectedOpt = [...selectedOptions];
    }
    selectedOpt[productOption.position - 1] = item;
    const filteredProduct: ProductVariant = productDetails.variants.filter(
      (variant: ProductVariant) =>
      selectedOpt[0] === variant?.option1 &&
        (selectedOpt[1] ? selectedOpt[1] === variant.option2 : true),
    )[0];
    const productImage =
      filteredProduct &&
      productDetails.images.filter(
        (image: any) => image.id === filteredProduct.imageId,
      )[0]?.src;
    const response: VariantDetails = {
      variant: filteredProduct,
      image: productImage,
    };
    
    return response;
  };
  
  const getVariantPrice = (item) => getVariantDetails(item)?.variant?.price;
  const getVariantMRP = (item) => getVariantDetails(item)?.variant?.compareAtPrice;
  const savedAmount = (item) => getVariantMRP(item) - getVariantPrice(item);

  return (
    <>  
      
      {row.length - 1 !== optionKey ? (
        <div style={{marginBottom: '32px'}}>
          <p className="mb-8 mt-16 small-sec-title" style={{textAlign: 'left'}}>
            {productOption.name} :
            <span className="subtitle-text f-14 font-medium">
              {selectedOptions && selectedOptions[productOption.position - 1]}
            </span>
          </p>
          <div className="oz-tag-group">
            {productOption.values?.map((item: string, index: number) => {
              return (
                <div
                  style={
                    !getAvailableVarint(item)
                      ? { display: 'none' } : {cursor: 'pointer'}
                  }
                  className={`${selectedOptions && (selectedOptions[0] == item ||
                    selectedOptions && selectedOptions[1] == item) ? 'oz-tag cursor-pointer active' : 'oz-tag cursor-pointer'} ${getAvailableVarint(item) ? 'product-title' : ''}`}
                  key={index}
                  onClick={(e) => {
                    getProductOption(item, productOption.position);
                    setSelectedVariant(getVariantDetails(item).variant);
                  }}
                >
                  <div
                    className="variants-name text-center"
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="product-flavour-list">
          <p className="mb-8 small-sec-title text-left">
            {productOption.name} :
            <span className="subtitle-text f-14 font-medium">
              {selectedOptions && selectedOptions[productOption.position - 1]}
            </span>
          </p>
          <div className="product-oz-tag-group">
            {productOption.values?.map((item: string, index: number) => {
              return (
                  <div
                    className={`${selectedOptions && (selectedOptions[0] == item ||
                      selectedOptions && selectedOptions[1] == item)
                      ? 'product-oz-tag cursor-pointer active'
                      : 'product-oz-tag cursor-pointer'
                      }`}
                    key={index}
                    onClick={() => {
                      getProductOption(item, productOption.position);
                      setSelectedVariant(getVariantDetails(item).variant);
                    }}
                    style={getAvailableVarint(item) ? {} : { display: 'none' }}
                  >
                    <div className="product-variant-image">
                      <ResponsiveImage imageURL={getVariantDetails(item).image} widthHeightObject={productCardBreakPoints} altText={productDetails.title}/>
                    </div>
                    <div className="product-variant-body">
                      <div className="product-variant-header">
                        {
                          productDetails.variants.map((variant) => {
                            if (variant.id === getVariantDetails(item)?.variant?.id && variant.consumptionSpan !== 0 &&
                            variant.consumptionSpanType !== null) {
                              return <div className="product-variants-consumption text-left">{variant.consumptionSpan} {variant.consumptionSpanType}</div>
                            } else {
                              return <></>
                            }
                          })
                        }
                        <div className="product-variants-name-heading text-left">{item}</div>
                      </div>
                      <div className="product-variants-name-subheader text-left">
                        {productDetails.variants.map((variant, index) => {
                          if (variant.id === getVariantDetails(item)?.variant?.id && variant.subHeader !== null) {
                            return <>{variant.subHeader}</>;
                          }
                        })
                        }
                      </div>
                      <div className="product-variant-pricing text-left">
                        <span
                          className={
                            getVariantDetails(item) &&
                              (savedAmount(item) >
                              0) ?
                              'text-off-gray product-variant-card-mrp' : ''
                          }
                        >
                          MRP:
                          {getVariantDetails(item) &&
                            savedAmount(item) > 0 &&
                            <s className="ml-2 text-off-gray strike">
                              {formatPriceWithCurrency(
                                getVariantMRP(item)
                              )}
                            </s>}
                        </span>
                        {getVariantDetails(item) && getVariantPrice(item)
                          && (
                            <span className="d-inline-block ml-4 pr-4 product-variant-card-price">
                              {getVariantDetails(item) &&
                                formatPriceWithCurrency(
                                  getVariantPrice(item)
                                )}
                            </span>
                          )}
                          {
                            getVariantDetails(item) && (savedAmount(item) > 0) ? <p className="product-variants-amount-save">Save: {formatPriceWithCurrency(savedAmount(item))}</p> : null
                          }
                      </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default ProductOptionItem;