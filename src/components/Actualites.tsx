import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useActualites } from '@/hooks/useActualites';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const Actualites = () => {
  const { actualites, loading, error } = useActualites();

  if (loading && actualites.length === 0) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

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

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && actualites.length === 0 && (
          <p className="text-center text-muted-foreground font-opensans py-16">
            Aucune actualité pour le moment.
          </p>
        )}

        {actualites.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {actualites.slice(0, 3).map((actualite, index) => (
            <Card
              key={actualite.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-hero relative overflow-hidden">
                <img 
                  src={resolveMediaUrl(actualite.heroImage)} 
                  alt={actualite.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback si l'image n'existe pas
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              
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

                <Link to={`/actualites/${actualite.id}`}>
                  <Button 
                    variant="ghost" 
                    className="group/btn p-0 h-auto font-opensans font-semibold text-primary hover:!text-primary/80 hover:bg-transparent w-full justify-start"
                  >
                    Lire l'article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {actualites.length > 0 && (
          <div className="text-center mt-4">
            <Link to="/actualites">
              <Button className="font-opensans font-semibold px-8 py-3 text-base">
                Toutes les actualités
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Actualites;






