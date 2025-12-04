import React, { useContext, useEffect, useState } from 'react';
import '../../scss/import/_collection.scss';
import '../../scss/oziva-site.scss';
import '../../scss/import/_skeleton.scss';
import '../../scss/import/_concern-category.scss';
import '../../scss/home-style.scss';
import {
  IProductReviewObject,
  IProductReviewsResponse,
} from '../../interface/product';
import {
  ICollectionBanner,
  Product,
} from '../../models/home';
import { collectionService } from '../../services/collection';
import ProductCard from '../../components/productCardV1/productCard';
import { IProduct } from '../../interface/search-product-list';
import '../../scss/oziva-search-product-page.scss';
import { productService } from '../../services/product';
import InfiniteScroll from 'react-infinite-scroller';
import { SentryProvider } from '../../context/errorTracking';
import { GAContext } from '../../context/gatracking';
import { Provider as AuthenticationProvider } from '../../context/authentication';
import { MixPanelContext } from '../../context/mixpanelContext';
import ProductCardSkeleton from '../../components/loaders/product-card-skeleton';
import QuickBuyCard from '../../components/productCard/quick-buy-card';
import ConcernCategoryHeader from '../../components/concern-categories/header';
import { isMobile } from '../../utils/helper';
import Flickity from 'react-flickity-component';
import 'flickity-fullscreen';
import { fireCategoryViewFloodlight } from '../../utils/tracking/yoptima';

const PRODUCT_FETCH_LIMIT = 18;
interface IProps {
  handle?: string;
  concernTitle?: string;
  bannerImageL1?: String;
  hideCollectionTitle?: boolean;
  backgroundColor?: string;
  hideQuickBuyCard?: boolean;
  fetchLimit?: number;
  disableLoadMore?: boolean;
  isHorizontal?: boolean;
  setShowSnakbar?: (value: boolean) => void;
  disableRedirect?: boolean;
  handleProductClick?: (product: Product) => void;
}

const productFlickityOptions = {
  imagesLoaded: true,
  groupCells: true,
  prevNextButtons: true,
  contain: true,
  pageDots: true,
  lazyLoad: 2,
};

