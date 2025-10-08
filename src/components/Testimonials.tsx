import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Aïssata Diallo',
      role: 'Développeuse Web',
      promotion: 'Promotion 2024',
      content: 'Grâce à Mayelia Academy, j\'ai décroché un emploi en 3 mois. Les formateurs sont exceptionnels et le contenu est vraiment adapté aux besoins du marché.',
      rating: 5,
    },
    {
      name: 'Mamadou Sylla',
      role: 'Technicien Automobile',
      promotion: 'Promotion 2023',
      content: 'La formation en mécanique automobile m\'a permis d\'ouvrir mon propre garage. Un investissement qui a changé ma vie professionnelle.',
      rating: 5,
    },
    {
      name: 'Fatoumata Camara',
      role: 'Responsable Service Client',
      promotion: 'Promotion 2024',
      content: 'Formation complète et professionnelle. J\'ai acquis toutes les compétences nécessaires pour exceller dans la relation client.',
      rating: 5,
    },
  ];

  return (
    <section id="temoignages" className="py-24 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4 animate-scale-in">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Ils ont réussi avec nous
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Découvrez les parcours inspirants de nos anciens étudiants
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in border-border hover:-translate-y-2 bg-card"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <Quote className="w-12 h-12 text-primary/20 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground font-opensans mb-8 italic text-base leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-poppins font-bold text-xl mr-4 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-poppins font-bold text-foreground text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground font-opensans">
                      {testimonial.role} • {testimonial.promotion}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
