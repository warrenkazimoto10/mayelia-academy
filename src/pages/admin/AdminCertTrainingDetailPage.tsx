import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Download, FileText, Award, Trash2, UserPlus, Plus, Search } from 'lucide-react';
import { adminApi, type CertTrainingDetail, type CertParticipant } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  adminFormCard,
  adminInput,
  adminMuted,
  adminPageTitle,
  adminTableCell,
  adminTableHead,
  adminTableRow,
  adminTableWrap,
} from './adminUi';
import AdminPagination from './AdminPagination';

type PendingToggle = {
  certId: number;
  participantName: string;
  nextValidated: boolean;
  note: string | null;
};

const PER_PAGE = 10;

const AdminCertTrainingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [training, setTraining] = useState<CertTrainingDetail | null>(null);
  const [allParticipants, setAllParticipants] = useState<CertParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());
  const [zipping, setZipping] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null);
  const [togglingCert, setTogglingCert] = useState(false);
  const [draftNotes, setDraftNotes] = useState<Record<number, string>>({});
  const [savingNoteId, setSavingNoteId] = useState<number | null>(null);
  const [signatureBusyIds, setSignatureBusyIds] = useState<Set<number>>(new Set());
  const [tableSearch, setTableSearch] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(() => {
    const token = getAdminToken();
    if (!token || !id) { toast.error('Session expirée'); setLoading(false); return; }
    setLoading(true);
    Promise.all([adminApi.getCertTraining(id, token), adminApi.listCertParticipants(token)])
      .then(([t, parts]) => {
        setTraining(t);
        setAllParticipants(parts);
      })
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Impossible de charger la formation'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const enrolledIds = new Set((training?.certificates ?? []).map((c) => c.participant.id));
  const unenrolled = allParticipants.filter(
    (p) => !enrolledIds.has(p.id) && (!search.trim() || p.full_name.toLowerCase().includes(search.trim().toLowerCase()))
  );

  const enrollParticipant = async (participantId: number) => {
    const token = getAdminToken();
    if (!token || !training) return;
    setBusyIds((s) => new Set(s).add(participantId));
    try {
      await adminApi.createCertificate(participantId, training.id, token);
      toast.success('Participant inscrit — en attente de validation');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setBusyIds((s) => { const next = new Set(s); next.delete(participantId); return next; });
    }
  };

  const confirmToggle = async () => {
    if (!pendingToggle) return;
    const token = getAdminToken();
    if (!token) return;
    setTogglingCert(true);
    try {
      await adminApi.setCertificateValidated(pendingToggle.certId, { validated: pendingToggle.nextValidated, note: pendingToggle.note }, token);
      toast.success(
        pendingToggle.nextValidated ? 'Participant validé, certificat généré' : 'Validation retirée'
      );
      setPendingToggle(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setTogglingCert(false);
    }
  };

  const toggleSignature = async (certId: number, nextShowSignature: boolean) => {
    const token = getAdminToken();
    if (!token) return;
    setSignatureBusyIds((s) => new Set(s).add(certId));
    try {
      await adminApi.setCertificateShowSignature(certId, nextShowSignature, token);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setSignatureBusyIds((s) => { const next = new Set(s); next.delete(certId); return next; });
    }
  };

  const removeCertificate = async (certId: number) => {
    const token = getAdminToken();
    if (!token || !confirm('Retirer ce participant de la formation ?')) return;
    try {
      await adminApi.deleteCertificate(certId, token);
      toast.success('Participant retiré');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur');
    }
  };

  const downloadPdf = async (certId: number, ref: string) => {
    const token = getAdminToken();
    if (!token) return;
    try {
      await adminApi.downloadCertificatePdf(certId, ref, token);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Téléchargement échoué');
    }
  };

  const downloadZip = async () => {
    const token = getAdminToken();
    if (!token || !training) return;
    setZipping(true);
    try {
      await adminApi.downloadTrainingCertificatesZip(training.id, training.title, token);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Téléchargement échoué');
    } finally {
      setZipping(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!training) return null;

  const validatedCount = training.certificates.filter((c) => c.validated).length;

  const tq = tableSearch.trim().toLowerCase();
  const filteredCertificates = tq
    ? training.certificates.filter((c) =>
        `${c.participant.civility} ${c.participant.full_name} ${c.ref ?? ''}`.toLowerCase().includes(tq)
      )
    : training.certificates;

  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / PER_PAGE));
  // Pas de useEffect ici (après les retours conditionnels) : on borne la page courante
  // directement au lieu de la stocker désynchronisée après un filtrage/suppression.
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paginatedCertificates = filteredCertificates.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="space-y-6 max-w-4xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin/certificats">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux formations
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>{training.title}</h1>
          <p className={adminMuted}>
            {training.client ? `${training.client} — ` : ''}
            {training.start_date} → {training.end_date}
            {training.training_place ? ` à ${training.training_place}` : ''}
            {' '}· Délivré à {training.issue_place} le {training.issue_date}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" asChild className="font-opensans font-semibold">
            <Link to={`/admin/certificats/formations/${training.id}/modifier`}>Modifier</Link>
          </Button>
          <Button
            variant="outline"
            className="font-opensans font-semibold"
            disabled={zipping || training.certificates.length === 0}
            onClick={downloadZip}
          >
            {zipping ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
            Télécharger le ZIP
          </Button>
        </div>
      </div>

      {/* Participants inscrits */}
      <div className="space-y-3">
        <h2 className="font-poppins font-bold text-lg text-slate-900">
          Participants inscrits ({training.certificates.length}) — {validatedCount} validé{validatedCount !== 1 ? 's' : ''}
        </h2>
        <p className="text-sm text-slate-600 font-opensans">
          L'<strong>attestation de fin de formation</strong> est disponible pour tous les participants inscrits.
          Le <strong>certificat</strong> (avec référence officielle) n'est généré qu'après validation.
        </p>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <Input
            type="search"
            value={tableSearch}
            onChange={(e) => { setTableSearch(e.target.value); setPage(1); }}
            placeholder="Rechercher un participant ou une référence..."
            className="pl-9 bg-white border-slate-200"
            aria-label="Rechercher un participant inscrit"
          />
        </div>
        <div className={adminTableWrap}>
          <Table>
            <TableHeader>
              <TableRow className={adminTableHead}>
                <TableHead className="text-slate-700 font-semibold">Participant</TableHead>
                <TableHead className="text-slate-700 font-semibold">Note</TableHead>
                <TableHead className="text-slate-700 font-semibold">Validé</TableHead>
                <TableHead className="text-slate-700 font-semibold">Signature</TableHead>
                <TableHead className="text-slate-700 font-semibold">Référence</TableHead>
                <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCertificates.map((c) => (
                <TableRow key={c.id} className={adminTableRow}>
                  <TableCell className={adminTableCell}>{c.participant.civility} {c.participant.full_name}</TableCell>
                  <TableCell className={adminTableCell}>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number"
                        min="0"
                        max="20"
                        step="0.01"
                        value={draftNotes[c.id] !== undefined ? draftNotes[c.id] : (c.note || '')} 
                        onChange={(e) => setDraftNotes({ ...draftNotes, [c.id]: e.target.value })}
                        className="w-20 text-sm h-8"
                      />
                      {(draftNotes[c.id] !== undefined && draftNotes[c.id] !== (c.note || '')) && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 px-2 bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                          disabled={savingNoteId === c.id}
                          onClick={() => {
                            const val = draftNotes[c.id];
                            if (val !== '' && (isNaN(parseFloat(val)) || parseFloat(val) < 0 || parseFloat(val) > 20)) {
                              toast.error("La note doit être comprise entre 0 et 20");
                              return;
                            }
                            const token = getAdminToken();
                            if (token) {
                              setSavingNoteId(c.id);
                              adminApi.setCertificateValidated(c.id, { validated: c.validated, note: val }, token)
                                .then(() => {
                                  toast.success('Note enregistrée');
                                  setDraftNotes(prev => { const n = {...prev}; delete n[c.id]; return n; });
                                  load();
                                })
                                .catch(err => toast.error(err.message))
                                .finally(() => setSavingNoteId(null));
                            }
                          }}
                        >
                          {savingNoteId === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Enregistrer'}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={c.validated}
                      onCheckedChange={(checked) =>
                        setPendingToggle({
                          certId: c.id,
                          participantName: `${c.participant.civility} ${c.participant.full_name}`,
                          nextValidated: checked,
                          note: c.note
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={c.show_signature}
                      disabled={signatureBusyIds.has(c.id)}
                      onCheckedChange={(checked) => toggleSignature(c.id, checked)}
                    />
                  </TableCell>
                  <TableCell className={adminTableCell}>
                    {c.ref ?? (
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
                      onClick={() => {
                        const token = getAdminToken();
                        if (token) adminApi.downloadAttestationPdf(c.id, c.participant.full_name, token);
                      }}
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
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                      title="Retirer ce participant"
                      aria-label="Retirer ce participant"
                      onClick={() => removeCertificate(c.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCertificates.length === 0 && (
            <p className="p-8 text-center text-slate-600 font-opensans">
              {training.certificates.length === 0
                ? 'Aucun participant inscrit pour cette formation.'
                : 'Aucun résultat pour cette recherche.'}
            </p>
          )}
        </div>
      </div>

      <AdminPagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={filteredCertificates.length}
        onPageChange={setPage}
        itemLabel="participant"
      />

      {/* Inscription de nouveaux participants */}
      <div className={`space-y-4 ${adminFormCard}`}>
        <h2 className="font-poppins font-bold text-lg text-slate-900">Inscrire un participant</h2>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un participant existant..."
            className={adminInput}
          />
          <Button variant="outline" asChild className="font-opensans font-semibold shrink-0">
            <Link to="/admin/certificats/participants/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau
            </Link>
          </Button>
        </div>

        <div className="max-h-72 overflow-auto rounded-lg border border-slate-200 divide-y divide-slate-100">
          {unenrolled.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2.5">
              <span className="font-opensans text-sm text-slate-900">{p.civility} {p.full_name}</span>
              <Button
                size="sm"
                variant="outline"
                disabled={busyIds.has(p.id)}
                onClick={() => enrollParticipant(p.id)}
                className="font-opensans font-semibold"
              >
                {busyIds.has(p.id) ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <UserPlus className="w-3.5 h-3.5 mr-1.5" />}
                Inscrire
              </Button>
            </div>
          ))}
          {unenrolled.length === 0 && (
            <p className="p-6 text-center text-slate-500 font-opensans text-sm">Aucun participant disponible.</p>
          )}
        </div>
      </div>

      <AlertDialog open={pendingToggle !== null} onOpenChange={(open) => !open && setPendingToggle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingToggle?.nextValidated ? 'Valider ce participant ?' : 'Retirer la validation ?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingToggle?.nextValidated ? (
                <>
                  Confirmez-vous que <strong>{pendingToggle?.participantName}</strong> a réussi la formation ?{' '}
                  Une référence officielle sera générée et son <strong>certificat PDF</strong> deviendra téléchargeable.
                  L'attestation de fin de formation reste toujours disponible.
                </>
              ) : (
                <>
                  Le <strong>certificat</strong> de <strong>{pendingToggle?.participantName}</strong> ne sera plus
                  téléchargeable et sa référence sera révoquée. L'attestation de fin de formation restera disponible.
                  Vous pourrez le valider à nouveau plus tard si besoin.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={togglingCert}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle} disabled={togglingCert}>
              {togglingCert ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCertTrainingDetailPage;
