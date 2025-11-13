import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

export const MainContent = () => {
  return (
    <main className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};