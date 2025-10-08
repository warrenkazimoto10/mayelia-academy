import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationCard from '@/components/FormationCard';
import { Car, Code, Users, Heart, GraduationCap, BookOpen } from 'lucide-react';
import automobileImg from '@/assets/formation-automobile.jpg';
import informatiqueImg from '@/assets/formation-informatique.jpg';
import serviceClientImg from '@/assets/formation-service-client.jpg';
import santeImg from '@/assets/formation-sante.jpg';
import formationsHero from '@/assets/formations-hero.jpg';
import formationsContent from '@/assets/formations-content.jpg';

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
          <div className="absolute inset-0">
            <img
              src={formationsHero}
              alt="Formations Mayelia Academy"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Nos Formations d'Excellence
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed max-w-3xl mx-auto">
                Chaque programme est conçu en partenariat avec des entreprises leaders, animé par des experts certifiés et orienté vers l'emploi et la performance. Développez vos compétences dans 4 domaines d'expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Image Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={formationsContent} 
                  alt="Environnement de formation professionnel Mayelia Academy" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-primary font-opensans text-sm font-medium">Découvrez nos programmes</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {formations.map((formation, index) => (
                <div key={formation.title} className="space-y-6">
                  <FormationCard
                    {...formation}
                    delay={index * 100}
                  />
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow">
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
        <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-primary-foreground mb-6">
              Prêt à transformer votre avenir ?
            </h2>
            <p className="text-xl text-primary-foreground/90 font-opensans mb-8 max-w-2xl mx-auto">
              Rejoignez Mayelia Academy et bénéficiez d'une formation d'excellence
            </p>
            <a
              href="/rendez-vous"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-opensans font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Prendre rendez-vous
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;
