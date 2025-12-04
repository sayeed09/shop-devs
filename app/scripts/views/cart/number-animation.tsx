import React, { useEffect, useRef } from 'react';

interface IProps {
  number: number;
}

const NumberAnimation = ({ number }: IProps) => {
  const numberRef = useRef<null | HTMLDivElement>(null);

  const scrollNumber = (digits) => {
    if(numberRef && numberRef.current){
      const spans = numberRef.current.querySelectorAll('span[data-value]');
      spans.forEach((tick, i) => {
        const digit = parseInt(digits[i]);
        (tick as HTMLElement).style.transform = `translateY(-${100 * digit}%)`;
      });
  
      numberRef.current.style.width = `${digits.length * 8}px`;
    }
  };

  const addDigit = (digit) => {
    const spanList = Array.from({ length: 10 }, (_, j) => `<span>${j}</span>`).join('');

    // On go-live, will handle through JSX
    if (numberRef.current) {
      numberRef.current.insertAdjacentHTML(
        'beforeend',
        `<span style="transform: translateY(0%)" data-value="${digit}" class="visible">
          ${spanList}
        </span>`
      );
    }
  };

  const setup = (startNum) => {
    const digits = startNum.toString().split('');

    if (numberRef.current) {
      numberRef.current.innerHTML = '';
      for (let i = 0; i < digits.length; i++) {
        addDigit('0');
      }
    }

    setTimeout(() => scrollNumber(digits), 200);
  };

  useEffect(() => {
    setup(number);
  }, [number]);

  return (
    <div id="number" ref={numberRef}></div>
  );
};

export default NumberAnimation;
