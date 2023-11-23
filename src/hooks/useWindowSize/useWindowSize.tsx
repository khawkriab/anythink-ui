import { useState, useEffect } from 'react';

function debounce(func: (...args: any) => void, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: document.documentElement.offsetWidth,
    height: document.documentElement.offsetHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.documentElement.offsetWidth,
        height: document.documentElement.offsetHeight,
      });
    };

    window.addEventListener('resize', debounce(handleResize, 150));

    handleResize();

    return () => window.removeEventListener('resize', debounce(handleResize, 150));
  }, []);

  return windowSize;
}

export default useWindowSize;
