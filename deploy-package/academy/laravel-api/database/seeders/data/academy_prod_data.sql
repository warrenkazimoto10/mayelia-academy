-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 28 juil. 2026 à 16:42
-- Version du serveur : 10.11.18-MariaDB-deb12
-- Version de PHP : 8.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET FOREIGN_KEY_CHECKS=0;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mayel2678788_12xy34h`
--

-- --------------------------------------------------------

--
-- Structure de la table `actualites`
--



--
-- Déchargement des données de la table `actualites`
--

INSERT INTO `actualites` (`id`, `title`, `excerpt`, `category`, `date`, `read_time`, `category_color`, `hero_image`, `published`, `created_at`, `updated_at`) VALUES
(1, 'Mayelia Academy renforce les compétences des agents de la SICTA SA pour une sécurité routière toujours plus exigeante', 'Les agents des centres de contrôle technique automobile de la SICTA SA participent à plusieurs sessions de recyclage conduites Mayelia Academy.', 'Formation', '13 juil. 2026', '5 min', 'bg-primary/10 text-primary', '/storage/uploads/NMh0c8UBlDeUGaPJ5IWzEyl77IcpM0bC3JRxGAvo.jpeg', 1, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(2, 'Formation en conduite sécuritaire des chariots élévateurs - La Tulipe Food', 'La maîtrise des chariots élévateurs constitue un enjeu majeur pour les entreprises évoluant dans les secteurs de l\'industrie.', 'Innovation', '5 juin 2026', '5 min', 'bg-primary/10 text-primary', '/storage/uploads/K9esY4eqLbcEtczVitjooqSDi8xOkOuOZ5IBU8cw.jpg', 1, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(3, 'FNER 2026 - 3ᵉ édition : Mayelia Academy signe un partenariat stratégique en faveur de l\'emploi et de la formation des jeunes', 'Au total, 450 bénéficiaires intégreront un parcours de formation professionnalisant.', 'Innovation', '15 juil. 2026', '5 min', 'bg-primary/10 text-primary', '/storage/uploads/lkKeecebWYyQDq5pWRZ5ZfdIWXwg2bqJ041pinbj.jpg', 1, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(4, 'FNER 2026 : Quatre jours d\'engagement de Mayelia Academy au service de l\'emploi des jeunes', 'Mayelia Academy à la 3ᵉ édition de la Foire Nationale de l\'Emploi et du Recrutement (FNER 2026).', 'Sécurité', '20 mai 2026', '5 min', 'bg-primary/10 text-primary', '/storage/uploads/1qviUY6fcyzuTccgtFYS5oj2DKpgG7Yax9Hq5Xg0.jpg', 1, '2026-07-15 12:53:22', '2026-07-15 12:53:22');

-- --------------------------------------------------------

--
-- Structure de la table `actualite_paragraphs`
--



--
-- Déchargement des données de la table `actualite_paragraphs`
--

INSERT INTO `actualite_paragraphs` (`id`, `actualite_id`, `text`, `image_src`, `image_alt`, `image_caption`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Dans le cadre de sa mission de développement des compétences professionnelles, Mayelia Academy a organisé deux sessions de recyclage au profit des agents des centres de contrôle technique automobile de SICTA SA, les 23 juin et 08 juillet 2026. Ces formations s\'inscrivent dans une démarche d\'amélioration continue visant à garantir des prestations toujours plus fiables, rigoureuses et conformes aux normes en vigueur.', '/storage/uploads/KfKpmJxu5Q6WbyvCerRZnQus1JwXmqM5qyvR6W0o.png', NULL, NULL, 0, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(2, 1, 'Animées par les experts de Mayelia Academy, ces sessions ont permis aux participants d\'actualiser leurs connaissances sur les bonnes pratiques du contrôle technique automobile, les évolutions réglementaires ainsi que les exigences liées à la qualité des inspections. L\'objectif est de maintenir un haut niveau d\'expertise afin de renforcer la fiabilité des contrôles techniques et de contribuer efficacement à la prévention des risques sur les routes.', NULL, NULL, NULL, 1, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(3, 1, 'Au-delà du renforcement des compétences techniques, ces formations illustrent la volonté du Groupe Mayelia de placer le capital humain au cœur de sa stratégie de performance. En investissant régulièrement dans le développement des compétences de ses collaborateurs, Mayelia Academy accompagne les équipes de la SICTA SA dans l\'amélioration continue de leurs pratiques professionnelles et dans la fourniture d\'un service répondant aux plus hauts standards de qualité.', NULL, NULL, NULL, 2, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(4, 1, 'Ces initiatives traduisent une conviction forte : une sécurité routière durable repose sur des professionnels compétents, régulièrement formés et capables de s\'adapter aux évolutions de leur métier. À travers ce programme de recyclage, Mayelia Academy confirme ainsi son rôle de partenaire stratégique dans le renforcement des capacités des acteurs du contrôle technique automobile.', NULL, NULL, NULL, 3, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(5, 1, 'L\'engagement et l\'assiduité des participants tout au long de ces sessions témoignent de leur volonté constante de progresser et de contribuer, chaque jour, à rendre les routes plus sûres pour tous les usagers.', NULL, NULL, NULL, 4, '2026-07-15 11:37:54', '2026-07-15 11:37:54'),
(6, 2, 'Le vendredi 05 juin 2026, Mayelia Academy a accueilli les collaborateurs de La Tulipe Food dans le cadre d\'une session de formation dédiée à la conduite sécuritaire des chariots élévateurs. Cette formation s\'inscrit dans la volonté commune des deux entreprises de renforcer la sécurité au travail, de prévenir les risques professionnels et d\'améliorer la performance opérationnelle.', NULL, NULL, NULL, 0, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(7, 2, 'Au cours de cette session, les participants ont approfondi leurs connaissances des règles essentielles de conduite, des techniques de manutention sécurisée ainsi que des bonnes pratiques liées à l\'utilisation des chariots élévateurs en environnement industriel.', NULL, NULL, NULL, 1, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(8, 2, 'À travers des modules théoriques et des mises en situation pratiques, les stagiaires ont développé les compétences nécessaires pour adopter les bons réflexes, limiter les risques d\'accidents et assurer une utilisation conforme des équipements de manutention.', NULL, NULL, NULL, 2, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(9, 2, 'La maîtrise des chariots élévateurs constitue un enjeu majeur pour les entreprises évoluant dans les secteurs de l\'industrie, de la logistique et de la distribution. En investissant dans la formation de leurs collaborateurs, les entreprises favorisent non seulement la sécurité des personnes et des biens, mais également l\'amélioration de leur productivité et de leur efficacité opérationnelle.', NULL, NULL, NULL, 3, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(10, 2, 'Chez Mayelia Academy, nous sommes convaincus que le développement des compétences est un levier essentiel de performance durable. C\'est pourquoi nous concevons des formations pratiques, adaptées aux réalités du terrain et conformes aux exigences des métiers.', NULL, NULL, NULL, 4, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(11, 2, 'Nous adressons nos sincères remerciements aux collaborateurs de La Tulipe Food pour leur engagement, leur implication et leur volonté constante de renforcer leurs compétences professionnelles. Nous remercions également La Tulipe Food pour la confiance accordée à Mayelia Academy dans l\'accompagnement de ses équipes.', NULL, NULL, NULL, 5, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(12, 2, 'Vous souhaitez renforcer les compétences de vos équipes grâce à des formations professionnelles, pratiques et adaptées aux besoins de votre entreprise ?', NULL, NULL, NULL, 6, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(13, 2, 'Mayelia Academy vous accompagne dans la conception et la réalisation de programmes de formation sur mesure, animés par des experts et orientés vers la performance opérationnelle.', NULL, NULL, NULL, 7, '2026-07-15 12:01:03', '2026-07-15 12:01:03'),
(14, 3, 'Mayelia Academy confirme son engagement en faveur de l\'employabilité des jeunes en participant à la 3ᵉ édition de la Foire Nationale de l\'Emploi et du Recrutement (FNER 2026). À cette occasion, l\'Académie a franchi une étape majeure en accompagnant la signature d\'une convention-cadre stratégique avec le Ministère de la Promotion de la Jeunesse, de l\'Insertion Professionnelle et du Service Civique.', NULL, NULL, NULL, 0, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(15, 3, 'Cette convention marque le lancement d\'un programme ambitieux destiné à favoriser l\'accès des jeunes aux métiers d\'avenir. Au total, 450 bénéficiaires intégreront un parcours de formation professionnalisant, conçu pour répondre aux besoins réels des entreprises et aux exigences du marché de l\'emploi.', NULL, NULL, NULL, 1, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(16, 3, 'L\'initiative repose sur une approche innovante qui associe développement des compétences et insertion professionnelle. Elle vise à offrir aux jeunes des perspectives concrètes d\'emploi dans des secteurs porteurs, notamment celui de l\'automobile, mais également dans d\'autres filières stratégiques en forte croissance.', NULL, NULL, NULL, 2, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(17, 3, 'L\'un des principaux atouts de ce programme réside dans son dispositif d\'accompagnement vers l\'emploi. 75 % des bénéficiaires bénéficieront d\'une insertion professionnelle avant même le démarrage de leur formation, grâce à des partenariats développés avec les entreprises.', NULL, NULL, NULL, 3, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(18, 3, 'Cette approche permet d\'assurer une meilleure adéquation entre les compétences acquises et les besoins du marché, tout en facilitant une intégration rapide et durable des jeunes dans le monde professionnel.', NULL, NULL, NULL, 4, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(19, 3, 'À travers cette initiative, Mayelia Academy réaffirme sa volonté de contribuer activement au développement du capital humain en Côte d\'Ivoire. L\'Académie conçoit des formations pratiques, professionnalisantes et adaptées aux réalités des secteurs industriels, de la mobilité, de la logistique et des services.', NULL, NULL, NULL, 5, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(20, 3, 'Former, accompagner et insérer durablement les talents constitue le cœur de la mission de Mayelia Academy. En renforçant les compétences des jeunes et en favorisant leur accès à un emploi durable, l\'Académie participe à la construction d\'une économie plus compétitive et à l\'émergence d\'une nouvelle génération de professionnels qualifiés.', NULL, NULL, NULL, 6, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(21, 3, 'La première journée de la FNER 2026 a été marquée par des rencontres institutionnelles, des échanges avec les acteurs de l\'emploi et de la formation, ainsi que par la signature de ce partenariat structurant, qui ouvre de nouvelles perspectives pour la jeunesse ivoirienne.', NULL, NULL, NULL, 7, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(22, 3, 'Mayelia Academy remercie l\'ensemble de ses partenaires pour leur confiance et renouvelle son engagement à accompagner les politiques publiques en faveur de', NULL, NULL, NULL, 8, '2026-07-15 12:23:18', '2026-07-15 12:23:18'),
(23, 4, 'À l\'occasion de la 3ᵉ édition de la Foire Nationale de l\'Emploi et du Recrutement (FNER 2026), Mayelia Academy a réaffirmé son engagement en faveur de l\'employabilité et de l\'insertion professionnelle des jeunes. Durant quatre jours, le stand de Mayelia Academy, installé au Palais de la Culture de Treichville, a accueilli des centaines de visiteurs venus découvrir des parcours de formation innovants et des opportunités concrètes d\'accès à l\'emploi. Cette forte mobilisation témoigne de l\'intérêt croissant des jeunes pour des formations professionnalisantes répondant aux besoins du marché du travail.', '/storage/uploads/sXCnMl02dVsXuZnqp0UPye3Ye0NQ47CeBI379BrO.jpg', NULL, NULL, 0, '2026-07-15 12:53:22', '2026-07-15 12:53:22'),
(24, 4, 'La deuxième journée a été marquée par la visite du Directeur Commercial de Mayelia Academy, Marc-Antoine GNACADJA, qui est venu en partager la vision de l\'Académie avec les équipes et les participants. À travers des échanges enrichissants, des conseils personnalisés et la présentation des différents programmes de formation, les visiteurs ont pu mieux comprendre les perspectives offertes par Mayelia Academy. La troisième journée a, quant à elle, confirmé cet engouement avec une affluence soutenue de jeunes désireux de construire leur avenir professionnel grâce à des formations orientées vers les métiers d\'avenir.', '/storage/uploads/JL17pja8ff66y9oajOjOw23Wx0rguv7MhO2S2fof.jpg', NULL, NULL, 1, '2026-07-15 12:53:22', '2026-07-15 12:53:22'),
(25, 4, 'La dernière journée de la FNER 2026 a constitué le point d\'orgue de cette participation, avec notamment la visite de Gah Roger, Maire de Bangolo, venu témoigner son intérêt pour les initiatives portées par Mayelia Academy. Au cours de cet événement, Mayelia Academy a présenté son programme ambitieux offrant 450 opportunités de formation à visée d\'insertion, un accompagnement personnalisé vers l\'emploi et un objectif de 75% d\'insertion professionnelle. Cette démarche s\'inscrit pleinement dans les ambitions du Programme Jeunesse du Gouvernement (PJGouv) en faveur de l\'autonomisation et de l\'insertion durable des jeunes.', '/storage/uploads/xAMh0B8roKDAwqLSnZDj9CJjvOFkI13RBflZSxFX.jpg', NULL, NULL, 2, '2026-07-15 12:53:22', '2026-07-15 12:53:22'),
(26, 4, 'En participant à la FNER 2026 aux côtés du Ministère de la Promotion de la Jeunesse, de l\'Insertion Professionnelle et du Service Civique et de l\'Agence Emploi Jeunes, Mayelia Academy confirme son rôle d\'acteur majeur de la formation professionnelle en Côte d\'Ivoire. Mayelia Academy remercie l\'ensemble des partenaires, des visiteurs et des jeunes qui lui ont accordé leur confiance tout au long de cette édition. Forte de cette dynamique, Mayelia Academy poursuivra sa mission : former, accompagner et insérer durablement les talents afin de répondre aux besoins des entreprises et de contribuer au développement économique du pays.', '/storage/uploads/NThrRO4MFGo040tXgfR5MKYrDLQNg90surBbkA8R.jpg', NULL, NULL, 3, '2026-07-15 12:53:22', '2026-07-15 12:53:22');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--



-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--



-- --------------------------------------------------------

--
-- Structure de la table `certificates`
--



--
-- Déchargement des données de la table `certificates`
--

INSERT INTO `certificates` (`id`, `ref`, `validated`, `cert_participant_id`, `cert_training_id`, `created_at`, `updated_at`) VALUES
(1, 'MAY-2025-0001', 0, 1, 1, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(2, 'MAY-2025-0002', 0, 2, 1, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(3, 'MAY-2025-0003', 0, 3, 2, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(4, 'MAY-2025-0004', 0, 4, 2, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(5, 'MAY-2025-0005', 0, 5, 3, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(6, 'MAY-2025-0006', 0, 6, 4, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(7, 'MAY-2025-0007', 0, 7, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(8, 'MAY-2025-0008', 0, 8, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(9, 'MAY-2025-0009', 0, 9, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(10, 'MAY-2025-0010', 0, 10, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(11, 'MAY-2025-0011', 0, 11, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(12, 'MAY-2025-0012', 0, 12, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(13, 'MAY-2025-0013', 0, 13, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(14, 'MAY-2025-0014', 0, 14, 5, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(15, 'MAY-2025-0015', 0, 15, 6, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(16, 'MAY-2025-0016', 0, 16, 6, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(17, 'MAY-2025-0017', 0, 17, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(18, 'MAY-2025-0018', 0, 18, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(19, 'MAY-2025-0019', 0, 19, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(20, 'MAY-2025-0020', 0, 20, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(21, 'MAY-2025-0021', 0, 21, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(22, 'MAY-2025-0022', 0, 22, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(23, 'MAY-2025-0023', 0, 23, 8, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(24, 'MAY-2025-0024', 0, 24, 9, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(25, 'MAY-2025-0025', 0, 25, 9, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(26, 'MAY-2025-0026', 0, 26, 9, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(27, 'MAY-2025-0027', 0, 27, 9, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(28, 'MAY-2025-0028', 0, 28, 10, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(29, 'MAY-2025-0029', 0, 29, 10, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(30, 'MAY-2025-0030', 0, 30, 10, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(31, 'MAY-2025-0031', 0, 31, 10, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(32, 'MAY-2025-0032', 0, 32, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(33, 'MAY-2025-0033', 0, 33, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(34, 'MAY-2025-0034', 0, 34, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(35, 'MAY-2025-0035', 0, 35, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(36, 'MAY-2025-0036', 0, 36, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(37, 'MAY-2025-0037', 0, 37, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(38, 'MAY-2025-0038', 0, 38, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(39, 'MAY-2025-0039', 0, 39, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(40, 'MAY-2025-0040', 0, 40, 11, '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(41, 'MAY-2025-0041', 0, 41, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(42, 'MAY-2025-0042', 0, 42, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(43, 'MAY-2025-0043', 0, 43, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(44, 'MAY-2025-0044', 0, 44, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(45, 'MAY-2025-0045', 0, 45, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(46, 'MAY-2025-0046', 0, 46, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(47, 'MAY-2025-0047', 0, 47, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(48, 'MAY-2025-0048', 0, 48, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(49, 'MAY-2025-0049', 0, 49, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(50, 'MAY-2025-0050', 0, 50, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(51, 'MAY-2025-0051', 0, 51, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(52, 'MAY-2025-0052', 0, 52, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(53, 'MAY-2025-0053', 0, 53, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(54, 'MAY-2025-0054', 0, 54, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(55, 'MAY-2025-0055', 0, 55, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(56, 'MAY-2025-0056', 0, 56, 11, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(57, 'MAY-2025-0057', 0, 57, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(58, 'MAY-2025-0058', 0, 58, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(59, 'MAY-2025-0059', 0, 59, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(60, 'MAY-2025-0060', 0, 60, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(61, 'MAY-2025-0061', 0, 61, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(62, 'MAY-2025-0062', 0, 62, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(63, 'MAY-2025-0063', 0, 63, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(64, 'MAY-2025-0064', 0, 64, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(65, 'MAY-2025-0065', 0, 65, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(66, 'MAY-2025-0066', 0, 66, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(67, 'MAY-2025-0067', 0, 67, 12, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(68, 'MAY-2026-0001', 0, 68, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(69, 'MAY-2026-0002', 0, 69, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(70, 'MAY-2026-0003', 0, 70, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(71, 'MAY-2026-0004', 0, 71, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(72, 'MAY-2026-0005', 0, 72, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(73, 'MAY-2026-0006', 0, 73, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(74, 'MAY-2026-0007', 0, 74, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(75, 'MAY-2026-0008', 0, 75, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(76, 'MAY-2026-0009', 0, 76, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(77, 'MAY-2026-0010', 0, 77, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(78, 'MAY-2026-0011', 0, 78, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(79, 'MAY-2026-0012', 0, 79, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(80, 'MAY-2026-0013', 0, 80, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(81, 'MAY-2026-0014', 0, 81, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(82, 'MAY-2026-0015', 0, 82, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(83, 'MAY-2026-0016', 0, 83, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(84, 'MAY-2026-0017', 0, 84, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(85, 'MAY-2026-0018', 0, 85, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(86, 'MAY-2026-0019', 0, 86, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(87, 'MAY-2026-0020', 0, 87, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(88, 'MAY-2026-0021', 0, 88, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(89, 'MAY-2026-0022', 0, 89, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(90, 'MAY-2026-0023', 0, 90, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(91, 'MAY-2026-0024', 0, 91, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(92, 'MAY-2026-0025', 0, 92, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(93, 'MAY-2026-0026', 0, 93, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(94, 'MAY-2026-0027', 0, 94, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(95, 'MAY-2026-0028', 0, 95, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(96, 'MAY-2026-0029', 0, 96, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(97, 'MAY-2026-0030', 0, 97, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(98, 'MAY-2026-0031', 0, 98, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(99, 'MAY-2026-0032', 0, 99, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(100, 'MAY-2026-0033', 0, 100, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(101, 'MAY-2026-0034', 0, 101, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(102, 'MAY-2026-0035', 0, 102, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(103, 'MAY-2026-0036', 0, 103, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(104, 'MAY-2026-0037', 0, 104, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(105, 'MAY-2026-0038', 0, 105, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(106, 'MAY-2026-0039', 0, 106, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(107, 'MAY-2026-0040', 0, 107, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(108, 'MAY-2026-0041', 0, 108, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(109, 'MAY-2026-0042', 0, 109, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(110, 'MAY-2026-0043', 0, 110, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(111, 'MAY-2026-0044', 0, 111, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(112, 'MAY-2026-0045', 0, 112, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(113, 'MAY-2026-0046', 0, 113, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(114, 'MAY-2026-0047', 0, 114, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(115, 'MAY-2026-0048', 0, 115, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(116, 'MAY-2026-0049', 0, 116, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(117, 'MAY-2026-0050', 0, 117, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(118, 'MAY-2026-0051', 0, 118, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(119, 'MAY-2026-0052', 0, 119, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(120, 'MAY-2026-0053', 0, 120, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(121, 'MAY-2026-0054', 0, 121, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(122, 'MAY-2026-0055', 0, 122, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(123, 'MAY-2026-0056', 0, 123, 13, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(124, 'MAY-2026-0057', 0, 124, 14, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(125, 'MAY-2026-0058', 0, 125, 15, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(126, 'MAY-2026-0059', 0, 126, 15, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(127, 'MAY-2026-0060', 0, 127, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(128, 'MAY-2026-0061', 0, 128, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(129, 'MAY-2026-0062', 0, 129, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(130, 'MAY-2026-0063', 0, 130, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(131, 'MAY-2026-0064', 0, 131, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(132, 'MAY-2026-0065', 0, 132, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(133, 'MAY-2026-0066', 0, 133, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(134, 'MAY-2026-0067', 0, 134, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(135, 'MAY-2026-0068', 0, 135, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(136, 'MAY-2026-0069', 0, 136, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(137, 'MAY-2026-0070', 0, 137, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(138, 'MAY-2026-0071', 0, 138, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(139, 'MAY-2026-0072', 0, 139, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(140, 'MAY-2026-0073', 0, 140, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(141, 'MAY-2026-0074', 0, 141, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(142, 'MAY-2026-0075', 0, 142, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(143, 'MAY-2026-0076', 0, 143, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(144, 'MAY-2026-0077', 0, 144, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(145, 'MAY-2026-0078', 0, 145, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(146, 'MAY-2026-0079', 0, 146, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(147, 'MAY-2026-0080', 0, 147, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(148, 'MAY-2026-0081', 0, 148, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(149, 'MAY-2026-0082', 0, 149, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(150, 'MAY-2026-0083', 0, 150, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(151, 'MAY-2026-0084', 0, 151, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(152, 'MAY-2026-0085', 0, 152, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(153, 'MAY-2026-0086', 0, 153, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(154, 'MAY-2026-0087', 0, 11, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(155, 'MAY-2026-0088', 0, 154, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(156, 'MAY-2026-0089', 0, 155, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(157, 'MAY-2026-0090', 0, 156, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(158, 'MAY-2026-0091', 0, 157, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(159, 'MAY-2026-0092', 0, 158, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(160, 'MAY-2026-0093', 0, 159, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(161, 'MAY-2026-0094', 0, 160, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(162, 'MAY-2026-0095', 0, 161, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(163, 'MAY-2026-0096', 0, 162, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(164, 'MAY-2026-0097', 0, 163, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(165, 'MAY-2026-0098', 0, 164, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(166, 'MAY-2026-0099', 0, 165, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(167, 'MAY-2026-0100', 0, 166, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(168, 'MAY-2026-0101', 0, 167, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(169, 'MAY-2026-0102', 0, 168, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(170, 'MAY-2026-0103', 0, 169, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(171, 'MAY-2026-0104', 0, 170, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(172, 'MAY-2026-0105', 0, 171, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(173, 'MAY-2026-0106', 0, 172, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(174, 'MAY-2026-0107', 0, 173, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(175, 'MAY-2026-0108', 0, 174, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(176, 'MAY-2026-0109', 0, 175, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(177, 'MAY-2026-0110', 0, 176, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(178, 'MAY-2026-0111', 0, 177, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(179, 'MAY-2026-0112', 0, 178, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(180, 'MAY-2026-0113', 0, 179, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(181, 'MAY-2026-0114', 0, 180, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(182, 'MAY-2026-0115', 0, 181, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(183, 'MAY-2026-0116', 0, 182, 16, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(184, 'MAY-2026-0117', 1, 183, 17, '2026-07-03 09:58:47', '2026-07-05 03:53:47'),
(185, 'MAY-2026-0118', 1, 184, 17, '2026-07-03 09:58:47', '2026-07-05 03:53:59'),
(186, 'MAY-2026-0119', 1, 185, 17, '2026-07-03 09:58:47', '2026-07-06 14:53:04'),
(187, 'MAY-2026-0120', 1, 186, 17, '2026-07-03 09:58:47', '2026-07-06 14:53:30'),
(188, 'MAY-2026-0121', 1, 187, 17, '2026-07-03 09:58:47', '2026-07-06 14:53:48'),
(189, 'MAY-2026-0122', 1, 188, 17, '2026-07-03 09:58:47', '2026-07-06 14:54:03'),
(190, 'MAY-2026-0123', 1, 189, 17, '2026-07-03 09:58:47', '2026-07-06 14:54:17'),
(191, 'MAY-2026-0124', 1, 190, 17, '2026-07-03 09:58:47', '2026-07-06 14:54:29'),
(192, 'MAY-2026-0125', 1, 61, 17, '2026-07-03 09:58:47', '2026-07-06 14:54:42'),
(193, 'MAY-2026-0126', 1, 58, 17, '2026-07-03 09:58:47', '2026-07-06 14:54:48'),
(194, 'MAY-2026-0127', 1, 183, 18, '2026-07-03 09:58:47', '2026-07-03 13:28:19'),
(195, 'MAY-2026-0128', 1, 184, 18, '2026-07-03 09:58:47', '2026-07-03 14:00:37'),
(196, 'MAY-2026-0129', 1, 185, 18, '2026-07-03 09:58:47', '2026-07-03 14:12:19'),
(197, 'MAY-2026-0130', 1, 186, 18, '2026-07-03 09:58:47', '2026-07-03 14:20:17'),
(198, 'MAY-2026-0131', 1, 187, 18, '2026-07-03 09:58:47', '2026-07-06 14:02:11'),
(199, 'MAY-2026-0132', 1, 188, 18, '2026-07-03 09:58:47', '2026-07-06 14:02:17'),
(200, 'MAY-2026-0133', 1, 189, 18, '2026-07-03 09:58:47', '2026-07-06 14:02:26'),
(201, 'MAY-2026-0134', 1, 190, 18, '2026-07-03 09:58:47', '2026-07-06 14:02:34'),
(202, 'MAY-2026-0135', 1, 61, 18, '2026-07-03 09:58:47', '2026-07-06 14:02:43'),
(203, 'MAY-2026-0136', 1, 58, 18, '2026-07-03 09:58:47', '2026-07-06 14:03:00'),
(204, 'MAY-2026-0137', 0, 191, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(205, 'MAY-2026-0138', 0, 192, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(206, 'MAY-2026-0139', 0, 193, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(207, 'MAY-2026-0140', 0, 194, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(208, 'MAY-2026-0141', 0, 195, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(209, 'MAY-2026-0142', 0, 196, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(210, 'MAY-2026-0143', 0, 197, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(211, 'MAY-2026-0144', 0, 198, 19, '2026-07-03 09:58:47', '2026-07-03 09:58:47');

-- --------------------------------------------------------

--
-- Structure de la table `cert_participants`
--



--
-- Déchargement des données de la table `cert_participants`
--

INSERT INTO `cert_participants` (`id`, `civility`, `full_name`, `created_at`, `updated_at`) VALUES
(1, 'M.', 'Marie Prudence Bationo', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(2, 'M.', 'Fred Kone', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(3, 'M.', 'Claver Koffi', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(4, 'M.', 'Noura Kouassi', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(5, 'M.', 'Yann Tanon', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(6, 'M.', 'Toure Abass', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(7, 'M.', 'Douka Louise', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(8, 'M.', 'Eyrokon Cynthia', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(9, 'M.', 'Djambra Yao Ahou Marie Rosine', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(10, 'M.', 'Goore Rebecca', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(11, 'M.', 'Sahi Mansier Jores', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(12, 'M.', 'Adje Reine Patricia', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(13, 'M.', 'Attoumbre Amoin Naomi', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(14, 'M.', 'Bouanh Linda Sylviane', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(15, 'M.', 'Diezou Liliane Pelagie', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(16, 'M.', 'Zeba Guegue Cardaire', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(17, 'M.', 'Zene Dekaho Fernand', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(18, 'M.', 'Sala Pacom', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(19, 'M.', 'Sekongo Nawa Daniel', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(20, 'M.', 'Anzia Ayemian Daniel', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(21, 'M.', 'Traore Vakaba', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(22, 'M.', 'Kouame Kassi Narcisse', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(23, 'M.', 'Silue Namogo Ali', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(24, 'M.', 'Kobenan Kouakou', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(25, 'M.', 'Coulibaly Saragolo Joseph', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(26, 'M.', 'Kouyate Drissa', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(27, 'M.', 'Koffi Yao Donatien', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(28, 'M.', 'Coulibaly Adama', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(29, 'M.', 'Kouame Kouakou Jean Paul', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(30, 'M.', 'Kouassi Tah Kouablan Jean', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(31, 'M.', 'Krou Ano Boua Lazare', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(32, 'M.', 'Tanobian Emile', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(33, 'M.', 'Tewa Jules', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(34, 'M.', 'Houssou Emmanuel', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(35, 'M.', 'Oupoh Joel', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(36, 'M.', 'Zran Mahomet', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(37, 'M.', 'Etchri Anna Maria', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(38, 'M.', 'N\'Goran Kouame', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(39, 'M.', 'Moro Jean Luc', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(40, 'M.', 'Diabate Falicou', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(41, 'M.', 'Yousif Raby', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(42, 'M.', 'Kone Adama', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(43, 'M.', 'Yao Ildever', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(44, 'M.', 'Ouedraogo Deborah', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(45, 'M.', 'Maho Vales', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(46, 'M.', 'Kodia Jessica', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(47, 'M.', 'Kone Ousmane', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(48, 'M.', 'Ouattara Marie-Edith', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(49, 'M.', 'Tiemon Leatitia', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(50, 'M.', 'Fofana Kady Anicette', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(51, 'M.', 'Doumbia Hamed', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(52, 'M.', 'Diomande Sory', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(53, 'M.', 'Fatokoun Manasse', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(54, 'M.', 'Oba Loic', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(55, 'M.', 'Mady Pregnon', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(56, 'M.', 'Agath Amoin Epse Tra Bi', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(57, 'M.', 'Kouame Affoue Rachelle', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(58, 'M.', 'N\'Cho Regina', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(59, 'M.', 'Sylla Generosa', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(60, 'M.', 'M\'Bra Bryan', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(61, 'M.', 'Diabate Karim', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(62, 'M.', 'Doumbia Moustapha', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(63, 'M.', 'Guei Sokpo Jean Claude', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(64, 'M.', 'Appia Brou Emmanuella', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(65, 'M.', 'Sidibe Kadara Bamody', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(66, 'M.', 'Yoboue Firmin Verdier', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(67, 'M.', 'Marico Mariam', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(68, 'M.', 'Traore Mohamed Alpha', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(69, 'M.', 'Ouattara Daouda', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(70, 'M.', 'Degbe Kodjovi', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(71, 'M.', 'Bahan Claude', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(72, 'M.', 'Assamoi Ekouho Fabrice', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(73, 'M.', 'Kouakou Brahim', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(74, 'M.', 'Kacou Lidji Georges', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(75, 'M.', 'Djedje Yace Camille', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(76, 'M.', 'Kouakou Roland', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(77, 'M.', 'Kore Martial', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(78, 'M.', 'Makre Josué', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(79, 'M.', 'Doukoure Aboubakar', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(80, 'M.', 'Kouyo Hervé', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(81, 'M.', 'Toure Moussa', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(82, 'M.', 'Onane Shalom', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(83, 'M.', 'Kouakou N\'guessan Paul', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(84, 'M.', 'Dohou Serge', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(85, 'M.', 'Kone Aboubacar', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(86, 'M.', 'Ouattara Tidjane', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(87, 'M.', 'Soro Issouf', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(88, 'M.', 'Nikiema Ali', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(89, 'M.', 'Yeo Michel', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(90, 'M.', 'Kone Kalpi Raymond', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(91, 'M.', 'Ya N\'guessan Medard', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(92, 'M.', 'Koulibali Sonfolo', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(93, 'M.', 'Mariko Mohamed', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(94, 'M.', 'Dembele Mohamed', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(95, 'M.', 'Assovie Guy Roland Essetchy', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(96, 'M.', 'Kone Salif', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(97, 'M.', 'Badolo Aubin', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(98, 'M.', 'Diarrassouba Aboubacary', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(99, 'M.', 'Bosco Woila', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(100, 'M.', 'Zoue David Gogo', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(101, 'M.', 'Toe Alassane', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(102, 'M.', 'Lengane Rock', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(103, 'M.', 'Komlan Jean', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(104, 'M.', 'Yeo Edoh Richmond', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(105, 'M.', 'Traore Abdramane', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(106, 'M.', 'Traore Amadou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(107, 'M.', 'Traore Moussa', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(108, 'M.', 'Djo Konan Hugues Geoffroy', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(109, 'M.', 'Cisse Bangaly', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(110, 'M.', 'Diarra Ibrahima', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(111, 'M.', 'Hebie Yves', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(112, 'M.', 'Hebie Laurent Jaures', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(113, 'M.', 'Sombie Adama', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(114, 'M.', 'Sourabie Madou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(115, 'M.', 'Sylla Oumar', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(116, 'M.', 'Desouza Evrad', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(117, 'M.', 'Ouattara Soumaïla', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(118, 'M.', 'Kadjo Aimond', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(119, 'M.', 'Kone Sinaly', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(120, 'M.', 'Bamba Gueye Mouhamadou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(121, 'M.', 'Feuwe Motho', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(122, 'M.', 'Nacoulma Adama', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(123, 'M.', 'Traore Lassine', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(124, 'M.', 'Kra Genevieve', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(125, 'M.', 'Titi Yannick', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(126, 'M.', 'Acka Serge', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(127, 'M.', 'Sanogo Hamed', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(128, 'M.', 'Kouadio Konan Herve', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(129, 'M.', 'Yoboue Euphrasie', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(130, 'M.', 'Yao Moundou Celine', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(131, 'M.', 'Nanou Jean Patrice', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(132, 'M.', 'Ano Jean De Dieu', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(133, 'M.', 'Kone Dola', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(134, 'M.', 'Tode Mikhael Ange', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(135, 'M.', 'N\'Goran Kouassi Achille', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(136, 'M.', 'Kouassi Sam Boris', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(137, 'M.', 'Soro Louise', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(138, 'M.', 'Soro Foungnigue Ibrahim', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(139, 'M.', 'Aka Elvis', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(140, 'M.', 'Erokon Cynthia', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(141, 'M.', 'Yapi Flore', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(142, 'M.', 'Brou Arethin', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(143, 'M.', 'Niamke Archille', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(144, 'M.', 'Kouakou Kablan Pierre', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(145, 'M.', 'Akpossan Amon', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(146, 'M.', 'Affoumon Youwa Rocksane', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(147, 'M.', 'Kangah Henry Joel', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(148, 'M.', 'Fanny Diatou Melessie', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(149, 'M.', 'Yoboue Brigitte', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(150, 'M.', 'Toure Vamouty', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(151, 'M.', 'Cisse Babacar El Ibrahim', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(152, 'M.', 'Abo Pacôme', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(153, 'M.', 'N\'Dri Francois De Sales', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(154, 'M.', 'N\'Goran Aya Joelle', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(155, 'M.', 'Behi Koffi Toussain', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(156, 'M.', 'Kouakou N\'Dri Alphonse', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(157, 'M.', 'Yaon Goulehi', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(158, 'M.', 'Thio Landry', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(159, 'M.', 'Cisse Almamy', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(160, 'M.', 'Sinaly Dembele', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(161, 'M.', 'N\'Goran Kouadio E.', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(162, 'M.', 'Kouakou Abran Angele', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(163, 'M.', 'Ouattara Adama', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(164, 'M.', 'Fahe Hermann', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(165, 'M.', 'Koffi Jean Yves', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(166, 'M.', 'Koffi Yao Cedecial', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(167, 'M.', 'Diomande Douhin', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(168, 'M.', 'N\'Guettia Kouadio Jean', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(169, 'M.', 'Dehi Xavier Yannick', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(170, 'M.', 'Sangare Ibrahima', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(171, 'M.', 'Brou Kouassi Wilfried Idriss', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(172, 'M.', 'N\'Guessan Franck', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(173, 'M.', 'Yao Richmonde', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(174, 'M.', 'Mone Chia Francoise', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(175, 'M.', 'Kouakou Kouadio Kevin', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(176, 'M.', 'Coulibaly Migafona Abou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(177, 'M.', 'Tchiame Kouame Epse Yao', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(178, 'M.', 'Akpatou Manuella Epse Kouakou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(179, 'M.', 'Douka Kouadio', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(180, 'M.', 'Pepalla Kouman Arnold', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(181, 'M.', 'Gnassou Jean Charles', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(182, 'M.', 'Djike Raïssa Epse N\'Dri', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(183, 'M.', 'Kodjo Laurent', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(184, 'M.', 'Ebrottie Kouadio Joel', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(185, 'M.', 'N\'Depo Akichi Cyrille Narcisse', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(186, 'M.', 'Tetialy Kablan Richard', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(187, 'M.', 'Kossonou Yao Kouman Eric', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(188, 'M.', 'Bamba Ismail', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(189, 'M.', 'Coulibaly Abdourahamane Kokinde', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(190, 'M.', 'Sylla Blondel Erudy', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(191, 'M.', 'Kouie Mahan Olivier', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(192, 'M.', 'Togo Yaya', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(193, 'M.', 'Kouadio Kouakou Jean Michel', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(194, 'M.', 'Togo Sadou', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(195, 'M.', 'Kone Ayyoube', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(196, 'M.', 'Sawadogo Harouna', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(197, 'M.', 'Deime Boureima', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(198, 'M.', 'Tia Alexis', '2026-07-03 09:58:47', '2026-07-03 09:58:47');

-- --------------------------------------------------------

--
-- Structure de la table `cert_ref_counters`
--



--
-- Déchargement des données de la table `cert_ref_counters`
--

INSERT INTO `cert_ref_counters` (`id`, `year`, `last_number`, `created_at`, `updated_at`) VALUES
(1, 2025, 67, '2026-07-03 09:58:46', '2026-07-03 09:58:47'),
(2, 2026, 144, '2026-07-03 09:58:47', '2026-07-03 09:58:47');

-- --------------------------------------------------------

--
-- Structure de la table `cert_trainings`
--



--
-- Déchargement des données de la table `cert_trainings`
--

INSERT INTO `cert_trainings` (`id`, `title`, `client`, `start_date`, `end_date`, `issue_place`, `issue_date`, `created_at`, `updated_at`) VALUES
(1, 'Outil de contrôle de gestion et analyse de données', 'MACI', '2025-02-17', '2025-02-20', 'Abidjan', '2025-02-20', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(2, 'Outil informatique des comptabilités et fiscalités', 'MACI', '2025-02-17', '2025-02-18', 'Abidjan', '2025-02-18', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(3, 'Outil informatique de secrétariat et de fiscalité', 'MACI', '2025-02-24', '2025-02-27', 'Abidjan', '2025-02-27', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(4, 'Gestion du patrimoine', 'MACI', '2025-03-03', '2025-03-05', 'Abidjan', '2025-03-05', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(5, 'Bureautique pack office', 'MACI', '2025-06-02', '2025-06-03', 'Abidjan', '2025-06-03', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(6, 'Sécurité routière et conduite défensive', 'NSIA Assurances', '2025-06-03', '2025-06-03', 'Abidjan', '2025-06-03', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(7, 'Sécurité routière et conduite défensive', 'NSIA Assurances', '2025-09-24', '2025-09-24', 'Abidjan', '2025-09-24', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(8, 'Soudure Tig Mig', 'La Route Africaine', '2025-10-13', '2025-10-15', 'Abidjan', '2025-10-15', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(9, 'Maintenance véhicule', 'La Route Africaine', '2025-10-13', '2025-10-16', 'Abidjan', '2025-10-16', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(10, 'Conduite de Grue', 'La Route Africaine', '2025-10-16', '2025-10-17', 'Abidjan', '2025-10-17', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(11, 'Bureautique', 'La Tulipe Food', '2025-10-14', '2025-10-17', 'Abidjan', '2025-10-17', '2026-07-03 09:58:46', '2026-07-03 09:58:46'),
(12, 'Formation des formateurs', 'K1 Mining SA', '2025-11-03', '2025-11-05', 'Abidjan', '2025-11-05', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(13, 'Maintenance des véhicules électriques', 'Ngêlê', '2026-03-02', '2026-03-04', 'Abidjan', '2026-03-04', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(14, 'Gestion de trésorerie', 'MACI', '2026-03-30', '2026-03-31', 'Abidjan', '2026-03-31', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(15, 'Management commercial', 'MACI', '2026-03-01', '2026-03-02', 'Abidjan', '2026-03-02', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(16, 'Recyclage de contrôle technique', 'MACI', '2026-05-01', '2026-05-31', 'Abidjan', '2026-05-31', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(17, 'ICAM', 'K1 Mining SA', '2026-05-27', '2026-05-29', 'Abidjan', '2026-05-29', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(18, 'Lead investigator', 'K1 Mining SA', '2026-05-30', '2026-05-30', 'Abidjan', '2026-05-30', '2026-07-03 09:58:47', '2026-07-03 09:58:47'),
(19, 'Conduite des chariots de manutention', 'La Tulipe Food', '2026-01-01', '2026-01-01', 'Abidjan', '2026-01-01', '2026-07-03 09:58:47', '2026-07-03 09:58:47');

-- --------------------------------------------------------

--
-- Structure de la table `conseils`
--



-- --------------------------------------------------------

--
-- Structure de la table `conseil_paragraphs`
--



-- --------------------------------------------------------

--
-- Structure de la table `contact_messages`
--



-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--



-- --------------------------------------------------------

--
-- Structure de la table `faqs`
--



--
-- Déchargement des données de la table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `sort_order`, `published`, `created_at`, `updated_at`) VALUES
(1, 'Pourquoi choisir Mayelia Academy pour se former ?', 'Mayelia Academy offre une formation pratique, professionnalisante axée sur l\'employabilité, dispensée par des experts certifiés.', 0, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(2, 'Quels avantages exclusifs offrent vos formations ?', 'Nous offrons une formation orientée terrain, des stages pratiques et un accompagnement à l\'insertion professionnelle.', 1, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(3, 'Peut-on travailler après une formation à Mayelia Academy ?', 'Oui, nos programmes sont conçus pour favoriser une insertion rapide grâce à nos liens avec les filiales du groupe Mayelia et nos partenaires.', 2, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(4, 'Vos formations sont-elles ouvertes aux débutants ?', 'Oui, certains programmes sont accessibles sans prérequis, avec un apprentissage progressif et encadré.', 3, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(5, 'Les formations sont-elles accessibles financièrement ?', 'Oui, nos tarifs sont étudiés pour rester accessibles, avec des facilités de paiement selon les programmes.', 4, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(6, 'Les formations sont-elles certifiées ou reconnues ?', 'Oui, nos formations sont organisées selon des standards professionnels validés et certaines bénéficient de reconnaissances institutionnelles et sectorielles.', 5, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(7, 'À qui s\'adressent les formations de Mayelia Academy ?', 'Nos formations s\'adressent aux jeunes diplômés, professionnels du secteur automobile, entrepreneurs et à toute personne souhaitant se spécialiser dans nos différents domaines de formations.', 6, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(8, 'À quelle fréquence démarrez-vous les sessions de formation ?', 'Plusieurs sessions sont ouvertes chaque année selon les filières.', 7, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(9, 'Comment être informé des nouvelles formations ?', 'Via notre site internet, nos réseaux sociaux ou en contactant directement Mayelia Academy.', 8, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(10, 'Mayelia Academy propose-t-elle des formations pour les entreprises ?', 'Oui, nous développons des programmes sur mesure pour les entreprises désirant faire former leurs employés.', 9, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(11, 'Organisez-vous des formations en intra-entreprise ?', 'Oui, nos équipes peuvent intervenir directement au sein de votre structure.', 10, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(12, 'Proposez-vous des formations en sécurité routière pour les entreprises ?', 'Oui, nous accompagnons les entreprises dans la sensibilisation et la prévention des risques routiers.', 11, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(13, 'Comment devenir partenaire de Mayelia Academy ?', 'Il suffit de nous contacter via nos canaux officiels pour étudier un partenariat adapté à vos besoins.', 12, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16'),
(14, 'Comment obtenir plus d\'informations sur une formation ?', 'Vous pouvez nous contacter par téléphone, par e-mail, via nos réseaux sociaux ou en vous rendant directement dans nos locaux.', 13, 1, '2026-06-16 22:01:16', '2026-06-16 22:01:16');

-- --------------------------------------------------------

--
-- Structure de la table `formation_domaines`
--



--
-- Déchargement des données de la table `formation_domaines`
--

INSERT INTO `formation_domaines` (`id`, `slug`, `title`, `icon_key`, `color_tailwind`, `gradient_tailwind`, `image_url`, `sort_order`, `created_at`, `updated_at`) VALUES
(16, 'chauffeur-securite', 'Formation des Chauffeurs et Sécurité Routière', 'truck', 'from-orange-500 to-red-500', 'from-orange-500/10 to-red-500/10', '/storage/uploads/b6qOwyWaOhQoLCiSIkeHNeNI5r0JG7n9zDj7onr6.png', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(17, 'technicien-polyvalent', 'Technicien Polyvalent', 'wrench', 'from-blue-500 to-cyan-500', 'from-blue-500/10 to-cyan-500/10', 'src/assets/formation/tp.png', 1, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(18, 'competences-informatiques', 'Compétences Informatiques', 'monitor', 'from-purple-500 to-pink-500', 'from-purple-500/10 to-pink-500/10', 'src/assets/formation/informatique.png', 2, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(19, 'prevention-securite', 'Prévention et Sécurité au Travail', 'shield', 'from-green-500 to-emerald-500', 'from-green-500/10 to-emerald-500/10', 'src/assets/formation/securite.png', 3, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(20, 'relation-client', 'Relation Client', 'users', 'from-pink-500 to-rose-500', 'from-pink-500/10 to-rose-500/10', 'src/assets/formation/relation-client.png', 4, '2026-07-14 22:26:10', '2026-07-14 22:26:10');

-- --------------------------------------------------------

--
-- Structure de la table `formation_programmes`
--



--
-- Déchargement des données de la table `formation_programmes`
--

INSERT INTO `formation_programmes` (`id`, `domaine_id`, `title`, `description`, `contenus_json`, `objectifs_json`, `sort_order`, `created_at`, `updated_at`) VALUES
(61, 16, 'Conduite Défensive', 'Enseigner les techniques de conduite préventive visant à minimiser les risques d\'accidents et à améliorer la sécurité sur la route.', '[\"Techniques d\'anticipation et gestion des dangers\",\"Ma\\u00eetrise des distances de s\\u00e9curit\\u00e9 et conduite en conditions difficiles\",\"R\\u00e9action face aux situations d\'urgence et freinage d\'urgence\"]', '[\"Anticiper les comportements impr\\u00e9visibles des autres usagers\",\"R\\u00e9duire les risques li\\u00e9s \\u00e0 la conduite en milieu urbain et sur les routes\",\"Adopter une conduite plus s\\u00e9curitaire et \\u00e9conomique\"]', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(62, 16, 'Simulateur de conduite', 'Formation immersive sur simulateur de dernière génération certifié CODES ROUSSEAU (leader européen de la sécurité routière) pour véhicules légers et poids lourds. Une innovation pédagogique offrant un apprentissage réaliste et sécurisé.', '[\"Formation immersive et r\\u00e9aliste adapt\\u00e9e aux d\\u00e9butants comme aux conducteurs exp\\u00e9riment\\u00e9s\",\"Apprentissage de la conduite d\\u00e9fensive dans divers environnements : circulation urbaine, conditions m\\u00e9t\\u00e9orologiques difficiles, freinages d\'urgence, situations \\u00e0 risques, obstacles impr\\u00e9vus\",\"\\u00c9valuation objective, personnalis\\u00e9e et suivi pr\\u00e9cis des performances de chaque apprenant\"]', '[\"B\\u00e9n\\u00e9ficier d\'une formation immersive et s\\u00e9curis\\u00e9e gr\\u00e2ce \\u00e0 des outils technologiques avanc\\u00e9s\",\"Apprendre la conduite d\\u00e9fensive dans des environnements vari\\u00e9s sans risques r\\u00e9els\",\"R\\u00e9duire significativement les risques li\\u00e9s \\u00e0 l\'apprentissage en conditions r\\u00e9elles\",\"Recevoir une \\u00e9valuation objective et personnalis\\u00e9e de ses performances\",\"Renforcer l\'engagement de Mayelia Academy pour une formation moderne et orient\\u00e9e vers l\'excellence\"]', 1, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(63, 16, 'Renforcement de Capacités et Recyclage Chauffeurs', 'Elle est destinée à améliorer les compétences, faire la mise à jour des connaissances et sensibiliser les chauffeurs sur les nouvelles réglementations et technologies de conduite.', '[\"R\\u00e9vision des r\\u00e8gles de s\\u00e9curit\\u00e9 routi\\u00e8re et techniques de conduite d\\u00e9fensive\",\"Ma\\u00eetrise des v\\u00e9hicules et optimisation de la consommation de carburant\",\"Gestion des situations d\'urgence et pr\\u00e9vention des risques routiers\"]', '[\"Actualiser les connaissances sur les r\\u00e8gles de s\\u00e9curit\\u00e9 routi\\u00e8re et de s\\u00e9curit\\u00e9\",\"Renforcer les comp\\u00e9tences pour une conduite plus efficace et s\\u00e9curitaire\",\"Sensibiliser aux nouveaux enjeux environnementaux et technologiques\"]', 2, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(64, 16, 'Conduite d\'Engin', 'Préparer les chauffeurs à la conduite de divers types d\'engins de chantier, en leur fournissant les compétences nécessaires pour garantir la sécurité et l\'efficacité sur les chantiers.', '[\"Introduction aux diff\\u00e9rents types d\'engins et leurs sp\\u00e9cificit\\u00e9s\",\"Techniques de conduite s\\u00e9curis\\u00e9e et man\\u0153uvres de pr\\u00e9cision\",\"Pratiques sur le terrain et simulations d\'op\\u00e9rations\"]', '[\"Acqu\\u00e9rir les comp\\u00e9tences techniques pour la conduite d\'engins de chantier (bulldozers, pelleteuses, etc.)\",\"Respecter les r\\u00e8gles de s\\u00e9curit\\u00e9 et les r\\u00e9glementations en vigueur lors des op\\u00e9rations\",\"Optimiser l\'utilisation des engins pour une meilleure productivit\\u00e9 sur le chantier\"]', 3, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(65, 16, 'Habilitation à la Conduite de Grue', 'Préparer les conducteurs à la conduite en toute sécurité de différents types de grues, en respectant les normes de sécurité et les réglementations en vigueur.', '[\"Principes de base de la conduite de grue\",\"S\\u00e9curit\\u00e9 et pr\\u00e9vention des risques li\\u00e9s \\u00e0 la manipulation de charges lourdes\",\"Conduite pratique et man\\u0153uvre sp\\u00e9cifique en conditions r\\u00e9elles\"]', '[\"Apprendre \\u00e0 manipuler et conduire des grues en toute s\\u00e9curit\\u00e9\",\"Conna\\u00eetre les r\\u00e8gles de s\\u00e9curit\\u00e9 li\\u00e9es \\u00e0 la conduite de grues\",\"Obtenir l\'habilitation n\\u00e9cessaire pour conduire des grues sur des chantiers ou en industrie\"]', 4, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(66, 16, 'Sécurité Routière', 'Aborder les règles et bonnes pratiques de la sécurité routière, visant à réduire les accidents et à favoriser une conduite plus responsable et sécurisée.', '[\"Analyse des causes d\'accidents et pr\\u00e9vention des risques\",\"Connaissance des r\\u00e8gles de circulation et des nouvelles r\\u00e9glementations\",\"Techniques de conduite s\\u00e9curitaire et gestion des situations critiques\"]', '[\"Sensibiliser aux risques routiers et aux comportements \\u00e0 risque\",\"Promouvoir une conduite respectueuse des r\\u00e8gles et des usagers\",\"R\\u00e9duire le nombre d\'accidents par l\'application de bonnes pratiques\"]', 5, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(67, 16, 'Formation Chauffeur de VTC', 'Permettre aux participants de répondre aux attentes des clients en termes de service, de sécurité, et de professionnalisme, tout en augmentant leur employabilité et leurs opportunités d\'évolution dans le secteur des VTC et du transport privé.', '[\"Techniques de conduite professionnelle et de s\\u00e9curit\\u00e9\",\"Gestion de la relation client et am\\u00e9lioration de l\'exp\\u00e9rience passager\",\"Connaissance de la r\\u00e9glementation et des responsabilit\\u00e9s de chauffeur VTC\"]', '[\"Former les participants aux standards de service et de s\\u00e9curit\\u00e9 de l\\u2019industrie VTC\",\"D\\u00e9velopper les comp\\u00e9tences en conduite, en service et en gestion de la client\\u00e8le\",\"Ma\\u00eetriser la r\\u00e9glementation et les bonnes pratiques sp\\u00e9cifiques au m\\u00e9tier de chauffeur VTC\"]', 6, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(68, 17, 'Maintenance de Véhicules', 'Fournir aux participants les compétences nécessaires pour réaliser la maintenance préventive et corrective des véhicules, garantissant ainsi leur bon fonctionnement et leur conformité lors des contrôles techniques.', '[\"Principes de fonctionnement des syst\\u00e8mes m\\u00e9caniques, \\u00e9lectriques et \\u00e9lectroniques des v\\u00e9hicules\",\"Techniques de diagnostic et de r\\u00e9paration des pannes\",\"Proc\\u00e9dure de maintenance pr\\u00e9ventive et v\\u00e9rification avant le contr\\u00f4le technique\"]', '[\"Ma\\u00eetriser les techniques de maintenance pr\\u00e9ventive et corrective sur diff\\u00e9rents types de v\\u00e9hicules\",\"Identifier et diagnostiquer les pannes courantes\",\"Assurer la conformit\\u00e9 des v\\u00e9hicules aux normes de s\\u00e9curit\\u00e9 et de contr\\u00f4le technique\"]', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(69, 17, 'Soudure TIG MIG', 'Permettre aux participants d\'acquérir les compétences nécessaires pour maîtriser les techniques de soudure TIG et MIG, adaptées à divers matériaux et situations industrielles.', '[\"Introduction aux principes de la soudure TIG et MIG\",\"Techniques de soudage sur diff\\u00e9rents mat\\u00e9riaux (acier, aluminium, etc.)\",\"S\\u00e9curit\\u00e9 et pr\\u00e9vention des risques en soudure\"]', '[\"Ma\\u00eetriser les proc\\u00e9d\\u00e9s de soudure TIG (Tungsten Inert Gas) et MIG (M\\u00e9tal Inert Gas)\",\"Apprendre \\u00e0 souder avec pr\\u00e9cision diff\\u00e9rents types de m\\u00e9taux\",\"Assurer la qualit\\u00e9 des soudures en respectant les normes de s\\u00e9curit\\u00e9 et de productivit\\u00e9\"]', 1, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(70, 17, 'Maintenance Hydraulique', 'Permettre aux participants d\'acquérir les compétences nécessaires pour diagnostiquer, entretenir et réparer les systèmes hydrauliques, assurant ainsi leur bon fonctionnement et leur durabilité.', '[\"Etude des composants et circuits hydrauliques\",\"Analyse et diagnostic des pannes\",\"Bonnes pratiques de s\\u00e9curit\\u00e9 lors des interventions sur les syst\\u00e8mes hydrauliques\"]', '[\"Comprendre les principes de fonctionnement des circuits hydrauliques\",\"Diagnostiquer et r\\u00e9soudre les pannes sur les syst\\u00e8mes hydrauliques\",\"Appliquer des techniques de maintenance pr\\u00e9ventive et corrective\"]', 2, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(71, 17, 'Formation en Organe Moteur', 'Fournir une compréhension approfondie des composants et du fonctionnement des moteurs, ainsi que des compétences en diagnostic et en réparation.', '[\"Analyse des diff\\u00e9rents types de moteurs et de leurs composants\",\"Techniques de diagnostic et de r\\u00e9paration\",\"Maintenance pr\\u00e9ventive pour optimiser la dur\\u00e9e de vie des moteurs\"]', '[\"Comprendre les principes de fonctionnement des moteurs thermiques et \\u00e9lectriques\",\"Diagnostiquer les probl\\u00e8mes courants des organes moteurs\",\"Appliquer des techniques de maintenance pr\\u00e9ventive et corrective sur les moteurs\"]', 3, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(72, 17, 'Préparateur Technique et Maintenance de Véhicules', 'Préparer les véhicules au contrôle technique en réalisant un diagnostic complet et en effectuant les maintenances nécessaires pour garantir leur conformité.', '[\"Diagnostic des principaux syst\\u00e8mes (freins, \\u00e9clairage, ch\\u00e2ssis...)\",\"R\\u00e9paration et maintenance pr\\u00e9ventive des v\\u00e9hicules\",\"Connaissance des normes et r\\u00e9glementations en mati\\u00e8re de contr\\u00f4le technique\"]', '[\"Ma\\u00eetriser les v\\u00e9rifications techniques n\\u00e9cessaires avant le contr\\u00f4le\",\"Identifier et r\\u00e9soudre les dysfonctionnements pouvant affecter la conformit\\u00e9 des v\\u00e9hicules\",\"Assurer une maintenance pr\\u00e9ventive pour r\\u00e9duire les risques de contre-visite\"]', 4, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(73, 18, 'Outils Informatiques de Contrôle de Gestion et d\'Analyse de Données', 'Enseigner l\'utilisation des outils informatiques pour optimiser le contrôle de gestion et l\'analyse des données financières et opérationnelles, afin de faciliter la prise de décision stratégique.', '[\"Utilisation avanc\\u00e9e d\'Excel pour la gestion et l\'analyse de donn\\u00e9es\",\"Introduction aux outils d\'aide \\u00e0 la d\\u00e9cision (Power BI, tableaux de bord)\",\"Techniques d\'automatisation des processus financiers\"]', '[\"Ma\\u00eetriser les logiciels de gestion financi\\u00e8re et d\\u2019analyse de donn\\u00e9es (Excel, Power BI, etc.)\",\"Automatiser les processus de contr\\u00f4le de gestion \\u00e0 l\\u2019aide d\\u2019outils num\\u00e9riques\",\"Analyser les donn\\u00e9es pour am\\u00e9liorer la performance organisationnelle\"]', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(74, 18, 'Formation en Excel', 'Enseigner les formalités aux participants les fonctionnalités essentielles d’Excel pour une utilisation efficace dans la gestion des données, l’analyse et la création de rapports.', '[\"Introduire aux fonctionnalit\\u00e9s de base (cellule, lignes, colonnes)\",\"Utilisation des formules et fonctions avanc\\u00e9es\",\"Cr\\u00e9ation de tableaux et graphiques pour la visualisation des donn\\u00e9es\"]', '[\"Ma\\u00eetriser les outils de base et avanc\\u00e9s d\\u2019Excel pour optimiser la gestion des donn\\u00e9es\",\"Apprendre \\u00e0 cr\\u00e9er et g\\u00e9rer des tableaux, graphiques et formules\",\"D\\u00e9velopper des comp\\u00e9tences en analyse de donn\\u00e9es et en reporting\"]', 1, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(75, 18, 'Informatique et Management Opérationnel', 'Développer les compétences les compétences en informatique et en management pour une gestion efficace des opérations au sein de l’entreprise, en s’appuyant sur des outils technologiques.', '[\"Utilisation des outils informatiques pour la gestion des op\\u00e9rations\",\"Technique de management des \\u00e9quipes et gestion des processus\",\"Analyse de la performance \\u00e0 l\\u2019aide de logiciels de gestion et de suivi\"]', '[\"Ma\\u00eetriser les outils informatiques pour la gestion op\\u00e9rationnelle des activit\\u00e9s\",\"Am\\u00e9liorer les comp\\u00e9tences en management pour optimiser la productivit\\u00e9 et les performances\",\"Savoir analyser et prendre des d\\u00e9cisions strat\\u00e9giques en temps r\\u00e9el\"]', 2, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(76, 18, 'Outils Informatique, Secrétariat et Fiscalité', 'Développer les compétences les compétences en informatique et en management pour une gestion efficace des opérations au sein de l’entreprise, en s’appuyant sur des outils technologiques.', '[\"Utilisation des outils informatiques pour la gestion des op\\u00e9rations\",\"Technique de management des \\u00e9quipes et gestion des processus\",\"Analyse de la performance \\u00e0 l\\u2019aide de logiciels de gestion et de suivi\"]', '[\"Ma\\u00eetriser les outils informatiques pour la gestion op\\u00e9rationnelle des activit\\u00e9s\",\"Am\\u00e9liorer les comp\\u00e9tences en management pour optimiser la productivit\\u00e9 et les performances\",\"Savoir analyser et prendre des d\\u00e9cisions strat\\u00e9giques en temps r\\u00e9el\"]', 3, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(77, 18, 'Spécialité Plurivalentes de l\'Informatique', 'Formation polyvalente permettant d\'acquérir des compétences essentielles dans divers domaines de l\'informatique, allant de l\'utilisation des logiciels courants à la cybersécurité et la gestion des bases de données.', '[\"Utilisation des outils informatiques (Microsoft Office, gestion des fichiers)\",\"Introduction \\u00e0 la cybers\\u00e9curit\\u00e9 et protection des donn\\u00e9es\",\"Gestion de bases de donn\\u00e9es et administration de syst\\u00e8mes d\'exploitation\"]', '[\"Ma\\u00eetriser les outils informatiques de bases tels logiciels bureautiques\",\"Comprendre les principes de la cybers\\u00e9curit\\u00e9 et de la gestion des donn\\u00e9es\",\"Acqu\\u00e9rir des comp\\u00e9tences en syst\\u00e8mes d\'exploitation et administration de r\\u00e9seaux\"]', 4, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(78, 19, 'Sauveteur Secouriste du Travail (SST)', 'Permettre acquisition d\'acquérir les compétences nécessaires pour intervenir rapidement et efficacement en cas d\'accident de travail, en appliquant les gestes de premiers secours.', '[\"Prevention des risques et identification des situations dangereuses\",\"Apprentissage des gestes de premiers secours (massage cardiaque, arr\\u00eat des saignements, etc.)\",\"Mise en pratique sur des sc\\u00e9narios d\'accidents en milieu professionnel\"]', '[\"Former les participants \\u00e0 la pr\\u00e9vention des risques professionnels\",\"Apprendre les gestes de premiers secours \\u00e0 appliquer en cas d\\u2019accident de travail\",\"Garantir une r\\u00e9ponse rapide et efficace pour limiter les cons\\u00e9quences des accidents sur le lieu de travail\"]', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(79, 19, 'Sécurité Incendie', 'Permettre l\'acquisition des compétences nécessaires pour prévenir les risques d\'incendie, réagir rapidement en cas d\'urgence, et maîtriser les techniques d\'évacuation et d\'intervention en toute sécurité.', '[\"Prevention des risques d\\u2019incendie et r\\u00e8gle de s\\u00e9curit\\u00e9 incendie\",\"Utilisation des \\u00e9quipements de lutte contre l\\u2019incendie\",\"Mise en pratique \\u00e0 travers des simulations d\'\\u00e9vacuation et d\'intervention\"]', '[\"Former les participants \\u00e0 la pr\\u00e9vention des risques d\\u2019incendie\",\"Apprendre \\u00e0 manipuler les \\u00e9quipements de lutte contre l\\u2019incendie (extincteurs, alarmes, etc.)\",\"Ma\\u00eetriser les proc\\u00e9dures d\\u2019\\u00e9vacuation et de gestion des situations d\\u2019urgence\"]', 1, '2026-07-14 22:26:10', '2026-07-14 22:26:10'),
(80, 20, 'Service - Relation et Expérience Client', 'Cette formation enseigne aux participants les techniques et compétences pour offrir un service client exceptionnel, renforcer la satisfaction et fidéliser les clients.', '[\"Technique de communication et d\'\\u00e9coute client\",\"Principes de l\\u2019exp\\u00e9rience client et personnalisation du service\",\"Gestion des r\\u00e9clamations et situations conflictuelles\"]', '[\"D\\u00e9velopper les comp\\u00e9tences en communication et en \\u00e9coute active pour interagir efficacement avec les clients\",\"Am\\u00e9liorer l\\u2019exp\\u00e9rience client en apprenant \\u00e0 anticiper et \\u00e0 r\\u00e9pondre aux besoins des clients\",\"G\\u00e9rer les situations d\\u00e9licates avec professionnalisme pour renforcer la satisfaction et l\\u2019image de l\\u2019entreprise\"]', 0, '2026-07-14 22:26:10', '2026-07-14 22:26:10');

-- --------------------------------------------------------

--
-- Structure de la table `hero_slides`
--



--
-- Déchargement des données de la table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `sort_order`, `image_url`, `overlay_opacity`, `description`, `link_url`, `created_at`, `updated_at`) VALUES
(39, 0, '/storage/uploads/umn7JMR60t0IiSSiLUfTMTS5YzlabyUITOaA4wCz.png', 70, 'Façonnez votre avenir, maîtrisez les métiers de demain.', 'https://academy.mayeliamobilite.com/#formations', '2026-07-28 07:23:01', '2026-07-28 07:23:01'),
(40, 1, '/storage/uploads/du2qYzNlyKbaCT2fuKfJrNXeFUEbd6WchTbwscRS.png', 70, 'Prenez confiance au volant avec notre simulateur de conduite.', '/formations', '2026-07-28 07:23:01', '2026-07-28 07:23:01'),
(41, 2, '/storage/uploads/sRax9OhC6Ooqpwmb808JNTgfuMDN5wiw37cASwV6.png', 70, 'Boostez la performance de vos équipes et l\'excellence de votre entreprise.', '/contact', '2026-07-28 07:23:01', '2026-07-28 07:23:01');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--



-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--



-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--



--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_01_223908_create_personal_access_tokens_table', 1),
(5, '2026_05_01_224000_create_mayelia_content_tables', 1),
(6, '2026_05_01_230000_create_site_configs_table', 1),
(7, '2026_05_02_120000_add_published_to_actualites_table', 1),
(8, '2026_05_02_120000_create_partners_table', 1),
(9, '2026_05_02_140000_create_contact_messages_table', 1),
(10, '2026_05_03_140000_add_published_to_conseils_table', 1),
(11, '2026_05_03_150000_create_hero_slides_table', 1),
(12, '2026_05_04_120000_drop_category_from_conseils_table', 1),
(13, '2026_06_16_000000_create_faqs_table', 1),
(14, '2026_06_23_000000_create_certificate_tables', 2),
(15, '2026_06_23_010000_add_validated_to_certificates_table', 2),
(16, '2026_06_23_020000_add_permissions_to_users_table', 2),
(17, '2026_07_28_000000_add_overlay_opacity_to_hero_slides_table', 3);

-- --------------------------------------------------------

--
-- Structure de la table `partners`
--



--
-- Déchargement des données de la table `partners`
--

INSERT INTO `partners` (`id`, `name`, `logo_url`, `website_url`, `sort_order`, `created_at`, `updated_at`) VALUES
(10, 'Mayelia Automotive', '/storage/uploads/wmDcGsVMTrjPVHRBurmhJtUDvesPnnglVYG9SAwc.jpg', 'https://mayelia.com/', 0, '2026-07-03 09:58:46', '2026-07-27 07:14:12'),
(11, 'Mayelia Participations', '/storage/uploads/W6CFkG7nxxgDmeSbnnK9mreyqUHHwZoLPEF9hhvz.jpg', 'https://mayeliaparticipations.com/', 1, '2026-07-03 09:58:46', '2026-07-27 07:14:52'),
(12, 'Cieria', '/storage/uploads/o3YeMqmBZLfacLAWDHnT5hBIqiKacejtXwy2emID.png', NULL, 2, '2026-07-03 09:58:46', '2026-07-27 07:15:43'),
(13, 'SICTA', '/storage/uploads/w1l250Pxhn0exbjEE66jpgwOZgIIFjult9NQUCeR.png', NULL, 3, '2026-07-03 09:58:46', '2026-07-27 07:15:25'),
(14, 'Emploi Jeune', '/storage/uploads/V366Y4Qw0HOgeuUlBjsdjEoAisPUzVW9V4ZpScLR.png', 'https://agenceemploijeunes.ci/', 4, '2026-07-03 09:58:46', '2026-07-27 07:18:20'),
(15, 'La Tulipe', '/storage/uploads/F2NdqbKAiQSjzqvDez2bJCIFolo5khkZzSEU02zh.jpeg', NULL, 5, '2026-07-03 09:58:46', '2026-07-27 07:19:59'),
(16, 'LRA', '/storage/uploads/UxZykXRtA7tryXnCjPoynQ9O9gGMENRkhFioRyqG.png', 'https://lragroupe.com/a-propos/', 6, '2026-07-03 09:58:46', '2026-07-27 07:22:03'),
(17, 'Neemba', '/storage/uploads/EvcOf4oq355IRSLaenWFg4BAQJAVYNQvgVqOGSWI.png', 'https://www.neemba-cat.com/', 7, '2026-07-03 09:58:46', '2026-07-27 07:20:59'),
(18, 'SST', '/storage/uploads/Rk2A9Tjlc6wM4AgnCVsEVNNNSJNNfcV01tLJz01n.jpeg', NULL, 8, '2026-07-03 09:58:46', '2026-07-27 07:42:56');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--



-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--



--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(27, 'App\\Models\\User', 1, 'admin', '6d47dff72f124c85e89e48e94f19e6841dab4260958647b30d26d04d10689ec4', '[\"*\"]', '2026-07-28 07:23:01', NULL, '2026-07-28 07:21:21', '2026-07-28 07:23:01');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--



--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('iMDXD1MCKlR4pwdZQlROxoDAuiE0iuuRh5laS4Tl', NULL, '85.204.70.92', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36', 'eyJfdG9rZW4iOiI5UkhHRWRGaDQwRXRibEREUjd3NzZCNEoxZVI4YWJPdVJrOE5KTm1iIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2FjYWRlbXkubWF5ZWxpYW1vYmlsaXRlLmNvbVwvbWVkaWFcL3dwLWluY2x1ZGVzXC93bHdtYW5pZmVzdC54bWwiLCJyb3V0ZSI6ImdlbmVyYXRlZDo6M3ZpMGFUMzVnMUoyR3pFUyJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1781807796);

-- --------------------------------------------------------

--
-- Structure de la table `site_configs`
--



--
-- Déchargement des données de la table `site_configs`
--

INSERT INTO `site_configs` (`id`, `data`, `created_at`, `updated_at`) VALUES
(1, '{\"siteName\":\"Mayelia Academy\",\"siteUrl\":\"https:\\/\\/academy.mayeliamobilite.com\",\"siteLogoUrl\":null,\"metaDefaultDescription\":\"Mayelia Academy - Formation professionnelle et insertion en C\\u00f4te d\'Ivoire.\",\"footerTagline\":\"Hub d\'apprentissage moderne d\\u00e9di\\u00e9 \\u00e0 l\'insertion professionnelle et au d\\u00e9veloppement des comp\\u00e9tences en C\\u00f4te d\'Ivoire.\",\"addressLine1\":\"Marcory Zone 4, Rue Abli Mathieu 716 Abidjan,\",\"addressLine2\":\"C\\u00f4te d\'Ivoire\",\"phone\":\"07 87 63 88 15\",\"email\":\"infos.academy@mayelia.com\",\"whatsapp\":null,\"hoursWeekdays\":\"Lun-Ven 8h-18h\\nSam: 9h-13h\",\"hoursWeekdaysDetail\":\"Lun-Ven 8h-18h\",\"hoursSaturday\":\"Sam: 9h-13h\",\"hoursSaturdayDetail\":null,\"contactSectionTitle\":\"Besoin d\'informations ?\",\"contactSectionSubtitle\":\"Notre \\u00e9quipe est \\u00e0 votre \\u00e9coute pour r\\u00e9pondre \\u00e0 toutes vos questions\",\"addressVisitNote\":\"Rendez-vous sur place\",\"emailResponseNote\":\"R\\u00e9ponse sous 24h\",\"facebookUrl\":\"https:\\/\\/facebook.com\",\"linkedinUrl\":\"https:\\/\\/linkedin.com\",\"instagramUrl\":\"https:\\/\\/instagram.com\",\"twitterUrl\":null,\"youtubeUrl\":null,\"newsletterPlaceholder\":\"Votre email\",\"newsletterIntro\":\"Inscrivez-vous \\u00e0 notre newsletter pour recevoir nos derni\\u00e8res actualit\\u00e9s.\",\"homeAboutTitlePrefix\":\"QUI\",\"homeAboutTitleAccent\":\"SOMMES-NOUS ?\",\"homeAboutParagraph1\":\"Filiale du groupe Mayelia Participations, Mayelia Academy est un hub de formation cr\\u00e9\\u00e9 en 2023. Le centre est d\\u00e9di\\u00e9 \\u00e0 la formation, l\'apprentissage, au perfectionnement et au renforcement des capacit\\u00e9s des \\u00e9tudiants et des professionnels dans les m\\u00e9tiers de l\'automobile, de l\'informatique, du service client et de la sant\\u00e9 et s\\u00e9curit\\u00e9 au travail (SST).\",\"homeAboutParagraph2\":\"Mayelia Academy est un centre de formation dynamique et innovant, offrant des formations sur mesure, adapt\\u00e9es aux \\u00e9volutions du march\\u00e9 de l\'emploi. Nos programmes sont con\\u00e7us et dispens\\u00e9s par des experts certifi\\u00e9s, reconnus pour leur engagement dans le d\\u00e9veloppement des comp\\u00e9tences et l\'insertion professionnelle.\",\"homeAboutImageUrl\":null,\"aproposSeoDescription\":\"Mayelia Academy est un centre de formation d\'excellence \\u00e0 Abidjan. Notre mission : former les talents de demain et favoriser l\'insertion professionnelle.\",\"aproposMissionHeading\":\"Former les talents de demain\",\"aproposMissionBlock1\":\"MAYELIA Academy est un hub de formation cr\\u00e9\\u00e9 en 2023. Le centre est d\\u00e9di\\u00e9 \\u00e0 la formation, l\'apprentissage, au perfectionnement et au renforcement des capacit\\u00e9s des \\u00e9tudiants et des professionnels dans les m\\u00e9tiers de l\'automobile, l\'informatique, du service client et de la sant\\u00e9 et s\\u00e9curit\\u00e9 au travail.\",\"aproposMissionBlock2\":\"C\'est un centre de formation dynamique et innovant, offrant des formations sur mesure, adapt\\u00e9es aux \\u00e9volutions du march\\u00e9 de l\'emploi. Nos programmes sont con\\u00e7us et dispens\\u00e9s par des experts certifi\\u00e9s, reconnus pour leur engagement dans le d\\u00e9veloppement des comp\\u00e9tences et l\'insertion professionnelle.\",\"aproposMissionBlock3\":\"Bas\\u00e9e \\u00e0 Abidjan, C\\u00f4te d\'Ivoire, Mayelia Academy fait partie du Groupe Mayelia Participations et s\'engage \\u00e0 transformer l\'\\u00e9ducation professionnelle pour construire un avenir meilleur.\",\"aproposMissionBlock4\":\"Nous constituons un hub d\'apprentissage moderne, d\\u00e9di\\u00e9 \\u00e0 l\'insertion professionnelle, au d\\u00e9veloppement des comp\\u00e9tences et \\u00e0 la reconversion des actifs. Chaque programme est con\\u00e7u en partenariat avec des entreprises leaders, anim\\u00e9 par des experts certifi\\u00e9s et orient\\u00e9 vers l\'emploi et la performance.\",\"aproposMissionImageUrl\":null,\"contactPageMetaDescription\":\"Besoin d\'informations ? Contactez l\'\\u00e9quipe de Mayelia Academy d\\u00e8s aujourd\'hui. Nous sommes \\u00e0 votre \\u00e9coute pour r\\u00e9pondre \\u00e0 toutes vos questions.\"}', '2026-06-16 22:01:12', '2026-07-14 10:36:54');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--



--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `is_super_admin`, `permissions`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur Mayelia', 'admin@mayelia.ci', 1, '[]', NULL, '$2y$12$6k9UmfA99rZwuvJ8y9RbOOp9xzPZbqPpIRh6/BdzvCpaNgxelpafa', NULL, '2026-06-16 22:01:12', '2026-07-03 09:58:46');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actualites`
--