const Collection = ({ handle, concernTitle, bannerImageL1, hideCollectionTitle, hideQuickBuyCard, backgroundColor = '#FFF', fetchLimit, disableLoadMore, isHorizontal, setShowSnakbar,
  disableRedirect, handleProductClick }: IProps) => {

  const [reviews, setReviews] = useState<IProductReviewObject[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [collectionHandle, setCollectionHandle] = useState(handle);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [collectionTitle, setCollectionTitle] = useState('');
  const { trackMixpanelEvent } = useContext(MixPanelContext);
  const gaTrackingEvent = useContext(GAContext);
  const [bannerImage, setBannerImage] = useState<String>();


  const urlPath = window.location.pathname;
  useEffect(() => {
    if (urlPath.split('collections/').length > 0 && !handle) {
      let collectionHandle = urlPath.split('collections/')[1];
      setCollectionHandle(collectionHandle);
      getCollectionProducts(collectionHandle, 1);
    }
    if (handle) {
      getCollectionProducts(handle, 1);
    }
  }, [handle]);
  useEffect(() => {
    const pathName = window.location.pathname;
    let handle = "";

    const paths = ['/pages/concerns', '/pages/collections', '/collections'];

    const matchedPath = paths.find(p => pathName.startsWith(p));
    if (matchedPath) {
      handle = pathName.replace(matchedPath, "").replace(/^\/+/, "");
      fireCategoryViewFloodlight(handle);
    }

  }, [])
  useEffect(() => {
    if (collectionTitle != "") {
      trackMixpanelEvent("Collection Viewed", {
        $collectionTitle: collectionTitle,
      });
      const gaItems = getGAItems(products);
      const gaAttributes = {
        item_list_id: collectionHandle,
        item_list_name: collectionTitle,
        items: gaItems
      }
      gaTrackingEvent('view_item_list', gaAttributes);
    }
  }, [collectionTitle]);


  const getGAItems = (products) => {
    if (products && products.length > 0) {
      const gaItems = products.map((item, index) => {
        return {
          item_id: item.id,
          item_name: item.title,
          currency: "INR",
          discount: item.compareAtPrice - item.price,
          item_variant: item.variant_title,
          price: item.price,
        };
      });
      return gaItems;
    }
  }

  const getCollectionProducts = async (handleName: string, pageNo: number) => {
    const responseData =
      await collectionService.fetchProductsByCollectionHandle(
        handleName,
        pageNo,
        fetchLimit || PRODUCT_FETCH_LIMIT,
      );
    let productList: Product[] = [];
    let infoCardContainer: string = "";
    if (pageNo == 1) {
      productList = [...responseData.data.products];
    } else {
      productList = [...products, ...responseData.data.products];
    }
    const bannerImage: ICollectionBanner[] = responseData?.data?.banners;

    if (bannerImage && bannerImage.length > 0) {
      if (isMobile()) {
        infoCardContainer = bannerImage[0].mobileImage;
      } else {
        infoCardContainer = bannerImage[0].desktopImage;
      }
    }
    setBannerImage(bannerImageL1 ? bannerImageL1 : infoCardContainer);
    setProducts(productList);
    setCollectionTitle(responseData.data.title)
    getStarReviews(responseData.data.products.map((item) => item.id));

    setTimeout(() => {
      setHasMoreItems(responseData.data.products.length > 0 ? true : false);
    }, 500);
    setLoading(false);
  };
  const getProduct = (product: Product) => {
    const review = reviews.filter(
      (currentReview) => currentReview.id == product.id,
    );
    const currentProduct: IProduct = {
      variantId: product.variantId,
      productId: product.id,
      title: product.title,
      price: product.price.toString(),
      compareAtPrice: product.compareAtPrice.toString(),
      benefits: product.benefits,
      handle: product.handle,
      image: product.image,
      averageRating: review.length > 0 ? review[0].averageRating : '',
      numberOfReviews: review.length > 0 ? review[0].numberOfReviews : '',
      productTag: {
        name: product.productTag?.name,
        color: product.productTag?.color,
      },
      benefitsNew: product.benefitsNew,
      options: product.options,
    };
    return currentProduct;
  };
  const getStarReviews = (productIds: string[]) => {
    const payload = { ids: productIds };
    productService
      .getStarReviewDetails(payload)
      .then((response: IProductReviewsResponse) => {
        if (response?.data?.product?.length) {
          setReviews((reviews) => [...reviews, ...response?.data?.product]);
        }
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  };
  useEffect(() => {
    if (pageNo > 1 || collectionHandle) {
      if (collectionHandle)
        getCollectionProducts(collectionHandle, pageNo);
    }
  }, [pageNo, collectionHandle]);

  const loadMore = () => {
    // TODO:// This is hotfixed, need to get this fixed using another ticket
    const pathName = window.location.pathname;
    const isConcernOrCategories = pathName.indexOf('pages/concerns') > -1 || pathName.indexOf('pages/collections') > -1 ? true : false;
    if (isConcernOrCategories) return;
    setHasMoreItems(false);
    if (products.length == fetchLimit || PRODUCT_FETCH_LIMIT)
      setPageNo((pageNo) => pageNo + 1);
  };
  if (products.length === 0 && isLoading) {
    return (
      <>
        <ProductCardSkeleton count={3} backgroundColor={backgroundColor ? backgroundColor : '#FFF'} />
      </>
    );
  }


  return (
    <SentryProvider>
      <AuthenticationProvider>
        {urlPath.indexOf('collections') > -1 && <ConcernCategoryHeader
          groupType='CATEGORY' setSelectedGoal={setCollectionHandle}
          collectionHandle={collectionHandle}
          setBannerImageL1={setBannerImage}
        />}
        <div className="oz-collection-page-content collections-lists" style={{ background: `${backgroundColor} !important` }}>
          {!hideCollectionTitle ? <div className='collections-lists-header'>
            {collectionTitle && <div className='col-left-title'>
              {concernTitle && <>{concernTitle} : </>} {collectionTitle}
            </div>}
            {products.length > 0 && <div className='col-right-no-item'>
              {products.length} Products
            </div>}
          </div> : null}
          {/* {showHairTestBanner ?
            <HairTestBanners className='pb-16 collection-ht-entry' refUrl={collectionHandle} /> : */}
          {!hideQuickBuyCard ? <QuickBuyCard /> : null}
          {isHorizontal ?
            <div className={`oz-collection-product-card-listing-testB-carousels`}>
              <Flickity
                className="carousel carousel-main"
                elementType={'div'}
                options={productFlickityOptions}
                reloadOnUpdate
              >
                {products.map((product, index) => {
                  return (
                    <div className='oz-collection-homepage-product-card'>
                      <ProductCard
                        key={product.id}
                        item={getProduct(product)}
                        setShowSnakbar={() => {
                          if (setShowSnakbar) setShowSnakbar(true)
                        }}
                        disableRedirect={disableRedirect}
                        handleClick={() => handleProductClick ? handleProductClick(product) : {}} />
                    </div>
                  );
                })}
              </Flickity>
            </div> : <div className="oz-collection-container">
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMoreItems && !disableLoadMore}
                threshold={500}
              >
                <div
                  className="oz-collection-product-card-listing collections-lists"
                  id="product-listing"
                >
                  {products.slice(0, 1).map((product: Product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        item={getProduct(product)}
                        setShowSnakbar={() => {
                          if (setShowSnakbar) setShowSnakbar(true)
                        }}
                        disableRedirect={disableRedirect}
                        handleClick={() => handleProductClick ? handleProductClick(product) : {}}
                      />
                    );
                  })}
                  {!hideCollectionTitle ? bannerImage && <div className='product-card-box-v1 product-card-v1'>
                    <img src={`${bannerImage}`} width={'100%'} />
                  </div> : null}
                  {products.slice(1, products.length).map((product: Product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        item={getProduct(product)}
                        setShowSnakbar={() => {
                          if (setShowSnakbar) setShowSnakbar(true)
                        }}
                        disableRedirect={disableRedirect}
                        handleClick={() => handleProductClick ? handleProductClick(product) : {}}
                      />
                    );
                  })}

                </div>
              </InfiniteScroll>
            </div>}

        </div>

      </AuthenticationProvider>
    </SentryProvider >
  );
};


export default Collection;
