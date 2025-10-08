import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, Target, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Apropos = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque formation pour garantir le succès de nos apprenants.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Proximité',
      description: 'Un accompagnement personnalisé et un suivi sur mesure pour chaque étudiant.',
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Innovation',
      description: 'Des méthodes pédagogiques modernes et adaptées aux besoins du marché.',
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Engagement',
      description: 'Nous sommes engagés à transformer des vies par l\'éducation et la formation.',
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
                À propos de nous
              </span>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Mayelia Academy
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Un hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences depuis 2023
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-8 text-center">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground font-opensans leading-relaxed mb-6 text-center">
                Mayelia Academy, créée en 2023, est la branche formation du Groupe Mayelia Participations. 
                Nous constituons un hub d'apprentissage moderne, dédié à l'insertion professionnelle, 
                au développement des compétences et à la reconversion des actifs.
              </p>
              <p className="text-lg text-muted-foreground font-opensans leading-relaxed text-center">
                Chaque programme est conçu en partenariat avec des entreprises, animé par des experts certifiés 
                et orienté emploi et performance.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
                Nos Valeurs
              </h2>
              <p className="text-lg text-muted-foreground font-opensans">
                Les principes qui guident notre action au quotidien
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="animate-fade-in hover:shadow-xl transition-all duration-500 border-border hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      {value.icon}
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground font-opensans text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-5xl md:text-6xl font-poppins font-bold text-primary-foreground mb-2">
                  500+
                </div>
                <p className="text-primary-foreground/90 font-opensans text-lg">
                  Étudiants formés
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="text-5xl md:text-6xl font-poppins font-bold text-primary-foreground mb-2">
                  95%
                </div>
                <p className="text-primary-foreground/90 font-opensans text-lg">
                  Taux d'insertion
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="text-5xl md:text-6xl font-poppins font-bold text-primary-foreground mb-2">
                  4
                </div>
                <p className="text-primary-foreground/90 font-opensans text-lg">
                  Domaines d'expertise
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Apropos;
