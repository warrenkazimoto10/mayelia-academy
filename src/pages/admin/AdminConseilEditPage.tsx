import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { adminApi, type Conseil, type ConseilParagraph } from '@/lib/api';
import { apiDisplayToIsoDate, defaultIsoToday, isoDateToApiDisplay } from '@/lib/adminArticleDate';
import { AdminDatePickerField } from '@/components/admin/AdminDatePickerField';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';
import {
  ActualiteParagraphsEditor,
  emptyParagraph,
  type EditableParagraphBlock,
} from './ActualiteParagraphsEditor';

function normalizeParagraphsForApi(paragraphs: EditableParagraphBlock[]): ConseilParagraph[] {
  const out: ConseilParagraph[] = [];
  for (const p of paragraphs) {
    const text = p.text.trim();
    if (!text) continue;
    const row: ConseilParagraph = { text };
    const img = p.image;
    if (img?.src?.trim()) {
      row.image = {
        src: img.src.trim(),
        alt: (img.alt ?? '').trim(),
        caption: (img.caption ?? '').trim(),
      };
    }
    out.push(row);
  }
  return out;
}

const AdminConseilEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [dateIso, setDateIso] = useState(defaultIsoToday);
  const [readTime, setReadTime] = useState('5 min');
  const [coverImage, setCoverImage] = useState('');
  const [paragraphs, setParagraphs] = useState<EditableParagraphBlock[]>(() => [emptyParagraph()]);
  const [coverUploading, setCoverUploading] = useState(false);

  const uploadFile = useCallback(async (file: File): Promise<string> => {
    const token = getAdminToken();
    if (!token) throw new Error('Session expirée');
    return adminApi.uploadImage(file, token);
  }, []);

  useEffect(() => {
    if (isNew || !id) return;
    const token = getAdminToken();
    if (!token) {
      toast.error('Session expirée');
      setLoading(false);
      return;
    }
    adminApi
      .getConseilAdmin(id, token)
      .then((c: Conseil) => {
        setTitle(c.title);
        setExcerpt(c.excerpt);
        setDateIso(apiDisplayToIsoDate(c.date) || defaultIsoToday());
        setReadTime(c.readTime);
        setCoverImage(String(c.image ?? ''));
        const list = c.content?.paragraphs?.length ? [...c.content.paragraphs] : [emptyParagraph()];
        setParagraphs(list);
      })
      .catch(() => toast.error('Conseil introuvable'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const onCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setCoverUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setCoverImage(url);
      toast.success('Image téléversée');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setCoverUploading(false);
      e.target.value = '';
    }
  };

  const save = async (wantPublish: boolean) => {
    const token = getAdminToken();
    if (!token) return;

    const normalized = normalizeParagraphsForApi(paragraphs);
    if (wantPublish) {
      if (!coverImage.trim()) {
        toast.error('Téléversez une image de couverture pour publier.');
        return;
      }
      if (normalized.length === 0) {
        toast.error('Ajoutez au moins un paragraphe avec du texte pour publier.');
        return;
      }
    }

    const content: NonNullable<Conseil['content']> = { paragraphs: normalized };

    const payload: Partial<Conseil> & { published: boolean; content: typeof content } = {
      title,
      excerpt,
      date: isoDateToApiDisplay(dateIso),
      readTime,
      image: coverImage.trim() || undefined,
      published: wantPublish,
      content,
    };

    try {
      if (isNew) {
        await adminApi.saveConseil(payload, token);
        toast.success(wantPublish ? 'Conseil publié' : 'Brouillon enregistré');
      } else {
        await adminApi.saveConseil(payload, token, id);
        toast.success(wantPublish ? 'Conseil publié' : 'Brouillon enregistré');
      }
      navigate('/admin/conseils');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const coverPreviewUrl = resolveMediaUrl(coverImage.trim());

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
        <Link to="/admin/conseils">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className={adminPageTitle}>{isNew ? 'Nouveau conseil' : 'Modifier le conseil'}</h1>
        <p className="text-sm text-slate-600 font-opensans">
          Même principe que les actualités : <strong>brouillon</strong> pour enregistrer sans publier,{' '}
          <strong>publier</strong> pour afficher le conseil sur le site (image de couverture et au moins un paragraphe
          requis).
        </p>
      </div>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label htmlFor="cons-title" className={adminLabel}>
            Titre
          </Label>
          <Input
            id="cons-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={adminInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cons-excerpt" className={adminLabel}>
            Chapô (extrait)
          </Label>
          <Textarea
            id="cons-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            className={adminInput}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminDatePickerField
            id="cons-date"
            label="Date"
            isoValue={dateIso}
            onIsoChange={setDateIso}
            required
          />
          <div className="grid gap-2">
            <Label htmlFor="cons-read" className={adminLabel}>
              Temps de lecture
            </Label>
            <Input
              id="cons-read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className={adminInput}
              placeholder="Ex. 5 min"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label className={adminLabel}>Image de couverture</Label>
          <p className="text-sm text-slate-600 font-opensans">
            Téléversez une image depuis votre ordinateur. Obligatoire pour <strong>publier</strong> ; optionnel pour un
            brouillon.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={coverUploading}
              className="border-slate-200 font-opensans"
              onClick={() => document.getElementById('cons-cover-upload')?.click()}
            >
              {coverUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {coverImage.trim() ? 'Changer l’image' : 'Téléverser une image'}
                </>
              )}
            </Button>
            <input
              id="cons-cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onCoverUpload}
            />
          </div>
          {coverPreviewUrl ? (
            <div className="mt-2 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 max-w-md aspect-video">
              <img
                src={coverPreviewUrl}
                alt=""
                className="w-full h-full object-cover"
                onError={(ev) => {
                  (ev.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="mt-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 max-w-md aspect-video flex items-center justify-center text-sm text-slate-500 font-opensans text-center px-4">
              Aperçu après téléversement
            </div>
          )}
        </div>

        <ActualiteParagraphsEditor paragraphs={paragraphs} onChange={setParagraphs} uploadFile={uploadFile} />

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            className="font-opensans font-semibold"
            onClick={() => save(false)}
          >
            Enregistrer le brouillon
          </Button>
          <Button type="button" className="font-opensans font-semibold" onClick={() => save(true)}>
            Publier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminConseilEditPage;
