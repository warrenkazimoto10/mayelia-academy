import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Actualites = () => {
  const actualites = [
    {
      title: 'Nouveau partenariat avec Orange Côte d\'Ivoire',
      excerpt: 'Mayelia Academy annonce un nouveau partenariat stratégique avec Orange pour renforcer la formation en technologies de l\'information.',
      category: 'Partenariat',
      date: '20 Oct 2025',
      readTime: '3 min',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Lancement de la session de formation automne 2025',
      excerpt: 'Découvrez les nouvelles formations disponibles pour la session d\'automne 2025 dans nos quatre domaines d\'expertise.',
      category: 'Formation',
      date: '18 Oct 2025',
      readTime: '4 min',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Mayelia Academy s\'agrandit : nouvel espace à Abidjan',
      excerpt: 'Un nouveau centre de formation moderne ouvrira ses portes le mois prochain pour accueillir encore plus d\'apprenants.',
      category: 'Événement',
      date: '15 Oct 2025',
      readTime: '5 min',
      categoryColor: 'bg-accent/10 text-accent',
    },
    {
      title: 'Certification FDFP : nouvelles accréditations obtenues',
      excerpt: 'Nos programmes de formation ont reçu de nouvelles accréditations du Fonds de Développement de la Formation Professionnelle.',
      category: 'Certification',
      date: '12 Oct 2025',
      readTime: '6 min',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Témoignages de réussite : promotion 2024',
      excerpt: 'Découvrez les parcours inspirants de nos anciens apprenants qui ont trouvé un emploi dans les 6 mois suivant leur formation.',
      category: 'Succès',
      date: '10 Oct 2025',
      readTime: '5 min',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Table ronde : L\'avenir de la formation professionnelle',
      excerpt: 'Rejoignez-nous pour une table ronde avec des experts du secteur sur l\'évolution de la formation professionnelle en Afrique.',
      category: 'Événement',
      date: '08 Oct 2025',
      readTime: '4 min',
      categoryColor: 'bg-accent/10 text-accent',
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-secondary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4">
            Actualités
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Toutes nos actualités
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Restez informés des dernières nouvelles de Mayelia Academy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {actualites.map((actualite, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-hero"></div>
              
              <CardContent className="p-6">
                <Badge className={`${actualite.categoryColor} mb-3 font-opensans`}>
                  {actualite.category}
                </Badge>

                <h3 className="text-xl font-poppins font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {actualite.title}
                </h3>

                <p className="text-muted-foreground font-opensans mb-4 line-clamp-3">
                  {actualite.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground font-opensans mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {actualite.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {actualite.readTime}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="group/btn p-0 h-auto font-opensans font-semibold text-primary hover:text-primary/80"
                >
                  Lire l'article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Actualites;






