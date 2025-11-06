<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

echo "Admin: " . SolicitudAdministrativa::count() . "\n";
echo "Clinica: " . SolicitudHistoriaClinica::count() . "\n";
