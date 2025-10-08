import FormationCard from './FormationCard';
import { Car, Code, Users, Heart } from 'lucide-react';
import automobileImg from '@/assets/formation-automobile.jpg';
import informatiqueImg from '@/assets/formation-informatique.jpg';
import serviceClientImg from '@/assets/formation-service-client.jpg';
import santeImg from '@/assets/formation-sante.jpg';

const Formations = () => {
  const formations = [
    {
      title: 'Automobile',
      description: 'Mécanique, carrosserie, diagnostic embarqué. Devenez expert automobile avec nos formations certifiantes adaptées aux nouvelles technologies.',
      icon: <Car className="w-6 h-6 text-primary-foreground" />,
      image: automobileImg,
    },
    {
      title: 'Informatique',
      description: 'Développement web, cybersécurité, administration systèmes. Maîtrisez les technologies de demain avec nos programmes complets.',
      icon: <Code className="w-6 h-6 text-primary-foreground" />,
      image: informatiqueImg,
    },
    {
      title: 'Service Client',
      description: 'Accueil, relation client omnicanal, techniques de vente. Excellez dans l\'art de la satisfaction client et boostez votre carrière.',
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      image: serviceClientImg,
    },
    {
      title: 'Santé & Sécurité',
      description: 'Prévention, ergonomie, secourisme. Formez-vous aux normes SST et devenez acteur de la sécurité en entreprise.',
      icon: <Heart className="w-6 h-6 text-primary-foreground" />,
      image: santeImg,
    },
  ];

  return (
    <section id="formations" className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4 animate-scale-in">
            Nos Formations
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Quatre pôles d'excellence
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Chaque programme est conçu en partenariat avec des entreprises, animé par des experts certifiés et orienté emploi et performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {formations.map((formation, index) => (
            <FormationCard
              key={formation.title}
              {...formation}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formations;
