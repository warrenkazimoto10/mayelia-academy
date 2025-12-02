import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/about-hero.png';
import drivingSimulator from '@/assets/driving_simulator.png';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
  }, [emblaApi, onSelect]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {/* Slide 1 - Original Hero */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={heroImage}
                  alt="Mayelia Academy - Formation professionnelle"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
              </div>

              {/* Animated decorative elements */}
              <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

              {/* Content */}
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                  <div className="inline-block mb-6 animate-fade-in">
                    <span className="px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground font-opensans text-sm font-medium border border-primary/30">
                      🎓 À Abidjan, votre avenir commence ici
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-foreground mb-6 leading-tight animate-slide-in-left">
                    Développez vos compétences.
                    <br />
                    <span className="text-primary">Bâtissez votre avenir.</span>
                  </h1>

                  <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
                    <a href="#formations" onClick={(e) => scrollToSection(e, '#formations')}>
                      <Button
                        size="lg"
                        className="font-opensans font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
                      >
                        Découvrir nos formations
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>

                    <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="font-opensans font-semibold text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20 hover:border-primary-foreground/50 shadow-lg group"
                      >
                        <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Prendre rendez-vous
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Driving Simulator */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={drivingSimulator}
                  alt="Simulateur de conduite Mayelia Academy"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
              </div>

              {/* Animated decorative elements */}
              <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

              {/* Content */}
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                  <div className="inline-block mb-6 animate-fade-in">
                    <span className="px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground font-opensans text-sm font-medium border border-primary/30">
                      🚗 Formation de pointe
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-foreground mb-6 leading-tight animate-slide-in-left">
                    Maîtrisez la route
                    <br />
                    <span className="text-primary">en toute sécurité.</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-primary-foreground/90 font-opensans mb-8 leading-relaxed animate-fade-in">
                    Formation sur simulateur de conduite de dernière génération pour une expérience d'apprentissage immersive et sécurisée.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
                    <a href="#formations" onClick={(e) => scrollToSection(e, '#formations')}>
                      <Button
                        size="lg"
                        className="font-opensans font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
                      >
                        <Gauge className="mr-2 h-5 w-5" />
                        Découvrir le simulateur
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>

                    <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="font-opensans font-semibold text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20 hover:border-primary-foreground/50 shadow-lg group"
                      >
                        <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Réserver une session
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/20 backdrop-blur-sm hover:bg-primary/30 text-primary-foreground p-3 rounded-full transition-all duration-200 border border-primary/30"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/20 backdrop-blur-sm hover:bg-primary/30 text-primary-foreground p-3 rounded-full transition-all duration-200 border border-primary/30"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index
                ? 'bg-primary w-8'
                : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
              }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
