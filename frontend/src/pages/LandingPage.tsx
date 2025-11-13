import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { MainContent } from '@/components/MainContent';
import { Footer } from '@/components/Footer';
import { usePageState } from '@/hooks/usePageState';

export const LandingPage = () => {
  const { state, toggleMenu, closeMenu, toggleTheme } = usePageState();

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && state.isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isMenuOpen, closeMenu]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isMenuOpen={state.isMenuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
        theme={state.theme}
        onToggleTheme={toggleTheme}
      />
      <MainContent />
      <Footer />
    </div>
  );
};