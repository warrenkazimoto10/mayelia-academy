<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            // Opacité (0-100) du masque bleu dégradé posé sur l'image de fond du slide.
            $table->unsignedTinyInteger('overlay_opacity')->default(90)->after('image_url');
        });
    }

    public function down(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->dropColumn('overlay_opacity');
        });
    }
};
