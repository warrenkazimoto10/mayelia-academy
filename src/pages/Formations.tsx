import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationCard from '@/components/FormationCard';
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
      details: {
        duree: '6-12 mois',
        niveau: 'Débutant à Avancé',
        certification: 'Certifié',
        modules: [
          'Mécanique générale',
          'Diagnostic électronique',
          'Carrosserie et peinture',
          'Maintenance préventive',
        ],
      },
    },
    {
      title: 'Informatique',
      description: 'Développement web, cybersécurité, administration systèmes. Maîtrisez les technologies de demain avec nos programmes complets.',
      icon: <Code className="w-6 h-6 text-primary-foreground" />,
      image: informatiqueImg,
      details: {
        duree: '6-18 mois',
        niveau: 'Débutant à Expert',
        certification: 'Diplômé',
        modules: [
          'Développement web (HTML, CSS, JavaScript)',
          'Cybersécurité et réseaux',
          'Administration systèmes',
          'Base de données',
        ],
      },
    },
    {
      title: 'Service Client',
      description: 'Accueil, relation client omnicanal, techniques de vente. Excellez dans l\'art de la satisfaction client et boostez votre carrière.',
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      image: serviceClientImg,
      details: {
        duree: '3-6 mois',
        niveau: 'Tous niveaux',
        certification: 'Certifié',
        modules: [
          'Accueil et communication',
          'Gestion de la relation client',
          'Techniques de vente',
          'Résolution de conflits',
        ],
      },
    },
    {
      title: 'Santé & Sécurité',
      description: 'Prévention, ergonomie, secourisme. Formez-vous aux normes SST et devenez acteur de la sécurité en entreprise.',
      icon: <Heart className="w-6 h-6 text-primary-foreground" />,
      image: santeImg,
      details: {
        duree: '2-4 mois',
        niveau: 'Débutant',
        certification: 'SST Certifié',
        modules: [
          'Prévention des risques',
          'Secourisme et premiers secours',
          'Ergonomie au travail',
          'Normes de sécurité',
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-6">
                Nos Formations
              </span>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Quatre pôles d'excellence
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Chaque programme est conçu en partenariat avec des entreprises, animé par des experts certifiés et orienté emploi et performance
              </p>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {formations.map((formation, index) => (
                <div key={formation.title} className="space-y-6">
                  <FormationCard
                    {...formation}
                    delay={index * 100}
                  />
                  <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground font-opensans mb-1">Durée</p>
                        <p className="font-poppins font-semibold text-foreground">{formation.details.duree}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-opensans mb-1">Niveau</p>
                        <p className="font-poppins font-semibold text-foreground">{formation.details.niveau}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-opensans mb-1">Status</p>
                        <p className="font-poppins font-semibold text-primary">{formation.details.certification}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold text-foreground mb-3">Modules principaux :</h4>
                      <ul className="space-y-2">
                        {formation.details.modules.map((module, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="font-opensans text-muted-foreground text-sm">{module}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-primary-foreground mb-6">
              Prêt à transformer votre avenir ?
            </h2>
            <p className="text-xl text-primary-foreground/90 font-opensans mb-8 max-w-2xl mx-auto">
              Rejoignez Mayelia Academy et bénéficiez d'une formation d'excellence
            </p>
            <a
              href="/inscription"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-opensans font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              S'inscrire maintenant
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;
