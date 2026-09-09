import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { defaultIsoToday } from '@/lib/adminArticleDate';
import { AdminDatePickerField } from '@/components/admin/AdminDatePickerField';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';

const AdminCertTrainingEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // La route de création ("certificats/formations/nouveau") n'a pas de segment :id,
  // donc id est undefined dans ce cas — seule la route /modifier fournit un id réel.
  const isNew = !id || id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [startDate, setStartDate] = useState(defaultIsoToday);
  const [endDate, setEndDate] = useState(defaultIsoToday);
  const [issuePlace, setIssuePlace] = useState('Abidjan');
  const [issueDate, setIssueDate] = useState(defaultIsoToday);

  useEffect(() => {
    if (isNew || !id) return;
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    adminApi
      .getCertTraining(id, token)
      .then((t) => {
        setTitle(t.title);
        setClient(t.client || '');
        setStartDate(t.start_date);
        setEndDate(t.end_date);
        setIssuePlace(t.issue_place);
        setIssueDate(t.issue_date);
      })
      .catch(() => toast.error('Formation introuvable'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    if (!title.trim()) { toast.error('Le titre est obligatoire.'); return; }
    const token = getAdminToken();
    if (!token) return;

    const payload = {
      title: title.trim(),
      client: client.trim() || null,
      start_date: startDate,
      end_date: endDate,
      issue_place: issuePlace.trim() || 'Abidjan',
      issue_date: issueDate,
    };

    setSaving(true);
    try {
      if (isNew) {
        const created = await adminApi.saveCertTraining(payload, token);
        toast.success('Formation créée');
        navigate(`/admin/certificats/formations/${created.id}`);
      } else {
        await adminApi.saveCertTraining(payload, token, id);
        toast.success('Formation mise à jour');
        navigate(`/admin/certificats/formations/${id}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(false);
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
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin/certificats">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux formations
        </Link>
      </Button>

      <h1 className={adminPageTitle}>{isNew ? 'Nouvelle formation' : 'Modifier la formation'}</h1>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label htmlFor="tr-title" className={adminLabel}>
            Titre de la formation
          </Label>
          <Input id="tr-title" value={title} onChange={(e) => setTitle(e.target.value)} className={adminInput} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tr-client" className={adminLabel}>
            Client (optionnel)
          </Label>
          <Input id="tr-client" value={client} onChange={(e) => setClient(e.target.value)} className={adminInput} placeholder="Ex. K1 Mining SA" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminDatePickerField id="tr-start" label="Date de début" isoValue={startDate} onIsoChange={setStartDate} required />
          <AdminDatePickerField id="tr-end" label="Date de fin" isoValue={endDate} onIsoChange={setEndDate} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="tr-place" className={adminLabel}>
              Lieu de délivrance
            </Label>
            <Input id="tr-place" value={issuePlace} onChange={(e) => setIssuePlace(e.target.value)} className={adminInput} />
          </div>
          <AdminDatePickerField id="tr-issue" label="Date de délivrance" isoValue={issueDate} onIsoChange={setIssueDate} required />
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button variant="outline" className="font-opensans font-semibold" onClick={() => navigate('/admin/certificats')}>
            Annuler
          </Button>
          <Button className="font-opensans font-semibold" disabled={saving} onClick={save}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isNew ? 'Créer' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCertTrainingEditPage;
