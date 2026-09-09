import { clearAdminToken } from '@/pages/admin/adminSession';

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Types pour les actualités
export interface ActualiteImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ActualiteParagraph {
  text: string;
  image?: ActualiteImage;
}

export interface Actualite {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  categoryColor: string;
  heroImage: string;
  /** false = brouillon (non listé sur le site public). */
  published?: boolean;
  content: {
    paragraphs: ActualiteParagraph[];
  };
}

// Types pour les conseils
export interface ConseilParagraph {
  text: string;
  image?: ActualiteImage;
}

export interface Conseil {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  published?: boolean;
  content?: {
    paragraphs: ConseilParagraph[];
  };
}

// Types FAQ
export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
}

// Types Certificats
export interface CertParticipant {
  id: number;
  civility: string;
  full_name: string;
  certificates_count?: number;
}

export interface CertTraining {
  id: number;
  title: string;
  client: string | null;
  start_date: string;
  end_date: string;
  issue_place: string;
  issue_date: string;
  certificates_count?: number;
}

export interface CertTrainingDetail extends CertTraining {
  certificates: {
    id: number;
    ref: string | null;
    validated: boolean;
    note: string | null;
    participant: { id: number; civility: string; full_name: string };
  }[];
}

// Comptes du backoffice
export const ADMIN_MODULES = [
  'actualites', 'conseils', 'formations', 'accueil-slider',
  'partenaires', 'faq', 'certificats', 'reglages', 'messages',
] as const;
export type AdminModule = typeof ADMIN_MODULES[number];

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  is_super_admin: boolean;
  permissions: AdminModule[];
  created_at?: string;
}

export interface Certificate {
  id: number;
  ref: string | null;
  validated: boolean;
  note: string | null;
  created_at: string;
  participant: { id: number; civility: string; full_name: string } | null;
  training: {
    id: number;
    title: string;
    client: string | null;
    start_date: string;
    end_date: string;
    issue_place: string;
    issue_date: string;
    period_text: string;
  } | null;
}

// Réponse API générique
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

// Fonction utilitaire pour les requêtes
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(error.error || error.message || 'Erreur API');
  }

  const data: ApiResponse<T> = await response.json();
  return data.data;
}

