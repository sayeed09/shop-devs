import React from 'react';

interface IProps {
  count?: number;
  backgroundColor?: string;
}
const ProductCardSkeleton = (props: IProps) => {
  return (
    <>
      {[...Array(props.count || 1)].map((item, index) => {
        return (
          <section className="skeleton-section" key={index}>
            <div className="skeleton-container" >
              <div className="content skeleton-card is-loading product-card-skeleton" style={{backgroundColor: props.backgroundColor}}>
                <div className="flavour-list">
                  <span className="product-card-skeleton-img" />
                  <h2 />
                  <div className="oz-tag-group">
                    <p className="option-button" />
                    <p className="option-button" />
                  </div>
                  <span className="mt-8" />
                  <span className="mt-8" />
                  <span className="mt-16" style={{ height: 42 }} />
                </div>
                <div className="flavour-list">
                  <span className="product-card-skeleton-img" />
                  <h2 />
                  <div className="oz-tag-group">
                    <p className="option-button" />
                    <p className="option-button" />
                  </div>
                  <span className="mt-8" />
                  <span className="mt-8" />
                  <span className="mt-16" style={{ height: 42 }} />
                </div>
                <div className="flavour-list">
                  <span className="product-card-skeleton-img" />
                  <h2 />
                  <div className="oz-tag-group">
                    <p className="option-button" />
                    <p className="option-button" />
                  </div>
                  <span className="mt-8" />
                  <span className="mt-8" />
                  <span className="mt-16" style={{ height: 42 }} />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
export default ProductCardSkeleton;
