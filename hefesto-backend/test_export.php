<?php

// Script de prueba para verificar exportación
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SolicitudHistoriaClinica;

echo "=== PRUEBA DE EXPORTACIÓN ===\n\n";

// Obtener la primera solicitud
$solicitud = SolicitudHistoriaClinica::first();

if (!$solicitud) {
    echo "❌ No hay solicitudes en la BD\n";
    exit(1);
}

echo "✅ Solicitud encontrada: ID {$solicitud->id}\n";
echo "Nombre: {$solicitud->nombre_completo}\n";
echo "Cédula: {$solicitud->cedula}\n";
echo "Perfil: {$solicitud->perfil}\n\n";

echo "=== DATOS JSON ===\n";
echo "Capacitación HC: " . json_encode($solicitud->capacitacion_historia_clinica) . "\n";
echo "Capacitación Epi: " . json_encode($solicitud->capacitacion_epidemiologia) . "\n";
echo "Aval: " . json_encode($solicitud->aval_institucional) . "\n";
echo "Firmas: " . json_encode($solicitud->firmas) . "\n\n";

echo "=== TIPOS DE DATOS ===\n";
echo "Capacitación HC es array: " . (is_array($solicitud->capacitacion_historia_clinica) ? 'SÍ' : 'NO') . "\n";
echo "Capacitación Epi es array: " . (is_array($solicitud->capacitacion_epidemiologia) ? 'SÍ' : 'NO') . "\n";

echo "\n✅ Prueba completada\n";
