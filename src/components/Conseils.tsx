import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useConseils } from '@/hooks/useConseils';

const Conseils = () => {
  const { conseils, loading, error } = useConseils();

  if (loading && conseils.length === 0) {
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
            Conseils
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Conseils d'experts
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Bénéficiez de nos conseils pratiques pour développer votre carrière
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && conseils.length === 0 && (
          <p className="text-center text-muted-foreground font-opensans py-16">
            Aucun conseil pour le moment.
          </p>
        )}

        {conseils.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {conseils.slice(0, 3).map((conseil, index) => (
            <Card
              key={conseil.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <Lightbulb className="w-16 h-16 text-primary/30" />
              </div>
              
              <CardContent className="p-6">
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

                <Link to={`/conseils/${conseil.id}`}>
                  <Button 
                    variant="ghost" 
                    className="group/btn p-0 h-auto font-opensans font-semibold text-primary hover:!text-primary/80 hover:bg-transparent w-full justify-start"
                  >
                    Lire le conseil
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {conseils.length > 0 && (
          <div className="text-center mt-4">
            <Link to="/conseils">
              <Button className="font-opensans font-semibold px-8 py-3 text-base">
                Tous les conseils
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Conseils;






