<?php

namespace App\Services\Certificates;

use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CertificatePdfBuilder
{
    // Page A4 paysage — mêmes dimensions que le modèle original (en points, 1in = 72pt)
    private const PAGE_WIDTH_PT = 11.69271 * 72;

    private const PAGE_HEIGHT_PT = 8.26736 * 72;

    // Coordonnées extraites du modèle original (en pouces, origine haut-gauche)
    private const NAME_BOX = ['x' => 3.04635, 'w' => 5.67865];

    private const REF_BOX = ['x' => 3.3151, 'y' => 6.57778, 'h' => 0.37025];

    public function __construct(private TextWrapper $textWrapper)
    {
    }

    public function build(Certificate $certificate): string
    {
        $certificate->loadMissing('participant', 'training');
        $participant = $certificate->participant;
        $training = $certificate->training;

        $verifyUrl = rtrim((string) config('certificates.verify_base_url'), '/').'/verification/'.$certificate->ref;

        $nameText = trim($participant->civility.' '.mb_strtoupper($participant->full_name));
        $nameFontSize = $this->textWrapper->resolveNameFontSize($nameText, self::NAME_BOX['w'] * 72);

        $qrSvg = QrCode::format('svg')->size(256)->margin(0)->generate($verifyUrl);
        $qrBase64 = base64_encode($qrSvg);

        $qrSizePt = 42;
        $qrGapPt = 14;
        $qrLeftIn = self::REF_BOX['x'] - ($qrGapPt + $qrSizePt) / 72;
        $refCenterYIn = self::REF_BOX['y'] + self::REF_BOX['h'] / 2;
        $qrTopIn = $refCenterYIn - ($qrSizePt / 2) / 72;

        $bgPath = base_path('public/certificates/certificate-bg.png');
        $bgBase64 = base64_encode((string) file_get_contents($bgPath));

        $sigPath = \Illuminate\Support\Facades\Storage::disk('public')->path('certificates/signature.png');
        $signatureBase64 = file_exists($sigPath) ? base64_encode((string) file_get_contents($sigPath)) : null;

        $html = view('certificates.pdf', [
            'bgBase64' => $bgBase64,
            'signatureBase64' => $signatureBase64,
            'qrBase64' => $qrBase64,
            'qrLeftIn' => $qrLeftIn,
            'qrTopIn' => $qrTopIn,
            'qrSizeIn' => $qrSizePt / 72,
            'nameText' => $nameText,
            'nameFontSize' => $nameFontSize,
            'trainingTitle' => $training->title,
            'period' => FrenchDate::formatPeriod($training->start_date, $training->end_date),
            'issuePlace' => $training->issue_place,
            'issueDateText' => FrenchDate::format($training->issue_date),
            'ref' => $certificate->ref,
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper([0, 0, self::PAGE_WIDTH_PT, self::PAGE_HEIGHT_PT]);

        return $pdf->output();
    }
}
