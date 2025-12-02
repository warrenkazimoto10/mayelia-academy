import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Conseils from '@/components/Conseils';
import { Lightbulb } from 'lucide-react';

const ConseilsPage = () => {
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
                <Lightbulb className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Conseils
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Bénéficiez de nos conseils d'experts pour réussir votre reconversion, développer vos compétences et exceller dans votre carrière.
              </p>
            </div>
          </div>
        </section>

        {/* Conseils Section */}
        <Conseils />
      </main>
      <Footer />
    </div>
  );
};

export default ConseilsPage;






