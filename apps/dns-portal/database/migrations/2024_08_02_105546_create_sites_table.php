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
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->index();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('port')->nullable();
            $table->string('domain')->nullable();
            $table->string('path')->nullable();
            $table->string('php_version')->nullable();
            $table->string('database')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
