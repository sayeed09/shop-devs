import React, { useContext, useEffect, useRef, useState } from 'react';
import GoogleReviews from '../productv2/google-reviews';
import Popup from './Popup';
import { getFertilityData, productService } from '../../services/product';
import { productDetailsModal, ProductResponseModal, UserLoginValue } from '../../interface/product';
import ClinicallyProven from './clinically-proven';
import SuccessStory from './success-story';
import Testimonials from './testimonials';
import ProgramCrafted from './program-crafted';
import ProgramInformation from './program-information';
import FAQ from './faq';
import FertilityHeader from './fertility-header';
import { cartService } from '../../services/cart';
import { MixPanelContext } from '../../context/mixpanelContext';
import { FertilityData } from '../../models/fertility';
import Skeleton from '../loaders/skeleton';
import { checkoutRedirectURL } from '../../utils/endpoints';
import { GAContext } from '../../context/gatracking';
import { cleanPriceString } from '../../utils/tracking/gaTracking';
import { FertilityProductId } from '../../utils/product/constants';
import { isUserLoginRequired } from '../../actions/authentication';
import { getAccessToken } from '../../utils/product/formatter';
import { AuthenticationContext } from '../../context/authentication';
import { UserContext } from '../../context/user';
import Authentication from '../authentication/authentication';
import { fireFBPixelEvent } from '../../utils/fbPixelUtils';
        
const Fertility = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [productDetails, setProductDetails] = useState<productDetailsModal>();
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { distinctId } = useContext(MixPanelContext);
  const gaTrackingEvent = useContext(GAContext);
  const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
  const [fetchAddressProgress, setAddressFetchProgress] = useState(false);
  const [fertilityData, setFertilityData] = useState<FertilityData>();
  const { state: userState } = useContext(UserContext);
  const [proceedToChkt, setProceedToChk] = useState(false);

  const fetchFertilityData = async () => {
    const data = await getFertilityData();
    setFertilityData(data);
  };

  useEffect(() => {
    fetchFertilityData();
    productService.getProductDetails(FertilityProductId, 'pdp', true, false)
      .then((data: ProductResponseModal) => {
        setProductDetails(data.data);
        trackViewItem(data.data)
      });
  }, []);

  const trackViewItem = (product: productDetailsModal) => {
    const selectedVariant = productDetails?.variants[0];
    gaTrackingEvent('view_item', {
      currency: 'INR',
      value: Number(selectedVariant?.price),
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          discount: Number(selectedVariant?.compareAtPrice) - Number(selectedVariant?.price),
          index: 0,
          item_brand: 'OZiva',
          item_variant: product?.title,
          price: selectedVariant?.price,
          quantity: 1,
        },
      ],
    });
  }
  useEffect(() => {
    if (userState.isLoggedIn && proceedToChkt) {
      proceedToCheckout();
    }
  }, [userState.isLoggedIn]);

  useEffect(() => {
    if (!userState.isLoggedIn && !authenticationState.shipRocketAddressOptin) {
      setProceedToChk(true)
    }
  }, [authenticationState.shipRocketAddressOptin])

  useEffect(() => {
    if (authenticationState.shipRocketAddressFetchToken && fetchAddressProgress) {
      const fetchData = async () => {
        try {
          const response = await cartService.fetchAddressSaveProgress(authenticationState.shipRocketAddressFetchToken as string);
          if (response.data.status === "COMPLETED") {
            proceedToCheckout();
          } else {
            setTimeout(fetchData, 2000);
          }
        } catch (err) {
          setTimeout(fetchData, 2000);
        }
      };

      fetchData();

    }

  }, [authenticationState.shipRocketAddressFetchToken])


  const proceedToCheckout = () => {
    const authorizationToken: UserLoginValue | null = getAccessToken();
    if (!authorizationToken?.accessToken) {
      AuthenticationDispatch(isUserLoginRequired(true));
      setAddressFetchProgress(true)
      return;

    } else {
      const eventName = 'add_to_cart';
      const selectedVariant = productDetails?.variants[0];
      fireFBPixelEvent({
        event: "AddToCart",
        productId: productDetails?.id as string,
        productTitle: productDetails?.title as string,
        price: Number(cleanPriceString(selectedVariant?.price)),
        variantId: selectedVariant?.id,
      });
      const gaAttributes: any = [];
      const item = {
        item_id: productDetails?.id,
        item_name: productDetails?.title,
        currency: 'INR',
        item_brand: 'OZiva',
        item_variant: [
          selectedVariant?.option1,
          selectedVariant?.option2,
        ].join(),
        price: cleanPriceString(selectedVariant?.price),
        quantity: 1,
      };
      gaAttributes.push(item);
      gaTrackingEvent(eventName, { items: gaAttributes });
      cartService
        .proceedCheckout({
          line_items: [
            {
              variant_id: Number(productDetails?.variants[0].id),
              quantity: 1
            }
          ],
          discount_code: '',
          channel: 'shopify_web',
          page_url: window.location.href,
        }, distinctId)
        .then((data: any) => {
          if (data?.status) {
            window.location.href = `${checkoutRedirectURL}/?id=${data.data.checkout_id
              }&step=0`;
          }
        })
    }
  }

  return (
    <>
      <Authentication
        shouldPageRefresh={false}
      />
      {fertilityData ?
        <>
          <FertilityHeader setOpenPopup={setOpenPopup} handleBuyNow={proceedToCheckout} />
          <div className='fertility-content-container'>
            <ClinicallyProven clinicallyProven={fertilityData.ClinicallyProven} />
            <SuccessStory productDetails={productDetails} scrollRef={scrollRef} handleBuyNow={proceedToCheckout} />
            <Testimonials testimonials={fertilityData.testimonials} />
            <ProgramCrafted />
            <ProgramInformation programInformation={fertilityData.ProgramInformation} scrollRef={scrollRef} />
            <div className='oziva-pdp-web'>
              <GoogleReviews googleReview={fertilityData.GoogleReviews} />
            </div>
            <FAQ faq={fertilityData.FrequentlyAskedQuestion} />
          </div>
        </> :
        <>
          <Skeleton height="400px" width="100%" count={1} margin="8px 0px" />
          <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
          <Skeleton height="230px" width="100%" count={1} margin="8px 0px" />
        </>
      }

      {
        openPopup && <Popup setOpenPopup={setOpenPopup} />
      }
    </>
  )
}

export default Fertility