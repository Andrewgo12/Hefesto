<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use Illuminate\Support\Facades\DB;

echo "=== PRUEBA DE SISTEMA DE FIRMAS ===\n\n";

// 1. Contar firmas antes
$firmasAntes = DB::table('firmas_solicitud')->count();
echo "Firmas antes: {$firmasAntes}\n\n";

// 2. Buscar una solicitud
$solicitud = SolicitudAdministrativa::first();
if (!$solicitud) {
    echo "No hay solicitudes\n";
    exit(1);
}

echo "Solicitud: ID {$solicitud->id} - {$solicitud->nombre_completo}\n\n";

// 3. Crear firma
$firmasJson = json_encode([
    'jefeInmediato' => [
        'usuario' => 'Usuario Admin (Prueba)',
        'fecha' => now()->toISOString()
    ]
]);

$solicitud->update(['firmas' => $firmasJson]);

// 4. Procesar firma
$firmasArray = json_decode($firmasJson, true);
$pasoAprobacion = DB::table('pasos_aprobacion')
    ->join('flujos_aprobacion', 'pasos_aprobacion.flujo_id', '=', 'flujos_aprobacion.id')
    ->where('flujos_aprobacion.tipo_solicitud', 'administrativo')
    ->where('pasos_aprobacion.cargo_requerido', 'Jefe inmediato')
    ->select('pasos_aprobacion.id', 'pasos_aprobacion.nombre_paso')
    ->first();

if ($pasoAprobacion) {
    echo "Paso encontrado: {$pasoAprobacion->nombre_paso}\n";
    
    $firmaId = DB::table('firmas_solicitud')->insertGetId([
        'solicitud_type' => 'App\\Models\\SolicitudAdministrativa',
        'solicitud_id' => $solicitud->id,
        'paso_aprobacion_id' => $pasoAprobacion->id,
        'firmado_por' => null,
        'nombre_firmante' => $firmasArray['jefeInmediato']['usuario'],
        'cargo_firmante' => 'Jefe inmediato',
        'credencial_usada' => null,
        'estado' => 'aprobado',
        'observaciones' => null,
        'motivo_rechazo' => null,
        'fecha_firma' => \Carbon\Carbon::parse($firmasArray['jefeInmediato']['fecha'])->format('Y-m-d H:i:s'),
        'ip_address' => '127.0.0.1',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    echo "Firma guardada con ID: {$firmaId}\n\n";
}

// 5. Verificar
$firmasDespues = DB::table('firmas_solicitud')->count();
echo "Firmas después: {$firmasDespues}\n\n";

if ($firmasDespues > $firmasAntes) {
    echo "✅ PRUEBA EXITOSA - La firma se guardó correctamente\n";
} else {
    echo "❌ PRUEBA FALLIDA - La firma no se guardó\n";
}
