import React, { useContext, useEffect, useState } from 'react';
import { DownArrow } from '../../../icons/down-arrow';
import { ProductContext } from '../../context/product';
import { productService } from '../../services/product';
import {
  ProductDetails,
  getVariantInfoResponse,
  productDetailsModal,
} from '../../interface/product';
import { setProductTitle } from '../../actions/product';
import { setToLocalStorage } from '../../utils/helper';
interface ProductInformationModal {
  productDetail: productDetailsModal;
}



const ProductInformation = (props: ProductInformationModal) => {
  const { state: productState, dispatch: productDispatch } =
    useContext(ProductContext);
  const [variantDetails, setVariantDetails] = useState<ProductDetails>();
  useEffect(() => {
    if (productState.productDetails != null) {
      getProductVariantInformation();
    }
  }, [productState.productDetails]);
  const getProductVariantInformation = async () => {
    await productService
      .getVaraintDetails(productState.productDetails?.id)
      .then((data: any) => {
        if (Object.keys(data?.data)?.length === 0) {
          setToLocalStorage('ProductTitle', props?.productDetail?.title);
          productDispatch(setProductTitle(props?.productDetail?.title));
        } else {
          setToLocalStorage('ProductTitle', data?.data?.title);
          productDispatch(setProductTitle(data?.data?.title));
        }
        const sold_by = new Map();
        const sold_byArray: any[] = [];
        const manufatured_by = new Map();
        const manufatured_byArray: any[] = [];
        let productTitle: string;
        const productTitleArray: string[] = [];
        data.data.variants?.map((variantItem: getVariantInfoResponse) => {
          productTitleArray.push(variantItem?.title);
          productTitle = productTitleArray.join(' + ');
          if (!data?.data?.title) {
            setToLocalStorage('ProductTitle', productTitle);
            productDispatch(setProductTitle(productTitle));
          }

          sold_by.set(
            variantItem.inventory_details.sold_by.name,
            variantItem.inventory_details.sold_by.address,
          );
          manufatured_by.set(
            variantItem.inventory_details.manufatured_by.name,
            variantItem.inventory_details.manufatured_by.address,
          );
        });
        sold_by.forEach((value, key) => {
          sold_byArray.push({ name: key, address: value });
        });
        manufatured_by.forEach((value, key) => {
          manufatured_byArray.push({ name: key, address: value });
        });

        setVariantDetails({
          formatted_quantity: data.data.variants.filter((item) => item?.formatted_quantity).map((item) => item?.formatted_quantity),
          sold_by: sold_byArray,
          manufatured_by: manufatured_byArray,
          expiry_date: data.data.variants.filter((item) => item?.inventory_details?.expiry_date).map((item) => item?.inventory_details?.expiry_date),
          subtitle: data.data.variants.map((item) => item.subtitle)
        });
      })
      .catch((error) => {
        console.log('Get product varaint information error', error);
      });
  };
  return (
    <div className="tab">
      <input type="checkbox" id="ProdInfo" className="accordion-tab" />
      <label className="tab-label" htmlFor="ProdInfo">
        Manufacturing Details
        <span className="arrow-tab">
          <DownArrow />
        </span>
      </label>
      <div className="tab-content p-0">
        <div className="product-info">
          <table>
            <tbody>
              <tr>
                <th>Net quantity</th>
                <td className='d-flex-column'>
                  {variantDetails && variantDetails?.formatted_quantity.length > 0 ?
                    variantDetails?.formatted_quantity.map((item, index) => <span>{`${item} (${variantDetails.subtitle[index]}) `}</span>)
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Marketed By</th>
                <td>
                  {variantDetails?.sold_by.length != 0
                    ? variantDetails?.sold_by?.map((soldBy: any, i: number) => {
                      return (
                        <span key={i} style={{ display: 'inline-block' }}>
                          <span className="font-medium">{soldBy.name}</span> :{' '}
                          {soldBy.address}
                        </span>
                      );
                    })
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Manufactured By</th>
                <td className='d-flex-column'>
                  {variantDetails?.manufatured_by.length != 0
                    ? variantDetails?.manufatured_by?.map(
                      (manufaturedBy: any, i: number) => {
                        return (
                          <span key={i} style={{ display: 'inline-block' }}>
                            <span className="font-medium">
                              {manufaturedBy.name}
                            </span>{' '}
                            : {manufaturedBy.address}
                          </span>
                        );
                      },
                    )
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Expiry Date</th>
                <td className='d-flex-column'>
                  {variantDetails && variantDetails?.expiry_date.length > 0 ?
                    variantDetails?.expiry_date.map((item, index) => <span>{`${item} (${variantDetails.subtitle[index]}) `}</span>)
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Country Of Origin:</th>
                <td>INDIA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductInformation;
