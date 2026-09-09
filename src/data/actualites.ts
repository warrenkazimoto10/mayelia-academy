// Import des images des actualités
import simulateurImage from '@/assets/actualite/simulateur.jpg';

// Images du projet PEJEDEC
import pejedec1 from '@/assets/actualite/projet pejedec/1769429284754.jpg';
import pejedec2 from '@/assets/actualite/projet pejedec/1769429285393.jpg';
import pejedec3 from '@/assets/actualite/projet pejedec/1769429285418.jpg';
import pejedec4 from '@/assets/actualite/projet pejedec/1769429285616.jpg';

// Images des Olympiades
import olympiades1 from '@/assets/actualite/olympiades/1767009686004.jpg';
import olympiades2 from '@/assets/actualite/olympiades/1767009687320.jpg';
import olympiades3 from '@/assets/actualite/olympiades/1767009688865.jpg';
import olympiades4 from '@/assets/actualite/olympiades/1767009689815.jpg';
import olympiades5 from '@/assets/actualite/olympiades/1767009690090.jpg';

// Images du Salon Automobile
import salonAuto1 from '@/assets/actualite/salonAutomobile/1758208562683.jpg';
import salonAuto2 from '@/assets/actualite/salonAutomobile/1758208581077.jpg';
import salonAuto3 from '@/assets/actualite/salonAutomobile/1758208585635.jpg';
import salonAuto4 from '@/assets/actualite/salonAutomobile/1758208594880.jpg';
import salonAuto5 from '@/assets/actualite/salonAutomobile/1758208596630.jpg';

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
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  categoryColor: string;
  heroImage: string;
  content: {
    paragraphs: ActualiteParagraph[];
  };
}

