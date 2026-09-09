/**
 * Thèmes de couleur pour les domaines de formation — libellés simples côté admin,
 * classes Tailwind figées ici pour que le build les inclue (pas de saisie libre).
 */
export interface FormationDomainTheme {
  id: string;
  label: string;
  /** Onglet domaine sélectionné (fond dégradé) */
  tabSelected: string;
  /** Fine barre en haut des cartes programme */
  cardBar: string;
  /** Pastille derrière l’icône livre sur les cartes */
  cardIconBg: string;
  /** Valeurs persistées en API (inchangées pour compatibilité JSON) */
  apiColor: string;
  apiGradient: string;
}

export const FORMATION_DOMAIN_THEMES: FormationDomainTheme[] = [
  {
    id: 'orange_rouge',
    label: 'Orange & rouge',
    tabSelected: 'bg-gradient-to-r from-orange-500 to-red-500',
    cardBar: 'bg-gradient-to-r from-orange-500 to-red-500',
    cardIconBg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    apiColor: 'from-orange-500 to-red-500',
    apiGradient: 'from-orange-500/10 to-red-500/10',
  },
  {
    id: 'bleu_cyan',
    label: 'Bleu & cyan',
    tabSelected: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    cardBar: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    cardIconBg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    apiColor: 'from-blue-500 to-cyan-500',
    apiGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'violet_rose',
    label: 'Violet & rose',
    tabSelected: 'bg-gradient-to-r from-purple-500 to-pink-500',
    cardBar: 'bg-gradient-to-r from-purple-500 to-pink-500',
    cardIconBg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    apiColor: 'from-purple-500 to-pink-500',
    apiGradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: 'vert_emeraude',
    label: 'Vert & émeraude',
    tabSelected: 'bg-gradient-to-r from-green-500 to-emerald-500',
    cardBar: 'bg-gradient-to-r from-green-500 to-emerald-500',
    cardIconBg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    apiColor: 'from-green-500 to-emerald-500',
    apiGradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    id: 'rose_corail',
    label: 'Rose & corail',
    tabSelected: 'bg-gradient-to-r from-pink-500 to-rose-500',
    cardBar: 'bg-gradient-to-r from-pink-500 to-rose-500',
    cardIconBg: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    apiColor: 'from-pink-500 to-rose-500',
    apiGradient: 'from-pink-500/10 to-rose-500/10',
  },
  {
    id: 'ambre_indigo',
    label: 'Ambre & indigo',
    tabSelected: 'bg-gradient-to-r from-amber-500 to-indigo-600',
    cardBar: 'bg-gradient-to-r from-amber-500 to-indigo-600',
    cardIconBg: 'bg-gradient-to-br from-amber-500/10 to-indigo-600/10',
    apiColor: 'from-amber-500 to-indigo-600',
    apiGradient: 'from-amber-500/10 to-indigo-600/10',
  },
];

const FALLBACK = FORMATION_DOMAIN_THEMES[0];

export function findFormationDomainTheme(
  apiColor: string | undefined,
  apiGradient: string | undefined
): FormationDomainTheme | null {
  const c = (apiColor ?? '').trim();
  const g = (apiGradient ?? '').trim();
  return FORMATION_DOMAIN_THEMES.find((t) => t.apiColor === c && t.apiGradient === g) ?? null;
}

/** Thème connu ou repli visuel (orange) si anciennes données ne correspondent plus. */
export function resolveFormationDomainTheme(
  apiColor: string | undefined,
  apiGradient: string | undefined
): FormationDomainTheme {
  return findFormationDomainTheme(apiColor, apiGradient) ?? FALLBACK;
}

export function isFormationDomainThemeKnown(apiColor: string, apiGradient: string): boolean {
  return findFormationDomainTheme(apiColor, apiGradient) != null;
}
