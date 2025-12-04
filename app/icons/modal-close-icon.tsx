import React from 'react';

export const ModalCloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="53"
    height="53"
    viewBox="0 0 53 53"
  >
    <defs>
      <filter
        id="Ellipse_25"
        x="0"
        y="0"
        width="53"
        height="53"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodOpacity="0.161" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="cancel" transform="translate(9 6)">
      <rect id="Bound" width="35" height="35" fill="none" opacity="0" />
      <g transform="matrix(1, 0, 0, 1, -9, -6)" filter="url(#Ellipse_25)">
        <circle
          id="Ellipse_25-2"
          data-name="Ellipse 25"
          cx="17.5"
          cy="17.5"
          r="17.5"
          transform="translate(9 6)"
          fill="#fff"
        />
      </g>
      <path
        id="Path_205"
        data-name="Path 205"
        d="M7.725,5.22h5.3V7.369h-5.3V13.02H5.3V7.369H0V5.22H5.3V0H7.725Z"
        transform="translate(17.207 7.999) rotate(45)"
      />
    </g>
  </svg>
);
