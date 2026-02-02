import { SEO } from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import faqHero from '@/assets/faq-hero.jpg';
import faqContent from '@/assets/faq-content.jpg';

const FAQ = () => {
  const faqs = [
    {
      question: 'Pourquoi choisir Mayelia Academy pour se former ?',
      answer: 'Mayelia Academy offre une formation pratique, professionnalisante axée sur l\'employabilité, dispensée par des experts certifiés.',
    },
    {
      question: 'Quels avantages exclusifs offrent vos formations ?',
      answer: 'Nous offrons une formation orientée terrain, des stages pratiques et un accompagnement à l\'insertion professionnelle.',
    },
    {
      question: 'Peut-on travailler après une formation à Mayelia Academy ?',
      answer: 'Oui, nos programmes sont conçus pour favoriser une insertion rapide grâce à nos liens avec les filiales du groupe Mayelia et nos partenaires.',
    },
    {
      question: 'Vos formations sont-elles ouvertes aux débutants ?',
      answer: 'Oui, certains programmes sont accessibles sans prérequis, avec un apprentissage progressif et encadré.',
    },
    {
      question: 'Les formations sont-elles accessibles financièrement ?',
      answer: 'Oui, nos tarifs sont étudiés pour rester accessibles, avec des facilités de paiement selon les programmes.',
    },
    {
      question: 'Les formations sont-elles certifiées ou reconnues ?',
      answer: 'Oui, nos formations sont organisées selon des standards professionnels validés et certaines bénéficient de reconnaissances institutionnelles et sectorielles.',
    },
    {
      question: 'À qui s\'adressent les formations de Mayelia Academy ?',
      answer: 'Nos formations s\'adressent aux jeunes diplômés, professionnels du secteur automobile, entrepreneurs et à toute personne souhaitant se spécialiser dans nos différents domaines de formations.',
    },
    {
      question: 'À quelle fréquence démarrez-vous les sessions de formation ?',
      answer: 'Plusieurs sessions sont ouvertes chaque année selon les filières.',
    },
    {
      question: 'Comment être informé des nouvelles formations ?',
      answer: 'Via notre site internet, nos réseaux sociaux ou en contactant directement Mayelia Academy.',
    },
    {
      question: 'Mayelia Academy propose-t-elle des formations pour les entreprises ?',
      answer: 'Oui, nous développons des programmes sur mesure pour les entreprises désirant faire former leurs employés.',
    },
    {
      question: 'Organisez-vous des formations en intra-entreprise ?',
      answer: 'Oui, nos équipes peuvent intervenir directement au sein de votre structure.',
    },
    {
      question: 'Proposez-vous des formations en sécurité routière pour les entreprises ?',
      answer: 'Oui, nous accompagnons les entreprises dans la sensibilisation et la prévention des risques routiers.',
    },
    {
      question: 'Comment devenir partenaire de Mayelia Academy ?',
      answer: 'Il suffit de nous contacter via nos canaux officiels pour étudier un partenariat adapté à vos besoins.',
    },
    {
      question: 'Comment obtenir plus d\'informations sur une formation ?',
      answer: 'Vous pouvez nous contacter par téléphone, par e-mail, via nos réseaux sociaux ou en vous rendant directement dans nos locaux.',
    },
  ];

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
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
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
