import React, { useEffect, useState } from 'react';
import { IBYBItem } from '../../interface/build-your-box';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { productService } from '../../services/product';
import { ProductResponseModal, productDetailsModal } from '../../interface/product';
import Loader from '../../views/cart/loader';
interface IProps {
  setViewAllPopup: (showOfferModal: boolean) => void;
  addToBox: (variantId: string) => void;
  item: IBYBItem;
}
const Popup = ({ setViewAllPopup, addToBox, item }: IProps) => {
  const [productDetail, setProductDetails] = useState<productDetailsModal>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = () => {
    addToBox(item.variantId);
    setViewAllPopup(false);
  }

  const getProductDetails = () => {
    setLoading(true);
    productService
      .getProductDetails(item.id, 'pdp', true, false)
      .then((data: ProductResponseModal) => {
        setProductDetails(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Get product details error', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  
  return (
    <>
      <div className="modal-with-head footer-icon-popup target-modal" data-ml-modal="true">
        {
          loading ?
            <Loader /> : 
            <div className="modal-dialog byb-card-popup">
              <span
                className="close-modal cursor-pointer"
                onClick={() => {
                  setViewAllPopup(false);
                }}
              >
                <ProductModalCloseIcon />
              </span>
              <div className='modal-content center'>
                <div className='byb-card-popup-img'>
                  <img src={productDetail && productDetail?.images.length > 0 && productDetail?.images[1].src} alt={productDetail?.images[1].alt || ''} />
                </div>
                <div className='byb-card-popup-icon-list'>
                  {
                    productDetail && productDetail?.whatMakesItGood.data.length > 0 ?
                      productDetail?.whatMakesItGood.data.map((item) => {
                        return (
                          <>
                            <div className='byb-card-popup-icon-dtl'>
                              <div className='byb-card-popup-icon'>
                                <img src={item.image} alt="Anti-Wrinkle Blend" />
                              </div>
                              <div className='byb-card-popup-txt'>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </>
                        )
                      }) : null
                  }
                </div>
                <div className='byb-card-popup-btn'>
                  <a href='javascript:void(0)' className='btn btn-primary btn-block' onClick={() => handleClick()}>ADD TO BOX</a>
                </div>
              </div>
            </div>
        }
        
      </div>
    </>
  );
};
export default Popup;
