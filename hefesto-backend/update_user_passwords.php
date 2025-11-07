<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "=== ACTUALIZANDO CONTRASEÑAS DE USUARIOS ===" . PHP_EOL . PHP_EOL;

// Definir contraseñas únicas para cada usuario
$userPasswords = [
    'admin@hefesto.local' => 'Admin2024!',
    'administrativo___entrada_de_datos@hefesto.local' => 'Datos123',
    'administrativo___supervisor@hefesto.local' => 'Super456',
    'médico___consulta@hefesto.local' => 'Medico789',
    'técnico_del_sistema@hefesto.local' => 'Tecnico2024',
    'jefe@hefesto.local' => 'Jefe2024',
    'medico@hefesto.local' => 'Carlos123',
    'maria.garcia@hefesto.local' => 'Maria456',
    'juan.perez@hefesto.local' => 'Juan789',
];

$updated = 0;
$notFound = 0;

foreach ($userPasswords as $email => $password) {
    $user = User::where('email', $email)->first();
    
    if ($user) {
        $user->password = Hash::make($password);
        $user->save();
        
        echo "✅ Actualizado: {$user->name}" . PHP_EOL;
        echo "   Email: {$email}" . PHP_EOL;
        echo "   Nueva contraseña: {$password}" . PHP_EOL;
        echo PHP_EOL;
        
        $updated++;
    } else {
        echo "⚠️  Usuario no encontrado: {$email}" . PHP_EOL;
        $notFound++;
    }
}

echo PHP_EOL;
echo "=== RESUMEN ===" . PHP_EOL;
echo "Usuarios actualizados: {$updated}" . PHP_EOL;
echo "Usuarios no encontrados: {$notFound}" . PHP_EOL;
echo PHP_EOL;

echo "=== CREDENCIALES ACTUALIZADAS ===" . PHP_EOL;
echo "┌─────────────────────────────────────────────────────────────────┐" . PHP_EOL;
echo "│ ROL                              │ EMAIL                        │ PASSWORD      │" . PHP_EOL;
echo "├─────────────────────────────────────────────────────────────────┤" . PHP_EOL;

foreach ($userPasswords as $email => $password) {
    $user = User::where('email', $email)->first();
    if ($user) {
        printf("│ %-32s │ %-28s │ %-13s │\n", 
            substr($user->rol, 0, 32), 
            substr($email, 0, 28), 
            $password
        );
    }
}

echo "└─────────────────────────────────────────────────────────────────┘" . PHP_EOL;
