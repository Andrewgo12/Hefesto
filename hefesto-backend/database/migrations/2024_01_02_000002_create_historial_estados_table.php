<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabla para registrar todos los cambios de estado de las solicitudes
     */
    public function up(): void
    {
        Schema::create('historial_estados', function (Blueprint $table) {
            $table->id();
            
            // Referencia a la solicitud (polimórfica)
            $table->morphs('solicitable'); // solicitable_id, solicitable_type
            
            // Estado
            $table->string('estado_anterior')->nullable();
            $table->string('estado_nuevo');
            $table->string('fase')->nullable();
            
            // Usuario que realizó el cambio
            $table->foreignId('usuario_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('usuario_nombre');
            $table->string('usuario_email')->nullable();
            
            // Detalles del cambio
            $table->text('observaciones')->nullable();
            $table->text('motivo')->nullable();
            $table->json('datos_adicionales')->nullable(); // Para guardar info extra como firmas, etc.
            
            // Metadata
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            
            $table->timestamps();
            
            // Índices (morphs() ya crea el índice para solicitable_type y solicitable_id)
            $table->index('estado_nuevo');
            $table->index('usuario_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_estados');
    }
};
