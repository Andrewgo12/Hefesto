<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SolicitudAdministrativaController;
use App\Http\Controllers\Api\SolicitudHistoriaClinicaController;
use App\Http\Controllers\Api\AuthController;

// Ruta pública para pruebas
Route::get('/ping', function () {
    return response()->json(['message' => 'pong', 'timestamp' => now()]);
});

// Rutas de autenticación (públicas)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verificar-credencial-firma', [AuthController::class, 'verificarCredencialFirma']);

// Rutas protegidas con autenticación (opcional por ahora)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Rutas de solicitudes (sin auth por ahora para desarrollo)
Route::prefix('solicitudes')->group(function () {
    
    // Solicitudes Administrativas
    Route::prefix('administrativas')->group(function () {
        Route::get('/', [SolicitudAdministrativaController::class, 'index']);
        Route::post('/', [SolicitudAdministrativaController::class, 'store']);
        Route::get('/estadisticas', [SolicitudAdministrativaController::class, 'estadisticas']);
        Route::get('/{id}', [SolicitudAdministrativaController::class, 'show']);
        Route::put('/{id}', [SolicitudAdministrativaController::class, 'update']);
        Route::delete('/{id}', [SolicitudAdministrativaController::class, 'destroy']);
        Route::post('/{id}/aprobar', [SolicitudAdministrativaController::class, 'aprobar']);
        Route::post('/{id}/rechazar', [SolicitudAdministrativaController::class, 'rechazar']);
    });
    
    // Solicitudes Historia Clínica
    Route::prefix('historia-clinica')->group(function () {
        Route::get('/', [SolicitudHistoriaClinicaController::class, 'index']);
        Route::post('/', [SolicitudHistoriaClinicaController::class, 'store']);
        Route::get('/estadisticas', [SolicitudHistoriaClinicaController::class, 'estadisticas']);
        Route::get('/{id}', [SolicitudHistoriaClinicaController::class, 'show']);
        Route::put('/{id}', [SolicitudHistoriaClinicaController::class, 'update']);
        Route::delete('/{id}', [SolicitudHistoriaClinicaController::class, 'destroy']);
        Route::post('/{id}/aprobar', [SolicitudHistoriaClinicaController::class, 'aprobar']);
        Route::post('/{id}/rechazar', [SolicitudHistoriaClinicaController::class, 'rechazar']);
    });
});
