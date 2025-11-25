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
        Schema::create('politicas_seguridad', function (Blueprint $table) {
            $table->id();
            $table->integer('tiempo_sesion_minutos')->default(120);
            $table->integer('intentos_login_permitidos')->default(5);
            $table->integer('tiempo_bloqueo_minutos')->default(15);
            $table->boolean('requiere_2fa')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('politicas_seguridad');
    }
};
