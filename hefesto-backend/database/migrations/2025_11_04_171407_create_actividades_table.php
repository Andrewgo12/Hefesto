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
        Schema::create('actividades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('usuario_email'); // Email del usuario que realizó la acción
            $table->string('accion'); // Ej: 'Crear Solicitud', 'Aprobar', 'Rechazar'
            $table->text('descripcion'); // Descripción detallada
            $table->string('modulo'); // Ej: 'Registro', 'Control', 'Configuración'
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->json('datos_adicionales')->nullable(); // Datos extra en JSON
            $table->timestamps();
            
            $table->index(['user_id', 'created_at']);
            $table->index('modulo');
            $table->index('accion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividades');
    }
};
