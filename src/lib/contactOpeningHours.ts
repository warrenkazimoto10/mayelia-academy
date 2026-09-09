import type { SiteConfigData } from '@/lib/api';

/** Première ligne du bloc horaires (rappel sous le téléphone). */
export function openingHoursPrimaryLine(canonical: string): string {
  const t = canonical.trim();
  if (!t) return '';
  const i = t.indexOf('\n');
  return i === -1 ? t : t.slice(0, i).trim();
}

/** Lignes suivantes (précision sous la carte Horaires). */
export function openingHoursSecondaryLines(canonical: string): string {
  const t = canonical.trim();
  const i = t.indexOf('\n');
  return i === -1 ? '' : t.slice(i + 1).trim();
}

/**
 * Fusionne les anciens champs séparés en un seul texte pour l’éditeur admin.
 * Si `hoursWeekdays` contient déjà plusieurs lignes (nouveau format), on le garde tel quel.
 */
export function mergeLegacyOpeningHoursRow(f: SiteConfigData): string {
  const w = f.hoursWeekdays?.trim() ?? '';
  if (w.includes('\n')) return w;

  const sat = f.hoursSaturday?.trim() ?? '';
  const det = f.hoursWeekdaysDetail?.trim() ?? '';
  const base = w || det;
  const parts: string[] = [];
  if (base) parts.push(base);
  if (sat && sat !== base) parts.push(sat);
  return parts.join('\n');
}

/**
 * À partir du texte unique, remplit les 4 clés historiques (API / BDD inchangées).
 */
export function deriveLegacyHoursFieldsFromCanonical(canonical: string): Pick<
  SiteConfigData,
  'hoursWeekdays' | 'hoursWeekdaysDetail' | 'hoursSaturday' | 'hoursSaturdayDetail'
> {
  const t = canonical.trim();
  const first = openingHoursPrimaryLine(t);
  const rest = openingHoursSecondaryLines(t);
  return {
    hoursWeekdays: t,
    hoursWeekdaysDetail: first,
    hoursSaturday: rest,
    hoursSaturdayDetail: '',
  };
}

export function canonicalizeOpeningHoursInSiteConfig(f: SiteConfigData): SiteConfigData {
  const merged = mergeLegacyOpeningHoursRow(f);
  return { ...f, ...deriveLegacyHoursFieldsFromCanonical(merged) };
}
