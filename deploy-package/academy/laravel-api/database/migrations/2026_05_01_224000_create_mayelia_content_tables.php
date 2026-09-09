<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('actualites', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('excerpt');
            $table->string('category', 100);
            $table->string('date', 50);
            $table->string('read_time', 20);
            $table->string('category_color', 100);
            $table->string('hero_image', 500);
            $table->timestamps();
            $table->index('category');
            $table->index('date');
        });

        Schema::create('actualite_paragraphs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actualite_id')->constrained('actualites')->cascadeOnDelete();
            $table->text('text');
            $table->string('image_src', 500)->nullable();
            $table->string('image_alt', 255)->nullable();
            $table->text('image_caption')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
            $table->index(['actualite_id', 'display_order']);
        });

        Schema::create('conseils', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('excerpt');
            $table->string('category', 100);
            $table->string('date', 50);
            $table->string('read_time', 20);
            $table->string('category_color', 100);
            $table->string('image', 500)->nullable();
            $table->text('content')->nullable();
            $table->timestamps();
            $table->index('category');
        });

        Schema::create('conseil_paragraphs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conseil_id')->constrained('conseils')->cascadeOnDelete();
            $table->text('text');
            $table->string('image_src', 500)->nullable();
            $table->string('image_alt', 255)->nullable();
            $table->text('image_caption')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('formation_domaines', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 120)->unique();
            $table->string('title', 500);
            $table->string('icon_key', 50)->default('truck');
            $table->string('color_tailwind', 200);
            $table->string('gradient_tailwind', 200);
            $table->string('image_url', 800);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('formation_programmes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('domaine_id')->constrained('formation_domaines')->cascadeOnDelete();
            $table->string('title', 500);
            $table->text('description');
            $table->json('contenus_json');
            $table->json('objectifs_json');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formation_programmes');
        Schema::dropIfExists('formation_domaines');
        Schema::dropIfExists('conseil_paragraphs');
        Schema::dropIfExists('conseils');
        Schema::dropIfExists('actualite_paragraphs');
        Schema::dropIfExists('actualites');
    }
};
