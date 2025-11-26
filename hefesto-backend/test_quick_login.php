<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

echo "=== TEST LOGIN RÁPIDO ===\n\n";

// Test con camilo
$testUser = 'camilo';
$testPass = 'camilo123';

echo "Probando: {$testUser} / {$testPass}\n";

$user = DB::table('users')
    ->where('username', $testUser)
    ->orWhere('email', $testUser)
    ->first();

if ($user) {
    echo "✓ Usuario encontrado: {$user->name} ({$user->email})\n";
    echo "  Username: {$user->username}\n";
    
    $passwordCheck = Hash::check($testPass, $user->password);
    echo "  Password check: " . ($passwordCheck ? "✓ CORRECTO" : "✗ INCORRECTO") . "\n";
    echo "  Hash: " . substr($user->password, 0, 30) . "...\n";
} else {
    echo "✗ Usuario NO encontrado\n";
}

echo "\n=== Probando con otros usuarios ===\n";
$users = ['sofia', 'maria', 'john'];
foreach ($users as $u) {
    $user = DB::table('users')->where('username', $u)->first();
    if ($user) {
        $check = Hash::check($u . '123', $user->password);
        echo "{$u} / {$u}123: " . ($check ? "✓" : "✗") . "\n";
    }
}
