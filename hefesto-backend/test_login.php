<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "=== PRUEBA DE LOGIN ===" . PHP_EOL . PHP_EOL;

$email = 'admin@hefesto.local';
$password = 'admin123';

echo "Buscando usuario: {$email}" . PHP_EOL;
$user = User::where('email', $email)->first();

if (!$user) {
    echo "❌ Usuario no encontrado" . PHP_EOL;
    exit(1);
}

echo "✅ Usuario encontrado: {$user->name}" . PHP_EOL;
echo "   ID: {$user->id}" . PHP_EOL;
echo "   Email: {$user->email}" . PHP_EOL;
echo "   Estado: {$user->estado}" . PHP_EOL;
echo "   Rol: {$user->rol}" . PHP_EOL;
echo PHP_EOL;

echo "Verificando contraseña..." . PHP_EOL;
if (Hash::check($password, $user->password)) {
    echo "✅ Contraseña correcta" . PHP_EOL;
} else {
    echo "❌ Contraseña incorrecta" . PHP_EOL;
    echo "   Hash en BD: " . substr($user->password, 0, 50) . "..." . PHP_EOL;
}
echo PHP_EOL;

echo "Verificando estado..." . PHP_EOL;
if (strtolower($user->estado) === 'activo') {
    echo "✅ Usuario activo" . PHP_EOL;
} else {
    echo "❌ Usuario inactivo: {$user->estado}" . PHP_EOL;
}
echo PHP_EOL;

echo "Intentando crear token..." . PHP_EOL;
try {
    $token = $user->createToken('test-token')->plainTextToken;
    echo "✅ Token creado exitosamente" . PHP_EOL;
    echo "   Token: " . substr($token, 0, 20) . "..." . PHP_EOL;
} catch (\Exception $e) {
    echo "❌ Error al crear token: " . $e->getMessage() . PHP_EOL;
    echo "   Archivo: " . $e->getFile() . ":" . $e->getLine() . PHP_EOL;
}
