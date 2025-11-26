<?php

// Test directo del endpoint de login
$url = 'http://localhost:8000/api/login';
$data = [
    'email' => 'prueba',
    'password' => 'prueba123'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

echo "=== Testing Login API ===\n";
echo "URL: {$url}\n";
echo "Data: " . json_encode($data) . "\n\n";

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "HTTP Code: {$httpCode}\n";
if ($error) {
    echo "CURL Error: {$error}\n";
}
echo "\nResponse:\n";
echo $response . "\n";

// Decodificar respuesta
$json = json_decode($response, true);
if ($json) {
    echo "\nDecoded:\n";
    print_r($json);
    
    if (isset($json['token'])) {
        echo "\n✓ Login EXITOSO - Token recibido\n";
        $token = $json['token'];
        
        // Test /me endpoint
        echo "\n=== Testing /me Endpoint ===\n";
        $ch2 = curl_init('http://localhost:8000/api/me');
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token,
            'Accept: application/json'
        ]);
        
        $response2 = curl_exec($ch2);
        $httpCode2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
        curl_close($ch2);
        
        echo "HTTP Code: {$httpCode2}\n";
        echo "Response: " . substr($response2, 0, 100) . "...\n";
        
        if ($httpCode2 === 200) {
            echo "✓ Token VÁLIDO para siguientes peticiones\n";
        } else {
            echo "✗ Token INVÁLIDO para siguientes peticiones (Error {$httpCode2})\n";
        }
    } else {
        echo "\n✗ Login FALLIDO - " . ($json['message'] ?? 'Error desconocido') . "\n";
    }
}
