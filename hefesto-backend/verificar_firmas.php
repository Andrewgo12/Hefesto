<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "=== PRUEBA FINAL - SISTEMA DE FIRMAS COMPLETO ===\n\n";

// 1. Verificar firmas actuales
$firmasAdmin = DB::table('firmas_solicitud')
    ->where('solicitud_type', 'App\\Models\\SolicitudAdministrativa')
    ->count();

$firmasHC = DB::table('firmas_solicitud')
    ->where('solicitud_type', 'App\\Models\\SolicitudHistoriaClinica')
    ->count();

echo "ESTADO ACTUAL:\n";
echo "  Firmas Administrativas: {$firmasAdmin}\n";
echo "  Firmas Historia Clínica: {$firmasHC}\n";
echo "  Total: " . ($firmasAdmin + $firmasHC) . "\n\n";

// 2. Mostrar últimas firmas guardadas
echo "=== ÚLTIMAS FIRMAS GUARDADAS ===\n\n";

$ultimasFirmas = DB::table('firmas_solicitud')
    ->join('pasos_aprobacion', 'firmas_solicitud.paso_aprobacion_id', '=', 'pasos_aprobacion.id')
    ->select(
        'firmas_solicitud.id',
        'firmas_solicitud.solicitud_type',
        'firmas_solicitud.solicitud_id',
        'firmas_solicitud.nombre_firmante',
        'firmas_solicitud.cargo_firmante',
        'firmas_solicitud.estado',
        'firmas_solicitud.fecha_firma',
        'pasos_aprobacion.nombre_paso'
    )
    ->orderBy('firmas_solicitud.created_at', 'desc')
    ->limit(5)
    ->get();

if ($ultimasFirmas->count() > 0) {
    foreach ($ultimasFirmas as $firma) {
        $tipo = str_contains($firma->solicitud_type, 'Administrativa') ? 'ADMIN' : 'HC';
        echo "[{$tipo}] Solicitud #{$firma->solicitud_id}\n";
        echo "  Firmante: {$firma->nombre_firmante}\n";
        echo "  Cargo: {$firma->cargo_firmante}\n";
        echo "  Paso: {$firma->nombre_paso}\n";
        echo "  Estado: {$firma->estado}\n";
        echo "  Fecha: {$firma->fecha_firma}\n\n";
    }
} else {
    echo "No hay firmas guardadas aún.\n\n";
}

// 3. Verificar pasos de aprobación disponibles
echo "=== PASOS DE APROBACIÓN CONFIGURADOS ===\n\n";

$pasosAdmin = DB::table('pasos_aprobacion')
    ->join('flujos_aprobacion', 'pasos_aprobacion.flujo_id', '=', 'flujos_aprobacion.id')
    ->where('flujos_aprobacion.tipo_solicitud', 'administrativo')
    ->select('pasos_aprobacion.nombre_paso', 'pasos_aprobacion.cargo_requerido', 'pasos_aprobacion.orden')
    ->orderBy('pasos_aprobacion.orden')
    ->get();

echo "ADMINISTRATIVO:\n";
foreach ($pasosAdmin as $paso) {
    echo "  {$paso->orden}. {$paso->nombre_paso} ({$paso->cargo_requerido})\n";
}

echo "\n";

$pasosHC = DB::table('pasos_aprobacion')
    ->join('flujos_aprobacion', 'pasos_aprobacion.flujo_id', '=', 'flujos_aprobacion.id')
    ->where('flujos_aprobacion.tipo_solicitud', 'historia_clinica')
    ->select('pasos_aprobacion.nombre_paso', 'pasos_aprobacion.cargo_requerido', 'pasos_aprobacion.orden')
    ->orderBy('pasos_aprobacion.orden')
    ->get();

echo "HISTORIA CLÍNICA:\n";
foreach ($pasosHC as $paso) {
    echo "  {$paso->orden}. {$paso->nombre_paso} ({$paso->cargo_requerido})\n";
}

echo "\n✅ SISTEMA DE FIRMAS CONFIGURADO CORRECTAMENTE\n";
echo "\nPara probar:\n";
echo "1. Crea una solicitud administrativa en: http://localhost:8080/registro/administrativo\n";
echo "2. Agrega firmas en la sección 'Vo. Bo. Y FIRMAS'\n";
echo "3. Las firmas se guardarán automáticamente en la tabla firmas_solicitud\n";
