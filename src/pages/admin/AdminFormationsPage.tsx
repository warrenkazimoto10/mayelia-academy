import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, ChevronRight, LayoutGrid, GraduationCap } from 'lucide-react';
import { formationsAPI, type FormationsPayload, type FormationDomainApi } from '@/lib/api';
import { formationDomainHeroImage } from '@/lib/formationDomainHeroImage';
import { domainIconNode } from '@/lib/formationDomainIcons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { adminBackButton, adminMuted, adminPageTitle } from './adminUi';
import { clonePayload } from './adminFormationsShared';

const AdminFormationsPage = () => {
  const [domaines, setDomaines] = useState<FormationDomainApi[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    formationsAPI
      .getAll()
      .then((data: FormationsPayload) => {
        setDomaines(clonePayload(data));
      })
      .catch(() => {
        setDomaines([]);
        toast.message('API indisponible — vérifiez que Laravel tourne, puis actualisez.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totalFormations = domaines.reduce((acc, d) => acc + (d.formations?.length ?? 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tableau de bord
        </Link>
      </Button>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LayoutGrid className="w-6 h-6" />
            </span>
            <h1 className={adminPageTitle}>Formations</h1>
          </div>
          <p className={`${adminMuted} max-w-2xl text-base`}>
            Choisissez un <strong>domaine</strong> pour gérer ses programmes, visuels et contenus. Les modifications sont
            enregistrées domaine par domaine (arborescence complète synchronisée avec l’API).
          </p>
          <p className="text-sm text-slate-600 font-opensans">
            <span className="font-semibold text-slate-800">{domaines.length}</span> domaine
            {domaines.length !== 1 ? 's' : ''} ·{' '}
            <span className="font-semibold text-slate-800">{totalFormations}</span> formation
            {totalFormations !== 1 ? 's' : ''} au total
          </p>
        </div>
        <Button asChild className="font-opensans font-semibold shrink-0 shadow-sm">
          <Link to="/admin/formations/domain/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau domaine
          </Link>
        </Button>
      </div>

      {domaines.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <CardContent className="py-16 text-center space-y-4">
            <p className="text-slate-600 font-opensans max-w-md mx-auto">
              Aucun domaine n’est encore défini. Créez un premier domaine pour structurer vos formations sur le site
              public.
            </p>
            <Button asChild className="font-opensans font-semibold">
              <Link to="/admin/formations/domain/nouveau">
                <Plus className="w-4 h-4 mr-2" />
                Créer un domaine
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {domaines.map((d) => {
            const n = d.formations?.length ?? 0;
            const img = formationDomainHeroImage(d.id, d.image);
            const icon = domainIconNode(d.iconKey, 'w-6 h-6');
            const preview = d.formations?.[0]?.title?.trim();

            return (
              <Link
                key={d.id}
                to={`/admin/formations/domain/${encodeURIComponent(d.id)}`}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
              >
                <Card className="h-full overflow-hidden border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/25 hover:-translate-y-0.5 bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" aria-hidden />
                    )}
                    {/* Pas de classes Tailwind dynamiques (API) : le JIT ne les génère pas → léger voile lisible */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2">
                      <Badge className="bg-white/95 text-slate-800 font-opensans font-semibold border-0 shadow-sm">
                        {n} formation{n !== 1 ? 's' : ''}
                      </Badge>
                      <div className="rounded-lg bg-white/95 p-2 text-primary shadow-sm">{icon}</div>
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-5 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="font-poppins text-lg leading-snug text-slate-900 line-clamp-2 pr-1">
                        {d.title?.trim() || 'Sans titre'}
                      </CardTitle>
                      <ChevronRight className="w-5 h-5 shrink-0 text-slate-300 transition-colors group-hover:text-primary mt-0.5" />
                    </div>
                    <CardDescription className="font-opensans text-xs font-mono text-slate-500 truncate">
                      {d.id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-5 space-y-3">
                    {preview ? (
                      <p className="text-xs text-slate-500 font-opensans line-clamp-2 border-l-2 border-primary/40 pl-2">
                        <GraduationCap className="w-3.5 h-3.5 inline mr-1 text-primary align-text-bottom" />
                        {preview}
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700/90 font-opensans italic">Aucune formation dans ce domaine</p>
                    )}
                    <span className="inline-flex text-sm font-semibold text-primary font-opensans group-hover:underline">
                      Gérer ce domaine
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminFormationsPage;
