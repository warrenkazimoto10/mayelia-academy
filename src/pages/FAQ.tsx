import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, Info, Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import faqHero from '@/assets/faq-hero.jpg';
import faqContent from '@/assets/faq-content.jpg';
import { faqsAPI, type Faq } from '@/lib/api';

const FAQ = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    faqsAPI.getAll()
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="FAQ - Questions Fréquentes"
        description="Trouvez des réponses aux questions sur nos formations, nos financements et nos certifications. Centre d'aide Mayelia Academy."
        canonical="/faq"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={faqHero}
              alt="Questions fréquentes - Mayelia Academy"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Questions Fréquentes
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Trouvez rapidement les réponses à vos questions sur nos formations et services
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto px-4">
            {/* Image Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={faqContent}
                  alt="Centre d'aide Mayelia Academy"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="text-primary font-opensans text-sm font-medium">Centre d'aide</span>
                </div>
                <p className="text-muted-foreground font-opensans">
                  Trouvez rapidement les réponses à vos questions les plus courantes
                </p>
              </div>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : faqs.length === 0 ? (
                <p className="text-center text-muted-foreground font-opensans py-16">
                  Aucune question disponible pour le moment.
                </p>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="bg-card border border-border rounded-lg px-6 animate-fade-in hover:shadow-lg transition-all"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <AccordionTrigger className="text-left font-poppins font-semibold text-foreground hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-opensans leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-xl text-muted-foreground font-opensans mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Contactez-nous directement
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-opensans font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
