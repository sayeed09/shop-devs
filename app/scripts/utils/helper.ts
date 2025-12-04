import Cookies from 'js-cookie';
import { OtpVerifyData } from '../interface/product';
import { getFromCookie } from './product/formatter';
export const setToLocalStorage = (key: string, value: any) => {
  if (typeof localStorage === 'object') {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export const hostDomainUrl = window.location.hostname.split(".").splice(-2).join(".");

export const getFromLocalStorage = (key: string) => {
  if (typeof localStorage === 'object') {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};
export const removeFromLocalStorage = (key: string) => {
  if (typeof localStorage === 'object') {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export const getEnvironmentValue = (): string | undefined => {
  if ((window as any).ENVIRONMENT === "dev") {
    return "_DEV";
  } else if ((window as any).ENVIRONMENT === "prod" && (window as any).Shopify?.theme?.id !== 120350801979) {
    return "";
  } else if ((window as any).Shopify.theme.id === 120350801979) {
    return "_PREPROD";
  }
}

export const setAuthTokenWRTEnv = (authData: OtpVerifyData) => {
  const authObject = {
    accessToken: authData?.tokens?.accessToken,
    phone: authData?.phone
  }
  document.cookie = `AUTH_DATA${getEnvironmentValue()}=${JSON.stringify(authObject)};path=/;domain=${getDomain()}`;
  document.cookie = `refreshToken${getEnvironmentValue()}=${authData.tokens.refreshToken};path=/;domain=${getDomain()}`;
}

export const copyToClipboard = (string) => {
  let textarea;
  let result;

  try {
    textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', true);
    textarea.setAttribute('contenteditable', true);
    textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
    textarea.value = string;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection() as Selection;
    sel.removeAllRanges();
    sel.addRange(range);

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }

  // manual copy fallback using prompt
  if (!result) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
    result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
    if (!result) {
      return false;
    }
  }
  return true;
};


export const uuidv4 = (): string | undefined => {
  try {
    const uuid: string = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    return uuid;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const handleLogout = () => {
  try {
    Cookies.set(`AUTH_DATA${getEnvironmentValue()}`, '', { expires: Date.parse('Thu, 01 Jan 1970 00:00:00 GMT'), path: '/', domain: hostDomainUrl });
    Cookies.set(`refreshToken${getEnvironmentValue()}`, '', { expires: Date.parse('Thu, 01 Jan 1970 00:00:00 GMT'), path: '/', domain: hostDomainUrl });
    // Restting chatwoot as session should be destroyed
    (window as any).$chatwoot.reset();
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const getChatwootEntryPoint = (): string | undefined => {
  try {
    const chatwootEntryPoints = {
      '/pages/oziva-prime': 'prime',
      '/pages/chat': 'chat_landing_page',
      '/pages/contact-us': 'contact_us',
    }
    return chatwootEntryPoints[window.location.pathname] || 'ham_menu';
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};


export const isMobile = () => {
  return document.body.clientWidth < 768 ? true : false
}
export const isValidUrl = (str) => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

export const getSubscriptionDataFromStorage = () => {
  if (getFromCookie('subscriptionData')) {
    if (document.referrer.indexOf('shop.dev.oziva') > -1) {
      return JSON.parse(getFromCookie('subscriptionData'));
    } else if (sessionStorage.getItem('subscriptionData')) {
      return JSON.parse(sessionStorage.getItem('subscriptionData'));
    } else {
      return JSON.parse(getFromCookie('subscriptionData'));
    }
  } else if (sessionStorage.getItem('subscriptionData')) {
    return JSON.parse(sessionStorage.getItem('subscriptionData'));
  } else {
    return null;
  }
}

export const checkIfSubscriptionCart = () => {
  const subscriptionProductData = sessionStorage.getItem("subscriptionData") || getFromCookie("subscriptionData");
  const queryParameters = new URLSearchParams(window.location.search);
  return subscriptionProductData && queryParameters.get('view') === 'subscription';
}

export const setQueryParams = (queryParams: string) => {
  const currentUrl = new URL(window.location.href);
  const params = new URLSearchParams(currentUrl.search);
  params.set('concern', queryParams);

  currentUrl.search = params.toString();
  window.history.pushState({}, '', currentUrl.toString());
}

export const removeQueryParams = () => {
  const currentUrl = new URL(window.location.href);

  const params = new URLSearchParams(currentUrl.search);
  params.delete('concern');

  currentUrl.search = params.toString();
  window.history.replaceState(null, '', currentUrl.toString());
};
export const getCouponCode = (couponCode: string) => {
  return couponCode?.includes('_freebies') ? couponCode?.split('|').length >= 2 ? couponCode?.split('|')[0] : '' : couponCode;
}

export const getDomain = () => {
  if (window.location.href.indexOf("localhost") > -1) {
    return "localhost";
  } else {
    return hostDomainUrl;
  }
};

// UDS-649-Start
export const handleStickyButton = () => {
  const timeout = setTimeout(() => {
    const allBanners = document.querySelectorAll('.banner-img-sec');

    const microInteractionV1 = document.querySelector('.micro-interaction-v1');
    const microInteractionV2 = document.querySelector('.micro-interaction-v2');
    const valueCommunication = document.querySelector('.value-communication');
    const offerSection = document.querySelector('.product-offers-section-main');

    const bannerClasses: string[] = [];
    allBanners.forEach((_, index) => bannerClasses.push(`banner-image-${index + 2}`));

    const targets: Element[] = [
      ...(bannerClasses.map(cls => document.querySelector(`.${cls}`)).filter(Boolean) as Element[]),
      ...(valueCommunication ? [valueCommunication] : []),
      ...(offerSection ? [offerSection] : []),
    ];

    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const classList = entry.target.classList;

          if (classList.contains('value-communication')) {
            if (entry.isIntersecting) {
              visibleSections.add('value-communication');
            } else {
              visibleSections.delete('value-communication');
            }
          }

          if (classList.contains('product-offers-section-main')) {
            if (entry.isIntersecting) {
              visibleSections.add('product-offers-section-main');
            } else {
              visibleSections.delete('product-offers-section-main');
            }
          }

          bannerClasses.forEach((bannerCls) => {
            if (classList.contains(bannerCls)) {
              if (entry.isIntersecting) {
                visibleSections.add(bannerCls);
              } else {
                visibleSections.delete(bannerCls);
              }
            }
          });
        });

        // Handle micro-interaction-v1
        if (
          visibleSections.has('value-communication') &&
          !visibleSections.has('product-offers-section-main')
        ) {
          if ((microInteractionV1 as HTMLElement)) {
            (microInteractionV1 as HTMLElement).style.position = 'fixed';
            (microInteractionV1 as HTMLElement).style.bottom = '80px';
            (microInteractionV1 as HTMLElement).style.display = 'block';
          }
        } else {
          if ((microInteractionV1 as HTMLElement)) {
            (microInteractionV1 as HTMLElement).style.position = 'unset';
            (microInteractionV1 as HTMLElement).style.display = 'none';
          }
        }

        // Handle micro-interaction-v2
        let bannerVisible = bannerClasses.some((cls) => visibleSections.has(cls));
        if (microInteractionV2) {
          if (bannerVisible) {
            (microInteractionV2 as HTMLElement).style.position = 'fixed';
            (microInteractionV2 as HTMLElement).style.bottom = '80px';
            (microInteractionV2 as HTMLElement).style.display = 'block';
          } else {
            (microInteractionV2 as HTMLElement).style.position = 'unset';
            (microInteractionV2 as HTMLElement).style.display = 'none';
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timeout);
      targets.forEach((el) => observer.unobserve(el));
    };
  }, 2000);

  return () => clearTimeout(timeout);
};


export const mutationObserver = () => {
  const observer = new MutationObserver((mutations, obs) => {
    const target = document.querySelector('.goolge-review-sec');
    if (target) {
      handleStickyButton();
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// UDS-649-End

export const hasDaysPassed = (dateStr, days) => {
  if (!dateStr || typeof dateStr !== 'string') return false;

  const normalizedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');

  const startDate = new Date(normalizedDateStr);
  if (isNaN(startDate.getTime())) return false;

  startDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + days);

  return today >= targetDate;
}


export const generateEventId = () => {
  // Use crypto if available for stronger randomness
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback lightweight UUID generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}