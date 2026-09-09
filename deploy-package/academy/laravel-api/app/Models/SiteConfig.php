<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SiteConfig extends Model
{
    protected $table = 'site_configs';

    protected $fillable = ['data'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }

    /**
     * Valeurs par défaut (CMS) — fusionnées avec la ligne BDD.
     *
     * @return array<string, string>
     */
    public static function defaultData(): array
    {
        return [
            'siteName' => 'Mayelia Academy',
            'siteUrl' => 'https://academy.mayeliamobilite.com',
            'siteLogoUrl' => '',
            'metaDefaultDescription' => 'Mayelia Academy — formation professionnelle et insertion en Côte d\'Ivoire.',
            'footerTagline' => 'Hub d\'apprentissage moderne dédié à l\'insertion professionnelle et au développement des compétences en Côte d\'Ivoire.',
            'addressLine1' => 'Marcory Zone 4, Rue Abli Mathieu 716 Abidjan,',
            'addressLine2' => 'Côte d\'Ivoire',
            'phone' => '07 87 63 88 15',
            'email' => 'infos.academy@mayelia.com',
            'whatsapp' => '',
            'hoursWeekdays' => "Lun-Ven 8h-18h\nSam: 9h-13h",
            'hoursWeekdaysDetail' => 'Lun-Ven 8h-18h',
            'hoursSaturday' => 'Sam: 9h-13h',
            'hoursSaturdayDetail' => '',
            'contactSectionTitle' => 'Besoin d\'informations ?',
            'contactSectionSubtitle' => 'Notre équipe est à votre écoute pour répondre à toutes vos questions',
            'addressVisitNote' => 'Rendez-vous sur place',
            'emailResponseNote' => 'Réponse sous 24h',
            'facebookUrl' => 'https://facebook.com',
            'linkedinUrl' => 'https://linkedin.com',
            'instagramUrl' => 'https://instagram.com',
            'twitterUrl' => '',
            'youtubeUrl' => '',
            'newsletterPlaceholder' => 'Votre email',
            'newsletterIntro' => 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités.',
            'homeAboutTitlePrefix' => 'QUI',
            'homeAboutTitleAccent' => 'SOMMES-NOUS ?',
            'homeAboutIntro' => 'Fondée en 2023 et basée à Abidjan, MAYELIA Academy est un centre de formation dynamique et innovant, membre du Groupe Mayelia Participations. Nous accompagnons exclusivement les professionnels, les entreprises et les actifs en reconversion dans le perfectionnement, le renforcement des capacités et la montée en puissance de leurs équipes.',
            'homeAboutExpertiseHeading' => 'Une expertise reconnue et agréée',
            'homeAboutExpertiseIntro' => 'Pour répondre aux enjeux stratégiques du marché et garantir la qualité de nos programmes, MAYELIA Academy est fièrement agréée par le FDFP (Fonds de Développement de la Formation Professionnelle) dans les secteurs suivants :',
            'homeAboutExpertiseBullets' => "Spécialités plurivalentes de l'informatique\nTransports routiers (formation des chauffeurs de véhicules poids lourds et légers)\nPluri-technologies mécaniques (mécanique générale, chaudronnerie, tôlerie, soudure, structures métalliques etc…)",
            'homeAboutExpertiseOutro' => 'À ces domaines d\'excellence s\'ajoutent nos programmes dédiés au Service Client et à la Santé et Sécurité au Travail (SST).',
            'homeAboutPedagogyHeading' => 'Une pédagogie orientée performance',
            'homeAboutPedagogyText' => 'Nos formations sur mesure sont co-construites en partenariat avec des entreprises leaders pour garantir une adéquation parfaite avec les réalités du terrain. Animés par des experts certifiés, nos parcours sont conçus pour s\'adapter aux évolutions rapides du marché de l\'emploi.',
            'homeAboutClosingText' => 'Plus qu\'un simple centre de formation, MAYELIA Academy est un véritable levier de croissance. Notre mission : transformer l\'éducation professionnelle en Côte d\'Ivoire pour bâtir un avenir économique plus performant et durable.',
            'homeAboutImageUrl' => '',
            'aproposSeoDescription' => 'Mayelia Academy est un centre de formation d\'excellence à Abidjan. Notre mission : former les talents de demain et favoriser l\'insertion professionnelle.',
            'aproposMissionHeading' => 'Former les talents de demain',
            'aproposMissionBlock1' => 'MAYELIA Academy est un hub de formation créé en 2023. Le centre est dédié à la formation, l\'apprentissage, au perfectionnement et au renforcement des capacités des étudiants et des professionnels dans les métiers de l\'automobile, l\'informatique, du service client et de la santé et sécurité au travail.',
            'aproposMissionBlock2' => 'C\'est un centre de formation dynamique et innovant, offrant des formations sur mesure, adaptées aux évolutions du marché de l\'emploi. Nos programmes sont conçus et dispensés par des experts certifiés, reconnus pour leur engagement dans le développement des compétences et l\'insertion professionnelle.',
            'aproposMissionBlock3' => 'Basée à Abidjan, Côte d\'Ivoire, Mayelia Academy fait partie du Groupe Mayelia Participations et s\'engage à transformer l\'éducation professionnelle pour construire un avenir meilleur.',
            'aproposMissionBlock4' => 'Nous constituons un hub d\'apprentissage moderne, dédié à l\'insertion professionnelle, au développement des compétences et à la reconversion des actifs. Chaque programme est conçu en partenariat avec des entreprises leaders, animé par des experts certifiés et orienté vers l\'emploi et la performance.',
            'aproposMissionImageUrl' => '',
            'contactPageMetaDescription' => 'Besoin d\'informations ? Contactez l\'équipe de Mayelia Academy dès aujourd\'hui. Nous sommes à votre écoute pour répondre à toutes vos questions.',
        ];
    }

    /**
     * Fusionne les défauts avec la ligne BDD. Tolère l’absence de table, JSON invalide ou types inattendus
     * (évite les erreurs 500 sur /api/site-config).
     */
    public static function merged(): array
    {
        $defaults = self::defaultData();

        try {
            $row = self::query()->first();
        } catch (\Throwable $e) {
            Log::warning('SiteConfig: lecture impossible (migration à jour ?)', [
                'message' => $e->getMessage(),
            ]);

            return $defaults;
        }

        if ($row === null) {
            return $defaults;
        }

        $extra = $row->data;

        if ($extra instanceof \stdClass) {
            $extra = json_decode(json_encode($extra), true);
        }

        if (! is_array($extra)) {
            Log::notice('SiteConfig: colonne data ignorée (format inattendu)');

            return $defaults;
        }

        // Ignore les valeurs null éventuellement enregistrées (ancien bug) pour
        // ne jamais écraser un défaut valide par null (évite un crash front sur .trim()).
        $extra = array_filter($extra, fn ($v) => $v !== null);

        return array_merge($defaults, $extra);
    }
}
