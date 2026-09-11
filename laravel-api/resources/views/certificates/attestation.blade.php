<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page { margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Helvetica, sans-serif; }
    body { position: relative; width: 11.69271in; height: 8.26736in; overflow: hidden; }
    .bg { position: absolute; top: 0; left: 0; width: 11.69271in; height: 8.26736in; }
    .box {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.4;
    }
    .intro {
        left: 2in; top: 3.68in;
        width: 7.7in; height: 0.42in;
        font-size: 18pt; color: #2c3e50;
    }
    /* Nom du participant (~55%) */
    .name {
        left: 1in; top: 4.3in;
        width: 9.7in; height: 0.85in;
        font-weight: bold; color: #111;
    }
    /* Formation + période (~64%) */
    .formation {
        left: 1.2in; top: 5.1in;
        width: 9.3in; height: 0.95in;
        font-size: 18pt; color: #2c3e50;
        flex-direction: column; gap: 4px;
    }
    .en-foi { left: 1.09028in; top: 6.09in; width: 9.44444in; height: 0.33659in; font-size: 14pt;
    color: #2c3e50; }
    .date {
        left: 3in; top: 7.1in;
        width: 5.6in; height: 0.42in;
        font-size: 15pt; color: #2c3e50;
    }
    .president {
        left: 7.9in; top: 6.6in;
        width: 3in; height: 0.3in;
        font-size: 18pt; color: #2c3e50;
    }
    .signature {
        position: absolute;
        left: 7.4in; top: 6.95in;
        width: 3in;
        height: 0.7in;
        object-fit: contain;
    }
    .signataire {
        left: 7.9in; top: 7.68in;
        width: 3in; height: 0.35in;
        font-size: 13pt; color: #2c3e50;
    }
    .qr {
        position: absolute;
        left: 2.5in; top: 7.0in;
        width: {{ $qrSizeIn }}in;
        height: {{ $qrSizeIn }}in;
    }
</style>
</head>
<body>
    <img class="bg" src="data:image/png;base64,{{ $bgBase64 }}" alt="">

    <div class="box intro">Le présent document atteste que</div>

    <div class="box name" style="font-size: {{ $nameFontSize }}pt">{{ $nameText }}</div>

    <div class="box formation">
        <div>a suivi avec succès la formation <strong>{{ $trainingTitle }}</strong>.</div>
        <div>{{ $period }} à {{ $trainingPlace }}.</div>
    </div>

    <div class="box en-foi">
En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</div>

    <div class="box date">Fait à {{ $issuePlace }}, le {{ $issueDateText }}.</div>

    <div class="box president" style="font-size: 18px;">Le Président</div>

    @if($signatureBase64)
        <img class="signature" src="data:image/png;base64,{{ $signatureBase64 }}" alt="Signature">
    @endif

    <div class="box signataire">Dominique GOUVERNAYRE</div>

    <img class="qr" src="data:image/svg+xml;base64,{{ $qrBase64 }}" alt="">
</body>
</html>
