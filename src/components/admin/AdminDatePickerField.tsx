import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminInput, adminLabel } from '@/pages/admin/adminUi';
import { isoDateToApiDisplay } from '@/lib/adminArticleDate';

interface AdminDatePickerFieldProps {
  id: string;
  label: string;
  isoValue: string;
  onIsoChange: (iso: string) => void;
  required?: boolean;
}

/** Sélecteur de date natif ; la valeur persistée côté API est un libellé français. */
export function AdminDatePickerField({ id, label, isoValue, onIsoChange, required }: AdminDatePickerFieldProps) {
  const preview = isoValue && /^\d{4}-\d{2}-\d{2}$/.test(isoValue) ? isoDateToApiDisplay(isoValue) : '';

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className={adminLabel}>
        {label}
      </Label>
      <Input
        id={id}
        type="date"
        value={isoValue}
        onChange={(e) => onIsoChange(e.target.value)}
        required={required}
        className={adminInput}
      />
      {preview ? (
        <p className="text-xs text-slate-500 font-opensans">
          Affichage sur le site : <span className="text-slate-700 font-medium">{preview}</span>
        </p>
      ) : null}
    </div>
  );
}
