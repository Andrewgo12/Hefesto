<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$count = DB::table('firmas_solicitud')->count();
echo "Total firmas: {$count}\n";

if ($count > 0) {
    $firma = DB::table('firmas_solicitud')
        ->join('pasos_aprobacion', 'firmas_solicitud.paso_aprobacion_id', '=', 'pasos_aprobacion.id')
        ->select('firmas_solicitud.*', 'pasos_aprobacion.nombre_paso')
        ->latest('firmas_solicitud.created_at')
        ->first();
    
    echo "\nÚltima firma guardada:\n";
    echo "- Firmante: {$firma->nombre_firmante}\n";
    echo "- Cargo: {$firma->cargo_firmante}\n";
    echo "- Paso: {$firma->nombre_paso}\n";
    echo "- Fecha: {$firma->fecha_firma}\n";
    echo "- Solicitud ID: {$firma->solicitud_id}\n";
}
