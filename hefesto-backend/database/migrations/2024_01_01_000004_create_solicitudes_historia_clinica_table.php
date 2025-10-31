<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitudes_historia_clinica', function (Blueprint $table) {
            $table->id();
            
            // Encabezado
            $table->string('codigo_formato')->default('FOR-GDI-SIS-003');
            $table->string('version')->default('2');
            $table->date('fecha_solicitud');
            
            // Datos del solicitante
            $table->string('nombre_completo');
            $table->string('cedula');
            $table->string('celular');
            $table->string('correo_electronico');
            $table->string('registro_codigo');
            $table->string('area_servicio');
            $table->string('especialidad');
            $table->text('observaciones')->nullable();
            
            // Perfil
            $table->enum('perfil', [
                'Médico especialista',
                'Médico residente',
                'Médico general',
                'Auditor',
                'Enfermero jefe',
                'Auxiliar de enfermería',
                'Terapeuta',
                'Otro'
            ]);
            $table->string('perfil_otro')->nullable();
            
            // Vinculación y terminal
            $table->enum('tipo_vinculacion', ['Interno', 'Externo']);
            $table->enum('terminal_asignado', ['Tablet', 'Portátil', 'Otro']);
            $table->string('terminal_otro')->nullable();
            
            // Capacitaciones (JSON)
            $table->json('capacitacion_historia_clinica');
            $table->json('capacitacion_epidemiologia')->nullable();
            
            // Aval institucional (JSON)
            $table->json('aval_institucional');
            
            // Firmas (JSON)
            $table->json('firmas')->nullable();
            
            // Sistemas
            $table->string('login_creado_por')->nullable();
            
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
            $table->index('perfil');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes_historia_clinica');
    }
};
