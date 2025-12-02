import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Actualites from '@/components/Actualites';
import { Newspaper } from 'lucide-react';

const ActualitesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Actualités
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Découvrez toutes les actualités de Mayelia Academy : partenariats, événements, nouvelles formations et témoignages de succès.
              </p>
            </div>
          </div>
        </section>

        {/* Actualités Section */}
        <Actualites />
      </main>
      <Footer />
    </div>
  );
};

export default ActualitesPage;






