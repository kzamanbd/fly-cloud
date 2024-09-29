<?php

use App\Models\User;
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
        Schema::create('servers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->index();
            $table->foreignIdFor(User::class)->onDelete('cascade');
            $table->string('name');
            $table->string('ip_address');
            $table->string('port');
            $table->string('username');
            $table->string('password');
            $table->string('private_key');
            $table->string('public_key');
            $table->string('php_version');
            $table->string('database');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servers');
    }
};
