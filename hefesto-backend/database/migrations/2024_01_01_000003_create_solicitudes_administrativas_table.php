<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitudes_administrativas', function (Blueprint $table) {
            $table->id();
            
            // Encabezado
            $table->string('codigo_formato')->default('FOR-GDI-SIS-004');
            $table->string('version')->default('1');
            $table->date('fecha_solicitud');
            
            // Datos del solicitante
            $table->string('nombre_completo');
            $table->string('cedula');
            $table->string('cargo');
            $table->string('area_servicio');
            $table->string('telefono_extension');
            
            // Tipo de vinculación
            $table->enum('tipo_vinculacion', ['Planta', 'Agremiado', 'Contrato']);
            
            // Módulos SERVINTE (JSON)
            $table->json('modulos_administrativos')->nullable();
            $table->json('modulos_financieros')->nullable();
            
            // Permisos
            $table->json('tipo_permiso')->nullable();
            $table->string('perfil_de')->nullable();
            
            // Opciones Web (JSON)
            $table->json('opciones_web')->nullable();
            
            // Firmas (JSON)
            $table->json('firmas')->nullable();
            
            // Sistemas
            $table->string('login_asignado')->nullable();
            $table->string('clave_temporal')->nullable();
            
            // Estado y control
            $table->enum('estado', ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'])->default('Pendiente');
            $table->boolean('acepta_responsabilidad')->default(false);
            
            // Auditoría
            $table->foreignId('usuario_creador_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
            
            // Índices
            $table->index('cedula');
            $table->index('estado');
            $table->index('fecha_solicitud');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes_administrativas');
    }
};
