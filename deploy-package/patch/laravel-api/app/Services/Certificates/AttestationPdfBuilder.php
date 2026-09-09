<?php

namespace App\Services\Certificates;

use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;

class AttestationPdfBuilder
{
    // Page A4 paysage — mêmes dimensions que le modèle original (en points, 1in = 72pt)
    private const PAGE_WIDTH_PT = 11.69271 * 72;

    private const PAGE_HEIGHT_PT = 8.26736 * 72;

    private const NAME_BOX = ['w' => 5.67865];

    public function __construct(private TextWrapper $textWrapper)
    {
    }

    public function build(Certificate $certificate): string
    {
        $certificate->loadMissing('participant', 'training');
        $participant = $certificate->participant;
        $training = $certificate->training;

        $nameText = trim($participant->civility.' '.mb_strtoupper($participant->full_name));
        $nameFontSize = $this->textWrapper->resolveNameFontSize($nameText, self::NAME_BOX['w'] * 72);

        $bgPath = base_path('public/certificates/attestation-bg.png');
        $bgBase64 = base64_encode((string) file_get_contents($bgPath));

        $sigPath = \Illuminate\Support\Facades\Storage::disk('public')->path('certificates/signature.png');
        $signatureBase64 = file_exists($sigPath) ? base64_encode((string) file_get_contents($sigPath)) : null;

        $html = view('certificates.attestation', [
            'bgBase64' => $bgBase64,
            'signatureBase64' => $signatureBase64,
            'nameText' => $nameText,
            'nameFontSize' => $nameFontSize,
            'trainingTitle' => $training->title,
            'period' => FrenchDate::formatPeriod($training->start_date, $training->end_date),
            'issuePlace' => $training->issue_place,
            'issueDateText' => FrenchDate::format($training->issue_date),
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper([0, 0, self::PAGE_WIDTH_PT, self::PAGE_HEIGHT_PT]);

        return $pdf->output();
    }
}