// API des actualités
export const actualitesAPI = {
  // Récupérer toutes les actualités
  getAll: async (): Promise<Actualite[]> => {
    return fetchAPI<Actualite[]>('/actualites');
  },

  // Récupérer une actualité par ID
  getById: async (id: string | number): Promise<Actualite> => {
    return fetchAPI<Actualite>(`/actualites/${id}`);
  },

  // Créer une actualité
  create: async (actualite: Omit<Actualite, 'id'>): Promise<Actualite> => {
    return fetchAPI<Actualite>('/actualites', {
      method: 'POST',
      body: JSON.stringify(actualite),
    });
  },

  // Mettre à jour une actualité
  update: async (id: string | number, actualite: Partial<Actualite>): Promise<Actualite> => {
    return fetchAPI<Actualite>(`/actualites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(actualite),
    });
  },

  // Supprimer une actualité
  delete: async (id: string | number): Promise<void> => {
    await fetchAPI(`/actualites/${id}`, {
      method: 'DELETE',
    });
  },
};

// API des conseils
export const conseilsAPI = {
  // Récupérer tous les conseils
  getAll: async (): Promise<Conseil[]> => {
    return fetchAPI<Conseil[]>('/conseils');
  },

  // Récupérer un conseil par ID
  getById: async (id: string | number): Promise<Conseil> => {
    return fetchAPI<Conseil>(`/conseils/${id}`);
  },

  // Créer un conseil
  create: async (conseil: Omit<Conseil, 'id'>): Promise<Conseil> => {
    return fetchAPI<Conseil>('/conseils', {
      method: 'POST',
      body: JSON.stringify(conseil),
    });
  },

  // Mettre à jour un conseil
  update: async (id: string | number, conseil: Partial<Conseil>): Promise<Conseil> => {
    return fetchAPI<Conseil>(`/conseils/${id}`, {
      method: 'PUT',
      body: JSON.stringify(conseil),
    });
  },

  // Supprimer un conseil
  delete: async (id: string | number): Promise<void> => {
    await fetchAPI(`/conseils/${id}`, {
      method: 'DELETE',
    });
  },
};

// Formations (domaines + programmes) — même structure que l’admin PUT
export interface FormationProgrammeApi {
  id?: number;
  title: string;
  description: string;
  contenus: string[];
  objectifs: string[];
}

export interface FormationDomainApi {
  id: string;
  iconKey: string;
  title: string;
  color: string;
  gradient: string;
  image: string;
  formations: FormationProgrammeApi[];
}

export interface FormationsPayload {
  domaines: FormationDomainApi[];
}

export const formationsAPI = {
  getAll: async (): Promise<FormationsPayload> => {
    return fetchAPI<FormationsPayload>('/formations');
  },
};

export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string | null;
  sortOrder: number;
}

export const partnersAPI = {
  getAll: async (): Promise<Partner[]> => {
    return fetchAPI<Partner[]>('/partners');
  },
  getById: async (id: string | number): Promise<Partner> => {
    return fetchAPI<Partner>(`/partners/${id}`);
  },
};

/** Diapositive du carrousel d’accueil (hero). */
export interface HeroSlide {
  id: number;
  sortOrder: number;
  imageUrl: string;
  /** Opacité (0-100) du masque bleu dégradé posé sur l'image (défaut 90). */
  overlayOpacity: number;
  description: string;
  linkUrl: string | null;
}

export const heroSlidesAPI = {
  getAll: async (): Promise<HeroSlide[]> => {
    return fetchAPI<HeroSlide[]>('/hero-slides');
  },
};

export interface ContactMessageRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  readAt: string | null;
  createdAt: string;
}

/** Formulaire public — enregistre le message et envoie un e-mail à l’adresse des réglages site. */
export async function submitContactMessage(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ id: number }> {
  const response = await fetch(`${API_BASE_URL}/contact-messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (json.errors && typeof json.errors === 'object') {
      const first = Object.values(json.errors as Record<string, string[]>)[0];
      throw new Error(Array.isArray(first) ? first[0] : 'Données invalides');
    }
    throw new Error(
      (typeof json.message === 'string' && json.message) ||
        (typeof json.error === 'string' && json.error) ||
        'Envoi impossible'
    );
  }
  return json.data as { id: number };
}

/** Appels authentifiés (Bearer — jeton Sanctum après login) */
export async function adminFetch<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken();
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    throw new Error(json.error || json.message || 'Erreur API');
  }

  if (json.data !== undefined) {
    return json.data as T;
  }
  return json as unknown as T;
}

