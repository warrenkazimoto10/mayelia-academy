import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/Contact';
import { MapPin, Mail, Phone } from 'lucide-react';
import contactHero from '@/assets/contact-hero.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={contactHero}
              alt="Contactez Mayelia Academy"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Contactez-nous
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
