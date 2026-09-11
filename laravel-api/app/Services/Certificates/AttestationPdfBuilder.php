<?php

namespace App\Services\Certificates;

use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class AttestationPdfBuilder
{
    // Page A4 paysage — mêmes dimensions que le modèle original (en points, 1in = 72pt)
    private const PAGE_WIDTH_PT = 11.69271 * 72;

    private const PAGE_HEIGHT_PT = 8.26736 * 72;

    private const NAME_BOX = ['w' => 5.67865];

    // QR code size in points
    private const QR_SIZE_PT = 48;

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

        $signatureBase64 = null;
        if ($certificate->show_signature) {
            $sigPath = \Illuminate\Support\Facades\Storage::disk('public')->path('certificates/signature.png');
            $signatureBase64 = file_exists($sigPath) ? base64_encode((string) file_get_contents($sigPath)) : null;
        }

        $verifyUrl = rtrim((string) config('certificates.verify_base_url'), '/').'/verification';
        $qrSvg = QrCode::format('svg')->size(256)->margin(0)->generate($verifyUrl);
        $qrBase64 = base64_encode($qrSvg);
        $qrSizeIn = self::QR_SIZE_PT / 72;

        $html = view('certificates.attestation', [
            'bgBase64' => $bgBase64,
            'signatureBase64' => $signatureBase64,
            'qrBase64' => $qrBase64,
            'qrSizeIn' => $qrSizeIn,
            'nameText' => $nameText,
            'nameFontSize' => $nameFontSize,
            'trainingTitle' => $training->title,
            // "Le 10 septembre 2026" si un seul jour, "Du 10 septembre 2026 au 10 novembre 2026" si période.
            'period' => FrenchDate::formatPeriodPhrase($training->start_date, $training->end_date),
            'trainingPlace' => $training->training_place ?: $training->issue_place,
            'issuePlace' => $training->issue_place,
            'issueDateText' => FrenchDate::format($training->issue_date),
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper([0, 0, self::PAGE_WIDTH_PT, self::PAGE_HEIGHT_PT]);

        return $pdf->output();
    }
}
