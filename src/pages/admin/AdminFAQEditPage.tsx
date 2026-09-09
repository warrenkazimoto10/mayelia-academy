import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { adminApi, type Faq } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';

const AdminFAQEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [published, setPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (isNew || !id) return;
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }

    adminApi
      .listFaqsAdmin(token)
      .then((faqs) => {
        const faq = faqs.find((f) => String(f.id) === id);
        if (!faq) { toast.error('FAQ introuvable'); navigate('/admin/faq'); return; }
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setPublished(faq.published);
        setSortOrder(faq.sort_order);
      })
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id, isNew, navigate]);

  const save = async () => {
    if (!question.trim()) { toast.error('La question est obligatoire.'); return; }
    if (!answer.trim()) { toast.error('La réponse est obligatoire.'); return; }

    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    const payload: Omit<Faq, 'id'> = { question: question.trim(), answer: answer.trim(), sort_order: sortOrder, published };

    try {
      if (isNew) {
        await adminApi.saveFaq(payload, token);
        toast.success('FAQ créée');
      } else {
        await adminApi.saveFaq(payload, token, Number(id));
        toast.success('FAQ mise à jour');
      }
      navigate('/admin/faq');
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
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin/faq">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <h1 className={adminPageTitle}>{isNew ? 'Nouvelle question FAQ' : 'Modifier la FAQ'}</h1>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label htmlFor="faq-question" className={adminLabel}>
            Question
          </Label>
          <Input
            id="faq-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex. Comment s'inscrire à une formation ?"
            className={adminInput}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="faq-answer" className={adminLabel}>
            Réponse
          </Label>
          <Textarea
            id="faq-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="Répondez de manière claire et concise..."
            className={adminInput}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="faq-sort" className={adminLabel}>
            Ordre d'affichage
          </Label>
          <Input
            id="faq-sort"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={`${adminInput} w-32`}
          />
          <p className="text-xs text-slate-500 font-opensans">
            Les FAQ sont triées par ordre croissant. Vous pouvez aussi réordonner depuis la liste.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="faq-published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="faq-published" className={adminLabel}>
            {published ? 'Publiée (visible sur le site)' : 'Masquée (non visible)'}
          </Label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            className="font-opensans font-semibold"
            onClick={() => navigate('/admin/faq')}
          >
            Annuler
          </Button>
          <Button
            type="button"
            className="font-opensans font-semibold"
            disabled={saving}
            onClick={save}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isNew ? 'Créer la FAQ' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQEditPage;
