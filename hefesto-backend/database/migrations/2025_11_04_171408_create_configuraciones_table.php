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
        Schema::create('configuraciones', function (Blueprint $table) {
            $table->id();
            $table->string('categoria'); // Ej: 'credenciales', 'seguridad', 'notificaciones'
            $table->string('clave')->unique(); // Ej: 'recuperacion_password', '2fa_habilitado'
            $table->string('nombre'); // Nombre descriptivo
            $table->text('valor')->nullable(); // Valor de la configuración
            $table->text('descripcion')->nullable();
            $table->string('tipo')->default('texto'); // texto, booleano, numero, json
            $table->boolean('activo')->default(true);
            $table->timestamps();
            
            $table->index(['categoria', 'clave']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuraciones');
    }
};
