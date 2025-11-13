import { FeatureCard } from '../ui/FeatureCard';
import { appContent } from '../../data/content';

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Amazing Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what makes our application special with these powerful features
            designed to enhance your experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {appContent.features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {[
            {
              id: "performance",
              title: "High Performance",
              description: "Optimized for speed with lazy loading and efficient bundling.",
              icon: "Gauge"
            },
            {
              id: "security",
              title: "Secure",
              description: "Built with security best practices and modern encryption.",
              icon: "Shield"
            },
            {
              id: "scalable",
              title: "Scalable",
              description: "Architecture designed to grow with your needs.",
              icon: "TrendingUp"
            },
            {
              id: "support",
              title: "24/7 Support",
              description: "Round-the-clock support to help you succeed.",
              icon: "Clock"
            }
          ].map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index + 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
};