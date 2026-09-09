import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, ShieldCheck } from 'lucide-react';
import { adminApi, type AdminUser } from '@/lib/api';
import { getAdminToken, getAdminUser } from './adminSession';
import { MODULE_LABELS } from './adminModules';
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

const AdminUsersPage = () => {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getAdminUser();

  const load = () => {
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    setLoading(true);
    adminApi
      .listUsers(token)
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Impossible de charger les utilisateurs'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce compte du backoffice ?')) return;
    try {
      await adminApi.deleteUser(id, token);
      toast.success('Utilisateur supprimé');
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
          <h1 className={adminPageTitle}>Utilisateurs du backoffice</h1>
          <p className={`${adminMuted} mt-1`}>
            {items.length} compte{items.length !== 1 ? 's' : ''} — gérez qui peut administrer quels modules du site.
          </p>
        </div>
        <Button asChild className="font-opensans font-semibold">
          <Link to="/admin/utilisateurs/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel utilisateur
          </Link>
        </Button>
      </div>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Nom</TableHead>
              <TableHead className="text-slate-700 font-semibold">E-mail</TableHead>
              <TableHead className="text-slate-700 font-semibold">Modules autorisés</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((u) => (
              <TableRow key={u.id} className={adminTableRow}>
                <TableCell className={adminTableCell}>
                  {u.name}
                  {currentUser?.id === u.id && (
                    <span className="ml-2 text-xs text-muted-foreground font-opensans">(vous)</span>
                  )}
                </TableCell>
                <TableCell className={adminTableCell}>{u.email}</TableCell>
                <TableCell>
                  {u.is_super_admin ? (
                    <Badge className="bg-primary/10 text-primary font-opensans text-xs border-0 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Super-administrateur
                    </Badge>
                  ) : u.permissions.length === 0 ? (
                    <span className="text-xs text-slate-400 font-opensans">Aucun module</span>
                  ) : (
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {u.permissions.map((p) => (
                        <Badge key={p} className="bg-slate-100 text-slate-700 font-opensans text-xs border-0">
                          {MODULE_LABELS[p]}
                        </Badge>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary">
                    <Link to={`/admin/utilisateurs/${u.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-30"
                    disabled={currentUser?.id === u.id}
                    onClick={() => remove(u.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {items.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">Aucun utilisateur en base.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
