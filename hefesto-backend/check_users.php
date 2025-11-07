<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;

echo "Total usuarios: " . User::count() . PHP_EOL;
echo PHP_EOL;

$users = User::all(['id', 'name', 'email', 'estado', 'rol']);
foreach ($users as $user) {
    echo "ID: {$user->id} | {$user->name} | {$user->email} | Estado: {$user->estado} | Rol: {$user->rol}" . PHP_EOL;
}
