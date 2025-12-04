import React, { useContext, useEffect, useState } from 'react';
import { productService } from '../../services/product';
import { formatPriceWithCurrency, getPrimeVariantId } from '../../utils/cart/formatter';
import { cartService } from '../../services/cart';
import { foundPrimeItemInCart } from '../../utils/cart/formatter';
import { FreebieRequestModel, FreebiesResponseModel } from '../../models/cart/freebies';
import { UserContext } from '../../context/user';
import { CurrentPrimeStatus } from '../../models/prime';
import { ProductResponseModal, ProductVariant, UserLoginValue } from '../../interface/product';
import { getAccessToken } from '../../utils/product/formatter';
import { getENVSpecificPrimeItemId } from '../../utils/product/constants';

interface ICurrentStatus {
  currentStatus: string;
}

const AddUpgradeToPrime = ({ currentStatus }: ICurrentStatus) => {
  const primeStatus = currentStatus;
  const [alreadyHasPrimeInCart, setAlreadyHasPrimeInCart] = useState(false);
  let authorizationToken: UserLoginValue | null = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [primeVariantDetails, setPrimeVariantDetails] = useState<ProductVariant>();

  useEffect(() => {
    productService.getProductDetails(getENVSpecificPrimeItemId, 'pdp', true, false).then((productDetails: ProductResponseModal) => {
      const filteredPrimeProduct = productDetails.data.variants.filter(variants => variants.id === `${getPrimeVariantId()}`)[0];
      setPrimeVariantDetails(filteredPrimeProduct);
    });
  }, []);

  const handlePrimeBannerClick = () => {
    setLoading(true)
    if (alreadyHasPrimeInCart) {
      // If prime is already added into cart then move to cart
      window.location.href = '/cart';
    } else {
      const primeVariantId = getPrimeVariantId();
      const payloadItemList: any = [{ id: primeVariantId, quantity: 1 }];
      const payloadObject = {
        items: payloadItemList,
      };
      productService
        .addItems(payloadObject)
        .then((res) => {
          const increaseCartCount = new CustomEvent('updateCartItemCount', {});
          document.dispatchEvent(increaseCartCount);
          window.location.href = '/cart';
          // setShowSnakbar(true);
          setLoading(false)
        })
        .catch((e) => {
          console.log('Product not available', e);
        });
    }
  };

  const checkForPrime = async () => {
    cartService.getCartItems().then((data) => {
      const variantIds = data.items?.map((product) => {
        return product.variant_id;
      });
      const isPrimePresent = foundPrimeItemInCart(variantIds);
      setAlreadyHasPrimeInCart(isPrimePresent);
    });
  };

  useEffect(() => {
    checkForPrime();
  }, []);
  const showLogin = () => {
    const event = new Event('handleLogin');
    document.dispatchEvent(event);
  };

  return (
    <section>
      {/* <button
        style={{
          outline: 'none',
          padding: 0,
          border: 'none',
          display: 'block',
          background: 'none',
        }}
        className="d-block"
        onClick={() => handlePrimeBannerClick()}
      >
        <picture>
          <source
              media="(min-width: 491px)"
              srcSet={primeStatus == 'never_prime' || primeStatus == 'free_trial'
              ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_Add-Now_Web_0312876c-d57c-4370-8f3f-f440465b8b95.png?v=1699253523'
              : 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_Renew_Web_bc0b6dd7-caf5-4906-824c-f708cdb086dd.png?v=1699253522'}
          />
          <source
              media="(max-width: 490px)"
              srcSet={primeStatus == 'never_prime' || primeStatus == 'free_trial'
              ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_add_now.png?v=1699253522'
              : 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_Renew_40927aab-ca50-49ed-b8cc-772676052b38.png?v=1699253522'}
          />
          <img
              className="lazyload banner-image-click d-block"
              style={{ width: "100%", borderRadius: 6 }}
              alt="OZiva Prime Membership Benefits"
          />
        </picture>
      </button> */}
      <div className='prime-sections prime-benefits-section oz-prime-card' style={{ marginBottom: 0 }}>
        <h2 className="d-flex" style={{ marginBottom: 0 }}>
          {primeStatus == CurrentPrimeStatus.EXPIRED || primeStatus == CurrentPrimeStatus.FREE_TRAIL_EXPIRED ? 'Renew NOW!' : 'Be a Prime Member'}
        </h2>
        <div className='sub-heading mt-8 mb-8 '>
          {primeStatus == CurrentPrimeStatus.EXPIRED || primeStatus == CurrentPrimeStatus.FREE_TRAIL_EXPIRED ? 'Continue enjoying the benefits of Prime membership at 97% discount.' : 'Enjoying the benefits of Prime membership at 97% discount.'}
        </div>
        <div className='price-detail'>
          MRP: <del>{formatPriceWithCurrency(primeVariantDetails?.compareAtPrice)}</del>  <span>{formatPriceWithCurrency(primeVariantDetails?.price)}</span>
        </div>
        <div className='save-txt mt-4 mb-16'>
          You save: {formatPriceWithCurrency(primeVariantDetails?.compareAtPrice - primeVariantDetails?.price)}
        </div>
        <div className='atc-btn'>
          <div className='btn btn-primary atc-btn-txt' onClick={() => handlePrimeBannerClick()} style={loading ? { opacity: 0.5 } : {}}>
            ADD TO CART NOW!
          </div>
        </div>

      </div>
      {!authorizationToken?.accessToken &&
        <span className='prime-login-txt'>{`Already A Prime Member? `}
          <span onClick={() => showLogin()} style={{ cursor: 'pointer' }}>
            LOGIN
          </span>
        </span>}
    </section>
  );
};

export default AddUpgradeToPrime;
