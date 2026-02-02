import { type LucideIcon, Wrench, CarFront, Code, Users, ShieldCheck } from 'lucide-react';

import automobileImg from '@/assets/formation-automobile.jpg';
import informatiqueImg from '@/assets/formation-informatique.png';
import serviceClientImg from '@/assets/formation-service-client.png';
import santeImg from '@/assets/formation-sante.png';

export interface FormationModule {
  title: string;
  description: string;
  highlights: string[];
}

export interface DomainFormation {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  details: {
    duration: string;
    level: string;
    certification: string;
  };
  modules: FormationModule[];
  homeSpan?: string;
}

const technicianModules: FormationModule[] = [
  {
    title: 'Maintenance de véhicules',
    description:
      'Assurez la maintenance préventive et corrective des véhicules légers et poids lourds.',
    highlights: [
      'Comprendre les systèmes mécaniques, électriques et électroniques',
      'Identifier et résoudre les pannes courantes',
      'Appliquer les procédures de contrôle technique et de conformité',
    ],
  },
  {
    title: 'Soudure TIG MIG',
    description:
      'Maîtrisez les procédés de soudure TIG et MIG pour intervenir sur différents matériaux.',
    highlights: [
      'Préparer les pièces et réglages en sécurité',
      'Adapter la soudure aux matériaux (acier, aluminium, inox)',
      'Garantir la qualité des soudures selon les normes de production',
    ],
  },
  {
    title: 'Maintenance hydraulique',
    description:
      'Diagnostiquez et réparez les systèmes hydrauliques pour assurer leur fiabilité.',
    highlights: [
      'Analyser les composants et circuits hydrauliques',
      'Mettre en œuvre les méthodes de diagnostic adaptées',
      'Appliquer les bonnes pratiques de sécurité sur site',
    ],
  },
  {
    title: 'Formation en organe moteur',
    description:
      'Développez une compréhension approfondie des moteurs thermiques et électriques.',
    highlights: [
      'Identifier les composants et leur rôle dans le moteur',
      'Diagnostiquer les dysfonctionnements des organes moteurs',
      'Mettre en œuvre la maintenance préventive pour prolonger la durée de vie',
    ],
  },
  {
    title: 'Préparateur technique & maintenance des véhicules',
    description:
      'Réalisez les contrôles techniques et les opérations de maintenance avant restitution.',
    highlights: [
      'Diagnostiquer les systèmes freinage, éclairage, châssis…',
      'Réaliser la maintenance préventive selon les réglementations',
      'Garantir la conformité des véhicules avant mise en circulation',
    ],
  },
  {
    title: 'Habilitation électrique B1V • B0 • B2V • BR • BS • H0',
    description:
      'Intervenez en toute sécurité sur les installations et équipements électriques.',
    highlights: [
      'Respecter les normes et procédures d’habilitation électrique',
      'Identifier les risques et appliquer les mesures de prévention',
      'Assurer des interventions, dépannages et consignations sécurisées',
    ],
  },
];

