import { useEffect, useState } from 'react';
import { chatWootService } from '../../services/chatwoot';
import { UserLoginValue } from '../../interface/product';
import { baseEndpoints } from '../../utils/endpoints';
import { IChatWootData, ICustomAttribute } from '../../interface/chatwoot';
import { getChatwootEntryPoint, uuidv4 } from '../../utils/helper';

interface IProps {
  chatBubble: boolean;
  authToken: UserLoginValue | null;
  toggleInitialChat: boolean;
  setShowChat: () => void;
  urlParams: {
    phone: string;
    identityHash: string;
  };
}

const ChatwootWidget = ({
  authToken,
  chatBubble,
  toggleInitialChat,
  setShowChat,
  urlParams,
}: IProps) => {
  const getChatWoot = async () => {
    const dataObject: IChatWootData = {
      phone: authToken?.phone,
      hash: '', //hash is not required. Can set empty string or null value, but key is required
      productID: 'null',
      orderID: 'null',
    };
    let data;
    if (!urlParams?.identityHash && !urlParams?.phone) {
      data = await chatWootService
        .getChatWootData(dataObject)
        .then((data) => {
          return data;
        })
        .catch((err) => console.error(err));
    }
    (function (d, t) {
      const BASE_URL = `${baseEndpoints.chatWootBaseUrl}`;
      const WEB_TOKEN =
        (window as any).ENVIRONMENT == 'dev'
          ? 'tgnzuh4ABSAPTpCFBwkBSq1h'
          : 'fhPxASh4qSvP16hBEZTtLXph';
      const g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      (g as any).src = BASE_URL + '/packs/js/sdk.js';
      (g as any).defer = true;
      (s as any).parentNode.insertBefore(g, s);
      (g as any).onload = function () {
        (window as any).chatwootSDK.run({
          websiteToken: WEB_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    })(document, 'script');
    window.addEventListener('chatwoot:ready', function () {
      if (urlParams?.identityHash) {
        setChatwootData(urlParams.identityHash, urlParams.phone);
      } else {
        setChatwootData(data?.identity_hash, authToken?.phone);
      }
    });
  };

  const setChatwootData = (identifierHash: string, phone: string) => {
    const uuid: string | undefined = uuidv4();

    const customAttributes: ICustomAttribute = {
      identifier_hash: identifierHash,
      user_phone_no: phone,
      initiated_from: window.location.href,
    };

    try {
      if ((window as any).$chatwoot) {
        (window as any).$chatwoot.setUser(phone?.toString(), {
          avatar_url: `https://www.gravatar.com/avatar/${uuid}?s=32&d=identicon&r=PG`,
          phone_number: phone.toString(),
          identifier_hash: identifierHash,
        });
        (window as any).$chatwoot.setCustomAttributes(customAttributes);
      }

      if (chatBubble || window.location.hash.indexOf('chat-loaded') > -1) {
        let tries = 0;
        const interval = setInterval(() => {
          if (
            (window as any).$chatwoot.identifier &&
            (window as any).$chatwoot.user.identifier_hash &&
            (window as any).$chatwoot.user.phone_number
          ) {
            setShowChat();
            clearInterval(interval);
            if (tries > 6) {
              clearInterval(interval);
            }
          }
          tries++;
        }, 1000);
      }

      (function (success, error, data) {
        if (success) {
          (window as any).chatbotUserSignedUp = true;
        }
      })(true, false, {});
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    (window as any).chatwootSettings = {
      hideMessageBubble: true,
      type: 'standard',
    };
    getChatWoot();
  }, []);
  useEffect(() => {
    if ((window as any).$chatwoot) {
      (window as any).$chatwoot.toggle();
      window.history.replaceState(null, '', ' ');

      const queryParams = new URLSearchParams(window.location.search);
      const ncChatwootSource = queryParams.get('nc_source');
      const customAttributes = {
        chatting_from: getChatwootEntryPoint(),
      };

      if (ncChatwootSource) {
        customAttributes['campaign_source'] = ncChatwootSource;
      }
      (window as any).$chatwoot.setCustomAttributes(customAttributes);
    }
  }, [chatBubble, toggleInitialChat]);

  return null;
};

export default ChatwootWidget;
