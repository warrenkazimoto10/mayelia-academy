import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Users, Building2, User, Mail, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const RendezVous = () => {
  const [clientType, setClientType] = useState<'particulier' | 'entreprise'>('particulier');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    numberOfPeople: '',
    formationType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi - remplacer par votre logique backend
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "Demande envoyée avec succès",
      description: "Vous serez contacté dans les plus brefs délais.",
    });

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        numberOfPeople: '',
        formationType: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Prenez rendez-vous
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Discutons de vos besoins en formation. Notre équipe vous accompagne dans votre projet.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {isSuccess ? (
                <Card className="animate-scale-in border-primary/20 shadow-2xl">
                  <CardContent className="p-12 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                      <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
                      Demande reçue avec succès !
                    </h2>
                    <p className="text-lg text-muted-foreground font-opensans">
                      Vous serez contacté dans les plus brefs délais par notre équipe.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="animate-fade-in shadow-xl border-border">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-3xl font-poppins text-center">
                      Formulaire de demande
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Type de client */}
                      <div className="space-y-4">
                        <Label className="text-lg font-poppins font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Vous êtes
                        </Label>
                        <RadioGroup
                          value={clientType}
                          onValueChange={(value) => setClientType(value as 'particulier' | 'entreprise')}
                          className="grid grid-cols-2 gap-4"
                        >
                          <Label
                            htmlFor="particulier"
                            className={`flex items-center justify-center space-x-3 border-2 rounded-lg p-6 cursor-pointer transition-all ${
                              clientType === 'particulier'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem value="particulier" id="particulier" />
                            <User className="w-5 h-5" />
                            <span className="font-opensans font-medium">Particulier</span>
                          </Label>
                          <Label
                            htmlFor="entreprise"
                            className={`flex items-center justify-center space-x-3 border-2 rounded-lg p-6 cursor-pointer transition-all ${
                              clientType === 'entreprise'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem value="entreprise" id="entreprise" />
                            <Building2 className="w-5 h-5" />
                            <span className="font-opensans font-medium">Entreprise</span>
                          </Label>
                        </RadioGroup>
                      </div>

                      {/* Informations personnelles */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-opensans font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Nom complet *
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Jean Dupont"
                            className="font-opensans"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-opensans font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="jean.dupont@email.com"
                            className="font-opensans"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-opensans font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Téléphone *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+33 6 12 34 56 78"
                            className="font-opensans"
                          />
                        </div>
                        {clientType === 'entreprise' && (
                          <div className="space-y-2">
                            <Label htmlFor="companyName" className="font-opensans font-medium flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-primary" />
                              Nom de l'entreprise *
                            </Label>
                            <Input
                              id="companyName"
                              required={clientType === 'entreprise'}
                              value={formData.companyName}
                              onChange={(e) => handleChange('companyName', e.target.value)}
                              placeholder="Ma Société SARL"
                              className="font-opensans"
                            />
                          </div>
                        )}
                      </div>

                      {/* Détails de la formation */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="numberOfPeople" className="font-opensans font-medium flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            Nombre de personnes *
                          </Label>
                          <Select
                            value={formData.numberOfPeople}
                            onValueChange={(value) => handleChange('numberOfPeople', value)}
                          >
                            <SelectTrigger className="font-opensans">
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 personne</SelectItem>
                              <SelectItem value="2-5">2-5 personnes</SelectItem>
                              <SelectItem value="6-10">6-10 personnes</SelectItem>
                              <SelectItem value="11-20">11-20 personnes</SelectItem>
                              <SelectItem value="20+">Plus de 20 personnes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="formationType" className="font-opensans font-medium flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Type de formation *
                          </Label>
                          <Select
                            value={formData.formationType}
                            onValueChange={(value) => handleChange('formationType', value)}
                          >
                            <SelectTrigger className="font-opensans">
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="automobile">Automobile</SelectItem>
                              <SelectItem value="informatique">Informatique</SelectItem>
                              <SelectItem value="service-client">Service Client</SelectItem>
                              <SelectItem value="sante-securite">Santé & Sécurité au Travail</SelectItem>
                              <SelectItem value="autre">Autre / Formation sur mesure</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-opensans font-medium">
                          Message (optionnel)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Parlez-nous de votre projet, vos besoins spécifiques, vos disponibilités..."
                          rows={5}
                          className="font-opensans resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-primary text-primary-foreground font-opensans font-bold text-lg py-6 hover:shadow-2xl transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5 mr-2" />
                            Envoyer ma demande
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground font-opensans">
                        En envoyant ce formulaire, vous acceptez d'être contacté par notre équipe.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RendezVous;
