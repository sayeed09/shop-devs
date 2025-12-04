const environments = {
  development: 'dev',
  production: 'prod',
};
const currentEnv =
  window && window.ENVIRONMENT == "dev"
    ? 'development'
    : 'production';

const env = environments[currentEnv];
export const hostDomain = window.location.hostname.split(".").splice(-2).join('.');
const hostDomainUrl = `https://${window.location.hostname}/`;
const isDotCom = window.location.hostname.endsWith('.com');
const pulseUrl = `https://pulse.${window.ENVIRONMENT}.oziva${isDotCom ? '.com' : '.in'}`;

export const checkoutRedirectURL = env === environments.development ? `https://checkout.dev.${hostDomain}` : `https://checkout.${hostDomain}`;
export const redirectUrl = hostDomainUrl;
// env == environments.development
//   ? 'https://web.oziva.in/'
//   : hostDomainUrl;

let parentPath = 'api.prod';
let policyPath = 'oziva';
let zeviParentPath = 'search';
if (typeof window != 'undefined' && (window as any).Shopify) {
  let themeId = (window as any).Shopify.theme.id;
  // Preprod theme ID available to other teams also
  if (themeId == 120350801979) {
    parentPath = 'api-preprod.prod';
    zeviParentPath = 'search';
  }
}
if (window.ENVIRONMENT == "dev") {
  parentPath = 'api.dev';
  zeviParentPath = 'search';
  policyPath = 'dev-oziva';
}

const baseUrl = `https://${parentPath}.oziva.in`;
const zeviBaseUrl = `https://${zeviParentPath}.zevi.in`;

export const baseEndpoints = {
  freebie: `${baseUrl}/radium/freebie/list`,
  upsell: `${baseUrl}/catalog/product`,
  checkout: `${baseUrl}/checkout`,
  userCheckout: `${baseUrl}/checkout/user`,
  offer: `${baseUrl}/radium/visibility`,
  hydro: `${baseUrl}/hydro/ticket/create/`,
  attchment: `${baseUrl}/hydro/ticket/attachment/`,
  cash: `${baseUrl}/radium`,
  redeem: `https://wallet-redeem.${env}.oziva.in/users/`,
  profile: `${baseUrl}/nitro/user/profile/`,
  product: `${baseUrl}/`,
  review: `https://config.${env}.oziva.in/config/product`,
  allReview: `https://judge.me/api/v1/widgets/product_review`,
  config: `https://config.${env}.oziva.in/config`,
  deliverySpeed: `${baseUrl}/checkout/delivery-speed`,
  subscriptionPaymentAPi:
    env == environments.development
      ? `https://dh6v97ke5i.execute-api.ap-south-1.amazonaws.com/${env}`
      : `https://81r9kdn9mb.execute-api.ap-south-1.amazonaws.com/${env}`,
  judgeMeDomain:
    env == environments.development
      ? 'dev-oziva.myshopify.com'
      : 'oziva.myshopify.com',
  judgeMeApiToken:
    env == environments.development
      ? 'R1q3lOuECyUVTJ8tJgQCSZu_iac'
      : 'zpw7jJDr0WepgN7iYZnZpJLw8Y4',
  razorPayKey:
    env == environments.development
      ? 'rzp_test_m3bGSBGDkT5IGE'
      : 'rzp_live_qaFUwm4d5Z66hx',
  address: `${baseUrl}/nitro/user/address`,
  login: `${baseUrl}/nitro/send/`,
  otpVerify: `${baseUrl}/nitro/v2/validate/`,
  refreshToken: `${baseUrl}/nitro/refresh/`,
  metricsEventZevi: `https://metrics.zevi.in/metrics/add_search_event`,
  sessionIdentifierZevi: `${zeviBaseUrl}/sessionIdentifier`,
  searchProductZevi: `${zeviBaseUrl}/search/`,
  experimentalAnalytics:
    env == environments.development
      ? `https://9gfwak34s6.execute-api.ap-south-1.amazonaws.com/dev/abtesting/params`
      : `https://rrsy3t8pp9.execute-api.ap-south-1.amazonaws.com/prod/abtesting/params`,
  chatWoot: `https://carbon.${env}.oziva.in/chatbot/chatwoot/auth-check/`,
  chatWootBaseUrl: `https://chatwoot.${env}.oziva.in`,
  getOrders: `${baseUrl}/nitro/user/order/v2/order-history`,
  getOrderDetail: `${baseUrl}/nitro/user/order/v2/order-details`,
  cancelOrder: `${baseUrl}/nitro/user/order/cancel`,
  collectionByHandle: `${baseUrl}/catalog/collection`,
  subscription: `${baseUrl}/subscription`,
  policyURL: `https://${policyPath}.myshopify.com/api/2022-04/graphql`,
  policyToken: env === environments.development ? '396634c1ce60f5ea2593342adb2991bd' : '2edc93cb80d2e079172d67f0f61a9812',
  quiz: `https://quiz.${env}.oziva.in/quiz`,
  search: `https://api.wizzy.ai/v1`,
  addressFetchProgress: `${baseUrl}/nitro/address/progress`,
  checkoutURL: `https://checkout.${checkoutRedirectURL}/`,
  analytics: `${pulseUrl}/session`
};
