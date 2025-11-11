<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== ROLES EN EL SISTEMA ===\n\n";

$roles = DB::table('roles')->select('id', 'nombre', 'descripcion')->get();

foreach ($roles as $role) {
    echo "{$role->id}. {$role->nombre}\n";
    if ($role->descripcion) {
        echo "   {$role->descripcion}\n";
    }
    echo "\n";
}
