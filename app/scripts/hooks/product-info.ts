import React, { useContext, useEffect, useState } from "react";
import { setProductTitle } from "../actions/product";
import { ProductContext } from "../context/product";
import { ProductDetails, getVariantInfoResponse } from "../interface/product";
import { productService } from "../services/product";
import { setToLocalStorage } from "../utils/helper";


export const useProductInfo = () => {
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
                    setToLocalStorage('ProductTitle', productState?.productDetails?.title);
                    productDispatch(setProductTitle(productState?.productDetails.title));
                } else {
                    setToLocalStorage('ProductTitle', data?.data?.title);
                    productDispatch(setProductTitle(data?.data?.title));

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
                }
            })
            .catch((error) => {
                console.log('Get product varaint information error', error);
            });
    };

    return { variantDetails }
}

