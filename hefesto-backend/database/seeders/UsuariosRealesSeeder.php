<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UsuariosRealesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar datos de prueba
        $this->command->info('🗑️  Limpiando datos de prueba...');
        
        // Deshabilitar foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        DB::table('role_user')->truncate();
        DB::table('credenciales_firmas')->truncate();
        DB::table('users')->truncate();
        DB::table('solicitudes_administrativas')->truncate();
        DB::table('solicitudes_historia_clinica')->truncate();
        DB::table('notificaciones')->truncate();
        DB::table('actividades')->truncate();
        DB::table('exportaciones')->truncate();
        DB::table('reportes')->truncate();
        
        // Rehabilitar foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->info('✅ Datos de prueba eliminados');
        $this->command->info('');
        $this->command->info('👥 Creando usuarios reales...');
        $this->command->info('');

        // Obtener roles simplificados
        $rolAdmin = DB::table('roles')->where('nombre', 'Administrador')->first();
        $rolUsuario = DB::table('roles')->where('nombre', 'Usuario')->first();

        // ============================================
        // 1. ADMINISTRADOR DEL SISTEMA - KEVIN
        // ============================================
        $kevin = User::create([
            'name' => 'Kevin Administrador',
            'email' => 'kevin@admin.com',
            'password' => Hash::make('Lesli123'),
            'rol' => 'administrador',
            'estado' => 'activo',
        ]);

        DB::table('role_user')->insert([
            'user_id' => $kevin->id,
            'role_id' => $rolAdmin->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info("✅ 1. Kevin Administrador (kevin@admin.com) - ADMIN TOTAL");

        // ============================================
        // 2. JEFE INMEDIATO
        // ============================================
        $jefeInmediato = User::create([
            'name' => 'Carlos Rodríguez',
            'email' => 'jefe.inmediato@hospital.com',
            'password' => Hash::make('JefeInmediato2024'),
            'rol' => 'supervisor',
            'estado' => 'activo',
        ]);

        DB::table('role_user')->insert([
            'user_id' => $jefeInmediato->id,
            'role_id' => $rolAdmin->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Crear credencial de firma
        DB::table('credenciales_firmas')->insert([
            'cargo' => 'Jefe inmediato',
            'credencial' => Hash::make('JEFE2024'),
            'user_id' => $jefeInmediato->id,
            'nombre_completo' => 'Carlos Rodríguez',
            'email' => 'jefe.inmediato@hospital.com',
            'tipo_formulario' => 'ambos',
            'orden' => 1,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info("✅ 2. Carlos Rodríguez (jefe.inmediato@hospital.com) - Jefe Inmediato");
        $this->command->info("   Credencial: JEFE2024");

        // ============================================
        // 3. JEFE DE TALENTO HUMANO
        // ============================================
        $jefeTalentoHumano = User::create([
            'name' => 'María González',
            'email' => 'talento.humano@hospital.com',
            'password' => Hash::make('TalentoHumano2024'),
            'rol' => 'supervisor',
            'estado' => 'activo',
        ]);

        DB::table('role_user')->insert([
            'user_id' => $jefeTalentoHumano->id,
            'role_id' => $rolAdmin->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('credenciales_firmas')->insert([
            'cargo' => 'Jefe de Talento Humano',
            'credencial' => Hash::make('TALENTO2024'),
            'user_id' => $jefeTalentoHumano->id,
            'nombre_completo' => 'María González',
            'email' => 'talento.humano@hospital.com',
            'tipo_formulario' => 'administrativa',
            'orden' => 2,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info("✅ 3. María González (talento.humano@hospital.com) - Jefe Talento Humano");
        $this->command->info("   Credencial: TALENTO2024");

        // ============================================
        // 4. GESTIÓN DE LA INFORMACIÓN (5 USUARIOS)
        // ============================================
        $usuariosGestion = [
            [
                'name' => 'Ana Martínez',
                'email' => 'gestion.info1@hospital.com',
                'es_jefe' => true,
            ],
            [
                'name' => 'Luis Pérez',
                'email' => 'gestion.info2@hospital.com',
                'es_jefe' => false,
            ],
            [
                'name' => 'Carmen Díaz',
                'email' => 'gestion.info3@hospital.com',
                'es_jefe' => false,
            ],
            [
                'name' => 'Roberto Sánchez',
                'email' => 'gestion.info4@hospital.com',
                'es_jefe' => false,
            ],
            [
                'name' => 'Patricia López',
                'email' => 'gestion.info5@hospital.com',
                'es_jefe' => false,
            ],
        ];

        foreach ($usuariosGestion as $index => $userData) {
            $usuario = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('GestionInfo2024'),
                'rol' => $userData['es_jefe'] ? 'supervisor' : 'usuario',
                'estado' => 'activo',
            ]);

            // Asignar rol según si es jefe o no
            $rolAsignado = $userData['es_jefe'] ? $rolAdmin->id : $rolUsuario->id;
            
            DB::table('role_user')->insert([
                'user_id' => $usuario->id,
                'role_id' => $rolAsignado,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Solo el jefe tiene credencial de firma
            if ($userData['es_jefe']) {
                DB::table('credenciales_firmas')->insert([
                    'cargo' => 'Jefe de Gestión de la Información',
                    'credencial' => Hash::make('GESTION2024'),
                    'user_id' => $usuario->id,
                    'nombre_completo' => $userData['name'],
                    'email' => $userData['email'],
                    'tipo_formulario' => 'ambos',
                    'orden' => 3,
                    'activo' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                $this->command->info("✅ 4. {$userData['name']} ({$userData['email']}) - JEFE Gestión Información");
                $this->command->info("   Credencial: GESTION2024");
            } else {
                $this->command->info("✅ " . (4 + $index) . ". {$userData['name']} ({$userData['email']}) - Gestión Información");
            }
        }

        // ============================================
        // 5. CAPACITADOR EN HISTORIA CLÍNICA
        // ============================================
        $capacitadorHC = User::create([
            'name' => 'Dr. Jorge Ramírez',
            'email' => 'capacitador.hc@hospital.com',
            'password' => Hash::make('CapacitaHC2024'),
            'rol' => 'medico',
            'estado' => 'activo',
        ]);

        DB::table('role_user')->insert([
            'user_id' => $capacitadorHC->id,
            'role_id' => $rolUsuario->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('credenciales_firmas')->insert([
            'cargo' => 'Capacitador de historia clínica',
            'credencial' => Hash::make('CAPACITAHC2024'),
            'user_id' => $capacitadorHC->id,
            'nombre_completo' => 'Dr. Jorge Ramírez',
            'email' => 'capacitador.hc@hospital.com',
            'tipo_formulario' => 'historia_clinica',
            'orden' => 4,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info("✅ 9. Dr. Jorge Ramírez (capacitador.hc@hospital.com) - Capacitador HC");
        $this->command->info("   Credencial: CAPACITAHC2024");

        // ============================================
        // 6. CAPACITADOR EN EPIDEMIOLOGÍA
        // ============================================
        $capacitadorEpi = User::create([
            'name' => 'Dra. Sandra Torres',
            'email' => 'capacitador.epi@hospital.com',
            'password' => Hash::make('CapacitaEPI2024'),
            'rol' => 'medico',
            'estado' => 'activo',
        ]);

        DB::table('role_user')->insert([
            'user_id' => $capacitadorEpi->id,
            'role_id' => $rolUsuario->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('credenciales_firmas')->insert([
            'cargo' => 'Capacitador de epidemiología',
            'credencial' => Hash::make('CAPACITAEPI2024'),
            'user_id' => $capacitadorEpi->id,
            'nombre_completo' => 'Dra. Sandra Torres',
            'email' => 'capacitador.epi@hospital.com',
            'tipo_formulario' => 'historia_clinica',
            'orden' => 5,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info("✅ 10. Dra. Sandra Torres (capacitador.epi@hospital.com) - Capacitador Epidemiología");
        $this->command->info("   Credencial: CAPACITAEPI2024");

        // Actualizar contadores de roles
        $this->actualizarContadores();

        $this->command->info('');
        $this->command->info('🎉 ¡Usuarios reales creados exitosamente!');
        $this->command->info('');
        $this->command->info('📋 RESUMEN:');
        $this->command->info('   - 1 Administrador (Kevin)');
        $this->command->info('   - 1 Jefe Inmediato');
        $this->command->info('   - 1 Jefe de Talento Humano');
        $this->command->info('   - 5 Gestión de la Información (1 jefe + 4 usuarios)');
        $this->command->info('   - 1 Capacitador Historia Clínica');
        $this->command->info('   - 1 Capacitador Epidemiología');
        $this->command->info('   TOTAL: 10 usuarios');
        $this->command->info('');
        $this->command->info('🔑 Contraseña por defecto para todos (excepto Kevin): [Cargo]2024');
        $this->command->info('   Ejemplo: JefeInmediato2024, TalentoHumano2024, GestionInfo2024, etc.');
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
