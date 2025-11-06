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
        Schema::create('flujos_aprobacion', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Ej: 'Flujo Solicitud Administrativa', 'Flujo Historia Clínica'
            $table->string('tipo_solicitud'); // 'administrativo', 'historia_clinica'
            $table->text('descripcion')->nullable();
            $table->integer('total_pasos'); // Número total de firmas requeridas
            $table->boolean('activo')->default(true);
            $table->timestamps();
            
            $table->index('tipo_solicitud');
            $table->index('activo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flujos_aprobacion');
    }
};
