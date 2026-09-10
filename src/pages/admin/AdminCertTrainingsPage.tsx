import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Users, ListChecks, Upload, PenLine, Search } from 'lucide-react';
import { adminApi, type CertTraining } from '@/lib/api';
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

const AdminCertTrainingsPage = () => {
  const [items, setItems] = useState<CertTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [sigUploading, setSigUploading] = useState(false);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const load = () => {
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    setLoading(true);
    adminApi
      .listCertTrainings(token)
      .then(setItems)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Impossible de charger les formations'))
      .finally(() => setLoading(false));
  };

  const loadSignature = () => {
    const token = getAdminToken();
    if (!token) return;
    adminApi.getSignature(token).then(setSignatureUrl).catch(() => {});
  };

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setSigUploading(true);
    try {
      const url = await adminApi.uploadSignature(file, token);
      setSignatureUrl(url + '?t=' + Date.now());
      toast.success('Signature enregistrée');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur upload signature');
    } finally {
      setSigUploading(false);
      if (sigInputRef.current) sigInputRef.current.value = '';
    }
  };

  useEffect(() => { load(); loadSignature(); }, []);

  const remove = async (id: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Supprimer cette formation ? Ses certificats seront aussi supprimés.')) return;
    try {
      await adminApi.deleteCertTraining(id, token);
      toast.success('Formation supprimée');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? items.filter((t) => `${t.title} ${t.client ?? ''}`.toLowerCase().includes(q))
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Certificats — Formations</h1>
          <p className={`${adminMuted} mt-1`}>{items.length} session{items.length !== 1 ? 's' : ''} de formation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild className="font-opensans font-semibold">
            <Link to="/admin/certificats/participants">
              <Users className="w-4 h-4 mr-2" />
              Participants
            </Link>
          </Button>
          <Button variant="outline" asChild className="font-opensans font-semibold">
            <Link to="/admin/certificats/liste">
              <ListChecks className="w-4 h-4 mr-2" />
              Tous les certificats
            </Link>
          </Button>
          <Button asChild className="font-opensans font-semibold">
            <Link to="/admin/certificats/formations/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle formation
            </Link>
          </Button>
        </div>
      </div>

      {/* Signature officielle */}
      <div className="border border-slate-200 rounded-xl bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <PenLine className="w-4 h-4 text-primary" />
            <span className="font-poppins font-semibold text-slate-800 text-sm">Signature officielle</span>
          </div>
          <p className="text-xs text-slate-500 font-opensans">Signée à la main, scannée et importée en PNG/JPG. Apparaît sur tous les certificats et attestations.</p>
        </div>
        <div className="flex items-center gap-4">
          {signatureUrl && (
            <img
              src={signatureUrl}
              alt="Signature actuelle"
              className="h-14 object-contain border border-slate-200 rounded-lg bg-slate-50 px-2"
            />
          )}
          {!signatureUrl && (
            <span className="text-xs text-slate-400 font-opensans italic">Aucune signature</span>
          )}
          <input ref={sigInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleSignatureUpload} />
          <Button
            variant="outline"
            size="sm"
            className="font-opensans font-semibold"
            disabled={sigUploading}
            onClick={() => sigInputRef.current?.click()}
          >
            <Upload className="w-3 h-3 mr-1" />
            {sigUploading ? 'Envoi…' : signatureUrl ? 'Remplacer' : 'Importer'}
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre ou client..."
          className="pl-9 bg-white border-slate-200"
          aria-label="Rechercher une formation"
        />
      </div>

      <div className={adminTableWrap}>
        <Table>
          <TableHeader>
            <TableRow className={adminTableHead}>
              <TableHead className="text-slate-700 font-semibold">Titre</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden lg:table-cell">Client</TableHead>
              <TableHead className="text-slate-700 font-semibold hidden md:table-cell">Période</TableHead>
              <TableHead className="text-slate-700 font-semibold">Certificats</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((t) => (
              <TableRow key={t.id} className={adminTableRow}>
                <TableCell className={adminTableCell}>
                  <Link to={`/admin/certificats/formations/${t.id}`} className="hover:text-primary">
                    {t.title}
                  </Link>
                </TableCell>
                <TableCell
                  className={`${adminTableCellMuted} hidden lg:table-cell max-w-[180px] truncate`}
                  title={t.client || undefined}
                >
                  {t.client || '—'}
                </TableCell>
                <TableCell className={`${adminTableCellMuted} hidden md:table-cell whitespace-nowrap`}>
                  {t.start_date} → {t.end_date}
                </TableCell>
                <TableCell>
                  <Badge className="bg-primary/10 text-primary font-opensans text-xs border-0">
                    {t.certificates_count ?? 0}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                    <Link to={`/admin/certificats/formations/${t.id}/modifier`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => remove(t.id)}
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
            {items.length === 0 ? 'Aucune formation en base.' : 'Aucun résultat pour cette recherche.'}
          </p>
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        onPageChange={setPage}
        itemLabel="formation"
      />
    </div>
  );
};

export default AdminCertTrainingsPage;
