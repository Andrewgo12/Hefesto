<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Create a request
$request = Illuminate\Http\Request::create(
    '/api/login',
    'POST',
    [
        'email' => 'camilo@hefesto.local',
        'password' => 'password123'
    ]
);

echo "Testing login endpoint...\n";
echo "Email: camilo@hefesto.local\n";
echo "Password: password123\n\n";

try {
    $response = $kernel->handle($request);
    $content = $response->getContent();
    
    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Response:\n";
    
    $data = json_decode($content, true);
    if ($data) {
        echo json_encode($data, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo $content . "\n";
    }
    
    $kernel->terminate($request, $response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