const driverModules: FormationModule[] = [
  {
    title: 'Conduite défensive',
    description:
      'Adoptez une conduite préventive pour limiter les risques d’accident et améliorer la sécurité.',
    highlights: [
      'Anticiper les comportements imprévisibles sur la route',
      'Maîtriser les distances de sécurité et la conduite en conditions difficiles',
      'Réagir efficacement lors de situations d’urgence',
    ],
  },
  {
    title: 'Simulateur de conduite',
    description:
      'Formation immersive sur simulateur de dernière génération certifié CODES ROUSSEAU (leader européen de la sécurité routière) pour véhicules légers et poids lourds. Une innovation pédagogique offrant un apprentissage réaliste et sécurisé.',
    highlights: [
      'Formation immersive et réaliste adaptée aux débutants comme aux conducteurs expérimentés',
      'Apprentissage de la conduite défensive dans divers environnements : circulation urbaine, conditions météorologiques difficiles, freinages d\'urgence, situations à risques, obstacles imprévus',
      'Réduction significative des risques liés à l\'apprentissage en conditions réelles',
      'Évaluation objective, personnalisée et suivi précis des performances de chaque apprenant',
      'Renforcement de l\'engagement de Mayelia Academy pour une formation moderne, sécurisée et orientée vers l\'excellence',
    ],
  },
  {
    title: 'Renforcement de capacités & recyclage chauffeurs',
    description:
      'Mettez à jour vos compétences et restez informé des nouvelles réglementations et technologies.',
    highlights: [
      'Réviser les règles de sécurité routière et de conduite défensive',
      'Optimiser la consommation de carburant et la maintenance des véhicules',
      'Gérer les situations d’urgence et prévenir les risques routiers',
    ],
  },
  {
    title: 'Conduite d’engin',
    description:
      'Maîtrisez les engins de chantier et appliquez les règles de sécurité spécifiques sur site.',
    highlights: [
      'Identifier les spécificités des différents engins de chantier',
      'Pratiquer les manœuvres de précision et la conduite sécurisée',
      'Optimiser l’utilisation des engins pour un meilleur rendement',
    ],
  },
  {
    title: 'Habilitation à la conduite de grue',
    description:
      'Pilotez des grues en toute sécurité en respectant les normes et procédures en vigueur.',
    highlights: [
      'Assimiler les règles de sécurité liées à la conduite de grue',
      'Prévenir les risques lors de la manipulation de charges lourdes',
      'Obtenir l’habilitation nécessaire pour intervenir sur chantier ou en industrie',
    ],
  },
  {
    title: 'Sécurité routière',
    description:
      'Sensibilisez vos équipes aux bonnes pratiques pour réduire les accidents et comportements à risque.',
    highlights: [
      'Analyser les causes d’accidents et prévenir les risques',
      'Appliquer les nouvelles réglementations et règles de circulation',
      'Réagir face aux situations critiques et aux comportements dangereux',
    ],
  },
  {
    title: 'Formation VTC',
    description:
      'Répondez aux standards de service, de sécurité et de réglementation du transport privé.',
    highlights: [
      'Développer une conduite professionnelle et sécurisée',
      'Améliorer la relation client et l’expérience passager',
      'Maîtriser la réglementation spécifique au métier de chauffeur VTC',
    ],
  },
];

const itModules: FormationModule[] = [
  {
    title: 'Outils informatiques de contrôle de gestion',
    description:
      "Optimisez le pilotage financier grâce aux outils d'analyse et d'aide à la décision.",
    highlights: [
      'Utilisation avancée d’Excel pour la gestion et l’analyse de données',
      'Introduction à Power BI, tableaux de bord et automatisation des processus',
      'Analyse des données pour soutenir la décision stratégique',
    ],
  },
  {
    title: 'Formation en Excel',
    description:
      "Maîtrisez les fonctionnalités essentielles et avancées d’Excel pour la gestion quotidienne.",
    highlights: [
      'Fonctionnalités de base : cellules, mises en forme, formules et fonctions',
      'Création de tableaux, graphiques et tableaux croisés',
      'Mise en place de reporting et d’outils d’analyse',
    ],
  },
  {
    title: 'Informatique & management opérationnel',
    description:
      'Pilotez les opérations grâce aux outils digitaux et aux méthodes de management adaptées.',
    highlights: [
      'Utilisation des logiciels de gestion opérationnelle',
      'Techniques de management d’équipes et de processus',
      'Analyse de performance à l’aide d’outils de suivi',
    ],
  },
  {
    title: 'Outils informatique, secrétariat & fiscalité',
    description:
      'Développez des compétences transverses pour la gestion administrative et financière.',
    highlights: [
      'Outils bureautiques appliqués aux activités administratives',
      'Organisation et suivi des opérations de gestion',
      'Analyse et reporting pour la prise de décision en temps réel',
    ],
  },
  {
    title: 'Spécialité plurivalente de l’informatique',
    description:
      'Acquérez un socle complet couvrant bureautique, cybersécurité et administration systèmes.',
    highlights: [
      'Utilisation avancée des logiciels métiers et outils collaboratifs',
      'Introduction à la cybersécurité et protection des données',
      'Gestion de bases de données et administration de systèmes',
    ],
  },
];

