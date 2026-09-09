import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useActualite } from '@/hooks/useActualites';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import NotFound from '@/pages/NotFound';

const ActualiteDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { actualite, loading } = useActualite(id || '');

    if (loading && !actualite) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!actualite) return <NotFound />;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={actualite.title}
                description={actualite.excerpt}
                canonical={`/actualites/${actualite.id}`}
            />
            <Header />
            <main className="flex-1">

                {/* ── Hero plein écran style presse ── */}
                <section className="relative h-[55vh] min-h-[380px] md:h-[70vh] overflow-hidden bg-secondary">
                    <img
                        src={resolveMediaUrl(actualite.heroImage)}
                        alt={actualite.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Gradient du bas plus prononcé pour lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:pb-14">
                        <div className="container mx-auto max-w-3xl">
                            <Badge className={`${actualite.categoryColor} mb-3 font-opensans text-xs tracking-wide uppercase`}>
                                {actualite.category}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white leading-tight mb-4 drop-shadow-md">
                                {actualite.title}
                            </h1>
                            <div className="flex items-center gap-5 text-sm text-white/70 font-opensans">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {actualite.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {actualite.readTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Contenu éditorial ── */}
                <section className="bg-background py-12">
                    <div className="container mx-auto px-4 max-w-3xl">

                        {/* Retour */}
                        <Link to="/actualites">
                            <Button variant="ghost" className="mb-8 -ml-3 text-muted-foreground hover:text-primary font-opensans">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour aux actualités
                            </Button>
                        </Link>

                        {/* Chapô mis en valeur */}
                        <p className="text-xl text-foreground/80 font-opensans leading-relaxed border-l-4 border-primary pl-5 mb-10 italic">
                            {actualite.excerpt}
                        </p>

                        {/* Corps de l'article */}
                        <article className="space-y-10">
                            {actualite.content.paragraphs.map((paragraph, index) => (
                                <div key={index} className="space-y-5">
                                    {paragraph.image && (
                                        <figure className="my-6">
                                            <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
                                                <img
                                                    src={resolveMediaUrl(paragraph.image.src)}
                                                    alt={paragraph.image.alt}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                            {paragraph.image.caption && (
                                                <figcaption className="mt-2 text-xs text-muted-foreground italic text-center font-opensans">
                                                    {paragraph.image.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    )}
                                    <p className="text-lg text-foreground leading-relaxed font-opensans whitespace-pre-line">
                                        {paragraph.text}
                                    </p>
                                </div>
                            ))}
                        </article>

                        {/* Pied d'article */}
                        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <Link to="/actualites">
                                <Button variant="outline" className="font-opensans font-semibold border-primary/30 hover:border-primary">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Toutes les actualités
                                </Button>
                            </Link>
                            <span className="text-xs text-muted-foreground font-opensans">{actualite.date} · {actualite.readTime}</span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ActualiteDetail;
