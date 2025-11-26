<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

echo "Actualizando contraseñas...\n\n";

$users = DB::table('users')->select('id', 'name', 'email')->get();
$credentials = [];

foreach ($users as $user) {
    $firstName = strtolower(explode(' ', $user->name)[0]);
    $password = $firstName . '123';
    
    DB::table('users')->where('id', $user->id)->update([
        'password' => Hash::make($password)
    ]);
    
    $credentials[] = [
        'name' => $user->name,
        'email' => $user->email,
        'password' => $password
    ];
    
    echo "✓ {$user->email} => {$password}\n";
}

echo "\n✅ Total: " . count($credentials) . " contraseñas actualizadas\n";

// Crear archivo MD
$mdContent = "# Credenciales de Usuario - HEFESTO\n\n";
$mdContent .= "**Fecha de actualización:** " . date('Y-m-d H:i:s') . "\n\n";
$mdContent .= "## Lista de Usuarios\n\n";
$mdContent .= "| Nombre | Email | Contraseña |\n";
$mdContent .= "|--------|-------|------------|\n";

foreach ($credentials as $cred) {
    $mdContent .= "| {$cred['name']} | {$cred['email']} | `{$cred['password']}` |\n";
}

$mdContent .= "\n## Formato de Contraseña\n\n";
$mdContent .= "Patrón: **nombre123**\n";
$mdContent .= "- Ejemplo: Sofia → sofia123\n";
$mdContent .= "- Ejemplo: María → maría123\n\n";
$mdContent .= "⚠️ **Importante:** Estas son credenciales de desarrollo. No usar en producción.\n";

file_put_contents(__DIR__.'/credenciales_usuarios.md', $mdContent);

echo "\n📄 Archivo creado: credenciales_usuarios.md\n";
