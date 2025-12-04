import React, { useContext, useEffect, useState } from 'react';
import {
  SearchListModel,
} from '../../interface/search-product-list';
import '../../scss/oziva-search-product-page.scss';
import '../../scss/oziva-site.scss';

import { SentryProvider } from '../../context/errorTracking';

import '../../scss/import/_skeleton.scss';
import Modal from '../../components/modals/modal';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import Header from '../../components/search/header';
import Concerns from '../../components/search/concerns-header';
import ProductList from '../../components/search/product-list';
import SearchResultList from '../../components/search/search-results';
import AddtocartSnackbar from '../../components/productCard/addToCartSnackbar';
import useSearch from '../../hooks/search';
import NoResultView from '../../components/search/no-result';
import ProductCardSkeleton from '../../components/loaders/product-card-skeleton';
import { GAContext } from '../../context/gatracking';

const SearchPage = ({ setModalVisibility }) => {
  const [showSnakBar, setShowSnakbar] = useState(false);
  const { products,
    reviews,
    selectedCollection,
    handleSelectedCollection,
    searchTerm,
    setSearchTerm,
    searchResults,
    loadMoreResults,
    concernCategoryCollection,
    emptyResults,
    isLoading,
    loadMoreCollectionData,
    hasMoreItems
  } = useSearch();
  const gaTrackingEvent = useContext(GAContext);



  const showSnakBarfunc = () => {
    if (showSnakBar) {
      setTimeout(() => {
        setShowSnakbar(false);
      }, 4000);
      return <AddtocartSnackbar />;
    }
  };

  useEffect(() => {
    if (searchTerm) {
      gaTrackingEvent('search_text', { text: searchTerm, result_count: searchResults?.totalResults });
    }
  }, [searchResults]);

  useEffect(() => {
    if (searchTerm) {
      gaTrackingEvent('search_collection_tab_clicked', { handle: selectedCollection.handle });
    }
  }, [selectedCollection]);

  return (
    <MixpanelProvider>
      <SentryProvider>
        <Modal
          setModalVisibility={setModalVisibility}
          contentClassName='search-v2'
          modalClassName='search-modal'
        >
          <>
            <Header
              onBackClicked={setModalVisibility}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              refetchCart={showSnakBar}
            />

            {emptyResults && searchTerm &&
              <NoResultView searchTerm={searchTerm} />
            }

            {searchResults && searchResults?.products?.length > 0 ?
              <SearchResultList
                results={searchResults as SearchListModel}
                searchTerm={searchTerm}
                loadMoreResults={loadMoreResults}
                setShowSnakbar={setShowSnakbar}
              />

              : <>
                {isLoading ? <ProductCardSkeleton count={1} />
                  : <>
                    <Concerns
                      handleConcernSelect={handleSelectedCollection}
                      selectedCollection={selectedCollection}
                      concernCategoryCollection={concernCategoryCollection}
                    />
                    <ProductList
                      selectedCollection={selectedCollection}
                      products={products}
                      reviews={reviews}
                      setShowSnakbar={setShowSnakbar}
                      loadMoreCollectionData={loadMoreCollectionData}
                      hasMoreItems={hasMoreItems}
                    />
                  </>

                }
              </>
            }
            {showSnakBarfunc()}

          </>
        </Modal>

      </SentryProvider>
    </MixpanelProvider>
  );
};

export default SearchPage;
