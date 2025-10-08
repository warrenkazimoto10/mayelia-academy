import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, TrendingUp, Award } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
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
      
      {/* Floating icons */}
      <div className="absolute top-32 right-1/4 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 right-1/3 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-1/2 right-20 animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
        <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
          <Award className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground font-opensans text-sm font-medium border border-primary/30">
              🎓 Votre avenir commence ici
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-foreground mb-6 leading-tight animate-slide-in-left">
            Développez vos compétences.
            <br />
            <span className="text-primary">Bâtissez votre avenir.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 font-opensans mb-8 max-w-2xl animate-fade-in">
            Centre de formation d'excellence créé en 2023 par le Groupe Mayelia Participations. Nous accompagnons les particuliers et les entreprises dans le développement des compétences et la reconversion professionnelle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
            <Button 
              size="lg" 
              className="font-opensans font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
            >
              Découvrir nos formations
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="font-opensans font-semibold text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20 hover:border-primary-foreground/50 shadow-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Voir la vidéo
            </Button>
          </div>
        </div>
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
