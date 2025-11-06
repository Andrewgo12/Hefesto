<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PermisoRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Asigna permisos a cada rol según su función:
     * 1. Administrativo - Entrada de Datos
     * 2. Administrativo - Supervisor
     * 3. Médico - Consulta
     * 4. Técnico del Sistema
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Obtener IDs de roles
        $roles = DB::table('roles')->select('id', 'nombre')->get()->keyBy('nombre');
        
        // Obtener todos los permisos
        $permisos = DB::table('permisos')->select('id', 'nombre')->get()->keyBy('nombre');

        // ============================================
        // ROL 1: ADMINISTRATIVO - ENTRADA DE DATOS
        // ============================================
        $permisosAdminBasico = [
            // Solicitudes Administrativas - Solo propias
            'solicitudes_administrativas.crear',
            'solicitudes_administrativas.ver_propias',
            'solicitudes_administrativas.editar_propias',
            'solicitudes_administrativas.exportar',
            
            // Archivos
            'archivos.subir',
            'archivos.ver',
            'archivos.descargar',
            
            // Notificaciones
            'notificaciones.ver',
            'notificaciones.marcar_leida',
            
            // Exportaciones propias
            'exportaciones.crear',
            'exportaciones.ver',
            'exportaciones.descargar',
        ];

        $this->asignarPermisosARol(
            $roles['Administrativo - Entrada de Datos']->id,
            $permisosAdminBasico,
            $permisos,
            $now
        );

        // ============================================
        // ROL 2: ADMINISTRATIVO - SUPERVISOR
        // ============================================
        $permisosAdminSupervisor = [
            // Solicitudes Administrativas - Todas
            'solicitudes_administrativas.crear',
            'solicitudes_administrativas.ver_todas',
            'solicitudes_administrativas.editar_todas',
            'solicitudes_administrativas.aprobar',
            'solicitudes_administrativas.rechazar',
            'solicitudes_administrativas.firmar',
            'solicitudes_administrativas.exportar',
            
            // Credenciales de Firma
            'credenciales_firma.ver',
            
            // Archivos
            'archivos.subir',
            'archivos.ver',
            'archivos.descargar',
            
            // Notificaciones
            'notificaciones.ver',
            'notificaciones.marcar_leida',
            'notificaciones.enviar',
            
            // Reportes
            'reportes.generar',
            'reportes.ver',
            'reportes.exportar',
            
            // Exportaciones
            'exportaciones.crear',
            'exportaciones.ver',
            'exportaciones.descargar',
            
            // Usuarios - Solo ver
            'usuarios.ver',
        ];

        $this->asignarPermisosARol(
            $roles['Administrativo - Supervisor']->id,
            $permisosAdminSupervisor,
            $permisos,
            $now
        );

        // ============================================
        // ROL 3: MÉDICO - CONSULTA
        // ============================================
        $permisosMedico = [
            // Solicitudes Historia Clínica - Solo propias
            'solicitudes_historia_clinica.crear',
            'solicitudes_historia_clinica.ver_propias',
            'solicitudes_historia_clinica.editar_propias',
            'solicitudes_historia_clinica.firmar',
            'solicitudes_historia_clinica.exportar',
            
            // Archivos
            'archivos.subir',
            'archivos.ver',
            'archivos.descargar',
            
            // Notificaciones
            'notificaciones.ver',
            'notificaciones.marcar_leida',
            
            // Exportaciones propias
            'exportaciones.crear',
            'exportaciones.ver',
            'exportaciones.descargar',
        ];

        $this->asignarPermisosARol(
            $roles['Médico - Consulta']->id,
            $permisosMedico,
            $permisos,
            $now
        );

        // ============================================
        // ROL 4: TÉCNICO DEL SISTEMA (ADMINISTRADOR)
        // ============================================
        // Asignar TODOS los permisos
        $todoLosPermisos = $permisos->pluck('id')->toArray();
        
        foreach ($todoLosPermisos as $permisoId) {
            DB::table('permiso_role')->insert([
                'role_id' => $roles['Técnico del Sistema']->id,
                'permiso_id' => $permisoId,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $this->command->info('✅ Permisos asignados a roles exitosamente');
        $this->command->info('   - Administrativo - Entrada de Datos: ' . count($permisosAdminBasico) . ' permisos');
        $this->command->info('   - Administrativo - Supervisor: ' . count($permisosAdminSupervisor) . ' permisos');
        $this->command->info('   - Médico - Consulta: ' . count($permisosMedico) . ' permisos');
        $this->command->info('   - Técnico del Sistema: ' . count($todoLosPermisos) . ' permisos (TODOS)');
    }

    /**
     * Asigna un array de permisos a un rol
     */
    private function asignarPermisosARol($roleId, array $nombresPermisos, $permisos, $now)
    {
        foreach ($nombresPermisos as $nombrePermiso) {
            if (isset($permisos[$nombrePermiso])) {
                DB::table('permiso_role')->insert([
                    'role_id' => $roleId,
                    'permiso_id' => $permisos[$nombrePermiso]->id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
