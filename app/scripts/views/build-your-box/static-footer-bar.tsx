import React, { useContext } from 'react';
import { ButtonLoader } from '../../../icons/button-loader';
import GenerateProductBox from '../../components/build-your-box/generateProductBox';
import { BuildYourBoxDetailProvider, getVariantsFromStorage } from '../../utils/build-you-box/helper';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { IBYBItem } from '../../interface/build-your-box';
import { GAContext } from '../../context/gatracking';
import { IGAItem, IMixpanelCart } from '../../interface/tracking';
import { cleanPriceString } from '../../utils/tracking/gaTracking';
import { MixPanelContext } from '../../context/mixpanelContext';
import { FBPixelMultiItem, fireFBPixelEvent, fireFBPixelMultiItemEvent } from '../../utils/fbPixelUtils';
import { MoengageCartItem, MoengageTracking } from '../../utils/tracking/moengage';
interface IStaticFooterBar {
  handleRemoveProduct: (id: number) => void;
  selectedVariants: IBYBItem[];
  BYBCollectionData: IBYBItem[];
  savedAmount: number;
  loading: boolean;
  handleBoxClickButton: () => void;
  collectionHandle: string;
}

export default function StaticFooterBar({
  handleRemoveProduct,
  selectedVariants,
  BYBCollectionData,
  savedAmount,
  loading,
  handleBoxClickButton,
  collectionHandle
}: IStaticFooterBar) {
  const gaTrackingEvent = useContext(GAContext);
  const { trackMixpanelEvent } = useContext(MixPanelContext);

  // Code refactoring needed as methods can be defined here as well
  // for example handleBoxClickButton can come here as well

  const handleBoxClickButtonV1 = () => {
    try {
      const attributes: IGAItem[] = [];
      const mixpanelCart: IMixpanelCart[] = [];
      const moengageCartItems: MoengageCartItem[] = [];
      const metaPixelCartItems: FBPixelMultiItem[] = [];

      selectedVariants.forEach((item: IBYBItem) => {
        const index = attributes.findIndex((p) => p.item_id === item.id);

        const unitPrice = (cleanPriceString(item.price) || 1);

        if (index < 0) {
          //NEW 
          const gaItem: IGAItem = {
            item_id: item.id,
            item_name: item.title,
            currency: "INR",
            item_brand: "OZiva",
            price: unitPrice,
            quantity: 1
          };

          const mixpanelItem: IMixpanelCart = {
            "Product Name": item.title,
            "Product Price": String(unitPrice),
            "Product ID": item.id,
            "Variant ID": item.variantId,
            "Quantity": 1,
            "Discount Code": "BYB"
          };

          const moengageItem: MoengageCartItem = {
            price: String(unitPrice),
            product_id: item.id,
            product_name: item.title,
            quantity: 1,
            variant_id: item.variantId
          };

          const metaPixelItem: FBPixelMultiItem = {
            price: unitPrice,
            productId: item.id,
            productTitle: item.title,
            quantity: 1,
            variantId: item.variantId
          }

          attributes.push(gaItem);
          mixpanelCart.push(mixpanelItem);
          moengageCartItems.push(moengageItem);
          metaPixelCartItems.push(metaPixelItem)

        } else {
          //INCREMENT EXISTING
          attributes[index].quantity++;

          mixpanelCart[index].Quantity++;
          moengageCartItems[index].quantity++;
          metaPixelCartItems[index].quantity++;
        }
      });


      fireFBPixelMultiItemEvent({
        event: "AddToCart",
        items: metaPixelCartItems
      });
      gaTrackingEvent('add_to_cart', { items: attributes });
      trackMixpanelEvent("Product Added", {
        $currency: "INR",
        $page_title: document.title,
        $brand: "OZiva",
        cart: mixpanelCart
      })


      MoengageTracking.trackAddToCart(moengageCartItems);
    } catch (error) {
      console.log('Error in tracking event', error);
    }
    handleBoxClickButton();
  };

  return (
    <section className="byb-sticky-footer product-card-v1">
      <div className="byb-sticky-products">
        <GenerateProductBox
          handleRemoveProduct={handleRemoveProduct}
          selectedVariants={selectedVariants}
          BYBCollectionData={BYBCollectionData}
          collectionHandle={collectionHandle}
        />
      </div>
      <div className="byb-sticky-nav">
        <div className="byb-sticky-price">
          <div style={{ textAlign: 'left' }}>
            <div>BOX TOTAL {formatPriceWithCurrency(BuildYourBoxDetailProvider[collectionHandle as string]?.price)}</div>
            {selectedVariants.length === BuildYourBoxDetailProvider[collectionHandle as string]?.quantity ? (
              <div className="byb-saving-price">
                You saved {formatPriceWithCurrency(savedAmount)}
              </div>
            ) : null}
          </div>
        </div>
        <div className="byb-sticky-btn">
          {loading ? (
            <div
              className="btn btn-primary"
              style={{ height: '40px', padding: '6px' }}
            >
              <ButtonLoader />
            </div>
          ) : (
            <a
              href="javascript:void(0)"
              className={`btn btn-primary byb-btn ${selectedVariants && selectedVariants.length < (BuildYourBoxDetailProvider[collectionHandle as string]?.quantity || 4) ? 'disabled' : ''}`}
              onClick={() => handleBoxClickButtonV1()}
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
