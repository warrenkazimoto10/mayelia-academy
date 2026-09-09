<?php

return [
    // Base URL utilisée pour construire le lien de vérification encodé dans le QR code
    'verify_base_url' => env('CERT_VERIFY_BASE_URL', env('APP_URL', 'http://localhost:8080')),
];
