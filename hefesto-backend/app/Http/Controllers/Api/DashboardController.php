<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Obtiene estadísticas del dashboard según el rol del usuario
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Estadísticas generales
        $stats = [
            'solicitudes_pendientes' => 0,
            'solicitudes_aprobadas' => 0,
            'solicitudes_rechazadas' => 0,
            'solicitudes_totales' => 0,
            'notificaciones_no_leidas' => 0,
        ];

        // Si puede ver todas las solicitudes
        if ($user->tienePermiso('solicitudes_administrativas.ver_todas') || 
            $user->tienePermiso('solicitudes_historia_clinica.ver_todas')) {
            
            // Solicitudes administrativas
            $statsAdmin = DB::table('solicitudes_administrativas')
                ->select(
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                    DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                    DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
                )
                ->first();

            // Solicitudes historia clínica
            $statsHC = DB::table('solicitudes_historia_clinica')
                ->select(
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                    DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                    DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
                )
                ->first();

            $stats['solicitudes_totales'] = ($statsAdmin->total ?? 0) + ($statsHC->total ?? 0);
            $stats['solicitudes_pendientes'] = ($statsAdmin->pendientes ?? 0) + ($statsHC->pendientes ?? 0);
            $stats['solicitudes_aprobadas'] = ($statsAdmin->aprobadas ?? 0) + ($statsHC->aprobadas ?? 0);
            $stats['solicitudes_rechazadas'] = ($statsAdmin->rechazadas ?? 0) + ($statsHC->rechazadas ?? 0);

        } else {
            // Solo ver propias solicitudes
            $statsAdmin = DB::table('solicitudes_administrativas')
                ->where('user_id', $user->id)
                ->select(
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                    DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                    DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
                )
                ->first();

            $statsHC = DB::table('solicitudes_historia_clinica')
                ->where('user_id', $user->id)
                ->select(
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                    DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                    DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
                )
                ->first();

            $stats['solicitudes_totales'] = ($statsAdmin->total ?? 0) + ($statsHC->total ?? 0);
            $stats['solicitudes_pendientes'] = ($statsAdmin->pendientes ?? 0) + ($statsHC->pendientes ?? 0);
            $stats['solicitudes_aprobadas'] = ($statsAdmin->aprobadas ?? 0) + ($statsHC->aprobadas ?? 0);
            $stats['solicitudes_rechazadas'] = ($statsAdmin->rechazadas ?? 0) + ($statsHC->rechazadas ?? 0);
        }

        // Notificaciones no leídas
        $stats['notificaciones_no_leidas'] = DB::table('notificaciones')
            ->where('user_id', $user->id)
            ->where('leida', false)
            ->count();

        // Actividad reciente
        $actividadReciente = DB::table('actividades')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Solicitudes recientes
        $solicitudesRecientes = [];
        
        if ($user->tienePermiso('solicitudes_administrativas.ver_todas')) {
            $solicitudesRecientes = DB::table('solicitudes_administrativas')
                ->select('id', 'tipo_solicitud', 'estado', 'created_at')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
        } else {
            $solicitudesRecientes = DB::table('solicitudes_administrativas')
                ->where('user_id', $user->id)
                ->select('id', 'tipo_solicitud', 'estado', 'created_at')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'estadisticas' => $stats,
                'actividad_reciente' => $actividadReciente,
                'solicitudes_recientes' => $solicitudesRecientes,
                'usuario' => [
                    'nombre' => $user->name,
                    'email' => $user->email,
                    'rol' => $user->rol,
                ],
            ]
        ]);
    }

    /**
     * Obtiene estadísticas para administradores
     */
    public function estadisticasAdmin(Request $request)
    {
        $user = $request->user();

        if (!$user->esAdministrador()) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver estas estadísticas'
            ], 403);
        }

        $stats = [
            'usuarios_totales' => DB::table('users')->count(),
            'usuarios_activos' => DB::table('users')->where('estado', 'activo')->count(),
            'solicitudes_hoy' => DB::table('solicitudes_administrativas')
                ->whereDate('created_at', today())
                ->count(),
            'exportaciones_mes' => DB::table('exportaciones')
                ->whereMonth('created_at', now()->month)
                ->count(),
        ];

        // Solicitudes por estado
        $solicitudesPorEstado = DB::table('solicitudes_administrativas')
            ->select('estado', DB::raw('COUNT(*) as total'))
            ->groupBy('estado')
            ->get();

        // Usuarios por rol
        $usuariosPorRol = DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->select('roles.nombre', DB::raw('COUNT(*) as total'))
            ->groupBy('roles.nombre')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'estadisticas_generales' => $stats,
                'solicitudes_por_estado' => $solicitudesPorEstado,
                'usuarios_por_rol' => $usuariosPorRol,
            ]
        ]);
    }
}
