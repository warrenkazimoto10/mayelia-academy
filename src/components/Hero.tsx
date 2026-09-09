import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/about-hero.png';
import drivingSimulator from '@/assets/driving_simulator.png';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { heroSlidesAPI, type HeroSlide } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: -1,
    sortOrder: 0,
    imageUrl: heroImage,
    overlayOpacity: 90,
    description: 'Développez vos compétences.\nBâtissez votre avenir.',
    linkUrl: '#formations',
  },
  {
    id: -2,
    sortOrder: 1,
    imageUrl: drivingSimulator,
    overlayOpacity: 90,
    description:
      "Maîtrisez la route\nen toute sécurité.\n\nFormation sur simulateur de conduite de dernière génération pour une expérience d'apprentissage immersive et sécurisée.",
    linkUrl: '#formations',
  },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

function HeroCta({ href, children }: { href: string | null | undefined; children: React.ReactNode }) {
  const raw = href?.trim() || '#formations';
  if (raw.startsWith('#')) {
    return (
      <a href={raw} onClick={(e) => scrollToSection(e, raw)}>
        {children}
      </a>
    );
  }
  if (/^https?:\/\//i.test(raw)) {
    return (
      <a href={raw} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  return <Link to={path}>{children}</Link>;
}

function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({ loop: slides.length > 1 });
  }, [emblaApi, slides.length]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* overflow-hidden requis par Embla pour ne montrer qu’un slide et activer le défilement */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => {
            const imgSrc = resolveMediaUrl(slide.imageUrl);
            const ctaHref = slide.linkUrl?.trim() || '#formations';
            return (
              <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 relative">
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
                  <div className="absolute inset-0">
                    <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-transparent"
                      style={{ opacity: (slide.overlayOpacity ?? 90) / 100 }}
                    />
                  </div>

                  <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
                  <div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: '2s' }}
                  />

                  <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                      {(() => {
                        const raw = slide.description?.trim() ?? '';
                        const parts = raw.split('\n');
                        const line1 = (parts[0] ?? '').trim();
                        const line2 = (parts[1] ?? '').trim();
                        const rest = parts
                          .slice(2)
                          .join('\n')
                          .trim();
                        return (
                          <>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-foreground mb-6 leading-tight animate-slide-in-left">
                              {line1}
                              {line2 ? (
                                <>
                                  <br />
                                  <span className="text-primary">{line2}</span>
                                </>
                              ) : null}
                            </h1>
                            {rest ? (
                              <p className="text-xl md:text-2xl text-primary-foreground/90 font-opensans mb-8 leading-relaxed animate-fade-in whitespace-pre-line">
                                {rest}
                              </p>
                            ) : null}
                          </>
                        );
                      })()}

                      <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
                        <HeroCta href={ctaHref}>
                          <Button
                            size="lg"
                            className="font-opensans font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
                          >
                            Découvrir
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </HeroCta>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/20 backdrop-blur-sm hover:bg-primary/30 text-primary-foreground p-3 rounded-full transition-all duration-200 border border-primary/30"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/20 backdrop-blur-sm hover:bg-primary/30 text-primary-foreground p-3 rounded-full transition-all duration-200 border border-primary/30"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

const Hero = () => {
  const { data } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: () => heroSlidesAPI.getAll(),
    staleTime: 60_000,
  });

  const slides = useMemo(() => {
    if (data && data.length > 0) return data;
    return FALLBACK_SLIDES;
  }, [data]);

  const carouselKey = useMemo(() => slides.map((s) => s.id).join('-'), [slides]);

  return <HeroCarousel key={carouselKey} slides={slides} />;
};

export default Hero;
