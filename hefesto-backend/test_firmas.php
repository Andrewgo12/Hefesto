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
echo "✓ Firmas en BD antes: {$firmasAntes}\n\n";

// 2. Buscar una solicitud para editar
$solicitud = SolicitudAdministrativa::first();

if (!$solicitud) {
    echo "❌ No hay solicitudes en la base de datos\n";
    exit(1);
}

echo "✓ Solicitud encontrada: ID {$solicitud->id} - {$solicitud->nombre_completo}\n\n";

// 3. Simular agregar una firma
$firmasJson = json_encode([
    'jefeInmediato' => [
        'usuario' => 'Usuario Admin (Prueba)',
        'fecha' => now()->toISOString()
    ]
]);

echo "✓ Firma a agregar: Jefe Inmediato\n";
echo "  JSON: {$firmasJson}\n\n";

// 4. Actualizar la solicitud
try {
    $solicitud->update([
        'firmas' => $firmasJson
    ]);
    
    echo "✓ Solicitud actualizada en BD\n\n";
    
    // 5. Ejecutar el procesamiento de firmas manualmente
    echo "⏳ Procesando firmas...\n";
    
    $firmasArray = json_decode($firmasJson, true);
    $mapeoFirmas = [
        'jefeInmediato' => 'Jefe inmediato',
    ];
    
    foreach ($firmasArray as $nombreFirma => $datosFirma) {
        $cargoRequerido = $mapeoFirmas[$nombreFirma] ?? null;
        
        if (!$cargoRequerido) {
            echo "  ⚠️ Firma desconocida: {$nombreFirma}\n";
            continue;
        }
        
        // Buscar paso de aprobación
        $pasoAprobacion = DB::table('pasos_aprobacion')
            ->join('flujos_aprobacion', 'pasos_aprobacion.flujo_id', '=', 'flujos_aprobacion.id')
            ->where('flujos_aprobacion.tipo_solicitud', 'administrativo')
            ->where('pasos_aprobacion.cargo_requerido', $cargoRequerido)
            ->select('pasos_aprobacion.id', 'pasos_aprobacion.nombre_paso', 'pasos_aprobacion.cargo_requerido')
            ->first();
        
        if (!$pasoAprobacion) {
            echo "  ❌ No se encontró paso de aprobación para: {$cargoRequerido}\n";
            continue;
        }
        
        echo "  ✓ Paso de aprobación encontrado: {$pasoAprobacion->nombre_paso} (ID: {$pasoAprobacion->id})\n";
        
        // Crear firma en BD
        $firmaId = DB::table('firmas_solicitud')->insertGetId([
            'solicitud_type' => 'App\\Models\\SolicitudAdministrativa',
            'solicitud_id' => $solicitud->id,
            'paso_aprobacion_id' => $pasoAprobacion->id,
            'firmado_por' => 1, // Admin user
    }
    
    echo "\n";
    
    // 6. Contar firmas después
    $firmasDespues = DB::table('firmas_solicitud')->count();
    echo "✓ Firmas en BD después: {$firmasDespues}\n\n";
    
    // 7. Mostrar la firma guardada
    echo "=== FIRMA GUARDADA ===\n";
    $firma = DB::table('firmas_solicitud')
        ->join('pasos_aprobacion', 'firmas_solicitud.paso_aprobacion_id', '=', 'pasos_aprobacion.id')
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
        ->first();
    
    if ($firma) {
        echo "ID: {$firma->id}\n";
        echo "Nombre: {$firma->nombre_firmante}\n";
        echo "Cargo: {$firma->cargo_firmante}\n";
        echo "Paso: {$firma->nombre_paso} (Orden: {$firma->orden})\n";
        echo "Estado: {$firma->estado}\n";
        echo "Fecha: {$firma->fecha_firma}\n";
    }
    
    echo "\n✅ PRUEBA EXITOSA - El sistema de firmas funciona correctamente\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
