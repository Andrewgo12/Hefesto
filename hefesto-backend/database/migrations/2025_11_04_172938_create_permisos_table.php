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
        Schema::create('permisos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique(); // Ej: 'solicitudes.crear', 'usuarios.editar'
            $table->string('modulo'); // Ej: 'solicitudes', 'usuarios', 'configuracion'
            $table->string('accion'); // Ej: 'crear', 'editar', 'eliminar', 'ver'
            $table->text('descripcion')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
            
            $table->index('modulo');
            $table->index('accion');
        });
        
        // Tabla pivote role_permiso
        Schema::create('permiso_role', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->foreignId('permiso_id')->constrained('permisos')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['role_id', 'permiso_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permiso_role');
        Schema::dropIfExists('permisos');
    }
};
