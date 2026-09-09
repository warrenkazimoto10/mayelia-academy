<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->boolean('validated')->default(false)->after('ref');
        });

        DB::statement('ALTER TABLE certificates MODIFY ref VARCHAR(255) NULL');
    }

    public function down(): void
    {
        DB::statement("UPDATE certificates SET ref = CONCAT('MAY-0000-', LPAD(id, 4, '0')) WHERE ref IS NULL");
        DB::statement('ALTER TABLE certificates MODIFY ref VARCHAR(255) NOT NULL');

        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn('validated');
        });
    }
};
