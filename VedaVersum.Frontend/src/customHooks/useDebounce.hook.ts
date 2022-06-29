import { useEffect, useState } from 'react';

/**
 * debounce hook - debounces the given value with a given delay
 * source: https://usehooks.com/useDebounce/
 * @param value to debounce
 * @param delay with which the value gets updated
 * @returns the debounced value
 */
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
