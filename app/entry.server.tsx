import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type { EntryContext } from 'react-router';

/**
 * Ensure CSP allows API calls to *.oziva.in
 */export function updateCsp(header: string, nonce: string) {
  let updatedHeader = header;

  // img-src
  if (updatedHeader.includes('img-src')) {
    updatedHeader = updatedHeader.replace(
      /img-src ([^;]+)/,
      (match, sources) => {
        if (!sources.includes('https://www.oziva.in')) {
          return `img-src ${sources} https://www.oziva.in`;
        }
        if (!sources.includes('https://fonts.googleapis.com')) {
          return `img-src ${sources} https://fonts.googleapis.com`;
        }
        if (!sources.includes('https://www.google.com')) {
          return `img-src ${sources} https://www.google.com`;
        }
        if (!sources.includes('https://www.google.co.in')) {
          return `img-src ${sources} https://www.google.co.in`;
        }
        if (!sources.includes('https://oziva-public-images.s3.ap-south-1.amazonaws.com')) {
          return `img-src ${sources} https://oziva-public-images.s3.ap-south-1.amazonaws.com`;
        }
        if (!sources.includes('https://d12zpd1kj8zqow.cloudfront.net')) {
          return `img-src ${sources} https://d12zpd1kj8zqow.cloudfront.net`;
        }
        if (!sources.includes('http://www.oziva.in')) {
          return `img-src ${sources} http://www.oziva.in`;
        }

        return match;
      }
    );
  } else {
    updatedHeader += `; img-src 'self' https://cdn.shopify.com https://shopify.com https://www.oziva.in https://judgeme.imgix.net  https://fonts.googleapis.com https://www.google.com https://www.google.co.in https://oziva-public-images.s3.ap-south-1.amazonaws.com https://d12zpd1kj8zqow.cloudfront.net http://www.oziva.in`;
  }

  // script-src
  if (updatedHeader.includes('script-src')) {
    updatedHeader = updatedHeader.replace(
      /script-src ([^;]+)/,
      (match, sources) => {
        let newSources = sources;
        if (!newSources.includes('https://cdn.judge.me')) {
          newSources += ' https://cdn.judge.me';
        }
        if (!newSources.includes('https://cdnwidget.judge.me')) {
          newSources += ' https://cdnwidget.judge.me';
        }
        return `script-src ${newSources} 'nonce-${nonce}' 'unsafe-eval'`;
      }
    );
  } else {
    updatedHeader += `; script-src 'self' https://cdn.shopify.com https://cdn.judge.me https://cdnwidget.judge.me https://cdn.moengage.com https://www.googletagmanager.com https://sdk-01.moengage.com 'nonce-${nonce}' 'unsafe-eval'`;
  }

  // font-src
  if (updatedHeader.includes('font-src')) {
    updatedHeader = updatedHeader.replace(
      /font-src ([^;]+)/,
      (match, sources) => {
        if (!sources.includes('data:')) {
          return `font-src ${sources} data: https://cdn.shopify.com`;
        }
        if (!sources.includes('https://fonts.gstatic.com')) {
          return `font-src ${sources} data: https://fonts.gstatic.com`;
        }
        if (!sources.includes(' https://fonts.googleapis.com')) {
          return `font-src ${sources} data:  https://fonts.googleapis.com`;
        }

        return match;
      }
    );
  } else {
    updatedHeader += `; font-src 'self' data: https://cdn.shopify.com https://fonts.gstatic.com https://fonts.googleapis.com`;
  }

  // style-src
  if (updatedHeader.includes('style-src')) {
    updatedHeader = updatedHeader.replace(
      /style-src ([^;]+)/,
      (match, sources) => {
        let newSources = sources;
        if (!newSources.includes('https://cdn.judge.me')) {
          newSources += ' https://cdn.judge.me';
        }
        if (!newSources.includes('https://cdnwidget.judge.me')) {
          newSources += ' https://cdnwidget.judge.me';
        }
        if (!newSources.includes('https://fonts.googleapis.com')) {
          newSources += ' https://fonts.googleapis.com';
        }
        if (!newSources.includes('https://www.oziva.in')) {
          newSources += ' https://www.oziva.in';
        }
        return `style-src ${newSources}`;
      }
    );
  } else {
    updatedHeader += `; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://cdn.judge.me https://cdnwidget.judge.me https://fonts.googleapis.com`;
  }

  // connect-src ✅ updated this block
  if (updatedHeader.includes('connect-src')) {
    updatedHeader = updatedHeader.replace(
      /connect-src ([^;]+)/,
      (match, sources) => {
        let newSources = sources;
        if (!newSources.includes('https://cache.judge.me')) {
          newSources += ' https://cache.judge.me';
        }
        if (!newSources.includes('https://cdn.judge.me')) {
          newSources += ' https://cdn.judge.me';
        }
        if (!newSources.includes('https://sdk-01.moengage.com')) {
          newSources += ' https://sdk-01.moengage.com';
        }
        if (!newSources.includes('https://www.googletagmanager.com')) {
          newSources += ' https://www.googletagmanager.com';
        }
        if (!newSources.includes('https://www.google.co.in')) {
          newSources += ' https://www.google.co.in';
        }
        if (!newSources.includes('https://www.google.com')) {
          newSources += ' https://www.google.com';
        }
        if (!newSources.includes('https://oziva.myshopify.com')) {
          newSources += ' https://oziva.myshopify.com/';
        }


        return `connect-src ${newSources}`;
      }
    );
  } else {
    updatedHeader += `; connect-src 'self' https://monorail-edge.shopifysvc.com https://dev-oziva.myshopify.com http://localhost:* ws://localhost:* ws://127.0.0.1:* ws://*.tryhydrogen.dev:* https://cache.judge.me https://cdn.judge.me https://oziva.myshopify.com/`;
  }

  return updatedHeader;
}
export function ensureConnectSrc(csp: string) {
  if (!/connect-src/.test(csp)) {
    // Prepend connect-src to CSP if not present
    return `connect-src 'self' https://*.oziva.in https://oziva.in https://cdn.shopify.com https://monorail-edge.shopifysvc.com https://api.wizzy.ai; ${csp}`;
  }

  // Update if already present
  return csp.replace(
    /connect-src ([^;]+)/,
    (match, sources) =>
      `connect-src ${sources} https://*.oziva.in https://oziva.in https://api.wizzy.ai`
  );
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  // 🧩 Patch in connect-src directive for all oziva.in subdomains
  let updatedHeader = ensureConnectSrc(header);
  updatedHeader = updateCsp(updatedHeader, nonce);

  // (Optional) Add unsafe-inline styles if you have dynamic styling
  if (!updatedHeader.includes('style-src')) {
    updatedHeader += `; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://*.oziva.in`;
  }

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', updatedHeader);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}