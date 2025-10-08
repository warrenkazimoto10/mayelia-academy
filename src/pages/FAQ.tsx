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
      question: 'Quels sont les prérequis pour s\'inscrire ?',
      answer: 'Les prérequis varient selon la formation choisie. Pour les formations en automobile et service client, aucun prérequis particulier n\'est nécessaire. Pour l\'informatique, des bases en navigation web sont recommandées. Contactez-nous pour plus de détails sur votre formation souhaitée.',
    },
    {
      question: 'Quelle est la durée des formations ?',
      answer: 'La durée varie selon le programme : Formation SST (2-4 mois), Service Client (3-6 mois), Automobile (6-12 mois), et Informatique (6-18 mois). Nous proposons également des horaires flexibles adaptés aux professionnels en activité.',
    },
    {
      question: 'Les formations sont-elles certifiantes ?',
      answer: 'Oui, toutes nos formations délivrent une certification reconnue. Les diplômes sont validés par nos partenaires professionnels et augmentent significativement votre employabilité sur le marché du travail.',
    },
    {
      question: 'Proposez-vous des aides au financement ?',
      answer: 'Nous proposons plusieurs options de financement : paiement échelonné, bourses sur critères sociaux, et partenariats avec des entreprises pour des formations financées. Contactez notre service administratif pour étudier votre dossier.',
    },
    {
      question: 'Est-ce que vous aidez à trouver un emploi après la formation ?',
      answer: 'Absolument ! Nous avons un taux d\'insertion de 95%. Notre service placement travaille avec plus de 50 entreprises partenaires. Nous organisons également des sessions de préparation aux entretiens et d\'aide à la rédaction de CV.',
    },
    {
      question: 'Les cours sont-ils en présentiel ou en ligne ?',
      answer: 'Nous proposons les deux formats. La majorité de nos formations combine théorie en ligne via notre plateforme e-learning et pratique en présentiel dans nos ateliers équipés. Certains modules sont disponibles 100% en ligne.',
    },
    {
      question: 'Qui sont les formateurs ?',
      answer: 'Nos formateurs sont des experts certifiés avec une expérience professionnelle significative dans leur domaine. Ils sont sélectionnés pour leur expertise technique et leurs qualités pédagogiques.',
    },
    {
      question: 'Peut-on visiter vos locaux avant de s\'inscrire ?',
      answer: 'Bien sûr ! Nous organisons des journées portes ouvertes chaque mois. Vous pouvez également prendre rendez-vous pour une visite personnalisée et rencontrer nos équipes. Contactez-nous pour fixer une date.',
    },
    {
      question: 'Quelle est votre politique d\'annulation ?',
      answer: 'Vous pouvez annuler votre inscription jusqu\'à 7 jours avant le début de la formation pour un remboursement complet. Consultez nos conditions générales pour plus de détails.',
    },
    {
      question: 'Proposez-vous des formations sur mesure pour les entreprises ?',
      answer: 'Oui, nous concevons des programmes de formation personnalisés pour les entreprises souhaitant former leurs employés. Contactez notre service B2B pour discuter de vos besoins spécifiques.',
    },
  ];

  return (
    <div className="min-h-screen">
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
