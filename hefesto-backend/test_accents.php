<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

echo "=== TEST LOGIN SIN TILDES ===\n\n";

// Función para quitar acentos (igual que en AuthController)
function removeAccents($text) {
    $unwanted = [
        'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u',
        'Á' => 'A', 'É' => 'E', 'Í' => 'I', 'Ó' => 'O', 'Ú' => 'U',
        'ñ' => 'n', 'Ñ' => 'N'
    ];
    return strtr($text, $unwanted);
}

$tests = [
    ['andres', 'andres123'],  // Sin tilde
    ['andrés', 'andres123'],  // Con tilde (debería fallar con password sin tilde)
    ['sofia', 'sofia123'],
];

foreach ($tests as $test) {
    list($input, $pass) = $test;
    echo "Probando: '{$input}' / '{$pass}'\n";
    
    $normalized = removeAccents($input);
    echo "  Normalizado: '{$normalized}'\n";
    
    // Buscar usuario
    $user = DB::table('users')
        ->where('email', $input)
        ->orWhere('username', $input)
        ->orWhereRaw('LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(email, "á", "a"), "é", "e"), "í", "i"), "ó", "o"), "ú", "u")) = ?', [strtolower($normalized)])
        ->orWhereRaw('LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(username, "á", "a"), "é", "e"), "í", "i"), "ó", "o"), "ú", "u")) = ?', [strtolower($normalized)])
        ->first();
    
    if ($user) {
        $check = Hash::check($pass, $user->password);
        echo "  ✓ Usuario encontrado: {$user->name} ({$user->username})\n";
        echo "  Password: " . ($check ? "✓ CORRECTO" : "✗ INCORRECTO") . "\n";
    } else {
        echo "  ✗ Usuario NO encontrado\n";
    }
    echo "\n";
}
