<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\User;

echo "=== CREANDO SOLICITUD ADMINISTRATIVA DE PRUEBA ===\n\n";

// Obtener un usuario existente o crear uno de prueba
$usuario = User::first();
if (!$usuario) {
    echo "❌ No hay usuarios en la BD. Crea uno primero.\n";
    exit(1);
}

// Datos completos para solicitud administrativa
$datosAdmin = [
    'usuario_id' => $usuario->id,
    'fecha_solicitud' => now()->format('Y-m-d'),
    'codigo_formato' => 'FOR-GDI-SIS-004',
    'version' => '1',
    'fecha_emision' => '23/11/2020',
    'nombre_completo' => 'Dr. Carlos Andrés Rodríguez Martínez',
    'cedula' => '1234567890',
    'cargo' => 'Médico Especialista',
    'area_servicio' => 'Urgencias - Unidad de Cuidados Intensivos',
    'telefono_extension' => '5678',
    'tipo_vinculacion' => 'Planta',
    'login_asignado' => 'carlos.rodriguez',
    'clave_temporal' => 'Temp2024!',
    'acepta_responsabilidad' => true,
    
    // Módulos administrativos - formato con A, C, M, B
    'modulos_administrativos' => json_encode([
        'facturacion' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
        'anticipos' => ['A' => false, 'C' => true, 'M' => true, 'B' => false],
        'farmacia' => ['A' => true, 'C' => false, 'M' => true, 'B' => false],
        'suministros' => ['A' => false, 'C' => true, 'M' => false, 'B' => true],
        'cartera' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
        'glosas' => ['A' => false, 'C' => false, 'M' => true, 'B' => true],
        'admisiones' => ['A' => true, 'C' => true, 'M' => true, 'B' => false],
        'ayudasDiagnosticas' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
        'citasMedicas' => ['A' => true, 'C' => false, 'M' => true, 'B' => false],
        'cirugia' => ['A' => false, 'C' => true, 'M' => true, 'B' => true],
        'rips' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
        'anexos' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
    ]),
    
    // Módulos financieros
    'modulos_financieros' => json_encode([
        'presupuesto' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
        'activosFijos' => ['A' => false, 'C' => true, 'M' => true, 'B' => false],
        'contabilidad' => ['A' => true, 'C' => false, 'M' => true, 'B' => true],
        'cuentasPorPagar' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
        'cajaYBancos' => ['A' => true, 'C' => true, 'M' => true, 'B' => false],
        'costos' => ['A' => false, 'C' => false, 'M' => true, 'B' => true],
        'administracionDocumentos' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
    ]),
    
    // Opciones web
    'opciones_web' => json_encode([
        'acceso_remoto' => true,
        'notificaciones' => true,
        'reportes' => false,
    ]),
    
    // Firmas digitales
    'firmas' => json_encode([
        [
            'tipo' => 'solicitante',
            'nombre' => 'Dr. Carlos Rodríguez',
            'cargo' => 'Solicitante',
            'firma' => 'FIRMA_TEXTO:Dr. Carlos Rodríguez|FONT:allura|SIZE:32|STYLE:normal',
            'fecha' => now()->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'jefe_inmediato',
            'nombre' => 'Dra. María González',
            'cargo' => 'Jefe Inmediato',
            'firma' => 'FIRMA_TEXTO:Dra. María González|FONT:pacifico|SIZE:28|STYLE:normal',
            'fecha' => now()->addHours(2)->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'jefe_area',
            'nombre' => 'Lic. Roberto Sánchez',
            'cargo' => 'Jefe de Área',
            'firma' => 'FIRMA_TEXTO:Lic. Roberto Sánchez|FONT:playfair|SIZE:30|STYLE:normal',
            'fecha' => now()->addHours(4)->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'gestion_humana',
            'nombre' => 'Ing. Laura Torres',
            'cargo' => 'Gestión Humana',
            'firma' => 'FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:26|STYLE:normal',
            'fecha' => now()->addHours(6)->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'sistemas',
            'nombre' => 'Ing. Juan Pérez',
            'cargo' => 'Sistemas',
            'firma' => 'FIRMA_TEXTO:Ing. Juan Pérez|FONT:brush-script|SIZE:32|STYLE:normal',
            'fecha' => now()->addHours(8)->format('Y-m-d H:i:s'),
        ],
    ]),
    
    'estado' => 'pendiente',
];

