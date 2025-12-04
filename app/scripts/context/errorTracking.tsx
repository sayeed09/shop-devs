import React, { useEffect } from 'react';
import * as Sentry from '@sentry/browser';
const errorKeywords = [
  'mixpanel',
  'facebook',
  'moengage',
  'google',
  'this.i.at is not a function',
  't.entries.at is not a function',
  'bad element',
  'window.webkit',
  'Object store cannot be found in the backing store',
  'Missing variant',
  'S2S error',
  'Failed to fetch'
];

const lowerMatch = (text?: string) => {
  if (typeof text !== 'string') return false;
  const lowerText = text.toLowerCase();
  return errorKeywords.some(keyword => lowerText.includes(keyword));
};
export const SentryProvider = ({ children }: any) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      window &&
      window.location.href.indexOf('dev') === -1 &&
      (window as any).Shopify.theme.id == '98022850619' //prod theme id
    )
      //allow only for production
      Sentry.init({
        dsn: 'https://6ae92fa225854dd7bf6f6d0fa85cfbe5@o566501.ingest.sentry.io/6125948',
        tracesSampleRate: 0.0001,
        allowUrls: [
          'https://cdn.shopify.com',
          'https://www.oziva.in',
          'https://www.oziva.com',
          /https?:\/\/oziva\.in/,
        ],
        denyUrls: ['https://audienso.com/'],
        integrations: [
          // Browser tracing with noisy features disabled
          // Sentry.browserTracingIntegration({
          //   traceFetch: false, // stop tracing every fetch
          //   traceXHR: false,   // stop tracing every XHR
          // }),
          // Sentry.httpContextIntegration(),            // Adds HTTP context (URL, headers, etc.)
          Sentry.dedupeIntegration(),                 // Prevents duplicate errors
          Sentry.extraErrorDataIntegration(),         // Captures additional context
          Sentry.rewriteFramesIntegration(),          // Improves stack trace readability
          Sentry.captureConsoleIntegration({          // Captures console.error, warn, etc.
            levels: ['error']
          })],
        beforeSend(event, hint) {
          const exception = hint?.originalException;

          // Browser offline
          if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            return null;
          }

          //Drop for poor network types
          const connection = (navigator as any).connection;
          if (connection?.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)) {
            return null;
          }

          //Drop axios-marked errors
          const original = hint?.originalException as any;
          if (original && original.__ignoreForSentry) return null;

          //Drop known noisy messages (case-insensitive)
          const msg = event?.message?.toLowerCase?.() || '';
          if (errorKeywords.some(k => msg.includes(k.toLowerCase()))) return null;

          // Drop if any exception or stack frame matches keywords
          const shouldIgnore =
            event?.exception?.values?.some((err) =>
              lowerMatch(err.value) || lowerMatch(err.type)
            ) ||
            event?.exception?.values?.some((err) =>
              err.stacktrace?.frames?.some((frame) => lowerMatch(frame.filename))
            ) ||
            (typeof exception === 'string' && lowerMatch(exception));

          if (shouldIgnore) return null;

          const values = event?.exception?.values?.[0];
          if (
            event?.message?.includes('Web push settings not configured on MoEngage dashboard') ||
            values?.value?.includes?.('QuotaExceededError') ||
            values?.value?.includes?.('Database deleted') ||
            values?.value?.includes?.('MoEngage') ||
            values?.value?.includes?.('400')
          ) {
            return null;
          }

          return event;
        },
        ignoreErrors: ['QuotaExceededError', 'Load failed']
      });
    window.addEventListener('unhandledrejection', (event) => {
      if (
        event?.reason &&
        event?.reason?.message &&
        event?.reason?.message.includes('Web push settings not configured on MoEngage dashboard')
      ) {
        // Prevent the error from being reported
        event.preventDefault();
      }
    });
  }, []);


  return <>{children}</>;
};
