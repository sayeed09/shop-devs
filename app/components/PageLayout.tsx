import { useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside } from '~/components/Aside';
// import HeaderV1 from './headerv1';
import { Provider as CartProvider } from '~/scripts/context/cart';
import HeaderV1 from './headerv1';
import { Collections } from '~/scripts/models/home';
import Footer from './Footer';
import { axiosClient } from '~/scripts/utils/axios-client';
import { IConcernCategoryResponse } from '~/scripts/interface/concern-categories';
import { baseEndpoints } from '~/scripts/utils/endpoints';
// import Footer from './Footer';
import { Provider as AuthenticationProvider } from '~/scripts/context/authentication';

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
      const { data } = await axiosClient
        .get<IConcernCategoryResponse>(`${baseEndpoints.collectionByHandle}/group/${groupType}`)
        .then((response) => {
          return response;
        });
      if (groupType === "CONCERN") {
        setConcerns(data.data.collections);
      } else {
        setCategories(data.data.collections);
      }
    })(); // <-- ✅ This pair of parentheses executes the IIFE
  };
  return (
    <Aside.Provider>
      <AuthenticationProvider >
        <CartProvider>

          {header && !location.pathname.includes('cart') && (
            <HeaderV1 concerns={concerns} categories={categories} />
          )}
          <main>{children}</main>

          {!location.pathname.includes('cart') &&
            <Footer
              concerns={concerns}
              categories={categories}
            />
          }
        </CartProvider>
      </AuthenticationProvider>

    </Aside.Provider>
  );
}

