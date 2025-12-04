import React from 'react';

const Loader = () => {
  return (
    <div className="loader_container">
      <div className="loader_wrapper full-page-loader">
        <div className="loader"></div>
      </div>
    </div>
  );
};
export default Loader;


export const LoaderWithoutBackground = () => (<div className="loader_wrapper full-page-loader">
  <div className="loader"></div>
</div>)