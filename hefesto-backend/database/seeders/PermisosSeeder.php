<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PermisosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        
        $permisos = [
            // ============================================
            // MÓDULO: SOLICITUDES ADMINISTRATIVAS
            // ============================================
            [
                'nombre' => 'solicitudes_administrativas.crear',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'crear',
                'descripcion' => 'Crear nuevas solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.ver_propias',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'ver_propias',
                'descripcion' => 'Ver solo sus propias solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.ver_todas',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'ver_todas',
                'descripcion' => 'Ver todas las solicitudes administrativas del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.editar_propias',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'editar_propias',
                'descripcion' => 'Editar sus propias solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.editar_todas',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'editar_todas',
                'descripcion' => 'Editar cualquier solicitud administrativa',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.eliminar',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.aprobar',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'aprobar',
                'descripcion' => 'Aprobar solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.rechazar',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'rechazar',
                'descripcion' => 'Rechazar solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.firmar',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'firmar',
                'descripcion' => 'Firmar solicitudes administrativas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_administrativas.exportar',
                'modulo' => 'solicitudes_administrativas',
                'accion' => 'exportar',
                'descripcion' => 'Exportar solicitudes administrativas a Excel',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: SOLICITUDES HISTORIA CLÍNICA
            // ============================================
            [
                'nombre' => 'solicitudes_historia_clinica.crear',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'crear',
                'descripcion' => 'Crear nuevas solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.ver_propias',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'ver_propias',
                'descripcion' => 'Ver solo sus propias solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.ver_todas',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'ver_todas',
                'descripcion' => 'Ver todas las solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.editar_propias',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'editar_propias',
                'descripcion' => 'Editar sus propias solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.editar_todas',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'editar_todas',
                'descripcion' => 'Editar cualquier solicitud de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.eliminar',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.aprobar',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'aprobar',
                'descripcion' => 'Aprobar solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.rechazar',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'rechazar',
                'descripcion' => 'Rechazar solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.firmar',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'firmar',
                'descripcion' => 'Firmar solicitudes de historia clínica',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'solicitudes_historia_clinica.exportar',
                'modulo' => 'solicitudes_historia_clinica',
                'accion' => 'exportar',
                'descripcion' => 'Exportar solicitudes de historia clínica a Excel',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: CREDENCIALES FIRMA
            // ============================================
            [
                'nombre' => 'credenciales_firma.crear',
                'modulo' => 'credenciales_firma',
                'accion' => 'crear',
                'descripcion' => 'Crear credenciales de firma para usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'credenciales_firma.ver',
                'modulo' => 'credenciales_firma',
                'accion' => 'ver',
                'descripcion' => 'Ver credenciales de firma',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'credenciales_firma.editar',
                'modulo' => 'credenciales_firma',
                'accion' => 'editar',
                'descripcion' => 'Editar credenciales de firma',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'credenciales_firma.eliminar',
                'modulo' => 'credenciales_firma',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar credenciales de firma',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'credenciales_firma.asignar',
                'modulo' => 'credenciales_firma',
                'accion' => 'asignar',
                'descripcion' => 'Asignar credenciales de firma a usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: USUARIOS
            // ============================================
            [
                'nombre' => 'usuarios.crear',
                'modulo' => 'usuarios',
                'accion' => 'crear',
                'descripcion' => 'Crear nuevos usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'usuarios.ver',
                'modulo' => 'usuarios',
                'accion' => 'ver',
                'descripcion' => 'Ver listado de usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'usuarios.editar',
                'modulo' => 'usuarios',
                'accion' => 'editar',
                'descripcion' => 'Editar información de usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'usuarios.eliminar',
                'modulo' => 'usuarios',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar usuarios del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'usuarios.asignar_roles',
                'modulo' => 'usuarios',
                'accion' => 'asignar_roles',
                'descripcion' => 'Asignar roles a usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'usuarios.cambiar_password',
                'modulo' => 'usuarios',
                'accion' => 'cambiar_password',
                'descripcion' => 'Cambiar contraseña de usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: ROLES
            // ============================================
            [
                'nombre' => 'roles.crear',
                'modulo' => 'roles',
                'accion' => 'crear',
                'descripcion' => 'Crear nuevos roles',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'roles.ver',
                'modulo' => 'roles',
                'accion' => 'ver',
                'descripcion' => 'Ver listado de roles',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'roles.editar',
                'modulo' => 'roles',
                'accion' => 'editar',
                'descripcion' => 'Editar roles existentes',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'roles.eliminar',
                'modulo' => 'roles',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar roles del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'roles.asignar_permisos',
                'modulo' => 'roles',
                'accion' => 'asignar_permisos',
                'descripcion' => 'Asignar permisos a roles',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: REPORTES
            // ============================================
            [
                'nombre' => 'reportes.generar',
                'modulo' => 'reportes',
                'accion' => 'generar',
                'descripcion' => 'Generar reportes del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'reportes.ver',
                'modulo' => 'reportes',
                'accion' => 'ver',
                'descripcion' => 'Ver reportes generados',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'reportes.exportar',
                'modulo' => 'reportes',
                'accion' => 'exportar',
                'descripcion' => 'Exportar reportes a diferentes formatos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: EXPORTACIONES
            // ============================================
            [
                'nombre' => 'exportaciones.crear',
                'modulo' => 'exportaciones',
                'accion' => 'crear',
                'descripcion' => 'Crear exportaciones de datos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'exportaciones.ver',
                'modulo' => 'exportaciones',
                'accion' => 'ver',
                'descripcion' => 'Ver historial de exportaciones',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'exportaciones.descargar',
                'modulo' => 'exportaciones',
                'accion' => 'descargar',
                'descripcion' => 'Descargar archivos exportados',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: NOTIFICACIONES
            // ============================================
            [
                'nombre' => 'notificaciones.ver',
                'modulo' => 'notificaciones',
                'accion' => 'ver',
                'descripcion' => 'Ver notificaciones propias',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'notificaciones.marcar_leida',
                'modulo' => 'notificaciones',
                'accion' => 'marcar_leida',
                'descripcion' => 'Marcar notificaciones como leídas',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'notificaciones.enviar',
                'modulo' => 'notificaciones',
                'accion' => 'enviar',
                'descripcion' => 'Enviar notificaciones a otros usuarios',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: ACTIVIDADES (AUDITORÍA)
            // ============================================
            [
                'nombre' => 'actividades.ver',
                'modulo' => 'actividades',
                'accion' => 'ver',
                'descripcion' => 'Ver log de actividades del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'actividades.exportar',
                'modulo' => 'actividades',
                'accion' => 'exportar',
                'descripcion' => 'Exportar log de actividades',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: CONFIGURACIÓN
            // ============================================
            [
                'nombre' => 'configuracion.ver',
                'modulo' => 'configuracion',
                'accion' => 'ver',
                'descripcion' => 'Ver configuración del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'configuracion.editar',
                'modulo' => 'configuracion',
                'accion' => 'editar',
                'descripcion' => 'Editar configuración del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: RESPALDOS
            // ============================================
            [
                'nombre' => 'respaldos.crear',
                'modulo' => 'respaldos',
                'accion' => 'crear',
                'descripcion' => 'Crear respaldos de la base de datos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'respaldos.ver',
                'modulo' => 'respaldos',
                'accion' => 'ver',
                'descripcion' => 'Ver listado de respaldos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'respaldos.restaurar',
                'modulo' => 'respaldos',
                'accion' => 'restaurar',
                'descripcion' => 'Restaurar respaldos de la base de datos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'respaldos.eliminar',
                'modulo' => 'respaldos',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar respaldos antiguos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // ============================================
            // MÓDULO: ARCHIVOS
            // ============================================
            [
                'nombre' => 'archivos.subir',
                'modulo' => 'archivos',
                'accion' => 'subir',
                'descripcion' => 'Subir archivos al sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'archivos.ver',
                'modulo' => 'archivos',
                'accion' => 'ver',
                'descripcion' => 'Ver archivos adjuntos',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'archivos.descargar',
                'modulo' => 'archivos',
                'accion' => 'descargar',
                'descripcion' => 'Descargar archivos del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nombre' => 'archivos.eliminar',
                'modulo' => 'archivos',
                'accion' => 'eliminar',
                'descripcion' => 'Eliminar archivos del sistema',
                'activo' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('permisos')->insert($permisos);

        $this->command->info('✅ ' . count($permisos) . ' permisos creados exitosamente');
    }
}
