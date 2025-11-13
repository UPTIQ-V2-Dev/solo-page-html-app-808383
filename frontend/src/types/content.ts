export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface AppContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  navigation: NavigationItem[];
  features: Feature[];
  about: ContentSection;
  contact: ContactInfo;
}