import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import FormationsDomaines from '@/components/FormationsDomaines';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mayelia Academy",
    "url": "https://mayelia-academy.ci",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mayelia-academy.ci/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Accueil"
        description="Mayelia Academy - Hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences."
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
