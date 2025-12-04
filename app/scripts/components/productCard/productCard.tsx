import React from 'react';
import { IProduct } from '../../interface/search-product-list';
import BenefitChips from './benefitChip';
import AddToCartButton from './addToCartButton';
import GeneratedStarView from './genratedStarView';
import { formatToPrice } from '../../utils/product/formatter'
import '../../../scripts/scss/import/_product-cards.scss';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from './responsive-image';

interface IProductCardProps {
  item: IProduct;
  setShowSnakbar: (value) => void;
  handleClick?: () => void;
  isSearchPage?: boolean;
}

const ProductCard = (props: IProductCardProps) => {
  const { item, setShowSnakbar, handleClick, isSearchPage } =
    props;
  return (
    <>
      <div className={`product-card-box-v1 ${item?.productId}`}>
        {Number(item?.price) >= 1999 ?
          <div className="product-tag" style={{ backgroundColor: '#D9314E', color: '#fff' }}>
            <span>B1G4</span>
          </div>
          : <div className="product-tag" style={item?.productTag?.color ? { backgroundColor: item.productTag.color } : {}}>
            {item?.productTag?.name && <span>{item?.productTag?.name}</span>}
          </div>}

        <a className="product-img-v1"
          onClick={(e) => {
            if (handleClick)
              handleClick()
            else
              return false
          }
          }
          href={`/products/${item?.handle}?variant=${item.variantId}`}
        >
          <ResponsiveImage imageURL={item?.image} widthHeightObject={productCardBreakPoints} altText={item?.title} />
        </a>
        <div className="product-card-box-v1-dtl product-card-v1">
          <a href={`/products/${item?.handle}?variant=${item.variantId}`}>
            <p className="productCartTitle">{item?.title}</p>
            <BenefitChips benefits={item?.benefits} />
            {item.averageRating &&
              <GeneratedStarView
                reviewDetails={item}
              />}
            <div className="productPriceDetails">
              <span
                className="priceMRP" >
                MRP:{' '}
              </span>

              {item?.compareAtPrice !== item?.price && (
                <del className="priceMRP">{formatPriceWithCurrency(formatToPrice(item?.compareAtPrice))}</del>
              )}
              <span className="actualPrice">{formatPriceWithCurrency(formatToPrice(item?.price))}</span>
              {(formatToPrice(item?.compareAtPrice) - formatToPrice(item?.price)) > 0 && (
                <span className="totalPriceOff">{formatPriceWithCurrency(formatToPrice(item?.compareAtPrice) - formatToPrice(item?.price))} off</span>)}
            </div>
          </a>
          <AddToCartButton setShowSnakbar={setShowSnakbar} item={item} isSearchPage={isSearchPage ? isSearchPage : false} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
