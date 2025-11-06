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
        Schema::create('firmas_solicitud', function (Blueprint $table) {
            $table->id();
            $table->morphs('solicitud'); // solicitud_id, solicitud_type (polimórfica)
            $table->foreignId('paso_aprobacion_id')->constrained('pasos_aprobacion')->onDelete('cascade');
            $table->foreignId('firmado_por')->nullable()->constrained('users')->onDelete('set null');
            $table->string('nombre_firmante'); // Nombre de quien firmó
            $table->string('cargo_firmante'); // Cargo de quien firmó
            $table->string('credencial_usada')->nullable(); // Credencial que usó
            $table->enum('estado', ['pendiente', 'aprobado', 'rechazado'])->default('pendiente');
            $table->text('observaciones')->nullable();
            $table->text('motivo_rechazo')->nullable();
            $table->timestamp('fecha_firma')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();
            
            // morphs() ya crea el índice para solicitud_type y solicitud_id
            $table->index('paso_aprobacion_id');
            $table->index('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('firmas_solicitud');
    }
};
