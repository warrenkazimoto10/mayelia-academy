import { useEffect, useState, useCallback } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { partnersAPI, type Partner } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import { Button } from '@/components/ui/button';

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    let cancelled = false;
    partnersAPI
      .getAll()
      .then((data) => { if (!cancelled) setPartners(data); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const PartnerCard = ({ partner }: { partner: Partner }) => {
    const logoSrc = resolveMediaUrl(partner.logoUrl);
    const inner = (
      <div className="group relative flex items-center justify-center h-28 p-5 rounded-2xl bg-white hover:bg-white transition-all duration-500 border border-border/50 hover:border-primary/20 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] overflow-hidden w-44 shrink-0">
        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={`Logo ${partner.name}`}
            className="relative z-10 h-auto max-h-14 w-full object-contain transition-all duration-500 transform group-hover:scale-110"
          />
        ) : (
          <span className="relative z-10 text-xs text-muted-foreground text-center font-opensans">{partner.name}</span>
        )}
      </div>
    );

    if (partner.websiteUrl) {
      return (
        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
          {inner}
        </a>
      );
    }
    return <div>{inner}</div>;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            Ils nous font <span className="text-primary italic">confiance</span>
          </h2>
          <div className="w-12 h-1 bg-primary/30 mx-auto rounded-full mb-6" />

        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-muted-foreground font-opensans text-sm py-8">{error}</p>
        )}

        {!loading && !error && partners.length === 0 && (
          <p className="text-center text-muted-foreground font-opensans py-8">
            Aucun partenaire à afficher pour le moment.
          </p>
        )}

        {!loading && partners.length > 0 && (
          <div className="relative">
            {/* Prev button */}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-white border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Carousel */}
            <div className="overflow-hidden mx-4" ref={emblaRef}>
              <div className="flex gap-5">
                {partners.map((partner) => (
                  <div key={partner.id} className="shrink-0">
                    <PartnerCard partner={partner} />
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-white border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
