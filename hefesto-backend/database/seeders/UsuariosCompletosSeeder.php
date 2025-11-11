<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UsuariosCompletosSeeder extends Seeder
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
        $this->command->info('👥 Creando usuarios completos...');
        $this->command->info('');

        // Obtener roles
        $rolTecnico = DB::table('roles')->where('nombre', 'Técnico del Sistema')->first();
        $rolSupervisor = DB::table('roles')->where('nombre', 'Administrativo - Supervisor')->first();
        $rolEntradaDatos = DB::table('roles')->where('nombre', 'Administrativo - Entrada de Datos')->first();
        $rolMedico = DB::table('roles')->where('nombre', 'Médico - Consulta')->first();

        // ============================================
        // 1. ADMINISTRADORES DEL SISTEMA (2)
        // ============================================
        $this->command->info('🔧 ADMINISTRADORES DEL SISTEMA:');
        
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

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$adminData['name']}123");
        }

        $this->command->info('');

        // ============================================
        // 2. JEFE INMEDIATO (2)
        // ============================================
        $this->command->info('👔 JEFE INMEDIATO:');
        
        $jefesInmediatos = [
            ['name' => 'jefe_inmediato1', 'email' => 'jefe.inmediato1@hefesto.local'],
            ['name' => 'jefe_inmediato2', 'email' => 'jefe.inmediato2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Jefe inmediato',
            'credencial' => 'JEFE2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($jefesInmediatos as $jefeData) {
            $user = User::create([
                'name' => $jefeData['name'],
                'email' => $jefeData['email'],
                'password' => Hash::make($jefeData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$jefeData['name']}123 - Credencial: JEFE2024");
        }

        $this->command->info('');

        // ============================================
        // 3. JEFE DE TALENTO HUMANO (2)
        // ============================================
        $this->command->info('👥 JEFE DE TALENTO HUMANO:');
        
        $talentoHumano = [
            ['name' => 'talento_humano1', 'email' => 'talento.humano1@hefesto.local'],
            ['name' => 'talento_humano2', 'email' => 'talento.humano2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Jefe de Talento Humano',
            'credencial' => 'TALENTO2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($talentoHumano as $talentoData) {
            $user = User::create([
                'name' => $talentoData['name'],
                'email' => $talentoData['email'],
                'password' => Hash::make($talentoData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$talentoData['name']}123 - Credencial: TALENTO2024");
        }

        $this->command->info('');

        // ============================================
        // 4. JEFE DE GESTIÓN DE LA INFORMACIÓN (2)
        // ============================================
        $this->command->info('📊 JEFE DE GESTIÓN DE LA INFORMACIÓN:');
        
        $gestionInfo = [
            ['name' => 'gestion_info1', 'email' => 'gestion.info1@hefesto.local'],
            ['name' => 'gestion_info2', 'email' => 'gestion.info2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Jefe de Gestión de la Información',
            'credencial' => 'GESTION2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($gestionInfo as $gestionData) {
            $user = User::create([
                'name' => $gestionData['name'],
                'email' => $gestionData['email'],
                'password' => Hash::make($gestionData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$gestionData['name']}123 - Credencial: GESTION2024");
        }

        $this->command->info('');

        // ============================================
        // 5. COORDINADOR DE FACTURACIÓN / SUBGERENTE FINANCIERO (2)
        // ============================================
        $this->command->info('💰 COORDINADOR DE FACTURACIÓN / SUBGERENTE FINANCIERO:');
        
        $finanzas = [
            ['name' => 'coordinador_finanzas1', 'email' => 'finanzas1@hefesto.local'],
            ['name' => 'coordinador_finanzas2', 'email' => 'finanzas2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Coordinador de Facturación o Subgerente Financiero',
            'credencial' => 'FINANZAS2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($finanzas as $finanzaData) {
            $user = User::create([
                'name' => $finanzaData['name'],
                'email' => $finanzaData['email'],
                'password' => Hash::make($finanzaData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$finanzaData['name']}123 - Credencial: FINANZAS2024");
        }

        $this->command->info('');

        // ============================================
        // 6. CAPACITADOR DE HISTORIA CLÍNICA (2)
        // ============================================
        $this->command->info('📋 CAPACITADOR DE HISTORIA CLÍNICA:');
        
        $capacitadoresHC = [
            ['name' => 'capacitador_hc1', 'email' => 'capacitador.hc1@hefesto.local'],
            ['name' => 'capacitador_hc2', 'email' => 'capacitador.hc2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Capacitador de historia clínica',
            'credencial' => 'CAPACITAHC2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($capacitadoresHC as $capData) {
            $user = User::create([
                'name' => $capData['name'],
                'email' => $capData['email'],
                'password' => Hash::make($capData['name'] . '123'),
                'rol' => 'medico',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolMedico->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$capData['name']}123 - Credencial: CAPACITAHC2024");
        }

        $this->command->info('');

        // ============================================
        // 7. CAPACITADOR DE EPIDEMIOLOGÍA (2)
        // ============================================
        $this->command->info('🦠 CAPACITADOR DE EPIDEMIOLOGÍA:');
        
        $capacitadoresEpi = [
            ['name' => 'capacitador_epi1', 'email' => 'capacitador.epi1@hefesto.local'],
            ['name' => 'capacitador_epi2', 'email' => 'capacitador.epi2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Capacitador de epidemiología',
            'credencial' => 'CAPACITAEPI2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($capacitadoresEpi as $capData) {
            $user = User::create([
                'name' => $capData['name'],
                'email' => $capData['email'],
                'password' => Hash::make($capData['name'] . '123'),
                'rol' => 'medico',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolMedico->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$capData['name']}123 - Credencial: CAPACITAEPI2024");
        }

        $this->command->info('');

        // ============================================
        // 8. AVAL INSTITUCIONAL (2)
        // ============================================
        $this->command->info('🏛️ AVAL INSTITUCIONAL:');
        
        $avales = [
            ['name' => 'aval_institucional1', 'email' => 'aval1@hefesto.local'],
            ['name' => 'aval_institucional2', 'email' => 'aval2@hefesto.local'],
        ];

        // Crear credencial de firma una sola vez
        DB::table('credenciales_firma')->insertOrIgnore([
            'cargo' => 'Aval institucional',
            'credencial' => 'AVAL2024',
            'activo' => true,
            'created_at' => now(),
        ]);

        foreach ($avales as $avalData) {
            $user = User::create([
                'name' => $avalData['name'],
                'email' => $avalData['email'],
                'password' => Hash::make($avalData['name'] . '123'),
                'rol' => 'supervisor',
                'estado' => 'activo',
            ]);

            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => $rolSupervisor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$avalData['name']}123 - Credencial: AVAL2024");
        }

        $this->command->info('');

        // ============================================
        // 9. USUARIOS DE ENTRADA DE DATOS (2)
        // ============================================
        $this->command->info('📝 USUARIOS DE ENTRADA DE DATOS:');
        
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

            $this->command->info("   ✅ {$user->name} ({$user->email}) - Password: {$entradaData['name']}123");
        }

        // Actualizar contadores de roles
        $this->actualizarContadores();

        $this->command->info('');
        $this->command->info('🎉 ¡USUARIOS COMPLETOS CREADOS EXITOSAMENTE!');
        $this->command->info('');
        $this->command->info('📋 RESUMEN:');
        $this->command->info('   - 2 Administradores del Sistema');
        $this->command->info('   - 2 Jefes Inmediatos (JEFE2024)');
        $this->command->info('   - 2 Jefes de Talento Humano (TALENTO2024)');
        $this->command->info('   - 2 Jefes de Gestión de la Información (GESTION2024)');
        $this->command->info('   - 2 Coordinadores de Finanzas (FINANZAS2024)');
        $this->command->info('   - 2 Capacitadores de Historia Clínica (CAPACITAHC2024)');
        $this->command->info('   - 2 Capacitadores de Epidemiología (CAPACITAEPI2024)');
        $this->command->info('   - 2 Avales Institucionales (AVAL2024)');
        $this->command->info('   - 2 Usuarios de Entrada de Datos');
        $this->command->info('');
        $this->command->info('   TOTAL: 18 usuarios');
        $this->command->info('');
        $this->command->info('🔑 Patrón de contraseñas: [nombre]123');
        $this->command->info('   Ejemplo: admin1123, jefe_inmediato1123, talento_humano1123');
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
