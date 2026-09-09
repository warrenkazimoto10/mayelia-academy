import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Clock, Target, BookOpen, Loader2 } from 'lucide-react';
import { formationsAPI } from '@/lib/api';
import type { FormationDomainApi } from '@/lib/api';
import { formationDomainHeroImage } from '@/lib/formationDomainHeroImage';
import { domainIconNode } from '@/lib/formationDomainIcons';
import { resolveFormationDomainTheme } from '@/lib/formationDomainThemes';

interface Formation {
    title: string;
    description: string;
    contenus: string[];
    objectifs: string[];
}

interface Domaine {
    id: string;
    title: string;
    icon: React.ReactNode;
    tabSelectedClass: string;
    cardBarClass: string;
    cardIconBgClass: string;
    image: string;
    formations: Formation[];
}

function mapApiDomainesToUi(rows: FormationDomainApi[]): Domaine[] {
    return rows.map((d) => {
        const theme = resolveFormationDomainTheme(d.color, d.gradient);
        return {
            id: d.id,
            title: d.title,
            icon: domainIconNode(d.iconKey, 'w-5 h-5'),
            tabSelectedClass: theme.tabSelected,
            cardBarClass: theme.cardBar,
            cardIconBgClass: theme.cardIconBg,
            image: formationDomainHeroImage(d.id, d.image),
            formations: d.formations.map((f) => ({
                title: f.title,
                description: f.description,
                contenus: f.contenus,
                objectifs: f.objectifs,
            })),
        };
    });
}

