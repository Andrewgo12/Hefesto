<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use App\Models\User;

$user = User::where('email', 'admin@hefesto.local')->first();

echo "Usuario: {$user->name}" . PHP_EOL;
echo "Email: {$user->email}" . PHP_EOL;
echo PHP_EOL;

echo "Verificando roles..." . PHP_EOL;
try {
    $roles = $user->roles()->get();
    echo "Roles encontrados: " . $roles->count() . PHP_EOL;
    foreach ($roles as $role) {
        echo "  - {$role->nombre}" . PHP_EOL;
    }
} catch (\Exception $e) {
    echo "❌ Error al obtener roles: " . $e->getMessage() . PHP_EOL;
}
echo PHP_EOL;

echo "Verificando permisos..." . PHP_EOL;
try {
    $permisos = $user->permisos();
    echo "Permisos encontrados: " . (is_countable($permisos) ? count($permisos) : $permisos->count()) . PHP_EOL;
} catch (\Exception $e) {
    echo "❌ Error al obtener permisos: " . $e->getMessage() . PHP_EOL;
}
echo PHP_EOL;

echo "Verificando métodos..." . PHP_EOL;
try {
    echo "esAdministrador(): " . ($user->esAdministrador() ? 'Sí' : 'No') . PHP_EOL;
} catch (\Exception $e) {
    echo "❌ Error en esAdministrador(): " . $e->getMessage() . PHP_EOL;
}

try {
    echo "esSupervisor(): " . ($user->esSupervisor() ? 'Sí' : 'No') . PHP_EOL;
} catch (\Exception $e) {
    echo "❌ Error en esSupervisor(): " . $e->getMessage() . PHP_EOL;
}

try {
    echo "esMedico(): " . ($user->esMedico() ? 'Sí' : 'No') . PHP_EOL;
} catch (\Exception $e) {
    echo "❌ Error en esMedico(): " . $e->getMessage() . PHP_EOL;
}
