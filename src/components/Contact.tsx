import { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, Phone, MapPin, Clock, Send, HelpCircle, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FAQModal from './FAQModal';
import { useSiteSettingsValue } from '@/hooks/useSiteSettings';
import { submitContactMessage } from '@/lib/api';
import { openingHoursPrimaryLine } from '@/lib/contactOpeningHours';
import { toast } from 'sonner';

type InfoRow = {
  icon: React.ReactNode;
  title: string;
  details: string;
  subdetails: string;
  href?: string;
};

const Contact = () => {
  const s = useSiteSettingsValue();
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [showFAQButton, setShowFAQButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const contactInfo = useMemo((): InfoRow[] => {
    const hoursBlock = s.hoursWeekdays?.trim() ?? '';
    const hoursLine1 = openingHoursPrimaryLine(hoursBlock);
    const rows: InfoRow[] = [
      {
        icon: <Phone className="w-6 h-6 text-primary" />,
        title: 'Téléphone',
        details: s.phone,
        subdetails: hoursLine1,
        href: s.phone ? `tel:${s.phone.replace(/\s/g, '')}` : undefined,
      },
      {
        icon: <Mail className="w-6 h-6 text-primary" />,
        title: 'Email',
        details: s.email,
        subdetails: s.emailResponseNote,
        href: s.email ? `mailto:${s.email}` : undefined,
      },
      {
        icon: <MapPin className="w-6 h-6 text-primary" />,
        title: 'Adresse',
        details: [s.addressLine1, s.addressLine2].filter(Boolean).join('\n'),
        subdetails: s.addressVisitNote,
      },
      {
        icon: <Clock className="w-6 h-6 text-primary" />,
        title: 'Horaires',
        details: hoursBlock || hoursLine1,
        subdetails: '',
      },
    ];
    if (s.whatsapp?.trim()) {
      const digits = s.whatsapp.replace(/\D/g, '');
      rows.splice(1, 0, {
        icon: <MessageCircle className="w-6 h-6 text-primary" />,
        title: 'WhatsApp',
        details: s.whatsapp,
        subdetails: 'Écrivez-nous',
        href: digits ? `https://wa.me/${digits}` : undefined,
      });
    }
    return rows;
  }, [s]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowFAQButton(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      toast.success('Message envoyé. Nous vous répondrons dans les meilleurs délais.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Envoi impossible');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-opensans text-sm font-medium mb-4 animate-scale-in">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            {s.contactSectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">{s.contactSectionSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={`${info.title}-${index}`}
                className="animate-fade-in hover:shadow-xl transition-all duration-500 border-border hover:-translate-y-1 bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-poppins font-bold text-foreground text-lg mb-1">{info.title}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-opensans text-foreground font-medium whitespace-pre-line hover:text-primary transition-colors break-words"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="font-opensans text-foreground font-medium whitespace-pre-line break-words">
                        {info.details}
                      </p>
                    )}
                    {info.subdetails ? (
                      <p className="font-opensans text-sm text-muted-foreground mt-1">{info.subdetails}</p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="animate-fade-in border-border shadow-xl bg-card" style={{ animationDelay: '400ms' }}>
            <CardContent className="p-8">
              <h3 className="font-poppins font-bold text-2xl text-foreground mb-2 flex items-center gap-2">
                <Send className="w-6 h-6 text-primary" />
                Envoyez-nous un message
              </h3>
              <p className="text-sm text-muted-foreground font-opensans mb-6">
                Votre message est enregistré et une copie est envoyée à l’adresse indiquée dans les réglages du site.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nom complet *</Label>
                  <Input
                    id="contact-name"
                    required
                    placeholder="Votre nom complet"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={sending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="votre.email@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Téléphone *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder={s.phone}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={sending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="resize-none min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                  />
                </div>
                <Button type="submit" className="w-full font-opensans font-semibold text-base py-6" disabled={sending}>
                  <Send className="w-5 h-5 mr-2" />
                  {sending ? 'Envoi…' : 'Envoyer le message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-700 transform ${
          showFAQButton ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-45'
        }`}
      >
        <Button
          type="button"
          onClick={() => setIsFAQOpen(true)}
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl flex items-center justify-center animate-bounce-slow"
          aria-label="Ouvrir la FAQ"
        >
          <HelpCircle className="w-8 h-8 text-white" />
        </Button>
        <div
          className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs font-bold py-1 px-3 rounded-full transition-opacity duration-500 ${
            showFAQButton ? 'opacity-100' : 'opacity-0'
          }`}
        >
          FAQ
        </div>
      </div>

      <FAQModal isOpen={isFAQOpen} onOpenChange={setIsFAQOpen} />
    </section>
  );
};

export default Contact;
