import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const CGU = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Conditions générales d’utilisation (CGU)"
        description="Conditions générales d’utilisation du site Mayelia Academy."
        canonical="/cgu"
      />
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-6">
            Conditions générales d’utilisation (CGU)
          </h1>
          <div className="prose prose-slate max-w-none">
            <p>
              Cette page précise les conditions d’accès et d’utilisation du site. Le contenu final sera complété par
              l’équipe.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGU;
