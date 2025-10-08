import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, Target, Heart, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aboutHero from '@/assets/about-hero.jpg';
import aboutStatsImage from '@/assets/about-stats-replacement.jpg';

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
          <div className="absolute inset-0">
            <img
              src={aboutHero}
              alt="À propos de Mayelia Academy"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-6">
                À propos de nous
              </span>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Mayelia Academy
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed max-w-3xl mx-auto">
                Centre de formation d'excellence créé en 2023 par le Groupe Mayelia Participations. Nous constituons un hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-primary font-opensans text-sm font-medium">Notre Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
                  Former les talents de demain
                </h2>
                <p className="text-lg text-muted-foreground font-opensans leading-relaxed">
                  Mayelia Academy est la branche formation du Groupe Mayelia Participations, créée en 2023 avec une vision claire : transformer l'éducation professionnelle en Guinée et au-delà.
                </p>
                <p className="text-lg text-muted-foreground font-opensans leading-relaxed">
                  Nous constituons un hub d'apprentissage moderne, dédié à l'insertion professionnelle, au développement des compétences et à la reconversion des actifs. Chaque programme est conçu en partenariat avec des entreprises leaders, animé par des experts certifiés et orienté vers l'emploi et la performance.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-opensans font-medium text-foreground">Croissance continue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-opensans font-medium text-foreground">Certifications reconnues</span>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={aboutStatsImage} 
                    alt="Formation professionnelle Mayelia Academy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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

        {/* Objectifs Section */}
        <section className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-primary mb-4">
                  NOS OBJECTIFS
                </h2>
              </div>
              <Card className="border-border shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <ul className="space-y-4 text-foreground font-opensans text-lg leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>L'adaptation aux nouvelles technologies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>La mise en adéquation entre les formations de base et les emplois disponibles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>L'acquisition de compétences spécialisées</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>Le recyclage et formations continues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>L'amélioration des compétences pour faciliter l'insertion professionnelle des jeunes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>L'accompagnement du gouvernement dans la mise en œuvre de son projet relatif à la formation conformément au Plan National de Développement (PND)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Apropos;
