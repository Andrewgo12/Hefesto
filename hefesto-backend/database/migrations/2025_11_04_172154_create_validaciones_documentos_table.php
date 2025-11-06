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
        Schema::create('validaciones_documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('archivo_id')->constrained('archivos')->onDelete('cascade');
            $table->foreignId('validador_id')->constrained('users')->onDelete('cascade');
            $table->enum('resultado', ['aprobado', 'rechazado', 'pendiente'])->default('pendiente');
            $table->text('observaciones')->nullable();
            $table->json('criterios_validacion')->nullable(); // Criterios que se validaron
            $table->boolean('documento_legible')->default(true);
            $table->boolean('informacion_completa')->default(true);
            $table->boolean('documento_vigente')->default(true);
            $table->timestamp('fecha_validacion');
            $table->timestamps();
            
            $table->index('archivo_id');
            $table->index('validador_id');
            $table->index('resultado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validaciones_documentos');
    }
};
