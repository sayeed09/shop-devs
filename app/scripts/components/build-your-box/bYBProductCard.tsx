import React, { useState } from 'react';
import AddToCartButton from './addToCartButton';
import GeneratedStarView from '../productCard/genratedStarView';
import { formatToPrice } from '../../utils/product/formatter'
import '../../../scripts/scss/import/_product-cards.scss';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { IBYBItem } from '../../interface/build-your-box';
import Popup from './popup';
import ErrorSnackbar from './errorSnackbar';
import { productCardBreakPoints } from '../../utils/data-provider';
import { ResponsiveImage } from '../productCard/responsive-image';

interface IProductCardProps {
    item: IBYBItem;
    addToBox: (variantId: string) => void;
    selectedVariants: IBYBItem[];
    handleRemoveProduct: (index: number) => void;
}

const BYBProductCard = ({ item, selectedVariants, addToBox, handleRemoveProduct }: IProductCardProps) => {
    const [viewAllPopup, setViewAllPopup] = useState(false);
    const [showSnakbar, setShowSnakbar] = useState<boolean>(false);
    const title = item.title.split('|');

    const showSnackbarFunc = () => {
        if (showSnakbar) {
            setTimeout(() => {
                setShowSnakbar(false);
            }, 2000);
            return <ErrorSnackbar />;
        }
    };

    return (
        <>
            <div className={`product-card-box-v1 product-card-v1 byb-cards ${item?.id}`}>
                <a className="product-img-v1"
                    onClick={() => setViewAllPopup(true)}
                    href="javscript:void(0)"
                >
                    <ResponsiveImage imageURL={item?.image} widthHeightObject={productCardBreakPoints} altText={title[0]}/>
                </a>
                <div className="product-card-box-v1-dtl">
                    <a href='javascript:void(0)' onClick={() => setViewAllPopup(true)}>
                        <div className='card-sub-title'>{title[1]}</div>
                        <p className="productCartTitle">{title[0]}</p>
                        {
                            item.itemReviews.averageRating &&
                            <GeneratedStarView
                                reviewDetails={item.itemReviews}
                            />
                        }
                        <div className="productPriceDetails">
                            <div className='cardPriceDtl'>
                                <span className="priceMRP">
                                    MRP:{' '}
                                </span>
                                <span className="actualPrice">{formatPriceWithCurrency(formatToPrice(item?.compareAtPrice))}</span>
                            </div>
                            <a href="javascript:void(0)" className="view_all" onClick={() => setViewAllPopup(true)}>
                                View All
                            </a>
                        </div>
                    </a>
                    <AddToCartButton item={item} addToBox={addToBox} selectedVariants={selectedVariants} handleRemoveProduct={handleRemoveProduct} setShowSnakbar={setShowSnakbar}/>
                </div>
            </div>

            {
                viewAllPopup && <Popup setViewAllPopup={setViewAllPopup} addToBox={addToBox} item={item}/>
            }

            {showSnackbarFunc()}
        </>
    );
};

export default BYBProductCard;
