import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import { adminApi, type CertParticipant } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  adminInput,
  adminMuted,
  adminPageTitle,
  adminTableCell,
  adminTableCellMuted,
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';

const AdminCertParticipantsPage = () => {
  const [items, setItems] = useState<CertParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = (q?: string) => {
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    setLoading(true);
    adminApi
      .listCertParticipants(token, q)
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Impossible de charger les participants'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(search.trim() || undefined);
  };

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce participant ? Ses certificats seront aussi supprimés.')) return;
    try {
      await adminApi.deleteCertParticipant(id, token);
      toast.success('Participant supprimé');
      load(search.trim() || undefined);
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
    <div className="space-y-6 max-w-4xl">
      <Button variant="ghost" asChild className="-ml-2 text-muted-foreground hover:text-primary">
        <Link to="/admin/certificats">← Retour aux formations</Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Participants</h1>
          <p className={`${adminMuted} mt-1`}>{items.length} participant{items.length !== 1 ? 's' : ''} enregistré{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Button asChild className="font-opensans font-semibold">
          <Link to="/admin/certificats/participants/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau participant
          </Link>
        </Button>
      </div>

      <form onSubmit={onSearch} className="flex gap-2 max-w-sm">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un nom..."
          className={adminInput}
        />
        <Button type="submit" variant="outline" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Civilité</TableHead>
              <TableHead className="text-slate-700 font-semibold">Nom complet</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden md:table-cell">Certificats</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id} className={adminTableRow}>
                <TableCell className={adminTableCell}>{p.civility}</TableCell>
                <TableCell className={adminTableCell}>{p.full_name}</TableCell>
                <TableCell className={`${adminTableCellMuted} hidden md:table-cell`}>{p.certificates_count ?? 0}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary">
                    <Link to={`/admin/certificats/participants/${p.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => remove(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {items.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">Aucun participant en base.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCertParticipantsPage;
