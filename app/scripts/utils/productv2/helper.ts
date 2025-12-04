import { formatPriceWithCurrency } from "../cart/formatter";

interface Phases {
  start: number,
  end: number,
  duration: number
};

const animatePhase = (element: HTMLSpanElement, values: Phases, onComplete: () => void) => {
  let startTime;
  let {start, end, duration} = values;
  
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const increment = Math.floor((progress / duration) * (end - start));
    const currentValue = start + increment;
    
    element.innerText = formatPriceWithCurrency(currentValue)?.toString() || '';
    
    if (progress < duration) {
      requestAnimationFrame(step);
    } else {
      element.innerText = formatPriceWithCurrency(end)?.toString() || ''; // Ensure the final number is displayed
      onComplete(); // Call the onComplete callback when animation ends
    }
  };
  
  requestAnimationFrame(step);
}

export { animatePhase };