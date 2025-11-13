import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">MyApp</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Built with modern web technologies for the best user experience.
            </p>
          </div>

          {/* Copyright and Made with Love */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-1">
              © {new Date().getFullYear()} MyApp. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-1 text-sm text-muted-foreground">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> using React 19
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 pt-4 border-t text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};