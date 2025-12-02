import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Conseils = () => {
  const conseils = [
    {
      title: 'Comment réussir sa reconversion professionnelle',
      excerpt: 'Guide complet pour une reconversion réussie : identifier vos compétences transférables, choisir le bon secteur et préparer votre transition.',
      category: 'Reconversion',
      date: '19 Oct 2025',
      readTime: '8 min',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      title: '5 compétences essentielles pour le service client moderne',
      excerpt: 'Découvrez les compétences clés qu\'un professionnel du service client doit maîtriser pour exceller dans son métier aujourd\'hui.',
      category: 'Service Client',
      date: '17 Oct 2025',
      readTime: '6 min',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Se former en informatique : par où commencer ?',
      excerpt: 'Conseils pratiques pour débuter une formation en informatique, choisir la spécialisation qui vous correspond et maximiser vos chances de réussite.',
      category: 'Informatique',
      date: '14 Oct 2025',
      readTime: '7 min',
      categoryColor: 'bg-accent/10 text-accent',
    },
    {
      title: 'Mécanique automobile : les technologies à maîtriser',
      excerpt: 'Panorama des technologies essentielles pour les mécaniciens modernes : du diagnostic embarqué aux véhicules électriques.',
      category: 'Automobile',
      date: '11 Oct 2025',
      readTime: '9 min',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Optimiser son CV après une formation professionnelle',
      excerpt: 'Nos conseils pour mettre en valeur votre formation dans votre CV et maximiser vos chances lors des entretiens d\'embauche.',
      category: 'Carrière',
      date: '09 Oct 2025',
      readTime: '5 min',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Santé et sécurité au travail : prévention et bonnes pratiques',
      excerpt: 'Guide pratique pour intégrer la prévention des risques professionnels dans votre quotidien et protéger votre santé.',
      category: 'Sécurité',
      date: '06 Oct 2025',
      readTime: '6 min',
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
            Conseils
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Conseils d'experts
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Bénéficiez de nos conseils pratiques pour développer votre carrière
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {conseils.map((conseil, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <Lightbulb className="w-16 h-16 text-primary/30" />
              </div>
              
              <CardContent className="p-6">
                <Badge className={`${conseil.categoryColor} mb-3 font-opensans`}>
                  {conseil.category}
                </Badge>

                <h3 className="text-xl font-poppins font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {conseil.title}
                </h3>

                <p className="text-muted-foreground font-opensans mb-4 line-clamp-3">
                  {conseil.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground font-opensans mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {conseil.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {conseil.readTime}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="group/btn p-0 h-auto font-opensans font-semibold text-primary hover:text-primary/80"
                >
                  Lire le conseil
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

export default Conseils;






