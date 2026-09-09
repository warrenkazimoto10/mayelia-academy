<?php

use Illuminate\Support\Facades\Route;

// Route de diagnostic et configuration pour le dossier de stockage (storage)
Route::get('/storage-setup', function () {
    $publicStorage = storage_path('app/public');
    $uploadsFolder = $publicStorage . '/uploads';

    // Créer le dossier uploads s'il n'existe pas
    if (!file_exists($uploadsFolder)) {
        @mkdir($uploadsFolder, 0755, true);
    }

    // Tenter de créer le lien symbolique
    $linkResult = 'Non exécuté';
    try {
        Illuminate\Support\Facades\Artisan::call('storage:link');
        $linkResult = Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        $linkResult = 'Erreur : ' . $e->getMessage();
    }

    $symlinkExists = file_exists(public_path('storage'));
    $symlinkTarget = '';
    if ($symlinkExists && is_link(public_path('storage'))) {
        $symlinkTarget = @readlink(public_path('storage'));
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Configuration du stockage exécutée.',
        'diagnostics' => [
            'storage_path_exists' => file_exists(storage_path()),
            'storage_path_writable' => is_writable(storage_path()),
            'public_storage_path_exists' => file_exists($publicStorage),
            'public_storage_path_writable' => is_writable($publicStorage),
            'uploads_path_exists' => file_exists($uploadsFolder),
            'uploads_path_writable' => is_writable($uploadsFolder),
            'public_link_exists' => $symlinkExists,
            'public_link_is_symlink' => is_link(public_path('storage')),
            'public_link_target' => $symlinkTarget,
            'artisan_link_result' => trim($linkResult),
        ]
    ]);
});

// Route de diagnostic/exécution des migrations (pas d'accès SSH sur l'hébergement mutualisé LWS).
// Protégée par un secret défini dans .env (MIGRATE_SECRET) — à retirer une fois la mise à jour terminée si souhaité.
Route::get('/migrate-setup', function (\Illuminate\Http\Request $request) {
    $secret = env('MIGRATE_SECRET');
    if (! $secret || $request->query('key') !== $secret) {
        abort(403, 'Clé manquante ou invalide.');
    }

    try {
        Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $output = Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        $output = 'Erreur : ' . $e->getMessage();
    }

    return response()->json([
        'status' => 'success',
        'output' => trim($output),
    ]);
});

// Route de secours pour servir les fichiers de stockage directement via Laravel
Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);

    if (!file_exists($filePath)) {
        abort(404);
    }

    return response()->file($filePath);
})->where('path', '.*');

// Route de secours additionnelle /media pour contourner les blocages Apache sur /storage
Route::get('/media/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);

    if (!file_exists($filePath)) {
        abort(404);
    }

    return response()->file($filePath);
})->where('path', '.*');

Route::get('/{any?}', function () {
    $spaIndex = public_path('index.html');

    if (file_exists($spaIndex)) {
        return response()->file($spaIndex);
    }

    return response()->json([
        'status' => 'ok',
        'app' => 'Mayelia Academy API',
    ]);
})->where('any', '^(?!api|sanctum).*$');
