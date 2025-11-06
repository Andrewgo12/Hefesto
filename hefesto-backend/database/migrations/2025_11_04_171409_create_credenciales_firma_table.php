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
        Schema::create('credenciales_firma', function (Blueprint $table) {
            $table->id();
            $table->string('cargo')->unique(); // Ej: 'Jefe inmediato', 'Jefe de Talento Humano'
            $table->string('credencial'); // Credencial encriptada
            $table->text('descripcion')->nullable();
            $table->boolean('activo')->default(true);
            $table->integer('intentos_fallidos')->default(0);
            $table->timestamp('ultimo_uso')->nullable();
            $table->timestamps();
            
            $table->index('cargo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credenciales_firma');
    }
};
