import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Loader2, Newspaper, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useActualites } from '@/hooks/useActualites';
import { useConseils } from '@/hooks/useConseils';
import type { Actualite, Conseil } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const Blog = () => {
  const [activeTab, setActiveTab] = useState<'actualites' | 'conseils'>('actualites');

  const { actualites, loading: loadingActualites, error: errorActualites } = useActualites();
  const { conseils, loading: loadingConseils, error: errorConseils } = useConseils();

  const displayedActualites = actualites.slice(0, 3);
  const displayedConseils = conseils.slice(0, 3);
  const displayedItems =
    activeTab === 'actualites' ? displayedActualites : displayedConseils;

  const loading = activeTab === 'actualites' ? loadingActualites : loadingConseils;
  const error = activeTab === 'actualites' ? errorActualites : errorConseils;

  return (
    <section id="actualites" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6">
            Actualités et Conseils
          </h2>
          <p className="text-lg text-muted-foreground font-opensans mb-8">
            Restez informé des dernières nouvelles de l&apos;académie et profitez de nos conseils d&apos;experts.
          </p>

          <div className="inline-flex p-1 bg-muted rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('actualites')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-opensans font-semibold transition-all duration-300 ${
                activeTab === 'actualites'
                  ? 'bg-white text-primary shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Actualités
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('conseils')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-opensans font-semibold transition-all duration-300 ${
                activeTab === 'conseils'
                  ? 'bg-white text-secondary shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Conseils
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
            <p className="text-sm text-destructive font-opensans">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center min-h-[280px] items-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : displayedItems.length === 0 ? (
          <p className="text-center text-muted-foreground font-opensans py-16">
            {activeTab === 'actualites' ? 'Aucune actualité pour le moment.' : 'Aucun conseil pour le moment.'}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedItems.map((item, index) => {
              const isActualite = activeTab === 'actualites';
              const itemId = isActualite ? (item as Actualite).id : (item as Conseil).id;
              const rawImg = isActualite
                ? (item as Actualite).heroImage
                : (item as Conseil).image;
              const itemImage = resolveMediaUrl(rawImg);
  const itemCategoryColor = isActualite ? (item as Actualite).categoryColor : '';

              return (
                <Card
                  key={String(itemId)}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-border overflow-hidden bg-card h-full flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-48 overflow-hidden relative ${!itemImage ? 'bg-gradient-hero' : ''}`}>
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.className += ' bg-gradient-hero';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      {isActualite ? (
                        <Badge className={`${itemCategoryColor} font-opensans border-none px-3 py-1`}>
                          {item.category}
                        </Badge>
                      ) : (
                        <span />
                      )}
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

                      {isActualite && itemId != null && String(itemId) !== '' ? (
                        <Link to={`/actualites/${itemId}`}>
                          <Button
                            variant="ghost"
                            className="group/btn p-0 h-auto font-opensans font-bold text-primary hover:text-primary/80 hover:bg-transparent"
                          >
                            Lire la suite
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : !isActualite && itemId != null && String(itemId) !== '' ? (
                        <Link to={`/conseils/${itemId}`}>
                          <Button
                            variant="ghost"
                            className="group/btn p-0 h-auto font-opensans font-bold text-primary hover:text-primary/80 hover:bg-transparent"
                          >
                            Lire la suite
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="ghost"
                          className="group/btn p-0 h-auto font-opensans font-bold text-primary hover:text-primary/80 hover:bg-transparent"
                        >
                          Lire la suite
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
