import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '@/assets/logo_mayelia.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#apropos' },
    { label: 'Formations', href: '#formations' },
    { label: 'Actualités', href: '#actualites' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-md ${isScrolled ? 'py-3' : 'py-5'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center space-x-2 group"
          >
            <img
              src={logo}
              alt="Mayelia Academy"
              className={`w-auto transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'}`}
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="font-opensans text-sm font-bold text-slate-600 hover:text-primary transition-all duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={() => {
                const newMode = !isDarkMode;
                if (newMode) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                setIsDarkMode(newMode);
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA Button - Plus petit */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-opensans text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
            >
              Prendre rendez-vous
            </a>

            {/* Partner Logos - Plus petits */}
            <div className="flex items-center pl-4 border-l border-slate-200 gap-3">
              <img
                src="https://fdfp.ci/wp-content/uploads/2019/09/logo-fdfp02.png"
                alt="FDFP"
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://public.codesrousseau.fr/images/public/logo-2025-white.svg"
                alt="Code Rousseau"
                className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity invert"
              />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="flex flex-col space-y-4 pb-6 border-t border-slate-100 pt-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-opensans text-lg font-medium text-slate-700 hover:text-primary transition-colors pl-2 border-l-4 border-transparent hover:border-primary"
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-opensans font-bold mt-4"
              onClick={(e) => scrollToSection(e, '#contact')}
            >
              Prendre rendez-vous
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
