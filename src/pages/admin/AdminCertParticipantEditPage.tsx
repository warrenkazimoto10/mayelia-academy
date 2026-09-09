import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';

const AdminCertParticipantEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [civility, setCivility] = useState('M.');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (isNew || !id) return;
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    adminApi
      .listCertParticipants(token)
      .then((list) => {
        const p = list.find((x) => String(x.id) === id);
        if (!p) { toast.error('Participant introuvable'); navigate('/admin/certificats/participants'); return; }
        setCivility(p.civility);
        setFullName(p.full_name);
      })
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id, isNew, navigate]);

  const save = async () => {
    if (!fullName.trim()) { toast.error('Le nom complet est obligatoire.'); return; }
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    try {
      if (isNew) {
        await adminApi.saveCertParticipant({ civility, full_name: fullName.trim() }, token);
        toast.success('Participant créé');
      } else {
        await adminApi.saveCertParticipant({ civility, full_name: fullName.trim() }, token, Number(id));
        toast.success('Participant mis à jour');
      }
      navigate('/admin/certificats/participants');
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
        <Link to="/admin/certificats/participants">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <h1 className={adminPageTitle}>{isNew ? 'Nouveau participant' : 'Modifier le participant'}</h1>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label className={adminLabel}>Civilité</Label>
          <Select value={civility} onValueChange={setCivility}>
            <SelectTrigger className={`${adminInput} w-40`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M.">M.</SelectItem>
              <SelectItem value="Mme">Mme</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="part-name" className={adminLabel}>
            Nom complet
          </Label>
          <Input
            id="part-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex. Jean Kouassi"
            className={adminInput}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button variant="outline" className="font-opensans font-semibold" onClick={() => navigate('/admin/certificats/participants')}>
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

export default AdminCertParticipantEditPage;
