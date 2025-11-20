<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class AsignarPermisosAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Buscar usuario admin
        $admin = User::where('email', 'admin@hefesto.local')->first();
        
        if (!$admin) {
            $this->command->error('Usuario admin no encontrado');
            return;
        }
        
        // Buscar o crear rol Administrador
        DB::table('rol_usuario')->updateOrInsert(
            [
                'user_id' => $admin->id,
                'rol_id' => $rolAdmin->id,
            ],
            [
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        
        $this->command->info('Rol Administrador asignado a ' . $admin->email);
        
        // Crear permisos si no existen
        $permisos = [
            ['nombre' => 'usuarios.ver', 'modulo' => 'usuarios', 'descripcion' => 'Ver usuarios'],
            ['nombre' => 'usuarios.crear', 'modulo' => 'usuarios', 'descripcion' => 'Crear usuarios'],
            ['nombre' => 'usuarios.editar', 'modulo' => 'usuarios', 'descripcion' => 'Editar usuarios'],
            ['nombre' => 'usuarios.eliminar', 'modulo' => 'usuarios', 'descripcion' => 'Eliminar usuarios'],
            ['nombre' => 'solicitudes.ver', 'modulo' => 'solicitudes', 'descripcion' => 'Ver solicitudes'],
            ['nombre' => 'solicitudes.crear', 'modulo' => 'solicitudes', 'descripcion' => 'Crear solicitudes'],
            ['nombre' => 'solicitudes.editar', 'modulo' => 'solicitudes', 'descripcion' => 'Editar solicitudes'],
            ['nombre' => 'solicitudes.aprobar', 'modulo' => 'solicitudes', 'descripcion' => 'Aprobar solicitudes'],
            ['nombre' => 'solicitudes.rechazar', 'modulo' => 'solicitudes', 'descripcion' => 'Rechazar solicitudes'],
            ['nombre' => 'catalogos.ver', 'modulo' => 'catalogos', 'descripcion' => 'Ver catalogos'],
            ['nombre' => 'catalogos.editar', 'modulo' => 'catalogos', 'descripcion' => 'Editar catalogos'],
            ['nombre' => 'roles.ver', 'modulo' => 'roles', 'descripcion' => 'Ver roles'],
            ['nombre' => 'roles.editar', 'modulo' => 'roles', 'descripcion' => 'Editar roles'],
        ];
        
        foreach ($permisos as $permiso) {
            DB::table('permisos')->updateOrInsert(
                ['nombre' => $permiso['nombre']],
                [
                    'modulo' => $permiso['modulo'],
                    'descripcion' => $permiso['descripcion'],
                    'activo' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
        
        $this->command->info('Permisos creados: ' . count($permisos));
        
        // Asignar todos los permisos al rol Administrador
        $permisosIds = DB::table('permisos')->pluck('id');
        
        foreach ($permisosIds as $permisoId) {
            DB::table('permiso_rol')->updateOrInsert(
                [
                    'rol_id' => $rolAdmin->id,
                    'permiso_id' => $permisoId,
                ],
                [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
        
        $this->command->info('Todos los permisos asignados al rol Administrador');
        $this->command->info('Usuario admin configurado con permisos completos');
    }
}
