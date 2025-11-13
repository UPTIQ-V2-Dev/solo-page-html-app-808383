import { useEffect, useState } from 'react';
import { getCurrentSection } from '../lib/scroll-utils';
import type { ScrollSpyOptions } from '../types/ui';

export const useScrollSpy = (options: ScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getCurrentSection();
      setActiveSection(currentSection);
    };

    const throttledScrollHandler = throttle(handleScroll, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    handleScroll(); // Set initial section

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  return activeSection;
};

// Simple throttle function
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};