export const actualites: Actualite[] = [
  {
    id: 'simulateurs-conduite-mayelia-academy',
    title: 'Saviez-vous que chez Mayelia Academy, nous ne faisons pas que de la formation classique ?',
    excerpt: 'En plus de nos cours, nous disposons de simulateurs de conduite modernes pour poids léger et poids lourd, permettant aux apprenants de s\'entraîner dans des conditions proches de la réalité.',
    category: 'Innovation',
    date: '20 Jan 2025',
    readTime: '3 min',
    categoryColor: 'bg-primary/10 text-primary',
    heroImage: simulateurImage,
    content: {
      paragraphs: [
        {
          text: 'Saviez-vous que chez Mayelia Academy, nous ne faisons pas que de la formation classique ?',
        },
        {
          text: 'En plus de nos cours, nous disposons de simulateurs de conduite modernes :\n🔹 poids léger\n🔹 poids lourd',
        },
        {
          text: 'Ces simulateurs permettent aux apprenants de s\'entraîner dans des conditions proches de la réalité, en toute sécurité, avant de prendre la route.',
          image: {
            src: simulateurImage,
            alt: 'Simulateur de conduite Mayelia Academy',
            caption: 'Simulateur de conduite moderne pour poids léger et poids lourd'
          }
        },
        {
          text: 'Chez Mayelia Academy, nous allions formation, technologie et sécurité routière pour mieux vous préparer à la conduite.',
        },
        {
          text: '📩 Contactez-nous pour en savoir plus.',
        }
      ]
    }
  },
  {
    id: 'projet-pejedec-formation',
    title: 'Projet PEJEDEC | Point d\'étape sur la formation',
    excerpt: 'Depuis le 8 décembre, la formation du projet PEJEDEC, portée par Mayelia Academy en partenariat avec l\'Agence Emploi Jeunes, se déroule avec engagement et régularité.',
    category: 'Formation',
    date: '18 Jan 2025',
    readTime: '5 min',
    categoryColor: 'bg-secondary/10 text-secondary',
    heroImage: pejedec1,
    content: {
      paragraphs: [
        {
          text: 'Depuis le 8 décembre, la formation du projet PEJEDEC, portée par Mayelia Academy en partenariat avec l\'Agence Emploi Jeunes, se déroule avec engagement et régularité.',
          image: {
            src: pejedec1,
            alt: 'Formation PEJEDEC - Mayelia Academy',
            caption: 'Formation du projet PEJEDEC en cours'
          }
        },
        {
          text: 'Après le lancement officiel du programme, les apprenants ont progressivement abordé plusieurs modules clés, parmi lesquels :\n• Le diagnostic des équipements électriques,\n• La maintenance automobile (moteur),\n• La sécurité routière, pilier essentiel des métiers techniques,\n• Et cette semaine, les fondamentaux de l\'entrepreneuriat.',
          image: {
            src: pejedec2,
            alt: 'Modules de formation PEJEDEC',
            caption: 'Apprenants suivant les modules de formation'
          }
        },
        {
          text: 'Chaque module vise à renforcer les compétences techniques, professionnelles et comportementales des participants, dans une logique de montée en compétence durable et d\'employabilité.',
          image: {
            src: pejedec3,
            alt: 'Formation pratique PEJEDEC',
            caption: 'Formation pratique en maintenance automobile'
          }
        },
        {
          text: 'Ce parcours structuré illustre la volonté de Mayelia Academy d\'offrir une formation complète, alliant savoir-faire technique, responsabilité et esprit d\'initiative.',
          image: {
            src: pejedec4,
            alt: 'Apprenants PEJEDEC',
            caption: 'Les apprenants du projet PEJEDEC en formation'
          }
        },
        {
          text: 'La formation se poursuit, avec la même exigence et la même ambition : préparer les jeunes aux réalités du monde professionnel.',
        }
      ]
    }
  },
  {
    id: 'olympiades-metiers-worldskills-2025',
    title: '5ᵉ édition de l\'Olympiade des Métiers - WorldSkills Côte d\'Ivoire 2025',
    excerpt: 'Du mercredi 26 au samedi 29 novembre 2025, s\'est tenue la 5ᵉ édition de l\'Olympiade des Métiers au Lycée Technique d\'Abidjan, également connue sous le nom de "WorldSkills Côte d\'Ivoire 2025".',
    category: 'Événement',
    date: '29 Nov 2025',
    readTime: '6 min',
    categoryColor: 'bg-primary/10 text-primary',
    heroImage: olympiades1,
    content: {
      paragraphs: [
        {
          text: 'Du mercredi 26 au samedi 29 novembre 2025, s\'est tenue la 5ᵉ édition de l\'Olympiade des Métiers au Lycée Technique d\'Abidjan, également connue sous le nom de "WorldSkills Côte d\'Ivoire 2025".',
          image: {
            src: olympiades1,
            alt: 'Olympiades des Métiers 2025',
            caption: '5ᵉ édition de l\'Olympiade des Métiers au Lycée Technique d\'Abidjan'
          }
        },
        {
          text: 'Cet événement, organisé par le Ministère de l\'Enseignement Technique, de la Formation Professionnelle et de l\'Apprentissage (METFPA) à travers la Direction de la Vie Scolaire (DVS), a constitué une opportunité privilégiée pour aller à la rencontre des élèves, futurs professionnels, et leur présenter nos différentes formations sur notre stand.',
          image: {
            src: olympiades2,
            alt: 'Stand Mayelia Academy aux Olympiades',
            caption: 'Stand Mayelia Academy aux Olympiades des Métiers'
          }
        },
        {
          text: 'Ce fut un honneur de partager ce moment avec des élèves passionnés, d\'échanger sur leurs aspirations et de leur présenter les opportunités qu\'offre notre entreprise, afin de développer leurs compétences, renforcer leur employabilité et les accompagner dans la construction d\'un avenir professionnel solide et innovant.',
          image: {
            src: olympiades3,
            alt: 'Échanges avec les élèves',
            caption: 'Échanges avec les élèves passionnés lors des Olympiades'
          }
        },
        {
          text: 'Chez Mayelia Academy, nous aidons également les entreprises à renforcer les compétences de leurs équipes afin de stimuler l\'efficacité opérationnelle et encourager l\'innovation. Nous vous proposons :\n✅ Des programmes de formation conçus selon vos besoins métiers\n✅ Un accompagnement assuré par des professionnels\n✅ Des parcours certifiants pour faire de vos talents un véritable levier de valeur',
          image: {
            src: olympiades4,
            alt: 'Formations Mayelia Academy',
            caption: 'Présentation des formations et opportunités Mayelia Academy'
          }
        },
        {
          text: 'Parce ce que vous avez un futur prometteur, Mayelia Academy s\'engage à vous accompagner dans la construction d\'un monde où vos compétences deviennent votre plus grande force !',
          image: {
            src: olympiades5,
            alt: 'Futur prometteur avec Mayelia Academy',
            caption: 'Mayelia Academy s\'engage pour votre avenir professionnel'
          }
        }
      ]
    }
  },
  {
    id: 'participation-salon-automobile-abidjan-2025',
    title: 'Retour sur notre participation au Salon de l\'Automobile d\'Abidjan 2025',
    excerpt: 'Notre participation à ce rendez-vous incontournable du secteur automobile a été marquée par des échanges riches et des rencontres stimulantes avec nos visiteurs.',
    category: 'Événement',
    date: '15 Jan 2025',
    readTime: '5 min',
    categoryColor: 'bg-primary/10 text-primary',
    heroImage: salonAuto1,
    content: {
      paragraphs: [
        {
          text: 'Notre participation à ce rendez-vous incontournable du secteur automobile a été marquée par des échanges riches et des rencontres stimulantes avec nos visiteurs. Chacune de vos suggestions et observations nous inspire et nous aide à affiner et enrichir nos offres de formation, pour mieux répondre à vos attentes.',
          image: {
            src: salonAuto1,
            alt: 'Salon de l\'Automobile d\'Abidjan 2025',
            caption: 'Stand Mayelia Academy au Salon de l\'Automobile d\'Abidjan 2025'
          }
        },
        {
          text: 'Parmi les moments forts de cet événement, le simulateur de conduite a particulièrement retenu l\'attention. Cet outil pédagogique innovant a permis à de nombreux visiteurs de tester leurs réflexes et leurs aptitudes de conduite dans des conditions proches du réel.',
          image: {
            src: salonAuto2,
            alt: 'Simulateur de conduite au Salon',
            caption: 'Démonstration du simulateur de conduite de dernière génération'
          }
        },
        {
          text: 'Une expérience interactive et immersive, en parfaite adéquation avec notre approche : former autrement, pour former efficacement.',
          image: {
            src: salonAuto3,
            alt: 'Visiteurs utilisant le simulateur',
            caption: 'Expérience immersive sur simulateur de conduite'
          }
        },
        {
          text: 'Nous avons également eu l\'honneur de recevoir un certificat de participation, marque de reconnaissance de notre implication dans le développement et la promotion du secteur automobile en Côte d\'Ivoire.',
          image: {
            src: salonAuto4,
            alt: 'Certificat de participation',
            caption: 'Certificat de participation reçu par Mayelia Academy'
          }
        },
        {
          text: 'Un grand merci à toutes celles et ceux qui ont contribué à faire de cet événement un moment unique de partage et d\'apprentissage !',
          image: {
            src: salonAuto5,
            alt: 'Équipe Mayelia Academy au Salon',
            caption: 'L\'équipe Mayelia Academy au Salon de l\'Automobile'
          }
        }
      ]
    }
  }
];

export const getActualiteById = (id: string): Actualite | undefined => {
  return actualites.find(actualite => actualite.id === id);
};
