import React from 'react';
const ErrorSnackbar = () => {
  return (
    <>
      <div className="ATCwrapper" style={{zIndex: 100}}>
        <div className="ATCtextwrapper">
          <span style={{color: '#fff'}}>You can add 2 quantity per product</span>
        </div>
      </div>
    </>
  );
};

export default ErrorSnackbar;
