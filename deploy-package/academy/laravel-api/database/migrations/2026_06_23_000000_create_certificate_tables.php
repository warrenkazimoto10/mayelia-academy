<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cert_participants', function (Blueprint $table) {
            $table->id();
            $table->string('civility')->default('M.');
            $table->string('full_name');
            $table->timestamps();
        });

        Schema::create('cert_trainings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('client')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('issue_place')->default('Abidjan');
            $table->date('issue_date');
            $table->timestamps();
        });

        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('ref')->unique();
            $table->foreignId('cert_participant_id')->constrained('cert_participants')->cascadeOnDelete();
            $table->foreignId('cert_training_id')->constrained('cert_trainings')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['cert_participant_id', 'cert_training_id']);
        });

        Schema::create('cert_ref_counters', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('year')->unique();
            $table->unsignedInteger('last_number')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('cert_ref_counters');
        Schema::dropIfExists('cert_trainings');
        Schema::dropIfExists('cert_participants');
    }
};
