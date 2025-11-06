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
        Schema::create('reportes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nombre');
            $table->string('tipo'); // solicitudes, usuarios, actividades, estadisticas
            $table->string('formato'); // pdf, excel, csv
            $table->string('ruta')->nullable();
            $table->json('parametros')->nullable(); // Parámetros del reporte
            $table->json('filtros')->nullable(); // Filtros aplicados
            $table->integer('total_registros')->default(0);
            $table->integer('tamano')->unsigned()->nullable();
            $table->enum('estado', ['generando', 'completado', 'error'])->default('generando');
            $table->text('error_mensaje')->nullable();
            $table->timestamp('fecha_expiracion')->nullable();
            $table->integer('descargas')->default(0);
            $table->timestamp('ultima_descarga')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'tipo']);
            $table->index('estado');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reportes');
    }
};
