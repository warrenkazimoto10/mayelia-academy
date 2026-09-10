<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page { margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Helvetica, sans-serif; }
    body { position: relative; width: 11.69271in; height: 8.26736in; }
    .bg { position: absolute; top: 0; left: 0; width: 11.69271in; height: 8.26736in; }
    .box {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.3;
        font-size: 18pt;
    }
    .intro { left: 3.81424in; top: 2.71927in; width: 4.0625in; height: 0.43757in; font-size: 18pt; color: #000; }
    .name { left: 1.9848in; top: 3.29135in; width: 7.7231in; height: 0.63952in; font-weight: bold; color: #000; }
    .formation { left: 1.9848in; top: 4.15813in; width: 7.7231in; height: 1.3127in; font-size: 18pt; color: #000; flex-direction: column; }
    .formation .training-title { font-weight: bold; }
    .en-foi { left: 1.09028in; top: 5.43704in; width: 9.44444in; height: 0.33659in; font-size: 14pt; color: #000; }
    .ref { left: 1.15506in; top: 6.76556in; width: 3.124in; height: 0.40594in; font-size: 18pt; color: #000; }
    .date { left: 3.91519in; top: 6.928in; width: 3.79462in; height: 0.40391in; font-size: 18pt; color: #000; }
    .signataire { left: 8in; top: 7.46in; width: 3.5in; height: 0.45in; font-size: 18pt; color: #000; }

    .president { left: 8in;
        top: 6.55in;
         width: 3.5in;
         height: 0.35in;
         font-size: 18pt;
          color: #000000;
        }

    .qr { position: absolute;
        left: {{ $qrLeftIn }}in; top: {{ $qrTopIn }}in; width: {{ $qrSizeIn }}in; height: {{ $qrSizeIn }}in; }

    .signature {
        position: absolute;
        left: 8.44in; top: 6.6in;
        width: 2.6in; height: 0.8in;
        object-fit: contain;
    }
</style>
</head>
<body>
    <img class="bg" src="data:image/png;base64,{{ $bgBase64 }}" alt="">

    <div class="box intro">Le présent document atteste que</div>

    <div class="box name" style="font-size: {{ $nameFontSize }}pt">{{ $nameText }}</div>

    <div class="box formation">
        <div>a acquis et démontré avec succès les compétences requises à l&rsquo;issu du module de formation <span class="training-title">{{ $trainingTitle }}</span>.</div>
        <div>{{ $periodPhrase }} à {{ $trainingPlace }}.</div>
    </div>

    <div class="box en-foi" >En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.</div>

    <div class="box ref" style="font-size: 18px;">REF :{{ $ref }}</div>

    <div class="box date" style="font-size: 19px;">Fait
       à {{ $issuePlace }}, le {{ $issueDateText }}</div>

    <img class="qr" src="data:image/svg+xml;base64,{{ $qrBase64 }}" alt="">

    @if($signatureBase64)
        <img class="signature" src="data:image/png;base64,{{ $signatureBase64 }}" alt="Signature">
    @endif

    <div class="box president" style="font-size: 18px;">Le Président</div>

<div class="box signataire" style="font-size: 18px;">Dominique GOUVERNAYRE</div></body>
</html>
