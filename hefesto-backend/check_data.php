<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\User;

echo "=== VERIFICACIÓN DE DATOS ===" . PHP_EOL . PHP_EOL;

echo "Usuarios: " . User::count() . PHP_EOL;
echo "Solicitudes Administrativas: " . SolicitudAdministrativa::count() . PHP_EOL;
echo "Solicitudes Historia Clínica: " . SolicitudHistoriaClinica::count() . PHP_EOL;
echo PHP_EOL;

if (SolicitudAdministrativa::count() > 0) {
    echo "Últimas 5 solicitudes administrativas:" . PHP_EOL;
    $solicitudes = SolicitudAdministrativa::latest()->take(5)->get(['id', 'nombre_completo', 'cedula', 'estado']);
    foreach ($solicitudes as $sol) {
        echo "  - ID: {$sol->id} | {$sol->nombre_completo} | Cédula: {$sol->cedula} | Estado: {$sol->estado}" . PHP_EOL;
    }
} else {
    echo "⚠️ No hay solicitudes administrativas en la base de datos" . PHP_EOL;
}
echo PHP_EOL;

if (SolicitudHistoriaClinica::count() > 0) {
    echo "Últimas 5 solicitudes historia clínica:" . PHP_EOL;
    $solicitudes = SolicitudHistoriaClinica::latest()->take(5)->get(['id', 'nombre_completo', 'cedula', 'estado']);
    foreach ($solicitudes as $sol) {
        echo "  - ID: {$sol->id} | {$sol->nombre_completo} | Cédula: {$sol->cedula} | Estado: {$sol->estado}" . PHP_EOL;
    }
} else {
    echo "⚠️ No hay solicitudes de historia clínica en la base de datos" . PHP_EOL;
}
