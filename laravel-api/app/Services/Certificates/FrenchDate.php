<?php

namespace App\Services\Certificates;

use Carbon\CarbonInterface;

class FrenchDate
{
    private const MONTHS_FR = [
        1 => 'janvier', 2 => 'février', 3 => 'mars', 4 => 'avril', 5 => 'mai', 6 => 'juin',
        7 => 'juillet', 8 => 'août', 9 => 'septembre', 10 => 'octobre', 11 => 'novembre', 12 => 'décembre',
    ];

    public static function format(CarbonInterface $date): string
    {
        return sprintf('%d %s %d', $date->day, self::MONTHS_FR[$date->month], $date->year);
    }

    /**
     * Reproduit la formulation exacte du modèle de certificat :
     * - même jour : "30 mai 2026"
     * - même mois/année : "27 au 29 mai 2026"
     * - mois/année différents : "27 mai 2026 au 3 juin 2026"
     */
    public static function formatPeriod(CarbonInterface $start, CarbonInterface $end): string
    {
        if ($start->isSameDay($end)) {
            return self::format($start);
        }

        if ($start->month === $end->month && $start->year === $end->year) {
            return sprintf('%d au %d %s %d', $start->day, $end->day, self::MONTHS_FR[$end->month], $end->year);
        }

        return self::format($start).' au '.self::format($end);
    }

    /**
     * Phrase complète avec préfixe, telle qu'elle apparaît dans le paragraphe de
     * formation du modèle de certificat validé par le client :
     * - même jour : "Le 30 mai 2026"
     * - période : "Du 27 au 29 mai 2026" / "Du 27 mai 2026 au 3 juin 2026"
     */
    public static function formatPeriodPhrase(CarbonInterface $start, CarbonInterface $end): string
    {
        if ($start->isSameDay($end)) {
            return 'Le '.self::format($start);
        }

        return 'Du '.self::formatPeriod($start, $end);
    }
}
