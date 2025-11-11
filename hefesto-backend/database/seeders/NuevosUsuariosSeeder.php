<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class NuevosUsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🗑️  Eliminando usuarios existentes...');
        
        // Desactivar verificación de claves foráneas temporalmente
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Limpiar tablas relacionadas
        DB::table('role_user')->truncate();
        DB::table('credenciales_firma')->truncate();
        DB::table('actividades')->truncate();
        DB::table('notificaciones')->truncate();
        DB::table('users')->truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->info('✅ Usuarios eliminados');
        $this->command->info('');
        $this->command->info('👥 Creando nuevos usuarios...');
        $this->command->info('');

        // Obtener roles
        $rolTecnico = DB::table('roles')->where('nombre', 'Técnico del Sistema')->first();
        $rolSupervisor = DB::table('roles')->where('nombre', 'Administrativo - Supervisor')->first();
        $rolEntradaDatos = DB::table('roles')->where('nombre', 'Administrativo - Entrada de Datos')->first();
        $rolMedico = DB::table('roles')->where('nombre', 'Médico - Consulta')->first();

        // ============================================
        // ADMINISTRADORES (2)
        // ============================================
        $admins = [
            ['name' => 'admin1', 'email' => 'admin1@hefesto.local'],
            ['name' => 'admin2', 'email' => 'admin2@hefesto.local'],
        ];

        foreach ($admins as $adminData) {
            $user = User::create([
                'name' => $adminData['name'],
                'email' => $adminData['email'],
                'password' => Hash::make($adminData['name'] . '123'),
                'rol' => 'administrador',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolTecnico->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("✅ {$user->name} ({$user->email}) - Password: {$adminData['name']}123");
        }

        $this->command->info('');

        // ============================================
        // SUPERVISORES (2)
        // ============================================
        $supervisores = [
            ['name' => 'supervisor1', 'email' => 'supervisor1@hefesto.local', 'cargo' => 'Jefe inmediato', 'credencial' => 'JEFE2024'],
            ['name' => 'supervisor2', 'email' => 'supervisor2@hefesto.local', 'cargo' => 'Jefe de Talento Humano', 'credencial' => 'TALENTO2024'],
        ];

        foreach ($supervisores as $supData) {
            $user = User::create([
                'name' => $supData['name'],
                'email' => $supData['email'],
                'password' => Hash::make($supData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Crear credencial de firma
            DB::table('credenciales_firma')->insert([
                'cargo' => $supData['cargo'],
                'credencial' => $supData['credencial'],
                'activo' => true,
                'created_at' => now(),
            ]);

            $this->command->info("✅ {$user->name} ({$user->email}) - Password: {$supData['name']}123 - Credencial: {$supData['credencial']}");
        }

        $this->command->info('');

        // ============================================
        // ENTRADA DE DATOS (2)
        // ============================================
        $entradaDatos = [
            ['name' => 'entrada1', 'email' => 'entrada1@hefesto.local'],
            ['name' => 'entrada2', 'email' => 'entrada2@hefesto.local'],
        ];

        foreach ($entradaDatos as $entradaData) {
            $user = User::create([
                'name' => $entradaData['name'],
                'email' => $entradaData['email'],
                'password' => Hash::make($entradaData['name'] . '123'),
                'rol' => 'usuario',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolEntradaDatos->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("✅ {$user->name} ({$user->email}) - Password: {$entradaData['name']}123");
        }

        $this->command->info('');

        // ============================================
        // MÉDICOS (2)
        // ============================================
        $medicos = [
            ['name' => 'medico1', 'email' => 'medico1@hefesto.local', 'cargo' => 'Capacitador de historia clínica', 'credencial' => 'CAPACITAHC2024'],
            ['name' => 'medico2', 'email' => 'medico2@hefesto.local', 'cargo' => 'Capacitador de epidemiología', 'credencial' => 'CAPACITAEPI2024'],
        ];

        foreach ($medicos as $medicoData) {
            $user = User::create([
                'name' => $medicoData['name'],
                'email' => $medicoData['email'],
                'password' => Hash::make($medicoData['name'] . '123'),
                'rol' => 'medico',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolMedico->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Crear credencial de firma
            DB::table('credenciales_firma')->insert([
                'cargo' => $medicoData['cargo'],
                'credencial' => $medicoData['credencial'],
                'activo' => true,
                'created_at' => now(),
            ]);

            $this->command->info("✅ {$user->name} ({$user->email}) - Password: {$medicoData['name']}123 - Credencial: {$medicoData['credencial']}");
        }

        // Actualizar contadores de roles
        $this->actualizarContadores();

        $this->command->info('');
        $this->command->info('🎉 ¡Usuarios creados exitosamente!');
        $this->command->info('');
        $this->command->info('📋 RESUMEN:');
        $this->command->info('   - 2 Administradores (admin1, admin2)');
        $this->command->info('   - 2 Supervisores (supervisor1, supervisor2)');
        $this->command->info('   - 2 Entrada de Datos (entrada1, entrada2)');
        $this->command->info('   - 2 Médicos (medico1, medico2)');
        $this->command->info('   TOTAL: 8 usuarios');
        $this->command->info('');
        $this->command->info('🔑 Patrón de contraseñas: [nombre]123');
        $this->command->info('   Ejemplo: admin1123, supervisor1123, entrada1123, medico1123');
    }

    private function actualizarContadores()
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
