import * as React from "react";
const FilledCheckbox = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={16}
    viewBox="0 0 15 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1555_9090)">
      <path
        d="M7.5 15.5C11.6421 15.5 15 12.1421 15 8C15 3.85786 11.6421 0.5 7.5 0.5C3.35786 0.5 0 3.85786 0 8C0 12.1421 3.35786 15.5 7.5 15.5Z"
        fill="#6BBD58"
      />
      <path
        d="M5.312 11.989L2 8.676L2.716 7.96L5.316 10.56L11.369 4.5L12.085 5.216L5.312 11.989Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1555_9090">
        <rect
          width={15}
          height={15}
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default FilledCheckbox;
