
import React, { useContext, useEffect, useState } from 'react';
import { ScallopedWrapper } from './scalloped-wrapper';
import Collection from '../../views/collection';
import { isMobile } from '../../utils/helper';
import { SuperSaleJSON } from '../../utils/supersale/constant';
import { Product } from '../../models/home';
import CartItemPopup from './cart-item-popup';
import { IProduct } from '../../interface/search-product-list';
import AddtocartSnackbar from '../productCardV1/addToCartSnackbar';
import { GAContext } from '../../context/gatracking';
import { MixPanelContext } from '../../context/mixpanelContext';
import { Moengage } from '../../utils/tracking/gaTracking';

interface IProps {
    collections: any;
    index: number;
    sectionRefs: any;
    isHorizontal: boolean;
}

const CollectionSection = ({ collections, index, sectionRefs, isHorizontal }: IProps) => {
    const [selectedCartItem, setSelectedCartItem] = useState<{
        productId: string,
        variantId: string
    } | undefined>();
    const [item, setSelectedItem] = useState<IProduct>();

    const [showSnakBar, setShowSnakbar] = useState(false);
    const gaTrackingEvent = useContext(GAContext);
    const { trackMixpanelEvent } = useContext(MixPanelContext);

    useEffect(() => {
        if (showSnakBar) {
            setSelectedCartItem(undefined)
        }
    }, [showSnakBar]);

    const showSnakBarfunc = () => {
        if (showSnakBar) {
            setTimeout(() => {
                setShowSnakbar(false);
            }, 4000);
            return <AddtocartSnackbar />;
        }
    };
    const getStlye = () => {
        if (index !== 0) {
            if (collections?.properties?.footerImageDesktop || collections?.properties?.footerImageMobile) {
                return { marginTop: '0' };
            } else if (index !== SuperSaleJSON.spotlightCollections.length - 1) {
                return { marginBottom: '172px' };
            } else {
                return { marginBottom: '100px' }
            }
        } else {
            return { paddingTop: '64px' };
        }
    }
    const handleSelectItem = (product: Product) => {

        const formatItem: IProduct = {
            ...product,
            productId: product.id,
            price: String(product.price),
            compareAtPrice: String(product.compareAtPrice),
            averageRating: String(product.averageRating),
            numberOfReviews: String(product.numberOfReviews),

        }
        let trackingItem = {
            productId: product.id,
            variantId: product.variantId
        }
        setSelectedItem(formatItem);
        gaTrackingEvent('product_card_click', trackingItem);
        Moengage.track_event('product_card_click', trackingItem);

    }
    return (
        <div ref={(el) => (sectionRefs.current[index] = el)} key={collections.handle} id={`${collections.handle}`} className='collection-section'>
            <ScallopedWrapper bgColor={collections?.properties?.background} showTopScallopedDesign={index !== 0} >
                <div style={getStlye()} className='scalloped-box' id={`scalloped-box-${index}`}>
                    <div className={`scalloped-inner-box`}>
                        <div className='collection-title'>{collections.name}</div>
                        <div className='collection-subtitle'>{collections.subTitle}</div>
                        <Collection handle={collections.handle} hideCollectionTitle={true}
                            backgroundColor={collections.properties.background} hideQuickBuyCard={true}
                            disableLoadMore={true}
                            fetchLimit={8}
                            isHorizontal={isHorizontal}
                            disableRedirect={true}
                            handleProductClick={(product: Product) => {
                                handleSelectItem(product);
                                setSelectedCartItem({ productId: product.id, variantId: product.variantId })
                            }}
                            setShowSnakbar={setShowSnakbar}
                        />
                    </div>
                </div>
            </ScallopedWrapper>
            {showSnakBarfunc()}
            {selectedCartItem?.productId &&
                <div className='cart-item-popup'>
                    <CartItemPopup
                        setSelectedCartItem={setSelectedCartItem}
                        selectedCartItem={selectedCartItem}
                        popupHeader={'Quick Product Overview'}
                        isConsultation={false}
                        item={item as IProduct}
                        setShowSnakbar={setShowSnakbar}
                    />
                </div>}
            {collections.handle && (collections?.properties?.footerImageDesktop || collections?.properties?.footerImageMobile) ? <div className='footer-banner'>
                <img src={isMobile() ? collections.properties.footerImageMobile : collections.properties.footerImageDesktop} alt={`Footer - ${collections.handle}`} />
            </div> : null}
        </div>
    )
}

export default React.memo(CollectionSection)