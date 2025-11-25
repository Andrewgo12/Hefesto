<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SeguridadController extends Controller
{
    /**
     * Obtener políticas de seguridad
     */
    public function getPoliticas()
    {
        try {
            $politicas = DB::table('politicas_seguridad')->first();

            // Si no hay políticas, crear por defecto
            if (!$politicas) {
                $politicas = $this->crearPoliticasPorDefecto();
            }

            return response()->json([
                'success' => true,
                'data' => $politicas
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener políticas de seguridad',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar políticas de seguridad
     */
    public function updatePoliticas(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tiempo_sesion_minutos' => 'required|integer|min:5|max:1440',
            'intentos_login_permitidos' => 'required|integer|min:1|max:10',
            'tiempo_bloqueo_minutos' => 'required|integer|min:1|max:1440',
            'requiere_2fa' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $politicas = DB::table('politicas_seguridad')->first();

            if ($politicas) {
                // Actualizar
                DB::table('politicas_seguridad')
                    ->where('id', $politicas->id)
                    ->update([
                        'tiempo_sesion_minutos' => $request->tiempo_sesion_minutos,
                        'intentos_login_permitidos' => $request->intentos_login_permitidos,
                        'tiempo_bloqueo_minutos' => $request->tiempo_bloqueo_minutos,
                        'requiere_2fa' => $request->requiere_2fa,
                        'updated_at' => now(),
                    ]);

                $politicasActualizadas = DB::table('politicas_seguridad')->first();
            } else {
                // Crear
                $id = DB::table('politicas_seguridad')->insertGetId([
                    'tiempo_sesion_minutos' => $request->tiempo_sesion_minutos,
                    'intentos_login_permitidos' => $request->intentos_login_permitidos,
                    'tiempo_bloqueo_minutos' => $request->tiempo_bloqueo_minutos,
                    'requiere_2fa' => $request->requiere_2fa,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $politicasActualizadas = DB::table('politicas_seguridad')->find($id);
            }

            return response()->json([
                'success' => true,
                'message' => 'Políticas de seguridad actualizadas exitosamente',
                'data' => $politicasActualizadas
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar políticas de seguridad',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cerrar todas las sesiones activas (excepto la del usuario actual)
     */
    public function cerrarSesiones()
    {
        try {
            $usuarioActual = Auth::id();

            // Eliminar todos los tokens de Sanctum excepto el del usuario actual
            $tokensEliminados = DB::table('personal_access_tokens')
                ->where('tokenable_id', '!=', $usuarioActual)
                ->delete();

            // Registrar actividad
            DB::table('actividades')->insert([
                'usuario_id' => $usuarioActual,
                'accion' => 'Cierre masivo de sesiones',
                'descripcion' => "Se cerraron {$tokensEliminados} sesiones activas",
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => "Se cerraron {$tokensEliminados} sesiones activas",
                'sesiones_cerradas' => $tokensEliminados
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar sesiones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear políticas de seguridad por defecto
     */
    private function crearPoliticasPorDefecto()
    {
        $id = DB::table('politicas_seguridad')->insertGetId([
            'tiempo_sesion_minutos' => 120, // 2 horas
            'intentos_login_permitidos' => 5,
            'tiempo_bloqueo_minutos' => 15,
            'requiere_2fa' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return DB::table('politicas_seguridad')->find($id);
    }
}
