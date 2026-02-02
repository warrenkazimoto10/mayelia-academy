import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getActualiteById } from '@/data/actualites';
import NotFound from '@/pages/NotFound';

const ActualiteDetail = () => {
    const { id } = useParams<{ id: string }>();
    const actualite = id ? getActualiteById(id) : undefined;

    if (!actualite) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={actualite.title}
                description={actualite.excerpt}
                canonical={`/actualites/${actualite.id}`}
            />
            <Header />
            <main className="flex-1">
                {/* Hero Image Section */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <img
                        src={actualite.heroImage}
                        alt={actualite.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback si l'image n'existe pas
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.className += ' bg-gradient-to-br from-secondary via-secondary/95 to-primary/20';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="container mx-auto max-w-4xl">
                            <Badge className={`${actualite.categoryColor} mb-4 font-opensans`}>
                                {actualite.category}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-4">
                                {actualite.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-opensans">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {actualite.date}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {actualite.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Link to="/actualites">
                            <Button
                                variant="ghost"
                                className="mb-8 flex items-center text-muted-foreground hover:text-primary"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour aux Actualités
                            </Button>
                        </Link>

                        <article className="prose prose-lg max-w-none">
                            <div className="space-y-8">
                                {actualite.content.paragraphs.map((paragraph, index) => (
                                    <div key={index} className="space-y-4">
                                        {/* Image avant le texte si présente */}
                                        {paragraph.image && (
                                            <figure className="space-y-2">
                                                <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
                                                    <img
                                                        src={paragraph.image.src}
                                                        alt={paragraph.image.alt}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                                {paragraph.image.caption && (
                                                    <figcaption className="text-sm text-muted-foreground italic text-center font-opensans">
                                                        {paragraph.image.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        )}
                                        
                                        {/* Texte du paragraphe */}
                                        <p className="text-lg text-foreground leading-relaxed font-opensans">
                                            {paragraph.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        {/* Navigation vers autres actualités */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <Link to="/actualites">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Voir toutes les actualités
                                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ActualiteDetail;
