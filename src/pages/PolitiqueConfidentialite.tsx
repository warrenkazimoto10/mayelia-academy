import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité du site Mayelia Academy."
        canonical="/politique-de-confidentialite"
      />
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-6">
            Politique de confidentialité
          </h1>
          <div className="prose prose-slate max-w-none">
            <p>
              Cette page décrit la façon dont les données (ex. messages du formulaire de contact) sont collectées,
              utilisées et conservées. Le contenu final sera complété par l’équipe.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
