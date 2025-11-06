<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

echo "=== LIMPIANDO BASE DE DATOS ===\n\n";

// Eliminar todas las solicitudes administrativas
$countAdmin = SolicitudAdministrativa::count();
SolicitudAdministrativa::truncate();
echo "✅ Eliminadas $countAdmin solicitudes administrativas\n";

// Eliminar todas las solicitudes de historia clínica
$countClinica = SolicitudHistoriaClinica::count();
SolicitudHistoriaClinica::truncate();
echo "✅ Eliminadas $countClinica solicitudes de historia clínica\n";

echo "\n✅ Base de datos limpia!\n";
