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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // Verificar si el usuario está activo (case-insensitive)
        if (isset($user->estado) && strtolower($user->estado) !== 'activo') {
            return response()->json([
                'message' => 'Usuario inactivo. Contacte al administrador.'
            ], 403);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->get();
        $permisos = $user->permisos();

        // Registrar actividad de login
        \DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'autenticacion',
            'accion' => 'login_exitoso',
            'descripcion' => 'Usuario inició sesión',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol,
                'estado' => $user->estado,
            ],
            'roles' => $roles,
            'permisos' => $permisos,
            'token' => $token,
            'es_administrador' => $user->esAdministrador(),
            'es_supervisor' => $user->esSupervisor(),
            'es_medico' => $user->esMedico(),
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
        $credencialesValidas = [
            'Jefe inmediato' => 'JEFE2024',
            'Jefe de Talento Humano' => 'TALENTO2024',
            'Jefe de Gestión de la Información' => 'GESTION2024',
            'Coordinador de Facturación o Subgerente Financiero' => 'FINANZAS2024',
            'Capacitador de historia clínica' => 'CAPACITAHC2024',
            'Capacitador de epidemiología' => 'CAPACITAEPI2024',
            'Aval institucional' => 'AVAL2024',
        ];

        $cargo = $request->cargo;
        $credencial = $request->credencial;

        if (isset($credencialesValidas[$cargo]) && $credencialesValidas[$cargo] === $credencial) {
            return response()->json(['valida' => true]);
        }

        return response()->json(['valida' => false], 401);
    }
}
