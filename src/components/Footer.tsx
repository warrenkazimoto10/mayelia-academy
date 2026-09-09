import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import defaultLogo from '@/assets/logo_mayelia.png';
import { useQuery } from '@tanstack/react-query';
import { formationsAPI } from '@/lib/api';
import { useSiteSettingsValue } from '@/hooks/useSiteSettings';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const s = useSiteSettingsValue();
  const customLogo = s.siteLogoUrl?.trim();
  const logoSrc = customLogo ? resolveMediaUrl(customLogo) : defaultLogo;

  const { data: formationsPayload } = useQuery({
    queryKey: ['formations'],
    queryFn: () => formationsAPI.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const formationLinks =
    formationsPayload?.domaines?.length ?
      formationsPayload.domaines.map((d) => ({
        label: d.title,
        to: `/formations?domaine=${encodeURIComponent(d.id)}#formations`,
      }))
    : [
        { label: 'Nos formations', to: '/formations' as const },
      ];

  const footerLinks = {
    formations: formationLinks.map(({ label, to }) => ({
      label,
      href: to,
    })),
    quickLinks: [
      { label: 'Accueil', to: '/' },
      { label: 'À propos', to: '/apropos' },
      { label: 'Actualités', to: '/actualites' },
      { label: 'Conseils', to: '/conseils' },
      { label: 'Contact', to: '/contact' },
    ],
    legal: [
      { label: 'Mentions légales', to: '/mentions-legales' as const },
      { label: 'Politique de confidentialité', to: '/politique-de-confidentialite' as const },
      { label: 'CGU', to: '/cgu' as const },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: s.facebookUrl, label: 'Facebook' },
    { icon: Linkedin, href: s.linkedinUrl, label: 'LinkedIn' },
    { icon: Instagram, href: s.instagramUrl, label: 'Instagram' },
  ].filter((x) => x.href?.trim());

  const addressDisplay = [s.addressLine1, s.addressLine2].filter(Boolean).join('\n');

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block w-fit">
              <img src={logoSrc} alt={s.siteName} className="h-10 w-auto" />
            </div>
            <p className="text-slate-400 font-opensans leading-relaxed">{s.footerTagline}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4 pt-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-poppins font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Liens Rapides
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-poppins font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              Nos Domaines
            </h3>
            <ul className="space-y-4">
              {footerLinks.formations.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-secondary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-poppins font-bold mb-6">Restez informé</h3>
            <p className="text-slate-400 text-sm mb-4">{s.newsletterIntro}</p>
            <div className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder={s.newsletterPlaceholder}
                className="bg-slate-800 border-none text-white px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none placeholder:text-slate-500"
                readOnly
                aria-readonly
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0" type="button">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="whitespace-pre-line">{addressDisplay}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {s.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${s.email}`} className="hover:text-primary transition-colors break-all">
                  {s.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} {s.siteName}. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} to={link.to} className="text-slate-500 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
