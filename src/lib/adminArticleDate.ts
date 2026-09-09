/**
 * Dates article/conseil : le champ API `date` reste une chaîne lisible (ex. « 20 janv. 2026 »).
 * Le formulaire admin utilise en interne une valeur ISO `YYYY-MM-DD` pour `<input type="date">`.
 */

export function defaultIsoToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** ISO → texte stocké côté API (affichage site + persistance). */
export function isoDateToApiDisplay(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso?.trim() || '';
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
    .format(d)
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalise des libellés FR / EN courants en anglais court pour `Date.parse`. */
function normalizeForParse(value: string): string {
  let s = value.trim();
  const pairs: [RegExp, string][] = [
    [/janv\.?/gi, 'Jan'],
    [/févr\.?/gi, 'Feb'],
    [/avr\.?/gi, 'Apr'],
    [/sept\.?/gi, 'Sep'],
    [/oct\.?/gi, 'Oct'],
    [/nov\.?/gi, 'Nov'],
    [/déc\.?/gi, 'Dec'],
    [/mars/gi, 'Mar'],
    [/mai/gi, 'May'],
    [/juin/gi, 'Jun'],
    [/juil\.?/gi, 'Jul'],
    [/août/gi, 'Aug'],
  ];
  for (const [re, rep] of pairs) {
    s = s.replace(re, rep);
  }
  return s;
}

/** Chaîne API ou libre → ISO pour le date picker ; chaîne vide si non reconnu. */
export function apiDisplayToIsoDate(value: string): string {
  const v = value?.trim() ?? '';
  if (!v) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const t = Date.parse(normalizeForParse(v));
  if (Number.isNaN(t)) return '';
  const d = new Date(t);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
