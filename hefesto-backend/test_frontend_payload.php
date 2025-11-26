<?php
// Test exactamente lo que envía el frontend
$url = 'http://localhost:8000/api/login';
$data = [
    'email' => 'prueba',
    'password' => 'prueba123',
    'remember' => false  // Como el frontend
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

echo "\n=== Testing Frontend Payload ===\n";
echo "URL: $url\n";
echo "Data: " . json_encode($data) . "\n\n";

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n\n";

if ($httpCode === 200) {
    $json = json_decode($response, true);
    if (isset($json['token'])) {
        echo "\n✓ Login EXITOSO con payload de frontend\n";
    } else {
        echo "\n✗ Login FALLIDO - " . ($json['message'] ?? 'Error desconocido') . "\n";
    }
} else {
    echo "\n✗ Error HTTP $httpCode\n";
}
