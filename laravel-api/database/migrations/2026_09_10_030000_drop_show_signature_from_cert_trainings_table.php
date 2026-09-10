<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Le paramètre "Afficher la signature" est déplacé de la formation (cert_trainings)
// vers chaque certificat (certificates) — voir 2026_09_10_020000 — pour permettre un
// réglage indépendant par participant au sein d'une même formation.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->dropColumn('show_signature');
        });
    }

    public function down(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->boolean('show_signature')->default(true)->after('training_place');
        });
    }
};
