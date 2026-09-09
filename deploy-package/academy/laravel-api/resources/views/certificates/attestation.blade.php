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
    /* "Le présent document atteste que" — juste sous le séparateur du haut (~49%) */
    .intro {
        left: 2in; top: 3.85in;
        width: 7.7in; height: 0.42in;
        font-size: 15pt; color: #2c3e50;
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
        font-size: 15pt; color: #2c3e50;
        flex-direction: column; gap: 4px;
    }
    /* "Fait à X, le DATE" — juste au-dessus du séparateur du bas (~75%) */
    .date {
        left: 3in; top: 6.15in;
        width: 5.7in; height: 0.42in;
        font-size: 15pt; color: #2c3e50;
    }
    /* Texte "LE PRÉSIDENT" en bas à droite */
    .president-text {
        position: absolute;
        left: 7.3in; top: 6.6in;
        width: 3in;
        text-align: center;
        font-size: 14pt;
        color: #2c3e50;
    }
    /* Signature du président */
    .signature {
        position: absolute;
        left: 8.2in; top: 5.8in;
        height: 1.2in;
    }
</style>
</head>
<body>
    <img class="bg" src="data:image/png;base64,{{ $bgBase64 }}" alt="">

    <div class="box intro">Le présent document atteste que</div>

    <div class="box name" style="font-size: {{ $nameFontSize }}pt">{{ $nameText }}</div>

    <div class="box formation">
        <div>a suivi avec succès la formation <strong>{{ $trainingTitle }}</strong></div>
        <div>dans la période du {{ $period }}.</div>
    </div>

    <div class="box date">Fait à {{ $issuePlace }}, le {{ $issueDateText }}.</div>

    <div class="president-text">LE PRÉSIDENT</div>

    @if($signatureBase64)
        <img class="signature" src="data:image/png;base64,{{ $signatureBase64 }}" alt="Signature">
    @endif
</body>
</html>

