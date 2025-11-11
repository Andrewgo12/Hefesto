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
        Schema::create('credenciales_firmas', function (Blueprint $table) {
            $table->id();
            $table->string('cargo')->unique(); // Ej: "Jefe Inmediato", "Talento Humano", etc.
            $table->string('nombre_completo');
            $table->string('email')->unique();
            $table->string('cedula')->nullable();
            $table->string('area_departamento')->nullable();
            $table->boolean('activo')->default(true);
            $table->text('descripcion')->nullable();
            $table->string('tipo_formulario'); // 'administrativa', 'historia_clinica', 'ambos'
            $table->integer('orden')->default(0); // Para ordenar en la UI
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credenciales_firmas');
    }
};
