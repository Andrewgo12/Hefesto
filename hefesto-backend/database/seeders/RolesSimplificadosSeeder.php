<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RolesSimplificadosSeeder extends Seeder
{
    /**
     * Seed simplificado con solo 2 roles: Usuario y Administrador
     */
    public function run(): void
    {
        // Limpiar roles existentes (usar delete en lugar de truncate por foreign keys)
        DB::table('role_user')->delete();
        DB::table('permiso_role')->delete();
        DB::table('roles')->delete();
        
        $roles = [
            [
                'nombre' => 'Usuario',
                'descripcion' => 'Usuario normal del sistema con permisos básicos',
                'usuarios_count' => 0,
                'permisos' => [
                    'Crear solicitudes',
                    'Ver propias solicitudes',
                    'Editar solicitudes pendientes',
                    'Ver reportes básicos',
                ],
                'activo' => true,
            ],
            [
                'nombre' => 'Administrador',
                'descripcion' => 'Administrador con acceso total al sistema',
                'usuarios_count' => 0,
                'permisos' => [
                    'Acceso total',
                    'Gestionar usuarios',
                    'Gestionar roles',
                    'Aprobar/Rechazar solicitudes',
                    'Ver todas las solicitudes',
                    'Exportar reportes',
                    'Configuración del sistema',
                    'Gestionar catálogos',
                    'Gestionar credenciales de firma',
                ],
                'activo' => true,
            ],
        ];

        foreach ($roles as $rol) {
            Role::create($rol);
        }

        $this->command->info('✅ Roles simplificados creados: Usuario y Administrador');
        
        // Asignar rol de Administrador al usuario admin
        $adminUser = DB::table('users')->where('email', 'admin@hefesto.local')->first();
        $adminRole = DB::table('roles')->where('nombre', 'Administrador')->first();
        
        if ($adminUser && $adminRole) {
            DB::table('role_user')->insert([
                'user_id' => $adminUser->id,
                'role_id' => $adminRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            // Actualizar contador
            DB::table('roles')->where('id', $adminRole->id)->update([
                'usuarios_count' => 1
            ]);
            
            $this->command->info('✅ Usuario admin asignado al rol Administrador');
        }
    }
}
