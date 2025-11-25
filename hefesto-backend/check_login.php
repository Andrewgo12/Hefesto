<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$email = 'camilo@hefesto.local';
$password = 'password123';

echo "Checking user: $email\n";

$user = User::where('email', $email)->first();

if (!$user) {
    echo "User not found!\n";
    exit(1);
}

echo "User found: " . $user->name . " (ID: " . $user->id . ")\n";
echo "Role: " . $user->rol . "\n";
echo "Stored Hash: " . substr($user->password, 0, 20) . "...\n";

if (Hash::check($password, $user->password)) {
    echo "SUCCESS: Password '$password' is CORRECT.\n";
} else {
    echo "FAILURE: Password '$password' is INCORRECT.\n";
    
    // Try to reset it to password123 for testing
    echo "Attempting to reset password to 'password123'...\n";
    $user->password = Hash::make('password123');
    $user->save();
    echo "Password reset complete. Try logging in again.\n";
}
