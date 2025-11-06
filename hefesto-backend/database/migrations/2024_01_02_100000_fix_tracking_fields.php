<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Verificar si la tabla historial_estados existe, si no, crearla
        if (!Schema::hasTable('historial_estados')) {
            Schema::create('historial_estados', function (Blueprint $table) {
                $table->id();
                $table->morphs('solicitable');
                $table->string('estado_anterior')->nullable();
                $table->string('estado_nuevo');
                $table->string('fase')->nullable();
                $table->foreignId('usuario_id')->nullable()->constrained('users')->onDelete('set null');
                $table->string('usuario_nombre');
                $table->string('usuario_email')->nullable();
                $table->text('observaciones')->nullable();
                $table->text('motivo')->nullable();
                $table->json('datos_adicionales')->nullable();
                $table->string('ip_address')->nullable();
                $table->string('user_agent')->nullable();
                $table->timestamps();
                
                $table->index('estado_nuevo');
                $table->index('created_at');
            });
        }

        // Verificar y agregar columnas faltantes en solicitudes_administrativas
        Schema::table('solicitudes_administrativas', function (Blueprint $table) {
            if (!Schema::hasColumn('solicitudes_administrativas', 'fase_actual')) {
                $table->string('fase_actual')->nullable()->after('estado');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'firmas_pendientes')) {
                $table->integer('firmas_pendientes')->default(0)->after('fase_actual');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'firmas_completadas')) {
                $table->integer('firmas_completadas')->default(0)->after('firmas_pendientes');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'observaciones_estado')) {
                $table->text('observaciones_estado')->nullable()->after('firmas_completadas');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'fecha_aprobacion')) {
                $table->timestamp('fecha_aprobacion')->nullable()->after('observaciones_estado');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'fecha_rechazo')) {
                $table->timestamp('fecha_rechazo')->nullable()->after('fecha_aprobacion');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'usuario_aprobador_id')) {
                $table->foreignId('usuario_aprobador_id')->nullable()->constrained('users')->onDelete('set null')->after('fecha_rechazo');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'usuario_rechazador_id')) {
                $table->foreignId('usuario_rechazador_id')->nullable()->constrained('users')->onDelete('set null')->after('usuario_aprobador_id');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'registrado_por_nombre')) {
                $table->string('registrado_por_nombre')->nullable()->after('usuario_creador_id');
            }
            if (!Schema::hasColumn('solicitudes_administrativas', 'registrado_por_email')) {
                $table->string('registrado_por_email')->nullable()->after('registrado_por_nombre');
            }
        });

        // Verificar y agregar columnas faltantes en solicitudes_historia_clinica
        Schema::table('solicitudes_historia_clinica', function (Blueprint $table) {
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'fase_actual')) {
                $table->string('fase_actual')->nullable()->after('estado');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'firmas_pendientes')) {
                $table->integer('firmas_pendientes')->default(0)->after('fase_actual');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'firmas_completadas')) {
                $table->integer('firmas_completadas')->default(0)->after('firmas_pendientes');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'observaciones_estado')) {
                $table->text('observaciones_estado')->nullable()->after('firmas_completadas');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'fecha_aprobacion')) {
                $table->timestamp('fecha_aprobacion')->nullable()->after('observaciones_estado');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'fecha_rechazo')) {
                $table->timestamp('fecha_rechazo')->nullable()->after('fecha_aprobacion');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'usuario_aprobador_id')) {
                $table->foreignId('usuario_aprobador_id')->nullable()->constrained('users')->onDelete('set null')->after('fecha_rechazo');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'usuario_rechazador_id')) {
                $table->foreignId('usuario_rechazador_id')->nullable()->constrained('users')->onDelete('set null')->after('usuario_aprobador_id');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'registrado_por_nombre')) {
                $table->string('registrado_por_nombre')->nullable()->after('usuario_creador_id');
            }
            if (!Schema::hasColumn('solicitudes_historia_clinica', 'registrado_por_email')) {
                $table->string('registrado_por_email')->nullable()->after('registrado_por_nombre');
            }
        });
    }

    public function down(): void
    {
        // No hacer nada en el down para evitar problemas
    }
};
