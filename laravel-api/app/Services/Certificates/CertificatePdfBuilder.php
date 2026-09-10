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

    // Coordonnées extraites du modèle .odp validé par le client (en pouces, origine haut-gauche)
    private const NAME_BOX = ['x' => 1.9848, 'w' => 7.7231];

    // Remontée au-dessus du QR code (le QR passe en dessous, les deux alignés sur le même axe).
    private const REF_BOX = ['x' => 1.15506, 'y' => 6.76556, 'w' => 3.124, 'h' => 0.40594];

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

        // QR code centré en dessous de la référence (les deux alignés sur le même axe vertical).
        $qrSizePt = 42;
        $qrGapPt = 8;
        $refCenterXIn = self::REF_BOX['x'] + self::REF_BOX['w'] / 2;
        $qrLeftIn = $refCenterXIn - ($qrSizePt / 2) / 72;
        $qrTopIn = self::REF_BOX['y'] + self::REF_BOX['h'] + $qrGapPt / 72;

        $bgPath = base_path('public/certificates/certificate-bg.png');
        $bgBase64 = base64_encode((string) file_get_contents($bgPath));

        $signatureBase64 = null;
        if ($certificate->show_signature) {
            $sigPath = \Illuminate\Support\Facades\Storage::disk('public')->path('certificates/signature.png');
            $signatureBase64 = file_exists($sigPath) ? base64_encode((string) file_get_contents($sigPath)) : null;
        }

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
            'periodPhrase' => FrenchDate::formatPeriodPhrase($training->start_date, $training->end_date),
            'trainingPlace' => $training->training_place ?: $training->issue_place,
            'issuePlace' => $training->issue_place,
            'issueDateText' => FrenchDate::format($training->issue_date),
            'ref' => $certificate->ref,
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper([0, 0, self::PAGE_WIDTH_PT, self::PAGE_HEIGHT_PT]);

        return $pdf->output();
    }
}
