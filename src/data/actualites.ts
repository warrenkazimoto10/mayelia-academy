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

// Placeholders pour les images - à remplacer par les vraies photos fournies
// Utilisation de placeholder.com avec des dimensions appropriées et couleurs cohérentes
const salonAutomobile2025Images = {
  hero: 'https://via.placeholder.com/1200x600/4A5568/FFFFFF?text=Salon+Automobile+2025',
  banner: 'https://via.placeholder.com/800x600/718096/FFFFFF?text=Bannière+Mayelia+Academy',
  simulator: 'https://via.placeholder.com/800x600/2D3748/FFFFFF?text=Simulateur+de+Conduite',
  certificate: 'https://via.placeholder.com/800x600/1A202C/FFFFFF?text=Certificat+de+Participation',
  womanInSimulator: 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=Simulateur+Femme',
};

const jamEx2025Images = {
  hero: 'https://via.placeholder.com/1200x600/2C5282/FFFFFF?text=JAMEX+2025',
  ceremony1: 'https://via.placeholder.com/800x600/2A4365/FFFFFF?text=Cérémonie+JAMEX+1',
  ceremony2: 'https://via.placeholder.com/800x600/234E52/FFFFFF?text=Cérémonie+JAMEX+2',
};

export const actualites: Actualite[] = [
  {
    id: 'participation-salon-automobile-abidjan-2025',
    title: 'Participation au Salon de l\'Automobile d\'Abidjan 2025',
    excerpt: 'Notre participation à ce rendez-vous incontournable du secteur automobile a été marquée par des échanges riches et des rencontres stimulantes avec nos visiteurs.',
    category: 'Événement',
    date: '15 Jan 2025',
    readTime: '5 min',
    categoryColor: 'bg-primary/10 text-primary',
    heroImage: salonAutomobile2025Images.hero,
    content: {
      paragraphs: [
        {
          text: 'Notre participation à ce rendez-vous incontournable du secteur automobile a été marquée par des échanges riches et des rencontres stimulantes avec nos visiteurs. Chacune de vos suggestions et observations nous inspire et nous aide à affiner et enrichir nos offres de formation, pour mieux répondre à vos attentes.',
          image: {
            src: salonAutomobile2025Images.banner,
            alt: 'Bannière Mayelia Academy au Salon de l\'Automobile',
            caption: 'Stand Mayelia Academy au Salon de l\'Automobile d\'Abidjan 2025'
          }
        },
        {
          text: 'Parmi les moments forts de cet événement, le simulateur de conduite a particulièrement retenu l\'attention. Cet outil pédagogique innovant a permis à de nombreux visiteurs de tester leurs réflexes et leurs aptitudes de conduite dans des conditions proches du réel.',
          image: {
            src: salonAutomobile2025Images.simulator,
            alt: 'Visiteurs utilisant le simulateur de conduite',
            caption: 'Démonstration du simulateur de conduite de dernière génération'
          }
        },
        {
          text: 'Une expérience interactive et immersive, en parfaite adéquation avec notre approche : former autrement, pour former efficacement.',
          image: {
            src: salonAutomobile2025Images.womanInSimulator,
            alt: 'Jeune femme utilisant le simulateur de conduite',
            caption: 'Expérience immersive sur simulateur de conduite'
          }
        },
        {
          text: 'Nous avons également eu l\'honneur de recevoir un certificat de participation, marque de reconnaissance de notre implication dans le développement et la promotion du secteur automobile en Côte d\'Ivoire.',
          image: {
            src: salonAutomobile2025Images.certificate,
            alt: 'Certificat de participation au Salon de l\'Automobile',
            caption: 'Certificat de participation reçu par Mayelia Academy'
          }
        },
        {
          text: 'Un grand merci à toutes celles et ceux qui ont contribué à faire de cet événement un moment unique de partage et d\'apprentissage !'
        }
      ]
    }
  },
  {
    id: 'engagee-jeunesse-formation-jamex-2025',
    title: 'Engagée pour la jeunesse et la formation : Participation de Mayelia Academy à la Journée du Mérite et de l\'Excellence (JAMEX)',
    excerpt: 'Mayelia Academy a participé à la 2ème édition de la Journée du Mérite et de l\'Excellence (JAMEX), organisée par la Direction de la Vie Scolaire.',
    category: 'Événement',
    date: '10 Jan 2025',
    readTime: '4 min',
    categoryColor: 'bg-secondary/10 text-secondary',
    heroImage: jamEx2025Images.hero,
    content: {
      paragraphs: [
        {
          text: 'Mayelia Academy a participé à la 2ème édition de la Journée du Mérite et de l\'Excellence (JAMEX), organisée par la Direction de la Vie Scolaire. Cette journée vise à reconnaître le travail bien fait des élèves de l\'enseignement technique et de la formation professionnelle, soulignant l\'importance de l\'encouragement et de la valorisation des efforts pour bâtir une jeunesse ambitieuse et compétente.'
        },
        {
          text: 'Notre participation à cet événement illustre notre engagement constant en faveur de la formation professionnelle, de la promotion de l\'excellence et du soutien aux initiatives éducatives en Côte d\'Ivoire.',
          image: {
            src: jamEx2025Images.ceremony1,
            alt: 'Cérémonie JAMEX avec les participants',
            caption: 'Cérémonie de remise des prix lors de la JAMEX 2025'
          }
        },
        {
          text: 'Cette journée a été l\'occasion de renforcer notre engagement auprès de la jeunesse ivoirienne et de promouvoir l\'excellence dans la formation professionnelle. Nous sommes fiers de contribuer à cette initiative qui valorise le mérite et encourage les jeunes talents.',
          image: {
            src: jamEx2025Images.ceremony2,
            alt: 'Équipe Mayelia Academy à la JAMEX',
            caption: 'L\'équipe Mayelia Academy présente à la Journée du Mérite et de l\'Excellence'
          }
        },
        {
          text: 'Mayelia Academy réitère son engagement en faveur de la formation professionnelle, de la promotion de l\'excellence et du soutien aux initiatives éducatives en Côte d\'Ivoire.'
        }
      ]
    }
  }
];

export const getActualiteById = (id: string): Actualite | undefined => {
  return actualites.find(actualite => actualite.id === id);
};
