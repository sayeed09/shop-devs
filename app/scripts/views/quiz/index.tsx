import React, { useEffect, useState } from 'react';
import Result from './result';
import Quiz from './quiz';
import { SentryProvider } from '../../context/errorTracking';
import Regrowth from './regrowth';

const QuizView = () => {
  const [urlPath, setUrlPath] = useState<string>();

  useEffect(() => {
    if (window.location) {
      setUrlPath(window.location.pathname);
    }
  }, []);

  if (!urlPath) {
    return null;
  }
  return (
    <>
      <SentryProvider>
        {urlPath.indexOf('regrowth') > -1 ? <Regrowth /> :
          urlPath.indexOf('result') > -1 ? <Result /> : <Quiz />}
      </SentryProvider>
    </>
  );
};
export default QuizView;
