<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validación básica
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Buscar usuario (Email O Username) - DIRECTO Y SIMPLE
        $user = User::where('email', $request->email)
            ->orWhere('username', $request->email)
            ->first();

        // 3. Verificar contraseña
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // 4. Verificar estado (opcional, pero recomendado para seguridad básica)
        if (isset($user->estado) && strtolower($user->estado) !== 'activo') {
            return response()->json([
                'message' => 'Usuario inactivo'
            ], 403);
        }

        // 5. Generar Token
        $token = $user->createToken('auth-token')->plainTextToken;

        // 6. Respuesta Exitosa
        return response()->json([
            'success' => true,
            'message' => 'Login exitoso',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol,
            ],
            'token' => $token,
            'es_administrador' => $user->esAdministrador(),
            'roles' => $user->roles()->get(),
            'permisos' => $user->permisos(),
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'rol' => 'nullable|string',
            'estado' => 'nullable|string|in:activo,inactivo,Activo,Inactivo',
            'cargo_id' => 'nullable|exists:cargos,id',
            'area_id' => 'nullable|exists:areas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol ?? 'Usuario',
            'estado' => ucfirst(strtolower($request->estado ?? 'activo')),
            'cargo_id' => $request->cargo_id,
            'area_id' => $request->area_id,
        ]);

        // Asignar rol por defecto: "Administrativo - Entrada de Datos"
        $rolPorDefecto = \DB::table('roles')
            ->where('nombre', 'Administrativo - Entrada de Datos')
            ->first();

        if ($rolPorDefecto) {
            $user->asignarRol($rolPorDefecto->id);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        // Registrar actividad de registro
        \DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'autenticacion',
            'accion' => 'registro_exitoso',
            'descripcion' => 'Usuario se registró en el sistema',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol,
                'estado' => $user->estado,
            ],
            'token' => $token,
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol,
                'estado' => $user->estado,
                'created_at' => $user->created_at,
            ],
            'permisos' => $user->obtenerPermisos(),
            'es_admin' => $user->esAdministrador(),
            'esta_activo' => $user->estaActivo(),
        ]);
    }

    // Verificar credenciales de firma
    public function verificarCredencialFirma(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cargo' => 'required|string',
            'credencial' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        // Buscar credencial en la base de datos
        $credencialFirma = \App\Models\CredencialFirma::where('cargo', $request->cargo)
            ->where('activo', true)
            ->first();

        if (!$credencialFirma) {
            return response()->json([
                'valida' => false,
                'message' => 'Cargo no encontrado o credencial inactiva'
            ], 404);
        }

        // Verificar credencial con hash
        if ($credencialFirma->verificarCredencial($request->credencial)) {
            return response()->json([
                'valida' => true,
                'credencial' => [
                    'id' => $credencialFirma->id,
                    'cargo' => $credencialFirma->cargo,
                    'nombre_completo' => $credencialFirma->nombre_completo,
                    'email' => $credencialFirma->email,
                ]
            ]);
        }

        return response()->json([
            'valida' => false,
            'message' => 'Credencial incorrecta'
        ], 401);
    }

}
