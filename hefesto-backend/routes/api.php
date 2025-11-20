<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SolicitudAdministrativaController;
use App\Http\Controllers\Api\SolicitudHistoriaClinicaController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FlujoAprobacionController;
use App\Http\Controllers\Api\CatalogoController;
use App\Http\Controllers\Api\NotificacionController;
use App\Http\Controllers\Api\ExportacionController;
use App\Http\Controllers\Api\RolController;
use App\Http\Controllers\Api\ParametroController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReporteController;
use App\Http\Controllers\Api\PermisoController;
use App\Http\Controllers\Api\CredencialFirmaController;

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

// Rutas de solicitudes (protegidas con autenticación)
Route::middleware(['auth:sanctum'])->prefix('solicitudes')->group(function () {
    
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

// Rutas de flujo de aprobaciones
Route::prefix('flujos')->group(function () {
    // Buscar solicitud por cédula o nombre
    Route::get('/buscar', [FlujoAprobacionController::class, 'buscarSolicitud']);
    
    // Obtener progreso de firmas
    Route::get('/progreso/{tipo}/{id}', [FlujoAprobacionController::class, 'obtenerProgreso']);
    
    // Firmar paso (aprobar)
    Route::post('/firmar', [FlujoAprobacionController::class, 'firmarPaso']);
    
    // Rechazar paso
    Route::post('/rechazar', [FlujoAprobacionController::class, 'rechazarPaso']);
});

// Rutas de catálogos
Route::prefix('catalogos')->group(function () {
    Route::get('/areas', [CatalogoController::class, 'areas']);
    Route::get('/cargos', [CatalogoController::class, 'cargos']);
    Route::get('/especialidades', [CatalogoController::class, 'especialidades']);
    Route::get('/todos', [CatalogoController::class, 'todos']);
});

// Rutas de notificaciones
Route::prefix('notificaciones')->group(function () {
    Route::get('/', [NotificacionController::class, 'index']);
    Route::get('/no-leidas', [NotificacionController::class, 'noLeidas']);
    Route::put('/{id}/leer', [NotificacionController::class, 'marcarLeida']);
    Route::post('/leer-todas', [NotificacionController::class, 'marcarTodasLeidas']);
});

// Rutas de exportación y previsualización (protegidas con autenticación)
Route::middleware(['auth:sanctum'])->prefix('exportar')->group(function () {
    // Descargar Excel
    Route::get('/administrativa/{id}', [ExportacionController::class, 'exportarAdministrativa']);
    Route::get('/historia-clinica/{id}', [ExportacionController::class, 'exportarHistoriaClinica']);
    
    // Previsualizar como HTML
    Route::get('/preview/administrativa/{id}', [ExportacionController::class, 'previsualizarAdministrativa']);
    Route::get('/preview/historia-clinica/{id}', [ExportacionController::class, 'previsualizarHistoriaClinica']);
    
    Route::get('/metadatos', [ExportacionController::class, 'obtenerMetadatos']);
});

// Rutas de roles
Route::prefix('roles')->group(function () {
    Route::get('/', [RolController::class, 'index']);
    Route::get('/{id}', [RolController::class, 'show']);
    Route::post('/', [RolController::class, 'store']);
    Route::put('/{id}', [RolController::class, 'update']);
    Route::delete('/{id}', [RolController::class, 'destroy']);
});

// Rutas de parámetros del sistema
Route::prefix('parametros')->group(function () {
    Route::get('/', [ParametroController::class, 'index']);
    Route::get('/{key}', [ParametroController::class, 'show']);
    Route::put('/{key}', [ParametroController::class, 'update']);
});

// Rutas de usuarios (protegidas con autenticación)
Route::middleware(['auth:sanctum'])->prefix('usuarios')->group(function () {
    Route::get('/', [UsuarioController::class, 'index']);
    Route::get('/{id}', [UsuarioController::class, 'show']);
    Route::post('/', [UsuarioController::class, 'store']);
    Route::put('/{id}', [UsuarioController::class, 'update']);
    Route::delete('/{id}', [UsuarioController::class, 'destroy']);
    Route::put('/{id}/estado', [UsuarioController::class, 'cambiarEstado']);
    Route::post('/{id}/cambiar-password', [UsuarioController::class, 'cambiarPassword']);
});

// Rutas de perfil de usuario autenticado
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/perfil', [UsuarioController::class, 'perfil']);
    Route::put('/perfil', [UsuarioController::class, 'actualizarPerfil']);
});

// Rutas de Dashboard
Route::middleware(['auth:sanctum'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('/admin', [DashboardController::class, 'estadisticasAdmin']);
});

// Rutas de Reportes
Route::middleware(['auth:sanctum'])->prefix('reportes')->group(function () {
    Route::get('/', [ReporteController::class, 'index']);
    Route::post('/generar', [ReporteController::class, 'generar']);
    Route::get('/{id}/exportar', [ReporteController::class, 'exportar']);
});

// Rutas de Permisos y Roles
Route::middleware(['auth:sanctum'])->prefix('permisos')->group(function () {
    Route::get('/mis-permisos', [PermisoController::class, 'misPermisos']);
    Route::post('/verificar', [PermisoController::class, 'verificarPermiso']);
    Route::get('/listar', [PermisoController::class, 'listarPermisos']);
    Route::get('/roles', [PermisoController::class, 'listarRoles']);
    Route::post('/asignar-rol', [PermisoController::class, 'asignarRol']);
    Route::delete('/remover-rol', [PermisoController::class, 'removerRol']);
});

// Rutas de Catálogos CRUD (solo admin)
Route::middleware(['auth:sanctum'])->prefix('catalogos')->group(function () {
    // Crear
    Route::post('/cargos', [CatalogoController::class, 'storeCargo']);
    Route::post('/areas', [CatalogoController::class, 'storeArea']);
    Route::post('/especialidades', [CatalogoController::class, 'storeEspecialidad']);
    
    // Actualizar
    Route::put('/cargos/{id}', [CatalogoController::class, 'updateCargo']);
});

// Rutas de Notificaciones (con auth)
Route::middleware(['auth:sanctum'])->prefix('notificaciones')->group(function () {
    Route::post('/', [NotificacionController::class, 'store']);
    Route::delete('/{id}', [NotificacionController::class, 'destroy']);
});

// Rutas de Credenciales de Firmas (con auth)
Route::middleware(['auth:sanctum'])->prefix('credenciales-firmas')->group(function () {
    Route::get('/', [CredencialFirmaController::class, 'index']);
    Route::get('/tipo/{tipo}', [CredencialFirmaController::class, 'porTipo']);
    Route::get('/{id}', [CredencialFirmaController::class, 'show']);
    Route::post('/', [CredencialFirmaController::class, 'store']);
    Route::put('/{id}', [CredencialFirmaController::class, 'update']);
    Route::delete('/{id}', [CredencialFirmaController::class, 'destroy']);
    Route::post('/{id}/toggle-activo', [CredencialFirmaController::class, 'toggleActivo']);
    Route::post('/reordenar', [CredencialFirmaController::class, 'reordenar']);
});
