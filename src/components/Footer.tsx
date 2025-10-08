import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    formations: [
      { label: 'Automobile', href: '#' },
      { label: 'Informatique', href: '#' },
      { label: 'Service Client', href: '#' },
      { label: 'Santé & Sécurité', href: '#' },
    ],
    academy: [
      { label: 'À propos', href: '#apropos' },
      { label: 'Notre équipe', href: '#' },
      { label: 'Partenaires', href: '#' },
      { label: 'Témoignages', href: '#temoignages' },
    ],
    support: [
      { label: 'Centre d\'aide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Contact', href: '#contact' },
      { label: 'Blog', href: '#blog' },
    ],
    legal: [
      { label: 'Mentions légales', href: '#' },
      { label: 'Politique de confidentialité', href: '#' },
      { label: 'Conditions d\'utilisation', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-poppins font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl">Mayelia</span>
                <span className="font-poppins text-xs text-primary">Academy</span>
              </div>
            </div>
            <p className="font-opensans text-sm text-secondary-foreground/80 mb-6 max-w-sm">
              Hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-opensans">+224 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-opensans">contact@mayelia-academy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-opensans">Conakry, Guinée</span>
              </div>
            </div>
          </div>

          {/* Formations */}
          <div className="hidden md:block">
            <h3 className="font-poppins font-semibold text-lg mb-4">Formations</h3>
            <ul className="space-y-2">
              {footerLinks.formations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-opensans text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div className="hidden md:block">
            <h3 className="font-poppins font-semibold text-lg mb-4">Académie</h3>
            <ul className="space-y-2">
              {footerLinks.academy.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-opensans text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-opensans text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-opensans text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-opensans text-sm text-secondary-foreground/70">
              © 2025 Mayelia Academy. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
