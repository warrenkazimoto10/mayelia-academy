import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import { adminApi, type Actualite } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import { adminMuted, adminPageTitle } from './adminUi';
import { cn } from '@/lib/utils';

const PER_PAGE = 9;

type StatusFilter = 'all' | 'draft' | 'published';

function normalizeSearch(s: string): string {
  return s.trim().toLowerCase();
}

const AdminActualitesPage = () => {
  const [items, setItems] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const load = () => {
    const token = getAdminToken();
    if (!token) {
      toast.error('Session expirée');
      setLoading(false);
      return;
    }
    setLoading(true);
    adminApi
      .listActualitesAdmin(token)
      .then(setItems)
      .catch(() => toast.error('Impossible de charger les actualités (API / base de données)'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const byStatus = useMemo(() => {
    if (statusFilter === 'all') return items;
    const wantPublished = statusFilter === 'published';
    return items.filter((a) => (a.published !== false) === wantPublished);
  }, [items, statusFilter]);

  const filtered = useMemo(() => {
    const q = normalizeSearch(searchQuery);
    if (!q) return byStatus;
    return byStatus.filter((a) => {
      const hay = `${a.title} ${a.excerpt} ${a.category} ${a.date}`.toLowerCase();
      return hay.includes(q);
    });
  }, [byStatus, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const draftCount = items.filter((a) => a.published === false).length;
  const publishedCount = items.filter((a) => a.published !== false).length;

  const remove = async (id: string | number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer cette actualité ?')) return;
    try {
      await adminApi.deleteActualite(id, token);
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
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Actualités</h1>
          <p className={`${adminMuted} mt-1`}>
            {items.length} actualité{items.length !== 1 ? 's' : ''} — {publishedCount} publiée
            {publishedCount !== 1 ? 's' : ''}, {draftCount} brouillon{draftCount !== 1 ? 's' : ''}
            {searchQuery.trim() ? (
              <>
                {' '}
                — <span className="text-slate-800 font-medium">{filtered.length}</span> résultat
                {filtered.length !== 1 ? 's' : ''} pour « {searchQuery.trim()} »
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Rechercher (titre, extrait, catégorie, date)…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-slate-200"
              aria-label="Rechercher dans les actualités"
            />
          </div>
          <Button asChild className="font-opensans font-semibold shrink-0">
            <Link to="/admin/actualites/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle actualité
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'all' as const, label: 'Toutes' },
            { id: 'published' as const, label: 'Publiées' },
            { id: 'draft' as const, label: 'Brouillons' },
          ] as const
        ).map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={statusFilter === tab.id ? 'default' : 'outline'}
            size="sm"
            className={cn('font-opensans', statusFilter !== tab.id && 'border-slate-200 bg-white')}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-600 font-opensans py-16 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          {items.length === 0
            ? 'Aucune actualité en base.'
            : 'Aucun résultat — modifiez la recherche ou le filtre de statut.'}
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginated.map((a) => {
              const imgUrl = resolveMediaUrl(a.heroImage);
              const isDraft = a.published === false;
              return (
                <Card
                  key={a.id}
                  className="border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={a.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-opensans px-4 text-center">
                        Pas d’image hero {isDraft ? '(brouillon)' : ''}
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <Badge className={`${a.categoryColor} font-opensans text-xs`}>{a.category}</Badge>
                      {isDraft ? (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-900 font-opensans text-xs border-0">
                          Brouillon
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 font-opensans text-xs border-0">
                          Publié
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="pb-2 space-y-1">
                    <h2 className="font-poppins font-bold text-slate-900 line-clamp-2 text-lg leading-snug min-h-[3.5rem]">
                      {a.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-opensans">{a.date}</p>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <p className="text-sm text-slate-600 font-opensans line-clamp-3">{a.excerpt}</p>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 bg-slate-50/80 flex justify-end gap-2 py-3">
                    <Button variant="outline" size="sm" asChild className="font-opensans">
                      <Link to={`/admin/actualites/${a.id}`}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Modifier
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 font-opensans"
                      onClick={() => remove(a.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 font-opensans">
                Page {page} sur {totalPages} ({filtered.length} entrée{filtered.length !== 1 ? 's' : ''})
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="font-opensans"
                >
                  Précédent
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="font-opensans"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminActualitesPage;
