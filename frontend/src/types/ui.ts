export interface ScrollSpyOptions {
  rootMargin?: string;
  threshold?: number;
}

export interface PageState {
  activeSection: string;
  isMenuOpen: boolean;
  theme: 'light' | 'dark';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}