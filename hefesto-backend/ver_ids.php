<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

echo "=== IDs DE SOLICITUDES ===\n\n";

echo "Administrativas:\n";
$admins = SolicitudAdministrativa::select('id', 'nombre_completo')->get();
foreach ($admins as $admin) {
    echo "  ID: {$admin->id} - {$admin->nombre_completo}\n";
}

echo "\nHistoria Clínica:\n";
$clinicas = SolicitudHistoriaClinica::select('id', 'nombre_completo')->get();
foreach ($clinicas as $clinica) {
    echo "  ID: {$clinica->id} - {$clinica->nombre_completo}\n";
}

echo "\nTotal Admin: " . $admins->count() . "\n";
echo "Total HC: " . $clinicas->count() . "\n";
