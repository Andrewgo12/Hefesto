<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudHistoriaClinica;
use Illuminate\Support\Facades\DB;

echo "=== PRUEBA SISTEMA DE FIRMAS - HISTORIA CLÍNICA ===\n\n";

// 1. Limpiar firmas anteriores
DB::table('firmas_solicitud')->where('solicitud_type', 'App\\Models\\SolicitudHistoriaClinica')->delete();
echo "✓ Firmas anteriores eliminadas\n\n";

// 2. Crear solicitud con firmas
$firmasJson = json_encode([
    'capacitadorHistoriaClinica' => [
        'usuario' => 'Dr. Juan Pérez',
        'fecha' => now()->toISOString()
    ],
    'avalInstitucional' => [
        'usuario' => 'Dra. María García',
        'fecha' => now()->toISOString()
    ]
]);

$solicitud = SolicitudHistoriaClinica::create([
    'nombre_completo' => 'Dr. Carlos Andrés Rodríguez Martínez',
    'cedula' => '9876543210',
    'celular' => '3001234567',
    'correo_electronico' => 'carlos.rodriguez@hospital.com',
    'registro_codigo' => 'MED-2025-001',
    'area_servicio' => 'Medicina Interna',
    'especialidad' => 'Cardiología',
    'perfil' => 'Médico Especialista',
    'tipo_vinculacion' => 'Planta',
    'terminal_asignado' => 'Terminal 1',
    'capacitacion_historia_clinica' => json_encode(['fecha' => now()->format('Y-m-d'), 'completada' => true]),
    'capacitacion_epidemiologia' => json_encode(['fecha' => now()->format('Y-m-d'), 'completada' => false]),
    'aval_institucional' => json_encode(['fecha' => now()->format('Y-m-d'), 'aprobado' => true]),
    'acepta_responsabilidad' => 1,
    'firmas' => $firmasJson,
    'estado' => 'Pendiente',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => null,
    'registrado_por_nombre' => 'Sistema de Prueba',
    'registrado_por_email' => 'sistema@hefesto.local',
]);

echo "✓ Solicitud creada: ID {$solicitud->id}\n";
echo "  Nombre: {$solicitud->nombre_completo}\n";
echo "  Cédula: {$solicitud->cedula}\n\n";

// 3. Procesar firmas manualmente (simular lo que hace el controlador)
$firmasArray = json_decode($firmasJson, true);
$mapeoFirmas = [
    'capacitadorHistoriaClinica' => 'Capacitador de historia clínica',
    'avalInstitucional' => 'Aval institucional',
];

echo "⏳ Procesando firmas...\n";

foreach ($firmasArray as $nombreFirma => $datosFirma) {
    $cargoRequerido = $mapeoFirmas[$nombreFirma] ?? null;
    
    if (!$cargoRequerido) {
        echo "  ⚠️ Firma desconocida: {$nombreFirma}\n";
        continue;
    }
    
    // Buscar paso de aprobación
    $pasoAprobacion = DB::table('pasos_aprobacion')
        ->join('flujos_aprobacion', 'pasos_aprobacion.flujo_id', '=', 'flujos_aprobacion.id')
        ->where('flujos_aprobacion.tipo_solicitud', 'historia_clinica')
        ->where('pasos_aprobacion.cargo_requerido', $cargoRequerido)
        ->select('pasos_aprobacion.id', 'pasos_aprobacion.nombre_paso', 'pasos_aprobacion.cargo_requerido')
        ->first();
    
    if (!$pasoAprobacion) {
        echo "  ❌ No se encontró paso de aprobación para: {$cargoRequerido}\n";
        continue;
    }
    
    echo "  ✓ Paso encontrado: {$pasoAprobacion->nombre_paso} (ID: {$pasoAprobacion->id})\n";
    
    // Crear firma en BD
    $firmaId = DB::table('firmas_solicitud')->insertGetId([
        'solicitud_type' => 'App\\Models\\SolicitudHistoriaClinica',
        'solicitud_id' => $solicitud->id,
        'paso_aprobacion_id' => $pasoAprobacion->id,
        'firmado_por' => null,
        'nombre_firmante' => $datosFirma['usuario'],
        'cargo_firmante' => $pasoAprobacion->cargo_requerido,
        'credencial_usada' => null,
        'estado' => 'aprobado',
        'observaciones' => null,
        'motivo_rechazo' => null,
        'fecha_firma' => \Carbon\Carbon::parse($datosFirma['fecha'])->format('Y-m-d H:i:s'),
        'ip_address' => '127.0.0.1',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    echo "  ✓ Firma guardada con ID: {$firmaId}\n";
}

echo "\n";

// 4. Verificar firmas guardadas
$firmasGuardadas = DB::table('firmas_solicitud')
    ->join('pasos_aprobacion', 'firmas_solicitud.paso_aprobacion_id', '=', 'pasos_aprobacion.id')
    ->where('firmas_solicitud.solicitud_type', 'App\\Models\\SolicitudHistoriaClinica')
    ->where('firmas_solicitud.solicitud_id', $solicitud->id)
    ->select(
        'firmas_solicitud.id',
        'firmas_solicitud.nombre_firmante',
        'firmas_solicitud.cargo_firmante',
        'firmas_solicitud.estado',
        'firmas_solicitud.fecha_firma',
        'pasos_aprobacion.nombre_paso',
        'pasos_aprobacion.orden'
    )
    ->orderBy('pasos_aprobacion.orden')
    ->get();

echo "=== FIRMAS GUARDADAS ===\n";
foreach ($firmasGuardadas as $firma) {
    echo "ID: {$firma->id}\n";
    echo "  Firmante: {$firma->nombre_firmante}\n";
    echo "  Cargo: {$firma->cargo_firmante}\n";
    echo "  Paso: {$firma->nombre_paso} (Orden: {$firma->orden})\n";
    echo "  Estado: {$firma->estado}\n";
    echo "  Fecha: {$firma->fecha_firma}\n\n";
}

$totalFirmas = $firmasGuardadas->count();
echo "✅ PRUEBA EXITOSA - Se guardaron {$totalFirmas} firmas correctamente\n";
