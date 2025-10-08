import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const articles = [
    {
      title: 'Les métiers de demain dans l\'automobile électrique',
      excerpt: 'Découvrez les nouvelles opportunités professionnelles dans le secteur automobile en pleine transformation.',
      category: 'Automobile',
      date: '15 Oct 2025',
      readTime: '5 min',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Comment réussir sa reconversion en cybersécurité',
      excerpt: 'Guide complet pour les professionnels souhaitant se reconvertir dans la sécurité informatique.',
      category: 'Informatique',
      date: '12 Oct 2025',
      readTime: '7 min',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'L\'excellence du service client à l\'ère digitale',
      excerpt: 'Les compétences essentielles pour exceller dans la relation client omnicanal moderne.',
      category: 'Service Client',
      date: '08 Oct 2025',
      readTime: '4 min',
      categoryColor: 'bg-accent/10 text-accent',
    },
  ];

  return (
    <section id="blog" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-secondary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4">
            Blog & Actualités
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Conseils et tendances
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Restez informés des dernières actualités de la formation professionnelle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-hero"></div>
              
              <CardContent className="p-6">
                <Badge className={`${article.categoryColor} mb-3 font-opensans`}>
                  {article.category}
                </Badge>

                <h3 className="text-xl font-poppins font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground font-opensans mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground font-opensans mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
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

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="font-opensans font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Voir tous les articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