const relationClientModules: FormationModule[] = [
  {
    title: 'Service, relation & expérience client',
    description:
      'Offrez un service client exceptionnel et renforcez la fidélisation grâce à des interactions professionnelles.',
    highlights: [
      'Techniques de communication et d’écoute active',
      'Principes de l’expérience client et personnalisation du service',
      'Gestion des réclamations et situations conflictuelles',
    ],
  },
];

const preventionModules: FormationModule[] = [
  {
    title: 'Sauveteur secouriste du travail (SST)',
    description:
      'Intervenez rapidement et efficacement lors d’un accident de travail grâce aux gestes de premiers secours.',
    highlights: [
      'Prévention des risques et identification des situations dangereuses',
      'Apprentissage des gestes de premiers secours (massage cardiaque, arrêt des saignements…)',
      'Mises en situation sur scénarios professionnels',
    ],
  },
  {
    title: 'Sécurité incendie',
    description:
      'Prévenez les risques d’incendie et maîtrisez les procédures d’évacuation et d’intervention en entreprise.',
    highlights: [
      'Prévention des risques d’incendie et règles de sécurité',
      'Utilisation des équipements de lutte contre l’incendie',
      'Simulations d’évacuation et d’intervention en situation d’urgence',
    ],
  },
];

export const domainFormations: DomainFormation[] = [
  {
    id: 'techniciens-polyvalents',
    title: 'Techniciens polyvalents',
    description:
      'Maintenance, diagnostic et interventions techniques sur véhicules légers et poids lourds. Formez-vous pour devenir un pilier opérationnel en atelier.',
    icon: Wrench,
    image: automobileImg,
    details: {
      duration: '6 à 12 mois',
      level: 'Débutant à avancé',
      certification: 'Certifications professionnelles + habilitations',
    },
    modules: technicianModules,
  },
  {
    id: 'chauffeurs-securite-routiere',
    title: 'Formation chauffeur & sécurité routière',
    description:
      'Conduite professionnelle, sécurité routière et prévention des risques. Accompagnez vos équipes vers une conduite responsable.',
    icon: CarFront,
    image: automobileImg,
    details: {
      duration: '2 à 6 mois',
      level: 'Tous niveaux',
      certification: 'Attestations de conduite et sécurité routière',
    },
    modules: driverModules,
  },
  {
    id: 'competences-informatique',
    title: 'Compétences informatique',
    description:
      'Bureautique avancée, digitalisation des processus et cybersécurité. Renforcez votre culture numérique et vos outils de pilotage.',
    icon: Code,
    image: informatiqueImg,
    details: {
      duration: '3 à 9 mois',
      level: 'Débutant à expert',
      certification: 'Diplômes et certificats logiciels',
    },
    modules: itModules,
    homeSpan: 'md:col-span-2 xl:col-span-1',
  },
  {
    id: 'relation-client',
    title: 'Relation client',
    description:
      'Communication omnicanal, gestion de la relation client et expérience utilisateur. Visez l’excellence du service.',
    icon: Users,
    image: serviceClientImg,
    details: {
      duration: '2 à 4 mois',
      level: 'Tous niveaux',
      certification: 'Certificat relation client & expérience',
    },
    modules: relationClientModules,
  },
  {
    id: 'prevention-securite',
    title: 'Prévention & sécurité routière',
    description:
      'Analyse des risques, plans de prévention et gestes de secours. Devenez un acteur clé de la sécurité en entreprise.',
    icon: ShieldCheck,
    image: santeImg,
    details: {
      duration: '1 à 3 mois',
      level: 'Tous niveaux',
      certification: 'SST et habilitations sécurité',
    },
    modules: preventionModules,
  },
];

export {
  technicianModules,
  driverModules,
  itModules,
  relationClientModules,
  preventionModules,
};

