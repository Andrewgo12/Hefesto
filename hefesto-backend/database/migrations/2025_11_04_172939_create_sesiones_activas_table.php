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
        Schema::create('sesiones_activas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('token')->unique();
            $table->string('ip_address');
            $table->string('user_agent');
            $table->string('dispositivo')->nullable();
            $table->string('navegador')->nullable();
            $table->timestamp('ultimo_acceso')->nullable();
            $table->timestamp('expira_en')->nullable();
            $table->boolean('activa')->default(true);
            $table->timestamps();
            
            $table->index(['user_id', 'activa']);
            $table->index('expira_en');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesiones_activas');
    }
};
