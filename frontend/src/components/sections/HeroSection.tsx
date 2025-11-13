import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import { scrollToSection } from '../../lib/scroll-utils';
import { appContent } from '../../data/content';

export const HeroSection = () => {
  const handleGetStarted = () => {
    scrollToSection('features');
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              {appContent.hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6">
            {appContent.hero.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            {appContent.hero.description}
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6"
            >
              {appContent.hero.ctaText}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('about')}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('features')}
              className="rounded-full p-3"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};