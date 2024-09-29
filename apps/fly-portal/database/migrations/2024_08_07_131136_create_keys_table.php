<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')
                ->constrained()
                ->nullable()
                ->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->text('private_key')->nullable();
            $table->text('public_key')->nullable();
            $table->foreignId('user_id')
                ->constrained()
                ->nullable()
                ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keys');
    }
};
