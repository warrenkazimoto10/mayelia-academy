<?php

namespace App\Services\Certificates;

use Dompdf\Dompdf;
use Dompdf\FontMetrics;

/**
 * Détermine la taille de police du nom (32pt par défaut, conforme au modèle
 * validé par le client ; repli à 25pt si le nom ne tient pas en 2 lignes dans
 * la zone NAME_BOX). Le rendu réel (retour à la ligne, centrage) est ensuite
 * laissé à dompdf/CSS dans le template Blade.
 */
class TextWrapper
{
    private FontMetrics $fontMetrics;

    public function __construct()
    {
        $this->fontMetrics = (new Dompdf())->getFontMetrics();
    }

    /** @return int 32 ou 25 selon que le nom tient en 2 lignes à 32pt */
    public function resolveNameFontSize(string $text, float $maxWidthPt): int
    {
        $lineCountAt32 = $this->countWrappedLines($text, 'helvetica', 'bold', 32, $maxWidthPt);

        return $lineCountAt32 <= 2 ? 32 : 25;
    }

    private function countWrappedLines(string $text, string $family, string $weight, int $size, float $maxWidthPt): int
    {
        $font = $this->fontMetrics->getFont($family, $weight);
        $words = preg_split('/\s+/', trim($text)) ?: [];

        $lines = 1;
        $currentWidth = 0.0;
        $spaceWidth = $this->fontMetrics->getTextWidth(' ', $font, $size);

        foreach ($words as $i => $word) {
            $wordWidth = $this->fontMetrics->getTextWidth($word, $font, $size);
            $extra = $i > 0 ? $spaceWidth : 0;

            if ($currentWidth > 0 && $currentWidth + $extra + $wordWidth > $maxWidthPt) {
                $lines++;
                $currentWidth = $wordWidth;
            } else {
                $currentWidth += $extra + $wordWidth;
            }
        }

        return $lines;
    }
}
