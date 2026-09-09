import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Mentions légales"
        description="Mentions légales du site Mayelia Academy."
        canonical="/mentions-legales"
      />
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-6">Mentions légales</h1>
          <div className="prose prose-slate max-w-none">
            <p>
              Cette page est destinée à présenter les informations légales de Mayelia Academy (éditeur du site, hébergeur,
              contact, et conditions d’utilisation). Le contenu final sera complété par l’équipe.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
