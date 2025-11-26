<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

echo "Actualizando usuarios con @gmail.com y usernames...\n\n";

// Agregar columna username si no existe
if (!Schema::hasColumn('users', 'username')) {
    Schema::table('users', function ($table) {
        $table->string('username')->unique()->nullable()->after('email');
    });
    echo "✓ Columna 'username' agregada\n\n";
}

$users = DB::table('users')->select('id', 'name', 'email')->get();
$credentials = [];

foreach ($users as $user) {
    $firstName = strtolower(explode(' ', $user->name)[0]);
    $password = $firstName . '123';
    
    // Crear username sin espacios ni acentos
    $username = strtolower(str_replace(' ', '', $user->name));
    $username = str_replace(['á', 'é', 'í', 'ó', 'ú', 'ñ'], ['a', 'e', 'i', 'o', 'u', 'n'], $username);
    
    // Email con @gmail.com
    $newEmail = $firstName . '@gmail.com';
    
    DB::table('users')->where('id', $user->id)->update([
        'email' => $newEmail,
        'username' => $username,
        'password' => Hash::make($password)
    ]);
    
    $credentials[] = [
        'name' => $user->name,
        'username' => $username,
        'email' => $newEmail,
        'password' => $password
    ];
    
    echo "✓ {$user->name}\n";
    echo "  Username: {$username}\n";
    echo "  Email: {$newEmail}\n";
    echo "  Password: {$password}\n\n";
}

echo "✅ Total: " . count($credentials) . " usuarios actualizados\n\n";

// Crear archivo MD
$mdContent = "# Credenciales de Usuario - HEFESTO\n\n";
$mdContent .= "**Fecha de actualización:** " . date('Y-m-d H:i:s') . "\n\n";
$mdContent .= "## Lista de Usuarios\n\n";
$mdContent .= "| Nombre | Username | Email | Contraseña |\n";
$mdContent .= "|--------|----------|-------|------------|\n";

foreach ($credentials as $cred) {
    $mdContent .= "| {$cred['name']} | `{$cred['username']}` | {$cred['email']} | `{$cred['password']}` |\n";
}

$mdContent .= "\n## Opciones de Login\n\n";
$mdContent .= "Puedes usar **username** O **email** para iniciar sesión:\n\n";
$mdContent .= "**Ejemplos:**\n";
$mdContent .= "- `sofia` / `sofia123` ✅\n";
$mdContent .= "- `sofia@gmail.com` / `sofia123` ✅\n";
$mdContent .= "- `camilo` / `camilo123` ✅\n";
$mdContent .= "- `camilo@gmail.com` / `camilo123` ✅\n\n";
$mdContent .= "## Formato de Contraseña\n\n";
$mdContent .= "Patrón: **nombre123**\n";
$mdContent .= "- Ejemplo: Sofia → sofia123\n";
$mdContent .= "- Ejemplo: María → maria123\n\n";
$mdContent .= "⚠️ **Importante:** Estas son credenciales de desarrollo. No usar en producción.\n";

file_put_contents(__DIR__.'/credenciales_usuarios.md', $mdContent);

echo "📄 Archivo actualizado: credenciales_usuarios.md\n";
