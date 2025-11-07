<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Crear o actualizar usuario de prueba
$email = 'admin@hefesto.local';
$password = 'admin123'; // Contraseña de prueba

$user = User::where('email', $email)->first();

if ($user) {
    echo "Usuario encontrado: {$user->name} ({$user->email})" . PHP_EOL;
    echo "Actualizando contraseña a: {$password}" . PHP_EOL;
    $user->password = Hash::make($password);
    $user->estado = 'Activo';
    $user->save();
    echo "✅ Contraseña actualizada correctamente" . PHP_EOL;
} else {
    echo "❌ Usuario no encontrado: {$email}" . PHP_EOL;
    echo "Creando nuevo usuario..." . PHP_EOL;
    
    $user = User::create([
        'name' => 'Administrador',
        'email' => $email,
        'password' => Hash::make($password),
        'rol' => 'Administrador',
        'estado' => 'Activo',
    ]);
    
    echo "✅ Usuario creado: {$user->name} ({$user->email})" . PHP_EOL;
}

echo PHP_EOL;
echo "Credenciales de acceso:" . PHP_EOL;
echo "Email: {$email}" . PHP_EOL;
echo "Password: {$password}" . PHP_EOL;
