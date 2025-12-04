import React, { useContext, useEffect, useState } from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { CartItem, LineItem } from '../../models/cart/get-response';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { StarFilled } from '../../../icons/star-filled';
import { ProductVariant } from '../../interface/product';
import useCartDetails from '../../hooks/cart';
import { CartContext } from '../../context/cart';
import { setShowSnackbar, setShowUpgradeCartOption } from '../../actions/cart';
import { Moengage } from '../../utils/tracking/gaTracking';
import { ButtonLoader } from '../../../icons/button-loader';
import { PHMProductId, PHWProductId } from '../../utils/product/constants';
import { GAContext } from '../../context/gatracking';
interface IProps {
    setUpgradeCartPopup: (selectedCartItem: LineItem | null | any) => void;
    filteredVariants: ProductVariant[] | undefined;
    upgradeCartPopup: CartItem;
    productReview: any;
    index: number;
    productId: number;
}
const UpgradeCartPopup = ({ setUpgradeCartPopup, filteredVariants, upgradeCartPopup, productReview, index, productId }: IProps) => {
    let recommendedVariant;
    if (filteredVariants) {
        recommendedVariant = filteredVariants.length === 3 ? filteredVariants[1] : filteredVariants[0];
    }
    const [selectedPack, setSelectedPack] = useState<ProductVariant>(recommendedVariant);
    const [variantResponseList, setVariantResponseList] = useState<string[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const gaTrackingEvent = useContext(GAContext);

    const { handleUpgradeCart, getProductInformation } = useCartDetails();
    const { state, dispatch } = useContext(CartContext);

    const getFormattedQty = async () => {
        if (filteredVariants && filteredVariants.length > 0) {
            const responseList = await Promise.all([...filteredVariants.map((item) => getProductInformation(Number(item.id), productId))]);
            setVariantResponseList(responseList.map((item) => `${getFormattedQtyString(item)}`));
        }
    }
    useEffect(() => {
        if (index === 0) getFormattedQty();
    }, []);

    const handleUpgradeCartClick = async () => {
        try {
            setLoader(true);
            await handleUpgradeCart(upgradeCartPopup, selectedPack.id);
            const moeAttributes: any = {
                product_title: upgradeCartPopup.product_title,
                product_id: upgradeCartPopup.product_id,
                variant_id: upgradeCartPopup.variant_id,
                cart_amount: state.cart.order_total,
            };
            Moengage.track_event('update_cart_skus', moeAttributes);
            // dispatch(setShowUpgradeCartOption(false));
            dispatch(setShowSnackbar(true));
            const upgradedItemList: any[] = [];
            upgradedItemList.push({
                variantId: selectedPack.id
            });
            if (!localStorage.getItem('upgradedItems')) {
                localStorage.setItem('upgradedItems', JSON.stringify(upgradedItemList));
            } else {
                const getUpgradedList = localStorage.getItem('upgradedItems') ? JSON.parse(localStorage.getItem('upgradedItems')) : null;
                getUpgradedList.push({
                    variantId: selectedPack.id
                });
                localStorage.setItem('upgradedItems', JSON.stringify(getUpgradedList));
            }
            setLoader(false);
        } catch (error) {
            console.log("Error : ", error);
            setLoader(false);
        }
    }

    const getFormattedQtyString = (qty: string) => {
        if (upgradeCartPopup.product_id == Number(PHMProductId) || upgradeCartPopup.product_id == Number(PHWProductId)) {
            const gramQty = `${Number(qty) / 907} x 907 g`
            return `${Math.floor(Number(qty) / 453)}lbs/${gramQty}`;
        }
        return `${qty}`;
    }

    return (
        <>

            <div className="footer-icons-col">
                <div data-ml-modal id="authentic"
                    className="modal-with-head footer-icon-popup target-modal"
                >
                    <a className="modal-overlay"
                        onClick={() => {
                            setUpgradeCartPopup(null);
                        }}
                    ></a>
                    <div className="modal-dialog position-relative">
                        <a className="close-modal cursor-pointer"
                            onClick={() => {
                                setUpgradeCartPopup(null);
                            }}
                        >
                            <ProductModalCloseIcon />
                        </a>
                        <div className="modal-content center">
                            <div className="policy-modal-head">
                                <p>Review Your Pack</p>
                            </div>
                            <div className="model-body">
                                <div className='pack-listing-card-container'>
                                    {
                                        variantResponseList.length > 0 && filteredVariants && filteredVariants.map((item, index) => {
                                            return (
                                                <div className={`pack-listing-card ${item.id === selectedPack?.id ? 'active' : ''}`} onClick={() => {
                                                    gaTrackingEvent('upgrade_cart_pack_selected', { items: [{ option: upgradeCartPopup.product_id, item_varaint: item.title, item_name: upgradeCartPopup.title, item_id: item.id }] });
                                                    setSelectedPack(item)
                                                }}>
                                                    <div className={`pack-listing-image`}>
                                                        {item.isRecommended ? <span className='pack-listing-recommended-tag'>Recommended</span> : null}
                                                        <img src={item?.src} alt="Pack Card" />
                                                        {<div className='pack-name'>
                                                            {item.option2 ? `${item.option2.slice(0, 13)}...` : `${item.option1.slice(0, 13)}...`}
                                                        </div>}
                                                        <div className='pack-qty'>
                                                            {variantResponseList[index]}
                                                        </div>
                                                    </div>
                                                    <div className='pack-listing-pricing'>
                                                        <div className='pack-listing-selling-price'>
                                                            {formatPriceWithCurrency(item.price)}
                                                        </div>
                                                        <div className='pack-listing-mrp'>
                                                            <s>{formatPriceWithCurrency(item.compareAtPrice)}</s>
                                                        </div>
                                                        {item.compareAtPrice - item.price > 0 && (<div className='pack-listing-save'>
                                                            Save: {formatPriceWithCurrency(item.compareAtPrice - item.price)}
                                                        </div>)}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='oziva-mob-footer-1'>
                                    <div className='footer-container'>
                                        <div className="image-container">
                                            <img src={selectedPack?.src} />
                                            <div className="product-ratings">
                                                <div className='ratings-number'>{productReview?.averageRating}</div>
                                                <StarFilled />
                                            </div>
                                        </div>
                                        {
                                            <>
                                                {loader ? <div
                                                    className="pdp-v2-cta-btn text-center"
                                                >
                                                    <ButtonLoader />
                                                </div> :
                                                    <button className='pdp-v2-cta-btn' onClick={() => handleUpgradeCartClick()}>
                                                        <div className='upgrade-cart-button'>
                                                            UPDATE CART
                                                        </div>
                                                    </button>}
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UpgradeCartPopup;
