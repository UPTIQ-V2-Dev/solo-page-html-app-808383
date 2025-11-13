import { useState } from 'react';
import type { PageState } from '../types/ui';

export const usePageState = () => {
  const [state, setState] = useState<PageState>({
    activeSection: 'hero',
    isMenuOpen: false,
    theme: 'light'
  });

  const setActiveSection = (section: string) => {
    setState(prev => ({ ...prev, activeSection: section }));
  };

  const toggleMenu = () => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  };

  const closeMenu = () => {
    setState(prev => ({ ...prev, isMenuOpen: false }));
  };

  const toggleTheme = () => {
    setState(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };

  return {
    state,
    setActiveSection,
    toggleMenu,
    closeMenu,
    toggleTheme
  };
};