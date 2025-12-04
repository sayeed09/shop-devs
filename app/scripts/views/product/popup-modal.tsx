import React, {useEffect,useState} from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { productDetailsModal } from '../../interface/product';
import { hideScroll, initialScroll } from '../../utils/product/formatter';
import PeopleUpsellSection from './people-upsell';

interface IProps {
  productId: string;
  productDetail: productDetailsModal;
}

const PopupModal = (props:IProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [popupTime, setPopupTime] = useState<number>(5000);

  useEffect(() => {
    const timer = setTimeout(() => setOpenModal(true), popupTime);
    return () => clearTimeout(timer);
  }, [openModal]);
  return (
    <>
        <div className="footer-icons-col">
        {openModal && (
          <div
            data-ml-modal
            id="authentic"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setOpenModal(!openModal), initialScroll();
              }}
            ></a>
            <div className="modal-dialog position-relative out-of-stock-modal-dialog">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setOpenModal(!openModal), initialScroll();
                  setPopupTime(30000)
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
                <h3 className="modal-head text-left">People Also Bought</h3>
                <PeopleUpsellSection 
                  productId={props.productId}
                  productDetail={props.productDetail}
                  isOutOfStock={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
    
  )
}

export default PopupModal;