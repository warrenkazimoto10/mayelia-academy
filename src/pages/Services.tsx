import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationsSection from '@/components/Formations';

const Services = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Nos Services"
        description="Découvrez l'ensemble des services proposés par Mayelia Academy pour accompagner votre réussite professionnelle."
        canonical="/services"
      />
      <Header />
      <main>
        <FormationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;







