<?php
// Script autonome pour vider le cache de configuration et de routes Laravel sur hébergement mutualisé.

$cacheFiles = [
    __DIR__ . '/../bootstrap/cache/routes-v7.php',
    __DIR__ . '/../bootstrap/cache/config.php',
    __DIR__ . '/../bootstrap/cache/services.php',
    __DIR__ . '/../bootstrap/cache/packages.php'
];

echo "<h3>Nettoyage du cache Laravel :</h3><ul>";

foreach ($cacheFiles as $file) {
    if (file_exists($file)) {
        if (@unlink($file)) {
            echo "<li>Supprimé avec succès : <code>" . basename($file) . "</code></li>";
        } else {
            echo "<li style='color:red;'>Échec de la suppression de : <code>" . basename($file) . "</code> (Vérifiez les permissions)</li>";
        }
    } else {
        echo "<li>Fichier non présent (déjà nettoyé) : <code>" . basename($file) . "</code></li>";
    }
}

echo "</ul><p><strong>Terminé ! Réessayez d'accéder à <code>/storage-setup</code> maintenant.</strong></p>";
