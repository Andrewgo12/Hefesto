<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'nombre' => 'Administrativo - Entrada de Datos',
                'descripcion' => 'Usuario administrativo básico con acceso limitado',
                'usuarios_count' => 0,
                'permisos' => [
                    'Crear solicitudes',
                    'Ver reportes',
                    'Editar datos propios',
                ],
                'activo' => true,
            ],
            [
                'nombre' => 'Administrativo - Supervisor',
                'descripcion' => 'Supervisor de área con permisos de aprobación',
                'usuarios_count' => 0,
                'permisos' => [
                    'Crear solicitudes',
                    'Aprobar solicitudes',
                    'Ver reportes',
                    'Gestionar equipo',
                ],
                'activo' => true,
            ],
            [
                'nombre' => 'Médico - Consulta',
                'descripcion' => 'Médico general con acceso a historia clínica',
                'usuarios_count' => 0,
                'permisos' => [
                    'Ver historia clínica',
                    'Crear registros',
                    'Ver laboratorio',
                    'Ver imagenología',
                ],
                'activo' => true,
            ],
            [
                'nombre' => 'Técnico del Sistema',
                'descripcion' => 'Administrador con acceso total',
                'usuarios_count' => 0,
                'permisos' => [
                    'Acceso total',
                    'Gestionar usuarios',
                    'Gestionar roles',
                    'Configuración del sistema',
                ],
                'activo' => true,
            ],
        ];

        foreach ($roles as $rol) {
            Role::create($rol);
        }

        $this->command->info('✅ Roles creados exitosamente');
    }
}
