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
        Schema::create('respaldos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Quién lo creó
            $table->string('nombre_archivo');
            $table->string('ruta');
            $table->string('tipo'); // completo, incremental, manual
            $table->integer('tamano')->unsigned(); // Tamaño en bytes
            $table->json('tablas_incluidas')->nullable(); // Qué tablas se respaldaron
            $table->enum('estado', ['procesando', 'completado', 'error'])->default('procesando');
            $table->text('error_mensaje')->nullable();
            $table->timestamp('fecha_expiracion')->nullable();
            $table->boolean('restaurado')->default(false);
            $table->timestamp('fecha_restauracion')->nullable();
            $table->foreignId('restaurado_por')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index('tipo');
            $table->index('estado');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respaldos');
    }
};
