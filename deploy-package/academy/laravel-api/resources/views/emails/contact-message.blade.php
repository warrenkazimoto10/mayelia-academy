<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Message contact</title>
</head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
    <h1 style="font-size: 1.25rem;">Nouveau message — {{ $siteName }}</h1>
    <p><strong>Nom :</strong> {{ $contactMessage->name }}</p>
    <p><strong>Email :</strong> <a href="mailto:{{ $contactMessage->email }}">{{ $contactMessage->email }}</a></p>
    @if($contactMessage->phone)
        <p><strong>Téléphone :</strong> {{ $contactMessage->phone }}</p>
    @endif
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 1rem 0;">
    <p style="white-space: pre-wrap;">{{ $contactMessage->message }}</p>
    <p style="font-size: 0.875rem; color: #64748b;">Reçu le {{ $contactMessage->created_at->timezone(config('app.timezone'))->format('d/m/Y H:i') }}</p>
</body>
</html>
