<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.ver')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver usuarios'
            ], 403);
        }

        $query = User::with(['roles']);
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }
        
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('rol')) {
            $query->where('rol', $request->rol);
        }
        
        $usuarios = $query->latest()->paginate($request->get('per_page', 15));
        return response()->json([
            'success' => true,
            'data' => $usuarios
        ]);
    }

    public function show($id, Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.ver')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver usuarios'
            ], 403);
        }

        $usuario = User::with(['roles'])->findOrFail($id);
        $permisos = $usuario->permisos();

        return response()->json([
            'success' => true,
            'data' => [
                'usuario' => $usuario,
                'permisos' => $permisos,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.crear')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para crear usuarios'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'rol' => 'nullable|string',
            'estado' => 'nullable|string',
            'cargo_id' => 'nullable|exists:cargos,id',
            'area_id' => 'nullable|exists:areas,id',
            'role_ids' => 'nullable|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['estado'] = $validated['estado'] ?? 'activo';
        
        $usuario = User::create($validated);

        // Asignar roles si se proporcionaron
        if (isset($validated['role_ids'])) {
            foreach ($validated['role_ids'] as $roleId) {
                $usuario->asignarRol($roleId);
            }
        }

        // Registrar actividad
        \DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'usuarios',
            'accion' => 'crear',
            'descripcion' => "Creó usuario: {$usuario->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Usuario creado exitosamente',
            'data' => $usuario
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.editar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para editar usuarios'
            ], 403);
        }

        $usuario = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:8',
            'rol' => 'nullable|string',
            'estado' => 'nullable|string',
            'cargo_id' => 'nullable|exists:cargos,id',
            'area_id' => 'nullable|exists:areas,id',
            'role_ids' => 'nullable|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $usuario->update($validated);

        // Actualizar roles si se proporcionaron
        if (isset($validated['role_ids'])) {
            $usuario->sincronizarRoles($validated['role_ids']);
        }

        // Registrar actividad
        \DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'usuarios',
            'accion' => 'editar',
            'descripcion' => "Actualizó usuario: {$usuario->name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado exitosamente',
            'data' => $usuario
        ]);
    }

    public function destroy($id, Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.eliminar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para eliminar usuarios'
            ], 403);
        }

        $usuario = User::findOrFail($id);

        // No permitir eliminar al propio usuario
        if ($usuario->id === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'No puede eliminar su propio usuario'
            ], 403);
        }

        $nombreUsuario = $usuario->name;
        $usuario->delete();

        // Registrar actividad
        \DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'usuarios',
            'accion' => 'eliminar',
            'descripcion' => "Eliminó usuario: {$nombreUsuario}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    }

    public function cambiarEstado(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.editar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para cambiar estado de usuarios'
            ], 403);
        }

        $usuario = User::findOrFail($id);
        
        $validated = $request->validate([
            'estado' => 'required|in:activo,inactivo',
        ]);

        $usuario->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Estado actualizado exitosamente',
            'data' => $usuario
        ]);
    }

    /**
     * Cambiar contraseña de usuario
     */
    public function cambiarPassword(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->tienePermiso('usuarios.cambiar_password') && $user->id !== (int)$id) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para cambiar contraseñas'
            ], 403);
        }

        $usuario = User::findOrFail($id);

        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $usuario->update([
            'password' => Hash::make($validated['password'])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Contraseña actualizada exitosamente'
        ]);
    }

    /**
     * Obtener perfil del usuario autenticado
     */
    public function perfil(Request $request)
    {
        $user = $request->user();
        $roles = $user->roles()->get();
        $permisos = $user->permisos();

        return response()->json([
            'success' => true,
            'data' => [
                'usuario' => $user,
                'roles' => $roles,
                'permisos' => $permisos,
                'es_administrador' => $user->esAdministrador(),
                'es_supervisor' => $user->esSupervisor(),
                'es_medico' => $user->esMedico(),
            ]
        ]);
    }

    /**
     * Actualizar perfil del usuario autenticado
     */
    public function actualizarPerfil(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado exitosamente',
            'data' => $user
        ]);
    }
}
