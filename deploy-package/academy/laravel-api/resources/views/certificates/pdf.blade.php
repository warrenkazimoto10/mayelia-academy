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
    }
    .intro { left: 3.8151in; top: 2.675in; width: 4.0625in; height: 0.40391in; font-size: 18pt; color: #000; }
    .name { left: 3.04635in; top: 3.4375in; width: 5.67865in; height: 0.70684in; font-weight: bold; color: #000; }
    .formation { left: 1.9875in; top: 4.425in; width: 7.8in; height: 1.00977in; font-size: 18pt; color: #000; flex-direction: column; }
    .formation .training-title { font-weight: bold; }
    .date { left: 4.05in; top: 5.6375in; width: 3.525in; height: 0.40391in; font-size: 18pt; color: #000; }
    .ref { left: 3.3151in; top: 6.57778in; width: 3.525in; height: 0.37025in; font-size: 16pt; color: #084F6A; }
    .qr { position: absolute; left: {{ $qrLeftIn }}in; top: {{ $qrTopIn }}in; width: {{ $qrSizeIn }}in; height: {{ $qrSizeIn }}in; }
    /* Signature du président */
    .signature {
        position: absolute;
        left: 7.3in; top: 5.8in;
        height: 1.2in;
    }
</style>
</head>
<body>
    <img class="bg" src="data:image/png;base64,{{ $bgBase64 }}" alt="">

    <div class="box intro">Le présent document atteste que</div>

    <div class="box name" style="font-size: {{ $nameFontSize }}pt">{{ $nameText }}</div>

    <div class="box formation">
        <div>a suivi avec succès la formation intitulée <span class="training-title">{{ $trainingTitle }}</span></div>
        <div>dans la période du {{ $period }}.</div>
    </div>  

    <div class="box date">Fait à {{ $issuePlace }}, le {{ $issueDateText }}.</div>

    <div class="box ref">REF : {{ $ref }}</div>

    <img class="qr" src="data:image/svg+xml;base64,{{ $qrBase64 }}" alt="">

    @if($signatureBase64)
        <img class="signature" src="data:image/png;base64,{{ $signatureBase64 }}" alt="Signature">
    @endif
</body>
</html>
