import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { adminApi, type AdminModule } from '@/lib/api';
import { getAdminToken } from './adminSession';
import { ALL_MODULES, MODULE_LABELS } from './adminModules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  adminBackButton,
  adminFormCard,
  adminInput,
  adminLabel,
  adminPageTitle,
} from './adminUi';

const AdminUserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [permissions, setPermissions] = useState<Set<AdminModule>>(new Set());

  useEffect(() => {
    if (isNew || !id) return;
    const token = getAdminToken();
    if (!token) { toast.error('Session expirée'); setLoading(false); return; }
    adminApi
      .listUsers(token)
      .then((users) => {
        const u = users.find((x) => String(x.id) === id);
        if (!u) { toast.error('Utilisateur introuvable'); navigate('/admin/utilisateurs'); return; }
        setName(u.name);
        setEmail(u.email);
        setIsSuperAdmin(u.is_super_admin);
        setPermissions(new Set(u.permissions));
      })
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id, isNew, navigate]);

  const togglePermission = (module: AdminModule, checked: boolean) => {
    setPermissions((prev) => {
      const next = new Set(prev);
      if (checked) next.add(module);
      else next.delete(module);
      return next;
    });
  };

  const save = async () => {
    if (!name.trim() || !email.trim()) { toast.error('Le nom et l’e-mail sont obligatoires.'); return; }
    if (isNew && password.trim().length < 8) { toast.error('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (!isNew && password.trim() && password.trim().length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    const token = getAdminToken();
    if (!token) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      ...(password.trim() ? { password: password.trim() } : {}),
      is_super_admin: isSuperAdmin,
      permissions: Array.from(permissions),
    };

    setSaving(true);
    try {
      if (isNew) {
        await adminApi.saveUser(payload as Parameters<typeof adminApi.saveUser>[0], token);
        toast.success('Utilisateur créé');
      } else {
        await adminApi.saveUser(payload as Parameters<typeof adminApi.saveUser>[0], token, Number(id));
        toast.success('Utilisateur mis à jour');
      }
      navigate('/admin/utilisateurs');
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
        <Link to="/admin/utilisateurs">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <h1 className={adminPageTitle}>{isNew ? 'Nouvel utilisateur' : 'Modifier l’utilisateur'}</h1>

      <div className={`space-y-5 ${adminFormCard}`}>
        <div className="grid gap-2">
          <Label htmlFor="user-name" className={adminLabel}>
            Nom complet
          </Label>
          <Input id="user-name" value={name} onChange={(e) => setName(e.target.value)} className={adminInput} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="user-email" className={adminLabel}>
            E-mail
          </Label>
          <Input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={adminInput}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="user-password" className={adminLabel}>
            Mot de passe {isNew ? '' : '(laisser vide pour ne pas changer)'}
          </Label>
          <Input
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isNew ? 'Minimum 8 caractères' : '••••••••'}
            className={adminInput}
          />
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
          <Switch id="user-superadmin" checked={isSuperAdmin} onCheckedChange={setIsSuperAdmin} />
          <Label htmlFor="user-superadmin" className={`${adminLabel} flex items-center gap-1.5`}>
            <ShieldCheck className="w-4 h-4 text-primary" />
            Super-administrateur (accès total + gestion des utilisateurs)
          </Label>
        </div>

        {!isSuperAdmin && (
          <div className="grid gap-3">
            <Label className={adminLabel}>Modules accessibles</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {ALL_MODULES.map((module) => (
                <label
                  key={module}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 cursor-pointer hover:bg-slate-50"
                >
                  <Checkbox
                    checked={permissions.has(module)}
                    onCheckedChange={(checked) => togglePermission(module, checked === true)}
                  />
                  <span className="text-sm font-opensans text-slate-800">{MODULE_LABELS[module]}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button variant="outline" className="font-opensans font-semibold" onClick={() => navigate('/admin/utilisateurs')}>
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

export default AdminUserEditPage;
