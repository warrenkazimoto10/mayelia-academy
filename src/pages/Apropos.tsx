import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Partners from '@/components/Partners';
import { Award, Users, Target, Heart, TrendingUp, BookOpen, Zap, Briefcase, RefreshCw, UserCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aboutHero from '@/assets/about-hero.png';
import defaultMissionImage from '@/assets/about-stats-replacement.jpg';
import { useSiteSettingsValue } from '@/hooks/useSiteSettings';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const Apropos = () => {
  const s = useSiteSettingsValue();
  const missionImageUrl = s.aproposMissionImageUrl?.trim();
  const missionImageSrc = missionImageUrl ? resolveMediaUrl(missionImageUrl) : defaultMissionImage;
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
      <SEO title="À Propos de Nous" description={s.aproposSeoDescription} canonical="/apropos" />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-40 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={aboutHero}
              alt="À propos de Mayelia Academy"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80"></div>
          </div>

          {/* Animated decorative elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-block mb-6 animate-scale-in">
                <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-opensans text-sm font-medium border border-white/30 shadow-lg">
                  ✨ À propos de nous
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-poppins font-bold text-white mb-8 leading-tight animate-slide-in-left drop-shadow-2xl">
                Mayelia Academy
              </h1>
              <p className="text-2xl text-white/95 font-opensans leading-relaxed max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
                Centre de formation d'excellence créé en 2023 par le Groupe Mayelia Participations. Nous constituons un hub d'apprentissage moderne dédié à l'insertion professionnelle et au développement des compétences.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full border border-primary/30 shadow-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="text-primary font-opensans text-sm font-bold">Notre Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {s.aproposMissionHeading}
                </h2>
                {[s.aproposMissionBlock1, s.aproposMissionBlock2, s.aproposMissionBlock3, s.aproposMissionBlock4]
                  .map((p) => p?.trim())
                  .filter(Boolean)
                  .map((text, i) => (
                    <p key={i} className="text-lg text-foreground font-opensans leading-relaxed">
                      {text}
                    </p>
                  ))}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-opensans font-medium text-foreground">Croissance continue</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-lg border border-secondary/20">
                    <Award className="w-5 h-5 text-secondary" />
                    <span className="font-opensans font-medium text-foreground">Certifications reconnues</span>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in group" style={{ animationDelay: '200ms' }}>
                <div className="absolute -inset-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <img
                    src={missionImageSrc}
                    alt="Formation professionnelle Mayelia Academy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4">
                Nos Fondements
              </span>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
                  className="group animate-fade-in hover:shadow-2xl transition-all duration-500 border-2 border-border hover:border-primary/50 hover:-translate-y-3 bg-background relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground font-opensans text-sm leading-relaxed group-hover:text-foreground transition-colors">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Objectifs Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4">
                  Notre Engagement
                </span>
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Nos Objectifs
                </h2>
                <p className="text-lg text-muted-foreground font-opensans max-w-2xl mx-auto">
                  Une vision claire pour transformer la formation professionnelle et accompagner l'insertion sur le marché du travail
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Adaptation technologique",
                    description: "L'adaptation aux nouvelles technologies",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <Briefcase className="w-6 h-6" />,
                    title: "Adéquation formation-emploi",
                    description: "La mise en adéquation entre les formations de base et les emplois disponibles",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: <Award className="w-6 h-6" />,
                    title: "Compétences spécialisées",
                    description: "L'acquisition de compétences spécialisées",
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Formation continue",
                    description: "Le recyclage et formations continues",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: <UserCheck className="w-6 h-6" />,
                    title: "Insertion professionnelle",
                    description: "L'amélioration des compétences pour faciliter l'insertion professionnelle des jeunes",
                    gradient: "from-cyan-500 to-blue-500"
                  },
                ].map((objectif, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-500 border-2 border-border hover:border-primary/50 hover:-translate-y-2 bg-background relative overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${objectif.gradient}`}></div>
                    <CardContent className="p-6 pt-7">
                      <div className={`w-14 h-14 bg-gradient-to-br ${objectif.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {objectif.icon}
                      </div>
                      <h3 className="font-poppins font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {objectif.title}
                      </h3>
                      <p className="text-muted-foreground font-opensans text-sm leading-relaxed group-hover:text-foreground transition-colors">
                        {objectif.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        <span className="text-xs font-opensans font-semibold">Objectif clé</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partenaires Section */}
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default Apropos;
