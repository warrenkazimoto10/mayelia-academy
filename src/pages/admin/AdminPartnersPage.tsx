import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { partnersAPI, adminApi, type Partner } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import { adminMuted, adminPageTitle } from './adminUi';

const AdminPartnersPage = () => {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    partnersAPI
      .getAll()
      .then(setItems)
      .catch(() => toast.error('Impossible de charger les partenaires'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce partenaire ?')) return;
    try {
      await adminApi.deletePartner(id, token);
      toast.success('Supprimé');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Partenaires</h1>
          <p className={`${adminMuted} mt-1`}>Section « Ils nous font confiance » (accueil et à propos)</p>
          <p className="text-slate-500 font-opensans text-xs mt-0.5">{items.length} entrée(s)</p>
        </div>
        <Button asChild className="font-opensans font-semibold">
          <Link to="/admin/partenaires/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau partenaire
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => {
          const logoSrc = resolveMediaUrl(p.logoUrl);
          return (
            <article
              key={p.id}
              className="rounded-xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="flex items-stretch gap-0 border-b border-slate-100 bg-slate-50/90">
                <div className="w-28 shrink-0 flex items-center justify-center p-4 bg-white border-r border-slate-100">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt=""
                      className="max-h-14 w-full object-contain"
                      title={p.name}
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 text-center font-opensans leading-tight px-1">{p.name}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-3 pr-3 pl-3 flex flex-col justify-center">
                  <h2 className="font-semibold text-slate-900 font-opensans truncate" title={p.name}>
                    {p.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Ordre : {p.sortOrder}</p>
                </div>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between gap-2 flex-1">
                <div className="min-w-0 flex-1">
                  {p.websiteUrl ? (
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-opensans truncate max-w-full"
                      title={p.websiteUrl}
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      Site web
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-opensans">Pas de lien site</span>
                  )}
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary hover:bg-primary/10 h-9 w-9">
                    <Link to={`/admin/partenaires/${p.id}`} aria-label={`Modifier ${p.name}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                    onClick={() => remove(p.id)}
                    aria-label={`Supprimer ${p.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {items.length === 0 && (
        <p className="text-center text-slate-500 font-opensans text-sm py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          Aucun partenaire. Créez-en un avec le bouton ci-dessus.
        </p>
      )}
    </div>
  );
};

export default AdminPartnersPage;
