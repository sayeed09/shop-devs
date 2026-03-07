import { redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import axios from 'axios';
import ProductView from '~/components/productview';

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `Hydrogen` },
    {
      rel: 'canonical',
      href: `/products/`,
    },
  ];
};

export const headers: Route.HeadersFunction = () => {
  return {
    "Oxygen-Cache-Control": "public, max-age=1800",
    // Vary: "Accept",
  };
};

export async function loader(args: Route.LoaderArgs) {

  const data = {};

  return Response.json(data);
}

async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [product] = await Promise.all([
    axios.get(
      `https://api.prod.oziva.in/catalog/product/details-by-handle/${handle}?topOfFunnel=false&inStock=true&pageSource=pdp`
    ),
  ]);

  const [product2] = await Promise.all([
    axios.get(
      `https://api.prod.oziva.in/catalog/product/details/v2/${product.data.data.id}?topOfFunnel=false&inStock=true&expand=newBenefits,variants,,images,clinicalStudy&pageSource=pdp`
    ),
  ]);

  return {
    product: product2.data,
  };
}

function loadDeferredData({ context, params }: Route.LoaderArgs) {
  return {};
}

export default function Product() {
  return <h2>Hello world</h2>;
}