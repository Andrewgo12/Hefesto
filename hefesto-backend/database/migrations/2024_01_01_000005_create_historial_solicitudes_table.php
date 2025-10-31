<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_solicitudes', function (Blueprint $table) {
            $table->id();
            $table->morphs('solicitud'); // solicitud_id, solicitud_type
            $table->enum('accion', ['Creada', 'En revisión', 'Aprobada', 'Rechazada', 'Modificada']);
            $table->text('comentario')->nullable();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Índices
            $table->index(['solicitud_type', 'solicitud_id']);
            $table->index('accion');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_solicitudes');
    }
};
