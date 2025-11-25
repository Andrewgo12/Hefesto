<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TokenController extends Controller
{
    /**
     * Listar tokens del usuario autenticado
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $tokens = $user->tokens->map(function ($token) {
                return [
                    'id' => $token->id,
                    'name' => $token->name,
                    'abilities' => $token->abilities,
                    'last_used_at' => $token->last_used_at,
                    'created_at' => $token->created_at,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $tokens
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener tokens',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear un nuevo token
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'abilities' => 'required|array',
            'abilities.*' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();
            $token = $user->createToken($request->name, $request->abilities);

            return response()->json([
                'success' => true,
                'message' => 'Token creado exitosamente',
                'data' => [
                    'accessToken' => $token->plainTextToken,
                    'token' => [
                        'id' => $token->accessToken->id,
                        'name' => $token->accessToken->name,
                        'abilities' => $token->accessToken->abilities,
                        'created_at' => $token->accessToken->created_at,
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear token',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Revocar (eliminar) un token
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();
            // Asegurar que el token pertenece al usuario
            $token = $user->tokens()->where('id', $id)->first();

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token no encontrado'
                ], 404);
            }

            $token->delete();

            return response()->json([
                'success' => true,
                'message' => 'Token revocado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al revocar token',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
