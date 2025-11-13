import { Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection } from '../lib/scroll-utils';
import { appContent } from '../data/content';
import { cn } from '../lib/utils';

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header = ({ isMenuOpen, onToggleMenu, onCloseMenu, theme, onToggleTheme }: HeaderProps) => {
  const activeSection = useScrollSpy();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onCloseMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              MyApp
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {appContent.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="p-2"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMenu}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {appContent.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md w-full text-left transition-colors",
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};