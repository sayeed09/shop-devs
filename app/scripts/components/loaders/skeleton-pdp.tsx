import React, { useContext } from 'react';
import { DocumentWidthContext } from '../../context/documentWidth';
import {
  convertImageSize,
  maxMobileWidth,
} from '../../utils/product/formatter';

interface Props {
  productImage: string,
  loadingImage?: string,
  loadingText?: string
}
const SkeletonPdp = ({ productImage, loadingImage, loadingText }: Props) => {
  const documentWidth = useContext(DocumentWidthContext);
  /* UDS-673 start */

  if (loadingImage && loadingText) {
    return <>
      <div className="loading-container">
        <div className="loading-img">
          <img src={loadingImage} />
        </div>
        <div className="title">
          {loadingText.split(".")[0]}.
        </div>
        <div className="title">
          {loadingText.split(".")[1]}
        </div>
      </div>
    </>
  }
  /* UDS-673 end */

  return (
    <section className="skeleton-section">
      <div className="skeleton-container">
        <div className="skeleton-row">
          <div className="skeleton-col">
            <div className="skeleton-card">
              <div className="image" style={{ aspectRatio: '1/1' }}>
                <img
                  height="100%"
                  width="100%"
                  className="iiz__img"
                  alt='skeleton'
                  src={
                    documentWidth < maxMobileWidth
                      ? convertImageSize(
                        `https://cdn.shopify.com/s/files/1/2393/2199/${productImage}`,
                        400,
                        400,
                      )
                      : convertImageSize(
                        `https://cdn.shopify.com/s/files/1/2393/2199/${productImage}`,
                        800,
                        800,
                      )
                  }
                />
              </div>
            </div>
          </div>
          <div className="skeleton-col">
            <div className="content skeleton-card is-loading">
              <h1></h1>
              <ul className="cart-tag-list">
                <li></li>
                <li></li>
              </ul>
              <p></p>
              <div>
                <div>
                  <h3></h3>
                  <span></span>
                </div>
              </div>
              <hr className="my-16" />
              <div className="flavour-list">
                <li className="mb-16"></li>
                <div className="oz-tag-group">
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                </div>
              </div>
              <hr className="my-16" />
              <div className="flavour-list">
                <li className="mb-16"></li>
                <div className="oz-tag-group">
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                  <p className="option-button"></p>
                </div>
              </div>
              <hr className="my-16" />
              <li className="mb-16"></li>
              <div className="buy-button"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkeletonPdp;


export const SectionSkeleton = () => (<div className="container content  skeleton-card is-loading section">
  <span />
</div>)