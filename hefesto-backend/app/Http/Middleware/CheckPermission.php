<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $permiso  Nombre del permiso requerido (ej: 'solicitudes_administrativas.crear')
     */
    public function handle(Request $request, Closure $next, string $permiso): Response
    {
        $user = $request->user();

        // Si no hay usuario autenticado
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado. Por favor inicie sesión.',
            ], 401);
        }

        // Verificar si el usuario tiene el permiso
        if (!$this->tienePermiso($user->id, $permiso)) {
            // Registrar intento de acceso no autorizado
            $this->registrarAccesoNoAutorizado($user->id, $permiso, $request);

            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para realizar esta acción.',
                'permiso_requerido' => $permiso,
            ], 403);
        }

        // Registrar acceso exitoso en actividades
        $this->registrarActividad($user->id, $permiso, $request);

        return $next($request);
    }

    /**
     * Verifica si un usuario tiene un permiso específico
     */
    private function tienePermiso(int $userId, string $nombrePermiso): bool
    {
        // Obtener los roles del usuario
        $roles = DB::table('role_user')
            ->where('user_id', $userId)
            ->pluck('role_id');

        if ($roles->isEmpty()) {
            return false;
        }

        // Verificar si alguno de los roles tiene el permiso
        $tienePermiso = DB::table('permiso_role')
            ->join('permisos', 'permiso_role.permiso_id', '=', 'permisos.id')
            ->whereIn('permiso_role.role_id', $roles)
            ->where('permisos.nombre', $nombrePermiso)
            ->where('permisos.activo', 1)
            ->exists();

        return $tienePermiso;
    }

    /**
     * Registra un intento de acceso no autorizado
     */
    private function registrarAccesoNoAutorizado(int $userId, string $permiso, Request $request): void
    {
        try {
            DB::table('actividades')->insert([
                'user_id' => $userId,
                'tipo' => 'acceso_denegado',
                'modulo' => 'seguridad',
                'accion' => 'intento_acceso_no_autorizado',
                'descripcion' => "Intento de acceso sin permiso: {$permiso}",
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos' => json_encode([
                    'permiso_requerido' => $permiso,
                    'ruta' => $request->path(),
                    'metodo' => $request->method(),
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            \Log::error('Error registrando acceso no autorizado: ' . $e->getMessage());
        }
    }

    /**
     * Registra la actividad del usuario
     */
    private function registrarActividad(int $userId, string $permiso, Request $request): void
    {
        try {
            // Extraer módulo y acción del permiso
            $partes = explode('.', $permiso);
            $modulo = $partes[0] ?? 'sistema';
            $accion = $partes[1] ?? 'acceso';

            DB::table('actividades')->insert([
                'user_id' => $userId,
                'tipo' => 'acceso',
                'modulo' => $modulo,
                'accion' => $accion,
                'descripcion' => "Acceso a: {$request->path()}",
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'datos' => json_encode([
                    'permiso' => $permiso,
                    'ruta' => $request->path(),
                    'metodo' => $request->method(),
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            \Log::error('Error registrando actividad: ' . $e->getMessage());
        }
    }
}
