import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, Mail, Phone, Loader2, CheckCircle, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const RendezVous = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
  });

  // Générer les créneaux horaires disponibles
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
  ];

  // Générer les dates disponibles (prochaines 30 jours)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Exclure les dimanches
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

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
        date: '',
        timeSlot: '',
      });
      setSelectedDate('');
      setSelectedTimeSlot('');
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
                <Car className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-6">
                Simulateur de conduite
              </h1>
              <p className="text-xl text-white/90 font-opensans leading-relaxed">
                Réservez votre créneau pour une session de simulation de conduite. Choisissez la date et l'heure qui vous conviennent.
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
                    <CardTitle className="text-3xl font-poppins text-center flex items-center justify-center gap-2">
                      <Car className="w-8 h-8 text-primary" />
                      Réservation simulateur de conduite
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
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
                          placeholder="+225 XX XX XX XX"
                              className="font-opensans"
                            />
                      </div>

                      {/* Sélection de la date */}
                        <div className="space-y-2">
                        <Label htmlFor="date" className="font-opensans font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Date souhaitée *
                          </Label>
                          <Select
                          value={selectedDate}
                          onValueChange={(value) => {
                            setSelectedDate(value);
                            handleChange('date', value);
                          }}
                          required
                          >
                            <SelectTrigger className="font-opensans">
                            <SelectValue placeholder="Sélectionnez une date" />
                            </SelectTrigger>
                            <SelectContent>
                            {getAvailableDates().map((date) => (
                              <SelectItem key={date.value} value={date.value}>
                                {date.label}
                              </SelectItem>
                            ))}
                            </SelectContent>
                          </Select>
                      </div>

                      {/* Sélection du créneau horaire */}
                      <div className="space-y-4">
                        <Label className="font-opensans font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Créneau horaire *
                        </Label>
                        {!selectedDate ? (
                          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <p className="text-muted-foreground font-opensans">
                              Veuillez d'abord sélectionner une date
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {timeSlots.map((slot) => {
                              const isSelected = selectedTimeSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTimeSlot(slot);
                                    handleChange('timeSlot', slot);
                                  }}
                                  className={`
                                    relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                                    ${isSelected
                                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                                      : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                                    }
                                  `}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-poppins font-bold text-foreground text-sm mb-1">
                                        {slot.split(' - ')[0]}
                                      </div>
                                      <div className="font-opensans text-xs text-muted-foreground">
                                        {slot.split(' - ')[1]}
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                                      </div>
                                    )}
                                  </div>
                                  {isSelected && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
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
