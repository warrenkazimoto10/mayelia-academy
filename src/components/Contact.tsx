import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FAQModal from './FAQModal';

const Contact = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [showFAQButton, setShowFAQButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: 'Téléphone',
      details: '07 87 63 88 15',
      subdetails: 'Lun-Ven 8h-18h',
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'Email',
      details: 'infos.academy@mayelia.com',
      subdetails: 'Réponse sous 24h',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'Adresse',
      details: 'Abidjan, Côte d\'Ivoire',
      subdetails: 'Rendez-vous sur place',
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: 'Horaires',
      details: 'Lun-Ven: 8h-18h',
      subdetails: 'Sam: 9h-13h',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowFAQButton(true);
          } else {
            setShowFAQButton(false);
          }
        });
      },
      { threshold: 0.2 } // Déclenche quand 20% de la section est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4 animate-scale-in">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Besoin d'informations ?
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="animate-fade-in hover:shadow-xl transition-all duration-500 border-border hover:-translate-y-1 bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-foreground text-lg mb-1">
                      {info.title}
                    </h3>
                    <p className="font-opensans text-foreground font-medium">{info.details}</p>
                    <p className="font-opensans text-sm text-muted-foreground mt-1">{info.subdetails}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="animate-fade-in border-border shadow-xl bg-card" style={{ animationDelay: '400ms' }}>
            <CardContent className="p-8">
              <h3 className="font-poppins font-bold text-2xl text-foreground mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-primary" />
                Envoyez-nous un message
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block font-opensans font-semibold text-foreground mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block font-opensans font-semibold text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                    placeholder="votre.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-opensans font-semibold text-foreground mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                    placeholder="07 87 63 88 15"
                  />
                </div>

                <div>
                  <label className="block font-opensans font-semibold text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground py-4 rounded-lg font-opensans font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating FAQ Button with Animation */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-700 transform ${showFAQButton ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-45'
          }`}
      >
        <Button
          onClick={() => setIsFAQOpen(true)}
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl flex items-center justify-center animate-bounce-slow"
        >
          <HelpCircle className="w-8 h-8 text-white" />
        </Button>
        {/* Tooltip/Label */}
        <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs font-bold py-1 px-3 rounded-full transition-opacity duration-500 ${showFAQButton ? 'opacity-100' : 'opacity-0'}`}>
          FAQ
        </div>
      </div>

      <FAQModal isOpen={isFAQOpen} onOpenChange={setIsFAQOpen} />
    </section>
  );
};

export default Contact;
