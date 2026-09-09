import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConseil } from '@/hooks/useConseils';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import NotFound from '@/pages/NotFound';

const ConseilDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { conseil, loading } = useConseil(id || '');

    if (loading && !conseil) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!conseil) return <NotFound />;

    const conseilHeroUrl = conseil.image ? resolveMediaUrl(conseil.image) : '';
    const paragraphs = conseil.content?.paragraphs ?? [];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={conseil.title}
                description={conseil.excerpt}
                canonical={`/conseils/${conseil.id}`}
            />
            <Header />
            <main className="flex-1">

                {/* ── Hero style guide : bande colorée + icône, pas de grande photo ── */}
                <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
                    {/* Image de fond optionnelle, très atténuée */}
                    {conseilHeroUrl && (
                        <img
                            src={conseilHeroUrl}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    )}
                    {/* Motif décoratif */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative container mx-auto px-4 max-w-4xl py-16 md:py-24">
                        {/* Badge catégorie */}
                        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                            <Lightbulb className="w-4 h-4 text-yellow-300" />
                            <span className="text-white/90 font-opensans text-sm font-medium tracking-wide">Conseil expert</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white leading-tight mb-6 max-w-2xl">
                            {conseil.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-5 text-sm text-white/70 font-opensans">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {conseil.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {conseil.readTime}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4" />
                                {paragraphs.length} point{paragraphs.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── Corps du conseil ── */}
                <section className="bg-slate-50 dark:bg-background py-12">
                    <div className="container mx-auto px-4 max-w-4xl">

                        {/* Retour */}
                        <Link to="/conseils">
                            <Button variant="ghost" className="mb-8 -ml-3 text-muted-foreground hover:text-teal-600 font-opensans">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour aux conseils
                            </Button>
                        </Link>

                        {/* Card résumé */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-10 flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-0.5">
                                <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 font-opensans mb-1 uppercase tracking-wide">En résumé</p>
                                <p className="text-base text-foreground/80 font-opensans leading-relaxed">
                                    {conseil.excerpt}
                                </p>
                            </div>
                        </div>

                        {/* Paragraphes numérotés */}
                        {paragraphs.length > 0 ? (
                            <div className="space-y-10">
                                {paragraphs.map((paragraph, index) => (
                                    <div key={index} className="flex gap-5 md:gap-8 group">
                                        {/* Numéro */}
                                        <div className="shrink-0 flex flex-col items-center">
                                            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-sm font-poppins font-bold text-emerald-700 dark:text-emerald-300 ring-2 ring-white shadow">
                                                {index + 1}
                                            </div>
                                            {index < paragraphs.length - 1 && (
                                                <div className="mt-2 w-px flex-1 min-h-[2rem] bg-emerald-200/60 dark:bg-emerald-800/60" />
                                            )}
                                        </div>

                                        {/* Contenu */}
                                        <div className="pb-4 flex-1">
                                            {paragraph.image && (
                                                <figure className="mb-5">
                                                    <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg">
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
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg text-foreground leading-relaxed font-opensans">
                                {conseil.excerpt}
                            </p>
                        )}

                        {/* Pied de page conseil */}
                        <div className="mt-14 pt-8 border-t border-border">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <Link to="/conseils">
                                    <Button
                                        variant="outline"
                                        className="font-opensans font-semibold border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500 dark:text-emerald-400 dark:border-emerald-700"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Tous les conseils
                                    </Button>
                                </Link>
                                <span className="text-xs text-muted-foreground font-opensans">{conseil.date} · {conseil.readTime}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ConseilDetail;
