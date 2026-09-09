import { useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { useSiteSettingsValue } from '@/hooks/useSiteSettings';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import FormationsDomaines from '@/components/FormationsDomaines';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const HEADER_OFFSET = 80;

const scrollToHashElement = (hash: string) => {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return;
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Index = () => {
  const location = useLocation();
  const s = useSiteSettingsValue();
  const base = s.siteUrl.replace(/\/$/, '');

  useLayoutEffect(() => {
    if (!location.hash) return;
    requestAnimationFrame(() => {
      scrollToHashElement(location.hash);
    });
  }, [location.pathname, location.hash]);

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: s.siteName,
      url: base,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${base}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
    [base, s.siteName]
  );

  return (
    <div className="min-h-screen">
      <SEO
        title="Accueil"
        description={s.metaDefaultDescription}
        canonical="/"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <FormationsDomaines />
        <Blog />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
