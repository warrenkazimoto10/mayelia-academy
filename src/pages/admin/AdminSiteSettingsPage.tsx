import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Save,
  Globe,
  MapPin,
  Share2,
  BookOpen,
  Info,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Search,
  ChevronDown,
  Home,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { adminApi, siteConfigAPI, defaultSiteConfig, type SiteConfigData } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import { canonicalizeOpeningHoursInSiteConfig, deriveLegacyHoursFieldsFromCanonical } from '@/lib/contactOpeningHours';
import { joinAproposMissionBlocks, splitAproposMissionBody } from '@/lib/aproposMissionText';
import { getAdminToken } from './adminSession';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminMuted,
  adminPageTitle,
} from './adminUi';

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={adminLabel}>
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-slate-500 font-opensans">{hint}</p> : null}
    </div>
  );
}

function SettingsSubsection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
      <div className="flex gap-3 border-b border-slate-100 pb-4">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 h-fit">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 space-y-1">
          <h3 className="font-poppins font-semibold text-slate-900 text-base leading-snug">{title}</h3>
          <p className="text-sm text-slate-600 font-opensans leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

const AdminSiteSettingsPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SiteConfigData>(defaultSiteConfig());
  const [aproposSeoOpen, setAproposSeoOpen] = useState(false);
  const [homeAboutUploading, setHomeAboutUploading] = useState(false);
  const [aproposMissionImageUploading, setAproposMissionImageUploading] = useState(false);
  const [siteLogoUploading, setSiteLogoUploading] = useState(false);

  useEffect(() => {
    siteConfigAPI
      .getPublic()
      .then((data) => setForm(canonicalizeOpeningHoursInSiteConfig(data)))
      .catch(() => toast.error('Impossible de charger les réglages'))
      .finally(() => setLoading(false));
  }, []);

  const patchField =
    (key: keyof SiteConfigData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const patchOpeningHours = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = deriveLegacyHoursFieldsFromCanonical(e.target.value);
    setForm((prev) => ({ ...prev, ...next }));
  };

  const patchAproposMissionBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const chunks = splitAproposMissionBody(e.target.value);
    setForm((prev) => ({ ...prev, ...chunks }));
  };

  const onHomeAboutImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setHomeAboutUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setForm((prev) => ({ ...prev, homeAboutImageUrl: url }));
      toast.success('Image téléversée — enregistrez tout en bas de page pour la conserver dans les réglages.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setHomeAboutUploading(false);
    }
  };

  const onSiteLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setSiteLogoUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setForm((prev) => ({ ...prev, siteLogoUrl: url }));
      toast.success('Logo téléversé — enregistrez tout en bas de page pour le conserver dans les réglages.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setSiteLogoUploading(false);
    }
  };

  const onAproposMissionImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setAproposMissionImageUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setForm((prev) => ({ ...prev, aproposMissionImageUrl: url }));
      toast.success('Image mission téléversée — enregistrez tout en bas de page pour la conserver dans les réglages.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setAproposMissionImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.saveSiteConfig(form, token);
      await queryClient.invalidateQueries({ queryKey: ['site-config'] });
      toast.success('Réglages enregistrés');
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

  const tabPanelClass = `${adminFormCard} border-0 shadow-none p-0 pt-1 space-y-5`;

  return (
    <div className="space-y-6 max-w-5xl">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tableau de bord
        </Link>
      </Button>

      <div>
        <h1 className={adminPageTitle}>Réglages du site</h1>
        <p className={adminMuted}>
          Paramètres synchronisés avec le site public — utilisez les onglets pour naviguer entre les sections.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/90 pb-4">
            <CardTitle className="font-poppins text-lg text-slate-900">Contenu & affichage</CardTitle>
            <CardDescription className="font-opensans">
              Toutes les modifications sont conservées dans un même formulaire ; un clic sur « Enregistrer tout » sauvegarde
              l’ensemble.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="identity" className="w-full">
              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white px-4 pt-4 pb-3">
                <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner">
                  <TabsTrigger
                    value="identity"
                    className="gap-2 px-3 py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 min-w-[130px] justify-center sm:justify-start"
                  >
                    <Globe className="w-4 h-4 shrink-0 text-primary" />
                    <span className="font-opensans font-semibold">Identité & SEO</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="gap-2 px-3 py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 min-w-[130px] justify-center sm:justify-start"
                  >
                    <MapPin className="w-4 h-4 shrink-0 text-primary" />
                    <span className="font-opensans font-semibold">Coordonnées</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="gap-2 px-3 py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 min-w-[130px] justify-center sm:justify-start"
                  >
                    <Share2 className="w-4 h-4 shrink-0 text-primary" />
                    <span className="font-opensans font-semibold">Réseaux & newsletter</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="apropos"
                    className="gap-2 px-3 py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 min-w-[130px] justify-center sm:justify-start"
                  >
                    <BookOpen className="w-4 h-4 shrink-0 text-primary" />
                    <span className="font-opensans font-semibold">À propos</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4 sm:p-6">
                <TabsContent value="identity" className="mt-0 focus-visible:ring-0 ring-0 outline-none">
                  <p className="text-sm text-slate-600 font-opensans mb-5">
                    Identité visuelle (logo), nom dans les titres d’onglet, URL canonique et méta description par défaut.
                  </p>
                  <div className={tabPanelClass}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="siteName" label="Nom du site">
                        <Input
                          id="siteName"
                          value={form.siteName}
                          onChange={patchField('siteName')}
                          className={adminInput}
                        />
                      </Field>
                      <Field
                        id="siteUrl"
                        label="URL du site (sans slash final)"
                        hint="Utilisée pour les balises canonical et Open Graph."
                      >
                        <Input id="siteUrl" value={form.siteUrl} onChange={patchField('siteUrl')} className={adminInput} />
                      </Field>
                    </div>
                    <Field
                      id="site-logo"
                      label="Logo du site"
                      hint="Affiché dans l’en-tête (toutes les pages) et dans le pied de page. PNG ou SVG avec fond transparent recommandés. Laisser vide pour le logo fourni par défaut."
                    >
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shrink-0">
                          {form.siteLogoUrl?.trim() ? (
                            <img
                              src={resolveMediaUrl(form.siteLogoUrl)}
                              alt="Aperçu logo"
                              className="h-20 w-auto max-w-[200px] object-contain object-left"
                            />
                          ) : (
                            <div className="h-20 min-w-[120px] flex items-center justify-center text-xs text-slate-500 font-opensans px-2 text-center">
                              Logo par défaut
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="font-opensans"
                            disabled={siteLogoUploading}
                            onClick={() => document.getElementById('site-logo-upload')?.click()}
                          >
                            {siteLogoUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <ImageIcon className="w-4 h-4 mr-2" />
                            )}
                            Choisir un logo
                          </Button>
                          {form.siteLogoUrl?.trim() ? (
                            <Button
                              type="button"
                              variant="ghost"
                              className="font-opensans text-slate-600"
                              onClick={() => setForm((prev) => ({ ...prev, siteLogoUrl: '' }))}
                            >
                              Revenir au logo par défaut
                            </Button>
                          ) : null}
                          <input
                            id="site-logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onSiteLogoChange}
                          />
                        </div>
                      </div>
                    </Field>
                    <Field id="metaDefaultDescription" label="Description SEO par défaut">
                      <Textarea
                        id="metaDefaultDescription"
                        rows={3}
                        value={form.metaDefaultDescription}
                        onChange={patchField('metaDefaultDescription')}
                        className={adminInput}
                      />
                    </Field>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 focus-visible:ring-0">
                  <Alert className="mb-6 border-slate-200 bg-slate-50">
                    <Info className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-poppins text-slate-900">Où ces infos apparaissent ?</AlertTitle>
                    <AlertDescription className="text-slate-600 font-opensans text-sm">
                      <ul className="list-disc pl-4 space-y-1 mt-2">
                        <li>
                          <strong>Section Contact</strong> de l’accueil : cartes Téléphone, Email, Adresse, Horaires (et WhatsApp si
                          renseigné).
                        </li>
                        <li>
                          <strong>Page /contact</strong> : mêmes cartes + le formulaire d’envoi (les messages arrivent sur l’e-mail
                          « boîte de réception » ci-dessous).
                        </li>
                        <li>
                          <strong>Pied de page</strong> : adresse, téléphone, e-mail.
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-6">
                    <SettingsSubsection
                      icon={Phone}
                      title="Téléphone, WhatsApp et e-mail"
                      description="Le numéro, le message instantané et l’adresse e-mail publics. L’e-mail sert aussi de destination pour le formulaire de contact et les notifications (Back-office → Messages contact)."
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field
                          id="phone"
                          label="Numéro de téléphone"
                          hint="Utilisé sur le site, le footer, et le lien cliquable tel:."
                        >
                          <Input id="phone" value={form.phone} onChange={patchField('phone')} className={adminInput} />
                        </Field>
                        <Field
                          id="whatsapp"
                          label="WhatsApp (optionnel)"
                          hint="Si rempli, une carte WhatsApp apparaît ; le lien cliquable est généré (format international de préférence)."
                        >
                          <Input id="whatsapp" value={form.whatsapp} onChange={patchField('whatsapp')} className={adminInput} />
                        </Field>
                        <Field
                          id="email"
                          label="E-mail (affichage + boîte de réception)"
                          hint="Adresse affichée sur le site, envoi des messages du formulaire, et copie e-mail côté serveur."
                        >
                          <Input id="email" type="email" value={form.email} onChange={patchField('email')} className={adminInput} />
                        </Field>
                        <Field
                          id="emailResponseNote"
                          label="Texte sous l’e-mail (carte « Email »)"
                          hint="Ex. délai de réponse — affiché en petit sous l’adresse e-mail sur le site."
                        >
                          <Input
                            id="emailResponseNote"
                            value={form.emailResponseNote}
                            onChange={patchField('emailResponseNote')}
                            className={adminInput}
                          />
                        </Field>
                      </div>
                    </SettingsSubsection>

                    <SettingsSubsection
                      icon={MapPin}
                      title="Adresse postale"
                      description="Deux lignes pour l’adresse (souvent rue + pays). Affichée dans la carte Adresse, le footer, et formatée sur plusieurs lignes."
                    >
                      <Field id="addressLine1" label="Ligne 1 (rue, quartier, ville)">
                        <Input id="addressLine1" value={form.addressLine1} onChange={patchField('addressLine1')} className={adminInput} />
                      </Field>
                      <Field id="addressLine2" label="Ligne 2 (pays, complément)">
                        <Input id="addressLine2" value={form.addressLine2} onChange={patchField('addressLine2')} className={adminInput} />
                      </Field>
                      <Field
                        id="addressVisitNote"
                        label="Texte sous l’adresse (carte « Adresse »)"
                        hint="Ex. présence sur rendez-vous — une ligne d’aide sous le bloc adresse."
                      >
                        <Input id="addressVisitNote" value={form.addressVisitNote} onChange={patchField('addressVisitNote')} className={adminInput} />
                      </Field>
                    </SettingsSubsection>

                    <SettingsSubsection
                      icon={Clock}
                      title="Horaires"
                      description="Un seul bloc de texte : la première ligne apparaît aussi sous le numéro de téléphone ; l’ensemble est affiché dans la carte « Horaires » (passages à la ligne autorisés)."
                    >
                      <Field
                        id="opening-hours-unified"
                        label="Horaires d’ouverture"
                        hint="Ex. première ligne « Lun–Ven 8h–18h », puis à la ligne « Sam : 9h–13h ». Une seule ligne suffit si vos horaires sont identiques tous les jours."
                      >
                        <Textarea
                          id="opening-hours-unified"
                          rows={4}
                          value={form.hoursWeekdays}
                          onChange={patchOpeningHours}
                          className={adminInput}
                          placeholder={'Lun–Ven 8h–18h, puis à la ligne : Sam 9h–13h'}
                        />
                      </Field>
                    </SettingsSubsection>

                    <SettingsSubsection
                      icon={MessageSquare}
                      title="Titres de la section Contact"
                      description="En-tête au-dessus des cartes sur l’accueil et dans la zone contact ; pas le hero de la page /contact (celui-ci peut rester fixe)."
                    >
                      <Field id="contactSectionTitle" label="Titre principal de la section">
                        <Input id="contactSectionTitle" value={form.contactSectionTitle} onChange={patchField('contactSectionTitle')} className={adminInput} />
                      </Field>
                      <Field id="contactSectionSubtitle" label="Sous-titre (phrase d’accroche)">
                        <Textarea
                          id="contactSectionSubtitle"
                          rows={2}
                          value={form.contactSectionSubtitle}
                          onChange={patchField('contactSectionSubtitle')}
                          className={adminInput}
                        />
                      </Field>
                    </SettingsSubsection>

                    <SettingsSubsection
                      icon={Search}
                      title="Référencement — page Contact"
                      description="Texte utilisé pour la balise meta description quand un visiteur ouvre la page dédiée « Contact » (onglet ou résultat Google)."
                    >
                      <Field
                        id="contactPageMetaDescription"
                        label="Meta description"
                        hint="1–2 phrases, mots-clés naturels ; évitez de dupliquer exactement le titre."
                      >
                        <Textarea
                          id="contactPageMetaDescription"
                          rows={3}
                          value={form.contactPageMetaDescription}
                          onChange={patchField('contactPageMetaDescription')}
                          className={adminInput}
                        />
                      </Field>
                    </SettingsSubsection>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="mt-0 focus-visible:ring-0">
                  <p className="text-sm text-slate-600 font-opensans mb-5">
                    Liens réseaux sociaux (masqués sur le site si vides), texte du pied de page et bloc newsletter.
                  </p>
                  <div className={tabPanelClass}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="facebookUrl" label="Facebook URL">
                        <Input id="facebookUrl" value={form.facebookUrl} onChange={patchField('facebookUrl')} className={adminInput} />
                      </Field>
                      <Field id="linkedinUrl" label="LinkedIn URL">
                        <Input id="linkedinUrl" value={form.linkedinUrl} onChange={patchField('linkedinUrl')} className={adminInput} />
                      </Field>
                      <Field id="instagramUrl" label="Instagram URL">
                        <Input id="instagramUrl" value={form.instagramUrl} onChange={patchField('instagramUrl')} className={adminInput} />
                      </Field>
                      <Field id="twitterUrl" label="X / Twitter URL (optionnel)">
                        <Input id="twitterUrl" value={form.twitterUrl} onChange={patchField('twitterUrl')} className={adminInput} />
                      </Field>
                      <Field id="youtubeUrl" label="YouTube URL (optionnel)">
                        <Input id="youtubeUrl" value={form.youtubeUrl} onChange={patchField('youtubeUrl')} className={adminInput} />
                      </Field>
                    </div>
                    <Field id="footerTagline" label="Accroche pied de page">
                      <Textarea id="footerTagline" rows={3} value={form.footerTagline} onChange={patchField('footerTagline')} className={adminInput} />
                    </Field>
                    <Field id="newsletterIntro" label="Texte newsletter">
                      <Input id="newsletterIntro" value={form.newsletterIntro} onChange={patchField('newsletterIntro')} className={adminInput} />
                    </Field>
                    <Field id="newsletterPlaceholder" label="Placeholder champ email">
                      <Input
                        id="newsletterPlaceholder"
                        value={form.newsletterPlaceholder}
                        onChange={patchField('newsletterPlaceholder')}
                        className={adminInput}
                      />
                    </Field>
                  </div>
                </TabsContent>

                <TabsContent value="apropos" className="mt-0 focus-visible:ring-0 space-y-6">
                  <Alert className="border-slate-200 bg-slate-50">
                    <Info className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-poppins text-slate-900">Deux endroits différents sur le site</AlertTitle>
                    <AlertDescription className="text-slate-600 font-opensans text-sm space-y-2">
                      <p className="mt-1">
                        Le lien <strong className="text-slate-800">« À propos »</strong> du menu mène vers la section{' '}
                        <strong className="text-slate-800">#apropos</strong> sur la <strong>page d’accueil</strong> (bloc « Qui sommes-nous
                        ? »). C’est le <strong>premier</strong> encadré ci-dessous.
                      </p>
                      <p>
                        La page dédiée <strong className="text-slate-800">/apropos</strong> (URL complète, contenu « Notre mission ») se
                        configure dans le <strong>second</strong> encadré. Les visiteurs peuvent aussi y accéder par un lien direct ou le
                        pied de page selon votre maquette.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <SettingsSubsection
                    icon={Home}
                    title="Accueil — bloc « Qui sommes-nous » (#apropos)"
                    description="Contenu visible lorsque l’on suit le lien « À propos » du menu (ancre sur l’accueil). Titre en deux parties, deux paragraphes et image à droite."
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        id="homeAboutTitlePrefix"
                        label="Titre — partie avant l’accent coloré"
                        hint="Ex. « QUI » (souvent en noir ou couleur texte)."
                      >
                        <Input
                          id="homeAboutTitlePrefix"
                          value={form.homeAboutTitlePrefix}
                          onChange={patchField('homeAboutTitlePrefix')}
                          className={adminInput}
                        />
                      </Field>
                      <Field
                        id="homeAboutTitleAccent"
                        label="Titre — partie en couleur primaire"
                        hint="Ex. « SOMMES-NOUS ? »"
                      >
                        <Input
                          id="homeAboutTitleAccent"
                          value={form.homeAboutTitleAccent}
                          onChange={patchField('homeAboutTitleAccent')}
                          className={adminInput}
                        />
                      </Field>
                    </div>
                    <Field id="homeAboutIntro" label="Paragraphe d’introduction">
                      <Textarea
                        id="homeAboutIntro"
                        rows={4}
                        value={form.homeAboutIntro}
                        onChange={patchField('homeAboutIntro')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field id="homeAboutExpertiseHeading" label="Sous-titre — expertise">
                      <Input
                        id="homeAboutExpertiseHeading"
                        value={form.homeAboutExpertiseHeading}
                        onChange={patchField('homeAboutExpertiseHeading')}
                        className={adminInput}
                      />
                    </Field>
                    <Field id="homeAboutExpertiseIntro" label="Paragraphe avant la liste des agréments">
                      <Textarea
                        id="homeAboutExpertiseIntro"
                        rows={3}
                        value={form.homeAboutExpertiseIntro}
                        onChange={patchField('homeAboutExpertiseIntro')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field
                      id="homeAboutExpertiseBullets"
                      label="Liste des agréments"
                      hint="Un élément par ligne — affiché en liste à puces."
                    >
                      <Textarea
                        id="homeAboutExpertiseBullets"
                        rows={4}
                        value={form.homeAboutExpertiseBullets}
                        onChange={patchField('homeAboutExpertiseBullets')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field id="homeAboutExpertiseOutro" label="Paragraphe après la liste des agréments">
                      <Textarea
                        id="homeAboutExpertiseOutro"
                        rows={3}
                        value={form.homeAboutExpertiseOutro}
                        onChange={patchField('homeAboutExpertiseOutro')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field id="homeAboutPedagogyHeading" label="Sous-titre — pédagogie">
                      <Input
                        id="homeAboutPedagogyHeading"
                        value={form.homeAboutPedagogyHeading}
                        onChange={patchField('homeAboutPedagogyHeading')}
                        className={adminInput}
                      />
                    </Field>
                    <Field id="homeAboutPedagogyText" label="Paragraphe — pédagogie">
                      <Textarea
                        id="homeAboutPedagogyText"
                        rows={3}
                        value={form.homeAboutPedagogyText}
                        onChange={patchField('homeAboutPedagogyText')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field id="homeAboutClosingText" label="Paragraphe de conclusion">
                      <Textarea
                        id="homeAboutClosingText"
                        rows={3}
                        value={form.homeAboutClosingText}
                        onChange={patchField('homeAboutClosingText')}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field
                      id="home-about-image"
                      label="Photo à droite"
                      hint="Laisser vide pour conserver l’image fournie par défaut avec le site. Sinon, téléversez une image (paysage recommandé)."
                    >
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden w-full max-w-[280px] aspect-[1476/1200] shrink-0">
                          {form.homeAboutImageUrl?.trim() ? (
                            <img
                              src={resolveMediaUrl(form.homeAboutImageUrl)}
                              alt="Aperçu bloc accueil"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[120px] flex items-center justify-center text-xs text-slate-500 font-opensans px-3 text-center">
                              Image par défaut (non personnalisée)
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="font-opensans"
                            disabled={homeAboutUploading}
                            onClick={() => document.getElementById('home-about-image-upload')?.click()}
                          >
                            {homeAboutUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <ImageIcon className="w-4 h-4 mr-2" />
                            )}
                            Choisir une image
                          </Button>
                          {form.homeAboutImageUrl?.trim() ? (
                            <Button
                              type="button"
                              variant="ghost"
                              className="font-opensans text-slate-600"
                              onClick={() => setForm((prev) => ({ ...prev, homeAboutImageUrl: '' }))}
                            >
                              Revenir à l’image par défaut
                            </Button>
                          ) : null}
                          <input
                            id="home-about-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onHomeAboutImageChange}
                          />
                        </div>
                      </div>
                    </Field>
                  </SettingsSubsection>

                  <SettingsSubsection
                    icon={BookOpen}
                    title="Page /apropos — Notre mission (texte + photo)"
                    description="Texte à gauche et grande photo à droite sur la page /apropos, sous le badge « Notre Mission », avant les encadrés « Croissance continue »."
                  >
                    <Field
                      id="aproposMissionHeading"
                      label="Grand titre de la mission"
                      hint="Phrase d’accroche très visible, juste sous le badge."
                    >
                      <Input
                        id="aproposMissionHeading"
                        value={form.aproposMissionHeading}
                        onChange={patchField('aproposMissionHeading')}
                        className={adminInput}
                        placeholder="Ex. Former les talents de demain"
                      />
                    </Field>
                    <Field
                      id="apropos-mission-body"
                      label="Paragraphes de la mission"
                      hint="Rédigez comme un seul texte : appuyez deux fois sur Entrée entre chaque paragraphe pour en créer un nouveau (jusqu’à quatre blocs distincts sur le site ; un cinquième paragraphe et plus seront regroupés avec le quatrième)."
                    >
                      <Textarea
                        id="apropos-mission-body"
                        rows={14}
                        value={joinAproposMissionBlocks(form)}
                        onChange={patchAproposMissionBody}
                        className={adminInput}
                        spellCheck
                      />
                    </Field>
                    <Field
                      id="apropos-mission-image"
                      label="Photo à droite (section Notre mission)"
                      hint="Laissez vide pour l’image fournie par défaut avec le site. Sinon, téléversez une image (paysage recommandé)."
                    >
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden w-full max-w-[280px] aspect-[4/3] shrink-0">
                          {form.aproposMissionImageUrl?.trim() ? (
                            <img
                              src={resolveMediaUrl(form.aproposMissionImageUrl)}
                              alt="Aperçu page À propos"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[120px] flex items-center justify-center text-xs text-slate-500 font-opensans px-3 text-center">
                              Image par défaut (non personnalisée)
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="font-opensans"
                            disabled={aproposMissionImageUploading}
                            onClick={() => document.getElementById('apropos-mission-image-upload')?.click()}
                          >
                            {aproposMissionImageUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <ImageIcon className="w-4 h-4 mr-2" />
                            )}
                            Choisir une image
                          </Button>
                          {form.aproposMissionImageUrl?.trim() ? (
                            <Button
                              type="button"
                              variant="ghost"
                              className="font-opensans text-slate-600"
                              onClick={() => setForm((prev) => ({ ...prev, aproposMissionImageUrl: '' }))}
                            >
                              Revenir à l’image par défaut
                            </Button>
                          ) : null}
                          <input
                            id="apropos-mission-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onAproposMissionImageChange}
                          />
                        </div>
                      </div>
                    </Field>
                  </SettingsSubsection>

                  <Collapsible open={aproposSeoOpen} onOpenChange={setAproposSeoOpen}>
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-opensans text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <Search className="h-4 w-4 shrink-0 text-primary" />
                            <span className="truncate">Référencement Google (optionnel)</span>
                          </span>
                          <ChevronDown
                            className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', aproposSeoOpen && 'rotate-180')}
                          />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-slate-100 px-4 py-4 space-y-2 bg-slate-50/60">
                          <Field
                            id="aproposSeoDescription"
                            label="Courte description pour les résultats de recherche"
                            hint="1 à 2 phrases ; utilisée dans la balise meta description quand quelqu’un cherche votre page sur Google."
                          >
                            <Textarea
                              id="aproposSeoDescription"
                              rows={4}
                              value={form.aproposSeoDescription}
                              onChange={patchField('aproposSeoDescription')}
                              className={adminInput}
                            />
                          </Field>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6 py-4">
            <p className="text-xs text-slate-500 font-opensans order-2 sm:order-1">
              Les changements de tous les onglets sont envoyés ensemble lors de l’enregistrement.
            </p>
            <Button type="submit" disabled={saving} className="font-opensans font-semibold min-w-[180px] order-1 sm:order-2 shrink-0">
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Enregistrer tout
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AdminSiteSettingsPage;
