import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Mail,
  Eye,
  EyeOff,
  Trash2,
  MessageSquareText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { adminApi, type ContactMessageRow } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminMuted,
  adminPageTitle,
  adminTableCell,
  adminTableCellMuted,
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

const AdminContactMessagesPage = () => {
  const [items, setItems] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<ContactMessageRow | null>(null);

  const load = () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    adminApi
      .listContactMessages(token)
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Chargement impossible'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setRead = async (row: ContactMessageRow, read: boolean) => {
    const token = getAdminToken();
    if (!token) return;
    try {
      const updated = await adminApi.setContactMessageRead(row.id, read, token);
      toast.success(read ? 'Marqué comme lu' : 'Marqué comme non lu');
      setDetail((d) => (d?.id === updated.id ? updated : d));
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  const remove = async (row: ContactMessageRow) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce message ?')) return;
    try {
      await adminApi.deleteContactMessage(row.id, token);
      toast.success('Message supprimé');
      setDetail(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tableau de bord
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className={`flex items-center gap-2 ${adminPageTitle}`}>
            <MessageSquareText className="w-8 h-8 text-primary" />
            Messages contact
          </h1>
          <p className={adminMuted}>
            Messages envoyés depuis le formulaire du site. L’e-mail de réception est défini dans Réglages site → Email.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={load} className="shrink-0">
          Actualiser
        </Button>
      </div>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Date</TableHead>
              <TableHead className="text-slate-700 font-semibold">Nom</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden md:table-cell">Email</TableHead>
              <TableHead className="text-slate-700 font-semibold">État</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id} className={adminTableRow}>
                <TableCell className={adminTableCellMuted}>{formatDate(row.createdAt)}</TableCell>
                <TableCell className={adminTableCell}>
                  <button
                    type="button"
                    className="text-left hover:text-primary underline-offset-2 hover:underline font-medium"
                    onClick={() => setDetail(row)}
                  >
                    {row.name}
                  </button>
                </TableCell>
                <TableCell className="hidden md:table-cell text-slate-600 max-w-[200px] truncate">
                  {row.email}
                </TableCell>
                <TableCell>
                  {row.readAt ? (
                    <Badge variant="secondary" className="font-opensans">
                      Lu
                    </Badge>
                  ) : (
                    <Badge className="font-opensans bg-amber-500 hover:bg-amber-500">Nouveau</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" type="button" onClick={() => setDetail(row)} title="Lire">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setRead(row, !row.readAt)}
                    title={row.readAt ? 'Marquer non lu' : 'Marquer lu'}
                  >
                    {row.readAt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => remove(row)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {items.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">Aucun message pour le moment.</p>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins pr-8">Message de {detail?.name}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-4 text-sm font-opensans">
              <div className="grid gap-1">
                <span className="text-muted-foreground">Email</span>
                <a href={`mailto:${detail.email}`} className="text-primary font-medium break-all">
                  {detail.email}
                </a>
              </div>
              {detail.phone ? (
                <div className="grid gap-1">
                  <span className="text-muted-foreground">Téléphone</span>
                  <a href={`tel:${detail.phone.replace(/\s/g, '')}`} className="text-foreground">
                    {detail.phone}
                  </a>
                </div>
              ) : null}
              <div className="grid gap-1">
                <span className="text-muted-foreground">Reçu le</span>
                <span>{formatDate(detail.createdAt)}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-muted-foreground">Message</span>
                <p className="whitespace-pre-wrap text-foreground leading-relaxed border rounded-lg p-4 bg-slate-50">
                  {detail.message}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
            <Button type="button" variant="outline" onClick={() => detail && setRead(detail, !detail.readAt)}>
              {detail?.readAt ? 'Marquer non lu' : 'Marquer lu'}
            </Button>
            <Button type="button" variant="destructive" onClick={() => detail && remove(detail)}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactMessagesPage;
