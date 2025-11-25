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
// Rutas protegidas con autenticación
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Rutas de solicitudes
    Route::prefix('solicitudes')->group(function () {
        // Solicitudes Administrativas
        Route::prefix('administrativas')->group(function () {
            Route::get('/', [SolicitudAdministrativaController::class, 'index']);
            Route::post('/', [SolicitudAdministrativaController::class, 'store']);
            Route::get('/estadisticas', [SolicitudAdministrativaController::class, 'estadisticas']);
            Route::get('/verificar-cedula/{cedula}', [SolicitudAdministrativaController::class, 'verificarCedula']);
            Route::get('/verificar-login/{login}', [SolicitudAdministrativaController::class, 'verificarLogin']);
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
            Route::get('/verificar-cedula/{cedula}', [SolicitudHistoriaClinicaController::class, 'verificarCedula']);
            Route::get('/verificar-correo/{correo}', [SolicitudHistoriaClinicaController::class, 'verificarCorreo']);
            Route::get('/verificar-registro/{registro}', [SolicitudHistoriaClinicaController::class, 'verificarRegistro']);
            Route::get('/{id}', [SolicitudHistoriaClinicaController::class, 'show']);
            Route::put('/{id}', [SolicitudHistoriaClinicaController::class, 'update']);
            Route::delete('/{id}', [SolicitudHistoriaClinicaController::class, 'destroy']);
            Route::post('/{id}/aprobar', [SolicitudHistoriaClinicaController::class, 'aprobar']);
            Route::post('/{id}/rechazar', [SolicitudHistoriaClinicaController::class, 'rechazar']);
        });
    });

    // Rutas de flujo de aprobaciones
    Route::prefix('flujos')->group(function () {
        Route::get('/buscar', [FlujoAprobacionController::class, 'buscarSolicitud']);
        Route::get('/progreso/{tipo}/{id}', [FlujoAprobacionController::class, 'obtenerProgreso']);
        Route::post('/firmar', [FlujoAprobacionController::class, 'firmarPaso']);
        Route::post('/rechazar', [FlujoAprobacionController::class, 'rechazarPaso']);
    });

    // Rutas de catálogos
    Route::prefix('catalogos')->group(function () {
        Route::get('/areas', [CatalogoController::class, 'areas']);
        Route::get('/cargos', [CatalogoController::class, 'cargos']);
        Route::get('/especialidades', [CatalogoController::class, 'especialidades']);
        Route::get('/todos', [CatalogoController::class, 'todos']);
        
        // CRUD
        Route::post('/cargos', [CatalogoController::class, 'storeCargo']);
        Route::post('/areas', [CatalogoController::class, 'storeArea']);
        Route::post('/especialidades', [CatalogoController::class, 'storeEspecialidad']);
        Route::put('/cargos/{id}', [CatalogoController::class, 'updateCargo']);
    });

    // Rutas de notificaciones
    Route::prefix('notificaciones')->group(function () {
        Route::get('/', [NotificacionController::class, 'index']);
        Route::get('/no-leidas', [NotificacionController::class, 'noLeidas']);
        Route::put('/{id}/leer', [NotificacionController::class, 'marcarLeida']);
        Route::post('/leer-todas', [NotificacionController::class, 'marcarTodasLeidas']);
        Route::post('/', [NotificacionController::class, 'store']);
        Route::delete('/{id}', [NotificacionController::class, 'destroy']);
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

    // Rutas de usuarios
    Route::prefix('usuarios')->group(function () {
        Route::get('/', [UsuarioController::class, 'index']);
        Route::get('/{id}', [UsuarioController::class, 'show']);
        Route::post('/', [UsuarioController::class, 'store']);
        Route::put('/{id}', [UsuarioController::class, 'update']);
        Route::delete('/{id}', [UsuarioController::class, 'destroy']);
        Route::put('/{id}/estado', [UsuarioController::class, 'cambiarEstado']);
        Route::post('/{id}/cambiar-password', [UsuarioController::class, 'cambiarPassword']);
    });

    // Rutas de perfil de usuario
    Route::get('/perfil', [UsuarioController::class, 'perfil']);
    Route::put('/perfil', [UsuarioController::class, 'actualizarPerfil']);

    // Rutas de Dashboard
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::get('/admin', [DashboardController::class, 'estadisticasAdmin']);
    });

    // Rutas de Reportes
    Route::prefix('reportes')->group(function () {
        Route::get('/', [ReporteController::class, 'index']);
        Route::post('/generar', [ReporteController::class, 'generar']);
        Route::get('/{id}/exportar', [ReporteController::class, 'exportar']);
    });

    // Rutas de Permisos y Roles
    Route::prefix('permisos')->group(function () {
        Route::get('/mis-permisos', [PermisoController::class, 'misPermisos']);
        Route::post('/verificar', [PermisoController::class, 'verificarPermiso']);
        Route::get('/listar', [PermisoController::class, 'listarPermisos']);
        Route::get('/roles', [PermisoController::class, 'listarRoles']);
        Route::post('/asignar-rol', [PermisoController::class, 'asignarRol']);
        Route::delete('/remover-rol', [PermisoController::class, 'removerRol']);
    });

    // Rutas de Credenciales de Firmas
    Route::prefix('credenciales-firmas')->group(function () {
        Route::get('/', [CredencialFirmaController::class, 'index']);
        Route::get('/tipo/{tipo}', [CredencialFirmaController::class, 'porTipo']);
        Route::get('/{id}', [CredencialFirmaController::class, 'show']);
        Route::post('/', [CredencialFirmaController::class, 'store']);
        Route::put('/{id}', [CredencialFirmaController::class, 'update']);
        Route::delete('/{id}', [CredencialFirmaController::class, 'destroy']);
        Route::post('/{id}/toggle-activo', [CredencialFirmaController::class, 'toggleActivo']);
        Route::post('/reordenar', [CredencialFirmaController::class, 'reordenar']);
    });
});

// Rutas de exportación y previsualización (Públicas para facilitar descarga, o protegidas si se prefiere)
// Nota: Si se protegen, el frontend debe enviar el token en la petición de descarga.
// Por ahora las dejamos públicas para evitar problemas con las descargas directas, 
// pero idealmente deberían estar protegidas y usar tokens de un solo uso o cookies.
Route::prefix('exportar')->group(function () {
    Route::get('/administrativa/{id}', [ExportacionController::class, 'exportarAdministrativa']);
    Route::get('/historia-clinica/{id}', [ExportacionController::class, 'exportarHistoriaClinica']);
    Route::get('/csv/administrativa/{id}', [ExportacionController::class, 'exportarAdministrativaCSV']);
    Route::get('/csv/historia-clinica/{id}', [ExportacionController::class, 'exportarHistoriaClinicaCSV']);
    Route::get('/preview/administrativa/{id}', [ExportacionController::class, 'previsualizarAdministrativa']);
    Route::get('/preview/historia-clinica/{id}', [ExportacionController::class, 'previsualizarHistoriaClinica']);
    Route::get('/metadatos', [ExportacionController::class, 'obtenerMetadatos']);
});
