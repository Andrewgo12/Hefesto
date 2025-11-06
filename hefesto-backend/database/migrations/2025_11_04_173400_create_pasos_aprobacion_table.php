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
        Schema::create('pasos_aprobacion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flujo_id')->constrained('flujos_aprobacion')->onDelete('cascade');
            $table->integer('orden'); // 1, 2, 3... (orden de las firmas)
            $table->string('nombre_paso'); // Ej: 'Jefe inmediato', 'Talento Humano'
            $table->string('cargo_requerido'); // Cargo que debe firmar
            $table->foreignId('credencial_firma_id')->nullable()->constrained('credenciales_firma')->onDelete('set null');
            $table->text('descripcion')->nullable();
            $table->boolean('obligatorio')->default(true);
            $table->boolean('permite_rechazo')->default(true);
            $table->timestamps();
            
            $table->index(['flujo_id', 'orden']);
            $table->unique(['flujo_id', 'orden']); // No puede haber 2 pasos con el mismo orden en un flujo
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasos_aprobacion');
    }
};
