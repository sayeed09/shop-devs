import { Await, Link, useLocation } from 'react-router';
import { Suspense, useEffect, useId, useRef, useState } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside } from '~/components/Aside';
import { Header, HeaderMenu } from '~/components/Header';
import { CartMain } from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/SearchResultsPredictive';
// import HeaderV1 from './headerv1';
import { Provider as CartProvider } from '~/scripts/context/cart';
import HeaderV1 from './headerv1';
import { Collections } from '~/scripts/models/home';
// import Footer from './Footer';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  const location = useLocation();
  const [concerns, setConcerns] = useState<Collections[]>([]);
  const [categories, setCategories] = useState<Collections[]>([])
  const hasFetched = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasFetched.current) return;

    hasFetched.current = true;
    fetchData('CONCERN');
    fetchData('CATEGORY');
  }, []);


  const fetchData = (groupType: string) => {
    (async () => {
      const { productService } = await import('~/scripts/services/product');
      const data = await productService.getConcernCategoryData(groupType);
      if (groupType === "CONCERN") {
        setConcerns(data.data.collections);
      } else {
        setCategories(data.data.collections);
      }
    })(); // <-- ✅ This pair of parentheses executes the IIFE
  };
  return (
    <Aside.Provider>
      <CartProvider>

        {/* {header && (
          <HeaderV1 concerns={concerns} categories={categories} />
        )} */}
        <main>{children}</main>
        {/* <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      /> */}
        {/* {!location.pathname.includes('cart') &&
          <Footer
            concerns={concerns}
            categories={categories}
          />
        } */}
      </CartProvider>

    </Aside.Provider>
  );
}

function CartAside({ cart }: { cart: PageLayoutProps['cart'] }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({ fetchResults, goToSearch, inputRef }) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
