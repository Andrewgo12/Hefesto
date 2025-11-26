<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

echo "=== LIMPIEZA DE USUARIOS ===\n\n";

// Eliminar todos excepto sofia y andres
DB::table('users')
    ->whereNotIn('username', ['sofia', 'andres'])
    ->delete();

echo "✓ Usuarios eliminados (excepto sofia y andres)\n";

// Actualizar Sofia (admin)
DB::table('users')->where('username', 'sofia')->update([
    'name' => 'Sofia',
    'email' => 'sofia@gmail.com',
    'username' => 'sofia',
    'password' => Hash::make('sofia123'),
    'rol' => 'Administrador',
    'estado' => 'activo'
]);
echo "✓ Sofia actualizada: sofia / sofia123 (Administrador)\n";

// Actualizar Andrés (admin)
DB::table('users')->where('username', 'andres')->update([
    'name' => 'Andrés',
    'email' => 'andres@gmail.com',
    'username' => 'andres',
    'password' => Hash::make('andres123'),
    'rol' => 'Administrador',
    'estado' => 'activo'
]);
echo "✓ Andrés actualizado: andres / andres123 (Administrador)\n";

// Crear usuario "prueba" (usuario normal)
$pruebaExists = DB::table('users')->where('username', 'prueba')->first();
if ($pruebaExists) {
    DB::table('users')->where('username', 'prueba')->update([
        'name' => 'Prueba Usuario',
        'email' => 'prueba@gmail.com',
        'username' => 'prueba',
        'password' => Hash::make('prueba123'),
        'rol' => 'Usuario',
        'estado' => 'activo'
    ]);
    echo "✓ Usuario Prueba actualizado: prueba / prueba123 (Usuario)\n";
} else {
    DB::table('users')->insert([
        'name' => 'Prueba Usuario',
        'email' => 'prueba@gmail.com',
        'username' => 'prueba',
        'password' => Hash::make('prueba123'),
        'rol' => 'Usuario',
        'estado' => 'activo',
        'created_at' => now(),
        'updated_at' => now()
    ]);
    echo "✓ Usuario Prueba creado: prueba / prueba123 (Usuario)\n";
}

echo "\n=== USUARIOS FINALES ===\n\n";
$users = DB::table('users')->select('name', 'username', 'email', 'rol')->get();
foreach ($users as $user) {
    echo "- {$user->name} ({$user->username}) - {$user->rol}\n";
}

echo "\n=== CREDENCIALES ===\n";
echo "sofia / sofia123 - Administrador\n";
echo "andres / andres123 - Administrador\n";
echo "prueba / prueba123 - Usuario\n";

// Guardar en archivo MD
$mdContent = "# Credenciales HEFESTO - Simplificado\n\n";
$mdContent .= "**Fecha:** " . date('Y-m-d H:i:s') . "\n\n";
$mdContent .= "## Usuarios Activos\n\n";
$mdContent .= "| Nombre | Username | Email | Password | Rol |\n";
$mdContent .= "|--------|----------|-------|----------|-----|\n";
$mdContent .= "| Sofia | `sofia` | sofia@gmail.com | `sofia123` | Administrador |\n";
$mdContent .= "| Andrés | `andres` | andres@gmail.com | `andres123` | Administrador |\n";
$mdContent .= "| Prueba Usuario | `prueba` | prueba@gmail.com | `prueba123` | Usuario |\n";
$mdContent .= "\n## Formato Simple\n\n";
$mdContent .= "- Username: nombre del usuario (sin espacios)\n";
$mdContent .= "- Password: username + 123\n";

file_put_contents(__DIR__.'/credenciales_usuarios.md', $mdContent);
echo "\n📄 Archivo actualizado: credenciales_usuarios.md\n";
