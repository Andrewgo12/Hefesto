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
        Schema::create('exportaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('tipo'); // excel, pdf, csv
            $table->string('nombre_archivo');
            $table->string('ruta');
            $table->string('modulo'); // solicitudes, usuarios, reportes
            $table->json('filtros_aplicados')->nullable(); // Filtros usados en la exportación
            $table->integer('total_registros')->default(0);
            $table->integer('tamano')->unsigned(); // Tamaño en bytes
            $table->enum('estado', ['procesando', 'completado', 'error'])->default('procesando');
            $table->text('error_mensaje')->nullable();
            $table->timestamp('fecha_expiracion')->nullable(); // Cuándo se elimina automáticamente
            $table->integer('descargas')->default(0); // Contador de descargas
            $table->timestamp('ultima_descarga')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['user_id', 'created_at']);
            $table->index('tipo');
            $table->index('modulo');
            $table->index('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exportaciones');
    }
};
