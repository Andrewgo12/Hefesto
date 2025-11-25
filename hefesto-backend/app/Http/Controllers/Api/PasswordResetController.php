<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PasswordResetController extends Controller
{
    /**
     * Enviar email con link de reset de contraseña
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verificar si el usuario existe
        $user = User::where('email', $request->email)->first();

        // Por seguridad, siempre retornar éxito (no revelar si email existe)
        if (!$user) {
            return response()->json([
                'message' => 'Si el correo existe, recibirás un enlace de recuperación.'
            ], 200);
        }

        // Generar token
        $token = Str::random(64);

        // Guardar/actualizar token en DB
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($token),
                'created_at' => now()
            ]
        );

        // Enviar email (por ahora se guardará en log)
        try {
            \Mail::send('emails.reset-password', ['token' => $token, 'email' => $request->email], function ($message) use ($request) {
                $message->to($request->email);
                $message->subject('Recuperación de Contraseña - HEFESTO');
            });
        } catch (\Exception $e) {
            \Log::error('Error sending password reset email: ' . $e->getMessage());
        }

        // Registrar actividad
        DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'autenticacion',
            'accion' => 'solicitud_reset_password',
            'descripcion' => 'Usuario solicitó recuperación de contraseña',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Si el correo existe, recibirás un enlace de recuperación.',
            'token' => config('app.debug') ? $token : null, // Solo en debug mode
        ], 200);
    }

    /**
     * Resetear contraseña con token
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buscar token
        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'Token inválido o expirado'
            ], 400);
        }

        // Verificar si el token ha expirado (60 minutos)
        $createdAt = \Carbon\Carbon::parse($resetRecord->created_at);
        if ($createdAt->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'message' => 'Token expirado. Solicita uno nuevo.'
            ], 400);
        }

        // Verificar token
        if (!Hash::check($request->token, $resetRecord->token)) {
            return response()->json([
                'message' => 'Token inválido'
            ], 400);
        }

        // Actualizar contraseña
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Eliminar token (un solo uso)
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        // Revocar todos los tokens de acceso del usuario
        $user->tokens()->delete();

        // Registrar actividad
        DB::table('actividades')->insert([
            'user_id' => $user->id,
            'usuario_email' => $user->email,
            'modulo' => 'autenticacion',
            'accion' => 'password_reset_exitoso',
            'descripcion' => 'Usuario cambió su contraseña mediante recuperación',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Contraseña actualizada exitosamente. Por favor, inicia sesión con tu nueva contraseña.'
        ], 200);
    }
}
