import React from 'react';

export const GAContext = React.createContext({} as any);

export const Provider = ({ children }: any) => {
  const gaTrackingEvent = (event_name: string, attribute: any) => {
    if (typeof window != 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event_name, attribute);
    }
  };

  return (
    <GAContext.Provider value={gaTrackingEvent}>{children}</GAContext.Provider>
  );
};
