<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Permet de retirer la signature du président sur le certificat d'une formation
     * donnée (ex. tant qu'elle n'a pas encore été validée officiellement). Activée
     * par défaut pour ne changer aucun comportement existant.
     */
    public function up(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->boolean('show_signature')->default(true)->after('training_place');
        });
    }

    public function down(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->dropColumn('show_signature');
        });
    }
};
