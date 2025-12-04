import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../icons/thank-you-v1.json';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

export const OfferAppliedTickIcon = () => (
  <>
      <Lottie options={defaultOptions} height={62} width={62} />
  </>
);
