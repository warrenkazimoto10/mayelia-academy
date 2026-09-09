import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Save,
  Plus,
  Trash2,
  GraduationCap,
  Layers,
  ChevronDown,
  ImagePlus,
  Upload,
  Check,
} from 'lucide-react';
import { formationsAPI, adminApi, type FormationDomainApi, type FormationProgrammeApi } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import {
  FORMATION_DOMAIN_THEMES,
  findFormationDomainTheme,
} from '@/lib/formationDomainThemes';
import { DOMAIN_ICON_ENTRIES, domainIconNode } from '@/lib/formationDomainIcons';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminMuted,
  adminPageTitle,
} from './adminUi';
import {
  clonePayload,
  emptyDomain,
  emptyProgramme,
  StringListEditor,
  validateFormationsTree,
} from './adminFormationsShared';

const AdminFormationDomainPage = () => {
  const { domainSlug } = useParams<{ domainSlug: string }>();
  const navigate = useNavigate();
  const decodedSlug = domainSlug ? decodeURIComponent(domainSlug) : '';
  const isNew = decodedSlug === 'nouveau';

  const [allDomaines, setAllDomaines] = useState<FormationDomainApi[]>([]);
  const [domainIndex, setDomainIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  /** Index de la formation dont le détail est ouvert (une seule à la fois — plus lisible). */
  const [openFormationIndex, setOpenFormationIndex] = useState<number | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const load = useCallback(() => {
    if (!domainSlug) return;
    setLoading(true);
    formationsAPI
      .getAll()
      .then((data) => {
        const doms = clonePayload(data);
        if (isNew) {
          const next = [...doms, emptyDomain()];
          setAllDomaines(next);
          setDomainIndex(next.length - 1);
        } else {
          const idx = doms.findIndex((d) => d.id === decodedSlug);
          setAllDomaines(doms);
          setDomainIndex(idx);
        }
      })
      .catch(() => {
        toast.error('Impossible de charger les formations');
        setAllDomaines([]);
        setDomainIndex(-1);
      })
      .finally(() => setLoading(false));
  }, [domainSlug, decodedSlug, isNew]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setOpenFormationIndex(null);
  }, [decodedSlug, isNew]);

  const domain = domainIndex >= 0 ? allDomaines[domainIndex] : null;

  const patchDomain = (patch: Partial<FormationDomainApi>) => {
    if (domainIndex < 0) return;
    setAllDomaines((prev) => prev.map((d, i) => (i === domainIndex ? { ...d, ...patch } : d)));
  };

  const patchProgramme = (progIndex: number, patch: Partial<FormationProgrammeApi>) => {
    if (domainIndex < 0 || !domain) return;
    setAllDomaines((prev) =>
      prev.map((d, i) => {
        if (i !== domainIndex) return d;
        const formations = d.formations.map((p, pi) => (pi === progIndex ? { ...p, ...patch } : p));
        return { ...d, formations };
      })
    );
  };

  const addProgramme = () => {
    if (domainIndex < 0) return;
    const insertAt = allDomaines[domainIndex]?.formations.length ?? 0;
    setAllDomaines((prev) =>
      prev.map((d, i) => (i === domainIndex ? { ...d, formations: [...d.formations, emptyProgramme()] } : d))
    );
    setOpenFormationIndex(insertAt);
  };

  const removeProgramme = (progIndex: number) => {
    if (domainIndex < 0) return;
    setAllDomaines((prev) =>
      prev.map((d, i) =>
        i === domainIndex ? { ...d, formations: d.formations.filter((_, pi) => pi !== progIndex) } : d
      )
    );
  };

  const removeThisDomain = async () => {
    if (domainIndex < 0) return;
    if (!confirm('Supprimer ce domaine et toutes ses formations ? La suppression sera enregistrée tout de suite.')) {
      return;
    }
    const next = allDomaines.filter((_, i) => i !== domainIndex);
    const token = getAdminToken();
    if (!token) return;
    const err = validateFormationsTree(next);
    if (err) {
      toast.error(err);
      return;
    }
    setSaving(true);
    try {
      await adminApi.saveFormationsTree({ domaines: next }, token);
      toast.success('Domaine supprimé');
      navigate('/admin/formations');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur serveur');
    } finally {
      setSaving(false);
    }
  };

  const onHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setHeroUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      patchDomain({ image: url });
      toast.success('Image enregistrée sur le serveur');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Téléversement impossible');
    } finally {
      setHeroUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    const err = validateFormationsTree(allDomaines);
    if (err) {
      toast.error(err);
      return;
    }
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      const updated = await adminApi.saveFormationsTree({ domaines: allDomaines }, token);
      const doms = clonePayload(updated);
      setAllDomaines(doms);
      if (isNew && domain) {
        const idx = doms.findIndex((d) => d.id === domain.id);
        if (idx >= 0) {
          setDomainIndex(idx);
          navigate(`/admin/formations/domain/${encodeURIComponent(domain.id)}`, { replace: true });
        }
      }
      toast.success('Enregistré');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur serveur');
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

  if (!domain || domainIndex < 0) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Button variant="ghost" asChild className={adminBackButton}>
          <Link to="/admin/formations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tous les domaines
          </Link>
        </Button>
        <Card className="border-slate-200">
          <CardContent className="py-12 text-center">
            <p className="text-slate-700 font-opensans mb-4">Domaine introuvable.</p>
            <Button asChild variant="outline">
              <Link to="/admin/formations">Retour à la liste</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const di = domainIndex;
  const heroPreview = domain.image?.trim() ? resolveMediaUrl(domain.image) : '';
  const activeTheme = findFormationDomainTheme(domain.color, domain.gradient);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="ghost" asChild className={adminBackButton}>
          <Link to="/admin/formations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tous les domaines
          </Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          {!isNew && (
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 font-opensans"
              onClick={removeThisDomain}
              disabled={saving}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer le domaine
            </Button>
          )}
          <Button type="button" onClick={handleSave} disabled={saving} className="font-opensans font-semibold">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className={adminPageTitle}>{isNew ? 'Nouveau domaine' : 'Modifier le domaine'}</h1>
        <p className={adminMuted}>
          {isNew
            ? 'Définissez l’identifiant, le titre et l’image, puis ajoutez vos formations. Enregistrez pour créer le domaine dans l’arborescence.'
            : 'Ajustez les paramètres du domaine et les programmes associés, puis enregistrez pour mettre à jour le site.'}
        </p>
      </div>

      <div className={`space-y-8 ${adminFormCard}`}>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <div className="flex gap-3 items-start">
              <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="font-poppins text-xl text-slate-900">Paramètres du domaine</CardTitle>
                <CardDescription className="font-opensans mt-1">
                  Identifiant du domaine, image de fond, couleurs d’accent et icône — sans code à saisir.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="slug-domain" className={adminLabel}>
                Identifiant (slug)
              </Label>
              <Input
                id="slug-domain"
                value={domain.id}
                onChange={(e) => patchDomain({ id: e.target.value })}
                className={adminInput}
                placeholder="ex. chauffeur-securite"
              />
              <p className="text-xs text-slate-500 font-opensans">
                Lettres minuscules, chiffres et tirets — utilisé dans les URLs et le code.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title-domain" className={adminLabel}>
                Titre affiché
              </Label>
              <Input
                id="title-domain"
                value={domain.title}
                onChange={(e) => patchDomain({ title: e.target.value })}
                className={adminInput}
              />
            </div>
            <div className="space-y-2">
              <Label className={adminLabel}>Icône du domaine</Label>
              <p className="text-xs text-slate-500 font-opensans">Choisissez un pictogramme ; il apparaît dans l’onglet sur le site.</p>
              <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={`${adminInput} h-auto min-h-[44px] justify-between gap-3 py-2 px-3 font-opensans`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {domainIconNode(domain.iconKey, 'w-5 h-5')}
                      </span>
                      <span className="text-left text-sm text-slate-700">
                        {DOMAIN_ICON_ENTRIES.find((e) => e.key === domain.iconKey)?.label ?? 'Choisir une icône'}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[min(100vw-2rem,22rem)] p-3 sm:w-[24rem]" align="start">
                  <p className="text-xs font-semibold text-slate-600 font-opensans mb-2 px-1">Bibliothèque d’icônes</p>
                  <div className="grid grid-cols-4 gap-1.5 max-h-[min(50vh,280px)] overflow-y-auto pr-0.5">
                    {DOMAIN_ICON_ENTRIES.map(({ key, label, Icon }) => {
                      const selected = domain.iconKey === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          title={label}
                          onClick={() => {
                            patchDomain({ iconKey: key });
                            setIconPickerOpen(false);
                          }}
                          className={cn(
                            'flex flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-colors',
                            'hover:border-primary/50 hover:bg-primary/5',
                            selected ? 'border-primary bg-primary/10 ring-1 ring-primary/30' : 'border-slate-200 bg-white'
                          )}
                        >
                          <Icon className={cn('h-6 w-6', selected ? 'text-primary' : 'text-slate-600')} />
                          {selected ? <Check className="h-3 w-3 text-primary" aria-hidden /> : <span className="h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className={adminLabel}>Image de fond</Label>
              <p className="text-xs text-slate-500 font-opensans">
                Grande image derrière le bloc formations sur le site. Téléversez un fichier (JPG, PNG, WebP…).
              </p>
              <div
                className={cn(
                  'rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 flex flex-col items-center justify-center gap-3 p-5 min-h-[140px]',
                  heroPreview && 'border-primary/25 bg-white'
                )}
              >
                {heroPreview ? (
                  <img
                    src={heroPreview}
                    alt=""
                    className="max-h-36 w-full max-w-md rounded-lg object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <ImagePlus className="w-10 h-10 opacity-60" />
                    <span className="font-opensans text-sm text-center px-2">Aucune image — téléversez ou collez une adresse ci-dessous</span>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant={heroPreview ? 'outline' : 'default'}
                    size="sm"
                    disabled={heroUploading}
                    className="font-opensans border-slate-200"
                    onClick={() => document.getElementById('domain-hero-upload')?.click()}
                  >
                    {heroUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        {heroPreview ? 'Remplacer l’image' : 'Téléverser une image'}
                      </>
                    )}
                  </Button>
                  <input
                    id="domain-hero-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onHeroImageUpload}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="image-domain-url" className={`${adminLabel} text-slate-600`}>
                  Ou coller une adresse d’image (optionnel)
                </Label>
                <Input
                  id="image-domain-url"
                  value={domain.image}
                  onChange={(e) => patchDomain({ image: e.target.value })}
                  className={adminInput}
                  placeholder="https://… ou chemin /storage/…"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={adminLabel}>Couleurs sur le site</Label>
              {!activeTheme ? (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 font-opensans">
                  Ce domaine utilise un ancien jeu de couleurs non reconnu. Choisissez un thème ci-dessous pour
                  poursuivre l’enregistrement.
                </p>
              ) : null}
              <p className="text-xs text-slate-500 font-opensans">
                Thème appliqué aux onglets des domaines et aux cartes des programmes (aperçu).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FORMATION_DOMAIN_THEMES.map((t) => {
                  const selected = domain.color === t.apiColor && domain.gradient === t.apiGradient;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => patchDomain({ color: t.apiColor, gradient: t.apiGradient })}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        selected ? 'border-primary ring-2 ring-primary/25 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                      )}
                    >
                      <div className={cn('h-8 w-full rounded-md mb-2', t.tabSelected)} />
                      <span className="text-xs font-semibold text-slate-800 font-opensans leading-tight block">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-2" />

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 font-poppins flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Formations
                <BadgeCount count={domain.formations.length} />
              </h2>
              <p className="text-sm text-slate-500 font-opensans mt-1 max-w-xl">
                Cliquez sur une ligne pour afficher ou masquer le formulaire. Une seule formation est dépliée à la fois
                pour garder l’écran lisible.
              </p>
            </div>
            <Button type="button" variant="default" size="sm" className="font-opensans shrink-0" onClick={addProgramme}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une formation
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {domain.formations.map((prog, pi) => {
              const isOpen = openFormationIndex === pi;
              return (
                <div key={`form-${di}-${pi}`} className="border-b border-slate-100 last:border-b-0">
                  <div className="flex items-stretch">
                    <button
                      type="button"
                      className={cn(
                        'flex flex-1 min-w-0 items-center gap-3 px-4 py-3.5 text-left transition-colors',
                        'hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-50',
                        isOpen && 'bg-slate-50'
                      )}
                      onClick={() => setOpenFormationIndex(isOpen ? null : pi)}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold font-opensans">
                        {pi + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-poppins font-semibold text-slate-900 truncate">
                          {prog.title?.trim() || 'Sans titre'}
                        </span>
                        <span className="block text-xs text-slate-500 font-opensans line-clamp-1 mt-0.5">
                          {prog.description?.trim() || 'Description à compléter…'}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200',
                          isOpen && 'rotate-180 text-primary'
                        )}
                      />
                    </button>
                    <div className="flex items-center pr-2 border-l border-slate-100 bg-white">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                        aria-label="Supprimer cette formation"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (openFormationIndex === pi) setOpenFormationIndex(null);
                          else if (openFormationIndex !== null && openFormationIndex > pi)
                            setOpenFormationIndex(openFormationIndex - 1);
                          removeProgramme(pi);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {isOpen ? (
                    <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-5 sm:px-6 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor={`pt-${di}-${pi}`} className={adminLabel}>
                          Titre du programme
                        </Label>
                        <Input
                          id={`pt-${di}-${pi}`}
                          value={prog.title}
                          onChange={(e) => patchProgramme(pi, { title: e.target.value })}
                          className={adminInput}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`pd-${di}-${pi}`} className={adminLabel}>
                          Description
                        </Label>
                        <Textarea
                          id={`pd-${di}-${pi}`}
                          rows={4}
                          value={prog.description}
                          onChange={(e) => patchProgramme(pi, { description: e.target.value })}
                          className={adminInput}
                          placeholder="Présentez le programme en quelques phrases…"
                        />
                      </div>
                      <StringListEditor
                        label="Contenus / points forts"
                        hint="Une ligne = une puce affichée sur le site."
                        items={prog.contenus}
                        onChange={(contenus) => patchProgramme(pi, { contenus })}
                        placeholder="Ex. Module pratique au simulateur"
                      />
                      <StringListEditor
                        label="Objectifs"
                        hint="Une ligne = un objectif."
                        items={prog.objectifs}
                        onChange={(objectifs) => patchProgramme(pi, { objectifs })}
                        placeholder="Ex. Obtenir la certification X"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
            {domain.formations.length === 0 && (
              <div className="py-12 text-center px-4">
                <p className="text-sm text-slate-600 font-opensans mb-4">Aucune formation pour l’instant.</p>
                <Button type="button" variant="outline" size="sm" className="font-opensans" onClick={addProgramme}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une formation
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" asChild className="font-opensans">
            <Link to="/admin/formations">Annuler · Retour liste</Link>
          </Button>
          <Button type="button" onClick={handleSave} disabled={saving} className="font-opensans font-semibold min-w-[160px]">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

function BadgeCount({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary font-opensans">
      {count}
    </span>
  );
}

export default AdminFormationDomainPage;
