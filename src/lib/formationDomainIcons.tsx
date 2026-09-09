import type { LucideIcon } from 'lucide-react';
import {
  Truck,
  Wrench,
  Monitor,
  Shield,
  Users,
  CarFront,
  Bus,
  HardHat,
  Laptop,
  HeartHandshake,
  Cpu,
  GraduationCap,
  Building2,
  Sparkles,
  BookOpen,
  ClipboardList,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type DomainIconKey = (typeof DOMAIN_ICON_ENTRIES)[number]['key'];

export const DOMAIN_ICON_ENTRIES: { key: string; label: string; Icon: LucideIcon }[] = [
  { key: 'truck', label: 'Transport & logistique', Icon: Truck },
  { key: 'car', label: 'Automobile / conduite', Icon: CarFront },
  { key: 'bus', label: 'Transport voyageurs', Icon: Bus },
  { key: 'wrench', label: 'Atelier & technique', Icon: Wrench },
  { key: 'hard-hat', label: 'Chantier & sécurité terrain', Icon: HardHat },
  { key: 'monitor', label: 'Informatique & bureautique', Icon: Monitor },
  { key: 'laptop', label: 'Numérique & bureautique', Icon: Laptop },
  { key: 'cpu', label: 'Systèmes & réseaux', Icon: Cpu },
  { key: 'shield', label: 'Prévention & SST', Icon: Shield },
  { key: 'users', label: 'Relation client & équipe', Icon: Users },
  { key: 'handshake', label: 'Accueil & partenariat', Icon: HeartHandshake },
  { key: 'graduation', label: 'Formation & pédagogie', Icon: GraduationCap },
  { key: 'book', label: 'Programmes & contenus', Icon: BookOpen },
  { key: 'clipboard', label: 'Organisation & suivi', Icon: ClipboardList },
  { key: 'building', label: 'Entreprise & métiers', Icon: Building2 },
  { key: 'sparkles', label: 'Polyvalence & qualité', Icon: Sparkles },
];

const DEFAULT_KEY = 'truck';

export function isDomainIconKey(key: string | undefined | null): key is DomainIconKey {
  return !!key && DOMAIN_ICON_ENTRIES.some((e) => e.key === key);
}

export function normalizeDomainIconKey(key: string | undefined | null): string {
  return isDomainIconKey(key) ? key : DEFAULT_KEY;
}

/** Icône Lucide pour la clé (taille adaptée aux onglets / cartes). */
export function domainIconNode(key: string | undefined | null, className = 'w-5 h-5'): ReactNode {
  const k = normalizeDomainIconKey(key);
  const entry = DOMAIN_ICON_ENTRIES.find((e) => e.key === k) ?? DOMAIN_ICON_ENTRIES[0];
  const Icon = entry.Icon;
  return <Icon className={className} />;
}
