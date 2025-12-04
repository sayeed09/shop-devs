import React from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';


interface IProps {
  setOpenPopup: (openPopup: boolean) => void;
}

const Popup = ({setOpenPopup}: IProps) => {
  
  return (
    <>
        <div className="footer-icons-col">
          <div
            data-ml-modal
            id="authentic"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setOpenPopup(false);
              }}
            ></a>
            <div className="modal-dialog position-relative out-of-stock-modal-dialog">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setOpenPopup(false);
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
              <picture>
                  <source media="(max-width: 430px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/whats_included_pop_up_mobile_size_png_650x800.png?v=1732160964'}/>
                  <source media="(max-width: 720px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/whats_included_pop_up_mobile_size_png_850x1000.png?v=1732160964'} />
                  <source media="(min-width: 721px)" srcSet={'https://cdn.shopify.com/s/files/1/2393/2199/files/whats_included_pop_up_desktop_size.png?v=1732160964'} />
                  <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/whats_included_pop_up_desktop_size.png?v=1732160964'} width="100%" alt={"Fertility hero banner"} />
              </picture>
              </div>
            </div>
          </div>
      </div>
    </>
    
  )
}

export default Popup;