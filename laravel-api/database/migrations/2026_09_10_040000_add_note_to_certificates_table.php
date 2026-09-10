<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Note (sur 20) attribuée au participant pour cette formation — affichée et
// modifiable dans la liste des inscrits, mais jamais imprimée sur le certificat.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->decimal('note', 4, 2)->nullable()->after('show_signature');
        });
    }

    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn('note');
        });
    }
};
