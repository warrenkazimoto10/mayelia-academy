<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Lieu où la formation s'est réellement déroulée (ex. "Fadyadougou"), distinct
     * du lieu de délivrance du certificat (issue_place, ex. "Abidjan"). Le modèle
     * de certificat validé par le client affiche les deux lieux séparément.
     */
    public function up(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->string('training_place')->nullable()->after('end_date');
        });
    }

    public function down(): void
    {
        Schema::table('cert_trainings', function (Blueprint $table) {
            $table->dropColumn('training_place');
        });
    }
};
