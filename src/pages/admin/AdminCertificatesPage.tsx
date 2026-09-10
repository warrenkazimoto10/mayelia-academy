import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, FileText, Award, ExternalLink, Trash2, Search } from 'lucide-react';
import { adminApi, type Certificate } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AdminPagination from './AdminPagination';
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

const PER_PAGE = 10;

const AdminCertificatesPage = () => {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par référence, nom ou formation..."
          className={`${adminInput} pl-9`}
        />
      </div>

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
            {paginated.map((c) => (
              <TableRow key={c.id} className={adminTableRow}>
                <TableCell className={adminTableCell}>{c.ref ?? '—'}</TableCell>
                <TableCell className={adminTableCell}>
                  {c.participant ? `${c.participant.civility} ${c.participant.full_name}` : '—'}
                </TableCell>
                <TableCell
                  className={`${adminTableCellMuted} hidden lg:table-cell max-w-[220px] truncate`}
                  title={c.training?.title ?? undefined}
                >
                  {c.training?.title ?? '—'}
                </TableCell>
                <TableCell>
                  {c.validated ? (
                    <Badge className="bg-emerald-100 text-emerald-800 font-opensans text-xs border-0">Validé</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-900 font-opensans text-xs border-0">En attente</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-slate-700 hover:bg-slate-100 h-9 w-9"
                    title="Télécharger l'attestation"
                    aria-label="Télécharger l'attestation"
                    onClick={() => downloadAttestation(c.id, c.participant?.full_name ?? String(c.id))}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-30 h-9 w-9"
                    disabled={!c.validated || !c.ref}
                    title="Télécharger le certificat"
                    aria-label="Télécharger le certificat"
                    onClick={() => c.ref && downloadPdf(c.id, c.ref)}
                  >
                    <Award className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild={c.validated && !!c.ref}
                    disabled={!c.validated || !c.ref}
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 h-9 w-9"
                    title="Voir la page de vérification"
                    aria-label="Voir la page de vérification"
                  >
                    {c.validated && c.ref ? (
                      <a href={`/verification/${c.ref}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                    title="Supprimer le certificat"
                    aria-label="Supprimer le certificat"
                    onClick={() => remove(c.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-slate-600 font-opensans">
            {items.length === 0 ? 'Aucun certificat trouvé.' : 'Aucun résultat pour cette recherche.'}
          </p>
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        onPageChange={setPage}
        itemLabel="certificat"
      />
    </div>
  );
};

export default AdminCertificatesPage;
