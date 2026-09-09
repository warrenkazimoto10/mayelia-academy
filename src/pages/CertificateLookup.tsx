import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Search, BadgeCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CertificateLookup = () => {
  const [ref, setRef] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = ref.trim();
    if (!code) return;
    navigate(`/verification/${encodeURIComponent(code)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Vérifier mon certificat"
        description="Entrez votre identifiant unique reçu par SMS pour télécharger votre certificat Mayelia Academy."
        canonical="/verification"
      />
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">Télécharger mon certificat</h1>
            <p className="text-muted-foreground font-opensans mt-3 text-sm leading-relaxed">
              Saisissez l'identifiant unique que vous avez reçu par SMS de la part de Mayelia Academy
              pour accéder à votre certificat de formation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            <div className="space-y-2">
              <label htmlFor="cert-ref" className="text-sm font-semibold text-foreground font-opensans flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                Identifiant unique
              </label>
              <Input
                id="cert-ref"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="Ex : MAY-2026-0127"
                className="text-center tracking-widest font-mono text-base"
                autoComplete="off"
                required
              />
              <p className="text-xs text-muted-foreground font-opensans">
                Cet identifiant vous a été communiqué par SMS par l'administration de Mayelia Academy.
              </p>
            </div>

            <Button type="submit" className="w-full font-opensans font-semibold" disabled={!ref.trim()}>
              <Search className="w-4 h-4 mr-2" />
              Accéder à mon certificat
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground font-opensans mt-6">
            Vous n'avez pas reçu d'identifiant ?{' '}
            <a href="/contact" className="text-primary underline hover:no-underline">Contactez-nous</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificateLookup;
