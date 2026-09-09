<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// 1. Déterminer si l'application est en mode maintenance...
if (file_exists($maintenance = __DIR__.'/laravel-api/storage/framework/maintenance.php')) {
    require $maintenance;
}

// 2. Enregistrer l'autoloader de Composer...
require __DIR__.'/laravel-api/vendor/autoload.php';

// 3. Bootstraper Laravel et récupérer l'instance de l'application...
/** @var Application $app */
$app = require_once __DIR__.'/laravel-api/bootstrap/app.php';

// 4. CRITIQUE : Définir le dossier public de Laravel sur la racine du site
// Cela permet à `public_path()` de pointer vers la racine où se trouvent le index.html du front
// et d'y générer correctement le lien symbolique "storage".
$app->usePublicPath(__DIR__);

// 5. Gérer la requête...
$app->handleRequest(Request::capture());
