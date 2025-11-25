<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Listar todos los roles
     */
    public function index()
    {
        try {
            $roles = DB::table('roles')
                ->orderBy('es_sistema', 'desc')
                ->orderBy('nombre')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $roles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener roles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear nuevo rol
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100|unique:roles,nombre',
            'descripcion' => 'nullable|string|max:255',
            'permisos' => 'required|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Validar que permisos sea un JSON válido
            $permisos = json_decode($request->permisos, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'success' => false,
                    'message' => 'El formato de permisos no es válido'
                ], 422);
            }

            $roleId = DB::table('roles')->insertGetId([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'permisos' => $request->permisos,
                'es_sistema' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $role = DB::table('roles')->find($roleId);

            return response()->json([
                'success' => true,
                'message' => 'Rol creado exitosamente',
                'data' => $role
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear rol',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener rol específico
     */
    public function show($id)
    {
        try {
            $role = DB::table('roles')->find($id);

            if (!$role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $role
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener rol',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar rol
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100|unique:roles,nombre,' . $id,
            'descripcion' => 'nullable|string|max:255',
            'permisos' => 'required|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $role = DB::table('roles')->find($id);

            if (!$role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            // Prevenir modificación de roles del sistema
            if ($role->es_sistema) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se pueden modificar roles del sistema'
                ], 403);
            }

            // Validar que permisos sea un JSON válido
            $permisos = json_decode($request->permisos, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'success' => false,
                    'message' => 'El formato de permisos no es válido'
                ], 422);
            }

            DB::table('roles')
                ->where('id', $id)
                ->update([
                    'nombre' => $request->nombre,
                    'descripcion' => $request->descripcion,
                    'permisos' => $request->permisos,
                    'updated_at' => now(),
                ]);

            $roleActualizado = DB::table('roles')->find($id);

            return response()->json([
                'success' => true,
                'message' => 'Rol actualizado exitosamente',
                'data' => $roleActualizado
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar rol',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar rol
     */
    public function destroy($id)
    {
        try {
            $role = DB::table('roles')->find($id);

            if (!$role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rol no encontrado'
                ], 404);
            }

            // Prevenir eliminación de roles del sistema
            if ($role->es_sistema) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se pueden eliminar roles del sistema'
                ], 403);
            }

            // Verificar si hay usuarios con este rol
            $usuariosConRol = DB::table('users')
                ->where('rol', $role->nombre)
                ->count();

            if ($usuariosConRol > 0) {
                return response()->json([
                    'success' => false,
                    'message' => "No se puede eliminar el rol porque hay {$usuariosConRol} usuario(s) asignado(s)"
                ], 409);
            }

            DB::table('roles')->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Rol eliminado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar rol',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
