import type { SiteConfigData } from '@/lib/api';

export const APROPOS_MISSION_BLOCK_KEYS = [
  'aproposMissionBlock1',
  'aproposMissionBlock2',
  'aproposMissionBlock3',
  'aproposMissionBlock4',
] as const;

export type AproposMissionBlockKey = (typeof APROPOS_MISSION_BLOCK_KEYS)[number];

/** Texte unique pour l’éditeur admin (paragraphes séparés par une ligne vide). */
export function joinAproposMissionBlocks(f: SiteConfigData): string {
  return APROPOS_MISSION_BLOCK_KEYS.map((k) => f[k]?.trim() ?? '')
    .filter(Boolean)
    .join('\n\n');
}

/** Découpe le texte en quatre champs API (le 4ᵉ regroupe les paragraphes excédentaires). */
export function splitAproposMissionBody(raw: string): Pick<SiteConfigData, AproposMissionBlockKey> {
  const parts = raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const b: [string, string, string, string] = ['', '', '', ''];
  b[0] = parts[0] ?? '';
  b[1] = parts[1] ?? '';
  b[2] = parts[2] ?? '';
  b[3] = parts.length > 4 ? parts.slice(3).join('\n\n') : (parts[3] ?? '');
  return {
    aproposMissionBlock1: b[0],
    aproposMissionBlock2: b[1],
    aproposMissionBlock3: b[2],
    aproposMissionBlock4: b[3],
  };
}
