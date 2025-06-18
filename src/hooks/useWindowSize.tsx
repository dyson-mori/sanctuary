"use client"
import { useState, useEffect } from 'react';

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export function useResponsiveColumns(min = 2, max = 5) {
  const [columns, setColumns] = useState(max);

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      let cols = Math.floor(width / 200); // 1 coluna a cada 200px
      cols = Math.max(min, Math.min(max, cols));
      setColumns(cols);
    };

    calculateColumns(); // Inicial
    window.addEventListener('resize', calculateColumns);

    return () => {
      window.removeEventListener('resize', calculateColumns);
    };
  }, [min, max]);

  return columns;
}