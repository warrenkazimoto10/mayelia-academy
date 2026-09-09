import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BadgeCheck, X, Search, KeyRound, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CertificateWidget = () => {
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = ref.trim();
    if (!code) return;
    setOpen(false);
    setRef('');
    navigate(`/verification/${encodeURIComponent(code)}`);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-400 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Right-side tab trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Vérifier mon certificat"
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-primary text-white shadow-xl
          flex flex-col items-center gap-2 py-5 px-3 rounded-l-2xl
          hover:bg-primary/90 hover:px-4 active:scale-95
          transition-all duration-300 ease-in-out
          ${open ? 'opacity-0 pointer-events-none translate-x-2' : 'opacity-100 translate-x-0'}`}
      >
        <BadgeCheck className="w-5 h-5 flex-shrink-0" />
        <span
          className="text-[10px] font-bold font-opensans tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Certificat
        </span>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
      </button>

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[100vw] bg-background shadow-2xl z-50
          flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary/15 rounded-full flex items-center justify-center ring-2 ring-primary/20">
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-foreground text-[15px] leading-tight">
                Mon certificat
              </h2>
              <p className="text-[11px] text-muted-foreground font-opensans">Mayelia Academy</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-opensans leading-relaxed max-w-xs mx-auto">
              Saisissez l'identifiant unique reçu par <strong className="text-foreground">SMS</strong> de
              la part de Mayelia Academy pour accéder à votre certificat de formation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground font-opensans flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                Identifiant unique
              </label>
              <Input
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="Ex : MAY-2026-0127"
                className="text-center tracking-widest font-mono text-base h-12 border-2 focus:border-primary"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-opensans font-semibold text-[15px] shadow-md shadow-primary/20"
              disabled={!ref.trim()}
            >
              <Search className="w-4 h-4 mr-2" />
              Accéder à mon certificat
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted/40 rounded-xl border border-border/50">
            <p className="text-xs text-muted-foreground font-opensans leading-relaxed text-center">
              L'identifiant vous a été communiqué par SMS par l'administration après validation de votre formation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/60 bg-muted/20">
          <p className="text-xs text-muted-foreground font-opensans text-center">
            Identifiant non reçu ?{' '}
            <a
              href="/contact"
              className="text-primary font-semibold underline decoration-primary/40 hover:decoration-primary transition-all"
              onClick={handleClose}
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CertificateWidget;
