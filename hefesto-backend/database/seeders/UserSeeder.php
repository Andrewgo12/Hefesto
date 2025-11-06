<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar usuarios existentes
        User::query()->delete();

        // Crear usuarios de prueba
        $usuarios = [
            [
                'name' => 'Admin User',
                'email' => 'admin@hefesto.local',
                'password' => Hash::make('password123'),
                'rol' => 'Administrador',
                'estado' => 'Activo',
            ],
            [
                'name' => 'Jefe de Área',
                'email' => 'jefe@hefesto.local',
                'password' => Hash::make('password123'),
                'rol' => 'Jefe de Área',
                'estado' => 'Activo',
            ],
            [
                'name' => 'Dr. Carlos Mendoza',
                'email' => 'medico@hefesto.local',
                'password' => Hash::make('password123'),
                'rol' => 'Médico',
                'estado' => 'Activo',
            ],
            [
                'name' => 'María García',
                'email' => 'maria.garcia@hefesto.local',
                'password' => Hash::make('password123'),
                'rol' => 'Analista',
                'estado' => 'Activo',
            ],
            [
                'name' => 'Juan Pérez',
                'email' => 'juan.perez@hefesto.local',
                'password' => Hash::make('password123'),
                'rol' => 'Operador',
                'estado' => 'Activo',
            ],
        ];

        foreach ($usuarios as $usuario) {
            User::create($usuario);
        }

        $this->command->info('✅ Usuarios de prueba creados exitosamente');
        $this->command->info('📧 Emails: admin@hefesto.local, jefe@hefesto.local, medico@hefesto.local');
        $this->command->info('🔑 Password para todos: password123');
    }
}
