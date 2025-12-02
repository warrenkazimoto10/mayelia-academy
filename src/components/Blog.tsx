import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Newspaper, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import des images
import newsElectricCar from '@/assets/news_electric_car.png';
import newsPartnership from '@/assets/news_partnership.png';
import newsCampus from '@/assets/news_campus.png';
import formationSanteImage from '@/assets/formation-sante.png';
import aboutHeroImage from '@/assets/about-hero.png';
import driverTrainingImage from '@/assets/about_us_driver_training.png';

const Blog = () => {
  const [activeTab, setActiveTab] = useState<'actualites' | 'conseils'>('conseils');

  const actualites = [
    {
      title: 'Les métiers de demain dans l\'automobile électrique',
      excerpt: 'Découvrez les nouvelles opportunités professionnelles dans le secteur automobile en pleine transformation vers l\'électrique.',
      category: 'Automobile',
      date: '15 Oct 2025',
      readTime: '5 min',
      categoryColor: 'bg-blue-100 text-blue-600',
      image: newsElectricCar
    },
    {
      title: 'Nouveau partenariat stratégique pour l\'emploi',
      excerpt: 'Mayelia Academy signe un accord majeur avec les leaders de l\'industrie pour faciliter l\'insertion de nos diplômés.',
      category: 'Partenariat',
      date: '12 Oct 2025',
      readTime: '3 min',
      categoryColor: 'bg-purple-100 text-purple-600',
      image: newsPartnership
    },
    {
      title: 'Rentrée académique 2025 : Bienvenue aux nouveaux',
      excerpt: 'Retour en images sur la journée d\'intégration de nos nouveaux étudiants sur le campus.',
      category: 'Vie du Campus',
      date: '08 Oct 2025',
      readTime: '4 min',
      categoryColor: 'bg-green-100 text-green-600',
      image: newsCampus
    },
  ];

  const conseils = [
    {
      title: 'Comment réussir sa reconversion professionnelle',
      excerpt: 'Guide complet et étapes clés pour les professionnels souhaitant se reconvertir avec succès dans un nouveau métier.',
      category: 'Carrière',
      date: '20 Sep 2025',
      readTime: '7 min',
      categoryColor: 'bg-orange-100 text-orange-600',
      image: formationSanteImage
    },
    {
      title: 'Les 5 compétences clés du service client moderne',
      excerpt: 'Maîtrisez les soft skills indispensables pour exceller dans la relation client à l\'ère du digital.',
      category: 'Compétences',
      date: '18 Sep 2025',
      readTime: '6 min',
      categoryColor: 'bg-pink-100 text-pink-600',
      image: aboutHeroImage
    },
    {
      title: 'Sécurité routière : Les bons réflexes au volant',
      excerpt: 'Conseils d\'experts pour adopter une conduite préventive et réduire les risques d\'accidents professionnels.',
      category: 'Sécurité',
      date: '10 Sep 2025',
      readTime: '5 min',
      categoryColor: 'bg-red-100 text-red-600',
      image: driverTrainingImage
    },
  ];

  const displayedItems = activeTab === 'actualites' ? actualites : conseils;

  return (
    <section id="actualites" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">

          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6">
            Actualités et Conseils
          </h2>
          <p className="text-lg text-muted-foreground font-opensans mb-8">
            Restez informé des dernières nouvelles de l'académie et profitez de nos conseils d'experts.
          </p>

          {/* Tabs Navigation */}
          <div className="inline-flex p-1 bg-muted rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('actualites')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-opensans font-semibold transition-all duration-300 ${activeTab === 'actualites'
                ? 'bg-white text-primary shadow-md scale-105'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Newspaper className="w-4 h-4" />
              Actualités
            </button>
            <button
              onClick={() => setActiveTab('conseils')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-opensans font-semibold transition-all duration-300 ${activeTab === 'conseils'
                ? 'bg-white text-secondary shadow-md scale-105'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Lightbulb className="w-4 h-4" />
              Conseils
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-border overflow-hidden bg-card h-full flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge className={`${item.categoryColor} font-opensans border-none px-3 py-1`}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-poppins font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-muted-foreground font-opensans mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.date}
                  </div>

                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-opensans font-bold text-primary hover:text-primary/80 hover:bg-transparent"
                  >
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href={activeTab === 'actualites' ? "/actualites" : "/conseils"}>
            <Button
              variant="outline"
              size="lg"
              className="font-opensans font-semibold hover:bg-primary hover:text-white transition-all duration-300 px-8 border-primary/20 hover:border-primary"
            >
              Voir {activeTab === 'actualites' ? 'toutes les actualités' : 'tous les conseils'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
