import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Loader2, Upload } from 'lucide-react';
import { partnersAPI, adminApi } from '@/lib/api';
import type { Partner } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminMuted,
  adminPageTitle,
} from './adminUi';

const AdminPartnerEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isNew) {
      partnersAPI
        .getAll()
        .then((list) => {
          const max = list.reduce((m, p) => Math.max(m, p.sortOrder ?? 0), 0);
          setSortOrder(max + 1);
        })
        .catch(() => {});
      return;
    }
    if (!id) return;
    partnersAPI
      .getById(id)
      .then((p: Partner) => {
        setName(p.name);
        setLogoUrl(p.logoUrl);
        setWebsiteUrl(p.websiteUrl ?? '');
        setSortOrder(p.sortOrder);
      })
      .catch(() => toast.error('Partenaire introuvable'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getAdminToken();
    if (!token) return;
    setUploading(true);
    try {
      const url = await adminApi.uploadImage(file, token);
      setLogoUrl(url);
      toast.success('Logo téléversé');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload échoué');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (form: React.FormEvent) => {
    form.preventDefault();
    const token = getAdminToken();
    if (!token) return;

    if (!logoUrl.trim()) {
      toast.error('Téléversez une image de logo');
      return;
    }

    const payload = {
      name,
      logoUrl: logoUrl.trim(),
      websiteUrl: websiteUrl.trim() || null,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    };

    try {
      if (isNew) {
        await adminApi.savePartner(payload, token);
        toast.success('Partenaire créé');
      } else {
        await adminApi.savePartner(payload, token, id);
        toast.success('Partenaire enregistré');
      }
      navigate('/admin/partenaires');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const previewSrc = resolveMediaUrl(logoUrl);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <Button variant="ghost" asChild className={adminBackButton}>
        <Link to="/admin/partenaires">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <div>
        <h1 className={adminPageTitle}>{isNew ? 'Nouveau partenaire' : 'Modifier le partenaire'}</h1>
        <p className={adminMuted}>
          Logo affiché dans « Ils nous font confiance ». Téléversez une image (PNG, JPG, WebP…) depuis votre ordinateur.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-5 ${adminFormCard}`}>
        <div className="space-y-2">
          <Label htmlFor="part-name" className={adminLabel}>
            Nom
          </Label>
          <Input
            id="part-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={adminInput}
            placeholder="Ex. Mayelia Automotive"
          />
        </div>

        <div className="space-y-2">
          <Label className={adminLabel}>Logo</Label>
          <div
            className={`rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 flex flex-col items-center justify-center gap-3 p-6 min-h-[160px] ${
              previewSrc ? 'border-primary/25 bg-white' : ''
            }`}
          >
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Aperçu du logo"
                className="max-h-24 w-auto max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <ImagePlus className="w-10 h-10 opacity-60" />
                <span className="font-opensans text-sm text-center">Aucun fichier — utilisez le bouton ci-dessous</span>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                type="button"
                variant={previewSrc ? 'outline' : 'default'}
                size="sm"
                disabled={uploading}
                className="border-slate-200"
                onClick={() => document.getElementById('partner-logo-upload')?.click()}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {previewSrc ? 'Remplacer le logo' : 'Téléverser une image'}
                  </>
                )}
              </Button>
              <input
                id="partner-logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 font-opensans">Fichiers recommandés : fond transparent (PNG) ou version lisible sur fond clair.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="part-web" className={adminLabel}>
            Site web (optionnel)
          </Label>
          <Input
            id="part-web"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className={adminInput}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="part-order" className={adminLabel}>
            Ordre d&apos;affichage
          </Label>
          <Input
            id="part-order"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
            className={`${adminInput} max-w-[8rem]`}
          />
          {isNew && (
            <p className="text-xs text-slate-500 font-opensans">
              Par défaut : dernière position de la liste (vous pouvez la modifier).
            </p>
          )}
        </div>

        <Button type="submit" className="w-full font-opensans font-semibold">
          {isNew ? 'Créer' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
};

export default AdminPartnerEditPage;
