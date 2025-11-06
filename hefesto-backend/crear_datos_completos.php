<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

echo "=== CREANDO DATOS COMPLETOS ===\n\n";

// 1. Solicitud Administrativa COMPLETA
$admin = SolicitudAdministrativa::create([
    'fecha_solicitud' => now(),
    'nombre_completo' => 'Dr. Carlos Andrés Martínez López',
    'cedula' => '1098765432',
    'cargo' => 'Jefe de Facturación',
    'area_servicio' => 'Área Financiera',
    'telefono_extension' => '555-1001',
    'tipo_vinculacion' => 'Planta',
    'modulos_administrativos' => [
        'facturacion' => [
            'adicionar' => true,
            'consultar' => true,
            'modificar' => true,
            'borrar' => false,
        ],
        'cartera' => [
            'adicionar' => true,
            'consultar' => true,
            'modificar' => false,
            'borrar' => false,
        ],
        'glosas' => [
            'adicionar' => false,
            'consultar' => true,
            'modificar' => false,
            'borrar' => false,
        ],
    ],
    'modulos_financieros' => [
        'presupuesto' => [
            'adicionar' => true,
            'consultar' => true,
            'modificar' => true,
            'borrar' => true,
        ],
        'contabilidad' => [
            'adicionar' => false,
            'consultar' => true,
            'modificar' => false,
            'borrar' => false,
        ],
    ],
    'perfil_de' => 'Perfil de Jefe de Facturación con acceso completo a módulos financieros',
    'opciones_web' => [
        'internet' => true,
        'correoElectronico' => true,
        'transferenciaArchivos' => false,
    ],
    'login_asignado' => 'cmartinez',
    'clave_temporal' => 'Temp2025!',
    'firmas' => [
        'Usuario solicitante' => [
            'nombre' => 'Carlos Andrés Martínez',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
        'Jefe inmediato' => [
            'nombre' => 'María Fernanda Gómez',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
        'Jefe de Talento Humano' => [
            'nombre' => 'Roberto Silva Castro',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
        'Jefe de Gestión de la Información' => [
            'nombre' => 'Ana Patricia Moreno',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
    ],
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
]);

echo "✅ Solicitud Administrativa creada (ID: {$admin->id})\n";

// 2. Solicitud Historia Clínica COMPLETA
$clinica = SolicitudHistoriaClinica::create([
    'fecha_solicitud' => now(),
    'nombre_completo' => 'Dra. Laura Beatriz Rodríguez Pérez',
    'cedula' => '1087654321',
    'celular' => '320-5551234',
    'correo_electronico' => 'lrodriguez@hospital.com',
    'registro_codigo' => 'RM-2025-001',
    'area_servicio' => 'Cardiología',
    'especialidad' => 'Cardiología Intervencionista',
    'observaciones' => 'Especialista con 10 años de experiencia',
    'perfil' => 'Médico especialista',
    'tipo_vinculacion' => 'Interno',
    'terminal_asignado' => 'Tablet',
    'capacitacion_historia_clinica' => [
        'capacitacionRealizada' => true,
        'nombreCapacitador' => 'Dr. Roberto Silva',
        'fechaCapacitacion' => now()->subDays(15)->format('Y-m-d'),
    ],
    'capacitacion_epidemiologia' => [
        'capacitacionRealizada' => true,
        'nombreCapacitador' => 'Dra. María González',
        'fechaCapacitacion' => now()->subDays(10)->format('Y-m-d'),
    ],
    'aval_institucional' => [
        'avaladoPor' => 'Dr. Fernando Castro',
        'cargo' => 'Jefe de Cardiología',
        'fecha' => now()->format('Y-m-d'),
    ],
    'firmas' => [
        'Usuario solicitante' => [
            'nombre' => 'Laura Beatriz Rodríguez',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
        'Aval institucional' => [
            'nombre' => 'Dr. Fernando Castro',
            'fecha' => now()->format('Y-m-d'),
            'firma' => true,
        ],
    ],
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
]);

echo "✅ Solicitud Historia Clínica creada (ID: {$clinica->id})\n";

echo "\n✅ Datos completos creados!\n";
