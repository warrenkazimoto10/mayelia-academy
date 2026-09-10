import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import { adminApi, type Conseil } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  adminMuted,
  adminPageTitle,
  adminTableCell,
  adminTableCellMuted,
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';
import AdminPagination from './AdminPagination';

const PER_PAGE = 10;

const AdminConseilsPage = () => {
  const [items, setItems] = useState<Conseil[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const load = () => {
    const token = getAdminToken();
    if (!token) {
      toast.error('Session expirée');
      setLoading(false);
      return;
    }
    setLoading(true);
    adminApi
      .listConseilsAdmin(token)
      .then(setItems)
      .catch(() => toast.error('Impossible de charger les conseils'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const draftCount = items.filter((a) => a.published === false).length;
  const publishedCount = items.filter((a) => a.published !== false).length;

  const q = search.trim().toLowerCase();
  const filtered = q ? items.filter((a) => `${a.title} ${a.date}`.toLowerCase().includes(q)) : items;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const remove = async (id: string | number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce conseil ?')) return;
    try {
      await adminApi.deleteConseil(id, token);
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
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Conseils</h1>
          <p className={`${adminMuted} mt-1`}>
            {items.length} entrée{items.length !== 1 ? 's' : ''} — {publishedCount} publiée
            {publishedCount !== 1 ? 's' : ''}, {draftCount} brouillon{draftCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild className="font-opensans font-semibold">
          <Link to="/admin/conseils/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau conseil
          </Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre ou date..."
          className="pl-9 bg-white border-slate-200"
          aria-label="Rechercher un conseil"
        />
      </div>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Titre</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((a) => {
              const isDraft = a.published === false;
              return (
                <TableRow key={a.id} className={adminTableRow}>
                  <TableCell className={adminTableCell}>{a.title}</TableCell>
                  <TableCell className={`${adminTableCellMuted} hidden lg:table-cell whitespace-nowrap`}>{a.date}</TableCell>
                  <TableCell>
                    {isDraft ? (
                      <Badge className="bg-amber-100 text-amber-900 font-opensans text-xs border-0">Brouillon</Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-800 font-opensans text-xs border-0">Publié</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                      <Link to={`/admin/conseils/${a.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => remove(a.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">
            {items.length === 0 ? 'Aucun conseil en base.' : 'Aucun résultat pour cette recherche.'}
          </p>
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        onPageChange={setPage}
        itemLabel="conseil"
      />
    </div>
  );
};

export default AdminConseilsPage;
