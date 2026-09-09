import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, FileText, ExternalLink, Trash2 } from 'lucide-react';
import { adminApi, type Certificate } from '@/lib/api';
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
  adminBackButton,
  adminInput,
  adminMuted,
  adminPageTitle,
  adminTableCell,
  adminTableCellMuted,
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';

const AdminCertificatesPage = () => {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    adminApi
      .listCertificates(token)
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Impossible de charger les certificats'))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer ce certificat ?')) return;
    try {
      await adminApi.deleteCertificate(id, token);
      setItems((list) => list.filter((c) => c.id !== id));
      toast.success('Certificat supprimé');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  const downloadPdf = async (id: number, ref: string) => {
    const token = getAdminToken();
    if (!token) return;
    try {
      await adminApi.downloadCertificatePdf(id, ref, token);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Téléchargement échoué');
    }
  };

  const downloadAttestation = async (id: number, name: string) => {
    const token = getAdminToken();
    if (!token) return;
    try {
      await adminApi.downloadAttestationPdf(id, name, token);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Téléchargement échoué');
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (c) =>
          (c.ref ?? '').toLowerCase().includes(q) ||
          (c.participant?.full_name ?? '').toLowerCase().includes(q) ||
          (c.training?.title ?? '').toLowerCase().includes(q)
      )
    : items;

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin/certificats">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux formations
        </Link>
      </Button>

      <div>
        <h1 className={adminPageTitle}>Tous les certificats</h1>
        <p className={`${adminMuted} mt-1`}>{items.length} certificat{items.length !== 1 ? 's' : ''} généré{items.length !== 1 ? 's' : ''}</p>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par référence, nom ou formation..."
        className={`${adminInput} max-w-sm`}
      />

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Référence</TableHead>
              <TableHead className="text-slate-700 font-semibold">Participant</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden lg:table-cell">Formation</TableHead>
              <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className={adminTableRow}>
                <TableCell className={adminTableCell}>{c.ref ?? '—'}</TableCell>
                <TableCell className={adminTableCell}>
                  {c.participant ? `${c.participant.civility} ${c.participant.full_name}` : '—'}
                </TableCell>
                <TableCell className={`${adminTableCellMuted} hidden lg:table-cell`}>{c.training?.title ?? '—'}</TableCell>
                <TableCell>
                  {c.validated ? (
                    <Badge className="bg-emerald-100 text-emerald-800 font-opensans text-xs border-0">Validé</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-900 font-opensans text-xs border-0">En attente</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-slate-700 font-opensans"
                    onClick={() => downloadAttestation(c.id, c.participant?.full_name ?? String(c.id))}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Attest.
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary disabled:opacity-30 font-opensans"
                    disabled={!c.validated || !c.ref}
                    onClick={() => c.ref && downloadPdf(c.id, c.ref)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Certif.
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild={c.validated && !!c.ref}
                    disabled={!c.validated || !c.ref}
                    className="text-slate-600 hover:text-slate-900 disabled:opacity-30"
                  >
                    {c.validated && c.ref ? (
                      <a href={`/verification/${c.ref}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => remove(c.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">Aucun certificat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCertificatesPage;
