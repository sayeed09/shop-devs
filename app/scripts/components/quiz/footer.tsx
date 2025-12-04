import React from 'react';
import { LeftArrow } from '../../../icons/left-arrow';
import { RightArrowIcon } from '../../../icons/right-arrow';

interface Props {
  handleNext: () => void;
  handlePrev: () => void;
  hidePrev: boolean;
  hideNext: boolean;
  showSubmit: boolean;
  disableNext: boolean;
}
const Footer = ({ handleNext, handlePrev, hidePrev, hideNext, showSubmit, disableNext }: Props) => {
  return (
    <>
      <div className="quiz-footer">
        <button
          onClick={() => handlePrev()}
          style={hidePrev ? { visibility: 'hidden' } : {}}
        >
          <LeftArrow />
          <span>BACK</span>
        </button>
        <button
          onClick={() => handleNext()}
          style={hideNext ? { visibility: 'hidden' } : disableNext ? { opacity: 0.5 } : {}}
        >
          <span>{showSubmit ? 'SUBMIT' : 'NEXT'}</span>
          <RightArrowIcon />
        </button>
      </div>
    </>
  );
};
export default Footer;
