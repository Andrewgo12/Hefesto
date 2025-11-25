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
        // No se requiere verificación de permisos - control por menú lateral

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
        // No se requiere verificación de permisos - control por menú lateral

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
        $user = auth('sanctum')->user();
        // No se requiere verificación de permisos - control por menú lateral

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
            'user_id' => $user ? $user->id : null,
            'usuario_email' => $user ? $user->email : 'Sistema',
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
        $userAuth = auth('sanctum')->user();
        // No se requiere verificación de permisos - control por menú lateral

        $usuario = User::findOrFail($id);
        
        // Si se intenta cambiar el rol, verificar que sea administrador
        if ($request->has('rol') && $request->rol !== $usuario->rol) {
            if (!$userAuth || $userAuth->rol !== 'Administrador') {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo los administradores pueden cambiar roles de usuario'
                ], 403);
            }
            
            // Registrar cambio de rol
            \Log::info("Cambio de rol: Usuario {$usuario->name} (ID: {$usuario->id}) cambió de {$usuario->rol} a {$request->rol}", [
                'admin_id' => $userAuth->id,
                'admin_email' => $userAuth->email,
            ]);
        }
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:8',
            'rol' => 'sometimes|string|in:Usuario,Administrador',
            'estado' => 'sometimes|string|in:activo,inactivo,Activo,Inactivo',
            'cargo_id' => 'nullable|exists:cargos,id',
            'area_id' => 'nullable|exists:areas,id',
            'role_ids' => 'nullable|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        // Normalizar estado si se proporciona
        if (isset($validated['estado'])) {
            $validated['estado'] = ucfirst(strtolower($validated['estado']));
        }

        $usuario->update($validated);

        // Actualizar roles si se proporcionaron
        if (isset($validated['role_ids'])) {
            $usuario->sincronizarRoles($validated['role_ids']);
        }

        // Registrar actividad
        \DB::table('actividades')->insert([
            'user_id' => $user ? $user->id : null,
            'usuario_email' => $user ? $user->email : 'Sistema',
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
        $user = auth('sanctum')->user();
        // No se requiere verificación de permisos - control por menú lateral

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
            'user_id' => $user ? $user->id : null,
            'usuario_email' => $user ? $user->email : 'Sistema',
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
        $userAuth = auth('sanctum')->user();
        
        // Verificar que el usuario autenticado sea administrador
        if (!$userAuth || $userAuth->rol !== 'Administrador') {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para cambiar el estado de usuarios'
            ], 403);
        }

        $usuario = User::findOrFail($id);
        
        // No permitir que un usuario se deshabilite a sí mismo
        if ($userAuth->id === $usuario->id) {
            return response()->json([
                'success' => false,
                'message' => 'No puede cambiar su propio estado'
            ], 400);
        }
        
        $validated = $request->validate([
            'estado' => 'required|in:activo,inactivo,Activo,Inactivo',
        ]);

        // Normalizar estado a formato capitalizado
        $nuevoEstado = ucfirst(strtolower($validated['estado']));
        $usuario->estado = $nuevoEstado;
        $usuario->save();

        // Registrar actividad
        \DB::table('actividades')->insert([
            'user_id' => $userAuth->id,
            'usuario_email' => $userAuth->email,
            'modulo' => 'usuarios',
            'accion' => $nuevoEstado === 'Activo' ? 'habilitar_usuario' : 'deshabilitar_usuario',
            'descripcion' => "Usuario {$usuario->name} (ID: {$usuario->id}) fue " . ($nuevoEstado === 'Activo' ? 'habilitado' : 'deshabilitado'),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Estado actualizado exitosamente',
            'data' => [
                'id' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
                'estado' => $usuario->estado,
            ]
        ]);
    }

    /**
     * Cambiar contraseña de usuario
     */
    public function cambiarPassword(Request $request, $id)
    {
        $user = auth('sanctum')->user();
        // No se requiere verificación de permisos - control por menú lateral

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
        $user = auth('sanctum')->user();
        
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'No autenticado'], 401);
        }

        $roles = $user->roles()->get();
        $permisos = $user->permisos();

        return response()->json([
            'success' => true,
            'data' => [
                'usuario' => $user,
                'roles' => $roles,
                'permisos' => $permisos,
                'es_administrador' => $user->esAdministrador(),
            ]
        ]);
    }

    /**
     * Actualizar perfil del usuario autenticado
     */
    public function actualizarPerfil(Request $request)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'No autenticado'], 401);
        }

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
