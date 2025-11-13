import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { appContent } from '../../data/content';

export const AboutSection = () => {
  const benefits = [
    "Built with React 19 and latest web standards",
    "Fully responsive design for all devices",
    "Dark and light theme support",
    "Optimized performance and accessibility",
    "Modern UI components with Shadcn/UI",
    "Type-safe development with TypeScript"
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {appContent.about.title}
              </h2>
              {appContent.about.subtitle && (
                <p className="text-xl text-primary font-medium mb-6">
                  {appContent.about.subtitle}
                </p>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {appContent.about.content}
            </p>

            {/* Benefits List */}
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <Card className="border-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">TypeScript</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">A11y</div>
                      <div className="text-sm text-muted-foreground">Accessible</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Fast</div>
                      <div className="text-sm text-muted-foreground">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Modern</div>
                      <div className="text-sm text-muted-foreground">React 19</div>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="pt-6 border-t">
                    <h4 className="font-semibold mb-4 text-center">Built With</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['React', 'TypeScript', 'Tailwind', 'Vite', 'Shadcn/UI'].map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};