<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfiguracionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configuraciones = [
            [
                'categoria' => 'credenciales',
                'clave' => 'recuperacion_password',
                'nombre' => 'Recuperación de Contraseña',
                'valor' => 'habilitado',
                'descripcion' => 'Permite que usuarios cambien su contraseña de forma segura',
                'tipo' => 'booleano',
                'activo' => true,
            ],
            [
                'categoria' => 'seguridad',
                'clave' => '2fa_habilitado',
                'nombre' => 'Autenticación de Dos Factores',
                'valor' => 'deshabilitado',
                'descripcion' => 'Aumenta la seguridad requiriendo verificación adicional',
                'tipo' => 'booleano',
                'activo' => false,
            ],
            [
                'categoria' => 'sesion',
                'clave' => 'expiracion_sesion',
                'nombre' => 'Expiración de Sesión',
                'valor' => '30 minutos',
                'descripcion' => 'Tiempo máximo de sesión activa',
                'tipo' => 'texto',
                'activo' => true,
            ],
        ];

        foreach ($configuraciones as $config) {
            \App\Models\Configuracion::create($config);
        }

        $this->command->info('✅ Configuraciones creadas');
    }
}
