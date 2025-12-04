import React, { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';
import { isMobile } from '../utils/helper';

export const MixPanelContext = React.createContext({} as any);

export const Provider = ({ children, disableSdk }: any) => {
  const [distinctId, setDistictId] = useState('');
  const [mixpanelExp, setMixpanelExp] = useState<string | undefined>();

  const trackMixpanelEvent = (event_name: string, attribute: any) => {
    if (!disableSdk) {
      mixpanel.track(event_name, attribute);
    }
  };

  const getDistinctIdAndFlag = async () => {
    try {
      const id = mixpanel.get_distinct_id?.();
      if (id) setDistictId(id);

      // const flagKey = "copy-uds-676-pdp-first-fold-results";
      // const variantFallbackValue = "";      // @ts-ignore
      // const variant = await mixpanel.flags.get_variant_value(
      //   flagKey,
      //   variantFallbackValue
      // );

      // if you need session recording, uncomment this
      // if (variant && typeof (mixpanel as any).start_session_recording === "function") {
      //   (mixpanel as any).start_session_recording();
      // }

      // setMixpanelExp(variant);
    } catch (err) {
      console.error("Mixpanel getDistinctIdAndFlag failed:", err);
    }
  };
  useEffect(() => {
    if (!disableSdk) {
      if (!(mixpanel as any)._initCalled) {
        mixpanel.init('75f794f03ef5e3b85919d0507c5510fa', {
          ignore_dnt: true,
          debug: true,
          track_pageview: true,
          cross_subdomain_cookie: true,
          persistence: 'cookie',
          api_host: 'https://api.mixpanel.com',
          //@ts-ignore
          // record_heatmap_data: true,
          //@ts-ignore
          // flags: {
          //   context: {
          //     custom_properties: {
          //       url: isMobile() ? window.location.pathname : '',
          //     },
          //   },
          // },
        });
        (mixpanel as any)._initCalled = true;
      }

      getDistinctIdAndFlag();
    }
  }, [disableSdk]);

  return (
    <MixPanelContext.Provider
      value={{ trackMixpanelEvent, distinctId, mixpanelExp }}
    >
      {children}
    </MixPanelContext.Provider>
  );
};