import { ADMIN_MODULES, type AdminModule } from '@/lib/api';

export const MODULE_LABELS: Record<AdminModule, string> = {
  actualites: 'Actualités',
  conseils: 'Conseils',
  formations: 'Formations',
  'accueil-slider': 'Slider accueil',
  partenaires: 'Partenaires',
  faq: 'FAQ',
  certificats: 'Certificats',
  reglages: 'Réglages site',
  messages: 'Messages contact',
};

export const ALL_MODULES = ADMIN_MODULES;
