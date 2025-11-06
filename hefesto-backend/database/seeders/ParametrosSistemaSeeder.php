<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ParametroSistema;

class ParametrosSistemaSeeder extends Seeder
{
    public function run(): void
    {
        $parametros = [
            [
                'clave' => 'politica_contrasena',
                'nombre' => 'Política de Contraseña',
                'valor' => 'Mínimo 8 caracteres, mayúscula y número',
                'descripcion' => 'Requisitos mínimos para contraseñas de usuario',
                'tipo' => 'texto',
                'editable' => true,
            ],
            [
                'clave' => 'tiempo_sesion',
                'nombre' => 'Tiempo de Sesión',
                'valor' => '30',
                'descripcion' => 'Tiempo máximo de inactividad antes de cierre de sesión (minutos)',
                'tipo' => 'numero',
                'editable' => true,
            ],
            [
                'clave' => 'expiracion_credenciales',
                'nombre' => 'Expiración de Credenciales',
                'valor' => '90',
                'descripcion' => 'Días hasta que las credenciales vencen',
                'tipo' => 'numero',
                'editable' => true,
            ],
            [
                'clave' => 'intentos_acceso',
                'nombre' => 'Intento de Acceso',
                'valor' => '5',
                'descripcion' => 'Número máximo de intentos fallidos permitidos',
                'tipo' => 'numero',
                'editable' => true,
            ],
            [
                'clave' => 'auditoria_cambios',
                'nombre' => 'Auditoría de Cambios',
                'valor' => 'Activada',
                'descripcion' => 'Registro de todos los cambios en el sistema',
                'tipo' => 'texto',
                'editable' => false,
            ],
        ];

        foreach ($parametros as $param) {
            ParametroSistema::create($param);
        }

        $this->command->info('✅ Parámetros del sistema creados');
    }
}
