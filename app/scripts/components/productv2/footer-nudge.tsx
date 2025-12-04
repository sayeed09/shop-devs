import React from 'react';

interface IProps {
  productLeftCount: number;
}

const FooterNudge = ({productLeftCount}: IProps) => {
  return (
    <>
      <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Nudge_icon_458d4dcf-2c25-4567-8d9f-0bbc2d9b464e.png?v=1747633951" alt="PDP footer nudge icon" />Selling out fast! Less than {productLeftCount} left
    </>
  )
}

export default FooterNudge