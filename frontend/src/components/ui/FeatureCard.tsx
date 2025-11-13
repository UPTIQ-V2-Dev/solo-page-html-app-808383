import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader } from './card';
import type { Feature } from '../../types/content';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  // Dynamically get the icon component
  const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {IconComponent && (
            <IconComponent className="h-8 w-8 text-primary" />
          )}
        </div>
        <h3 className="text-xl font-semibold">{feature.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
};