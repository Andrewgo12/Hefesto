<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== ANÁLISIS DE TABLAS DE LA BASE DE DATOS ===\n\n";

// Obtener todas las tablas
$tables = DB::select('SHOW TABLES');
$dbName = env('DB_DATABASE', 'hefesto_db');

$tablasNecesarias = [];
$tablasInnecesarias = [];
$tablasLaravel = [];
$tablasDuplicadas = [];

foreach ($tables as $table) {
    $tableName = $table->{"Tables_in_$dbName"};
    
    // Obtener información de la tabla
    $count = DB::table($tableName)->count();
    
    // Clasificar tablas
    if (in_array($tableName, ['migrations', 'password_reset_tokens', 'failed_jobs', 'jobs', 'job_batches', 'sessions', 'cache', 'cache_locks'])) {
        $tablasLaravel[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Tabla del sistema Laravel'
        ];
    } elseif (in_array($tableName, ['users', 'roles', 'permisos', 'role_user', 'permiso_role'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Sistema de autenticación y permisos'
        ];
    } elseif (in_array($tableName, ['solicitudes_administrativas', 'solicitudes_historia_clinica'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Solicitudes principales del sistema'
        ];
    } elseif (in_array($tableName, ['historial_estados', 'historial_solicitudes'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Historial y trazabilidad'
        ];
    } elseif (in_array($tableName, ['areas', 'cargos', 'especialidades', 'servicios_medicos'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Catálogos del sistema'
        ];
    } elseif (in_array($tableName, ['credenciales_firma'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Credenciales para firmas digitales'
        ];
    } elseif (in_array($tableName, ['configuraciones', 'parametros_sistema'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Configuración del sistema'
        ];
    } elseif (in_array($tableName, ['notificaciones'])) {
        $tablasNecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Sistema de notificaciones'
        ];
    } else {
        // Tablas potencialmente innecesarias o duplicadas
        $tablasInnecesarias[] = [
            'nombre' => $tableName,
            'registros' => $count,
            'descripcion' => 'Revisar si es necesaria'
        ];
    }
}

// Mostrar resultados
echo "✅ TABLAS NECESARIAS (" . count($tablasNecesarias) . "):\n";
echo str_repeat("=", 80) . "\n";
foreach ($tablasNecesarias as $tabla) {
    printf("%-40s | %8d registros | %s\n", $tabla['nombre'], $tabla['registros'], $tabla['descripcion']);
}

echo "\n🔧 TABLAS DEL SISTEMA LARAVEL (" . count($tablasLaravel) . "):\n";
echo str_repeat("=", 80) . "\n";
foreach ($tablasLaravel as $tabla) {
    printf("%-40s | %8d registros | %s\n", $tabla['nombre'], $tabla['registros'], $tabla['descripcion']);
}

echo "\n⚠️  TABLAS A REVISAR (" . count($tablasInnecesarias) . "):\n";
echo str_repeat("=", 80) . "\n";
foreach ($tablasInnecesarias as $tabla) {
    printf("%-40s | %8d registros | %s\n", $tabla['nombre'], $tabla['registros'], $tabla['descripcion']);
}

// Verificar tablas duplicadas o similares
echo "\n\n🔍 ANÁLISIS DE POSIBLES DUPLICADOS:\n";
echo str_repeat("=", 80) . "\n";

// Verificar si hay tablas de historial duplicadas
$historialesCount = 0;
foreach (array_merge($tablasNecesarias, $tablasInnecesarias) as $tabla) {
    if (strpos($tabla['nombre'], 'historial') !== false) {
        $historialesCount++;
        echo "- {$tabla['nombre']} ({$tabla['registros']} registros)\n";
    }
}

if ($historialesCount > 1) {
    echo "⚠️  Hay $historialesCount tablas de historial. Verificar si son necesarias todas.\n";
}

// Verificar tablas de firmas
$firmasCount = 0;
foreach (array_merge($tablasNecesarias, $tablasInnecesarias) as $tabla) {
    if (strpos($tabla['nombre'], 'firma') !== false) {
        $firmasCount++;
        echo "- {$tabla['nombre']} ({$tabla['registros']} registros)\n";
    }
}

if ($firmasCount > 1) {
    echo "⚠️  Hay $firmasCount tablas relacionadas con firmas. Verificar si son necesarias todas.\n";
}

echo "\n\n📊 RESUMEN:\n";
echo str_repeat("=", 80) . "\n";
echo "Total de tablas: " . (count($tablasNecesarias) + count($tablasLaravel) + count($tablasInnecesarias)) . "\n";
echo "Tablas necesarias: " . count($tablasNecesarias) . "\n";
echo "Tablas Laravel: " . count($tablasLaravel) . "\n";
echo "Tablas a revisar: " . count($tablasInnecesarias) . "\n";
