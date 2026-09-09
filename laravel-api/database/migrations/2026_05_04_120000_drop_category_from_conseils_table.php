<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('conseils', function (Blueprint $table) {
            $table->dropIndex(['category']);
        });
        Schema::table('conseils', function (Blueprint $table) {
            $table->dropColumn(['category', 'category_color']);
        });
    }

    public function down(): void
    {
        Schema::table('conseils', function (Blueprint $table) {
            $table->string('category', 100)->default('');
            $table->string('category_color', 100)->default('');
            $table->index('category');
        });
    }
};
