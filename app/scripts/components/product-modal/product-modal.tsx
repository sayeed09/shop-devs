import React, {useContext, useEffect,useState} from 'react';
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import { productDetailsModal, ProductOptionModal, ProductResponseModal, ProductVariant } from '../../interface/product';
import { IProduct } from '../../interface/search-product-list';
import { productService } from '../../services/product';
import ProductOptionItem from './product-option-item';
import { formatPriceWithCurrency } from '../../utils/cart/formatter';
import { ButtonLoader } from '../../../icons/button-loader';
import ReactDOM  from 'react-dom';
import { GAContext } from '../../context/gatracking';


interface IProps {
  item: IProduct;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  addToCart: (variantId: string) => void;
  isShowLoading: boolean;
  isFlavourAvailable: boolean | undefined;
  isSizeAvailable: boolean | undefined;
}

const ProductModal = ({openModal, setOpenModal, item, addToCart, isShowLoading, isFlavourAvailable, isSizeAvailable}: IProps) => {

  const [selectedOptions, setSelectedOptions] = useState<string[] | undefined>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [variantTitle, setVariantTitle] = useState<string>();
  const [productDetail, setProductDetail] = useState<productDetailsModal>();
  const [loader, setLoader] = useState(true);
  const gaTrackingEvent = useContext(GAContext);

  const filterProductsVisiblity = (variantList: ProductVariant[]) => {
    return variantList?.filter(
      (variantItem: ProductVariant) => variantItem?.visibileOnPdp && variantItem.option3 !== 'Routine'
    );
  }

  const getProductDetails = () => {
    productService.getProductDetails(item.productId, 'collection', true, false).then((productDetails: ProductResponseModal) => {
      productDetails.data.variants = productDetails.data.variants.filter((item, index) => item.option3 !== 'Routine');
      setProductDetail(productDetails.data);
      const getFirstSelectedVariant = filterProductsVisiblity(productDetails?.data?.variants).sort((a, b) => a.position - b.position)[0];
      setSelectedVariant(getFirstSelectedVariant);
      const selectedOptionArray: string[] = [];
      if (getFirstSelectedVariant?.option1 || getFirstSelectedVariant?.option2) {
        selectedOptionArray.push(getFirstSelectedVariant?.option1, getFirstSelectedVariant?.option2); 
        setSelectedOptions(selectedOptionArray);
      }
      setLoader(false);
    }).catch((error) => {
      console.log("Error : ", error);
      setLoader(false);
    });
  }

  const getVariantInformation = () => {
    productService.getVaraintDetails(selectedVariant?.id)
    .then((variantDetails) => {
      setVariantTitle(variantDetails.data.title);
    }).catch((error) => {
      console.log("Error : ", error);
    });
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (selectedVariant?.id) {
      getVariantInformation(); 
      gaTrackingEvent('variant_change', {
        items: [{
          item_id: item.productId,
          item_name: item.title,
          currency: 'INR',
          item_brand: 'OZiva',
          price: selectedVariant?.price
        }]
      });
    }
  }, [selectedVariant]);
  
  const sortedProductOptionsByPosition =
    productDetail?.options &&
    productDetail?.options.sort(
      (a: ProductOptionModal, b: ProductOptionModal) => a.position - b.position,
    );
  

  const getProductOption = (item: string, key: number) => {
    const temp = selectedOptions && [...selectedOptions];
    if (temp) {
      temp[key - 1] = item;
    } 
    setSelectedOptions(temp);
  }
  
  return ReactDOM.createPortal(
    <>
        <div className="footer-icons-col size-flavour-modal">
        {openModal && (
          <div
            data-ml-modal
            id="authentic"
            className="modal-with-head footer-icon-popup target-modal"
          >
            <a
              className="modal-overlay"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            ></a>
            <div className="modal-dialog position-relative out-of-stock-modal-dialog">
              <a
                className="close-modal cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <ProductModalCloseIcon />
              </a>
              <div className="modal-content center">
                <h3 className="modal-head text-left">{isFlavourAvailable ? "Select Flavour & Size" : "Select Size"}</h3>
                <div className='model-content-body'>
                  {
                    loader ? <div className="product-loader"></div> : 
                    productDetail && sortedProductOptionsByPosition?.map((productOption, optionKey, row) => {
                      return <ProductOptionItem productDetails={productDetail} productOption={productOption} optionKey={optionKey} row={row}getProductOption={getProductOption} selectedOptions={selectedOptions} setSelectedVariant={setSelectedVariant}/>
                    })
                  }
                </div>
                
                <div className='product-modal-footer'>
                  <p className='product-modal-footer-header text-left'>{variantTitle ? variantTitle : item.title}</p>
                  <div className='product-modal-horizontal-line'></div>
                  <div className='product-modal-footer-body'>
                    <div className='product-footer-price'>
                        <p className="product-total-mrp text-left">
                          Total MRP: {selectedVariant && (selectedVariant?.compareAtPrice > selectedVariant?.price ? 
                          <s>{formatPriceWithCurrency(selectedVariant?.compareAtPrice)}
                          </s> : null)} 
                          <span className="product-selling-price ml-2">{formatPriceWithCurrency(selectedVariant?.price)}
                          </span>
                        </p>
                        {selectedVariant && (selectedVariant?.compareAtPrice > selectedVariant?.price) ? <p className='product-footer-amount-save'>You save: {formatPriceWithCurrency(selectedVariant?.compareAtPrice - selectedVariant?.price)}</p> : null}
                    </div>
                    <div className='product-card-button product-card-v1'>
                      {
                        isShowLoading ? (
                        <div
                          className="ProductCardBtn"
                          style={{
                            background: '#F04E23',
                          }}
                        >
                          <ButtonLoader />
                        </div>
                      ) : (
                        <a
                          className="ProductCardBtn"
                          onClick={(e) => selectedVariant && addToCart(selectedVariant.id)}
                        >
                            ADD TO CART<div className="single_card_overlay"></div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  )
}

export default ProductModal;