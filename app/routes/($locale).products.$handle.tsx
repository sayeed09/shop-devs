import { redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import axios from 'axios';
import ProductView from '~/components/productview';

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `Hydrogen ` },
    {
      rel: 'canonical',
      href: `/products/`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte



  const data = {

  };


  return Response.json(data, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400"
    },
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }



  const [product] = await Promise.all([
    await axios.get(`https://api.prod.oziva.in/catalog/product/details-by-handle/${handle}?topOfFunnel=false&inStock=true&pageSource=pdp`)
    // Add other queries here, so that they are loaded in parallel
  ]);

  const [product2] = await Promise.all([
    axios.get(`https://api.prod.oziva.in/catalog/product/details/v2/${product.data.data.id}?topOfFunnel=false&inStock=true&expand=newBenefits,variants,,images,clinicalStudy&pageSource=pdp`),
  ]);


  // if (!product?.id) {
  //   throw new Response(null, {status: 404});
  // }

  // The API handle might be localized, so redirect to the localized handle
  // redirectIfHandleIsLocalized(request, { handle, data: product });
  return {
    product: product2.data,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {

  // const { product, variantId, isMobile } = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information


  return (
    <h2>Hwlllo world</h2>
    // <ProductView productData={product.data} variantId={variantId} isMobile={isMobile} />
  );
}

