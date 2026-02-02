import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo_mayelia.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    formations: [
      { label: 'Technicien Polyvalent', href: '#' },
      { label: 'Chauffeur & Sécurité', href: '#' },
      { label: 'Informatique', href: '#' },
      { label: 'Santé & Sécurité (SST)', href: '#' },
      { label: 'Relation Client', href: '#' },
    ],
    quickLinks: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '#apropos' },
      { label: 'Actualités', href: '#actualites' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Mentions légales', href: '#' },
      { label: 'Politique de confidentialité', href: '#' },
      { label: 'CGU', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block w-fit">
              <img src={logo} alt="Mayelia Academy" className="h-10 w-auto" />
            </div>
            <p className="text-slate-400 font-opensans leading-relaxed">
              Hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences en Côte d'Ivoire.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Liens Rapides
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              Nos Domaines
            </h3>
            <ul className="space-y-4">
              {footerLinks.formations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-secondary transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-6">Restez informé</h3>
            <p className="text-slate-400 text-sm mb-4">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités.
            </p>
            <div className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-slate-800 border-none text-white px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none placeholder:text-slate-500"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Abidjan, Côte d'Ivoire<br />Cocody Riviera 2</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>07 87 63 88 15</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>infos.academy@mayelia.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} Mayelia Academy. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
