import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { adminApi, type Faq } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
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
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';

const AdminFAQsPage = () => {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  const load = () => {
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    setLoading(true);
    adminApi
      .listFaqsAdmin(token)
      .then(setItems)
      .catch(() => toast.error('Impossible de charger les FAQ'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer cette FAQ ?')) return;
    try {
      await adminApi.deleteFaq(id, token);
      toast.success('FAQ supprimée');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const other = index + direction;
    if (other < 0 || other >= items.length) return;
    const next = [...items];
    [next[index], next[other]] = [next[other], next[index]];
    const reindexed = next.map((f, i) => ({ ...f, sort_order: i }));
    setItems(reindexed);

    const token = getAdminToken();
    if (!token) return;
    setReordering(true);
    try {
      await adminApi.reorderFaqs(
        reindexed.map((f) => ({ id: f.id, sort_order: f.sort_order })),
        token
      );
    } catch {
      toast.error('Erreur lors du réordonnancement');
      load();
    } finally {
      setReordering(false);
    }
  };

  const publishedCount = items.filter((f) => f.published).length;
  const draftCount = items.length - publishedCount;

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
          <h1 className={adminPageTitle}>FAQ</h1>
          <p className={`${adminMuted} mt-1`}>
            {items.length} question{items.length !== 1 ? 's' : ''} — {publishedCount} publiée
            {publishedCount !== 1 ? 's' : ''}, {draftCount} masquée{draftCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild className="font-opensans font-semibold">
          <Link to="/admin/faq/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle question
          </Link>
        </Button>
      </div>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold w-12">Ordre</TableHead>
              <TableHead className="text-slate-700 font-semibold">Question</TableHead>
              <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((faq, index) => (
              <TableRow key={faq.id} className={adminTableRow}>
                <TableCell className="w-12">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      disabled={index === 0 || reordering}
                      onClick={() => move(index, -1)}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      disabled={index === items.length - 1 || reordering}
                      onClick={() => move(index, 1)}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className={`${adminTableCell} max-w-sm`}>{faq.question}</TableCell>
                <TableCell>
                  {faq.published ? (
                    <Badge className="bg-emerald-100 text-emerald-800 font-opensans text-xs border-0">Publiée</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-900 font-opensans text-xs border-0">Masquée</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary">
                    <Link to={`/admin/faq/${faq.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => remove(faq.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {items.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">Aucune question en base.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFAQsPage;
