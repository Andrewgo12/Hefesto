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
        Schema::create('parametros_sistema', function (Blueprint $table) {
            $table->id();
            $table->string('clave')->unique(); // Ej: 'politica_contrasena'
            $table->string('nombre'); // Ej: 'Política de Contraseña'
            $table->text('valor'); // Valor del parámetro
            $table->text('descripcion')->nullable();
            $table->string('tipo')->default('texto'); // texto, numero, booleano, json
            $table->boolean('editable')->default(true);
            $table->timestamps();
            
            $table->index('clave');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parametros_sistema');
    }
};