/** Télécharge un fichier protégé par Bearer token (PDF/ZIP) et déclenche le téléchargement côté client. */
async function adminDownload(endpoint: string, token: string, filename: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken();
      window.location.href = '/admin/login';
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    const json = await response.json().catch(() => ({}));
    throw new Error(json.error || json.message || 'Téléchargement échoué');
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const adminApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: AdminUser }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || 'Connexion refusée');
    }
    return json.data as { token: string; user: AdminUser };
  },

  ping: (token: string) => adminFetch<{ adminConfigured: boolean; user: AdminUser | null }>('/auth/ping', token),

  listUsers: (token: string) => adminFetch<AdminUser[]>('/admin/users', token),

  saveUser: (
    payload: { name: string; email: string; password?: string; is_super_admin: boolean; permissions: AdminModule[] },
    token: string,
    id?: number
  ) => {
    if (id != null) {
      return adminFetch<AdminUser>(`/admin/users/${id}`, token, { method: 'PUT', body: JSON.stringify(payload) });
    }
    return adminFetch<AdminUser>('/admin/users', token, { method: 'POST', body: JSON.stringify(payload) });
  },

  deleteUser: (id: number, token: string) =>
    adminFetch<void>(`/admin/users/${id}`, token, { method: 'DELETE' }),

  deleteActualite: (id: string | number, token: string) =>
    adminFetch<void>(`/actualites/${id}`, token, { method: 'DELETE' }),

  /** Liste complète (brouillons inclus) — réservé admin. */
  listActualitesAdmin: (token: string) => adminFetch<Actualite[]>('/admin/actualites', token),

  /** Détail y compris brouillon — réservé admin. */
  getActualiteAdmin: (id: string | number, token: string) =>
    adminFetch<Actualite>(`/admin/actualites/${id}`, token),

  saveActualite: (
    payload: Partial<Actualite> & { content?: Actualite['content']; published?: boolean },
    token: string,
    id?: string | number
  ) => {
    if (id != null) {
      return adminFetch<Actualite>(`/actualites/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    return adminFetch<Actualite>('/actualites', token, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  deleteConseil: (id: string | number, token: string) =>
    adminFetch<void>(`/conseils/${id}`, token, { method: 'DELETE' }),

  listConseilsAdmin: (token: string) => adminFetch<Conseil[]>('/admin/conseils', token),

  getConseilAdmin: (id: string | number, token: string) =>
    adminFetch<Conseil>(`/admin/conseils/${id}`, token),

  saveConseil: (payload: Partial<Conseil> & { published?: boolean }, token: string, id?: string | number) => {
    if (id != null) {
      return adminFetch<Conseil>(`/conseils/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    return adminFetch<Conseil>('/conseils', token, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  saveFormationsTree: (payload: FormationsPayload, token: string) =>
    adminFetch<FormationsPayload>('/formations', token, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  savePartner: (payload: Partial<Partner> & { name: string; logoUrl: string }, token: string, id?: string | number) => {
    if (id != null) {
      return adminFetch<Partner>(`/partners/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    return adminFetch<Partner>('/partners', token, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  deletePartner: (id: string | number, token: string) =>
    adminFetch<void>(`/partners/${id}`, token, { method: 'DELETE' }),

  saveHeroSlides: (slides: { imageUrl: string; overlayOpacity: number; description: string; linkUrl: string | null }[], token: string) =>
    adminFetch<HeroSlide[]>('/admin/hero-slides', token, {
      method: 'PUT',
      body: JSON.stringify({ slides }),
    }),

  saveSiteConfig: (payload: Partial<SiteConfigData>, token: string) =>
    adminFetch<SiteConfigData>('/site-config', token, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  listContactMessages: (token: string) =>
    adminFetch<ContactMessageRow[]>('/contact-messages', token),

  setContactMessageRead: (id: number, read: boolean, token: string) =>
    adminFetch<ContactMessageRow>(`/contact-messages/${id}`, token, {
      method: 'PATCH',
      body: JSON.stringify({ read }),
    }),

  deleteContactMessage: (id: number, token: string) =>
    adminFetch<void>(`/contact-messages/${id}`, token, { method: 'DELETE' }),

  listFaqsAdmin: (token: string) => adminFetch<Faq[]>('/admin/faqs', token),

  saveFaq: (payload: Omit<Faq, 'id'>, token: string, id?: number) => {
    if (id != null) {
      return adminFetch<Faq>(`/faqs/${id}`, token, { method: 'PUT', body: JSON.stringify(payload) });
    }
    return adminFetch<Faq>('/faqs', token, { method: 'POST', body: JSON.stringify(payload) });
  },

  deleteFaq: (id: number, token: string) =>
    adminFetch<void>(`/faqs/${id}`, token, { method: 'DELETE' }),

  reorderFaqs: (items: { id: number; sort_order: number }[], token: string) =>
    adminFetch<void>('/faqs/reorder', token, { method: 'POST', body: JSON.stringify({ items }) }),

  // --- Certificats : participants ---
  listCertParticipants: (token: string, q?: string) =>
    adminFetch<CertParticipant[]>(`/cert-participants${q ? `?q=${encodeURIComponent(q)}` : ''}`, token),

  saveCertParticipant: (payload: { civility: string; full_name: string }, token: string, id?: number) => {
    if (id != null) {
      return adminFetch<CertParticipant>(`/cert-participants/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    return adminFetch<CertParticipant>('/cert-participants', token, { method: 'POST', body: JSON.stringify(payload) });
  },

  deleteCertParticipant: (id: number, token: string) =>
    adminFetch<void>(`/cert-participants/${id}`, token, { method: 'DELETE' }),

  // --- Certificats : formations ---
  listCertTrainings: (token: string) => adminFetch<CertTraining[]>('/cert-trainings', token),

  getCertTraining: (id: number | string, token: string) =>
    adminFetch<CertTrainingDetail>(`/cert-trainings/${id}`, token),

  saveCertTraining: (
    payload: { title: string; client: string | null; start_date: string; end_date: string; issue_place: string; issue_date: string },
    token: string,
    id?: number | string
  ) => {
    if (id != null) {
      return adminFetch<CertTraining>(`/cert-trainings/${id}`, token, { method: 'PUT', body: JSON.stringify(payload) });
    }
    return adminFetch<CertTraining>('/cert-trainings', token, { method: 'POST', body: JSON.stringify(payload) });
  },

  deleteCertTraining: (id: number | string, token: string) =>
    adminFetch<void>(`/cert-trainings/${id}`, token, { method: 'DELETE' }),

  // --- Certificats : génération ---
  listCertificates: (token: string, filters?: { training_id?: number | string; participant_id?: number | string }) => {
    const params = new URLSearchParams();
    if (filters?.training_id != null) params.set('training_id', String(filters.training_id));
    if (filters?.participant_id != null) params.set('participant_id', String(filters.participant_id));
    const qs = params.toString();
    return adminFetch<Certificate[]>(`/certificates${qs ? `?${qs}` : ''}`, token);
  },

  createCertificate: (cert_participant_id: number, cert_training_id: number, token: string) =>
    adminFetch<Certificate>('/certificates', token, {
      method: 'POST',
      body: JSON.stringify({ cert_participant_id, cert_training_id }),
    }),

  bulkCreateCertificates: (cert_training_id: number, participant_ids: number[], token: string) =>
    adminFetch<{ participant_id: number; certificate?: Certificate; error?: string }[]>('/certificates/bulk', token, {
      method: 'POST',
      body: JSON.stringify({ cert_training_id, participant_ids }),
    }),

  deleteCertificate: (id: number, token: string) =>
    adminFetch<void>(`/certificates/${id}`, token, { method: 'DELETE' }),

  setCertificateValidated: (id: number, payload: { validated: boolean; note: string | null }, token: string) =>
    adminFetch<Certificate>(`/certificates/${id}/validate`, token, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  downloadCertificatePdf: (id: number, ref: string, token: string) =>
    adminDownload(`/certificates/${id}/pdf`, token, `certificat-${ref}.pdf`),

  downloadAttestationPdf: (id: number, name: string, token: string) =>
    adminDownload(`/certificates/${id}/attestation`, token, `attestation-${name}.pdf`),

  downloadTrainingCertificatesZip: (trainingId: number | string, trainingTitle: string, token: string) =>
    adminDownload(
      `/cert-trainings/${trainingId}/certificates/zip`,
      token,
      `certificats_${trainingTitle.replace(/[^A-Za-z0-9_-]+/g, '_')}.zip`
    ),

  getSignature: async (token: string): Promise<string | null> => {
    const res = await fetch(`${API_BASE_URL}/admin/signature`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    const json = await res.json().catch(() => ({}));
    return json.data?.url ?? null;
  },

  uploadSignature: async (file: File, token: string): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE_URL}/admin/signature`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      body: form,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || json.message || "Upload signature echoue");
    return json.data?.url as string;
  },

  /** Upload image (multipart) — retourne l’URL absolue du fichier. */
  uploadImage: async (file: File, token: string): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: form,
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(json.error || json.message || 'Upload échoué');
    }
    if (json.data?.url) {
      return json.data.url as string;
    }
    throw new Error('Réponse upload invalide');
  },
};

/** Réglages globaux du site (CMS) — alignés sur App\Models\SiteConfig::defaultData */
export interface SiteConfigData {
  siteName: string;
  siteUrl: string;
  /** Logo en-tête + pied de page ; vide = logo fourni avec le thème */
  siteLogoUrl: string;
  metaDefaultDescription: string;
  footerTagline: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  email: string;
  whatsapp: string;
  hoursWeekdays: string;
  hoursWeekdaysDetail: string;
  hoursSaturday: string;
  hoursSaturdayDetail: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  addressVisitNote: string;
  emailResponseNote: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  newsletterPlaceholder: string;
  newsletterIntro: string;
  /** Bloc « Qui sommes-nous » sur l’accueil (#apropos), pas la page /apropos */
  homeAboutTitlePrefix: string;
  homeAboutTitleAccent: string;
  homeAboutIntro: string;
  homeAboutExpertiseHeading: string;
  homeAboutExpertiseIntro: string;
  /** Un item par ligne */
  homeAboutExpertiseBullets: string;
  homeAboutExpertiseOutro: string;
  homeAboutPedagogyHeading: string;
  homeAboutPedagogyText: string;
  homeAboutClosingText: string;
  homeAboutImageUrl: string;
  aproposSeoDescription: string;
  aproposMissionHeading: string;
  aproposMissionBlock1: string;
  aproposMissionBlock2: string;
  aproposMissionBlock3: string;
  aproposMissionBlock4: string;
  /** Photo à droite de la section « Notre mission » sur /apropos ; vide = image par défaut du thème */
  aproposMissionImageUrl: string;
  contactPageMetaDescription: string;
}

export const defaultSiteConfig = (): SiteConfigData => ({
  siteName: 'Mayelia Academy',
  siteUrl: 'https://academy.mayeliamobilite.com',
  siteLogoUrl: '',
  metaDefaultDescription:
    'Mayelia Academy — formation professionnelle et insertion en Côte d\'Ivoire.',
  footerTagline:
    'Hub d\'apprentissage moderne dédié à l\'insertion professionnelle et au développement des compétences en Côte d\'Ivoire.',
  addressLine1: 'Marcory Zone 4, Rue Abli Mathieu 716 Abidjan,',
  addressLine2: 'Côte d\'Ivoire',
  phone: '07 87 63 88 15',
  email: 'infos.academy@mayelia.com',
  whatsapp: '',
  hoursWeekdays: 'Lun-Ven 8h-18h\nSam: 9h-13h',
  hoursWeekdaysDetail: 'Lun-Ven 8h-18h',
  hoursSaturday: 'Sam: 9h-13h',
  hoursSaturdayDetail: '',
  contactSectionTitle: 'Besoin d\'informations ?',
  contactSectionSubtitle:
    'Notre équipe est à votre écoute pour répondre à toutes vos questions',
  addressVisitNote: 'Rendez-vous sur place',
  emailResponseNote: 'Réponse sous 24h',
  facebookUrl: 'https://facebook.com',
  linkedinUrl: 'https://linkedin.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: '',
  youtubeUrl: '',
  newsletterPlaceholder: 'Votre email',
  newsletterIntro:
    'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités.',
  homeAboutTitlePrefix: 'QUI',
  homeAboutTitleAccent: 'SOMMES-NOUS ?',
  homeAboutIntro:
    "Fondée en 2023 et basée à Abidjan, MAYELIA Academy est un centre de formation dynamique et innovant, membre du Groupe Mayelia Participations. Nous accompagnons exclusivement les professionnels, les entreprises et les actifs en reconversion dans le perfectionnement, le renforcement des capacités et la montée en puissance de leurs équipes.",
  homeAboutExpertiseHeading: 'Une expertise reconnue et agréée',
  homeAboutExpertiseIntro:
    "Pour répondre aux enjeux stratégiques du marché et garantir la qualité de nos programmes, MAYELIA Academy est fièrement agréée par le FDFP (Fonds de Développement de la Formation Professionnelle) dans les secteurs suivants :",
  homeAboutExpertiseBullets:
    "Spécialités plurivalentes de l'informatique\nTransports routiers (formation des chauffeurs de véhicules poids lourds et légers)\nPluri-technologies mécaniques (mécanique générale, chaudronnerie, tôlerie, soudure, structures métalliques etc…)",
  homeAboutExpertiseOutro:
    "À ces domaines d'excellence s'ajoutent nos programmes dédiés au Service Client et à la Santé et Sécurité au Travail (SST).",
  homeAboutPedagogyHeading: 'Une pédagogie orientée performance',
  homeAboutPedagogyText:
    "Nos formations sur mesure sont co-construites en partenariat avec des entreprises leaders pour garantir une adéquation parfaite avec les réalités du terrain. Animés par des experts certifiés, nos parcours sont conçus pour s'adapter aux évolutions rapides du marché de l'emploi.",
  homeAboutClosingText:
    "Plus qu'un simple centre de formation, MAYELIA Academy est un véritable levier de croissance. Notre mission : transformer l'éducation professionnelle en Côte d'Ivoire pour bâtir un avenir économique plus performant et durable.",
  homeAboutImageUrl: '',
  aproposSeoDescription:
    'Mayelia Academy est un centre de formation d\'excellence à Abidjan. Notre mission : former les talents de demain et favoriser l\'insertion professionnelle.',
  aproposMissionHeading: 'Former les talents de demain',
  aproposMissionBlock1:
    'MAYELIA Academy est un hub de formation créé en 2023. Le centre est dédié à la formation, l\'apprentissage, au perfectionnement et au renforcement des capacités des étudiants et des professionnels dans les métiers de l\'automobile, l\'informatique, du service client et de la santé et sécurité au travail.',
  aproposMissionBlock2:
    'C\'est un centre de formation dynamique et innovant, offrant des formations sur mesure, adaptées aux évolutions du marché de l\'emploi. Nos programmes sont conçus et dispensés par des experts certifiés, reconnus pour leur engagement dans le développement des compétences et l\'insertion professionnelle.',
  aproposMissionBlock3:
    'Basée à Abidjan, Côte d\'Ivoire, Mayelia Academy fait partie du Groupe Mayelia Participations et s\'engage à transformer l\'éducation professionnelle pour construire un avenir meilleur.',
  aproposMissionBlock4:
    'Nous constituons un hub d\'apprentissage moderne, dédié à l\'insertion professionnelle, au développement des compétences et à la reconversion des actifs. Chaque programme est conçu en partenariat avec des entreprises leaders, animé par des experts certifiés et orienté vers l\'emploi et la performance.',
  aproposMissionImageUrl: '',
  contactPageMetaDescription:
    'Besoin d\'informations ? Contactez l\'équipe de Mayelia Academy dès aujourd\'hui. Nous sommes à votre écoute pour répondre à toutes vos questions.',
});

export const faqsAPI = {
  getAll: async (): Promise<Faq[]> => fetchAPI<Faq[]>('/faqs'),
};

export const certificatesAPI = {
  verify: async (ref: string): Promise<Certificate> =>
    fetchAPI<Certificate>(`/certificates/verify/${encodeURIComponent(ref)}`),
  verifyPdfUrl: (ref: string): string => `${API_BASE_URL}/certificates/verify/${encodeURIComponent(ref)}/pdf`,
};

export const siteConfigAPI = {
  getPublic: async (): Promise<SiteConfigData> => {
    const data = await fetchAPI<SiteConfigData>('/site-config');
    return { ...defaultSiteConfig(), ...data };
  },
};

// Health check (réponse plate, pas de wrapper { data })
export const healthCheck = async (): Promise<{ status: string; message: string; timestamp?: string }> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error('Health check failed');
  }
  return response.json();
};
