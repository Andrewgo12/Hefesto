<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PermisoController extends Controller
{
    /**
     * Obtiene los permisos del usuario autenticado
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function misPermisos(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no autenticado'
            ], 401);
        }

        // Obtener roles del usuario
        $roles = DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->where('role_user.user_id', $user->id)
            ->where('roles.activo', 1)
            ->select('roles.id', 'roles.nombre', 'roles.descripcion')
            ->get();

        // Obtener permisos del usuario
        $permisos = DB::table('permisos')
            ->join('permiso_role', 'permisos.id', '=', 'permiso_role.permiso_id')
            ->join('role_user', 'permiso_role.role_id', '=', 'role_user.role_id')
            ->where('role_user.user_id', $user->id)
            ->where('permisos.activo', 1)
            ->select('permisos.id', 'permisos.nombre', 'permisos.modulo', 'permisos.accion', 'permisos.descripcion')
            ->distinct()
            ->get();

        // Agrupar permisos por módulo
        $permisosPorModulo = $permisos->groupBy('modulo')->map(function ($items) {
            return $items->pluck('accion')->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => [
                'usuario' => [
                    'id' => $user->id,
                    'nombre' => $user->name,
                    'email' => $user->email,
                ],
                'roles' => $roles,
                'permisos' => $permisos,
                'permisos_por_modulo' => $permisosPorModulo,
                'es_administrador' => $user->esAdministrador(),
                'es_supervisor' => $user->esSupervisor(),
                'es_medico' => $user->esMedico(),
            ]
        ]);
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verificarPermiso(Request $request)
    {
        $request->validate([
            'permiso' => 'required|string'
        ]);

        $user = $request->user();
        $permiso = $request->input('permiso');

        $tienePermiso = $user->tienePermiso($permiso);

        return response()->json([
            'success' => true,
            'data' => [
                'permiso' => $permiso,
                'tiene_permiso' => $tienePermiso,
            ]
        ]);
    }

    /**
     * Lista todos los permisos del sistema (solo para administradores)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listarPermisos(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('roles.ver')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver esta información'
            ], 403);
        }

        $permisos = DB::table('permisos')
            ->where('activo', 1)
            ->orderBy('modulo')
            ->orderBy('accion')
            ->get();

        $permisosPorModulo = $permisos->groupBy('modulo');

        return response()->json([
            'success' => true,
            'data' => [
                'permisos' => $permisos,
                'permisos_por_modulo' => $permisosPorModulo,
                'total' => $permisos->count(),
            ]
        ]);
    }

    /**
     * Lista todos los roles del sistema
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listarRoles(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('roles.ver')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver esta información'
            ], 403);
        }

        $roles = DB::table('roles')
            ->where('activo', 1)
            ->get();

        // Para cada rol, obtener sus permisos
        foreach ($roles as $rol) {
            $rol->permisos = DB::table('permiso_role')
                ->join('permisos', 'permiso_role.permiso_id', '=', 'permisos.id')
                ->where('permiso_role.role_id', $rol->id)
                ->where('permisos.activo', 1)
                ->select('permisos.id', 'permisos.nombre', 'permisos.modulo', 'permisos.accion')
                ->get();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'roles' => $roles,
                'total' => $roles->count(),
            ]
        ]);
    }

    /**
     * Asigna un rol a un usuario (solo para administradores)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function asignarRol(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.asignar_roles')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para asignar roles'
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $targetUser = \App\Models\User::find($request->user_id);
        $targetUser->asignarRol($request->role_id);

        // Registrar actividad
        DB::table('actividades')->insert([
            'user_id' => $user->id,
            'tipo' => 'asignacion_rol',
            'modulo' => 'usuarios',
            'accion' => 'asignar_rol',
            'descripcion' => "Asignó rol {$request->role_id} al usuario {$request->user_id}",
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rol asignado exitosamente'
        ]);
    }

    /**
     * Remueve un rol de un usuario (solo para administradores)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removerRol(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.asignar_roles')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para remover roles'
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $targetUser = \App\Models\User::find($request->user_id);
        $targetUser->removerRol($request->role_id);

        // Registrar actividad
        DB::table('actividades')->insert([
            'user_id' => $user->id,
            'tipo' => 'remocion_rol',
            'modulo' => 'usuarios',
            'accion' => 'remover_rol',
            'descripcion' => "Removió rol {$request->role_id} del usuario {$request->user_id}",
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rol removido exitosamente'
        ]);
    }
}
