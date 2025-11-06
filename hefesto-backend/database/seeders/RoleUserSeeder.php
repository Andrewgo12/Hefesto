<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Asigna roles a usuarios existentes.
     * NOTA: Este seeder debe ejecutarse DESPUÉS de crear usuarios.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Obtener roles
        $roles = DB::table('roles')->select('id', 'nombre')->get()->keyBy('nombre');
        
        // Obtener usuarios existentes
        $usuarios = DB::table('users')->select('id', 'email', 'name')->get();

        if ($usuarios->isEmpty()) {
            $this->command->warn('⚠️  No hay usuarios en la base de datos. Crea usuarios primero.');
            return;
        }

        $this->command->info('📋 Usuarios encontrados: ' . $usuarios->count());

        // ============================================
        // ASIGNACIÓN AUTOMÁTICA POR EMAIL/NOMBRE
        // ============================================
        
        foreach ($usuarios as $usuario) {
            $email = strtolower($usuario->email);
            $nombre = strtolower($usuario->name);
            
            // Determinar rol basado en email o nombre
            $roleId = null;
            
            // Administradores del sistema
            if (
                str_contains($email, 'admin') || 
                str_contains($email, 'tecnico') ||
                str_contains($email, 'sistemas') ||
                str_contains($nombre, 'admin') ||
                str_contains($nombre, 'técnico')
            ) {
                $roleId = $roles['Técnico del Sistema']->id;
                $roleName = 'Técnico del Sistema';
            }
            // Supervisores
            elseif (
                str_contains($email, 'supervisor') ||
                str_contains($email, 'jefe') ||
                str_contains($email, 'coordinador') ||
                str_contains($nombre, 'supervisor') ||
                str_contains($nombre, 'jefe')
            ) {
                $roleId = $roles['Administrativo - Supervisor']->id;
                $roleName = 'Administrativo - Supervisor';
            }
            // Médicos
            elseif (
                str_contains($email, 'medico') ||
                str_contains($email, 'doctor') ||
                str_contains($email, 'dr.') ||
                str_contains($nombre, 'médico') ||
                str_contains($nombre, 'doctor')
            ) {
                $roleId = $roles['Médico - Consulta']->id;
                $roleName = 'Médico - Consulta';
            }
            // Por defecto: Entrada de datos
            else {
                $roleId = $roles['Administrativo - Entrada de Datos']->id;
                $roleName = 'Administrativo - Entrada de Datos';
            }

            // Verificar si ya tiene rol asignado
            $existeAsignacion = DB::table('role_user')
                ->where('user_id', $usuario->id)
                ->where('role_id', $roleId)
                ->exists();

            if (!$existeAsignacion) {
                DB::table('role_user')->insert([
                    'user_id' => $usuario->id,
                    'role_id' => $roleId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                $this->command->info("   ✅ {$usuario->name} ({$usuario->email}) → {$roleName}");
            } else {
                $this->command->warn("   ⚠️  {$usuario->name} ya tiene rol asignado");
            }
        }

        // Actualizar contador de usuarios en roles
        $this->actualizarContadorUsuarios();

        $this->command->info('✅ Roles asignados a usuarios exitosamente');
    }

    /**
     * Actualiza el campo usuarios_count en la tabla roles
     */
    private function actualizarContadorUsuarios()
    {
        $roles = DB::table('roles')->get();

        foreach ($roles as $rol) {
            $count = DB::table('role_user')
                ->where('role_id', $rol->id)
                ->count();

            DB::table('roles')
                ->where('id', $rol->id)
                ->update(['usuarios_count' => $count]);
        }
    }
}
