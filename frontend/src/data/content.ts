import type { AppContent } from '../types/content';

export const appContent: AppContent = {
  hero: {
    title: "Welcome to Our Amazing App",
    subtitle: "Your one-stop solution",
    description: "Experience the power of modern web technology with our beautiful, responsive single-page application built with React 19, Tailwind CSS, and Shadcn/UI.",
    ctaText: "Get Started"
  },
  navigation: [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "features", label: "Features", href: "#features" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  features: [
    {
      id: "fast",
      title: "Lightning Fast",
      description: "Built with Vite and React 19 for optimal performance and fast loading times.",
      icon: "Zap"
    },
    {
      id: "responsive",
      title: "Fully Responsive",
      description: "Works perfectly on all devices - mobile, tablet, and desktop.",
      icon: "Smartphone"
    },
    {
      id: "accessible",
      title: "Accessible",
      description: "Built with accessibility in mind, following WCAG guidelines.",
      icon: "Eye"
    },
    {
      id: "modern",
      title: "Modern Design",
      description: "Beautiful UI components with dark/light theme support.",
      icon: "Palette"
    }
  ],
  about: {
    id: "about",
    title: "About Our Application",
    subtitle: "Innovation meets simplicity",
    content: "We've crafted this single-page application to demonstrate the power of modern web technologies. Using React 19's latest features, Tailwind CSS for styling, and Shadcn/UI for beautiful components, we've created an experience that's both powerful and easy to use."
  },
  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Digital City, DC 12345"
  }
};