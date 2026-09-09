import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationsDomaines from '@/components/FormationsDomaines';

const Formations = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Nos Formations"
        description="Découvrez nos domaines de formation certifiants : conduite, mécanique, informatique, service client et sécurité routière avec Mayelia Academy."
        canonical="/formations"
      />
      <Header />
      <main>
        <FormationsDomaines />
      </main>
      <Footer />
    </div>
  );
};

export default Formations;