const FormationsDomaines = () => {
    const location = useLocation();
    const [selectedDomaine, setSelectedDomaine] = useState<string>('');
    const [expandedFormation, setExpandedFormation] = useState<number | null>(null);
    const [highlightedDomaine, setHighlightedDomaine] = useState<string | null>(null);
    const tabsScrollRef = useRef<HTMLDivElement>(null);
    const tabBtnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [domaines, setDomaines] = useState<Domaine[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const deepLinkHandled = useRef(false);

    const scrollTabIntoView = useCallback((id: string) => {
        const btn = tabBtnRefs.current.get(id);
        btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

    const scrollTabsBy = useCallback((direction: 'left' | 'right') => {
        const el = tabsScrollRef.current;
        if (!el) return;
        const delta = Math.min(320, Math.floor(el.clientWidth * 0.75));
        el.scrollBy({ left: direction === 'left' ? -delta : delta, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setFetchError(null);
        formationsAPI
            .getAll()
            .then((res) => {
                if (cancelled) return;
                const rows = res.domaines?.length ? mapApiDomainesToUi(res.domaines) : [];
                setDomaines(rows);
            })
            .catch((err) => {
                if (!cancelled) {
                    setFetchError(err instanceof Error ? err.message : 'Impossible de charger les formations.');
                    setDomaines([]);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (domaines.length === 0) return;

        if (!deepLinkHandled.current) {
            deepLinkHandled.current = true;
            const requestedId = new URLSearchParams(location.search).get('domaine');
            const match = requestedId ? domaines.find((d) => d.id === requestedId) : undefined;

            if (match) {
                setSelectedDomaine(match.id);
                setHighlightedDomaine(match.id);
                requestAnimationFrame(() => {
                    document.getElementById('formations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    scrollTabIntoView(match.id);
                });
                const timer = setTimeout(() => setHighlightedDomaine(null), 2200);
                return () => clearTimeout(timer);
            }
        }

        setSelectedDomaine((prev) =>
            prev && domaines.some((d) => d.id === prev) ? prev : domaines[0].id
        );
    }, [domaines, location.search, scrollTabIntoView]);

    const currentDomaine = domaines.find((d) => d.id === selectedDomaine) ?? domaines[0];

    if (loading && domaines.length === 0) {
        return (
            <section id="formations" className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 flex min-h-[320px] items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
                </div>
            </section>
        );
    }

    if (fetchError) {
        return (
            <section id="formations" className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 max-w-lg text-center">
                    <p className="text-muted-foreground font-opensans">{fetchError}</p>
                </div>
            </section>
        );
    }

    if (!currentDomaine) {
        return (
            <section id="formations" className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 max-w-lg text-center">
                    <p className="text-muted-foreground font-opensans">
                        Aucun domaine de formation n’est disponible pour le moment.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="formations" className="py-24 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={currentDomaine.image}
                    alt={currentDomaine.title}
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for readability - opacity at 60% for balance */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">

                    <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4 uppercase tracking-tight">
                        NOS DOMAINES D'EXPERTISE
                    </h2>
                    
                </div>

                {/* Domaines — défilement horizontal une ligne */}
                <div className="relative mb-12 max-w-full">
                    <div className="flex items-stretch gap-1 sm:gap-2">
                        <button
                            type="button"
                            aria-label="Faire défiler les domaines vers la gauche"
                            onClick={() => scrollTabsBy('left')}
                            className="hidden sm:flex shrink-0 self-center h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/90 text-foreground shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-muted hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="relative min-w-0 flex-1">
                            <div
                                ref={tabsScrollRef}
                                className="overflow-x-auto overflow-y-visible scroll-smooth pb-6 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory [-webkit-mask-image:linear-gradient(90deg,transparent,white_28px,white_calc(100%-28px),transparent)] [mask-image:linear-gradient(90deg,transparent,white_28px,white_calc(100%-28px),transparent)]"
                            >
                                <div className="flex w-max max-w-none flex-nowrap justify-start gap-2 px-1 sm:justify-center sm:px-2 md:gap-3">
                                    {domaines.map((domaine, tabIndex) => (
                                        <button
                                            key={domaine.id}
                                            type="button"
                                            ref={(node) => {
                                                if (node) tabBtnRefs.current.set(domaine.id, node);
                                                else tabBtnRefs.current.delete(domaine.id);
                                            }}
                                            onClick={() => {
                                                setSelectedDomaine(domaine.id);
                                                setExpandedFormation(null);
                                                requestAnimationFrame(() => scrollTabIntoView(domaine.id));
                                            }}
                                            style={{ animationDelay: `${tabIndex * 70}ms` }}
                                            className={`group relative shrink-0 snap-center whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-opensans font-semibold motion-safe:animate-fade-in motion-safe:transition-all motion-safe:duration-300 active:scale-[0.98] ${selectedDomaine === domaine.id
                                                ? `${domaine.tabSelectedClass} z-[2] text-white shadow-xl ring-2 ring-white/30 motion-safe:scale-[1.03]`
                                                : 'bg-card/95 text-foreground shadow-md backdrop-blur-sm hover:z-[2] hover:shadow-lg motion-safe:hover:scale-[1.02] hover:ring-1 hover:ring-primary/30'
                                                } ${highlightedDomaine === domaine.id ? 'motion-safe:animate-[pulse_0.7s_ease-in-out_2] ring-4 ring-offset-2 ring-primary' : ''}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`transition-transform duration-300 ease-out ${selectedDomaine === domaine.id ? 'scale-110' : 'group-hover:scale-110'}`}
                                                >
                                                    {domaine.icon}
                                                </div>
                                                <span className="uppercase tracking-wide text-[11px] sm:text-xs md:text-sm">
                                                    {domaine.title}
                                                </span>
                                            </div>
                                            {selectedDomaine === domaine.id && (
                                                <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white motion-safe:animate-domaine-indicator-glow" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-label="Faire défiler les domaines vers la droite"
                            onClick={() => scrollTabsBy('right')}
                            className="hidden sm:flex shrink-0 self-center h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/90 text-foreground shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-muted hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground/90 font-opensans sm:hidden">
                        Faites défiler horizontalement pour voir tous les domaines
                    </p>
                </div>

                {/* Formations Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {currentDomaine.formations.map((formation, index) => (
                            <div
                                key={index}
                                className="group relative animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card */}
                                <div className="relative h-full bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    {/* Gradient Header */}
                                    <div className={`h-3 ${currentDomaine.cardBarClass}`}></div>

                                    {/* Content */}
                                    <div className="p-8">
                                        {/* Title */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className={`p-4 rounded-xl ${currentDomaine.cardIconBgClass} flex-shrink-0`}>
                                                <BookOpen className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-poppins font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                                                {formation.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-base text-muted-foreground font-opensans leading-relaxed mb-5 line-clamp-3">
                                            {formation.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 mb-5 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5" />
                                                <span>Durée variable</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Target className="w-5 h-5" />
                                                <span>{formation.objectifs.length} objectifs</span>
                                            </div>
                                        </div>

                                        {/* Expand Button */}
                                        <button
                                            onClick={() => setExpandedFormation(expandedFormation === index ? null : index)}
                                            className="w-full py-3 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 rounded-lg font-opensans font-semibold text-base text-primary transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <span>{expandedFormation === index ? 'Voir moins' : 'Voir les détails'}</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedFormation === index ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Expanded Content */}
                                        {expandedFormation === index && (
                                            <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                                                {/* Contenus */}
                                                <div className="mb-6">
                                                    <h4 className="text-base font-poppins font-bold text-foreground mb-3 flex items-center gap-2">
                                                        <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                                                        Contenus
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {formation.contenus.map((contenu, idx) => (
                                                            <li key={idx} className="text-sm text-muted-foreground font-opensans leading-relaxed flex items-start gap-3">
                                                                <span className="text-primary mt-1 text-lg">•</span>
                                                                <span>{contenu}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Objectifs */}
                                                <div>
                                                    <h4 className="text-base font-poppins font-bold text-foreground mb-3 flex items-center gap-2">
                                                        <div className="w-1.5 h-5 bg-secondary rounded-full"></div>
                                                        Objectifs
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {formation.objectifs.map((objectif, idx) => (
                                                            <li key={idx} className="text-sm text-muted-foreground font-opensans leading-relaxed flex items-start gap-3">
                                                                <span className="text-secondary mt-1 text-lg">•</span>
                                                                <span>{objectif}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section
                <div className="mt-16 text-center animate-fade-in">
                    <div className="inline-block p-8 bg-card/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-xl">
                        <p className="text-lg font-opensans text-muted-foreground mb-4">
                            Intéressé par l'une de nos formations ?
                        </p>
                        <a href="/rendez-vous">
                            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-opensans font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Prendre rendez-vous
                            </button>
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default FormationsDomaines;
