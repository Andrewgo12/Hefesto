<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

echo "=== CREANDO USUARIOS PARA CADA ROL ===" . PHP_EOL . PHP_EOL;

// Obtener todos los roles de la base de datos
$roles = DB::table('roles')->where('activo', 1)->get();

echo "Roles encontrados: " . $roles->count() . PHP_EOL . PHP_EOL;

$password = 'hefesto123'; // Contraseña por defecto para todos los usuarios

foreach ($roles as $role) {
    $email = strtolower(str_replace([' ', '-'], ['_', '_'], $role->nombre)) . '@hefesto.local';
    
    // Verificar si ya existe
    $existingUser = User::where('email', $email)->first();
    
    if ($existingUser) {
        echo "⚠️  Usuario ya existe: {$role->nombre} ({$email})" . PHP_EOL;
        continue;
    }
    
    // Crear usuario
    $user = User::create([
        'name' => $role->nombre,
        'email' => $email,
        'password' => Hash::make($password),
        'rol' => $role->nombre,
        'estado' => 'Activo',
    ]);
    
    // Asignar el rol correspondiente
    $user->asignarRol($role->id);
    
    echo "✅ Usuario creado: {$role->nombre}" . PHP_EOL;
    echo "   Email: {$email}" . PHP_EOL;
    echo "   Password: {$password}" . PHP_EOL;
    echo "   ID: {$user->id}" . PHP_EOL;
    echo PHP_EOL;
}

echo PHP_EOL;
echo "=== RESUMEN DE USUARIOS ===" . PHP_EOL;
echo "Total usuarios en el sistema: " . User::count() . PHP_EOL;
echo PHP_EOL;

echo "Listado de usuarios:" . PHP_EOL;
$users = User::all(['id', 'name', 'email', 'rol', 'estado']);
foreach ($users as $user) {
    echo "  - {$user->name} ({$user->email}) - Rol: {$user->rol} - Estado: {$user->estado}" . PHP_EOL;
}

echo PHP_EOL;
echo "=== CREDENCIALES DE ACCESO ===" . PHP_EOL;
echo "Contraseña para todos los usuarios: {$password}" . PHP_EOL;
echo "Usuario admin: admin@hefesto.local / admin123" . PHP_EOL;
