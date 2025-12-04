import React, { useEffect, useState, useContext } from 'react';
import Flickity from 'react-flickity-component';
import Skeleton from '../../components/loaders/skeleton';
import { GetUpsellResponse } from '../../models/cart/get-response';
import { cartService } from '../../services/cart';
import { getVariantIds } from '../../utils/product/formatter';
import { ProductContext } from '../../context/product';
import { productDetailsModal } from '../../interface/product';
import ProductCard from '../../components/productCard/productCard';
import { IProduct } from '../../interface/search-product-list';
import { getMultiStarReviews } from '../../utils/common-functions';

const flickityOptions = {
  contain: true,
  pageDots: false,
  groupCells: 1,
  cellAlign: 'left',
};

interface PeopleUpsellSectionModal {
  productId: string;
  productDetail: productDetailsModal;
  isOutOfStock: boolean
  setShowSnakbar?: (value) => void;
}

const PeopleUpsellSection = (props: PeopleUpsellSectionModal) => {
  const { state: productState } = useContext(ProductContext);
  const [upsellList, setUpsellList] = useState<IProduct[]>([]);
  const [upsellDataLoading, setUpsellDataLoading] = useState(true);
  useEffect(() => {
    if(productState?.componentState?.isBottomSectionLoad){
      getUpsellData();
    }
  }, [productState?.componentState?.isBottomSectionLoad]);
  const getUpsellData = () => {
    cartService
      .getUpsellList(getVariantIds(props.productDetail))
      .then((data: GetUpsellResponse[]) => {
        setUpsellDataLoading(false);
        const products = data?.map((item, i)=> item.product_id);
        getMultiStarReviews(products).then((reviewData:any)=>{
          let productDetails : IProduct[] = []
          for (const item of data) {
            for (const reviewObj of reviewData) {
              if(item.product_id==reviewObj.id){
                const product: IProduct =  {
                  variantId: item.variant_id,
                  productId: item.product_id,
                  title: item.title,
                  price: String(item.price),
                  compareAtPrice: String(item.compare_at_price),
                  benefits: item.benefits || [],
                  handle: item.product_handle,
                  image: item.image || '',
                  averageRating: reviewObj.averageRating,
                  numberOfReviews: reviewObj.numberOfReviews
                }
                productDetails.push(product)
                break;
              }
            }
          }
          setUpsellList(productDetails);
        })
      })
      .catch((error) => {
        setUpsellDataLoading(false);
        console.log('Get upsell data error', error);
      });
  };
  if (upsellDataLoading) {
    return (<div className="container mb-32" style={{overflow:'auto'}}>
      <Skeleton width="273px" height="396px" count={4} margin="8px" />
    </div>)
  }
  return upsellList.length > 0 ? (
    <>
      {
        !props.isOutOfStock ?
        <div className="container">
          <div className="people-also-bought pt-16 pb-16 border borderGray rounded-sm mb-32">
            <h2 className="mb-16">People Also Bought</h2>
            <div className="products-list-group">
              <Flickity
                className={'carousel carousel-nav'}
                elementType={'div'}
                options={flickityOptions}
                reloadOnUpdate
              >
                {upsellList.map((item) => {
                  return (<ProductCard
                    key={item.variantId}
                    item={item}
                    setShowSnakbar={props.setShowSnakbar}
                  />)
                  })}
              </Flickity>
              {/* END SLIDER THUMB  */}
            </div>
          </div>
        </div> :
        <div className="people-also-bought pt-16 pb-16 rounded-sm mb-32">
          <div className="products-list-group">
            <Flickity
              className={'carousel carousel-nav'}
              elementType={'div'}
              options={flickityOptions}
              reloadOnUpdate
            >
              {upsellList.map((item) => {
                  return (<ProductCard
                    key={item.variantId}
                    item={item}
                    setShowSnakbar={props.setShowSnakbar}
                  />)
                  })}
            </Flickity>
            {/* END SLIDER THUMB  */}
          </div> 
        </div>  
      }
    </>
  ) : (
    <></>
  );
};
export default PeopleUpsellSection;