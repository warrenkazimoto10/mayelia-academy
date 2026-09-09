/**
 * Visuel « hero » d’un domaine de formation : mêmes ressources que la page publique
 * (slugs connus → assets Vite) puis repli sur resolveMediaUrl (API / chemins).
 */
import tpImage from '@/assets/formation/tp.png';
import chauffeurImage from '@/assets/formation/chauffeur.png';
import informatiqueImage from '@/assets/formation/informatique.png';
import securiteImage from '@/assets/formation/securite.png';
import relationClientImage from '@/assets/formation/relation-client.png';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

const BY_SLUG: Record<string, string> = {
  'chauffeur-securite': chauffeurImage,
  'technicien-polyvalent': tpImage,
  'competences-informatiques': informatiqueImage,
  'prevention-securite': securiteImage,
  'relation-client': relationClientImage,
};

export function formationDomainHeroImage(slug: string, imageUrl: string | undefined | null): string {
  const trimmed = (imageUrl ?? '').trim();
  if (trimmed) {
    return resolveMediaUrl(trimmed);
  }
  const bundled = BY_SLUG[slug];
  if (bundled) return bundled;
  return '';
}
