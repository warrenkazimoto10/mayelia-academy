import { useState } from 'react';
import { Wrench, ChevronDown, Clock, Target, BookOpen, Truck, Monitor, Shield, Users } from 'lucide-react';
import tpImage from '@/assets/formation/tp.png';
import chauffeurImage from '@/assets/formation/chauffeur.png';
import informatiqueImage from '@/assets/formation/informatique.png';
import securiteImage from '@/assets/formation/securite.png';
import relationClientImage from '@/assets/formation/relation-client.png';

interface Formation {
    title: string;
    description: string;
    contenus: string[];
    objectifs: string[];
}

interface Domaine {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    image: string;
    formations: Formation[];
}

const FormationsDomaines = () => {
    const [selectedDomaine, setSelectedDomaine] = useState<string>('technicien-polyvalent');
    const [expandedFormation, setExpandedFormation] = useState<number | null>(null);

    const domaines: Domaine[] = [
        {
            id: 'technicien-polyvalent',
            title: 'Technicien Polyvalent',
            icon: <Wrench className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500',
            gradient: 'from-blue-500/10 to-cyan-500/10',
            image: tpImage,
            formations: [
                {
                    title: 'Maintenance de Véhicules',
                    description: 'Fournir aux participants les compétences nécessaires pour réaliser la maintenance préventive et corrective des véhicules, garantissant ainsi leur bon fonctionnement et leur conformité lors des contrôles techniques.',
                    contenus: [
                        'Principes de fonctionnement des systèmes mécaniques, électriques et électroniques des véhicules',
                        'Techniques de diagnostic et de réparation des pannes',
                        'Procédure de maintenance préventive et vérification avant le contrôle technique'
                    ],
                    objectifs: [
                        'Maîtriser les techniques de maintenance préventive et corrective sur différents types de véhicules',
                        'Identifier et diagnostiquer les pannes courantes',
                        'Assurer la conformité des véhicules aux normes de sécurité et de contrôle technique'
                    ]
                },
                {
                    title: 'Soudure TIG MIG',
                    description: 'Permettre aux participants d\'acquérir les compétences nécessaires pour maîtriser les techniques de soudure TIG et MIG, adaptées à divers matériaux et situations industrielles.',
                    contenus: [
                        'Introduction aux principes de la soudure TIG et MIG',
                        'Techniques de soudage sur différents matériaux (acier, aluminium, etc.)',
                        'Sécurité et prévention des risques en soudure'
                    ],
                    objectifs: [
                        'Maîtriser les procédés de soudure TIG (Tungsten Inert Gas) et MIG (Métal Inert Gas)',
                        'Apprendre à souder avec précision différents types de métaux',
                        'Assurer la qualité des soudures en respectant les normes de sécurité et de productivité'
                    ]
                },
                {
                    title: 'Maintenance Hydraulique',
                    description: 'Permettre aux participants d\'acquérir les compétences nécessaires pour diagnostiquer, entretenir et réparer les systèmes hydrauliques, assurant ainsi leur bon fonctionnement et leur durabilité.',
                    contenus: [
                        'Etude des composants et circuits hydrauliques',
                        'Analyse et diagnostic des pannes',
                        'Bonnes pratiques de sécurité lors des interventions sur les systèmes hydrauliques'
                    ],
                    objectifs: [
                        'Comprendre les principes de fonctionnement des circuits hydrauliques',
                        'Diagnostiquer et résoudre les pannes sur les systèmes hydrauliques',
                        'Appliquer des techniques de maintenance préventive et corrective'
                    ]
                },
                {
                    title: 'Formation en Organe Moteur',
                    description: 'Fournir une compréhension approfondie des composants et du fonctionnement des moteurs, ainsi que des compétences en diagnostic et en réparation.',
                    contenus: [
                        'Analyse des différents types de moteurs et de leurs composants',
                        'Techniques de diagnostic et de réparation',
                        'Maintenance préventive pour optimiser la durée de vie des moteurs'
                    ],
                    objectifs: [
                        'Comprendre les principes de fonctionnement des moteurs thermiques et électriques',
                        'Diagnostiquer les problèmes courants des organes moteurs',
                        'Appliquer des techniques de maintenance préventive et corrective sur les moteurs'
                    ]
                },
                {
                    title: 'Préparateur Technique et Maintenance de Véhicules',
                    description: 'Préparer les véhicules au contrôle technique en réalisant un diagnostic complet et en effectuant les maintenances nécessaires pour garantir leur conformité.',
                    contenus: [
                        'Diagnostic des principaux systèmes (freins, éclairage, châssis...)',
                        'Réparation et maintenance préventive des véhicules',
                        'Connaissance des normes et réglementations en matière de contrôle technique'
                    ],
                    objectifs: [
                        'Maîtriser les vérifications techniques nécessaires avant le contrôle',
                        'Identifier et résoudre les dysfonctionnements pouvant affecter la conformité des véhicules',
                        'Assurer une maintenance préventive pour réduire les risques de contre-visite'
                    ]
                }
            ]
        },
        {
            id: 'chauffeur-securite',
            title: 'Formation des Chauffeurs et Sécurité Routière',
            icon: <Truck className="w-8 h-8" />,
            color: 'from-orange-500 to-red-500',
            gradient: 'from-orange-500/10 to-red-500/10',
            image: chauffeurImage,
            formations: [
                {
                    title: 'Conduite Défensive',
                    description: 'Enseigner les techniques de conduite préventive visant à minimiser les risques d\'accidents et à améliorer la sécurité sur la route.',
                    contenus: [
                        'Techniques d\'anticipation et gestion des dangers',
                        'Maîtrise des distances de sécurité et conduite en conditions difficiles',
                        'Réaction face aux situations d\'urgence et freinage d\'urgence'
                    ],
                    objectifs: [
                        'Anticiper les comportements imprévisibles des autres usagers',
                        'Réduire les risques liés à la conduite en milieu urbain et sur les routes',
                        'Adopter une conduite plus sécuritaire et économique'
                    ]
                },
                {
                    title: 'Renforcement de Capacités et Recyclage Chauffeurs',
                    description: 'Elle est destinée à améliorer les compétences, faire la mise à jour des connaissances et sensibiliser les chauffeurs sur les nouvelles réglementations et technologies de conduite.',
                    contenus: [
                        'Révision des règles de sécurité routière et techniques de conduite défensive',
                        'Maîtrise des véhicules et optimisation de la consommation de carburant',
                        'Gestion des situations d\'urgence et prévention des risques routiers'
                    ],
                    objectifs: [
                        'Actualiser les connaissances sur les règles de sécurité routière et de sécurité',
                        'Renforcer les compétences pour une conduite plus efficace et sécuritaire',
                        'Sensibiliser aux nouveaux enjeux environnementaux et technologiques'
                    ]
                },
                {
                    title: 'Conduite d\'Engin',
                    description: 'Préparer les chauffeurs à la conduite de divers types d\'engins de chantier, en leur fournissant les compétences nécessaires pour garantir la sécurité et l\'efficacité sur les chantiers.',
                    contenus: [
                        'Introduction aux différents types d\'engins et leurs spécificités',
                        'Techniques de conduite sécurisée et manœuvres de précision',
                        'Pratiques sur le terrain et simulations d\'opérations'
                    ],
                    objectifs: [
                        'Acquérir les compétences techniques pour la conduite d\'engins de chantier (bulldozers, pelleteuses, etc.)',
                        'Respecter les règles de sécurité et les réglementations en vigueur lors des opérations',
                        'Optimiser l\'utilisation des engins pour une meilleure productivité sur le chantier'
                    ]
                },
                {
                    title: 'Habilitation à la Conduite de Grue',
                    description: 'Préparer les conducteurs à la conduite en toute sécurité de différents types de grues, en respectant les normes de sécurité et les réglementations en vigueur.',
                    contenus: [
                        'Principes de base de la conduite de grue',
                        'Sécurité et prévention des risques liés à la manipulation de charges lourdes',
                        'Conduite pratique et manœuvre spécifique en conditions réelles'
                    ],
                    objectifs: [
                        'Apprendre à manipuler et conduire des grues en toute sécurité',
                        'Connaître les règles de sécurité liées à la conduite de grues',
                        'Obtenir l\'habilitation nécessaire pour conduire des grues sur des chantiers ou en industrie'
                    ]
                },
                {
                    title: 'Sécurité Routière',
                    description: 'Aborder les règles et bonnes pratiques de la sécurité routière, visant à réduire les accidents et à favoriser une conduite plus responsable et sécurisée.',
                    contenus: [
                        'Analyse des causes d\'accidents et prévention des risques',
                        'Connaissance des règles de circulation et des nouvelles réglementations',
                        'Techniques de conduite sécuritaire et gestion des situations critiques'
                    ],
                    objectifs: [
                        'Sensibiliser aux risques routiers et aux comportements à risque',
                        'Promouvoir une conduite respectueuse des règles et des usagers',
                        'Réduire le nombre d\'accidents par l\'application de bonnes pratiques'
                    ]
                },
                {
                    title: 'Formation VTC',
                    description: 'Permettre aux participants de répondre aux attentes des clients en termes de service, de sécurité, et de professionnalisme, tout en augmentant leur employabilité et leurs opportunités d\'évolution dans le secteur des VTC et du transport privé.',
                    contenus: [
                        'Techniques de conduite professionnelle et de sécurité',
                        'Gestion de la relation client et amélioration de l\'expérience passager',
                        'Connaissance de la réglementation et des responsabilités de chauffeur VTC'
                    ],
                    objectifs: [
                        'Former les participants aux standards de service et de sécurité de l\'industrie VTC',
                        'Développer les compétences en conduite, en service et en gestion de la clientèle',
                        'Maîtriser la réglementation et les bonnes pratiques spécifiques au métier de chauffeur VTC'
                    ]
                }
            ]
        },
        {
            id: 'competences-informatiques',
            title: 'Compétences Informatiques',
            icon: <Monitor className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            gradient: 'from-purple-500/10 to-pink-500/10',
            image: informatiqueImage,
            formations: [
                {
                    title: 'Outils Informatiques de Contrôle de Gestion et d\'Analyse de Données',
                    description: 'Enseigner l\'utilisation des outils informatiques pour optimiser le contrôle de gestion et l\'analyse des données financières et opérationnelles, afin de faciliter la prise de décision stratégique.',
                    contenus: [
                        'Utilisation avancée d\'Excel pour la gestion et l\'analyse de données',
                        'Introduction aux outils d\'aide à la décision (Power BI, tableaux de bord)',
                        'Techniques d\'automatisation des processus financiers'
                    ],
                    objectifs: [
                        'Maîtriser les logiciels de gestion financière et d\'analyse de données (Excel, Power BI, etc.)',
                        'Automatiser les processus de contrôle de gestion à l\'aide d\'outils numériques',
                        'Analyser les données pour améliorer la performance organisationnelle'
                    ]
                },
                {
                    title: 'Formation en Excel',
                    description: 'Enseigner les formalités aux participants les fonctionnalités essentielles d\'Excel pour une utilisation efficace dans la gestion des données, l\'analyse et la création de rapports.',
                    contenus: [
                        'Introduire aux fonctionnalités de base (cellule, lignes, colonnes)',
                        'Utilisation des formules et fonctions avancées',
                        'Création de tableaux et graphiques pour la visualisation des données'
                    ],
                    objectifs: [
                        'Maîtriser les outils de base et avancés d\'Excel pour optimiser la gestion des données',
                        'Apprendre à créer et gérer des tableaux, graphiques et formules',
                        'Développer des compétences en analyse de données et en reporting'
                    ]
                },
                {
                    title: 'Informatique et Management Opérationnel',
                    description: 'Développer les compétences les compétences en informatique et en management pour une gestion efficace des opérations au sein de l\'entreprise, en s\'appuyant sur des outils technologiques.',
                    contenus: [
                        'Utilisation des outils informatiques pour la gestion des opérations',
                        'Technique de management des équipes et gestion des processus',
                        'Analyse de la performance à l\'aide de logiciels de gestion et de suivi'
                    ],
                    objectifs: [
                        'Maîtriser les outils informatiques pour la gestion opérationnelle des activités',
                        'Améliorer les compétences en management pour optimiser la productivité et les performances',
                        'Savoir analyser et prendre des décisions stratégiques en temps réel'
                    ]
                },
                {
                    title: 'Outils Informatique, Secrétariat et Fiscalité',
                    description: 'Développer les compétences les compétences en informatique et en management pour une gestion efficace des opérations au sein de l\'entreprise, en s\'appuyant sur des outils technologiques.',
                    contenus: [
                        'Utilisation des outils informatiques pour la gestion des opérations',
                        'Technique de management des équipes et gestion des processus',
                        'Analyse de la performance à l\'aide de logiciels de gestion et de suivi'
                    ],
                    objectifs: [
                        'Maîtriser les outils informatiques pour la gestion opérationnelle des activités',
                        'Améliorer les compétences en management pour optimiser la productivité et les performances',
                        'Savoir analyser et prendre des décisions stratégiques en temps réel'
                    ]
                },
                {
                    title: 'Spécialité Plurivalentes de l\'Informatique',
                    description: 'Formation polyvalente permettant d\'acquérir des compétences essentielles dans divers domaines de l\'informatique, allant de l\'utilisation des logiciels courants à la cybersécurité et la gestion des bases de données.',
                    contenus: [
                        'Utilisation des outils informatiques (Microsoft Office, gestion des fichiers)',
                        'Introduction à la cybersécurité et protection des données',
                        'Gestion de bases de données et administration de systèmes d\'exploitation'
                    ],
                    objectifs: [
                        'Maîtriser les outils informatiques de bases tels logiciels bureautiques',
                        'Comprendre les principes de la cybersécurité et de la gestion des données',
                        'Acquérir des compétences en systèmes d\'exploitation et administration de réseaux'
                    ]
                }
            ]
        },
        {
            id: 'prevention-securite',
            title: 'Prévention et Sécurité au Travail',
            icon: <Shield className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            gradient: 'from-green-500/10 to-emerald-500/10',
            image: securiteImage,
            formations: [
                {
                    title: 'Sauveteur Secouriste du Travail (SST)',
                    description: 'Permettre acquisition d\'acquérir les compétences nécessaires pour intervenir rapidement et efficacement en cas d\'accident de travail, en appliquant les gestes de premiers secours.',
                    contenus: [
                        'Prevention des risques et identification des situations dangereuses',
                        'Apprentissage des gestes de premiers secours (massage cardiaque, arrêt des saignements, etc.)',
                        'Mise en pratique sur des scénarios d\'accidents en milieu professionnel'
                    ],
                    objectifs: [
                        'Former les participants à la prévention des risques professionnels',
                        'Apprendre les gestes de premiers secours à appliquer en cas d\'accident de travail',
                        'Garantir une réponse rapide et efficace pour limiter les conséquences des accidents sur le lieu de travail'
                    ]
                },
                {
                    title: 'Sécurité Incendie',
                    description: 'Permettre l\'acquisition des compétences nécessaires pour prévenir les risques d\'incendie, réagir rapidement en cas d\'urgence, et maîtriser les techniques d\'évacuation et d\'intervention en toute sécurité.',
                    contenus: [
                        'Prevention des risques d\'incendie et règle de sécurité incendie',
                        'Utilisation des équipements de lutte contre l\'incendie',
                        'Mise en pratique à travers des simulations d\'évacuation et d\'intervention'
                    ],
                    objectifs: [
                        'Former les participants à la prévention des risques d\'incendie',
                        'Apprendre à manipuler les équipements de lutte contre l\'incendie (extincteurs, alarmes, etc.)',
                        'Maîtriser les procédures d\'évacuation et de gestion des situations d\'urgence'
                    ]
                }
            ]
        },
        {
            id: 'relation-client',
            title: 'Relation Client',
            icon: <Users className="w-8 h-8" />,
            color: 'from-pink-500 to-rose-500',
            gradient: 'from-pink-500/10 to-rose-500/10',
            image: relationClientImage,
            formations: [
                {
                    title: 'Service - Relation et Expérience Client',
                    description: 'Cette formation enseigne aux participants les techniques et compétences pour offrir un service client exceptionnel, renforcer la satisfaction et fidéliser les clients.',
                    contenus: [
                        'Technique de communication et d\'écoute client',
                        'Principes de l\'expérience client et personnalisation du service',
                        'Gestion des réclamations et situations conflictuelles'
                    ],
                    objectifs: [
                        'Développer les compétences en communication et en écoute active pour interagir efficacement avec les clients',
                        'Améliorer l\'expérience client en apprenant à anticiper et à répondre aux besoins des clients',
                        'Gérer les situations délicates avec professionnalisme pour renforcer la satisfaction et l\'image de l\'entreprise'
                    ]
                }
            ]
        }
    ];

    const currentDomaine = domaines.find(d => d.id === selectedDomaine) || domaines[0];

    return (
        <section id="formations" className="py-24 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={currentDomaine.image}
                    alt={currentDomaine.title}
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for readability - opacity at 60% for balance */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                    <span className="inline-block px-4 py-2 bg-primary rounded-full text-white font-opensans text-sm font-medium mb-4 animate-scale-in shadow-lg">
                        Nos Formations
                    </span>
                    <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
                        Cinq Domaines d'Expertise
                    </h2>
                    <p className="text-lg text-muted-foreground font-opensans font-semibold">
                        Chaque programme est conçu en partenariat avec des entreprises, animé par des experts certifiés et orienté emploi et performance.
                    </p>
                </div>

                {/* Domaines Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {domaines.map((domaine) => (
                        <button
                            key={domaine.id}
                            onClick={() => {
                                setSelectedDomaine(domaine.id);
                                setExpandedFormation(null);
                            }}
                            className={`group relative px-6 py-4 rounded-2xl font-opensans font-semibold transition-all duration-300 ${selectedDomaine === domaine.id
                                ? 'bg-gradient-to-r ' + domaine.color + ' text-white shadow-xl scale-105'
                                : 'bg-card hover:bg-muted text-foreground hover:shadow-lg'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`transition-transform duration-300 ${selectedDomaine === domaine.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {domaine.icon}
                                </div>
                                <span>{domaine.title}</span>
                            </div>
                            {selectedDomaine === domaine.id && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Formations Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentDomaine.formations.map((formation, index) => (
                            <div
                                key={index}
                                className="group relative animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card */}
                                <div className="relative h-full bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    {/* Gradient Header */}
                                    <div className={`h-2 bg-gradient-to-r ${currentDomaine.color}`}></div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Title */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${currentDomaine.gradient} flex-shrink-0`}>
                                                <BookOpen className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-poppins font-bold text-foreground leading-tight">
                                                {formation.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground font-opensans leading-relaxed mb-4 line-clamp-3">
                                            {formation.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>Durée variable</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Target className="w-4 h-4" />
                                                <span>{formation.objectifs.length} objectifs</span>
                                            </div>
                                        </div>

                                        {/* Expand Button */}
                                        <button
                                            onClick={() => setExpandedFormation(expandedFormation === index ? null : index)}
                                            className="w-full py-2 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 rounded-lg font-opensans font-semibold text-sm text-primary transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <span>{expandedFormation === index ? 'Voir moins' : 'Voir les détails'}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedFormation === index ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Expanded Content */}
                                        {expandedFormation === index && (
                                            <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                                                {/* Contenus */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-poppins font-bold text-foreground mb-2 flex items-center gap-2">
                                                        <div className="w-1 h-4 bg-primary rounded-full"></div>
                                                        Contenus
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {formation.contenus.map((contenu, idx) => (
                                                            <li key={idx} className="text-xs text-muted-foreground font-opensans flex items-start gap-2">
                                                                <span className="text-primary mt-1">•</span>
                                                                <span>{contenu}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Objectifs */}
                                                <div>
                                                    <h4 className="text-sm font-poppins font-bold text-foreground mb-2 flex items-center gap-2">
                                                        <div className="w-1 h-4 bg-secondary rounded-full"></div>
                                                        Objectifs
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {formation.objectifs.map((objectif, idx) => (
                                                            <li key={idx} className="text-xs text-muted-foreground font-opensans flex items-start gap-2">
                                                                <span className="text-secondary mt-1">•</span>
                                                                <span>{objectif}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section
                <div className="mt-16 text-center animate-fade-in">
                    <div className="inline-block p-8 bg-card/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-xl">
                        <p className="text-lg font-opensans text-muted-foreground mb-4">
                            Intéressé par l'une de nos formations ?
                        </p>
                        <a href="/rendez-vous">
                            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-opensans font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Prendre rendez-vous
                            </button>
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default FormationsDomaines;
