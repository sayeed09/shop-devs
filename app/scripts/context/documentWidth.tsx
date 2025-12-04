import React, { useEffect, useState } from 'react';

export const DocumentWidthContext = React.createContext({} as any);

export const Provider= ({ children }:any) => {
  const [documentWidth, setDocumentWidth] = useState(
    document.documentElement.clientWidth,
  );
  useEffect(() => {
    window.addEventListener('load', function (event) {
      setDocumentWidth(document.documentElement.clientWidth);
    });
    window.addEventListener('resize', function (event) {
      setDocumentWidth(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <DocumentWidthContext.Provider value={documentWidth}>
      {children}
    </DocumentWidthContext.Provider>
  );
};
