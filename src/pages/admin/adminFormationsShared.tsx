import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormationDomainApi, FormationProgrammeApi, FormationsPayload } from '@/lib/api';
import { FORMATION_DOMAIN_THEMES, isFormationDomainThemeKnown } from '@/lib/formationDomainThemes';
import { adminInput, adminLabel } from './adminUi';

export function clonePayload(data: FormationsPayload): FormationDomainApi[] {
  return JSON.parse(JSON.stringify(data.domaines ?? []));
}

export function emptyDomain(): FormationDomainApi {
  const slug = `domaine-${Date.now()}`;
  const t = FORMATION_DOMAIN_THEMES[0];
  return {
    id: slug,
    title: 'Nouveau domaine',
    iconKey: 'truck',
    color: t.apiColor,
    gradient: t.apiGradient,
    image: '',
    formations: [],
  };
}

export function emptyProgramme(): FormationProgrammeApi {
  return {
    title: 'Nouvelle formation',
    description: 'À compléter : présentation courte du programme.',
    contenus: [],
    objectifs: [],
  };
}

export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const add = () => onChange([...items, '']);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const setAt = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <Label className={adminLabel}>{label}</Label>
      {hint ? <p className="text-xs text-slate-500 font-opensans">{hint}</p> : null}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 font-opensans italic">Aucune ligne — ajoutez des puces ou points.</p>
        ) : (
          items.map((line, i) => (
            <div key={i} className="flex gap-2 items-start">
              <Input
                value={line}
                onChange={(e) => setAt(i, e.target.value)}
                className={adminInput}
                placeholder={placeholder}
              />
              <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={() => remove(i)} aria-label="Supprimer la ligne">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))
        )}
      </div>
      <Button type="button" variant="secondary" size="sm" className="font-opensans" onClick={add}>
        <Plus className="w-4 h-4 mr-1" />
        Ajouter une ligne
      </Button>
    </div>
  );
}

/** Retourne un message d’erreur ou null si tout est valide. */
export function validateFormationsTree(domaines: FormationDomainApi[]): string | null {
  for (let di = 0; di < domaines.length; di++) {
    const d = domaines[di];
    if (!d.id?.trim()) {
      return `Domaine ${di + 1} : identifiant (slug) obligatoire.`;
    }
    if (!d.title?.trim()) {
      return `Domaine « ${d.id} » : titre obligatoire.`;
    }
    if (!d.image?.trim()) {
      return `Domaine « ${d.title} » : image de fond obligatoire (téléversement ou lien vers une image).`;
    }
    if (!isFormationDomainThemeKnown(d.color ?? '', d.gradient ?? '')) {
      return `Domaine « ${d.title} » : choisissez un thème de couleurs parmi les propositions (réglage actuel non reconnu).`;
    }
    for (let pi = 0; pi < d.formations.length; pi++) {
      const p = d.formations[pi];
      if (!p.title?.trim()) {
        return `Formation ${pi + 1} du domaine « ${d.title} » : titre obligatoire.`;
      }
      if (!p.description?.trim()) {
        return `« ${p.title || 'Formation'} » : description obligatoire.`;
      }
    }
  }
  return null;
}
