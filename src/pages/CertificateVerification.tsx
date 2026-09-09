import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { CheckCircle2, XCircle, Loader2, Download, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { certificatesAPI, type Certificate } from '@/lib/api';

const CertificateVerification = () => {
  const { ref } = useParams<{ ref: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!ref) return;
    certificatesAPI
      .verify(ref)
      .then(setCertificate)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [ref]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Vérification de certificat"
        description="Vérifiez l'authenticité d'un certificat délivré par Mayelia Academy."
        canonical={`/verification/${ref}`}
      />
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">Vérification de certificat</h1>
            <p className="text-muted-foreground font-opensans mt-2">Référence : {ref}</p>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {!loading && notFound && (
            <div className="bg-card border border-destructive/30 rounded-2xl p-8 text-center space-y-3">
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <h2 className="text-xl font-poppins font-bold text-foreground">Certificat introuvable</h2>
              <p className="text-muted-foreground font-opensans">
                Aucun certificat ne correspond à cette référence. Vérifiez le lien ou contactez Mayelia Academy.
              </p>
            </div>
          )}

          {!loading && certificate && (
            <div className="bg-card border border-emerald-200 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
                <div>
                  <h2 className="text-xl font-poppins font-bold text-foreground">Certificat authentique</h2>
                  <p className="text-sm text-muted-foreground font-opensans">Délivré par Mayelia Academy</p>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-opensans">
                <div>
                  <dt className="text-muted-foreground">Participant</dt>
                  <dd className="font-semibold text-foreground">
                    {certificate.participant ? `${certificate.participant.civility} ${certificate.participant.full_name}` : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Référence</dt>
                  <dd className="font-semibold text-foreground">{certificate.ref}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Formation</dt>
                  <dd className="font-semibold text-foreground">{certificate.training?.title ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Période</dt>
                  <dd className="font-semibold text-foreground">{certificate.training?.period_text ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Lieu / date de délivrance</dt>
                  <dd className="font-semibold text-foreground">
                    {certificate.training?.issue_place}, le {certificate.training?.issue_date}
                  </dd>
                </div>
              </dl>

              <Button asChild className="w-full font-opensans font-semibold">
                <a href={certificatesAPI.verifyPdfUrl(certificate.ref)} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le certificat (PDF)
                </a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificateVerification;