try {
    $solicitudAdmin = SolicitudAdministrativa::create($datosAdmin);
    echo "✅ Solicitud Administrativa creada con ID: {$solicitudAdmin->id}\n";
    echo "   Nombre: {$solicitudAdmin->nombre_completo}\n";
    echo "   Cédula: {$solicitudAdmin->cedula}\n";
    echo "   Cargo: {$solicitudAdmin->cargo}\n\n";
} catch (\Exception $e) {
    echo "❌ Error creando solicitud administrativa: {$e->getMessage()}\n";
    exit(1);
}

echo "=== CREANDO SOLICITUD HISTORIA CLÍNICA DE PRUEBA ===\n\n";

// Datos completos para solicitud historia clínica
$datosHC = [
    'usuario_id' => $usuario->id,
    'fecha_solicitud' => now()->format('Y-m-d'),
    'codigo_formato' => 'FOR-GDI-HC-001',
    'version' => '2',
    'fecha_emision' => '15/01/2024',
    'nombre_completo' => 'Dra. Ana Patricia López Fernández',
    'cedula' => '9876543210',
    'cargo' => 'Médica General',
    'area_servicio' => 'Consulta Externa',
    'telefono_extension' => '4321',
    'tipo_vinculacion' => 'Contrato',
    'perfil_de' => 'Médico',
    'login_asignado' => 'ana.lopez',
    'clave_temporal' => 'HC2024!',
    
    // Módulos historia clínica
    'modulos_historia_clinica' => json_encode([
        'consulta_externa' => ['leer' => true, 'escribir' => true, 'modificar' => false],
        'hospitalizacion' => ['leer' => true, 'escribir' => false, 'modificar' => true],
        'urgencias' => ['leer' => true, 'escribir' => true, 'modificar' => true],
        'cirugia' => ['leer' => false, 'escribir' => true, 'modificar' => false],
        'laboratorio' => ['leer' => true, 'escribir' => false, 'modificar' => false],
    ]),
    
    // Tipo de permiso
    'tipo_permiso' => json_encode(['creacion', 'modificacion']),
    
    // Opciones web
    'opciones_web' => json_encode([
        'acceso_remoto' => true,
        'notificaciones' => false,
    ]),
    
    // Firmas
    'firmas' => json_encode([
        [
            'tipo' => 'solicitante',
            'nombre' => 'Dra. Ana López',
            'cargo' => 'Solicitante',
            'firma' => 'FIRMA_TEXTO:Dra. Ana López|FONT:dancing-script|SIZE:28|STYLE:normal',
            'fecha' => now()->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'jefe_inmediato',
            'nombre' => 'Dr. Pedro Ramírez',
            'cargo' => 'Jefe Inmediato',
            'firma' => 'FIRMA_TEXTO:Dr. Pedro Ramírez|FONT:sacramento|SIZE:30|STYLE:normal',
            'fecha' => now()->addHours(3)->format('Y-m-d H:i:s'),
        ],
        [
            'tipo' => 'coordinador_tic',
            'nombre' => 'Ing. Carlos Méndez',
            'cargo' => 'Coordinador TIC',
            'firma' => 'FIRMA_TEXTO:Ing. Carlos Méndez|FONT:brush-script|SIZE:32|STYLE:normal',
            'fecha' => now()->addHours(5)->format('Y-m-d H:i:s'),
        ],
    ]),
    
    'estado' => 'pendiente',
];

try {
    $solicitudHC = SolicitudHistoriaClinica::create($datosHC);
    echo "✅ Solicitud Historia Clínica creada con ID: {$solicitudHC->id}\n";
    echo "   Nombre: {$solicitudHC->nombre_completo}\n";
    echo "   Cédula: {$solicitudHC->cedula}\n";
    echo "   Cargo: {$solicitudHC->cargo}\n\n";
} catch (\Exception $e) {
    echo "❌ Error creando solicitud historia clínica: {$e->getMessage()}\n";
    exit(1);
}

echo "=== RESUMEN ===\n";
echo "✅ Solicitud Administrativa ID: {$solicitudAdmin->id}\n";
echo "✅ Solicitud Historia Clínica ID: {$solicitudHC->id}\n\n";
echo "Ahora puedes descargar los Excel:\n";
echo "- http://localhost:8000/api/exportar/administrativa/{$solicitudAdmin->id}\n";
echo "- http://localhost:8000/api/exportar/historia-clinica/{$solicitudHC->id}\n";
