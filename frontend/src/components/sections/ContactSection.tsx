import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { ContactForm } from '../ui/ContactForm';
import { appContent } from '../../data/content';

export const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: appContent.contact.email,
      href: `mailto:${appContent.contact.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: appContent.contact.phone,
      href: `tel:${appContent.contact.phone.replace(/\D/g, '')}`
    },
    {
      icon: MapPin,
      label: 'Address',
      value: appContent.contact.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(appContent.contact.address)}`
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to get started? Have questions? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're here to help and answer any question you might have.
                We look forward to hearing from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <a 
                        href={method.href}
                        className="flex items-center gap-4 group"
                        target={method.label === 'Address' ? '_blank' : undefined}
                        rel={method.label === 'Address' ? 'noopener noreferrer' : undefined}
                      >
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                            {method.label}
                          </h4>
                          <p className="text-lg font-medium group-hover:text-primary transition-colors">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="pt-6">
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};