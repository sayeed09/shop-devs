import React from 'react';
import IngredientsItem from '../../components/product/ingredientsItem';
import {
  ConfigModal,
  HighlightElement,
  productDetailsModal,
} from '../../interface/product';

interface ProductIngredientsModal {
  productDetail: productDetailsModal;
}

const ProductIngredients = (props: ProductIngredientsModal) => {
  return (
      <>
        {props.productDetail?.whatMakesItGood?.data.length > 0 ? (
          <div className="product-left-sec how-to-use-sec p-16 border borderGray rounded-sm">
            <h2 className="mb-16">{props.productDetail?.whatMakesItGood?.title}</h2>
            <div className="d-flex">
              {props.productDetail?.whatMakesItGood?.data?.map(
                (item: HighlightElement, i: number) => {
                  return <IngredientsItem key={i} item={item} />;
                },
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
  );
};
export default ProductIngredients;
