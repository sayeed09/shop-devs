import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../productCardV1/productCard';
import {
  CollectionDataState,
  CollectionListState,
  Product,
  Section,
} from '../../models/home';
import CategorySectionItem from './category-section-item';
import { homeService } from '../../services/home';
import { productService } from '../../services/product';
import {
  IProductReviewObject,
  IProductReviewsResponse,
} from '../../interface/product';
import AddtocartSnackbar from '../productCard/addToCartSnackbar';
import ProductCardSkeleton from '../loaders/product-card-skeleton';
import { IProduct } from '../../interface/search-product-list';
import '../../../scripts/scss/import/_product-cards.scss';
import QuickBuyCard from '../productCard/quick-buy-card';
import Flickity from 'react-flickity-component';
import 'flickity-fullscreen';

interface IProps {
  sectionsData: Section[];
}

const productFlickityOptions = {
  imagesLoaded: true,
  groupCells: true,
  prevNextButtons: true,
  contain: true,
  pageDots: true,
  lazyLoad: 2,
};
const CategorySections = (props: IProps) => {
  const [selectedCollectionList, setSelectedCollectionList] = useState<
    CollectionListState[]
  >([]);
  const [collectionDataResponse, setCollectionDataResponse] =
    useState<CollectionDataState>({});
  const [reviews, setReviews] = useState<IProductReviewObject[]>([]);
  const [showSnakBar, setShowSnakbar] = useState(false);

  useEffect(() => {
    getInitialSelection();
  }, []);
  const fetchProductsByHandle = async (handle: string, title: string) => {
    const responseData = await homeService.fetchProductsByCollectionHandle(
      handle,
      1,
      6,
    );
    setCollectionDataResponse((collectionDataResponse) => ({
      ...collectionDataResponse,
      [title]: responseData,
    }));
    getStarReviews(responseData.data.products.map((item) => item.id));
  };
  const getInitialSelection = () => {
    const selectedList: CollectionListState[] = [];
    props.sectionsData.forEach((item) => {
      let data = {
        isActive: true,
        sectionTitle: item.title,
        loading: true,
        handle:
          item.subCollections.length > 0 ? item.subCollections[0].handle : item.handle,
      };
      selectedList.push(data);
      fetchProductsByHandle(data.handle, item.title);
    });
    setSelectedCollectionList(selectedList);
  };
  const getIsActive = (sectionTitle, handle) => {
    if (selectedCollectionList.length > 0) {
      return selectedCollectionList.filter(
        (item) => item.sectionTitle == sectionTitle && item.handle == handle,
      ).length > 0
        ? true
        : false;
    } else {
      return false;
    }
  };
  const renderSection = (item: Section, index: number) => {
    const handleOnClickCategory = (handle: string, sectionTitle: string) => {
      const data = {
        isActive: true,
        sectionTitle: sectionTitle,
        loading: true,
        handle: handle,
      };
      setSelectedCollectionList((selectedCollectionList) => [
        ...selectedCollectionList.filter(
          (item) => item.sectionTitle !== sectionTitle,
        ),
        data,
      ]);
      fetchProductsByHandle(handle, sectionTitle);
    };
    if (item.subCollections.length == 0 && collectionDataResponse[item.title]?.data?.products.length == 0) {
      return <></>
    }
    return (
      <div className="HealthFitness_container homeSection" key={item.title}>
        <div className="title_container">
          <h2>
            <span>{item.title}</span>
          </h2>
          <a href={`/collections/${item.handle}`} className="view_all">
            View All
          </a>
        </div>
        {
          item.subCollections.length > 0 &&
          <div className="all_categories">
            {item.subCollections.map((subCollection) => {
              return (
                <CategorySectionItem
                  key={subCollection.handle}
                  collectionItem={subCollection}
                  isActive={getIsActive(item.title, subCollection.handle)}
                  handleOnClickCategory={(handle) =>
                    handleOnClickCategory(handle, item.title)
                  }
                />
              );
            })}
          </div>
        }
        {renderProducts(item)}
      </div>
    );
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
  const showSnakBarfunc = () => {
    if (showSnakBar) {
      setTimeout(() => {
        setShowSnakbar(false);
      }, 4000);
      return <AddtocartSnackbar />;
    }
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
      benefitsNew: product?.benefitsNew,
      options: product?.options,
    };
    return currentProduct;
  };
  const renderProducts = (item: Section) => {

    if (collectionDataResponse && collectionDataResponse[item.title]) {
      return (
        <>
        <div className={`oz-collection-product-card-listing-testB-carousels`}> 
          <Flickity
              className="carousel carousel-main"
              elementType={'div'}
              options={productFlickityOptions}
              reloadOnUpdate
            >
              {collectionDataResponse[item.title].data.products.map((product, index) => {
                return (
                  <div className='oz-collection-homepage-product-card'>
                    <ProductCard
                      key={product.id}
                      item={getProduct(product)}
                      setShowSnakbar={() => setShowSnakbar(true)}
                    />
                  </div>
                );
              })}
            </Flickity>
            </div>
        </>
      );
    }
    return (
      <>
        <ProductCardSkeleton count={3} />
      </>
    );
  };
  return (
    <>
      {showSnakBarfunc()}
      {props.sectionsData.map((item, index) => {
        return <>
          {renderSection(item, index)}
          {index == 0 && <QuickBuyCard />}
        </>

      })}
    </>
  );
};
export default CategorySections;
