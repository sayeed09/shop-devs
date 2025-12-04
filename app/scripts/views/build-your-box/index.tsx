import React, { useContext, useEffect, useState } from 'react';
import '../../scss/byb-style.scss';
import '../../scss/oziva-search-product-page.scss';
import { productService } from '../../services/product';
import { ICollectionQuery } from '../../interface/cart';
import BYBProductCard from '../../components/build-your-box/bYBProductCard';
import { IBYBItem, ISelectedVariants } from '../../interface/build-your-box';
import { cartService } from '../../services/cart';
import {
  BuildYourBoxDetailProvider,
  calculateSavedPrice,
  generateReviewsForItem,
  getAllVariantsFromStorage,
  getImage,
  getVariantsFromStorage,
  selectedVariantsFromStorage,
  storeBYBInStorage,
} from '../../utils/build-you-box/helper';
import { GAContext } from '../../context/gatracking';
import StaticFooterBar from './static-footer-bar';
import { SentryProvider } from '../../context/errorTracking';
import ErrorModal from '../../components/modals/error';

const BuildYourBox = () => {
  const [savedValues, setSavedValues] = useState<number>(0);
  const [BYBCollectionData, setBYBCollectionData] = useState<IBYBItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [diabledButton, setDiabledButton] = useState<boolean>(true);
  const [selectedVariants, setSelectedVariants] = useState<IBYBItem[]>([]);
  const [collectionHandle, setCollectionHandle] = useState<string>();
  const [oosVariants, setOOSVariants] = useState<IBYBItem[]>();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const gaTrackingEvent = useContext(GAContext);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoading(false); // reset loading when coming from back navigation
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const getBYBCollectionData = (collectionHandle: string) => {
    if (collectionHandle) {
      const collectionHandleQuries: ICollectionQuery = {
        page: 1,
        sortBy: '',
        sortOrder: '',
        limit: 30,
      };
      productService
        .getCollectionData(collectionHandle, collectionHandleQuries)
        .then((data) => {
          setBYBCollectionData(data.data.products);
          const selectedVariants: any = selectedVariantsFromStorage(
            data.data.products,
            collectionHandle,
          );
          setSelectedVariants(selectedVariants);
          checkForOOS(
            data.data.products,
            getAllVariantsFromStorage(collectionHandle),
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const checkForOOS = (products: IBYBItem[], selectedVariants: any[]) => {
    if (selectedVariants && selectedVariants.length > 0) {
      let oosVariants = selectedVariants.filter(
        (item) => !products.some((value) => value.variantId == item.variant_id),
      );
      setOOSVariants(oosVariants);
    }
  };

  const handleRemoveProduct = (ind: number) => {
    const filteredVariant = selectedVariants.filter(
      (_, index: number) => index !== ind,
    );
    setSelectedVariants(filteredVariant);
    setDiabledButton(false);
    if (filteredVariant)
      gaTrackingEvent('byb_removed', { variantId: filteredVariant[0].variantId });

  };

  const handleBoxClickButton = () => {
    setLoading(true);
    if (diabledButton) {
      return (window.location.href = '/cart');
    } else if (
      selectedVariants.length ===
      BuildYourBoxDetailProvider[collectionHandle as string]?.quantity
    ) {
      if (getVariantsFromStorage() && getVariantsFromStorage().length > 0) {
        const productIdsObject = {};
        getVariantsFromStorage()
          .filter((item) => item.collectionHandle == collectionHandle)
          .forEach((item: ISelectedVariants) => {
            productIdsObject[item.variant_id] = 0;
          });
        const updateProduct: any = {
          updates: productIdsObject,
        };
        cartService
          .updateItems(updateProduct)
          .then((res) => {
            const payloadItemList: any = [];
            selectedVariants.forEach((item: any, index) => {
              return payloadItemList.push({
                id: item.variantId,
                quantity: 1,
              });
            });

            const payloadObject = {
              items: payloadItemList,
            };
            handleAddToCart(payloadObject)
              .then((data) => {
                if (data) {
                  const updateQuantity = new CustomEvent(
                    'updateCartItemCount',
                    {},
                  );
                  document.dispatchEvent(updateQuantity);
                  storeBYBInStorage(
                    selectedVariants,
                    collectionHandle as string,
                  );
                  setLoading(false);
                  window.location.href = '/cart';
                }
              })
              .catch((err) => {
                handleAddToCart(payloadObject);
              });
          })
          .catch((error) => {
            console.log('Error while updating items : ', error);
            setLoading(false);
          });
      } else {
        const payloadItemList: any = [];
        selectedVariants.forEach((item) => {
          return payloadItemList.push({
            id: item.variantId,
            quantity: 1,
          });
        });

        const payloadObject = {
          items: payloadItemList,
        };
        handleAddToCart(payloadObject)
          .then((data) => {
            if (data) {
              const updateQuantity = new CustomEvent('updateCartItemCount', {});
              document.dispatchEvent(updateQuantity);
              storeBYBInStorage(selectedVariants, collectionHandle as string);
              window.location.href = '/cart';
            } else {
              handleAddToCart(payloadObject);
            }
          })
          .catch((err) => {
            handleAddToCart(payloadObject);
          });
      }
    }
  };

  const addToBox = (variantId: string) => {
    gaTrackingEvent('byb_added', { variantId: variantId });

    const getItem = BYBCollectionData.filter(
      (items: IBYBItem) => items.variantId === variantId,
    ).map((item) => {
      return { ...item, collectionHandle: collectionHandle };
    });
    const myItemArray = [...selectedVariants, ...getItem];

    const countOfVariantInSelectedItems = myItemArray.filter(
      (item) => item.variantId === variantId,
    ).length;
    if (
      myItemArray.length <=
      BuildYourBoxDetailProvider[collectionHandle as string]?.quantity
    ) {
      if (countOfVariantInSelectedItems <= 2) {
        setSelectedVariants(myItemArray);
      }
      const discountOnMRP = getItem[0].compareAtPrice - getItem[0].price;
      setSavedValues((prevValue) => prevValue + discountOnMRP);
    }

    setDiabledButton(false);
  };

  useEffect(() => {
    const urlPath = window.location.pathname;
    if (urlPath.split('collections/').length > 0) {
      let collectionHandle = urlPath.split('collections/')[1];
      setCollectionHandle(collectionHandle);
      getBYBCollectionData(collectionHandle);
    }
  }, []);

  useEffect(() => {
    const savedPrice = calculateSavedPrice(selectedVariants);
    setSavedValues(savedPrice);
  }, [BYBCollectionData, selectedVariants]);

  const handleAddToCart = (payloadObject) => {
    return new Promise((resolve, reject) => {
      productService
        .addItems(payloadObject)
        .then((data) => {
          if (data) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.status == 422) {
            setShowErrorModal(true);
            removeFromCart();
          }
          reject(false);
        });
    });
  };

  useEffect(() => {
    if (oosVariants && oosVariants?.length > 0) {
      setShowErrorModal(true);
      removeFromCart();
    }
  }, [oosVariants]);

  const removeFromCart = () => {
    setLoading(true);
    const productIdsObject = {};
    const filteredVariants = getAllVariantsFromStorage(
      collectionHandle as string,
    );
    if (filteredVariants.length > 0) {
      getVariantsFromStorage() &&
        filteredVariants?.forEach((item: ISelectedVariants) => {
          productIdsObject[item.variant_id] = 0;
        });
      const updateProduct: any = {
        updates: productIdsObject,
      };
      cartService
        .updateItems(updateProduct)
        .then((data) => {
          localStorage.setItem(
            'buildYourBoxV3',
            JSON.stringify(
              getVariantsFromStorage().filter(
                (item) => item.collectionHandle != collectionHandle,
              ),
            ),
          );
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  const getMessage = () => {
    let title = '';
    oosVariants?.forEach(
      (item, index) => (title = title + (index != 0 ? ', ' : '' + item.title)),
    );
    return (
      <>
        <p className="mb-16">
          {title != '' ? title : 'One of the product'} that you added is
          currently out of stock.
        </p>
        <p>Please add a different product</p>
      </>
    );
  };

  return (
    <>
      <SentryProvider>

        <div className="homeSection">
          <div className="byb-header">
            <img
              className="hide-on-mobile "
              src={`https://cdn.shopify.com/s/files/1/2393/2199/files/${getImage(collectionHandle)?.desktop
                }`}
            />
            <img
              className="hide-on-web"
              src={`https://cdn.shopify.com/s/files/1/2393/2199/files/${getImage(collectionHandle)?.mobile
                }`}
            />
          </div>
        </div>
        <section className="homeMain">
          <div className="homeSection">
            <div className="oz-collection-product-card-listing">
              {BYBCollectionData.length > 0 &&
                BYBCollectionData.map((item: IBYBItem) => {
                  const { averageRating, numberOfReviews } =
                    generateReviewsForItem(item.variantId);
                  const reivewsObject = {
                    id: item.id,
                    averageRating: averageRating.toString(),
                    numberOfReviews: numberOfReviews,
                  };
                  item.itemReviews = reivewsObject;
                  return (
                    <>
                      <BYBProductCard
                        item={item}
                        addToBox={addToBox}
                        selectedVariants={selectedVariants}
                        handleRemoveProduct={handleRemoveProduct}
                      />
                    </>
                  );
                })}
            </div>
          </div>
          {showErrorModal && (
            <ErrorModal
              message={getMessage()}
              hideCancel={true}
              handleOk={() => {
                setShowErrorModal(false);
              }}
            />
          )}
        </section>
        {collectionHandle && (
          <StaticFooterBar
            handleRemoveProduct={handleRemoveProduct}
            handleBoxClickButton={handleBoxClickButton}
            selectedVariants={selectedVariants}
            BYBCollectionData={BYBCollectionData}
            savedAmount={savedValues}
            loading={loading}
            collectionHandle={collectionHandle as string}
          />
        )}
      </SentryProvider>
    </>
  );
};
export default BuildYourBox;
