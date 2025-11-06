<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Actualizar solicitudes administrativas
        Schema::table('solicitudes_administrativas', function (Blueprint $table) {
            // Cambiar el enum de estado para incluir más opciones
            $table->dropColumn('estado');
        });
        
        Schema::table('solicitudes_administrativas', function (Blueprint $table) {
            $table->enum('estado', [
                'Pendiente',
                'Pendiente firma(s)',
                'En proceso',
                'En revisión',
                'Aprobado',
                'Rechazado',
                'Cancelado'
            ])->default('Pendiente')->after('acepta_responsabilidad');
            
            // Campos adicionales de seguimiento
            $table->string('fase_actual')->nullable()->after('estado');
            $table->integer('firmas_pendientes')->default(0)->after('fase_actual');
            $table->integer('firmas_completadas')->default(0)->after('firmas_pendientes');
            $table->text('observaciones_estado')->nullable()->after('firmas_completadas');
            $table->timestamp('fecha_aprobacion')->nullable()->after('observaciones_estado');
            $table->timestamp('fecha_rechazo')->nullable()->after('fecha_aprobacion');
            $table->foreignId('usuario_aprobador_id')->nullable()->constrained('users')->onDelete('set null')->after('fecha_rechazo');
            $table->foreignId('usuario_rechazador_id')->nullable()->constrained('users')->onDelete('set null')->after('usuario_aprobador_id');
            
            // Información del usuario que registró
            $table->string('registrado_por_nombre')->nullable()->after('usuario_creador_id');
            $table->string('registrado_por_email')->nullable()->after('registrado_por_nombre');
        });
        
        // Actualizar solicitudes historia clínica
        Schema::table('solicitudes_historia_clinica', function (Blueprint $table) {
            $table->dropColumn('estado');
        });
        
        Schema::table('solicitudes_historia_clinica', function (Blueprint $table) {
            $table->enum('estado', [
                'Pendiente',
                'Pendiente firma(s)',
                'En proceso',
                'En revisión',
                'Aprobado',
                'Rechazado',
                'Cancelado'
            ])->default('Pendiente')->after('acepta_responsabilidad');
            
            // Campos adicionales de seguimiento
            $table->string('fase_actual')->nullable()->after('estado');
            $table->integer('firmas_pendientes')->default(0)->after('fase_actual');
            $table->integer('firmas_completadas')->default(0)->after('firmas_pendientes');
            $table->text('observaciones_estado')->nullable()->after('firmas_completadas');
            $table->timestamp('fecha_aprobacion')->nullable()->after('observaciones_estado');
            $table->timestamp('fecha_rechazo')->nullable()->after('fecha_aprobacion');
            $table->foreignId('usuario_aprobador_id')->nullable()->constrained('users')->onDelete('set null')->after('fecha_rechazo');
            $table->foreignId('usuario_rechazador_id')->nullable()->constrained('users')->onDelete('set null')->after('usuario_aprobador_id');
            
            // Información del usuario que registró
            $table->string('registrado_por_nombre')->nullable()->after('usuario_creador_id');
            $table->string('registrado_por_email')->nullable()->after('registrado_por_nombre');
        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_administrativas', function (Blueprint $table) {
            $table->dropColumn([
                'fase_actual',
                'firmas_pendientes',
                'firmas_completadas',
                'observaciones_estado',
                'fecha_aprobacion',
                'fecha_rechazo',
                'usuario_aprobador_id',
                'usuario_rechazador_id',
                'registrado_por_nombre',
                'registrado_por_email'
            ]);
        });
        
        Schema::table('solicitudes_historia_clinica', function (Blueprint $table) {
            $table->dropColumn([
                'fase_actual',
                'firmas_pendientes',
                'firmas_completadas',
                'observaciones_estado',
                'fecha_aprobacion',
                'fecha_rechazo',
                'usuario_aprobador_id',
                'usuario_rechazador_id',
                'registrado_por_nombre',
                'registrado_por_email'
            ]);
        });
    }
};
