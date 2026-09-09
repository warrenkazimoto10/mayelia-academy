import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  ImagePlus,
} from 'lucide-react';
import { adminApi, heroSlidesAPI, type HeroSlide } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import { adminBackButton, adminInput, adminLabel, adminMuted, adminPageTitle } from './adminUi';

type DraftSlide = {
  clientKey: string;
  imageUrl: string;
  overlayOpacity: number;
  description: string;
  linkUrl: string;
};

const emptyDraft = (): DraftSlide => ({
  clientKey: `n-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  imageUrl: '',
  overlayOpacity: 90,
  description: '',
  linkUrl: '',
});

const fromApi = (slides: HeroSlide[]): DraftSlide[] =>
  slides.map((s) => ({
    clientKey: `id-${s.id}`,
    imageUrl: s.imageUrl,
    overlayOpacity: s.overlayOpacity ?? 90,
    description: s.description,
    linkUrl: s.linkUrl?.trim() || '',
  }));

const AdminHeroSlidesPage = () => {
  const queryClient = useQueryClient();
  const [drafts, setDrafts] = useState<DraftSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadKey, setUploadKey] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    heroSlidesAPI
      .getAll()
      .then((rows) => {
        setDrafts(rows.length ? fromApi(rows) : [emptyDraft()]);
      })
      .catch(() => {
        setDrafts([emptyDraft()]);
        toast.error('Impossible de charger les slides — vérifiez l’API.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = (clientKey: string, patch: Partial<DraftSlide>) => {
    setDrafts((prev) => prev.map((d) => (d.clientKey === clientKey ? { ...d, ...patch } : d)));
  };

  const move = (index: number, dir: -1 | 1) => {
    setDrafts((prev) => {
      const j = index + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const remove = (clientKey: string) => {
    setDrafts((prev) => (prev.length <= 1 ? prev : prev.filter((d) => d.clientKey !== clientKey)));
  };

  const onUpload = async (clientKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setUploadKey(clientKey);
    try {
      const url = await adminApi.uploadImage(file, token);
      patch(clientKey, { imageUrl: url });
      toast.success('Image enregistrée');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setUploadKey(null);
    }
  };

  const handleSave = async () => {
    const token = getAdminToken();
    if (!token) return;

    for (let i = 0; i < drafts.length; i++) {
      const d = drafts[i];
      if (!d.imageUrl.trim()) {
        toast.error(`Slide ${i + 1} : téléversez une image de fond.`);
        return;
      }
      if (!d.description.trim()) {
        toast.error(`Slide ${i + 1} : saisissez le texte affiché sur le bandeau.`);
        return;
      }
    }

    const payload = drafts.map((d) => ({
      imageUrl: d.imageUrl.trim(),
      overlayOpacity: d.overlayOpacity,
      description: d.description.trim(),
      linkUrl: d.linkUrl.trim() ? d.linkUrl.trim() : null,
    }));

    setSaving(true);
    try {
      const saved = await adminApi.saveHeroSlides(payload, token);
      setDrafts(fromApi(saved));
      await queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
      toast.success('Carrousel enregistré');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur serveur');
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
    <div className="space-y-8 max-w-4xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tableau de bord
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className={adminPageTitle}>Carrousel d’accueil</h1>
          <p className={`${adminMuted} mt-1 max-w-2xl`}>
            Images plein écran sous le menu, avec texte et bouton qui renvoie vers une page du site, une ancre (#formations) ou un
            lien externe.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            className="font-opensans"
            onClick={() => setDrafts((p) => [...p, emptyDraft()])}
            disabled={drafts.length >= 12}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un slide
          </Button>
          <Button type="button" className="font-opensans font-semibold" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {drafts.map((d, index) => {
          const preview = d.imageUrl.trim() ? resolveMediaUrl(d.imageUrl) : '';
          return (
            <Card key={d.clientKey} className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/90 border-b border-slate-100 py-3 flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-base font-poppins">Slide {index + 1}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                    aria-label="Monter"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === drafts.length - 1}
                    onClick={() => move(index, 1)}
                    aria-label="Descendre"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    disabled={drafts.length <= 1}
                    onClick={() => remove(d.clientKey)}
                    aria-label="Supprimer ce slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className={adminLabel}>Image de fond</Label>
                    <div
                      className={`rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 flex flex-col items-center justify-center gap-2 p-4 min-h-[140px] ${
                        preview ? 'border-primary/25 bg-white' : ''
                      }`}
                    >
                      {preview ? (
                        <div className="relative w-full rounded-lg overflow-hidden shadow-sm">
                          <img src={preview} alt="" className="max-h-32 w-full object-cover" />
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-secondary to-transparent pointer-events-none"
                            style={{ opacity: d.overlayOpacity / 100 }}
                          />
                        </div>
                      ) : (
                        <ImagePlus className="w-10 h-10 text-slate-400" />
                      )}
                      <Button
                        type="button"
                        variant={preview ? 'outline' : 'default'}
                        size="sm"
                        disabled={uploadKey === d.clientKey}
                        onClick={() => document.getElementById(`hero-up-${d.clientKey}`)?.click()}
                        className="font-opensans"
                      >
                        {uploadKey === d.clientKey ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            {preview ? 'Remplacer l’image' : 'Téléverser'}
                          </>
                        )}
                      </Button>
                      <input
                        id={`hero-up-${d.clientKey}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onUpload(d.clientKey, e)}
                      />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`overlay-${d.clientKey}`} className={adminLabel}>
                          Intensité du masque bleu
                        </Label>
                        <span className="text-xs text-slate-500 font-opensans">{d.overlayOpacity}%</span>
                      </div>
                      <input
                        id={`overlay-${d.clientKey}`}
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={d.overlayOpacity}
                        onChange={(e) => patch(d.clientKey, { overlayOpacity: Number(e.target.value) })}
                        className="w-full accent-primary"
                      />
                      <p className="text-xs text-slate-500 font-opensans">
                        0 = image visible sans filtre, 100 = image entièrement masquée par le bleu.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`desc-${d.clientKey}`} className={adminLabel}>
                      Texte sur le slide
                    </Label>
                    <Textarea
                      id={`desc-${d.clientKey}`}
                      rows={8}
                      value={d.description}
                      onChange={(e) => patch(d.clientKey, { description: e.target.value })}
                      className={adminInput}
                      placeholder="Texte principal affiché en grand sur le slide (retours à la ligne possibles)."
                    />
                    <p className="text-xs text-slate-500 font-opensans">
                      Astuce : gardez des phrases courtes pour une lecture confortable sur mobile.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-${d.clientKey}`} className={adminLabel}>
                    Lien du bouton « Découvrir »
                  </Label>
                  <Input
                    id={`link-${d.clientKey}`}
                    value={d.linkUrl}
                    onChange={(e) => patch(d.clientKey, { linkUrl: e.target.value })}
                    className={adminInput}
                    placeholder="#formations ou /formations ou https://…"
                  />
                  <p className="text-xs text-slate-500 font-opensans">
                    Laissez vide pour renvoyer par défaut vers la section Formations de l’accueil (#formations).
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminHeroSlidesPage;
