import React, { useState } from 'react';
import { IProduct } from '../../interface/search-product-list';
import AddToCartButton from './addToCartButton';
import GeneratedStarView from './genratedStarView';
import { formatToPrice } from '../../utils/product/formatter'
import '../../../scripts/scss/import/_product-cards.scss';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import ForWithBenefits from './for-with-benefit';
import { INewBenefit } from '../../models/home';
import { ResponsiveImage } from '../productCard/responsive-image';
import { productCardBreakPoints } from '../../utils/data-provider';
import ProductTagV2 from '../productv2/product-tag-v2';
import { Link } from 'react-router';

interface IProductCardProps {
  item: IProduct;
  setShowSnakbar: (value) => void;
  handleClick?: () => void;
  isSearchPage?: boolean;
  className?: string;
  hasDescription?: boolean;
  description?: string;
  disableRedirect?: boolean;
}

const ProductCard = (props: IProductCardProps) => {
  const { item, setShowSnakbar, handleClick, isSearchPage, className, hasDescription, description, disableRedirect } =
    props;

  const renderProductDescription: any = () => {
    if (hasDescription === true) {
      if (window.innerWidth < 769) {
        return (<p className='product-description'>{description}</p>)
      } else {
        return (<></>)
      }
    }
  }

  return (
    <>
      <div className={`product-card-box-v1 product-card-v1 ${item?.productId}${className ? (" " + className) : ''}`}>
        <div className="product-tag" style={item?.productTag?.color ? { backgroundColor: item.productTag.color } : {}}>
          {item?.productTag?.name && <span>{item?.productTag?.name}</span>}
        </div>
        <Link to={disableRedirect ? '' : `/products/${item?.handle}?variant=${item.variantId}`}>
          <div className="product-img-v1"
            onClick={(e) => {
              if (handleClick)
                handleClick()
              else
                return false
            }
            }
            role=''
          >
            <ResponsiveImage imageURL={item?.image} widthHeightObject={productCardBreakPoints} altText={item?.title} />
          </div>
        </Link>

        <div className="product-card-box-v1-dtl">
          <Link to={disableRedirect ? '' : `/products/${item?.handle}?variant=${item.variantId}`}>

            <div
            >
              {item.averageRating &&
                <GeneratedStarView
                  reviewDetails={item}
                />}
              <p className="productCartTitle mt-m-8 mt-16">{item?.title}</p>
              {renderProductDescription()}
              <div className='price-details-container'>
                {item?.compareAtPrice !== item?.price &&
                  <span className='text-mrp'>
                    <>
                      MRP:{' '} <del className="priceMRP">{formatPriceWithCurrency(formatToPrice(item?.compareAtPrice))}</del>
                    </>
                  </span>
                }

                <span className='text-selling'>
                  {item?.compareAtPrice == item?.price &&
                    <span className='text-mrp'>
                      MRP:{' '}
                    </span>
                  }
                  {formatPriceWithCurrency(formatToPrice(item?.price))}

                </span>
              </div>

              <ForWithBenefits benefits={item?.benefitsNew as INewBenefit} />
            </div>
          </Link>
          <AddToCartButton setShowSnakbar={setShowSnakbar} item={item} isSearchPage={isSearchPage ? isSearchPage : false} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
