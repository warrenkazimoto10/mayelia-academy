<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    // Dimension max (côté le plus long) pour toute image uploadée depuis l'admin.
    private const MAX_DIMENSION = 1920;
    private const JPEG_QUALITY = 82;
    private const WEBP_QUALITY = 82;
    private const PNG_COMPRESSION = 6;

    public function image(Request $request)
    {
        // Limite haute côté validation : on accepte les photos brutes (appareil/téléphone),
        // le redimensionnement ci-dessous ramène le fichier réellement stocké à une taille raisonnable.
        $request->validate([
            'file' => 'required|image|max:20480',
        ]);

        $uploaded = $request->file('file');
        $extension = strtolower($uploaded->getClientOriginalExtension() ?: $uploaded->extension() ?: 'jpg');
        $filename = Str::random(40) . '.' . $extension;
        $path = 'uploads/' . $filename;

        $processed = $this->resizeAndCompress($uploaded->getRealPath());
        $contents = $processed ?? file_get_contents($uploaded->getRealPath());

        Storage::disk('public')->put($path, $contents);

        return response()->json([
            'success' => true,
            'data' => ['url' => '/storage/' . $path],
        ]);
    }

    /**
     * Redimensionne (si besoin) et recompresse l'image pour accélérer le chargement du site.
     * Renvoie null (fichier original conservé tel quel) si GD est indisponible ou le format non géré.
     */
    private function resizeAndCompress(string $filePath): ?string
    {
        if (! extension_loaded('gd')) {
            return null;
        }

        $info = @getimagesize($filePath);
        if (! $info) {
            return null;
        }

        [$width, $height, $type] = $info;

        $source = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($filePath),
            IMAGETYPE_PNG => @imagecreatefrompng($filePath),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($filePath) : false,
            default => false,
        };

        if (! $source) {
            return null;
        }

        $scale = min(1, self::MAX_DIMENSION / max($width, $height));
        $targetWidth = max(1, (int) round($width * $scale));
        $targetHeight = max(1, (int) round($height * $scale));

        $target = imagecreatetruecolor($targetWidth, $targetHeight);

        if ($type === IMAGETYPE_PNG) {
            imagealphablending($target, false);
            imagesavealpha($target, true);
        }

        imagecopyresampled($target, $source, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);

        ob_start();
        $ok = match ($type) {
            IMAGETYPE_JPEG => imagejpeg($target, null, self::JPEG_QUALITY),
            IMAGETYPE_PNG => imagepng($target, null, self::PNG_COMPRESSION),
            IMAGETYPE_WEBP => imagewebp($target, null, self::WEBP_QUALITY),
            default => false,
        };
        $data = ob_get_clean();

        imagedestroy($source);
        imagedestroy($target);

        return $ok && $data ? $data : null;
    }
}
