import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { adminApi, type Actualite, type ActualiteParagraph } from '@/lib/api';
import { ACTUALITE_BADGE_STYLES, ACTUALITE_CATEGORIES } from '@/lib/actualiteOptions';
import { apiDisplayToIsoDate, defaultIsoToday, isoDateToApiDisplay } from '@/lib/adminArticleDate';
import { AdminDatePickerField } from '@/components/admin/AdminDatePickerField';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';
import { ActualiteParagraphsEditor, emptyParagraph } from './ActualiteParagraphsEditor';

function normalizeParagraphsForApi(paragraphs: ActualiteParagraph[]): ActualiteParagraph[] {
  const out: ActualiteParagraph[] = [];
  for (const p of paragraphs) {
    const text = p.text.trim();
    if (!text) continue;
    const row: ActualiteParagraph = { text };
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

function mergeOptions<T extends { value: string; label: string }>(current: string, options: T[]): T[] {
  if (!current || options.some((o) => o.value === current)) return options;
  return [{ value: current, label: `${current} (personnalisé)` } as T, ...options];
}

const AdminActualiteEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(ACTUALITE_CATEGORIES[0]?.value ?? 'Innovation');
  const [dateIso, setDateIso] = useState(defaultIsoToday);
  const [readTime, setReadTime] = useState('5 min');
  const [categoryColor, setCategoryColor] = useState(ACTUALITE_BADGE_STYLES[0]?.value ?? 'bg-primary/10 text-primary');
  const [heroImage, setHeroImage] = useState('');
  const [paragraphs, setParagraphs] = useState<ActualiteParagraph[]>(() => [emptyParagraph()]);
  const [heroUploading, setHeroUploading] = useState(false);

  const categorySelectOptions = useMemo(() => mergeOptions(category, ACTUALITE_CATEGORIES), [category]);
  const badgeSelectOptions = useMemo(() => mergeOptions(categoryColor, ACTUALITE_BADGE_STYLES), [categoryColor]);

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
      .getActualiteAdmin(id, token)
      .then((a: Actualite) => {
        setTitle(a.title);
        setExcerpt(a.excerpt);
        setCategory(a.category || ACTUALITE_CATEGORIES[0]?.value || '');
        setDateIso(apiDisplayToIsoDate(a.date) || defaultIsoToday());
        setReadTime(a.readTime);
        setCategoryColor(a.categoryColor || ACTUALITE_BADGE_STYLES[0]?.value || '');
        setHeroImage(String(a.heroImage ?? ''));
        const list = a.content?.paragraphs?.length ? [...a.content.paragraphs] : [emptyParagraph()];
        setParagraphs(list);
      })
      .catch(() => toast.error('Actualité introuvable'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const onHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setHeroUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setHeroImage(url);
      toast.success('Image hero téléversée');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setHeroUploading(false);
      e.target.value = '';
    }
  };

  const save = async (wantPublish: boolean) => {
    const token = getAdminToken();
    if (!token) return;

    const normalized = normalizeParagraphsForApi(paragraphs);
    if (wantPublish) {
      if (!heroImage.trim()) {
        toast.error('Téléversez une image hero pour publier.');
        return;
      }
      if (normalized.length === 0) {
        toast.error('Ajoutez au moins un paragraphe avec du texte pour publier.');
        return;
      }
    }

    const content: Actualite['content'] = { paragraphs: normalized };

    const payload = {
      title,
      excerpt,
      category,
      date: isoDateToApiDisplay(dateIso),
      readTime,
      categoryColor,
      heroImage: heroImage.trim(),
      published: wantPublish,
      content,
    };

    try {
      if (isNew) {
        await adminApi.saveActualite(payload, token);
        toast.success(wantPublish ? 'Actualité publiée' : 'Brouillon enregistré');
      } else {
        await adminApi.saveActualite(payload, token, id);
        toast.success(wantPublish ? 'Actualité publiée' : 'Brouillon enregistré');
      }
      navigate('/admin/actualites');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const heroPreviewUrl = resolveMediaUrl(heroImage.trim());

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
        <Link to="/admin/actualites">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className={adminPageTitle}>{isNew ? 'Nouvelle actualité' : 'Modifier l’actualité'}</h1>
        <p className="text-sm text-slate-600 font-opensans">
          Enregistrez un <strong>brouillon</strong> pour continuer plus tard, ou <strong>publiez</strong> pour la rendre
          visible sur le site (image hero et au moins un paragraphe requis).
        </p>
      </div>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label htmlFor="act-title" className={adminLabel}>
            Titre
          </Label>
          <Input
            id="act-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={adminInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="act-excerpt" className={adminLabel}>
            Chapô (extrait)
          </Label>
          <Textarea
            id="act-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            className={adminInput}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="act-cat" className={adminLabel}>
              Catégorie
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="act-cat" className={adminInput}>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categorySelectOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AdminDatePickerField
            id="act-date"
            label="Date"
            isoValue={dateIso}
            onIsoChange={setDateIso}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="act-badge" className={adminLabel}>
            Style du badge
          </Label>
          <Select value={categoryColor} onValueChange={setCategoryColor}>
            <SelectTrigger id="act-badge" className={adminInput}>
              <SelectValue placeholder="Style du badge catégorie" />
            </SelectTrigger>
            <SelectContent>
              {badgeSelectOptions.map((b) => (
                <SelectItem key={b.value} value={b.value}>
                  <span className="flex items-center gap-2">
                    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${b.value}`}>{b.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className={adminLabel}>Image hero</Label>
          <p className="text-sm text-slate-600 font-opensans">
            Téléversez une image depuis votre ordinateur. Obligatoire pour <strong>publier</strong> ; optionnel pour un
            brouillon.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={heroUploading}
              className="border-slate-200 font-opensans"
              onClick={() => document.getElementById('act-hero-upload')?.click()}
            >
              {heroUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {heroImage.trim() ? 'Changer l’image' : 'Téléverser une image'}
                </>
              )}
            </Button>
            <input
              id="act-hero-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onHeroUpload}
            />
          </div>
          {heroPreviewUrl ? (
            <div className="mt-2 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 max-w-md aspect-video">
              <img
                src={heroPreviewUrl}
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

export default AdminActualiteEditPage;
