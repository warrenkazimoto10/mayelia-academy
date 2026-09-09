<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Fix LWS : Apache ne préserve pas REQUEST_URI après mod_rewrite
if (isset($_SERVER['REDIRECT_URL'])) {
    $_SERVER['REQUEST_URI'] = $_SERVER['REDIRECT_URL'];
    if (!empty($_SERVER['REDIRECT_QUERY_STRING'])) {
        $_SERVER['REQUEST_URI'] .= '?' . $_SERVER['REDIRECT_QUERY_STRING'];
    }
}

if (file_exists($m = __DIR__.'/../storage/framework/maintenance.php')) {
    require $m;
}

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

// Public path = racine du site (deux niveaux au-dessus de laravel-api/public/)
$app->usePublicPath(dirname(__DIR__, 2));

$app->handleRequest(Request::capture());