--
-- Index pour la table `actualite_paragraphs`
--


--
-- Index pour la table `cache`
--


--
-- Index pour la table `cache_locks`
--


--
-- Index pour la table `certificates`
--


--
-- Index pour la table `cert_participants`
--


--
-- Index pour la table `cert_ref_counters`
--


--
-- Index pour la table `cert_trainings`
--


--
-- Index pour la table `conseils`
--


--
-- Index pour la table `conseil_paragraphs`
--


--
-- Index pour la table `contact_messages`
--


--
-- Index pour la table `failed_jobs`
--


--
-- Index pour la table `faqs`
--


--
-- Index pour la table `formation_domaines`
--


--
-- Index pour la table `formation_programmes`
--


--
-- Index pour la table `hero_slides`
--


--
-- Index pour la table `jobs`
--


--
-- Index pour la table `job_batches`
--


--
-- Index pour la table `migrations`
--


--
-- Index pour la table `partners`
--


--
-- Index pour la table `password_reset_tokens`
--


--
-- Index pour la table `personal_access_tokens`
--


--
-- Index pour la table `sessions`
--


--
-- Index pour la table `site_configs`
--


--
-- Index pour la table `users`
--


--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actualites`
--


--
-- AUTO_INCREMENT pour la table `actualite_paragraphs`
--


--
-- AUTO_INCREMENT pour la table `certificates`
--


--
-- AUTO_INCREMENT pour la table `cert_participants`
--


--
-- AUTO_INCREMENT pour la table `cert_ref_counters`
--


--
-- AUTO_INCREMENT pour la table `cert_trainings`
--


--
-- AUTO_INCREMENT pour la table `conseils`
--


--
-- AUTO_INCREMENT pour la table `conseil_paragraphs`
--


--
-- AUTO_INCREMENT pour la table `contact_messages`
--


--
-- AUTO_INCREMENT pour la table `failed_jobs`
--


--
-- AUTO_INCREMENT pour la table `faqs`
--


--
-- AUTO_INCREMENT pour la table `formation_domaines`
--


--
-- AUTO_INCREMENT pour la table `formation_programmes`
--


--
-- AUTO_INCREMENT pour la table `hero_slides`
--


--
-- AUTO_INCREMENT pour la table `jobs`
--


--
-- AUTO_INCREMENT pour la table `migrations`
--


--
-- AUTO_INCREMENT pour la table `partners`
--


--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--


--
-- AUTO_INCREMENT pour la table `site_configs`
--


--
-- AUTO_INCREMENT pour la table `users`
--


--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `actualite_paragraphs`
--


--
-- Contraintes pour la table `certificates`
--


--
-- Contraintes pour la table `conseil_paragraphs`
--


--
-- Contraintes pour la table `formation_programmes`
--

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
